import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Loader from "../../../../assets/img/loader.gif";

const data = [
  {
    eventReference: "EVT-CM-001",
    shortDescription: "",
    detailDescription: "",
    impactEntity: "",
    originEntity: "",
    eventDate: "2023-01-13",
    raisedDate: "2023-01-30",
    approvalDate: "2023-01-30",
    eventOwner: "BETKEU BETKEU PAHO",
    eventNominee: "Ibrahima DANDJOUMA",
    eventReviewer: "",
    grossLoss: 1727.15,
    netLoss: 0,
    firstIncrementDate: "2023-01-30",
    lastIncrementDate: "2023-01-30",
    effectiveDate: "2023-01-13",
    casualCategory: "Debit card fraud",
    toplevelCasualCategory: "External Fraud",
    businessLine: "Commercial",
    location: "CAMEROON",
    casualEntity: "Commercial",
    productType: "Commercial Banking",
    systemType: "NOT SYSTEM RELATED",
    boundaryEventClass: "Operational Risk Event",
  },
  {
    eventReference: "EVT-CM-002",
    shortDescription: "",
    detailDescription: "",
    impactEntity: "",
    originEntity: "",
    eventDate: "2020-01-15",
    raisedDate: "2023-10-04",
    approvalDate: "2023-11-21",
    eventOwner: "Aubin NOUMEGNE NANKAM",
    eventNominee: "Guy MBAH",
    eventReviewer: "",
    grossLoss: 52680.0,
    netLoss: 52680.0,
    firstIncrementDate: "2023-10-04",
    lastIncrementDate: "2023-11-21",
    effectiveDate: "2023-09-28",
    casualCategory: "Accounting error / entry attribution error",
    toplevelCasualCategory: "Execution, delivery and process management",
    businessLine: "Commercial",
    location: "CAMEROON",
    casualEntity: "Commercial",
    productType: "Bank Draft",
    systemType: "FLEXCUBE",
    boundaryEventClass: "Operational Risk Event",
  },
  {
    eventReference: "EVT-CM-003",
    shortDescription: "",
    detailDescription: "",
    impactEntity: "",
    originEntity: "",
    eventDate: "2022-06-15",
    raisedDate: "2023-06-20",
    approvalDate: "2023-06-22",
    eventOwner: "Jean MBENG",
    eventNominee: "Pauline NDONGO",
    eventReviewer: "",
    grossLoss: 1500.0,
    netLoss: 1200.0,
    firstIncrementDate: "2023-06-20",
    lastIncrementDate: "2023-06-22",
    effectiveDate: "2022-06-15",
    casualCategory: "Internal fraud",
    toplevelCasualCategory: "Internal Fraud",
    businessLine: "Retail",
    location: "CAMEROON",
    casualEntity: "Retail Banking",
    productType: "Savings Account",
    systemType: "Core Banking",
    boundaryEventClass: "Operational Risk Event",
  },
  {
    eventReference: "EVT-CM-004",
    shortDescription: "",
    detailDescription: "",
    impactEntity: "",
    originEntity: "",
    eventDate: "2021-11-05",
    raisedDate: "2021-11-10",
    approvalDate: "2021-11-12",
    eventOwner: "Mireille KAMDEM",
    eventNominee: "Eric TCHOUPE",
    eventReviewer: "",
    grossLoss: 8000.0,
    netLoss: 8000.0,
    firstIncrementDate: "2021-11-10",
    lastIncrementDate: "2021-11-12",
    effectiveDate: "2021-11-05",
    casualCategory: "Process failure",
    toplevelCasualCategory: "Execution, delivery and process management",
    businessLine: "Commercial",
    location: "CAMEROON",
    casualEntity: "Commercial",
    productType: "Loan",
    systemType: "Loan Management System",
    boundaryEventClass: "Operational Risk Event",
  },
  {
    eventReference: "EVT-CM-005",
    shortDescription: "",
    detailDescription: "",
    impactEntity: "",
    originEntity: "",
    eventDate: "2024-02-01",
    raisedDate: "2024-02-05",
    approvalDate: "2024-02-06",
    eventOwner: "Samuel TCHOUAKEU",
    eventNominee: "Diana MBAL",
    eventReviewer: "",
    grossLoss: 3000.0,
    netLoss: 2800.0,
    firstIncrementDate: "2024-02-05",
    lastIncrementDate: "2024-02-06",
    effectiveDate: "2024-02-01",
    casualCategory: "Cyber attack",
    toplevelCasualCategory: "External Fraud",
    businessLine: "Corporate",
    location: "CAMEROON",
    casualEntity: "Corporate Banking",
    productType: "Online Payment",
    systemType: "Security System",
    boundaryEventClass: "Operational Risk Event",
  },
  {
    eventReference: "EVT-CM-006",
    shortDescription: "",
    detailDescription: "",
    impactEntity: "",
    originEntity: "",
    eventDate: "2023-12-12",
    raisedDate: "2023-12-13",
    approvalDate: "2023-12-14",
    eventOwner: "Charles NGUEMO",
    eventNominee: "Rebecca NDEMB",
    eventReviewer: "",
    grossLoss: 4500.0,
    netLoss: 4000.0,
    firstIncrementDate: "2023-12-13",
    lastIncrementDate: "2023-12-14",
    effectiveDate: "2023-12-12",
    casualCategory: "Human error",
    toplevelCasualCategory: "Execution, delivery and process management",
    businessLine: "Retail",
    location: "CAMEROON",
    casualEntity: "Retail Banking",
    productType: "Credit Card",
    systemType: "Payment System",
    boundaryEventClass: "Operational Risk Event",
  },
  {
    eventReference: "EVT-CM-007",
    shortDescription: "",
    detailDescription: "",
    impactEntity: "",
    originEntity: "",
    eventDate: "2023-09-01",
    raisedDate: "2023-09-05",
    approvalDate: "2023-09-07",
    eventOwner: "Hermine TANG",
    eventNominee: "Joseph MBONGO",
    eventReviewer: "",
    grossLoss: 2100.0,
    netLoss: 2100.0,
    firstIncrementDate: "2023-09-05",
    lastIncrementDate: "2023-09-07",
    effectiveDate: "2023-09-01",
    casualCategory: "System failure",
    toplevelCasualCategory: "Technical",
    businessLine: "Commercial",
    location: "CAMEROON",
    casualEntity: "Commercial",
    productType: "ATM",
    systemType: "ATM Network",
    boundaryEventClass: "Operational Risk Event",
  },
];

export default function IncidentLossReportTable({ reports, loading }) {
  console.log("reports:", reports);
  return (
    <Box p={4} overflowX="auto" maxWidth="100%">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Event Loss Report table
      </Text>
      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : (
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          style={{
            borderCollapse: "collapse",
            width: "1400px",
            fontSize: "14px",
            border: "1px solid gray",
            minWidth: "1400px",
          }}
        >
          <thead
            style={{
              backgroundColor: "#009fe3",
              color: "white",
              textAlign: "left",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <tr>
              <th style={{ border: "1px solid gray" }}>Event Reference</th>
              <th style={{ border: "1px solid gray" }}>Short Description</th>
              <th style={{ border: "1px solid gray" }}>Detail Description</th>
              <th style={{ border: "1px solid gray" }}>Impact Entity</th>
              <th style={{ border: "1px solid gray" }}>Origin Entity</th>
              <th style={{ border: "1px solid gray" }}>Event Date</th>
              {/* <th style={{ border: "1px solid gray" }}>Raised Date</th> */}
              <th style={{ border: "1px solid gray" }}>Approval Date</th>
              <th style={{ border: "1px solid gray" }}>Event Owner</th>
              <th style={{ border: "1px solid gray" }}>Event Nominee</th>
              <th style={{ border: "1px solid gray" }}>Event Reviewer</th>
              <th style={{ border: "1px solid gray" }}>Gross Loss</th>
              <th style={{ border: "1px solid gray" }}>Net Loss</th>
              <th style={{ border: "1px solid gray" }}>First Increment Date</th>
              <th style={{ border: "1px solid gray" }}>Last Increment Date</th>
              {/* <th style={{ border: "1px solid gray" }}>Effective Date</th> */}
              <th style={{ border: "1px solid gray" }}>Casual Category</th>
              <th style={{ border: "1px solid gray" }}>
                Toplevel Casual Category
              </th>
              <th style={{ border: "1px solid gray" }}>Business Line</th>
              <th style={{ border: "1px solid gray" }}>Location</th>
              <th style={{ border: "1px solid gray" }}>Casual Entity</th>
              <th style={{ border: "1px solid gray" }}>Product Type</th>
              <th style={{ border: "1px solid gray" }}>System Type</th>
              <th style={{ border: "1px solid gray" }}>Boundary Event Class</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid gray" }}>EVT{item.num_ref}</td>
                <td style={{ border: "1px solid gray" }}>
                  {item.details.description}
                </td>
                <td style={{ border: "1px solid gray" }}>
                  {item.details.descriptionDetailled}
                </td>
                <td style={{ border: "1px solid gray" }}>
                  {item.details.entityOfDetection.description}
                </td>
                <td style={{ border: "1px solid gray" }}>
                  {item.details.entityOfOrigin.description}
                </td>
                <td style={{ border: "1px solid gray" }}>
                  {item.details.event_date
                    ? new Date(item.details.event_date).toLocaleDateString()
                    : ""}
                </td>
                {/* <td style={{ border: "1px solid gray" }}>{item.raisedDate}</td> */}
                <td style={{ border: "1px solid gray" }}>
                  {item.details.approved_date
                    ? new Date(item.details.approved_date).toLocaleDateString()
                    : ""}
                </td>
                <td style={{ border: "1px solid gray" }}>{item.owner}</td>
                <td style={{ border: "1px solid gray" }}>{item.nominee}</td>
                <td style={{ border: "1px solid gray" }}>{item.reviewer}</td>
                <td style={{ border: "1px solid gray" }}>{item.grossLoss}</td>
                <td style={{ border: "1px solid gray" }}>{item.netLoss}</td>
                <td style={{ border: "1px solid gray" }}>
                  {item.firstIncrementDate}
                </td>
                <td style={{ border: "1px solid gray" }}>
                  {item.lastIncrementDate}
                </td>
                {/* <td style={{ border: "1px solid gray" }}>
                  {item.effectiveDate}
                </td> */}
                <td style={{ border: "1px solid gray" }}>
                  {item.casualCategory}
                </td>
                <td style={{ border: "1px solid gray" }}>
                  {item.toplevelCasualCategory}
                </td>
                <td style={{ border: "1px solid gray" }}>
                  {item.businessLine}
                </td>
                <td style={{ border: "1px solid gray" }}>CAMEROUN</td>
                <td style={{ border: "1px solid gray" }}>
                  {item.casualEntity}
                </td>
                <td style={{ border: "1px solid gray" }}>{item.productType}</td>
                <td style={{ border: "1px solid gray" }}>{item.systemType}</td>
                <td style={{ border: "1px solid gray" }}>
                  {item.boundaryEventClass}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Box>
  );
}
