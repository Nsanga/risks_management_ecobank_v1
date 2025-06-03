import React from "react";
import { Box, Text } from "@chakra-ui/react";

const RiskAssessmentTable = ({reports}) => {
  const data = [
    {
      risk: "RSK67231", 
      entity: "ENT00409",
      entityDescription: "ECM-FICC",
      crrReference: "CRR1231",
      riskDescription: "The cancellation of an FI buy trade may result in financial loss to the bank",
      riskCategory: "Inadequate Policies & Procedures",
      causalCategory: "Failed mandatory reporting obligation",
      residualSeverity: "High",
      actionReference: "ACT901",
      actionDescription: "Ensure trade validation before execution",
      actionOwner: "John Doe",
      actionNominee: "Jane Smith",
      assessmentFrequency: "Monthly",
      nextAssessmentDate: "2024-07-01"
    },
    {
      risk: "RSK67232",
      entity: "ENT00409",
      entityDescription: "ECM-FICC",
      crrReference: "CRR1232",
      riskDescription: "Non respect of mandatory reserve level may result in regulatory penalties leading to financial loss",
      riskCategory: "Inadequate Policies & Procedures",
      causalCategory: "Failed mandatory reporting obligation",
      residualSeverity: "Medium",
      actionReference: "ACT902",
      actionDescription: "Implement automated reserve checks",
      actionOwner: "Alice Brown",
      actionNominee: "Tom White",
      assessmentFrequency: "Quarterly",
      nextAssessmentDate: "2024-09-01"
    },
    {
      risk: "RSK67233",
      entity: "ENT00409",
      entityDescription: "ECM-FICC",
      crrReference: "CRR1233",
      riskDescription: "Breach of limit regarding commercialization of Treasury products may result in financial risk",
      riskCategory: "Inadequate Policies & Procedures",
      causalCategory: "Failed mandatory reporting obligation",
      residualSeverity: "Critical",
      actionReference: "ACT903",
      actionDescription: "Set compliance monitoring alerts",
      actionOwner: "Mark Taylor",
      actionNominee: "Lucy Grey",
      assessmentFrequency: "Bi-Annually",
      nextAssessmentDate: "2024-12-15"
    },
    {
      risk: "RSK67234",
      entity: "ENT00409",
      entityDescription: "ECM-FICC",
      crrReference: "CRR1234",
      riskDescription: "Non-compliance with regulatory requirements by ALCO committee may lead to financial risk",
      riskCategory: "Inadequate Policies & Procedures",
      causalCategory: "Failed mandatory reporting obligation",
      residualSeverity: "High",
      actionReference: "ACT904",
      actionDescription: "Review ALCO compliance standards",
      actionOwner: "Emily Watson",
      actionNominee: "Jake Brown",
      assessmentFrequency: "Yearly",
      nextAssessmentDate: "2025-01-10"
    },
    {
      risk: "RSK67235",
      entity: "ENT00409",
      entityDescription: "ECM-FICC",
      crrReference: "CRR1235",
      riskDescription: "Transactions executed by dealers over approved limits may result in a breach and financial risk",
      riskCategory: "Inadequate Policies & Procedures",
      causalCategory: "Failed mandatory reporting obligation",
      residualSeverity: "Medium",
      actionReference: "ACT905",
      actionDescription: "Restrict dealer permissions",
      actionOwner: "Robert King",
      actionNominee: "Clara Belle",
      assessmentFrequency: "Monthly",
      nextAssessmentDate: "2024-07-15"
    },
    {
      risk: "RSK67236",
      entity: "ENT00409",
      entityDescription: "ECM-FICC",
      crrReference: "CRR1236",
      riskDescription: "Deals executed with counterparties without approved limits may result in financial risk",
      riskCategory: "Inadequate Policies & Procedures",
      causalCategory: "Failed mandatory reporting obligation",
      residualSeverity: "High",
      actionReference: "ACT906",
      actionDescription: "Verify counterparty limits",
      actionOwner: "Laura Knight",
      actionNominee: "Sam Rivers",
      assessmentFrequency: "Bi-Monthly",
      nextAssessmentDate: "2024-08-05"
    },
    {
      risk: "RSK67237",
      entity: "ENT00409",
      entityDescription: "ECM-FICC",
      crrReference: "CRR1237",
      riskDescription: "Errors in reporting to the FSG",
      riskCategory: "Inadequate Policies & Procedures",
      causalCategory: "Failed mandatory reporting obligation",
      residualSeverity: "Low",
      actionReference: "ACT907",
      actionDescription: "Improve reporting templates",
      actionOwner: "Nina Cross",
      actionNominee: "Victor Hope",
      assessmentFrequency: "Annually",
      nextAssessmentDate: "2025-02-01"
    }
  ];

  return (
    <Box p={4} overflowX="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Risk  Details table
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
              <th style={{ border: "1px solid gray" }}>Risk</th>
              <th style={{ border: "1px solid gray" }}>Entity</th>
              <th style={{ border: "1px solid gray" }}>Entity Description</th>
              <th style={{ border: "1px solid gray" }}>CRR Reference</th>
              <th style={{ border: "1px solid gray" }}>Risk Description</th>
              <th style={{ border: "1px solid gray" }}>Risk Category</th>
              <th style={{ border: "1px solid gray" }}>Causal Category</th>
              <th style={{ border: "1px solid gray" }}>Residual Severity</th>
              <th style={{ border: "1px solid gray" }}>Action Reference</th>
              <th style={{ border: "1px solid gray" }}>Action Description</th>
              <th style={{ border: "1px solid gray" }}>Action Owner</th>
              <th style={{ border: "1px solid gray" }}>Action Nominee</th>
              <th style={{ border: "1px solid gray" }}>Assessment Frequency</th>
              <th style={{ border: "1px solid gray" }}>Next Assessment Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid gray" }}>{item.referenceRisk}</td>
                <td style={{ border: "1px solid gray" }}>{item.entity}</td>
                <td style={{ border: "1px solid gray" }}>{item.entityDescription}</td>
                <td style={{ border: "1px solid gray" }}>{item.crrReference}</td>
                <td style={{ border: "1px solid gray" }}>{item.descriptionRisk}</td>
                <td style={{ border: "1px solid gray" }}>{item.riskCategory}</td>
                <td style={{ border: "1px solid gray" }}>{item.causalCategory}</td>
                <td style={{ border: "1px solid gray" }}>{item.residualSeverity}</td>
                <td style={{ border: "1px solid gray" }}>{item.actionReference}</td>
                <td style={{ border: "1px solid gray" }}>{item.actionDescription}</td>
                <td style={{ border: "1px solid gray" }}>{item.actionOwner}</td>
                <td style={{ border: "1px solid gray" }}>{item.actionNominee}</td>
                <td style={{ border: "1px solid gray" }}>{item.frequence}</td>
                <td style={{ border: "1px solid gray" }}>{item.nextAssessMent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default RiskAssessmentTable;
