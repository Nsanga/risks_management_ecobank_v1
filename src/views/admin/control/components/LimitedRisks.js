import React, { useState } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
} from '@chakra-ui/react';

const LimitedRisks = () => {
    const [limitedRisks, setLimitedRisks] = useState([]); // Commence avec un tableau vide

    return (
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Table variant="simple">
                <Thead bg="blue.100">
                    <Tr>
                        <Th>Référence Entité</Th>
                        <Th>Référence Risque</Th>
                        <Th>Description</Th>
                        <Th>Exposition</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {limitedRisks.length === 0 ? (
                        <Tr>
                            <Td colSpan={4} textAlign="center">Aucune donnée à afficher</Td>
                        </Tr>
                    ) : (
                        limitedRisks.map((risk, index) => (
                            <Tr key={index}>
                                <Td>{risk.entityReference}</Td>
                                <Td>{risk.riskReference}</Td>
                                <Td>{risk.description}</Td>
                                <Td>{risk.exposure}</Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </Box>
    );
};

export default LimitedRisks;
