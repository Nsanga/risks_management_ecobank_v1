import React, { useEffect, useState } from "react";
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
  Flex,
} from "@chakra-ui/react";
import ControlListForm from "./components/ControlListForm";
import KeyIndicatorAnalysisForm from "./components/KeyIndicatorAnalysisForm";
import ControlTable from "./listRapport";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import KITable from "./components/KITable";
import { useDispatch, useSelector } from "react-redux";
import { listEntities } from "redux/entitiy/action";
import { listProfiles } from "redux/profile/action";

const Reports = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [openControlListTable, setControlListTable] = useState(false);
  const [openKIListTable, setKIListTable] = useState(false);
  const cardBg = useColorModeValue("white", "gray.700");
  const entities = useSelector(state => state.EntityReducer.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listEntities());
    dispatch(listProfiles());
  }, [dispatch]);

  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
  };

  const handleOpenView = () => {
    setControlListTable(true);
  }

  const handleOpenKIReport = () => {
    setKIListTable(true);
  }

  const renderForm = () => {
    switch (selectedForm) {
      case "control-list":
        return <ControlListForm handleOpenView={handleOpenView} entities={entities} />;
      case "key-indicator-analysis":
        return <KeyIndicatorAnalysisForm handleViewReport={handleOpenKIReport} entities={entities} />;
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
    <Box mt="100px">
      {openControlListTable && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setControlListTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <ControlTable />
        </Box>
      )}
      {openKIListTable && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setKIListTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <KITable />
        </Box>
      )}
      {!openControlListTable && !openKIListTable && (
        <HStack spacing={6} align="stretch" flex="1">
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
                          handleFormSelection("incident-with-funds")
                        }
                        bg={
                          selectedForm === "incident-with-funds"
                            ? "purple.100"
                            : "transparent"
                        }
                      >
                        Incident with funds
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
                          handleFormSelection("actions-by-period")
                        }
                        bg={
                          selectedForm === "actions-by-period"
                            ? "orange.100"
                            : "transparent"
                        }
                      >
                        Action by period
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
                          handleFormSelection("user-views")
                        }
                        bg={
                          selectedForm === "user-views"
                            ? "teal.100"
                            : "transparent"
                        }
                      >
                        User Views
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
                          handleFormSelection("operational-models")
                        }
                        bg={
                          selectedForm === "operational-models"
                            ? "cyan.100"
                            : "transparent"
                        }
                      >
                        Operational Models
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
                          handleFormSelection("obligation-report")
                        }
                        bg={
                          selectedForm === "obligation-report"
                            ? "red.100"
                            : "transparent"
                        }
                      >
                        Obligation Report
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
            display="flex"
            flexDirection="column"
            maxH="calc(100vh - 120px)"
            overflowY="auto"
          >
            {renderForm()}

          </Box>
        </HStack>
      )}
    </Box>
  );
};

export default Reports;
