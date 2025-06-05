import React from "react";

export default function ControlTable({ reports, selectedData }) {
  return (
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
            <th style={{ border: "1px solid gray" }}>Control</th>
            <th style={{ border: "1px solid gray" }}>Risk</th>
            <th style={{ border: "1px solid gray" }}>Library Ref Type</th>
            <th style={{ border: "1px solid gray" }}>Control Owner</th>
            <th style={{ border: "1px solid gray" }}>Control Nominee</th>
            <th style={{ border: "1px solid gray" }}>Review Date</th>
            <th style={{ border: "1px solid gray" }}>Assessment Frequency</th>
            <th style={{ border: "1px solid gray" }}>Next Assessment Due On</th>
            <th style={{ border: "1px solid gray" }}>Last Assessment Date</th>
            <th style={{ border: "1px solid gray" }}>Assessed By</th>
            <th style={{ border: "1px solid gray" }}>Tested</th>
            <th style={{ border: "1px solid gray" }}>Validated</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid gray" }}>{`${item.reference}: ${item.controlSummary}` || ""}</td>
              <td style={{ border: "1px solid gray" }}>{`${item.referenceRisk} : ${item.descriptionRisk}` || ""}</td>
              <td style={{ border: "1px solid gray" }}>{item.preventiveDetectiveControl}</td>
              <td style={{ border: "1px solid gray" }}>{item.ownerControl}</td>
              <td style={{ border: "1px solid gray" }}>{item.nomineeControl}</td>
              <td style={{ border: "1px solid gray" }}>{item.reviewDate || ""}</td>
              <td style={{ border: "1px solid gray" }}>
                {item.frequence}
              </td>
              <td style={{ color: "red", border: "1px solid gray" }}>
                {item.nextAssessMent || ""}
              </td>
              <td style={{ border: "1px solid gray" }}>
                {item.lastAssessmentDate || ""}
              </td>
              <td style={{ border: "1px solid gray" }}>{item.assessedBy || ""}</td>
              <td style={{ border: "1px solid gray" }}>
                {item.history.length === 0
                  ? "No"
                  : item.history.some(historyItem => historyItem.coutAnnually === selectedData.session)
                    ? "Yes"
                    : "No"
                }
              </td>
              <td style={{ border: "1px solid gray" }}>{item.attested || "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
