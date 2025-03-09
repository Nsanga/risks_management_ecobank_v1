import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  SimpleGrid,
  Badge,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import Select from "react-select";

const RiskPage = ({
  riskData,
  entities,
  handleChange,
  handleSelectChange,
  isEditMode,
  selectedRisk,
}) => {
  // Initialize local state for each input field
  // const [formData, setFormData] = useState({
  //     entity: "",
  //     location: "CAMEROON",
  //     businessLine: "Consumer",
  //     cbrDescription: "[N/A]",
  //     description: "",
  //     riskCategory: "",
  //     dismissalCategory: "",
  //     riskRef: "",
  //     linkedRisk: "",
  //     residualSeverity: "",
  //     residualScore: "0.00 USD",
  //     residualAnnExp: "0.00 USD",
  //     riskActions: "0",
  //     riskStatus: "Approved"
  // });

  // // Handle change for inputs
  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // // Log the payload to the console
  // const logPayload = () => {
  //     console.log(formData);
  // };
  const entitiesOptions = entities?.map((entity, index) => ({
    key: `${entity._id}-${index}`, // Unicité assurée
    value: entity._id,
    label: `ENT${entity.referenceId} CAM - ${entity.description}`,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
  };

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Flex
          direction="column"
          width={{ base: "100%", md: isEditMode ? "75%" : "100%" }}
          gap={4}
        >
          <HStack spacing={24} alignItems="center">
            <Text fontSize={12} fontWeight="bold">
              Entity:
            </Text>
            <Box width="100%">
              <Input
                fontSize={12}
                name="entity"
                value={selectedRisk.departmentFunction}
                readOnly
              />
            </Box>
          </HStack>
          <HStack spacing={isEditMode ? 6 : 16} alignItems="center">
            <Text fontSize={12} fontWeight="bold" mr={2}>
              Operational Models:
            </Text>
            <Text fontSize={12}>Location:</Text>
            {isEditMode ? (
              <Text fontSize={12} fontWeight="bold" mr={2}>
                {riskData.location}
              </Text>
            ) : (
              <Input
                fontSize={12}
                name="location"
                value={selectedRisk.location}
                onChange={handleChange}
                // onBlur={logPayload} // Log payload on blur
              />
            )}
            <Text fontSize={12}>Business Line:</Text>
            {isEditMode ? (
              <Text fontSize={12} fontWeight="bold">
                {riskData.businessLine}
              </Text>
            ) : (
              <Input
                fontSize={12}
                name="businessLine"
                value={riskData.businessLine}
                onChange={handleChange}
                // onBlur={logPayload} // Log payload on blur
              />
            )}
          </HStack>
          <HStack spacing={14} alignItems="center">
            <Text fontSize={12} fontWeight="bold" mb={2}>
              CBR Description:
            </Text>
            <Input
              fontSize={12}
              name="cbrDescription"
              value={riskData.cbrDescription}
              onChange={handleChange}
              // onBlur={logPayload} // Log payload on blur
            />
          </HStack>
          <HStack spacing={16} alignItems="center">
            <Text fontSize={12} ml={1} mt={6} fontWeight="bold" mb={2}>
              Description:
            </Text>
            <Textarea
              fontSize={12}
              name="description"
              value={selectedRisk.description}
              // onChange={handleChange}
              readOnly
              // onBlur={logPayload} // Log payload on blur
            />
          </HStack>
          <HStack spacing={16} alignItems="center">
            <Text fontSize={12} mt={6} fontWeight="bold" mb={2}>
              Risk Category:
            </Text>
            <Input
              fontSize={12}
              name="riskCategory"
              value={selectedRisk.riskCategory}
              onChange={handleChange}
              readOnly
              // onBlur={logPayload} // Log payload on blur
            />
          </HStack>
          <HStack spacing={10} alignItems="center">
            <Text fontSize={12} mt={6} fontWeight="bold" mb={2}>
              Dismissal Category:
            </Text>
            <Input
              fontSize={12}
              name="dismissalCategory"
              value={riskData.dismissalCategory}
              onChange={handleChange}
              // onBlur={logPayload} // Log payload on blur
            />
          </HStack>
        </Flex>
        {isEditMode && (
          <Box
            width={{ base: "100%", md: "20%" }}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="lg"
          >
            <Flex gap={4} mb={2}>
              <Text fontSize={12}>Risk Ref:</Text>
              <Text fontSize={12} fontWeight="bold">
                {selectedRisk.reference}
              </Text>
            </Flex>
            <Flex gap={4} mb={2}>
              <Text fontSize={12}>Linked Risk:</Text>
              <Text fontSize={12} fontWeight="bold">
                {riskData.linkedRisk}
              </Text>
            </Flex>
            <Flex gap={4} mb={2}>
              <Text fontSize={12}>Residual Severity:</Text>
              <Text fontSize={12} fontWeight="bold">
                {riskData.residualSeverity}
              </Text>
            </Flex>
            <Flex gap={4} mb={2}>
              <Text fontSize={12}>Residual Score:</Text>
              <Text fontSize={12} fontWeight="bold">
                {riskData.residualScore}
              </Text>
            </Flex>
            <Flex gap={4} mb={2}>
              <Text fontSize={12}>Residual Ann Exp:</Text>
              <Text fontSize={12} fontWeight="bold">
                {riskData.residualAnnExp}
              </Text>
            </Flex>
            <Flex gap={4} mb={2}>
              <Text fontSize={12}>Risk Actions:</Text>
              <Text fontSize={12} fontWeight="bold" color="red">
                {riskData.riskActions}
              </Text>
            </Flex>
            <Flex gap={4} mb={2}>
              <Text fontSize={12}>Risk Status:</Text>
              <Badge fontSize={10} colorScheme="blue">
                {riskData.riskStatus}
              </Badge>
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default RiskPage;
