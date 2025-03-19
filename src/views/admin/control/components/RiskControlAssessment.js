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

const RiskControlAssessment = ({ controlHistories, currentAssoCiate, selectedEntityDescription }) => {
  const [formData, setFormData] = useState({
    performance: "Not Assessed",
    assessedBy: "",
    assessedOn: "",
    dueOn: "",
    closedDate: "",
    notes: "",
    attested: true
  });

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentAssoCiate) {
      setFormData({
        performance: currentAssoCiate.historyControl[0]?.performance || "Not Assessed",
        assessedBy: currentAssoCiate.historyControl[0]?.assessedBy || "",
        assessedOn: currentAssoCiate.historyControl[0]?.assessedOn || "",
        dueOn: currentAssoCiate.historyControl[0]?.dueOn || "",
        closedDate: currentAssoCiate.historyControl[0]?.closedDate || "",
        notes: currentAssoCiate.historyControl[0]?.notes || "",
        attested: currentAssoCiate.historyControl[0]?.attested || true
      });
    }
  }, [dispatch]);

  const handleSave = () => {
    console.log(formData)
    dispatch(AddControlHistory({ ...formData, idControl: currentAssoCiate._id }));
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
  }
  console.log(controlHistories)
  return (
    <Box fontSize='12px'>
      {/* Container Grid */}
      <Flex gap={4} alignItems="start">
        {/* Left Column (Table) */}
        {/* <GridItem> */}
          <Box bg="white" maxWidth="100%">
            <Table variant="simple" width="100%" fontSize='10px'>
              <Thead bg="gray.200">
                <Tr>
                  <Th w="10%">Ref</Th>
                  <Th w="20%">Assessed On</Th>
                  <Th w="20%">Due On</Th>
                  <Th w="10%">Closed date</Th>
                  <Th w="20%">Performance</Th>
                  <Th w="10%">Attested</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentAssoCiate.historyControl.length > 0 && (
                  <>
                    {currentAssoCiate.historyControl.map((controlHistory) => (
                      <Tr key={controlHistory._id}>
                        <Td>{controlHistory.reference}</Td>
                        <Td>{controlHistory.assessedOn}</Td>
                        <Td>{controlHistory.dueOn}</Td>
                        <Td>{controlHistory.closedDate}</Td>
                        <Td>{controlHistory.performance}</Td>
                        <Td>
                          <Checkbox isChecked={controlHistory.attested} isReadOnly />
                        </Td>
                      </Tr>
                    ))}
                  </>
                )}
              </Tbody>
            </Table>
          </Box>
        {/* </GridItem> */}

        {/* Right Column (Form) */}
        {/* <GridItem> */}
          <Box bg="white">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Performance</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.performance}
                    onChange={(e) => setFormData({ ...formData, performance: e.target.value })}
                  >
                    <option>Not Assessed</option>
                    <option>Good</option>
                    <option>Unsatisfactory</option>
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
                    onChange={(e) => setFormData({ ...formData, assessedBy: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, assessedOn: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, dueOn: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, closedDate: e.target.value })}
                  />
                </FormControl>
              </GridItem>

              {/* <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Currency</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
        <Button fontSize="sm" colorScheme="green" variant="outline" onClick={handleSave}>
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
