import React from "react";
import { Box, Text } from "@chakra-ui/react";

const RiskAssessmentTable = ({reports}) => {

  return (
    <Box p={4} overflowX="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Risk  Details table
      </Text>
      <div style={{ overflowX: "auto" }}>
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontSize: "14px",
            border: "1px solid gray",
          }}
        >
          <thead
            style={{
              backgroundColor: "#009fe3",
              color: "white",
              textAlign: "left",
            }}
          >
            <tr>
              <th style={{ border: "1px solid gray" }}>Risk</th>
              <th style={{ border: "1px solid gray" }}>Entity</th>
              <th style={{ border: "1px solid gray" }}>Entity Description</th>
              <th style={{ border: "1px solid gray" }}>Description du risque</th>
              <th style={{ border: "1px solid gray" }}>Risk Category</th>
              <th style={{ border: "1px solid gray" }}>Causal Category</th>
              <th style={{ border: "1px solid gray" }}>Residual Severity</th>
              <th style={{ border: "1px solid gray" }}>Action Reference</th>
              <th style={{ border: "1px solid gray" }}>Action Description</th>
              <th style={{ border: "1px solid gray" }}>Action Owner</th>
              <th style={{ border: "1px solid gray" }}>Action Nominee</th>
              <th style={{ border: "1px solid gray" }}>Assessment Frequency</th>
              <th style={{ border: "1px solid gray" }}>Next Assessment Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid gray" }}>{item.referenceRisk}</td>
                <td style={{ border: "1px solid gray" }}>ENT{item.entitie.referenceId}</td>
                <td style={{ border: "1px solid gray" }}>{item.entitie.description}</td>
                <td style={{ border: "1px solid gray" }}>{item.riskAssociate.description}</td>
                <td style={{ border: "1px solid gray" }}>{item.riskAssociate.riskEventCategory}</td>
                <td style={{ border: "1px solid gray" }}>{item.riskAssociate.causalCategory}</td>
                <td style={{ border: "1px solid gray" }}>{item.residualSeverity}</td>
                <td style={{ border: "1px solid gray" }}>{item.actionReference}</td>
                <td style={{ border: "1px solid gray" }}>{item.actionDescription}</td>
                <td style={{ border: "1px solid gray" }}>{item.actionOwner}</td>
                <td style={{ border: "1px solid gray" }}>{item.actionNominee}</td>
                <td style={{ border: "1px solid gray" }}>{item.frequence}</td>
                <td style={{ border: "1px solid gray" }}>{item.nextAssessMent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default RiskAssessmentTable;
