import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import ControlListForm from "./components/ControlListForm";
import RiskRegisterForm from "./components/RiskRegisterForm";
import KeyIndicatorAnalysisForm from "./components/KeyIndicatorAnalysisForm";
import RiskAndControlAssessmentDetails from "./components/RiskAndControlAssessmentDetails";
import RiskDetailsForm from "./components/RiskDetailsForm";
import RiskControlTable from "./components/RiskControlTable";
import IncidentTrendsAnalysisForm from "./components/IncidentTrendsAnalysisForm";
import IncidentTrendsAnalysisTable from "./components/IncidentTrendsAnalysisTable";
import IncidentLossReportForm from "./components/IncidentLossReportForm";
import IncidentLossReportTable from "./components/IncidentLossReportTable";
import IncidentEventReportForm from "./components/IncidentEventReportForm";
import EventRecoveriesTable from "./components/EventRecoveriesTable";
import ControlTable from "./components/listRapport";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import KITable from "./components/KITable";
import { useDispatch, useSelector } from "react-redux";
import { listEntities } from "redux/entity/action";
import { listProfiles } from "redux/profile/action";
import { listEntityReports } from "redux/reports/action";
import RiskAssessmentTable from "./components/RiskAssessmentTable";

const Reports = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [openControlListTable, setControlListTable] = useState(false);
  const [openRiskRegisterTable, setRiskRegisterTable] = useState(false);
  const [openRiskAssessmentTable, setRiskAssessmentTable] = useState(false);
  const [openRiskDetails, setRiskDetails] = useState(false);
  const [openIncidentTrendsAnalysisTable, setIncidentTrendsAnalysisTable] = useState(false);
  const [openIncidentLossReportTable, setIncidentLossReportTable] = useState(false);
  const [openEventRecoveriesTable, setEventRecoveriesTable] = useState(false);
  const [openKIListTable, setKIListTable] = useState(false);
  const [selectedData, setSelectedData] = useState({ entities: [], session: "" });

  const cardBg = useColorModeValue("white", "gray.700");
  const entities = useSelector(state => state.EntityReducer.entities);
  const reports = useSelector(state => state.ReportReducer.reports);
  const loading = useSelector(state => state.ReportReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listEntities());
    dispatch(listProfiles());
  }, [dispatch]);

  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
  };

  const handleSelectionChange = ({ selectedEntities, selectedSession }) => {
    setSelectedData({ entities: selectedEntities, session: selectedSession });
  };

  const handleOpenView = () => {
    dispatch(listEntityReports({ sesion: selectedData.session, targetEntityId: selectedData.entities, type: "riskControl" }));
    setControlListTable(true);
  };

  const handleOpenKIReport = () => {
    dispatch(listEntityReports({ targetEntityId: selectedData.entities, type: "keyIndicator" }));
    setKIListTable(true);
  };

  const handleOpenRiskRegisterTable = () => {
    dispatch(listEntityReports({ targetEntityId: selectedData.entities, type: "riskControl" }));
    setRiskRegisterTable(true);
  };

  const handleOpenRiskAssessmentTable = () => {
    dispatch(listEntityReports({ targetEntityId: selectedData.entities, type: "riskControl" }));
    setRiskAssessmentTable(true);
  };

  const handleOpenRiskDetails = () => {
    dispatch(listEntityReports({ sesion: selectedData.session, targetEntityId: selectedData.entities, type: "riskControl" }));
    setRiskDetails(true);
  };

  const handleOpenIncidentTrendsAnalysisTable = () => {
    console.log('ok')
    setIncidentTrendsAnalysisTable(true);
  };
  const handleOpenIncidentLossReportTable = () => {
    setIncidentLossReportTable(true);
  };
  const handleOpenEventRecoveriesTable = () => {
    setEventRecoveriesTable(true);
  };
  const renderForm = () => {
    switch (selectedForm) {
      case "control-list":
        return <ControlListForm handleOpenView={handleOpenView} onSelectionChange={handleSelectionChange} entities={entities} loading={loading} />;
      case "risk-register-report":
        return <RiskRegisterForm handleOpenView={handleOpenRiskRegisterTable} onSelectionChange={handleSelectionChange} entities={entities} loading={loading} />;
      case "risk-control-assessment":
        return <RiskAndControlAssessmentDetails handleOpenView={handleOpenRiskAssessmentTable} onSelectionChange={handleSelectionChange} entities={entities} loading={loading} />;
      case "risk-details-by-entity":
        return <RiskDetailsForm handleOpenView={handleOpenRiskDetails} onSelectionChange={handleSelectionChange} entities={entities} loading={loading} />;
      case "key-indicator-analysis":
        return <KeyIndicatorAnalysisForm handleViewReport={handleOpenKIReport} onSelectionChange={handleSelectionChange} entities={entities} loading={loading} />;
      case "incident-trends-analysis":
        return <IncidentTrendsAnalysisForm handleOpenView={handleOpenIncidentTrendsAnalysisTable} onSelectionChange={handleSelectionChange} entities={entities} loading={loading} />;
      case "incident-loss-report":
        return <IncidentLossReportForm handleOpenView={handleOpenIncidentLossReportTable} onSelectionChange={handleSelectionChange} entities={entities} loading={loading} />;
      case "incident-event-report":
        return <IncidentEventReportForm handleOpenView={handleOpenEventRecoveriesTable} onSelectionChange={handleSelectionChange} entities={entities} loading={loading} />;
      default:
        return (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">
              Select an item from the left menu to display the corresponding form
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
          <ControlTable reports={reports} loading={loading} selectedData={selectedData} />
        </Box>
      )}
      {openRiskRegisterTable && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setRiskRegisterTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <RiskControlTable reports={reports} loading={loading} />
        </Box>
      )}

      {openRiskAssessmentTable && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setRiskAssessmentTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <RiskAssessmentTable reports={reports} loading={loading} />
        </Box>
      )}

      {openRiskDetails && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setRiskAssessmentTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <RiskAssessmentTable reports={reports} loading={loading} />
        </Box>
      )}

      {openKIListTable && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setKIListTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <KITable reports={reports} loading={loading} />
        </Box>
      )}
      {openIncidentTrendsAnalysisTable && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setIncidentTrendsAnalysisTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <IncidentTrendsAnalysisTable reports={reports} loading={loading} />
        </Box>
      )}
      {openIncidentLossReportTable && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setIncidentLossReportTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <IncidentLossReportTable reports={reports} loading={loading} />
        </Box>
      )}
      {openEventRecoveriesTable && (
        <Box>
          <Flex alignItems="center" mb={4} onClick={() => setEventRecoveriesTable(false)} cursor="pointer">
            <ChevronLeftIcon />
            Back to Report's list
          </Flex>
          <EventRecoveriesTable reports={reports} loading={loading} />
        </Box>
      )}
      {!openControlListTable && !openRiskAssessmentTable && !openRiskRegisterTable && !openIncidentTrendsAnalysisTable && !openIncidentLossReportTable && !openEventRecoveriesTable && !openKIListTable && (
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
                      <Button
                        variant="ghost"
                        w="full"
                        justifyContent="flex-start"
                        colorScheme="blue"
                        onClick={() => handleFormSelection("risk-register-report")}
                        bg={
                          selectedForm === "risk-register-report"
                            ? "blue.100"
                            : "transparent"
                        }
                      >
                        Risk register report
                      </Button>
                      <Button
                        variant="ghost"
                        w="full"
                        justifyContent="flex-start"
                        colorScheme="blue"
                        onClick={() => handleFormSelection("risk-control-assessment")}
                        bg={
                          selectedForm === "risk-control-assessment"
                            ? "blue.100"
                            : "transparent"
                        }
                      >
                        Risk & Control assessment
                      </Button>
                      {/* <Button
                        variant="ghost"
                        w="full"
                        justifyContent="flex-start"
                        colorScheme="blue"
                        onClick={() => handleFormSelection("risk-details-by-entity")}
                        bg={
                          selectedForm === "risk-details-by-entity"
                            ? "blue.100"
                            : "transparent"
                        }
                      >
                        Risk Details by Entity
                      </Button> */}
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
                      <Button
                        variant="ghost"
                        w="full"
                        justifyContent="flex-start"
                        colorScheme="purple"
                        onClick={() =>
                          handleFormSelection("incident-trends-analysis")
                        }
                        bg={
                          selectedForm === "incident-trends-analysis"
                            ? "purple.100"
                            : "transparent"
                        }
                      >
                        Incident Trends Analysis
                      </Button>
                      <Button
                        variant="ghost"
                        w="full"
                        justifyContent="flex-start"
                        colorScheme="purple"
                        onClick={() =>
                          handleFormSelection("incident-loss-report")
                        }
                        bg={
                          selectedForm === "incident-loss-report"
                            ? "purple.100"
                            : "transparent"
                        }
                      >
                        Incident Loss Report
                      </Button>
                      <Button
                        variant="ghost"
                        w="full"
                        justifyContent="flex-start"
                        colorScheme="purple"
                        onClick={() =>
                          handleFormSelection("incident-event-report")
                        }
                        bg={
                          selectedForm === "incident-event-report"
                            ? "purple.100"
                            : "transparent"
                        }
                      >
                        Incident Event Report
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
