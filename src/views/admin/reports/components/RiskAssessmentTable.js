import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Loader from "../../../../assets/img/loader.gif";
import { exportToExcel } from "utils/exportToExcel";
import { ChevronDownIcon } from "@chakra-ui/icons";

const RiskAssessmentTable = ({ reports, loading }) => {
  // Fonctions utilitaires (à définir ailleurs dans votre code)
  const getSeverityColor = (severity) => {
    if (!severity) return "#000000";
    const value = parseInt(severity);
    if (value >= 12) return "#d32f2f"; // Rouge pour risque élevé
    if (value >= 6) return "#ff9800"; // Orange pour risque moyen
    return "#4caf50"; // Vert pour risque faible
  };

  const isDatePastDue = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today;
  };

  const generateExcel = async () => {
    await exportToExcel({
      data: reports,
      filename: "Risk & Control Assessment Report",
      worksheetName: "Risk Data",
      columns: [
        {
          header: "Entity",
          key: "entitie",
          width: 20,
          format: (ent) => `ENT${ent.referenceId}`,
        },
        {
          header: "Entity Description",
          key: "entitie",
          width: 20,
          format: (ent) => ent.description,
        },
        {
          header: "Risk",
          key: "riskAssociate",
          format: (risk) => risk?.reference || "-",
        },
        {
          header: "Description du risque",
          key: "riskAssociate",
          format: (risk) => risk?.description || "-",
        },
        {
          header: "Risk Category",
          key: "riskAssociate",
          format: (risk) => risk?.description || "-",
        },
        {
          header: "Causal Category",
          key: "riskAssociate",
          format: (risk) => risk?.description || "-",
        },
        { header: "Reference du Control", key: "reference", width: 25 },
        { header: "Description du Control", key: "controlSummary", width: 25 },
        {
          header: "performance du controle",
          key: "actionReference",
          width: 25,
        },
        { header: "Description de l'action", key: "actionDescription", width: 25 },
        { header: "Action Owner", key: "actionOwner", width: 25 },
        { header: "Action Nominee", key: "actionNominee" },
        { header: "Assessment Frequenc", key: "frequence", width: 25 },
        { header: "Next Assessment Date", key: "nextAssessMent", width: 25 },
      ],
    });
  };

  return (
    <Box p={4} overflowX="auto">
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Risk & Control Assessment Details
        </Text>
        {reports.length > 0 && (
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="blue"
                w="full"
              >
                Exporter
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    // generatePDF();
                  }}
                >
                  Exporter en PDF
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    generateExcel();
                  }}
                >
                  Exporter en Excel
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </Flex>
      <div style={{ overflowX: "auto" }}>
        {loading ? (
          <Flex alignItems="center" justifyContent="center">
            <Image src={Loader} alt="Loading..." height={50} width={50} />
          </Flex>
        ) : (
          <table
            border="1"
            cellPadding="8"
            cellSpacing="0"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "14px",
              border: "1px solid #e0e0e0",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <thead
              style={{
                backgroundColor: "#009fe3",
                color: "white",
                textAlign: "left",
                position: "sticky",
                top: 0,
              }}
            >
              <tr>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "100px",
                  }}
                >
                  Entity
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "180px",
                  }}
                >
                  Entity Description
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "100px",
                  }}
                >
                  Risk
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "220px",
                  }}
                >
                  Description du risque
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "150px",
                  }}
                >
                  Risk Category
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "150px",
                  }}
                >
                  Causal Category
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "100px",
                  }}
                >
                  Control
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Performance du controle
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "200px",
                  }}
                >
                  Description de l'action
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Action Owner
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Assessment Frequency
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Next Assessment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                    transition: "background-color 0.2s",
                  }}
                >
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    <strong>ENT{item.entitie.referenceId}</strong>
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                      lineHeight: "1.4",
                    }}
                  >
                    {item.entitie.description || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    <strong>{item.referenceRisk}</strong>
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                      lineHeight: "1.4",
                    }}
                  >
                    <div
                      style={{
                        maxHeight: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.riskAssociate.description || "-"}
                    </div>
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.riskAssociate.riskEventCategory || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.riskAssociate.causalCategory || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>{item.reference}</div>
                    <div
                      style={{
                        maxHeight: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.controlSummary || "-"}
                    </div>
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item?.history[0]?.performance || "-"}
                  </td>

                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {" "}
                      {item?.actions[0]?.reference || "-"}
                    </div>
                    <div
                      style={{
                        maxHeight: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item?.actions[0]?.descriptionAction || "-"}
                    </div>
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item?.actions[0]?.proprioAction || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.frequence || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                      color: isDatePastDue(item.nextAssessMent)
                        ? "red"
                        : "inherit",
                    }}
                  >
                    {item.nextAssessMent
                      ? new Date(item.nextAssessMent).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Box>
  );
};

export default RiskAssessmentTable;
