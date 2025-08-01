import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import logo from '../../assets/img/logoMakeda.png'
import { useTenant } from 'contexts/TenantProvider';

const EmptyData = () => {
    const dataColor = useColorModeValue("navy.700", "white");
    const { tenant } = useTenant();

    return (
        <Flex
            direction="column"
            justifyContent="center"
            align="center"
            height={{ sm: "10rem", lg: "30rem" }}
        >
            <Image
                src={tenant?.logo || logo}
                width={90}
                mb={4}
            />
            <Text color={dataColor} fontSize="sm">
                Aucune donnée disponible.
            </Text>
        </Flex>
    )
}

export default EmptyData
