import Card from "components/card/Card";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Icon,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import Head from "./components/Head";
import { MdClose, MdInsertDriveFile } from "react-icons/md";
import { useLocation } from "react-router-dom";
import LossesEntities from "./components/LossesEntities";
import Loader from "../../../assets/img/loader.gif";
import DetailsForm from "./components/DetailsForm";
import Commentary from "./components/commentary";
import Finances from "./components/Financials";
import { FaPrint } from "react-icons/fa";
import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import AddEventForm from "../risks/components/AddEventForm";
import { FaEnvelope } from "react-icons/fa6";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DeleteModal from "./components/DeleteModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { connect, useDispatch, useSelector } from "react-redux";
import { listEntities } from "redux/entity/action";
import { listProfiles } from "redux/profile/action";
import { url } from "urlLoader";
import moment from "moment";
import { updateEvent } from "redux/events/action";
import { listEvents } from "redux/events/action";
import { fetchEvent } from "redux/events/action";

const generatePDF = async () => {
  const headElement = document.getElementById("head-component"); // Assume the Head component has an ID

  const canvas = await html2canvas(headElement);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 0, 0);

  const pdfBlob = pdf.output("blob");
  return pdfBlob;
};

const Event = ({ profiles, entities }) => {
  const [loader, setLoader] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [isPrintDisabled, setIsPrintDisabled] = useState(false);
  const [isUnapprovedDisabled, setIsUnapprovedDisabled] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [isAmendDisabled, setIsAmendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const event = location.state?.event;
  const iframeRef = useRef(null);
  const history = useHistory();

  const {eventfecth=event, loading} = useSelector(state => state.EventReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvent(event._id));
  }, [dispatch]);

  if (!eventfecth) {
    return <Text>Cet évènement n'existe pas.</Text>;
  }

  const uploadPDF = async (pdfBlob) => {
    const formData = new FormData();
    formData.append("files", pdfBlob, "event-head.pdf");

    const response = await fetch(`${url}/api/v1/upload/files`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.status === 200) {
      return result.data.downloadLinks[0];
    } else {
      throw new Error("Failed to upload PDF");
    }
  };

  const handleUnapprovedClick = async () => {
    const payload = {
      approved: false,
    };

    console.log(payload);

    setIsLoading(true);
    try {
      await dispatch(updateEvent(eventfecth._id, payload));
      await dispatch(listEvents());
      await dispatch(fetchEvent(eventfecth._id));
      setIsEmailDisabled(true);
      setIsPrintDisabled(true);
      setIsUnapprovedDisabled(true);
      setIsDeleteDisabled(true);
      setIsAmendDisabled(false);

    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      // Vous pouvez également gérer les erreurs ici, par exemple en affichant un message d'erreur
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailClick = async () => {
    setLoader(true);
    try {
      const pdfBlob = await generatePDF();
      const pdfLink = await uploadPDF(pdfBlob);

      const mailtoLink = `mailto:?subject=Event Details&body=Please find the attached event details: ${pdfLink}`;
      window.location.href = mailtoLink;
      setLoader(false);
    } catch (error) {
      console.error("Error generating or uploading PDF:", error);
      setLoader(false);
    }
  };

  const handlePrint = () => {
    const headContent = document.getElementById("head-component").innerHTML;
    const iframe = iframeRef.current.contentWindow;

    iframe.document.open();
    iframe.document.write(`
            <html>
                <head>
                    <style>
                        /* Include external CSS */
                        ${Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            return Array.from(sheet.cssRules)
              .map((rule) => rule.cssText)
              .join("");
          } catch (e) {
            // Handle cross-origin restrictions
            return "";
          }
        })
        .join("")}
                    </style>
                </head>
                <body>
                    ${headContent}
                </body>
            </html>
        `);
    iframe.document.close();
    iframe.focus();
    iframe.print();
  };
console.log('eventFetch:', eventfecth)
  const totalRow = eventfecth?.financials.totalConverted;
  const name = eventfecth.details.reviewer?.name ? eventfecth.details.reviewer?.name : "";
  const surname = eventfecth.details.reviewer?.surname
    ? eventfecth.details.reviewer?.surname
    : "";

  const nameOwner = eventfecth.details.owner?.name ? eventfecth.details.owner?.name : "";
  const surnameOwner = eventfecth.details.owner?.surname
    ? eventfecth.details.owner?.surname
    : "";

  const nameNominee = eventfecth.details.nominee?.name ? eventfecth.details.nominee?.name : "";
  const surnameNominee = eventfecth.details.nominee?.surname
    ? eventfecth.details.nominee?.surname
    : "";

  return (
    <Card mt="100px">
      <ChakraLink as={ReactRouterLink} to="/admin/events" color="blue">
        <Flex alignItems="center" mb={4}>
          <ChevronLeftIcon />
          Retour à la page des événements
        </Flex>
      </ChakraLink>
      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : (
        <>
          {!eventfecth ? (
            <Flex alignItems="center" justifyContent="center">
              <Text fontSize="12px">
                Cet événement n’existe pas.
              </Text>
            </Flex>
          ) : (
            <Flex direction="column" gap={6}>
              <div
                id="head-component"
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <Head
                  eventRef={`EVT${eventfecth.num_ref}`}
                  currentState={
                    eventfecth.approved === true ? "Approved" : "Unapproved"
                  }
                  currentLocks={<Icon as={MdInsertDriveFile} boxSize={6} />}
                  description={eventfecth.details.description}
                  totalLosses={totalRow}
                  devise={eventfecth?.financials.currency}
                  externalRef={eventfecth.details.externalRef}
                />
                <DetailsForm
                  detailledDescription={eventfecth.details.descriptionDetailled}
                />
                <LossesEntities
                  entityofDetection={
                    eventfecth?.details?.entityOfDetection?.referenceId
                      ? `ENT ${eventfecth?.details?.entityOfDetection?.referenceId} CAM - ${eventfecth?.details?.entityOfDetection?.description}`
                      : ""
                  }
                  subEntityofDetection={eventfecth?.details?.subentityOfDetection}
                  entityofDOrigin={
                    eventfecth?.details?.entityOfOrigin?.referenceId
                      ? `ENT ${eventfecth.details.entityOfOrigin.referenceId} CAM - ${eventfecth.details.entityOfOrigin.description}`
                      : ""
                  }
                  subEntityofOrigin={eventfecth.details.subentityOfOrigin}
                />
                <Commentary
                  eventDate={
                    eventfecth.details?.event_date ? eventfecth.details?.event_date : ""
                  }
                  rag={eventfecth.details?.RAG}
                  activeEvent={
                    eventfecth.details?.activeeventfecth ? eventfecth.details?.activeEvent : ""
                  }
                  eventTime={
                    eventfecth.details?.event_time ? eventfecth.details?.eventfecth_time : ""
                  }
                  recordedBy={
                    eventfecth.details?.recorded_by ? eventfecth.details?.recorded_by : ""
                  }
                  dateRecording={eventfecth?.createdAt ? eventfecth?.createdAt : ""}
                  timeRecording={eventfecth?.createdAt ? eventfecth?.createdAt : ""}
                  excludeFundLosse={eventfecth.details.excludeFundLosses}
                  externalEvent={eventfecth.details.externalEvent}
                  notify={eventfecth.details.notify}
                  detectionDate={eventfecth.details?.detection_date}
                />
                <Finances
                  approved={eventfecth.details.approved_date}
                  closed={eventfecth.details.closed_date}
                  targetClosure={
                    eventfecth.details.targetClosureDate
                      ? moment(eventfecth.details.targetClosureDate).format(
                        "DD/MM/YYYY"
                      )
                      : ""
                  }
                  owner={nameOwner + " " + surnameOwner}
                  nominee={nameNominee + " " + surnameNominee}
                  reviewer={name + " " + surname}
                  reviewerDate={eventfecth.details.reviewer_date}
                />
              </div>
              <Flex justifyContent="flex-end" gap={4}>
                <Flex>
                  <Button
                    leftIcon={<FaEnvelope />}
                    variant="outline"
                    colorScheme="red"
                    onClick={handleEmailClick}
                    isLoading={loader}
                    isDisabled={!eventfecth.approved}
                  >
                    E-mail
                  </Button>
                </Flex>
                <Flex>
                  <Button
                    leftIcon={<FaPrint />}
                    variant="outline"
                    colorScheme="teal"
                    onClick={handlePrint}
                    isDisabled={!eventfecth.approved}
                  >
                    Print
                  </Button>
                </Flex>
                <Flex>
                  <Button
                    leftIcon={<MdClose />}
                    variant="outline"
                    colorScheme="green"
                    onClick={handleUnapprovedClick}
                    isDisabled={isLoading || !eventfecth.approved}
                  >
                    {isLoading ? (
                      <Flex alignItems="center" justifyContent="center" width="100%">
                        <Image src={Loader} alt="Loading..." height={25} width={25} />
                      </Flex>
                    ) : (
                      "Non approuvé"
                    )}
                  </Button>
                </Flex>
                <Flex>
                  <AddEventForm
                    event={eventfecth}
                    entities={entities}
                    profiles={profiles}
                    isEdit={isEdit}
                    isAmendDisabled={eventfecth.approved}
                  />
                </Flex>
                <Flex>
                  <DeleteModal
                    selectedEntity={eventfecth}
                    isDeleteDisabled={!eventfecth.approved}
                  />
                </Flex>
              </Flex>
            </Flex>
          )}
        </>
      )}
      <iframe ref={iframeRef} style={{ display: "none" }} />
    </Card>
  );
};

const mapStateToProps = ({ EntityReducer, ProfileReducer }) => ({
  profiles: ProfileReducer.profiles,
  entities: EntityReducer.entities,
  loading: EntityReducer.loading,
});

export default connect(mapStateToProps)(Event);
