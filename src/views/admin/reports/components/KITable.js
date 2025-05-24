import React, { useState } from "react";
const groupedData = [
    {
      status: "Status",
      trend: "Stable",
      color: "green",
      items: [
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator: "KI02818 Number of cancelled client trades",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 3,
          ii: 3,
          iii: 11,
          avg: 5.67,
        },
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator: "KI02822 Number of approved limits not respected by FICC",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 2,
          ii: 2,
          iii: 2,
          avg: 2.00,
        },
      ],
    },
    {
      status: "Status",
      trend: "Worsening",
      color: "orange",
      items: [
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator: "KI02821 Number of months where ALCO did not hold",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 3,
          ii: 2,
          iii: 1,
          avg: 2.00,
        },
      ],
    },
    {
      status: "Status",
      trend: "Stable",
      color: "green",
      items: [
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator: "KI02819 Number of days XAF blotter is unpublished",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 1,
          ii: 1,
          iii: 1,
          avg: 1.00,
        },
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator: "KI02820 Number of pending or unapproved PP",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 1,
          ii: 1,
          iii: 1,
          avg: 1.00,
        },
      ],
    },
    {
      status: "Status",
      trend: "Stable",
      color: "green",
      items: [
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator: "KI02823 Number of unapproved counterparties",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 0,
          ii: 0,
          iii: 0,
          avg: 0.00,
        },
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator:
            "KI02824 Amount of liquidity below safe liquidity threshold",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 0,
          ii: 0,
          iii: 0,
          avg: 0.00,
        },
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator: "KI02825 Number of client without conventions or contracts",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 0,
          ii: 0,
          iii: 0,
          avg: 0.00,
        },
        {
          entity: "ECM-FICC (ENT00409)",
          keyIndicator: "KI02826 Number of dealer without signed codes of conduct",
          kiType: "Numeric",
          thresholdType: "Target - higher value is worse",
          frequency: "Monthly",
          i: 0,
          ii: 0,
          iii: 0,
          avg: 0.00,
        },
      ],
    },
  ];
  
  export default function KITable() {
    return (
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <table
          style={{
            borderCollapse: "collapse",
            minWidth: "1000px", // assure le scroll si écran trop petit
            fontSize: "14px",
            border: "1px solid gray",
          }}
        >
          <thead style={{ backgroundColor: "#ddd" }}>
            <tr>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Entity</th>
              <th style={cellStyle}>Key Indicator</th>
              <th style={cellStyle}>KI Type</th>
              <th style={cellStyle}>Threshold Type</th>
              <th style={cellStyle}>Frequency</th>
              <th style={cellStyle}>I</th>
              <th style={cellStyle}>II</th>
              <th style={cellStyle}>III</th>
              <th style={cellStyle}>Avg</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.map((group, i) => (
              <React.Fragment key={i}>
                <tr style={{ backgroundColor: "#0000FF", color: "white" }}>
                  <td colSpan={10} style={cellStyle}>
                    <b>{group.status}</b> &nbsp;&nbsp;&nbsp;
                    <span style={{ color: group.color }}>
                      ● Trend : {group.trend}
                    </span>
                  </td>
                </tr>
                {group.items.map((item, j) => (
                  <tr key={j}>
                    <td style={cellStyle}></td>
                    <td style={cellStyle}>{item.entity}</td>
                    <td style={cellStyle}>{item.keyIndicator}</td>
                    <td style={cellStyle}>{item.kiType}</td>
                    <td style={cellStyle}>{item.thresholdType}</td>
                    <td style={cellStyle}>{item.frequency}</td>
                    <td style={cellStyle}>{item.i}</td>
                    <td style={cellStyle}>{item.ii}</td>
                    <td style={cellStyle}>{item.iii}</td>
                    <td style={cellStyle}>{item.avg.toFixed(2)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  const cellStyle = {
    border: "1px solid gray",
    padding: "6px 8px",
    textAlign: "left",
  };
  