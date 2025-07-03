import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Loader from "../../../../assets/img/loader.gif";

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
              <th style={{ border: "1px solid gray" }}>Recovery</th>
              <th style={{ border: "1px solid gray" }}>Net Loss</th>
              <th style={{ border: "1px solid gray" }}>Currency</th>
              <th style={{ border: "1px solid gray" }}>First Increment Date</th>
              <th style={{ border: "1px solid gray" }}>Last Increment Date</th>
              {/* <th style={{ border: "1px solid gray" }}>Effective Date</th> */}
              <th style={{ border: "1px solid gray" }}>Causal Category</th>
              <th style={{ border: "1px solid gray" }}>
                Toplevel Causal Category
              </th>
              <th style={{ border: "1px solid gray" }}>Business Line</th>
              <th style={{ border: "1px solid gray" }}>Location</th>
              {/* <th style={{ border: "1px solid gray" }}>Causal Entity</th> */}
              <th style={{ border: "1px solid gray" }}>Product Type</th>
              <th style={{ border: "1px solid gray" }}>System Type</th>
              <th style={{ border: "1px solid gray" }}>Boundary Event Class</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item, idx) => {

              const actualLoss = item.financials.data.actualLoss?.total || 0;
              const actualRecovery = item.financials.data.actualRecovery?.total || 0;
              const expectedRecovery = item.financials.data.expectedRecovery?.total || 0;
              const insuranceRecovery = item.financials.data.insuranceRecovery?.total || 0;

              const totalRecovery = actualRecovery + expectedRecovery + insuranceRecovery;
              const netLoss = actualLoss - totalRecovery;

              const nameOwner = item.details.owner?.name ? item.details.owner?.name : "";
              const surnameOwner = item.details.owner?.surname
                ? item.details.owner?.surname
                : "";

              const nameNominee = item.details.nominee?.name ? item.details.nominee?.name : "";
              const surnameNominee = item.details.nominee?.surname
                ? item.details.nominee?.surname
                : "";

              const name = item.details.reviewer?.name ? item.details.reviewer?.name : "";
              const surname = item.details.reviewer?.surname
                ? item.details.reviewer?.surname
                : "";

              return (
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
                      ? new Date(item.details.event_date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                      : ""}
                  </td>
                  {/* <td style={{ border: "1px solid gray" }}>{item.raisedDate}</td> */}
                  <td style={{ border: "1px solid gray" }}>
                    {item.details.approved_date
                      ? new Date(item.details.approved_date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                      : ""}
                  </td>
                  <td style={{ border: "1px solid gray" }}>{nameOwner + " " + surnameOwner}</td>
                  <td style={{ border: "1px solid gray" }}>{nameNominee + " " + surnameNominee}</td>
                  <td style={{ border: "1px solid gray" }}>{name + " " + surname}</td>
                  <td style={{ border: "1px solid gray" }}>{actualLoss}</td>
                  <td style={{ border: "1px solid gray" }}>{totalRecovery}</td>
                  <td style={{ border: "1px solid gray" }}>{netLoss.toFixed(2)}</td>
                  <td style={{ border: "1px solid gray" }}>{item.financials.currency}</td>
                  <td style={{ border: "1px solid gray" }}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                      : ""}
                  </td>
                  <td style={{ border: "1px solid gray" }}>
                    {item.updatedAt
                      ? new Date(item.updatedAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                      : ""}
                  </td>
                  {/* <td style={{ border: "1px solid gray" }}>
                  {item.effectiveDate}
                </td> */}
                  <td style={{ border: "1px solid gray" }}>
                    {item.additionnalInfo.find(info => info.category === "Causes")?.description || ""}
                  </td>
                  <td style={{ border: "1px solid gray" }}>
                    {item.additionnalInfo.find(info => info.category === "Causes")?.topLevel || ""}
                  </td>
                  <td style={{ border: "1px solid gray" }}>
                    {item.additionnalInfo.find(info => info.category === "Regulator Line of Business")?.description || ""}
                  </td>
                  <td style={{ border: "1px solid gray" }}>CAMEROUN</td>
                  {/* <td style={{ border: "1px solid gray" }}>
                    {item.casualEntity}
                  </td> */}
                  <td style={{ border: "1px solid gray" }}>
                    {item.additionnalInfo.find(info => info.category === "Product Type")?.description || ""}
                  </td>
                  <td style={{ border: "1px solid gray" }}>
                    {item.additionnalInfo.find(info => info.category === "System Type")?.description || ""}</td>
                  <td style={{ border: "1px solid gray" }}>
                    {item.additionnalInfo.find(info => info.category === "Boundary Event Classification")?.description || ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Box>
  );
}
