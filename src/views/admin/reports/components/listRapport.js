import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Loader from "../../../../assets/img/loader.gif";
import { Button } from "@chakra-ui/react";
import * as Excel from "exceljs";
import * as fs from "file-saver";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function ControlTable({ reports, selectedData, loading }) {
  const generateExcel = async () => {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Report Data");
    worksheet.getColumn(1).width = 10;
    worksheet.getColumn(2).width = 10;
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 30;
    worksheet.getColumn(6).width = 30;
    worksheet.getColumn(7).width = 10;
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(10).width = 20;
    worksheet.getColumn(11).width = 20;

    const headerRow = worksheet.addRow([
      "Entity",
      "Control",
      "Risk",
      "Library Ref Type",
      "Control Owner	",
      "Control Nominee",
      "Review Date",
      "Assessment Frequency",
      "Next Assessment Due On",
      "Last Assessment Date",
      "Assessed By",
    ]);
    const maxLength = 30;
    const wrapText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      let lines = [];
      while (text.length > maxLength) {
        let index = text.lastIndexOf(" ", maxLength);
        if (index === -1) index = maxLength;
        lines.push(text.substring(0, index));
        text = text.substring(index + 1);
      }
      lines.push(text);
      return lines.join("\n");
    };

    reports?.forEach((item) => {
      const row = worksheet.addRow([
        wrapText(`ENT${item.entitie.referenceId}`, maxLength),
        item.reference,
        item.riskAssociate.reference,
        item.preventiveDetectiveControl,
        item.ownerControl,
        item.nomineeControl,
        item.reviewDate ? new Date(item.reviewDate).toLocaleDateString() : "-",
        item.frequence,
        item.nextAssessMent
          ? new Date(item.nextAssessMent).toLocaleDateString()
          : "-",
        item.lastAssessmentDate
          ? new Date(item.lastAssessmentDate).toLocaleDateString()
          : "-",
        item.assessedBy,
      ]);

      row.getCell(1).alignment = { wrapText: true };
    });

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "2193B3" },
        bgColor: { argb: "2193B3" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.font = {
        color: { argb: "FFFFFF" },
        bold: true,
      };
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, "Rapport.xlsx");
    });
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Control List
      </Text>
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
              {/* <HStack spacing={6}>
                <Box w="200px" bg={cardBg} borderRadius="lg" p={4} shadow="md"> */}
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
              {/* </Box>
              </HStack> */}
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
                    <strong>{`ENT${item.entitie.referenceId}` || "-"}</strong>
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
                    {item.reviewDate
                      ? new Date(item.reviewDate).toLocaleDateString()
                      : "-"}
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
                    {item.assessedBy || "-"}
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
