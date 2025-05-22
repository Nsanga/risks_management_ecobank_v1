import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ControlListForm from "./components/ControlListForm";
import KeyIndicatorAnalysisForm from "./components/KeyIndicatorAnalysisForm";
import ControlTable from "./listRapport";

const Reports = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const cardBg = useColorModeValue("white", "gray.700");

  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case "control-list":
        return <ControlListForm />;
      case "key-indicator-analysis":
        return <KeyIndicatorAnalysisForm />;
      default:
        return (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">
              Select an item from the left menu to display the corresponding
              form
            </Text>
          </Box>
        );
    }
  };

  return (
    // <h3>Bonjour</h3>
    <Box mt="100px">
      <HStack spacing={6} align="start">
        <Box w="350px" bg={cardBg} borderRadius="lg" p={4} shadow="md">
          <Heading size="md" mb={4} color="gray.700">
            Repports Menu
          </Heading>

          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton _expanded={{ bg: "blue.50", color: "blue.600" }}>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Risk and Control Reports
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      colorScheme="blue"
                      onClick={() => handleFormSelection("control-list")}
                      bg={
                        selectedForm === "control-list"
                          ? "blue.100"
                          : "transparent"
                      }
                    >
                      Control List
                    </Button>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _expanded={{ bg: "green.50", color: "green.600" }}
              >
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Key Indicator Reports
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      colorScheme="green"
                      onClick={() =>
                        handleFormSelection("key-indicator-analysis")
                      }
                      bg={
                        selectedForm === "key-indicator-analysis"
                          ? "green.100"
                          : "transparent"
                      }
                    >
                      Key Indicator Analysis
                    </Button>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _expanded={{ bg: "purple.50", color: "purple.600" }}
              >
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Loss Reports
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      colorScheme="purple"
                      onClick={() =>
                        handleFormSelection("key-indicator-analysis")
                      }
                      bg={
                        selectedForm === "key-indicator-analysis"
                          ? "purple.100"
                          : "transparent"
                      }
                    >
                      Key Indicator Analysis
                    </Button>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton
                _expanded={{ bg: "orange.50", color: "orange.600" }}
              >
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Combined Reports
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      colorScheme="orange"
                      onClick={() =>
                        handleFormSelection("key-indicator-analysis")
                      }
                      bg={
                        selectedForm === "key-indicator-analysis"
                          ? "orange.100"
                          : "transparent"
                      }
                    >
                      Key Indicator Analysis
                    </Button>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton _expanded={{ bg: "teal.50", color: "teal.600" }}>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  System Reports
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      colorScheme="teal"
                      onClick={() =>
                        handleFormSelection("key-indicator-analysis")
                      }
                      bg={
                        selectedForm === "key-indicator-analysis"
                          ? "teal.100"
                          : "transparent"
                      }
                    >
                      Key Indicator Analysis
                    </Button>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton _expanded={{ bg: "cyan.50", color: "cyan.600" }}>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Configuration Reports
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      colorScheme="cyan"
                      onClick={() =>
                        handleFormSelection("key-indicator-analysis")
                      }
                      bg={
                        selectedForm === "key-indicator-analysis"
                          ? "cyan.100"
                          : "transparent"
                      }
                    >
                      Key Indicator Analysis
                    </Button>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton _expanded={{ bg: "red.50", color: "red.600" }}>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Other
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      colorScheme="red"
                      onClick={() =>
                        handleFormSelection("key-indicator-analysis")
                      }
                      bg={
                        selectedForm === "key-indicator-analysis"
                          ? "red.100"
                          : "transparent"
                      }
                    >
                      Key Indicator Analysis
                    </Button>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <Box
          flex="1"
          bg={cardBg}
          borderRadius="lg"
          p={6}
          shadow="md"
          overflowY="auto"
        >
          {renderForm()}
        </Box>
      </HStack>

      <ControlTable />
    </Box>
  );
};

export default Reports;
