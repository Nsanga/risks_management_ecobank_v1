import React, { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import GeneralForm from "./GeneralForm"; // Adjust the path as needed
import { CheckCircleIcon } from "@chakra-ui/icons";

const RiskControl = ({
  riskControlData,
  profiles,
  handleSelectChange,
  handleChange,
  currentAssoCiate,
}) => {
  // const [formData, setFormData] = useState({
  //   controlRef: "",
  //   controlCategory: "",
  //   description: "",
  //   nominee: "",
  //   reviewer: "",
  //   reviewDate: "",
  //   frequency: "N/A",
  //   lastOperator: "",
  //   nextOperation: "",
  //   keyControl: false,
  //   activeControl: true,
  // });
console.log("currentAssoCiate:", currentAssoCiate);
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: type === 'checkbox' ? checked : value,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (
      !riskControlData.controlRef ||
      !riskControlData.nominee ||
      !riskControlData.reviewer
    ) {
      toast({
        title: "Error.",
        description: "Please fill out all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log("Form submitted:", riskControlData);
    // Here you can add logic to send the form data to an API or handle it as needed
    toast({
      title: "Success!",
      description: "Form submitted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box className="container">
      <Table variant="simple" mb={6}>
        <Thead bg="blue.100">
          <Tr>
            <Th style={{ fontSize: "10px" }}>Ref</Th>
            <Th style={{ fontSize: "10px" }}>Description</Th>
            <Th style={{ fontSize: "10px" }}>Active</Th>
            <Th style={{ fontSize: "10px" }}>Key Ctrl</Th>
            <Th style={{ fontSize: "10px" }}>Last Assess. Date</Th>
            <Th style={{ fontSize: "10px" }}>Last Assess. Design</Th>
            <Th style={{ fontSize: "10px" }}>Last Assess. Performance</Th>
            <Th style={{ fontSize: "10px" }}>Last Assess. Creator</Th>
            <Th style={{ fontSize: "10px" }}>Last Assess. Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontSize={12}>{currentAssoCiate.reference}</Td>
            <Td fontSize={12}>{currentAssoCiate.controlDescription?.length > 20 ? `${currentAssoCiate.controlDescription.substring(0, 35)}...` : currentAssoCiate.controlDescription}</Td>
            <Td fontSize={12}>
              <CheckCircleIcon color="green.500" />
            </Td>
            <Td fontSize={12}>{riskControlData.keyControl ? "Y" : "N"}</Td>
            <Td fontSize={12}>Acceptable</Td>
            <Td fontSize={12}>Not Assessed</Td>
            <Td fontSize={12}>Not Attended</Td>
            <Td fontSize={12}>---</Td>
            <Td fontSize={12}>---</Td>
          </Tr>
        </Tbody>
      </Table>

      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        mt={6}
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab fontSize={12}>Details</Tab>
          <Tab fontSize={12}>History</Tab>
          <Tab fontSize={12}>Documents</Tab>
          <Tab fontSize={12}>Actions</Tab>
          <Tab fontSize={12}>Risk focus</Tab>
          <Tab fontSize={12}>Risks logs</Tab>
          <Tab fontSize={12}>Linked items</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Import the GeneralForm component */}
            <GeneralForm
              formData={riskControlData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              profiles={profiles}
              handleSubmit={handleSubmit}
              currentAssoCiate={currentAssoCiate}
            />
          </TabPanel>
          {/* Additional TabPanels for other tabs can go here */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RiskControl;
