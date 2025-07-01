import { Text } from '@chakra-ui/react';
import React from 'react'

const FinanceSummaryTable = ({ financesData }) => {
    if (!financesData || !financesData.data) return null;

    const rows = Object.keys(financesData.data);
    const columns = ['Total', 'Direct', 'Amendes réglementaires', 'Dépréciation d\'actif', 'Other'];
    const currency = financesData.currency || 'USD';

    return (
        <div style={{ overflowX: 'auto' }}>
            <Text fontSize={18} marginTop={8} marginBottom={4} fontWeight='bold'>
                Informations Financières actuelles de l'évènement ({currency})
            </Text>

            <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', fontSize: '12px' }}>
                <thead style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
                    <tr>
                        <th></th>
                        {columns.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row}>
                            <td><strong>{row}</strong></td>
                            {columns.map((col) => {
                                const val = financesData.data[row]?.[col];
                                return <td key={col}>{val === null || val === undefined ? '0' : parseFloat(val).toFixed(2)}</td>;
                            })}
                        </tr>
                    ))}
                    <tr style={{ backgroundColor: '#e6f7ff', fontWeight: 'bold' }}>
                        <td>Total</td>
                        <td colSpan={columns.length}>
                            {financesData.totalConverted?.toFixed(2)} 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FinanceSummaryTable
