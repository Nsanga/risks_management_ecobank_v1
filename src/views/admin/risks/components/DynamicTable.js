import { Box, Flex, Input, Select, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const rows = [
    { id: 'actualLoss', value: 'Actual Loss' },
    { id: 'potentialLoss', value: 'Potential Loss' },
    { id: 'actualRecovery', value: 'Actual Recovery' },
    { id: 'expectedRecovery', value: 'Expected Recovery' },
    { id: 'recoveryExpenses', value: 'Recovery Expenses' },
    { id: 'insuranceRecovery', value: 'Insurance Recovery' },
    { id: 'nearMiss', value: 'Near Miss' },
];

const columns = [
    { id: 'direct', value: 'Direct' },
    { id: 'regulatoryFines', value: 'Amendes réglementaires' },
    { id: 'assetImpairment', value: 'Dépréciation d’actif' },
    { id: 'other', value: 'Other' },
];

const DynamicTable = ({ onDataChange, financesData }) => {
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

    const handleChange = (rowId, colId, value) => {
        const newData = { ...data };
        if (!newData[rowId]) newData[rowId] = {};
        newData[rowId][colId] = value;
        setData(newData);
    };

    const convertAllData = (prevCurrency, newCurrency) => {
        const newData = {};
        rows.forEach(({ id: rowId }) => {
            newData[rowId] = {};
            columns.forEach(({ id: colId }) => {
                const val = parseFloat(data?.[rowId]?.[colId]);
                const safeVal = isNaN(val) ? 0 : val;

                const convertedVal = convertBetweenCurrencies(safeVal, prevCurrency, newCurrency);
                newData[rowId][colId] = convertedVal.toFixed(2);
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

    const calculateRowTotal = (rowId) => {
        return columns.reduce((sum, { id: colId }) => {
            const val = parseFloat(data?.[rowId]?.[colId]);
            return sum + (isNaN(val) ? 0 : val);
        }, 0);
    };

    const calculateColumnTotal = (colId) => {
        const get = (rowId) => parseFloat(data?.[rowId]?.[colId]) || 0;

        return (
            get('actualLoss') - (get('actualRecovery') + get('recoveryExpenses') + get('insuranceRecovery'))
        );
    };

    const calculateGlobalTotal = () => {
        return columns.reduce((sum, { id: colId }) => {
            const get = (rowId) => parseFloat(data?.[rowId]?.[colId]) || 0;

            return sum + (
                get('actualLoss') - (get('actualRecovery') + get('recoveryExpenses') + get('insuranceRecovery'))
            );
        }, 0);
    };

    const buildPayload = () => {
        const enrichedData = {};
        rows.forEach(({ id: rowId }) => {
            enrichedData[rowId] = {
                ...data?.[rowId],
                total: calculateRowTotal(rowId),
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

    useEffect(() => {
        if (financesData?.data) {
            const loadedData = {};
            rows.forEach(({ id: rowId }) => {
                loadedData[rowId] = {};
                columns.forEach(({ id: colId }) => {
                    const value = financesData.data?.[rowId]?.[colId];
                    loadedData[rowId][colId] = value === null || value === undefined ? '' : value;
                });
            });
            setData(loadedData);

            if (financesData.currency) {
                setCurrency(financesData.currency);
            }
        }
    }, []);

    return (
        <div style={{ overflowX: 'auto' }}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Flex flex="1" alignItems="center" gap={4}>
                    <Text fontSize={12}>Total des devises :</Text>
                    <span style={{ fontSize: "12px" }}>{calculateGlobalTotal().toFixed(2)} {currency}</span>
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
                                <Th key={col.id} textAlign="start" fontSize={10}>{col.value}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rows.map((row) => (
                            <Tr key={row.id}>
                                <Td fontSize={12}><strong>{row.value}</strong></Td>
                                <Td fontSize={12} height="10px">{calculateRowTotal(row.id).toFixed(2)}</Td>
                                {columns.map((col) => (
                                    <Td key={col.id}>
                                        <Input
                                            type="number"
                                            value={data?.[row.id]?.[col.id] || ''}
                                            onChange={(e) => handleChange(row.id, col.id, e.target.value)}
                                            placeholder="0"
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
                                <Td fontSize={12} height="10px" key={col.id}>
                                    {calculateColumnTotal(col.id).toFixed(2)}
                                </Td>
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
