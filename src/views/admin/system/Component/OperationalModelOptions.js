import React from 'react';
import { Box, Button, Select, FormControl, FormLabel, Flex, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const OperationalModelOptions = ({ businessLines = [], locations = [], onSelectAll, onUnselectAll, onCopyViews }) => (
    <Box p={6} >
        <Text mb={4}>
            Select the operational model items for this user.
            <br />
            <strong>IMPORTANT:</strong> At least one operational model must be selected per category.
        </Text>
        <Flex direction="column" gap={4}>
            <Flex justify="space-between" mb={4}>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    size="sm"
                    fontSize={14}
                    aria-label="Select all items"
                    onClick={onSelectAll}
                >
                    Select All
                </Button>
                <Button
                    leftIcon={<MinusIcon />}
                    colorScheme="red"
                    size="sm"
                    fontSize={14}
                    aria-label="Unselect all items"
                    onClick={onUnselectAll}
                >
                    Unselect All
                </Button>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="teal"
                    size="sm"
                    aria-label="Copy user views"
                    onClick={onCopyViews}
                    fontSize={14}
                >
                    Copy User Views
                </Button>
            </Flex>
            <Box mt={4}>
                <Flex direction="column" gap={4}>
                    <FormControl>
                        <FormLabel fontSize={14}>Business Line</FormLabel>
                        <Select placeholder="Select business line">
                            {businessLines.map((line) => (
                                <option key={line.value} value={line.value}>
                                    {line.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={14}>Location</FormLabel>
                        <Select placeholder="Select location">
                            {locations.map((location) => (
                                <option key={location.value} value={location.value}>
                                    {location.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Flex>
            </Box>
        </Flex>
    </Box>
);

export default OperationalModelOptions;
