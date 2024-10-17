import React, { useState } from 'react';
import { Box, Flex, Text, Input, Textarea, SimpleGrid, Badge, GridItem, HStack } from '@chakra-ui/react';

const RiskPage = () => {
    // Initialize local state for each input field
    const [formData, setFormData] = useState({
        entity: "",
        location: "CAMEROON",
        businessLine: "Consumer",
        cbrDescription: "[N/A]",
        description: "",
        riskCategory: "",
        dismissalCategory: "",
        riskRef: "",
        linkedRisk: "",
        residualSeverity: "",
        residualScore: "0.00 USD",
        residualAnnExp: "0.00 USD",
        riskActions: "0",
        riskStatus: "Unapproved"
    });

    // Handle change for inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Log the payload to the console
    const logPayload = () => {
        console.log(formData);
    };

    return (
        <Box>
            <Flex justifyContent='space-between'>
                <Flex direction='column' width={{ base: "100%", md: "75%" }} gap={4}>
                    <HStack spacing={24} alignItems="center">
                        <Text fontSize={12} fontWeight="bold">
                            Entity:
                        </Text>
                        <Input
                            fontSize={12}
                            name="entity"
                            value={formData.entity}
                            onChange={handleChange}
                            onBlur={logPayload} // Log payload on blur
                        />
                    </HStack>
                    <HStack spacing={6} alignItems="center">
                        <Text fontSize={12} fontWeight="bold" mr={2}>
                            Operational Models:
                        </Text>
                        <Text fontSize={12}>
                            Location:
                        </Text>
                        <Text fontSize={12} fontWeight="bold" mr={2}>
                            {formData.location}
                        </Text>
                        {/* <Input
                            fontSize={12}
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            onBlur={logPayload} // Log payload on blur
                        /> */}
                        <Text fontSize={12}>
                            Business Line:
                        </Text>
                        <Text fontSize={12} fontWeight="bold">
                            {formData.businessLine}
                        </Text>
                        {/* <Input
                            fontSize={12}
                            name="businessLine"
                            value={formData.businessLine}
                            onChange={handleChange}
                            onBlur={logPayload} // Log payload on blur
                        /> */}
                    </HStack>
                    <HStack spacing={14} alignItems="center">
                        <Text fontSize={12} fontWeight="bold" mb={2}>CBR Description:</Text>
                        <Input
                            fontSize={12}
                            name="cbrDescription"
                            value={formData.cbrDescription}
                            onChange={handleChange}
                            onBlur={logPayload} // Log payload on blur
                        />
                    </HStack>
                    <HStack spacing={16} alignItems="center">
                        <Text fontSize={12} ml={1} mt={6} fontWeight="bold" mb={2}>Description:</Text>
                        <Textarea
                            fontSize={12}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            onBlur={logPayload} // Log payload on blur
                        />
                    </HStack>
                    <HStack spacing={16} alignItems="center">
                        <Text fontSize={12} mt={6} fontWeight="bold" mb={2}>Risk Category:</Text>
                        <Input
                            fontSize={12}
                            name="riskCategory"
                            value={formData.riskCategory}
                            onChange={handleChange}
                            onBlur={logPayload} // Log payload on blur
                        />
                    </HStack>
                    <HStack spacing={10} alignItems="center">
                        <Text fontSize={12} mt={6} fontWeight="bold" mb={2}>Dismissal Category:</Text>
                        <Input
                            fontSize={12}
                            name="dismissalCategory"
                            value={formData.dismissalCategory}
                            onChange={handleChange}
                            onBlur={logPayload} // Log payload on blur
                        />
                    </HStack>
                </Flex>
                <Box width={{ base: "100%", md: "20%" }} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
                    <Flex gap={4} mb={2}>
                        <Text fontSize={12}>Risk Ref:</Text>
                        <Text fontSize={12} fontWeight="bold">{formData.riskRef}</Text>
                    </Flex>
                    <Flex gap={4} mb={2}>
                        <Text fontSize={12}>Linked Risk:</Text>
                        <Text fontSize={12} fontWeight="bold">{formData.linkedRisk}</Text>
                    </Flex>
                    <Flex gap={4} mb={2}>
                        <Text fontSize={12}>Residual Severity:</Text>
                        <Text fontSize={12} fontWeight="bold">{formData.residualSeverity}</Text>
                    </Flex>
                    <Flex gap={4} mb={2}>
                        <Text fontSize={12}>Residual Score:</Text>
                        <Text fontSize={12} fontWeight="bold">{formData.residualScore}</Text>
                    </Flex>
                    <Flex gap={4} mb={2}>
                        <Text fontSize={12}>Residual Ann Exp:</Text>
                        <Text fontSize={12} fontWeight="bold">{formData.residualAnnExp}</Text>
                    </Flex>
                    <Flex gap={4} mb={2}>
                        <Text fontSize={12}>Risk Actions:</Text>
                        <Text fontSize={12} fontWeight="bold" color='red'>{formData.riskActions}</Text>
                    </Flex>
                    <Flex gap={4} mb={2}>
                        <Text fontSize={12}>Risk Status:</Text>
                        <Badge fontSize={10} colorScheme="blue">{formData.riskStatus}</Badge>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default RiskPage;
