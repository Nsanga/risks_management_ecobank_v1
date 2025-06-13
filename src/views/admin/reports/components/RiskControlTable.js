import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Loader from '../../../../assets/img/loader.gif'

const RiskControlTable = ({ reports, loading }) => {

  // Fonctions utilitaires (à définir ailleurs dans votre code)
  const getLikelihoodColor = (value) => {
    // Retourne une couleur en fonction de la probabilité
    if (value >= 4) return "#d32f2f";
    if (value >= 3) return "#ff9800";
    return "#4caf50";
  };

  const getImpactColor = (value) => {
    // Retourne une couleur en fonction de l'impact
    if (value >= 4) return "#d32f2f";
    if (value >= 3) return "#ff9800";
    return "#4caf50";
  };

  const getRiskLevelColor = (value) => {
    // Retourne une couleur en fonction du niveau de risque
    if (value >= 16 && value <= 25) return "#d32f2f";  // Rouge pour risque élevé
    if (value >= 10 && value <= 15) return "#ff9800";   // Orange pour risque moyen
    return "#4caf50";                   // Vert pour risque faible
  };

  const getRiskLevel = (value) => {
    // Retourne le libellé du niveau de risque
    if (value >= 16 && value <= 25) return "Élevé";
    if (value >= 10 && value <= 15) return "Moyen";
    return "Faible";
  };

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
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Référence Entité</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "180px" }}>Entity Description</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Référence Risque</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "220px" }}>Description du risque</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "150px" }}>Catégorie du Risque</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "150px" }}>Catégorie Causale</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "180px" }}>Responsable</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Nominee</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "200px", maxWidth: "300px" }}>Description</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "250px", maxWidth: "350px" }}>Description Détaillée</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Date d'Évaluation</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "100px" }}>Probabilité</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "100px" }}>Impact</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "80px" }}>Total</th>
                <th style={{ border: "1px solid #e0e0e0", padding: "12px", minWidth: "120px" }}>Niveau risque</th>
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
                    <strong>ENT{item.entitie.referenceId}</strong>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", lineHeight: "1.4" }}>
                    {item.entitie.description || "-"}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.referenceRisk}
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
                    {item.riskAssociate.riskEventCategory}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.riskAssociate.causalCategory}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.ownerControl}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {item.nomineeControl}
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
                      {item.riskAssociate.riskSummary}
                    </div>
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
                      {item.riskAssociate.description}
                    </div>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top" }}>
                    {/* {new Date(item.assessmentDate).toLocaleDateString() || "N/A"} */}
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", textAlign: "center" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      // backgroundColor: getLikelihoodColor(item.riskAssociate.occurrenceProbability),
                      // color: "#fff",
                      fontWeight: "bold"
                    }}>
                      {item.riskAssociate.occurrenceProbability}
                    </span>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", textAlign: "center" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      // backgroundColor: getImpactColor(item.riskAssociate.riskImpact),
                      // color: "#fff",
                      fontWeight: "bold"
                    }}>
                      {item.riskAssociate.riskImpact}
                    </span>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", textAlign: "center" }}>
                    <strong>{item.riskAssociate.total}</strong>
                  </td>
                  <td style={{ border: "1px solid #e0e0e0", padding: "10px", verticalAlign: "top", textAlign: "center" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      backgroundColor: getRiskLevelColor(item.riskAssociate.total),
                      color: "#fff",
                      fontWeight: "bold",
                      textTransform: "uppercase"
                    }}>
                      {getRiskLevel(item.riskAssociate.total)}
                    </span>
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

export default RiskControlTable;
