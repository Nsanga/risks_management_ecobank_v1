import React from "react";

const controlData = [
  {
    control:
      "CTR69807: Cancelling of a trade must follow a procedure put in place by the Treasury and FICC team",
    risk: "RSK67231: The cancellation of an FI buy trade may result in financial loss to the bank",
    keyControl: "Y",
    refType: "Preventive",
    owner: "DBA Database Administrator",
    nominee: "DBA Database Administrator",
    reviewDate: "N/A",
    opFreq: "N/A",
    lastOp: "",
    opSignedOffBy: "",
    nextOp: "",
    assessmentFreq: "Quarterly",
    nextAssessmentDue: "13/04/2025",
    lastAssessmentDate: "21/01/2025",
    assessedBy: "Rémy NDZIE",
    active: "Y",
    attested: "Y",
  },
  {
    control:
      "CTR69808: Mitigating this risk will involve a daily publication of XAF Blotter",
    risk: "RSK67232: Non respect of mandatory reserve level may result in regulatory penalties leading to financial loss",
    keyControl: "Y",
    refType: "Preventive",
    owner: "DBA Database Administrator",
    nominee: "DBA Database Administrator",
    reviewDate: "N/A",
    opFreq: "N/A",
    lastOp: "",
    opSignedOffBy: "",
    nextOp: "",
    assessmentFreq: "Quarterly",
    nextAssessmentDue: "13/04/2025",
    lastAssessmentDate: "21/01/2025",
    assessedBy: "Rémy NDZIE",
    active: "Y",
    attested: "Y",
  },
  {
    control:
      "CTR69809: This will consist of ensuring sure all PPs are approved",
    risk: "RSK67233: breach of limit regarding commercialization of Treasury products may result in the financial risk",
    keyControl: "Y",
    refType: "Preventive",
    owner: "DBA Database Administrator",
    nominee: "DBA Database Administrator",
    reviewDate: "N/A",
    opFreq: "N/A",
    lastOp: "",
    opSignedOffBy: "",
    nextOp: "",
    assessmentFreq: "Quarterly",
    nextAssessmentDue: "13/04/2025",
    lastAssessmentDate: "21/01/2025",
    assessedBy: "Rémy NDZIE",
    active: "Y",
    attested: "Y",
  },
  {
    control:
      "CTR69810: This will involve all ALCO Minutes for each month meeting are duly published",
    risk: "RSK67234: Non compliance on regulatory requirement as ALCO committee whereby may lead to financial risk",
    keyControl: "Y",
    refType: "Preventive",
    owner: "DBA Database Administrator",
    nominee: "DBA Database Administrator",
    reviewDate: "N/A",
    opFreq: "N/A",
    lastOp: "",
    opSignedOffBy: "",
    nextOp: "",
    assessmentFreq: "Quarterly",
    nextAssessmentDue: "13/04/2025",
    lastAssessmentDate: "21/01/2025",
    assessedBy: "Rémy NDZIE",
    active: "Y",
    attested: "Y",
  },
];

export default function ControlTable({reports}) {
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
              <td style={{ border: "1px solid gray" }}>{item.active || "No"}</td>
              <td style={{ border: "1px solid gray" }}>{item.attested || "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
