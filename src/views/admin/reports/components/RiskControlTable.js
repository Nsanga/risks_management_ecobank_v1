import React from "react";
import { Box, Text } from "@chakra-ui/react";

const RiskControlTable = ({reports}) => {
  return (
    <Box p={4} overflowX="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Risk Register Form
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
              <th style={{ border: "1px solid gray" }}>Référence Risque</th>
              <th style={{ border: "1px solid gray" }}>Pays</th>
              <th style={{ border: "1px solid gray" }}>Ligne Métier</th>
              <th style={{ border: "1px solid gray" }}>Entité</th>
              <th style={{ border: "1px solid gray" }}>Catégorie du Risque</th>
              <th style={{ border: "1px solid gray" }}>Catégorie Causale</th>
              <th style={{ border: "1px solid gray" }}>Responsable du Risque</th>
              <th style={{ border: "1px solid gray" }}>Nominee</th>
              <th style={{ border: "1px solid gray" }}>Description</th>
              <th style={{ border: "1px solid gray" }}>Description Détaillée</th>
              <th style={{ border: "1px solid gray" }}>Commentaires de l'Évaluation</th>
              <th style={{ border: "1px solid gray" }}>Date d'Évaluation</th>
              <th style={{ border: "1px solid gray" }}>Vraisemblance</th>
              <th style={{ border: "1px solid gray" }}>Impact</th>
              <th style={{ border: "1px solid gray" }}>Criticité</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid gray" }}>{item.referenceRisk}</td>
                <td style={{ border: "1px solid gray" }}>{item.location ?? "CAMEROUN"}</td>
                <td style={{ border: "1px solid gray" }}>{item.line}</td>
                <td style={{ border: "1px solid gray" }}>{item.entity}</td>
                <td style={{ border: "1px solid gray" }}>{item.category}</td>
                <td style={{ border: "1px solid gray" }}>{item.causal}</td>
                <td style={{ border: "1px solid gray" }}>{item.ownerControl}</td>
                <td style={{ border: "1px solid gray" }}>{item.nomineeControl}</td>
                <td style={{ border: "1px solid gray" }}>{item.controlDescription}</td>
                <td style={{ border: "1px solid gray" }}>{item.detailedDescription}</td>
                <td style={{ border: "1px solid gray" }}>{item.assessmentCommentary}</td>
                <td style={{ border: "1px solid gray" }}>{item.assessmentDate}</td>
                <td style={{ border: "1px solid gray" }}>{item.likelihood}</td>
                <td style={{ border: "1px solid gray" }}>{item.impact}</td>
                <td style={{ border: "1px solid gray" }}>{item.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default RiskControlTable;
