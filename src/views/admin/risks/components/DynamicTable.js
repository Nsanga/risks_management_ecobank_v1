import { Box, Flex, Input, Select, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const rows = [
    'Actual Loss',
    'Potential Loss',
    'Actual Recovery',
    'Expected Recovery',
    'Recovery Expenses',
    'Insurance Recovery',
    'Near Miss',
];

const columns = ['Direct', 'Amendes réglementaires', 'Dépréciation d’actif', 'Other'];

const DynamicTable = ({ onDataChange }) => {
    const [currency, setCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({
        USD: 1,
        USD_to_XAF: 625,
        EUR_to_USD: 1.208,
        EUR_to_XAF: 655.957,
    });

    const handleRateChange = (rate, value) => {
        setExchangeRates((prevRates) => ({
            ...prevRates,
            [rate]: parseFloat(value),
        }));
    };  

    const [data, setData] = useState(() => {
        const initialData = {};
        rows.forEach(row => {
            initialData[row] = {};
            columns.forEach(col => {
                initialData[row][col] = '';
            });
        });
        return initialData;
    });

    const handleChange = (row, col, value) => {
        const newData = { ...data };
        newData[row][col] = value;
        setData(newData);
    };

    const convertAllData = (prevCurrency, newCurrency) => {
        const newData = {};

        rows.forEach((row) => {
            newData[row] = {};
            columns.forEach((col) => {
                const val = parseFloat(data[row][col]);
                const safeVal = isNaN(val) ? 0 : val;

                const convertedVal = convertBetweenCurrencies(safeVal, prevCurrency, newCurrency);
                newData[row][col] = convertedVal.toFixed(2);
            });
        });

        setData(newData);
    };

    const convertBetweenCurrencies = (value, fromCurrency, toCurrency) => {
        if (fromCurrency === toCurrency) return value;

        // Revenir à USD puis convertir vers la nouvelle devise
        let valueInUSD;

        if (fromCurrency === 'USD') {
            valueInUSD = value;
        } else if (fromCurrency === 'EUR') {
            valueInUSD = value * exchangeRates.EUR_to_USD;
        } else if (fromCurrency === 'XAF') {
            valueInUSD = value / exchangeRates.USD_to_XAF;
        }

        if (toCurrency === 'USD') return valueInUSD;
        if (toCurrency === 'EUR') return valueInUSD / exchangeRates.EUR_to_USD;
        if (toCurrency === 'XAF') return valueInUSD * exchangeRates.USD_to_XAF;

        return value; // fallback
    };

    const handleCurrencyChange = (newCurrency) => {
        if (newCurrency !== currency) {
          convertAllData(currency, newCurrency);
          setCurrency(newCurrency);
        }
      };    

    const calculateRowTotal = (row) => {
        return columns.reduce((sum, col) => {
            const val = parseFloat(data[row][col]);
            return sum + (isNaN(val) ? 0 : val);
        }, 0);
    };

    const calculateColumnTotal = (col) => {
        const actualLoss = parseFloat(data['Actual Loss'][col]) || 0;
        const actualRecovery = parseFloat(data['Actual Recovery'][col]) || 0;
        const recoveryExpenses = parseFloat(data['Recovery Expenses'][col]) || 0;
        const insuranceRecovery = parseFloat(data['Insurance Recovery'][col]) || 0;

        return (
            actualLoss - (actualRecovery + recoveryExpenses + insuranceRecovery)
        );
    };

    const calculateGlobalTotal = () => {
        return columns.reduce((sum, col) => {
            const actualLoss = parseFloat(data['Actual Loss'][col]) || 0;
            const actualRecovery = parseFloat(data['Actual Recovery'][col]) || 0;
            const recoveryExpenses = parseFloat(data['Recovery Expenses'][col]) || 0;
            const insuranceRecovery = parseFloat(data['Insurance Recovery'][col]) || 0;

            return sum + (actualLoss - (actualRecovery + recoveryExpenses + insuranceRecovery));
        }, 0);
    };

    const buildPayload = () => {
        const enrichedData = {};

        rows.forEach(row => {
            enrichedData[row] = {
                ...data[row], // toutes les colonnes éditables
                Total: calculateRowTotal(row), // ajouter la valeur calculée du total
            };
        });

        return {
            currency,
            totalConverted: parseFloat(calculateGlobalTotal()),
            data: enrichedData,
        };
    };

    useEffect(() => {
        if (currency === 'XAF') {
            setCurrency('XAF'); // interdit tout changement sauf retour manuel
        }
    }, [currency]);

    useEffect(() => {
        if (onDataChange) {
            onDataChange(buildPayload());
        }
    }, [data, currency]);

    return (
        <div style={{ overflowX: 'auto' }}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Flex flex="1" alignItems="center" gap={4}>
                    <Text fontSize={12}>Total des devises :</Text>
                    <span style={{ fontSize: "12px" }}>{calculateGlobalTotal()} {currency}</span>
                </Flex>
                <Flex flex="1" alignItems="center" gap={4}>
                    <Text fontSize={12} fontWeight='bold'>Devises :</Text>
                    <Box w="30%">
                        <Select
                            value={currency}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                            fontSize={12}
                            style={{ color: !currency ? "gray" : "black" }}
                        >
                            <option value="USD" >USD</option>
                            <option value="EUR" >EUR</option>
                            <option value="XAF" >XAF</option>
                        </Select>
                    </Box>
                </Flex>
            </Flex>
            <Flex gap={16}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th fontSize={10} textAlign="start">Total</Th>
                            {columns.map((col) => (
                                <Th key={col} textAlign="start" fontSize={10}>{col}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rows.map((row) => (
                            <Tr key={row}>
                                <Td fontSize={12}><strong>{row}</strong></Td>
                                <Td fontSize={12} height="10px">{calculateRowTotal(row).toFixed(2)}</Td>
                                {columns.map((col) => (
                                    <Td key={col}>
                                        <Input
                                            type="number"
                                            value={data[row][col]}
                                            onChange={(e) => handleChange(row, col, e.target.value)}
                                            placeHolder="0"
                                            style={{ width: '100%', fontSize: '12px' }}
                                        />
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                        <Tr style={{ backgroundColor: '#e6f7ff', fontWeight: 'bold' }}>
                            <Td>Total</Td>
                            <Td fontSize={12} height="10px">{calculateGlobalTotal().toFixed(2)}</Td>
                            {columns.map((col) => (
                                <Td fontSize={12} height="10px" key={col}>{calculateColumnTotal(col).toFixed(2)}</Td>
                            ))}
                        </Tr>
                    </Tbody>
                </Table>
                <Box maxW="300px">
                    <Table variant="simple">
                        <TableCaption placement="top" fontSize={12}>
                            Taux journalier
                        </TableCaption>
                        <Tbody>
                            <Tr>
                                <Td fontSize={12}>EUR/USD</Td>
                                <Td fontSize={12}>
                                    {exchangeRates.EUR_to_USD}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontSize={12}>USD/XAF</Td>
                                <Td fontSize={12}>
                                    <Input
                                        fontSize={12}
                                        value={exchangeRates.USD_to_XAF}
                                        onChange={(e) =>
                                            handleRateChange("USD_to_XAF", e.target.value)
                                        }
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontSize={12}>EUR/XAF</Td>
                                <Td fontSize={12}>
                                    <Input
                                        fontSize={12}
                                        value={exchangeRates.EUR_to_XAF}
                                        onChange={(e) =>
                                            handleRateChange("EUR_to_XAF", e.target.value)
                                        }
                                    />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
        </div>
    );
};

export default DynamicTable;
