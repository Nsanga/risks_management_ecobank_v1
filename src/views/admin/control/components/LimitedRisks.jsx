import React, { useState } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Text,
} from '@chakra-ui/react';

const LimitedRisks = () => {
    const [limitedRisks, setLimitedRisks] = useState([]); // Start with an empty array
    const [editRowId, setEditRowId] = useState(null); // State to track the row being edited

    const handleDescriptionChange = (id, value) => {
        setLimitedRisks((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, description: value } : row
            )
        );
    };

    return (
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Table variant="simple">
                <Thead bg="blue.100">
                    <Tr>
                        <Th>Entity Reference</Th>
                        <Th>Risk Reference</Th>
                        <Th>Description</Th>
                        <Th>Exposure</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {limitedRisks.map((risk, index) => (
                        <Tr key={index}>
                            <Td>{risk.entityReference}</Td>
                            <Td>{risk.riskReference}</Td>
                            <Td>{risk.description}</Td>
                            <Td>{risk.exposure}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Text>No data to display</Text>
        </Box>
    );
};

export default LimitedRisks;
