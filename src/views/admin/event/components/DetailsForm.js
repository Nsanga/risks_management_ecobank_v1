import { Box, Checkbox, Flex, Input, Select, Text, Textarea } from '@chakra-ui/react'
import React from 'react'

const DetailsForm = ({detailledDescription}) => {

    return (
        <Flex flexDirection='column' gap={4}>
            <Box p={5} shadow='md' borderWidth='1px'>
                <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                    Detailed Description
                </Box>
                <Text style={{ color: 'blue', fontWeight: 'bold' }}>{detailledDescription}</Text>
            </Box>
        </Flex>
    )
}

export default DetailsForm
