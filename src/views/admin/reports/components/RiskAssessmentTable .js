import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Loader from '../../../../assets/img/loader.gif'

const RiskAssessmentTable = ({ reports, loading }) => {

  // Fonctions utilitaires (à définir ailleurs dans votre code)
  const getSeverityColor = (severity) => {
    if (!severity) return "#000000";
    const value = parseInt(severity);
    if (value >= 12) return "#d32f2f";  // Rouge pour risque élevé
    if (value >= 6) return "#ff9800";   // Orange pour risque moyen
    return "#4caf50";                   // Vert pour risque faible
  };

  const isDatePastDue = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today;
  };

  return (
    <Box p={4} overflowX="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Risk & Control Assessment Details
      </Text>
      <div style={{ overflowX: "auto" }}>
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
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "100px" }}>Risk</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "100px" }}>Entity</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "180px" }}>Entity Description</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "220px" }}>Description du risque</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "150px" }}>Risk Category</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "150px" }}>Causal Category</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "100px" }}>Control</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Action Reference</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "200px" }}>Action Description</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Action Owner</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Action Nominee</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Assessment Frequency</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Next Assessment Date</th>
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
                    <strong>{item.referenceRisk}</strong>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    <strong>ENT{item.entitie.referenceId}</strong>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", lineHeight: "1.4" }}>
                    {item.entitie.description || "-"}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", lineHeight: "1.4" }}>
                    <div style={{
                      maxHeight: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {item.riskAssociate.description || "-"}
                    </div>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.riskAssociate.riskEventCategory || "-"}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.riskAssociate.causalCategory || "-"}
                  </td>
                  <td style={{
                    border: "1px solid #e0e0e0",
                    padding: "10px",
                    verticalAlign: "top",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: getSeverityColor(item.residualSeverity)
                  }}>
                    {item.residualSeverity || "-"}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.actionReference || "-"}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", lineHeight: "1.4" }}>
                    <div style={{
                      maxHeight: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {item.actionDescription || "-"}
                    </div>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.actionOwner || "-"}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.actionNominee || "-"}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.frequence || "-"}
                  </td>
                  <td style={{
                    border: "1px solid #e0e0e0",
                    padding: "10px",
                    verticalAlign: "top",
                    color: isDatePastDue(item.nextAssessMent) ? "red" : "inherit"
                  }}>
                    {item.nextAssessMent ? new Date(item.nextAssessMent).toLocaleDateString() : "-"}
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
