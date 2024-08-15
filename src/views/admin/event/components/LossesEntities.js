import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react';

const LossesEntities = ({
    entityofDetection,
    subEntityofDetection,
    entityofDOrigin,
    subEntityofOrigin
}) => {

    return (
        <Flex justifyContent='space-between'>
            <Box p={5} shadow='md' borderWidth='1px' width='49%'>
                <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                    Area of Detection
                </Box>
                <Flex flexDirection='column' gap={4}>
                    <Flex justifyContent='space-between' alignItems="center">
                        <Text>Entity:</Text>
                        <Box width={200}>
                            <Text style={{ color: 'blue', fontWeight: 'bold' }}>{entityofDetection}</Text>
                        </Box>
                    </Flex>
                    <Flex justifyContent='space-between' alignItems="center">
                        <Text>Sub Entity:</Text>
                        <Box width={200}>
                            <Text style={{ color: 'blue', fontWeight: 'bold' }}>{subEntityofDetection}</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
            <Box p={5} shadow='md' borderWidth='1px' width='49%'>
                <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                    Area of Origin
                </Box>
                <Flex flexDirection='column' gap={4}>
                    <Flex justifyContent='space-between' alignItems="center">
                        <Text>Entity:</Text>
                        <Box width={200}>
                            <Text style={{ color: 'blue', fontWeight: 'bold' }}>{entityofDOrigin}</Text>
                        </Box>
                    </Flex>
                    <Flex justifyContent='space-between' alignItems="center">
                        <Text>Sub Entity:</Text>
                        <Box width={200}>
                            <Text style={{ color: 'blue', fontWeight: 'bold' }}>{subEntityofOrigin}</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default LossesEntities