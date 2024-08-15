import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Head = ({
    eventRef,
    currentState,
    currentLocks,
    description,
    totalLosses,
    externalRef,
    ...rest
}) => {
    return (
        <Box p={5} shadow='md' borderWidth='1px' {...rest}>
            <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                Event details
            </Box>
            <Flex flexDirection='column' gap={4}>
                <Flex alignItems='center' gap={32}>
                    <Flex alignItems='center' gap={10}>
                        <Text>Event ref:</Text>
                        <Box style={{ color: 'blue', fontWeight: 'bold' }}>{eventRef}</Box>
                    </Flex>
                    <Flex alignItems='center' gap={4}>
                        <Text>Current State: </Text>
                        <Box style={{ color: 'blue', fontWeight: 'bold' }}>{currentState}</Box>
                    </Flex>
                    <Flex alignItems='center' gap={4}>
                        <Text>Current Locks: </Text><Box>{currentLocks}</Box>
                    </Flex>
                </Flex>
                <Flex gap={5}>
                    <Text>Description:</Text>
                    <Flex flexWrap='wrap' style={{ color: 'blue', fontWeight: 'bold' }}>{description}</Flex>
                </Flex>
                <Flex alignItems='center' gap={32}>
                    <Flex alignItems='center' gap={4}>
                        <Text>Total Losses: </Text>
                        <Box>
                            <span style={{ color: 'blue', fontWeight: 'bold' }}>{totalLosses}</span> <span style={{ fontWeight: 'bold' }}>USD</span>
                        </Box>
                    </Flex>
                    <Flex alignItems='center' gap={4}>
                        <Text>External Ref:</Text> <Box style={{ color: 'blue', fontWeight: 'bold' }}>{externalRef}</Box>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Head
