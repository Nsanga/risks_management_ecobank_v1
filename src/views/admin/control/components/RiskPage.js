import {
    Box,
    Text,
    Flex,
    SimpleGrid,
    GridItem,
    Input,
    Textarea,
    Badge,
    Button
} from "@chakra-ui/react";

const RiskPage = () => {
    return (
        <Box>
            {/* Header section */}
            <Box bg="white" p={6} rounded="md" shadow="md" mb={6}>
                <Flex alignItems='center' gap={4} mb={4}>
                    <Text fontWeight="bold">
                        Entity:
                    </Text>
                    <Input value="ENT0041 | ECM: AKWA BRANCH" isDisabled />
                </Flex>
                <Flex alignItems='center'>
                    <Text fontWeight="bold" mr={2}>
                        Location:
                    </Text>
                    <Input value="CAMEROON" isDisabled />
                    <Text ml={4} fontWeight="bold" mr={2}>
                        Business Line:
                    </Text>
                    <Input value="Consumer" isDisabled />
                </Flex>
            </Box>

            {/* Main grid section */}
            <SimpleGrid columns={2} spacing={10}>
                {/* Left section */}
                <Box bg="white" p={6} rounded="md" shadow="md">
                    <Text fontWeight="bold" mb={2}>CBR Description:</Text>
                    <Input value="[N/A]" isDisabled />

                    <Text mt={6} fontWeight="bold" mb={2}>Description:</Text>
                    <Textarea value="La difficulté à localiser le client reste une véritable..." isDisabled />

                    <Text mt={6} fontWeight="bold" mb={2}>Risk Category:</Text>
                    <Input value="PRO.1 Inadequate Policies & Procedures" isDisabled />

                    <Text mt={6} fontWeight="bold" mb={2}>Dismissal Category:</Text>
                    <Input value="EXE.2.1 Failed mandatory reporting obligation" isDisabled />
                </Box>

                {/* Right section */}
                <Box bg="white" p={6} rounded="md" shadow="md">
                    <SimpleGrid columns={1} spacing={4}>
                        <GridItem>
                            <Text fontWeight="bold">Risk Ref:</Text>
                            <Input value="RSK67139" isDisabled />
                        </GridItem>
                        <GridItem>
                            <Text fontWeight="bold">Linked Risk:</Text>
                            <Input value="[Not available]" isDisabled />
                        </GridItem>
                        <GridItem>
                            <Text fontWeight="bold">Residual Severity:</Text>
                            <Input value="[Not available]" isDisabled />
                        </GridItem>
                        <GridItem>
                            <Text fontWeight="bold">Residual Score:</Text>
                            <Input value="0.00 USD" isDisabled />
                        </GridItem>
                        <GridItem>
                            <Text fontWeight="bold">Residual Ann Exp:</Text>
                            <Input value="0.00 USD" isDisabled />
                        </GridItem>
                        <GridItem>
                            <Text fontWeight="bold">Risk Actions:</Text>
                            <Input value="0" isDisabled />
                        </GridItem>
                        <GridItem>
                            <Text fontWeight="bold">Risk Status:</Text>
                            <Badge colorScheme="green">Approved</Badge>
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default RiskPage;
