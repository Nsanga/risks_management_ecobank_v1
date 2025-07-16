import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Flex,
  Button,
  Image,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepIcon,
  StepNumber,
  useSteps,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Details from "./Details";
import Commentary from "./Commentary";
import { AddIcon } from "@chakra-ui/icons";
import Additional from "./Additional";
import { useEffect, useState } from "react";
import data from "../Data";
import { FaFilePen } from "react-icons/fa6";
import { connect, useDispatch } from "react-redux";
import { AddEvent } from "redux/events/action";
import { updateEvent } from "redux/events/action";
import toast from "react-hot-toast";
import Loader from "../../../../assets/img/loader.gif";
import { listEvents } from "redux/events/action";
import { useHistory } from "react-router-dom";
import DynamicTable from "./DynamicTable";
import FinanceSummaryTable from "./FinanceSummaryTable";
import { fetchEvent } from "redux/events/action";

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || "";
  }
  return text.substring(0, maxLength) + "...";
};

const steps = [
  { title: 'Détails', description: 'Informations principales' },
  { title: 'Commentaire', description: 'Ajouter un commentaire' },
  { title: 'Finances', description: 'Informations financières' },
  {
    title: 'Informations supplémentaires',
    description: 'Détails complémentaires'
  },
];

function AddEventForm({ event, entities, profiles, isEdit, isAmendDisabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detailsData, setDetailsData] = useState(null);
  const [commentaryData, setCommentaryData] = useState(null);
  const [financesData, setFinanceData] = useState(null);
  const [additionalData, setAdditionalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const dispatch = useDispatch();
  
  const handleNext = () => {
    // console.log('Payload reçu de details :', detailsData);
    console.log('Payload reçu de comment :', commentaryData);
    // console.log('Payload reçu de finances :', financesData);
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleClose = () => {
    onClose();
    setActiveStep(0);
  }

  const handleDetailsChange = (newDetails) => {
    // console.log('Payload reçu de details :', newDetails);
    setDetailsData(prevDetails => ({ ...prevDetails, ...newDetails }));
  };

  const handleCommentaryChange = (data) => {
    setCommentaryData(data);
  };

  const handleTableChange = (payload) => {
    // console.log('Payload reçu du tableau :', payload);
    setFinanceData(payload);
  };

  const handleAdditionalChange = ({ index, category, description, topLevel }) => {
    setAdditionalData(prev => ({
      ...prev,
      [index]: { category, description, topLevel },
    }));
  };

  const approved = true;

  const handleSubmit = async () => {
    setIsLoading(true);
  
    try {
      // Vérification des données minimales
      const safeDetails = detailsData || {};
      const safeCommentary = commentaryData || {};
      const safeFinancials = financesData || {};
      const safeAdditional = additionalData && typeof additionalData === 'object' ? Object.values(additionalData) : [];
  
      // Construction du payload
      const payload = {
        details: {
          ...safeDetails,
          approved_date: new Date().toISOString().slice(0, 10),
          recorded_by: localStorage.getItem("username") || "inconnu",
        },
        commentary: {
          comment: safeCommentary.commentary || "", // champ texte seulement
        },
        financials: safeFinancials,
        additionnalInfo: safeAdditional, // tableau [{ description, topLevel, category }, ...]
        approved: !!approved, // force à boolean
      };
  
      // console.log('✅ Payload prêt à envoyer :', payload);
      // console.log('🗂️ Données additionnelles brutes :', additionalData);
  
      // Enregistrement ou mise à jour
      if (event && event._id) {
        await dispatch(updateEvent(event._id, payload));
        await dispatch(fetchEvent(event._id));
      } else {
        await dispatch(AddEvent(payload));
      }
  
      // Fermeture du modal
      onClose();
  
      // Rafraîchissement de la liste principale
      await dispatch(listEvents());
  
    } catch (error) {
      console.error("❌ Erreur lors de la soumission :", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    console.log('event', event)
    if (event) {
      setDetailsData(event.details);
      setCommentaryData(event.commentary);
      setFinanceData(event.financials);
      setAdditionalData(event.additionnalInfo);
    } else {
      setDetailsData(null);
      setCommentaryData(null);
      setFinanceData(null);
      setAdditionalData({});
    }
  }, [event]);

  const isFirstStepValid = () => {
    return (
      detailsData?.description &&
      detailsData?.entityOfDetection &&
      detailsData?.entityOfOrigin &&
      detailsData?.owner &&
      detailsData?.nominee &&
      detailsData?.detection_date &&
      detailsData?.event_date
    );
  };

  return (
    <>
      <Flex justifyContent="flex-end">
        <Box top="20px">
          {event ? (
            <Button
              leftIcon={<FaFilePen />}
              onClick={onOpen}
              variant="outline"
              colorScheme="blue"
              disabled={isAmendDisabled}
            >
              Modifier{" "}
            </Button>
          ) : (
            <Button
              fontSize={12}
              variant="solid"
              colorScheme="blue"
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              Ajouter un nouvel événement
            </Button>
          )}
        </Box>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {event
              ? `EVT${event.num_ref} ${truncateText(
                event?.details.description,
                50
              )}`
              : "New event"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stepper index={activeStep} orientation="horizontal" gap="0">
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>
                        {step.title}
                        {step.title === "Finances" && (
                          <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                        )}
                        {step.title === "Informations supplémentaires" && (
                          <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                        )}
                      </StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

              <Box p={4}>
                {activeStep === 0 && (
                  <Details
                    onDetailsChange={handleDetailsChange}
                    detailsData={detailsData}
                    entities={entities}
                    profiles={profiles}
                  />
                )}
                {activeStep === 1 && (
                  <Commentary
                    onCommentaryChange={handleCommentaryChange}
                    commentaryData={commentaryData}
                  />
                )}
                {activeStep === 2 && (
                  <>
                    <DynamicTable onDataChange={handleTableChange} financesData={financesData} />
                    {financesData && financesData?.data && (
                      <>
                        {financesData && <FinanceSummaryTable financesData={financesData} />}
                      </>
                    )}
                  </>
                )}
                {activeStep === 3 && (
                  <Additional
                    onAdditionalChange={handleAdditionalChange}
                    additionalData={additionalData}
                  />
                )}


              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup mt={5} spacing={4}>
              {activeStep !== 0 && (
                <Button
                  onClick={handlePrev}
                  variant="outline"
                >
                  Retour
                </Button>
              )}
              <Button colorScheme="red" mr={2} onClick={handleClose}>
                Annuler
              </Button>
              <Button
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                colorScheme="blue"
                mr={2}
                isDisabled={isLoading || activeStep === 0 && !isFirstStepValid()}
              >
                {isLoading ? (
                  <Flex alignItems="center" justifyContent="center" width="100%">
                    <Image src={Loader} alt="Loading..." height={25} width={25} />
                  </Flex>
                ) : (
                  <>{activeStep === steps.length - 1 ? (event ? " Modifier et approuver" : "Enregistrer et approuver") : 'Suivant'}</>
                )}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// const mapStateToProps = ({ EventReducer }) => ({
//   events: EventReducer.events,
//   loading: EventReducer.loading,
// });

export default AddEventForm;
