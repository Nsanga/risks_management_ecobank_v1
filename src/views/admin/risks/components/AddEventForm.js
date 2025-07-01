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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Details from "./Details";
import Commentary from "./Commentary";
import Finances from "./Finances";
import { AddIcon } from "@chakra-ui/icons";
import Additional from "./Additional";
import GlobalViewEvent from "./globalViewEvent/GlobalViewEvent";
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
  const [detailsData, setDetailsData] = useState({});
  const [commentaryData, setCommentaryData] = useState({});
  const [financesData, setFinanceData] = useState(null);
  const [additionalData, setAdditionalData] = useState({});
  const [isLoading, setIsLoading] = useState(null);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const history = useHistory();

  const handleNext = () => {
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

  const categories = data.map((item) => item.title);

  const handleDetailsChange = (data) => {
    setDetailsData(data);
  };

  const handleCommentaryChange = (data) => {
    setCommentaryData(data);
  };

  const handleTableChange = (payload) => {
    console.log('Payload reçu du tableau :', payload);
    setFinanceData(payload);
  };

  const handleAdditionalChange = (data) => {
    setAdditionalData(data);
  };

  const dispatch = useDispatch();

  const additionalInfoData = Object.keys(additionalData).map((key, index) => ({
    category: categories[index],
    description: additionalData[key],
  }));

  const approved = true;

  const handleSubmit = async () => {
    if (
      !detailsData.description ||
      !detailsData.entityOfDetection ||
      !detailsData.entityOfOrigin ||
      !detailsData.owner ||
      !detailsData.nominee ||
      !detailsData.detection_date ||
      !detailsData.event_date
    ) {
      toast.error("Please enter all required fields");
    } else {
      const payload = {
        details: {
          ...detailsData,
          recorded_by: localStorage.getItem("username"),
        },
        commentary: {
          ...commentaryData,
        },
        financials: financesData,
        additionnalInfo: [...additionalInfoData],
        approved: approved,
      };

      setIsLoading(true);
      try {
        await dispatch(AddEvent(payload));
        onClose(); // Ferme la modal après la soumission réussie
        await dispatch(listEvents());
      } catch (error) {
        console.error("Erreur lors de la soumission:", error);
        // Vous pouvez également gérer les erreurs ici, par exemple en affichant un message d'erreur
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = async (event) => {
    // Créer le payload en combinant les données existantes de l'événement
    // avec les données modifiées des états locaux
    const payload = {
      details: {
        ...event.details, // données existantes
        ...detailsData,   // données modifiées
        recorded_by: localStorage.getItem("username"),
      },
      commentary: {
        ...event.commentary, // données existantes
        ...commentaryData,   // données modifiées
      },
      financials: financesData,
      additionnalInfo: additionalInfoData.length > 0
        ? [...additionalInfoData]
        : [...event.additionnalInfo],
      approved: approved,
    };

    console.log(payload);

    setIsLoading(true);
    try {
      await dispatch(updateEvent(event._id, payload));
      onClose(); // Ferme la modal après la soumission réussie
      history.push({
        pathname: '/admin/events',
      });
      await dispatch(listEvents());
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      // Vous pouvez également gérer les erreurs ici, par exemple en affichant un message d'erreur
    } finally {
      setIsLoading(false);
    }
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
                      <StepTitle>{step.title}</StepTitle>
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
                    event={event}
                    entities={entities}
                    profiles={profiles}
                  />
                )}
                {activeStep === 1 && (
                  <Commentary
                    onCommentaryChange={handleCommentaryChange}
                    event={event}
                  />
                )}
                {activeStep === 2 && (
                  <DynamicTable onDataChange={handleTableChange} />
                )}
                {activeStep === 3 && (
                  <Additional
                    onAdditionalChange={handleAdditionalChange}
                    event={event}
                  />
                )}


              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup mt={5} spacing={4}>
              <Button
                isDisabled={activeStep === 0}
                onClick={handlePrev}
                variant="outline"
              >
                Retour
              </Button>
              <Button colorScheme="red" mr={2} onClick={handleClose}>
                Annuler
              </Button>
              <Button
                onClick={activeStep === steps.length - 1 ? (event ? () => handleUpdate(event) : handleSubmit) : handleNext}
                colorScheme="blue"
                mr={2}
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
