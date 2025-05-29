import React from "react";
import { Box, Text } from "@chakra-ui/react";

const RiskControlTable = () => {
  const data = [
    {
      reference: "RSK67139",
      location: "CAMEROON",
      line: "Consumer",
      entity: "ECM-AKWA BRANCH (ENT00411)",
      category: "PRO.1. - Processes, Inadequate Policies & Procedures",
      causal: "Failed mandatory reporting obligation",
      owner: "DBA Database Administrator",
      nominee: "DBA Database Administrator",
      description:
        "La difficulté à localiser le client reste une véritable problématique pour la suite de la relation",
      detailedDescription:
        "L'inexistence d’un bail commercial ou d’un plan de localisation peut rendre difficile la localisation du client et donc la difficulté à les retrouver en cas de nécessité",
      assessmentCommentary:
        "La difficulté à localiser le client constitue un frein pour toute action à son encontre.",
      assessmentDate: "10/03/2023",
      likelihood: "4",
      impact: "3",
      severity: "12"
    },
    {
      reference: "RSK67140",
      location: "CAMEROON",
      line: "Consumer",
      entity: "ECM-AKWA BRANCH (ENT00411)",
      category: "PRO.1. - Processes, Inadequate Policies & Procedures",
      causal: "Failed mandatory reporting obligation",
      owner: "DBA Database Administrator",
      nominee: "DBA Database Administrator",
      description:
        "Risque de blanchiment de capitaux résultant au non respect des procédures à l'ouverture du compte",
      detailedDescription:
        "L'insuffisance des informations collectées sur le prospect à l'ouverture du compte ou la non-conformité des informations sont contraires aux prescriptions de lutte contre le terrorisme et le blanchiment d’argent",
      assessmentCommentary:
        "Un risque élevé de non-conformité qui peut exposer l'institution à des sanctions réglementaires.",
      assessmentDate: "10/03/2023",
      likelihood: "5",
      impact: "4",
      severity: "20"
    },
    {
      reference: "RSK67141",
      location: "CAMEROON",
      line: "Consumer",
      entity: "ECM-AKWA BRANCH (ENT00411)",
      category: "PRO.1. - Processes, Inadequate Policies & Procedures",
      causal: "Failed mandatory reporting obligation",
      owner: "DBA Database Administrator",
      nominee: "DBA Database Administrator",
      description:
        "Risque de perte financière dû aux informations erronées sur le désormais client dans le système",
      detailedDescription:
        "L’introduction dans le système des informations erronées sur le client expose la banque à des pénalités réglementaires",
      assessmentCommentary:
        "L’inexactitude des données dans le système peut compromettre les décisions stratégiques.",
      assessmentDate: "10/03/2023",
      likelihood: "3",
      impact: "4",
      severity: "12"
    }
  ];

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
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid gray" }}>{item.reference}</td>
                <td style={{ border: "1px solid gray" }}>{item.location}</td>
                <td style={{ border: "1px solid gray" }}>{item.line}</td>
                <td style={{ border: "1px solid gray" }}>{item.entity}</td>
                <td style={{ border: "1px solid gray" }}>{item.category}</td>
                <td style={{ border: "1px solid gray" }}>{item.causal}</td>
                <td style={{ border: "1px solid gray" }}>{item.owner}</td>
                <td style={{ border: "1px solid gray" }}>{item.nominee}</td>
                <td style={{ border: "1px solid gray" }}>{item.description}</td>
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
