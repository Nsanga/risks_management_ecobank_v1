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
        Rm: 0,
        Am: 0,
        target: 0,
        Ap: 1,
        Rp: 2
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
        Rm: 0,
        Am: 0,
        target: 0,
        Ap: 1,
        Rp: 2
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
        Rm: 0,
        Am: 0,
        target: 0,
        Ap: 1,
        Rp: 2
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
        Rm: 0,
        Am: 0,
        target: 0,
        Ap: 1,
        Rp: 2
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
        Rm: 0,
        Am: 0,
        target: 0,
        Ap: 1,
        Rp: 2
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
        Rm: 0,
        Am: 0,
        target: 0,
        Ap: 1,
        Rp: 2
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
        Rm: 0,
        Am: 0,
        target: 0,
        Ap: 1,
        Rp: 2
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
        Rm: 0,
        Am: 0,
        target: 0,
        Ap: 1,
        Rp: 2
      },
    ],
  },
];

export default function KITable({reports}) {
  console.log("reports:", reports)
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
            <th style={cellStyle} rowSpan={2}>Entity</th>
            <th style={cellStyle} rowSpan={2}>Key Indicator</th>
            <th style={cellStyle} rowSpan={2}>KI Type</th>
            <th style={cellStyle} rowSpan={2}>Threshold Type</th>
            <th style={cellStyle} rowSpan={2}>Frequency</th>
            <th style={cellStyle} rowSpan={2}>I</th>
            <th style={cellStyle} rowSpan={2}>II</th>
            <th style={cellStyle} rowSpan={2}>III</th>
            <th style={cellStyle} rowSpan={2}>Avg</th>
            <th style={cellStyle} colSpan={5}>Threshold</th>
          </tr>
          <tr>
            <th style={{...cellStyle, color:'red'}}>(-)R</th>
            <th style={{...cellStyle, color:'orange'}}>(-)A</th>
            <th style={{...cellStyle, color:'green'}}>Target</th>
            <th style={{...cellStyle, color:'orange'}}>(+)A</th>
            <th style={{...cellStyle, color:'red'}}>(+)R</th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((group, i) => (
            <React.Fragment key={i}>
              <tr style={{ backgroundColor: "#3965FF", color: "white" }}>
                <td colSpan={15} style={cellStyle}>
                  <b>{group.status}</b> &nbsp;&nbsp;&nbsp;
                  <span style={{ color: group.color }}>
                    ● Trend : {group.trend}
                  </span>
                </td>
              </tr>
              {reports.map((item, j) => (
                <tr key={j}>
                  <td style={cellStyle}>ENT{item.entityReference.referenceId} CAM - {item.departmentFunction}</td>
                  <td style={cellStyle}>KI{item.reference} {item.riskIndicatorDescription}</td>
                  <td style={cellStyle}>{item.type}</td>
                  <td style={cellStyle}>{item.thresholdType}</td>
                  <td style={cellStyle}>{item.frequenceKeyIndicator}</td>
                  <td style={cellStyle}>{item?.i || ''}</td>
                  <td style={cellStyle}>{item?.ii || ''}</td>
                  <td style={cellStyle}>{item?.iii || ''}</td>
                  <td style={cellStyle}>{item?.avg ? item?.avg.toFixed(2) : ''}</td>
                  <td style={cellStyle}>{item?.Rm || ''}</td>
                  <td style={cellStyle}>{item?.Am || ''}</td>
                  <td style={cellStyle}>{item?.target || ''}</td>
                  <td style={cellStyle}>{item?.Ap || ''}</td>
                  <td style={cellStyle}>{item?.Rp || ''}</td>
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
