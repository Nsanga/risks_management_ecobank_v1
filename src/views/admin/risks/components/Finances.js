import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box, Flex, Select, Text, TableCaption } from '@chakra-ui/react';
import FinancesEvent from './globalViewEvent/FinancesEvent';

const Finances = ({ onFinancesChange, financesData, isEdit, event }) => {
  const initialData = [
    { id: 1, name: 'Actual Loss', values: [0, 0, 0, 0] },
    { id: 2, name: 'Potential Loss', values: [0, 0, 0, 0] },
    { id: 3, name: 'Actual Recovery', values: [0, 0, 0, 0] },
    { id: 4, name: 'Expected Recovery', values: [0, 0, 0, 0] },
    { id: 5, name: 'Recovery Expenses', values: [0, 0, 0, 0] },
    { id: 6, name: 'Insurance Recovery', values: [0, 0, 0, 0] },
    { id: 7, name: 'Near Miss', values: [0, 0, 0, 0] },
    { id: 7, name: 'Total', values: [0, 0, 0, 0] },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [totalCurrencies, setTotalCurrencies] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    USD_to_XAF: 625,
    EUR_to_USD: 1.208,
    EUR_to_XAF: 655.957,
  });
  const [availableCurrencies, setAvailableCurrencies] = useState({
    USD: true,
    EUR: true,
    XAF: true,
  });

  useEffect(() => {
    if (event?.financials) {
      const updatedData = initialData.map(item => {
        const financialItem = event.financials.find(f => f.name === item.name);
        return financialItem
          ? { ...item, values: financialItem.values }
          : item;
      });
      setTableData(updatedData);

      const totalRow = event.financials.find(f => f.name === 'Total');
      if (totalRow && totalRow.values[0] != null) {
        setTotalCurrencies(totalRow.values[0]); // Stocker la valeur dans le contexte
      }
    }
  }, [event]);

  const handleRateChange = (rate, value) => {
    setExchangeRates(prevRates => ({
      ...prevRates,
      [rate]: parseFloat(value),
    }));
  };

  const calculateTotals = (data) => {
    const totals = [0, 0, 0, 0]; // Initialiser les totaux pour chaque colonne
    const actualLoss = [0, 0, 0, 0];
    const potentialLoss = [0, 0, 0, 0];
    const actualRecovery = [0, 0, 0, 0];
    const expectedRecovery = [0, 0, 0, 0];
    const recoveryExpenses = [0, 0, 0, 0];
    const insuranceRecovery = [0, 0, 0, 0];
    const nearMiss = [0, 0, 0, 0];

    // Parcourir chaque ligne de données
    data.forEach(row => {
      row.values.forEach((value, index) => {
        switch (row.name) {
          case 'Actual Loss':
            actualLoss[index] = isNaN(value) ? 0 : parseFloat(value);
            break;
          case 'Potential Loss':
            potentialLoss[index] = isNaN(value) ? 0 : parseFloat(value);
            break;
          case 'Actual Recovery':
            actualRecovery[index] = isNaN(value) ? 0 : parseFloat(value);
            break;
          case 'Expected Recovery':
            expectedRecovery[index] = isNaN(value) ? 0 : parseFloat(value);
            break;
          case 'Recovery Expenses':
            recoveryExpenses[index] = isNaN(value) ? 0 : parseFloat(value);
            break;
          case 'Insurance Recovery':
            insuranceRecovery[index] = isNaN(value) ? 0 : parseFloat(value);
            break;
          case 'Near Miss':
            nearMiss[index] = isNaN(value) ? 0 : parseFloat(value);
            break;
          default:
            break;
        }
      });
    });

    // Calculer les totaux pour chaque colonne
    for (let i = 0; i < totals.length; i++) {
      if (actualLoss[i] || potentialLoss[i] || actualRecovery[i] || expectedRecovery[i] || recoveryExpenses[i] || insuranceRecovery[i] || nearMiss[i]) {
        totals[i] = actualLoss[i] - (actualRecovery[i] + recoveryExpenses[i] + insuranceRecovery[i]);
      } else if (actualLoss[i] || actualRecovery[i]) {
        totals[i] = actualLoss[i] - actualRecovery[i];
      } else if (actualLoss[i] || recoveryExpenses[i]) {
        totals[i] = actualLoss[i] - recoveryExpenses[i];
      } else if (actualLoss[i] || insuranceRecovery[i]) {
        totals[i] = actualLoss[i] - insuranceRecovery[i];
      } else if (actualLoss[i] || insuranceRecovery[i] || actualRecovery || recoveryExpenses || insuranceRecovery) {
        totals[i] = actualLoss[i] - (insuranceRecovery[i] + actualRecovery + recoveryExpenses + insuranceRecovery);
      } else if (actualLoss[i] || insuranceRecovery[i] || actualRecovery || recoveryExpenses) {
        totals[i] = actualLoss[i] - (insuranceRecovery[i] + actualRecovery + recoveryExpenses);
      } else if (actualLoss[i] || insuranceRecovery[i] || actualRecovery || insuranceRecovery) {
        totals[i] = actualLoss[i] - (insuranceRecovery[i] + actualRecovery + insuranceRecovery);
      } else if (actualLoss[i] || insuranceRecovery[i] || recoveryExpenses || insuranceRecovery) {
        totals[i] = actualLoss[i] - (insuranceRecovery[i] + recoveryExpenses + insuranceRecovery);
      } else if (actualLoss[i] || actualRecovery || recoveryExpenses || insuranceRecovery) {
        totals[i] = actualLoss[i] - (+ actualRecovery + recoveryExpenses + insuranceRecovery);
      } else if (insuranceRecovery[i] || actualRecovery || recoveryExpenses || insuranceRecovery) {
        totals[i] = - (insuranceRecovery[i] + actualRecovery + recoveryExpenses + insuranceRecovery);
      }
    }

    return totals;
  };

  const calculateRowTotal = (row) => {
    return row.values.reduce((acc, value) => acc + (isNaN(value) ? 0 : parseFloat(value)), 0);
  };

  const updateTotalCurrencies = (data) => {
    const totalRow = data.find(row => row.name === 'Total');
    if (totalRow) {
      const total = calculateRowTotal(totalRow);
      setTotalCurrencies(total.toFixed(3)); // Assurez-vous que la valeur est affichée avec deux décimales
    }
  };

  const handleInputChange = (id, index, value) => {
    const newData = tableData.map(row => {
      if (row.id === id) {
        const newValues = [...row.values];
        newValues[index] = value === '' ? 0 : parseFloat(value);
        const newTotal = calculateRowTotal({ ...row, values: newValues });
        return { ...row, values: newValues, total: newTotal };
      }
      return row;
    });

    const totals = calculateTotals(newData);

    const updatedData = newData.map(row => {
      if (row.name === 'Total') {
        return { ...row, values: totals, total: calculateRowTotal({ ...row, values: totals }) };
      }
      return row;
    });

    setTableData(updatedData);
    onFinancesChange(updatedData); // Notify parent about changes
    updateTotalCurrencies(updatedData, selectedCurrency);
  };

  useEffect(() => {
    const totals = calculateTotals(tableData);
    setTableData(prevData => prevData.map(row => {
      if (row.name === 'Total') {
        return { ...row, values: totals, total: calculateRowTotal({ ...row, values: totals }) };
      }
      return row;
    }));
    updateTotalCurrencies(totals);
  }, []);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    const oldCurrency = selectedCurrency;

    let conversionRate = 1;

    if (oldCurrency === 'USD' && newCurrency === 'XAF') {
      conversionRate = exchangeRates.USD_to_XAF;
    } else if (oldCurrency === 'EUR' && newCurrency === 'XAF') {
      conversionRate = exchangeRates.EUR_to_XAF;
    } else if (oldCurrency === 'USD' && newCurrency === 'EUR') {
      conversionRate = 1 / exchangeRates.EUR_to_USD;
    } else if (oldCurrency === 'XAF' && newCurrency === 'USD') {
      conversionRate = 1 / exchangeRates.USD_to_XAF;
    } else if (oldCurrency === 'XAF' && newCurrency === 'EUR') {
      conversionRate = 1 / exchangeRates.EUR_to_XAF;
    } else if (oldCurrency === 'EUR' && newCurrency === 'USD') {
      conversionRate = exchangeRates.EUR_to_USD;
    }

    const convertedData = tableData.map(row => {
      const convertedValues = row.values.map(value => value * conversionRate);
      return { ...row, values: convertedValues };
    });

    let updatedAvailableCurrencies = { USD: true, EUR: true, XAF: true };
    if (newCurrency === 'USD') {
      updatedAvailableCurrencies = { USD: true, EUR: true, XAF: true };
    } else if (newCurrency === 'EUR') {
      updatedAvailableCurrencies = { USD: true, EUR: true, XAF: false };
    } else if (newCurrency === 'XAF') {
      updatedAvailableCurrencies = { USD: true, EUR: false, XAF: true };
    }

    const newTotalCurrencies = (totalCurrencies * conversionRate).toFixed(3);
    setTableData(convertedData);
    setSelectedCurrency(newCurrency);
    setAvailableCurrencies(updatedAvailableCurrencies);
    setTotalCurrencies(newTotalCurrencies);
    onFinancesChange(financesData, selectedCurrency);
  };

  return (
    <Box>

      <Flex justifyContent="space-between" alignItems='center' mb={4}>
        <Flex flex="1" alignItems='center' gap={4}>
          <Text fontSize={12}>Total Currencies :</Text>
          <Box w='30%'>
            <Input
              fontSize={12}
              placeholder="Total Currencies"
              value={totalCurrencies}
              onChange={(e) => setTotalCurrencies(e.target.value)}
              type="text"
              isReadOnly
            />
          </Box>
        </Flex>
        <Flex flex="1" alignItems='center' gap={4}>
          <Text fontSize={12}>Currencies :</Text>
          <Box w='30%'>
            <Select
              fontSize={12}
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              style={{ color: !selectedCurrency ? 'gray' : 'black' }}
            >
              <option value="USD" disabled={!availableCurrencies.USD}>
                USD
              </option>
              <option value="XAF" disabled={!availableCurrencies.XAF}>
                XAF
              </option>
              <option value="EUR" disabled={!availableCurrencies.EUR}>
                EUR
              </option>
            </Select>

          </Box>
        </Flex>
      </Flex>

      {isEdit && (
        <Flex gap={16} mb={10}>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th textAlign="start"></Th>
                <Th textAlign="start" fontSize={10}>Total</Th>
                <Th textAlign="start" fontSize={10}>Direct</Th>
                <Th textAlign="start" fontSize={10}>Regulatory fines</Th>
                <Th textAlign="start" fontSize={10}>Asset write-down</Th>
                <Th textAlign="start" fontSize={10}>Other</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((row, index) => (
                <Tr key={index} height="10px">
                  <Td fontSize={12} width='20%' height="10px">{row.name}</Td>
                  <Td height="10px">
                    <Text fontSize={12}>{row.name === 'Total' ? row.total : calculateRowTotal(row)}</Text>
                  </Td>
                  {row.values.map((value, index) => (
                    <Td key={index} height="10px">
                      <Text fontSize={12}>{value || 0}</Text>
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box maxW="300px">
            <Table variant="simple" >
              <TableCaption placement="top" fontSize={12}>DAILY RATE</TableCaption>
              <Tbody>
                <Tr>
                  <Td maxW="150px" fontSize={12}>EUR/USD</Td>
                  <Td maxW="150px" fontSize={12}>1,208</Td>
                </Tr>
                <Tr>
                  <Td maxW="150px" fontSize={12}>USD/XAF</Td>
                  <Td maxW="150px" fontSize={12}>{exchangeRates.USD_to_XAF}</Td>
                </Tr>
                <Tr>
                  <Td maxW="150px" fontSize={12}>EUR/XAF</Td>
                  <Td maxW="150px" fontSize={12}>{exchangeRates.EUR_to_XAF}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Flex>
      )}

      <Flex gap={16}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="start"></Th>
              <Th textAlign="start" fontSize={10}>Total</Th>
              <Th textAlign="start" fontSize={10}>Direct</Th>
              <Th textAlign="start" fontSize={10}>Regulatory fines</Th>
              <Th textAlign="start" fontSize={10}>Asset write-down</Th>
              <Th textAlign="start" fontSize={10}>Other</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index} height="10px">
                <Td fontSize={12} width='20%' height="10px">{row.name}</Td>
                <Td height="10px">
                  <Input
                    height="20px"
                    fontSize={12}
                    value={row.name === 'Total' ? row.total : calculateRowTotal(row)}
                    isReadOnly
                  />
                </Td>
                {row.values.map((value, index) => (
                  <Td key={index} height="10px">
                    <Input
                      height="20px"
                      fontSize={12}
                      value={value || 0}
                      onChange={e => handleInputChange(row.id, index, e.target.value)}
                      isReadOnly={row.name === 'Total'} // Make the "Total" row read-only
                      type="number"
                      step="0.01"
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box maxW="300px">
          <Table variant="simple">
            <TableCaption placement="top" fontSize={12}>DAILY RATE</TableCaption>
            <Tbody>
              <Tr>
                <Td maxW="150px" fontSize={12}>EUR/USD</Td>
                <Td maxW="200px" fontSize={12}>{exchangeRates.EUR_to_USD}</Td>
              </Tr>
              <Tr>
                <Td maxW="150px" fontSize={12}>USD/XAF</Td>
                <Td maxW="200px" fontSize={12}>
                  <Input
                    fontSize={12}
                    value={exchangeRates.USD_to_XAF}
                    onChange={(e) => handleRateChange('USD_to_XAF', e.target.value)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td maxW="150px" fontSize={12}>EUR/XAF</Td>
                <Td maxW="200px" fontSize={12}>
                  <Input
                    fontSize={12}
                    value={exchangeRates.EUR_to_XAF}
                    onChange={(e) => handleRateChange('EUR_to_XAF', e.target.value)}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
      {/* <Button mt={4} colorScheme="blue" onClick={handleButtonClick}>
        Send Payload
      </Button> */}
    </Box>

  );
};

export default Finances;
