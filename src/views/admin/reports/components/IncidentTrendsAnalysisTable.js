import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Image,
  Heading,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "@chakra-ui/react";
import Loader from "../../../../assets/img/loader.gif";
import moment from "moment";

const IncidentTrendsAnalysisTable = ({
  incident_reports,
  actual_incident_reports,
  loading_incident_reports,
}) => {
  const [data, setData] = useState([]);
  const [infoSupp, setInfoSupp] = useState(null);
  const [rows, setRows] = useState([]);
  const [events, setEvents] = useState([]);
  const [countEvent, setCountEvent] = useState(0);
  const [countEventYearEntity, setCountEventYearEntity] = useState(0);
  const [totalPerteMonth, setTotalPerteMonth] = useState(0);
  const [totalAllPertes, setTotalAllPertes] = useState(0);

  useEffect(() => {
    if (incident_reports && incident_reports.length > 0) {
      const info = incident_reports.find((item) => item?.infoSupp)?.infoSupp;
      const rowsOnly = incident_reports.filter((item) => item?.entity);
      const allEvents = incident_reports.filter((item) => item?.event);
      const eventYearEntity = incident_reports.filter(
        (item) => item?.eventYearEntity
      );
      const eventCount = allEvents.reduce(
        (acc, item) => acc + (item?.event?.length || 0),
        0
      );

      const eventCountYearEntity = eventYearEntity.reduce(
        (acc, item) => acc + (item?.event?.length || 0),
        0
      );

      const totalPerteMonth2 = incident_reports
        .filter(
          (item) =>
            typeof item.perteMonth === "number" && !isNaN(item.perteMonth)
        )
        .reduce((acc, item) => acc + item.perteMonth, 0);

      const totalAllPertes2 = incident_reports
        .filter(
          (item) => typeof item.allPertes === "number" && !isNaN(item.allPertes)
        )
        .reduce((acc, item) => acc + item.allPertes, 0);

      setInfoSupp(info || null);
      setRows(rowsOnly);
      setData(incident_reports);
      setEvents(allEvents);
      setCountEvent(eventCount);
      setCountEventYearEntity(eventCountYearEntity);
      setTotalPerteMonth(totalPerteMonth2);
      setTotalAllPertes(totalAllPertes2);
    } else {
      setInfoSupp(null);
      setRows([]);
      setData([]);
    }
  }, [incident_reports]);

  // Déplacer tous les hooks en haut du composant
  const executed_by = localStorage.getItem("username") || "inconnu";
  const executed_time = moment().format("DD/MM/YYYY HH:mm:ss");

  // Tous les appels de hooks doivent être inconditionnels et en haut du composant
  const headerBg = useColorModeValue("blue.600", "blue.800");
  const headerColor = "white";
  const rowHover = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("white", "gray.800");
  const totalRowBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Card bg={cardBg} boxShadow="md" borderRadius="lg" overflow="hidden">
      <CardHeader pb={0}>
        <Flex justify="space-between" align="center">
          <Heading as="h3" size="md">
            Incident Trends Analysis
          </Heading>
          <Badge colorScheme="blue" fontSize="0.8em">
            Last update: {moment().format("DD MMM YYYY")}
          </Badge>
        </Flex>
      </CardHeader>

      <CardBody>
        {loading_incident_reports ? (
          <Flex alignItems="center" justifyContent="center" minH="200px">
            <Image src={Loader} alt="Loading..." boxSize="50px" />
          </Flex>
        ) : (
          <Box overflowX="auto">
            <Table
              variant="striped"
              size="sm"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Thead bg={headerBg}>
                <Tr>
                  <Th
                    color={headerColor}
                    textAlign="center"
                    rowSpan={2}
                    borderRightWidth="1px"
                    borderColor={borderColor}
                  >
                    Year
                  </Th>
                  <Th
                    color={headerColor}
                    textAlign="center"
                    rowSpan={2}
                    borderRightWidth="1px"
                    borderColor={borderColor}
                  >
                    Month
                  </Th>
                  <Th
                    color={headerColor}
                    textAlign="center"
                    rowSpan={2}
                    borderRightWidth="1px"
                    borderColor={borderColor}
                  >
                    Entity
                  </Th>
                  <Th
                    color={headerColor}
                    textAlign="center"
                    colSpan={2}
                    borderRightWidth="1px"
                    borderColor={borderColor}
                  >
                    Actual Loss
                  </Th>
                  <Th color={headerColor} textAlign="center" colSpan={2}>
                    YTD Losses
                  </Th>
                </Tr>
                <Tr bg={headerBg}>
                  <Th color={headerColor} textAlign="center">
                    No. of Events
                  </Th>
                  <Th
                    color={headerColor}
                    textAlign="center"
                    borderRightWidth="1px"
                    borderColor={borderColor}
                  >
                    Losses Amount
                  </Th>
                  <Th color={headerColor} textAlign="center">
                    No. of Events
                  </Th>
                  <Th color={headerColor} textAlign="center">
                    Total Amount
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {rows?.map((item, index) => (
                  <Tr
                    key={index}
                    _hover={{ bg: rowHover }}
                    transition="background 0.2s"
                  >
                    <Td textAlign="center">{infoSupp?.year}</Td>
                    <Td textAlign="center">{infoSupp?.monthName}</Td>
                    <Td textAlign="start">
                      ENT {item?.entity?.referenceId} -{" "}
                      {item?.entity?.description}
                    </Td>
                    <Td textAlign="center">{item?.event.length}</Td>
                    <Td textAlign="center">{item?.perteMonth}</Td>
                    <Td textAlign="center">{item?.eventYearEntity?.length}</Td>
                    <Td textAlign="center">{item?.allPertes}</Td>
                  </Tr>
                ))}

                <Tr fontWeight="bold" bg={totalRowBg}>
                  <Td colSpan={3} textAlign="center">
                    Total
                  </Td>
                  <Td textAlign="center">{countEvent}</Td>
                  <Td textAlign="center">{totalPerteMonth}</Td>
                  <Td textAlign="center">{countEventYearEntity}</Td>
                  <Td textAlign="center">{totalAllPertes}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        )}

        {!loading_incident_reports && (
          <Flex justify="flex-end" mt={4}>
            <Text fontSize="xs" color="gray.500">
              Generated by {executed_by} on {executed_time}
            </Text>
          </Flex>
        )}
      </CardBody>
    </Card>
  );
};

export default IncidentTrendsAnalysisTable;
