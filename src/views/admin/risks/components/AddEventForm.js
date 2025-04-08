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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Details from "./Details";
import Commentary from "./Commentary";
import Finances from "./Finances";
import { AddIcon } from "@chakra-ui/icons";
import Additional from "./Additional";
import GlobalViewEvent from "./globalViewEvent/GlobalViewEvent";
import { useState } from "react";
import data from "../Data";
import { FaFilePen } from "react-icons/fa6";
import { connect, useDispatch } from "react-redux";
import { AddEvent } from "redux/events/action";
import { updateEvent } from "redux/events/action";
import toast from "react-hot-toast";
import Loader from "../../../../assets/img/loader.gif";
import { listEvents } from "redux/events/action";

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || "";
  }
  return text.substring(0, maxLength) + "...";
};

function AddEventForm({ event, entities, profiles, isEdit, isAmendDisabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detailsData, setDetailsData] = useState({});
  const [commentaryData, setCommentaryData] = useState({});
  const [financesData, setFinancesData] = useState([]);
  const [additionalData, setAdditionalData] = useState({});
  const [currency, setCurrency] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [totalCurrenciesProps, setTotalCurrenciesProps] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const categories = data.map((item) => item.title);

  const handleDetailsChange = (data) => {
    setDetailsData(data);
  };

  const handleCommentaryChange = (data) => {
    setCommentaryData(data);
  };

  const handleFinancesChange = (data, selectedCurrency) => {
    setFinancesData(data);
    console.log(selectedCurrency)
    setCurrency(selectedCurrency);
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
      !detailsData.detection_date
    ) {
      toast.error("Please enter all required fields");
    } else {
      const payload = {
        details: {
          ...detailsData,
          rate: currency || "USD",
          recorded_by: localStorage.getItem("username"),
        },
        commentary: {
          ...commentaryData,
        },
        financials: [...financesData],
        additionnalInfo: [...additionalInfoData],
        approved: approved,
      };

      console.log(payload);

      setIsLoading(true);
      try {
        await dispatch(AddEvent(payload));
        dispatch(listEvents());
        onClose(); // Ferme la modal après la soumission réussie
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
        rate: currency || event.details.rate || "USD",
        recorded_by: localStorage.getItem("username"),
      },
      commentary: {
        ...event.commentary, // données existantes
        ...commentaryData,   // données modifiées
      },
      financials: financesData.length > 0 ? [...financesData] : [...event.financials],
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
      dispatch(listEvents());
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
              Amend{" "}
            </Button>
          ) : (
            <Button
              leftIcon={<AddIcon />}
              onClick={onOpen}
              variant="outline"
              colorScheme="blue"
              size="sm"
            >
              Add new event
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
            <Tabs index={activeTab} onChange={(index) => setActiveTab(index)}>
              <TabList>
                <Tab>Details</Tab>
                <Tab>Commentary</Tab>
                <Tab>
                  Financials <span style={{ color: "red" }}>*</span>
                </Tab>
                <Tab>
                  Additional info <span style={{ color: "red" }}>*</span>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Details
                    onDetailsChange={handleDetailsChange}
                    event={event}
                    entities={entities}
                    profiles={profiles}
                  />
                </TabPanel>
                <TabPanel>
                  <Commentary
                    onCommentaryChange={handleCommentaryChange}
                    event={event}
                  />
                </TabPanel>
                <TabPanel>
                  <Finances
                    onFinancesChange={handleFinancesChange}
                    financesData={financesData}
                    isEdit={isEdit}
                    event={event}
                    setTotalCurrenciesProps={setTotalCurrenciesProps}
                  />
                </TabPanel>
                <TabPanel>
                  <Additional
                    onAdditionalChange={handleAdditionalChange}
                    event={event}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={event ? () => handleUpdate(event) : handleSubmit}
              colorScheme="blue"
              mr={2}
              disabled={activeTab === 2 && totalCurrenciesProps < 1}
            >
              {isLoading ? (
                <Flex alignItems="center" justifyContent="center" width="100%">
                  <Image src={Loader} alt="Loading..." height={25} width={25} />
                </Flex>
              ) : (
                <>{event ? "Amend and Approuve" : "Save and Approuve"}</>
              )}
            </Button>
            {/* <GlobalViewEvent detailsData={detailsData} commentaryData={commentaryData} financesData={financesData} additionalData={additionalData} categories={categories} /> */}
            <Button colorScheme="red" mr={2} onClick={onClose}>
              Cancel
            </Button>
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
