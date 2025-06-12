import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Loader from '../../../../assets/img/loader.gif'

const groupedData = [
  {
    status: "Status",
    trend: "Stable",
    color: "#ff4444"
  },
  {
    status: "Status",
    trend: "Worsening",
    color: "#ffaa00"
  },
  {
    status: "Status",
    trend: "Stable",
    color: "#ff4444"
  },
  {
    status: "Status",
    trend: "Stable",
    color: "#ffaa00"
  },
];

export default function KITable({ reports, loading }) {

  // Styles optimisés pour chaque type de colonne
  const baseStyle = {
    padding: "12px 8px",
    border: "1px solid #ccc",
    textAlign: "left",
    verticalAlign: "top",
    lineHeight: "1.4"
  };

  const columnStyles = {
    // Colonnes étroites pour les codes/références
    narrow: {
      ...baseStyle,
      width: "80px",
      textAlign: "center",
      fontSize: "12px",
      fontWeight: "500"
    },
    // Colonnes moyennes pour les types et fréquences
    medium: {
      ...baseStyle,
      width: "100px", 
      textAlign: "center",
      fontSize: "13px"
    },
    // Colonne large pour les descriptions
    wide: {
      ...baseStyle,
      width: "300px",
      fontSize: "13px",
      wordWrap: "break-word",
      hyphens: "auto"
    },
    // Colonnes numériques
    numeric: {
      ...baseStyle,
      width: "60px",
      textAlign: "center",
      fontSize: "13px",
      fontWeight: "500"
    },
    // En-têtes de seuils avec couleurs
    thresholdHeader: {
      ...baseStyle,
      width: "60px",
      textAlign: "center",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "8px 4px"
    }
  };

  return (
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Key Indicator Analysis
      </Text>
      {loading ? (
        <Flex alignItems='center' justifyContent='center'>
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : (
        <>
          <table style={{
            borderCollapse: "collapse",
            minWidth: "1200px",
            fontSize: "14px",
            border: "2px solid #ddd",
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <thead style={{ backgroundColor: "#f1f3f4" }}>
              <tr>
                <th style={{ ...columnStyles.narrow, fontWeight: "bold" }} rowSpan={2}>Entity</th>
                <th style={{ ...columnStyles.wide, fontWeight: "bold" }} rowSpan={2}>Key Indicator</th>
                <th style={{ ...columnStyles.medium, fontWeight: "bold" }} rowSpan={2}>KI Type</th>
                <th style={{ ...columnStyles.medium, fontWeight: "bold" }} rowSpan={2}>Threshold Type</th>
                <th style={{ ...columnStyles.medium, fontWeight: "bold" }} rowSpan={2}>Frequency</th>
                <th style={{ ...columnStyles.numeric, fontWeight: "bold" }} rowSpan={2}>I</th>
                <th style={{ ...columnStyles.numeric, fontWeight: "bold" }} rowSpan={2}>II</th>
                <th style={{ ...columnStyles.numeric, fontWeight: "bold" }} rowSpan={2}>III</th>
                <th style={{ ...columnStyles.numeric, fontWeight: "bold" }} rowSpan={2}>Avg</th>
                <th style={{ ...columnStyles.thresholdHeader, fontWeight: "bold" }} colSpan={5}>Threshold</th>
              </tr>
              <tr>
                <th style={{ ...columnStyles.thresholdHeader, color: '#dc3545', backgroundColor: '#fff5f5' }}>
                  (-)R
                </th>
                <th style={{ ...columnStyles.thresholdHeader, color: '#fd7e14', backgroundColor: '#fff8f0' }}>
                  (-)A
                </th>
                <th style={{ ...columnStyles.thresholdHeader, color: '#198754', backgroundColor: '#f0fff4' }}>
                  Target
                </th>
                <th style={{ ...columnStyles.thresholdHeader, color: '#fd7e14', backgroundColor: '#fff8f0' }}>
                  (+)A
                </th>
                <th style={{ ...columnStyles.thresholdHeader, color: '#dc3545', backgroundColor: '#fff5f5' }}>
                  (+)R
                </th>
              </tr>
            </thead>
            <tbody>
              {groupedData.map((group, i) => (
                <React.Fragment key={i}>
                  <tr style={{ backgroundColor: "#3965FF", color: "white" }}>
                    <td colSpan={14} style={{
                      ...baseStyle,
                      fontWeight: "bold",
                      fontSize: "15px",
                      padding: "15px 12px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span>{group.status}</span>
                        <span style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "14px"
                        }}>
                          <span style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: group.color,
                            display: "inline-block"
                          }}></span>
                          Trend: {group.trend}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {reports.map((item, j) => (
                    <tr key={j} style={{
                      backgroundColor: j % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      transition: "background-color 0.2s"
                    }}>
                      <td style={columnStyles.narrow}>
                        <div style={{ fontWeight: "600", color: "#3965FF" }}>
                          ENT{item?.entitie?.referenceId}
                        </div>
                        <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
                          {item.departmentFunction}
                        </div>
                      </td>
                      <td style={columnStyles.wide}>
                        <div style={{ fontWeight: "500", marginBottom: "4px" }}>
                          <span style={{ color: "#3965FF" }}>KI{item.reference}</span>
                        </div>
                        <div style={{ color: "#555", lineHeight: "1.3" }}>
                          {item.riskIndicatorDescription}
                        </div>
                      </td>
                      <td style={columnStyles.medium}>
                        <span style={{
                          backgroundColor: "#e3f2fd",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}>
                          {item.type}
                        </span>
                      </td>
                      <td style={columnStyles.medium}>
                        <span style={{
                          backgroundColor: "#f3e5f5",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}>
                          {item.thresholdType}
                        </span>
                      </td>
                      <td style={columnStyles.medium}>
                        <span style={{
                          backgroundColor: "#e8f5e8",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}>
                          {item.frequenceKeyIndicator}
                        </span>
                      </td>
                      <td style={columnStyles.numeric}>{item?.history[0]?.value || '0'}</td>
                      <td style={columnStyles.numeric}>{item?.history[1]?.value || '0'}</td>
                      <td style={columnStyles.numeric}>{item?.history[2]?.value || '0'}</td>
                      <td style={{
                        ...columnStyles.numeric,
                        backgroundColor: "#f0f9ff",
                        fontWeight: "600"
                      }}>
                        {!item?.history?.length ? '0' : (item.history.reduce((acc, {value}) => acc + (Number(value) || 0), 0) / 3).toFixed(2)}
                      </td>
                      <td style={{
                        ...columnStyles.numeric,
                        backgroundColor: "#fff5f5",
                        color: "#dc3545",
                        fontWeight: "600"
                      }}>
                        {item?.escaladeKeyIndicator || '-'}
                      </td>
                      <td style={{
                        ...columnStyles.numeric,
                        backgroundColor: "#fff8f0",
                        color: "#fd7e14",
                        fontWeight: "600"
                      }}>
                        {item?.seuilKeyIndicator || '-'}
                      </td>
                      <td style={{
                        ...columnStyles.numeric,
                        backgroundColor: "#f0fff4",
                        color: "#198754",
                        fontWeight: "600"
                      }}>
                        {item?.toleranceKeyIndicator || '-'}
                      </td>
                      <td style={{
                        ...columnStyles.numeric,
                        backgroundColor: "#fff8f0",
                        color: "#fd7e14",
                        fontWeight: "600"
                      }}>
                        {item?.Ap || '-'}
                      </td>
                      <td style={{
                        ...columnStyles.numeric,
                        backgroundColor: "#fff5f5",
                        color: "#dc3545",
                        fontWeight: "600"
                      }}>
                        {item?.Rp || '-'}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#666",
            display: "flex",
            gap: "20px"
          }}>
            <div><strong>Légende:</strong></div>
            <div style={{ color: "#dc3545" }}>● (-)R / (+)R : Seuils de risque rouge</div>
            <div style={{ color: "#fd7e14" }}>● (-)A / (+)A : Seuils d'alerte orange</div>
            <div style={{ color: "#198754" }}>● Target : Objectif cible</div>
          </div>
        </>
      )
      }
    </div >
  );
}

const cellStyle = {
  border: "1px solid gray",
  padding: "6px 8px",
  textAlign: "left",
};
