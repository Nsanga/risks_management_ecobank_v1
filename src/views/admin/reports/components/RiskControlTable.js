import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Loader from '../../../../assets/img/loader.gif'

const RiskControlTable = ({ reports, loading }) => {
  return (
    <Box p={4} overflowX="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Risk Register Table
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
              <th style={{ border: "1px solid gray" }}>Référence Entité</th>
                <th style={{ border: "1px solid gray" }}>Référence Risque</th>
                <th style={{ border: "1px solid gray" }}>Catégorie du Risque</th>
                <th style={{ border: "1px solid gray" }}>Catégorie Causale</th>
                <th style={{ border: "1px solid gray" }}>Responsable du Risque</th>
                <th style={{ border: "1px solid gray" }}>Nominee</th>
                <th style={{ border: "1px solid gray" }}>Description</th>
                <th style={{ border: "1px solid gray" }}>Description Détaillée</th>
                <th style={{ border: "1px solid gray" }}>Date d'Évaluation</th>
                <th style={{ border: "1px solid gray" }}>Probabilité d'occurence</th>
                <th style={{ border: "1px solid gray" }}>Impact du risque</th>
                <th style={{ border: "1px solid gray" }}>Total</th>
                <th style={{ border: "1px solid gray" }}>Niveau du risque</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray" }}>ENT{item.entitie.referenceId}</td>
                  <td style={{ border: "1px solid gray" }}>{item.referenceRisk}</td>
                  <td style={{ border: "1px solid gray" }}>{item.riskAssociate.riskEventCategory}</td>
                  <td style={{ border: "1px solid gray" }}>{item.riskAssociate.causalCategory}</td>
                  <td style={{ border: "1px solid gray" }}>{item.ownerControl}</td>
                  <td style={{ border: "1px solid gray" }}>{item.nomineeControl}</td>
                  <td style={{ border: "1px solid gray" }}>{item.summaryRisk}</td>
                  <td style={{ border: "1px solid gray" }}>{item.controlDescription}</td>
                  <td style={{ border: "1px solid gray" }}>{item.assessmentDate}</td>
                  <td style={{ border: "1px solid gray" }}>{item.likelihood}</td>
                  <td style={{ border: "1px solid gray" }}>{item.impact}</td>
                  <td style={{ border: "1px solid gray" }}>{item.severity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Box>
  );
};

export default RiskControlTable;
