import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Loader from "../../../../assets/img/loader.gif";
import { Button } from "@chakra-ui/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { exportToExcel } from "utils/exportToExcel";

export default function ControlTable({ reports, selectedData, loading }) {
  // Exemple d'utilisation avec votre structure de données
  const generateExcel = async () => {
    await exportToExcel({
      data: reports,
      filename: "Control_List_Report",
      worksheetName: "Risk Data",
      columns: [
        {
          header: "Entity",
          key: "entitie",
          width: 20,
          format: (ent) => `ENT${ent.referenceId}`
        },
        { header: "Control", key: "reference", width: 15 },
        {
          header: "Risk",
          key: "riskAssociate",
          format: (risk) => risk?.reference || "-"
        },
        { header: "Library Ref Type", key: "preventiveDetectiveControl", width: 25 },
        { header: "Control Owner", key: "ownerControl", width: 25 },
        { header: "Control Nominee", key: "nomineeControl", width: 25 },
        {
          header: "Review Date",
          key: "reviewDate",
          format: (date) => date ? new Date(date).toLocaleDateString() : "-"
        },
        { header: "Assessment Frequency", key: "frequence" },
        {
          header: "Next Assessment Due On",
          key: "nextAssessMent",
          format: (date) => date ? new Date(date).toLocaleDateString() : "-",
          width: 20
        },
        {
          header: "Last Assessment Date",
          key: "lastAssessmentDate",
          format: (date) => date ? new Date(date).toLocaleDateString() : "-",
          width: 20
        },
        { header: "Assessed By", key: "assessedBy", width: 20 }
      ]
    });
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Flex alignItems='center' justifyContent='space-between'>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Control List
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
      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
              }}
            >
            </div>
          </div>

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
                  Control
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "200px",
                  }}
                >
                  Risk
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Library Ref Type
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Control Owner
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Control Nominee
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "100px",
                  }}
                >
                  Review Date
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
                  Next Assessment Due On
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Last Assessment Date
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "120px",
                  }}
                >
                  Assessed By
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "80px",
                  }}
                >
                  Tested
                </th>
                <th
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "12px",
                    minWidth: "80px",
                  }}
                >
                  Validated
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
                    <div style={{ fontWeight: "bold" }}>{`ENT${item.entitie.referenceId}` || "-"}</div>
                    <div style={{ marginTop: "4px", lineHeight: "1.4" }}>
                      {item.entitie.description || "-"}
                    </div>
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>{item.reference}</div>
                    <div style={{ marginTop: "4px", lineHeight: "1.4" }}>
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
                    <div style={{ fontWeight: "bold" }}>
                      {item.riskAssociate.reference}
                    </div>
                    <div style={{ marginTop: "4px", lineHeight: "1.4" }}>
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
                    {item.preventiveDetectiveControl || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.ownerControl || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.nomineeControl || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.history[0]?.dueOn
                      ? new Date(item.history[0]?.dueOn).toLocaleDateString()
                      : "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.history[0]?.frequency || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                      color: "red",
                    }}
                  >
                    {item.nextAssessMent
                      ? new Date(item.nextAssessMent).toLocaleDateString()
                      : "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.lastAssessmentDate
                      ? new Date(item.lastAssessmentDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    {item.history[0]?.assessedBy || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        backgroundColor: item.history.some(
                          (historyItem) =>
                            historyItem.coutAnnually === selectedData.session
                        )
                          ? "#4caf50"
                          : "#f44336",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {item.history.length === 0 ||
                        !item.history.some(
                          (historyItem) =>
                            historyItem.coutAnnually === selectedData.session
                        )
                        ? "No"
                        : "Yes"}
                    </span>
                  </td>
                  <td
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: "10px",
                      verticalAlign: "top",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        backgroundColor:
                          item.attested === "Yes" ? "#4caf50" : "#f44336",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {item.attested || "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
