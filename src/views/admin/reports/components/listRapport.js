import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Loader from '../../../../assets/img/loader.gif'

export default function ControlTable({ reports, selectedData, loading }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Control List
      </Text>
      {loading ? (
        <Flex alignItems='center' justifyContent='center'>
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
          fontFamily: "Arial, sans-serif"
        }}
      >
        <thead
          style={{
            backgroundColor: "#009fe3",
            color: "white",
            textAlign: "left",
            position: "sticky",
            top: 0
          }}
        >
          <tr>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "100px" }}>Entity</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "180px" }}>Control</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "200px" }}>Risk</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Library Ref Type</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Control Owner</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Control Nominee</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "100px" }}>Review Date</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Assessment Frequency</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Next Assessment Due On</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Last Assessment Date</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Assessed By</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "80px" }}>Tested</th>
            <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "80px" }}>Validated</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item, index) => (
            <tr 
              key={index}
              style={{ 
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                transition: "background-color 0.2s"
              }}
            >
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                <strong>{`ENT${item.entitie.referenceId}` || "-"}</strong>
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                <div style={{ fontWeight: "bold" }}>{item.reference}</div>
                <div style={{ marginTop: "4px", lineHeight: "1.4" }}>
                  {item.controlSummary || "-"}
                </div>
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                <div style={{ fontWeight: "bold" }}>{item.riskAssociate.reference}</div>
                <div style={{ marginTop: "4px", lineHeight: "1.4" }}>
                  {item.riskAssociate.description || "-"}
                </div>
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                {item.preventiveDetectiveControl || "-"}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                {item.ownerControl || "-"}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                {item.nomineeControl || "-"}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                {item.reviewDate ? new Date(item.reviewDate).toLocaleDateString() : "-"}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                {item.frequence || "-"}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", color: "red" }}>
                {item.nextAssessMent ? new Date(item.nextAssessMent).toLocaleDateString() : "-"}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                {item.lastAssessmentDate ? new Date(item.lastAssessmentDate).toLocaleDateString() : "-"}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                {item.assessedBy || "-"}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", textAlign: "center" }}>
                <span style={{
                  display: "inline-block",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  backgroundColor: item.history.some(historyItem => historyItem.coutAnnually === selectedData.session) ? "#4caf50" : "#f44336",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "12px"
                }}>
                  {item.history.length === 0 || !item.history.some(historyItem => historyItem.coutAnnually === selectedData.session) ? "No" : "Yes"}
                </span>
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", textAlign: "center" }}>
                <span style={{
                  display: "inline-block",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  backgroundColor: item.attested === "Yes" ? "#4caf50" : "#f44336",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "12px"
                }}>
                  {item.attested || "No"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )}
    </div>
  );
}
