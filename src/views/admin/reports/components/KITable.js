import { Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import Loader from '../../../../assets/img/loader.gif'

const groupedData = [
  {
    status: "Status",
    trend: "Stable",
  },
  {
    status: "Status",
    trend: "Worsening",
  },
  {
    status: "Status",
    trend: "Stable",
  },
  {
    status: "Status",
    trend: "Stable",
  },
];

export default function KITable({ reports, loading }) {
  console.log("reports:", reports)
  return (
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      {loading ? (
        <Flex alignItems='center' justifyContent='center'>
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : (
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
              <th style={{ ...cellStyle, color: 'red' }}>(-)R</th>
              <th style={{ ...cellStyle, color: 'orange' }}>(-)A</th>
              <th style={{ ...cellStyle, color: 'green' }}>Target</th>
              <th style={{ ...cellStyle, color: 'orange' }}>(+)A</th>
              <th style={{ ...cellStyle, color: 'red' }}>(+)R</th>
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
                    <td style={cellStyle}>ENT{item?.entitie?.referenceId} CAM - {item.departmentFunction}</td>
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
      )}
    </div>
  );
}

const cellStyle = {
  border: "1px solid gray",
  padding: "6px 8px",
  textAlign: "left",
};
