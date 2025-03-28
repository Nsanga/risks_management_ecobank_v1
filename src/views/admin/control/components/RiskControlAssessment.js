// src/components/RiskControlAssessment.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { connect, useDispatch } from "react-redux";
import { listControlHistories } from "redux/controlHistory/action";
import { AddControlHistory } from "redux/controlHistory/action";
import { listEntityRiskControls } from "redux/entityRiskControl/action";

const RiskControlAssessment = ({
  controlHistories,
  currentAssoCiate,
  selectedRisk,
  selectedEntityDescription,
}) => {
  const userName = localStorage.getItem("username");

  const [formData, setFormData] = useState({
    performance: "Not Assessed",
    assessedBy: userName ? userName : "",
    assessedOn: "",
    dueOn: "",
    closedDate: "",
    notes: "",
    attested: true,
    monitoringMethodology: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (currentAssoCiate &&
        currentAssoCiate?.historyControl &&
        currentAssoCiate?.historyControl?.length > 0) ||
      (selectedRisk &&
        selectedRisk?.historyControl &&
        selectedRisk?.historyControl?.length > 0)
    ) {
      const historyControl =
        currentAssoCiate?.historyControl || selectedRisk?.historyControl;
  
      if (historyControl && historyControl.length > 0) {
        const latestHistory = historyControl[0];
  
        setFormData({
          performance: latestHistory?.performance || "Not Assessed",
          assessedBy: userName
            ? userName
            : latestHistory?.assessedBy || "",
          assessedOn: latestHistory?.assessedOn || "",
          dueOn: latestHistory?.dueOn || "",
          closedDate: latestHistory?.closedDate || "",
          notes: latestHistory?.notes || "",
          attested: latestHistory?.attested || true,
          monitoringMethodology:
            currentAssoCiate?.monitoringMethodology ||
            selectedRisk?.monitoringMethodology ||
            "",
        });
      }
    }
  }, [dispatch]);
  const handleSave = async () => {
    await dispatch(
      AddControlHistory({
        ...formData,
        idControl: currentAssoCiate._id || selectedRisk._id,
        monitoringMethodology: undefined,
      })
    );
    dispatch(listEntityRiskControls(selectedEntityDescription));
    // setFormData({
    //   performance: "Not Assessed",
    //   assessedBy: "",
    //   assessedOn: "",
    //   dueOn: "",
    //   closedDate: "",
    //   notes: "",
    //   attested: true
    // });
  };

  const controlSelected =
    currentAssoCiate.historyControl || selectedRisk.historyControl;

  return (
    <Box fontSize="12px">
      {/* Container Grid */}
      <Flex gap={4} alignItems="start">
        {/* Left Column (Table) */}
        {/* <GridItem> */}
        <Box bg="white" width="70%">
          <Table variant="simple" width="100%" fontSize="10px">
            <Thead bg="gray.200">
              <Tr>
                <Th>Ref</Th>
                <Th>Ass On</Th>
                <Th>Due On</Th>
                <Th>Closed date</Th>
                <Th>Perf</Th>
                <Th>Att</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(currentAssoCiate?.historyControl &&
                currentAssoCiate?.historyControl.length > 0) ||
                (selectedRisk?.historyControl &&
                  selectedRisk?.historyControl.length > 0 && (
                    <>
                      {controlSelected
                        .slice(-5) // Récupère les cinq derniers éléments
                        .map((controlHistory) => (
                          <Tr key={controlHistory._id}>
                            <Td>{controlHistory.reference}</Td>
                            <Td>{controlHistory.assessedOn}</Td>
                            <Td>{controlHistory.dueOn}</Td>
                            <Td>{controlHistory.closedDate}</Td>
                            <Td>{controlHistory.performance}</Td>
                            <Td>
                              <Checkbox
                                isChecked={controlHistory.attested}
                                isReadOnly
                              />
                            </Td>
                          </Tr>
                        ))}
                    </>
                  ))}
            </Tbody>
          </Table>
          <FormControl
            mb={4}
            style={{
              position: "relative",
              top: "160px",
            }}
          >
            <FormLabel fontSize="sm">Methodologie du teste:</FormLabel>
            <Textarea
              fontSize="sm"
              textAlign="justify"
              value={formData.monitoringMethodology}
              // onChange={(e) =>
              //   setFormData({ ...formData, monitoringMethodology: e.target.value })
              // }
              readOnly
            />
          </FormControl>
        </Box>
        {/* </GridItem> */}

        {/* Right Column (Form) */}
        {/* <GridItem> */}
        <Box bg="white" width="30%">
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Performance</FormLabel>
                <Select
                  fontSize="sm"
                  value={formData.performance}
                  onChange={(e) =>
                    setFormData({ ...formData, performance: e.target.value })
                  }
                >
                  <option>Amélioration nécessaire</option>
                  <option>Non testé</option>
                  <option>Satisfaisant</option>
                  <option>Non satisfaisant </option>
                </Select>
              </FormControl>
            </GridItem>

            {/* <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Efficiency</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.efficiency}
                    onChange={(e) => setFormData({ ...formData, efficiency: e.target.value })}
                  >
                    <option>Not Assessed</option>
                    <option>Good</option>
                    <option>Unsatisfactory</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Design</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.design}
                    onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                  >
                    <option>Acceptable</option>
                    <option>Not Acceptable</option>
                  </Select>
                </FormControl>
              </GridItem> */}

            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Assessed By</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  placeholder="Enter assessed name"
                  value={formData.assessedBy}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, assessedBy: e.target.value })
                  // }
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Assessed On</FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  placeholder="Enter assessed date"
                  value={formData.assessedOn}
                  onChange={(e) =>
                    setFormData({ ...formData, assessedOn: e.target.value })
                  }
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Due On</FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  value={formData.dueOn}
                  onChange={(e) =>
                    setFormData({ ...formData, dueOn: e.target.value })
                  }
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Closed date</FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  value={formData.closedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, closedDate: e.target.value })
                  }
                />
              </FormControl>
            </GridItem>

            {/* <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Currency</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>XAF</option>
                  </Select>
                </FormControl>
              </GridItem> */}

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel fontSize="sm">Résultats du test</FormLabel>
                <Textarea
                  fontSize="sm"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
        {/* </GridItem> */}
      </Flex>

      {/* Buttons */}
      <Flex justifyContent="center" gap={4} mt={6}>
        <Button fontSize="sm" colorScheme="blue" variant="outline">
          Amend Assess
        </Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">
          UnAttest Assess
        </Button>
        <Button
          fontSize="sm"
          colorScheme="green"
          variant="outline"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};

const mapStateToProps = ({ ControlHistoryReducer }) => ({
  controlHistories: ControlHistoryReducer.controlHistories,
  loading: ControlHistoryReducer.loading,
});

export default connect(mapStateToProps)(RiskControlAssessment);
