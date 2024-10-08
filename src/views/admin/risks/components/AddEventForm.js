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
  Button
} from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react';
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

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  return text.substring(0, maxLength) + '...';
};

function AddEventForm({ event, entities, profiles, isEdit, isAmendDisabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detailsData, setDetailsData] = useState({});
  const [commentaryData, setCommentaryData] = useState({});
  const [financesData, setFinancesData] = useState([]);
  const [additionalData, setAdditionalData] = useState({});
  const [currency, setCurrency] = useState(null);

  const categories = data.map(item => item.title);

  const handleDetailsChange = (data) => {
    setDetailsData(data);
  };

  const handleCommentaryChange = (data) => {
    setCommentaryData(data);
  };

  const handleFinancesChange = (data, selectedCurrency) => {
    setFinancesData(data);
    setCurrency(selectedCurrency);
  };

  const handleAdditionalChange = (data) => {
    setAdditionalData(data);
  };

  const dispatch = useDispatch();

  const additionalInfoData = Object.keys(additionalData).map((key, index) => ({
    category: categories[index],
    description: additionalData[key]
  }));

  const approved = true

  const handleSubmit = async () => {
    const payload = {
      details: {
        ...detailsData,
        rate: currency,
      },
      commentary: {
        ...commentaryData
      },
      financials: [
        ...financesData
      ],
      additionnalInfo: [
        ...additionalInfoData
      ],
      approved: approved
    };

    console.log(payload);

    try {
      await dispatch(AddEvent(payload));
      onClose(); // Ferme la modal après la soumission réussie
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      // Vous pouvez également gérer les erreurs ici, par exemple en affichant un message d'erreur
    }
  };

  const handleUpdate = async () => {
    const payload = {
      details: {
        ...detailsData,
        rate: currency,
      },
      commentary: {
        ...commentaryData
      },
      financials: [
        ...financesData
      ],
      additionnalInfo: [
        ...additionalInfoData
      ],
      approved: approved
    };

    console.log(payload);

    try {
      await dispatch(updateEvent(event._id, payload));
      onClose(); // Ferme la modal après la soumission réussie
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      // Vous pouvez également gérer les erreurs ici, par exemple en affichant un message d'erreur
    }
  };

  return (
    <>
      <Flex justifyContent='flex-end'>
        <Box top="20px">
          {event ?
            <Button leftIcon={<FaFilePen />} onClick={onOpen} variant='outline' colorScheme='blue' disabled={isAmendDisabled}>Amend </Button> :
            <Button leftIcon={<AddIcon />} onClick={onOpen} variant="outline" colorScheme='blue' size='sm'>
              Add new event
            </Button>}

        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{event ? `EVT${event.num_ref} ${truncateText(event?.details.description, 50)}` : 'New event'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Details</Tab>
                <Tab>Commentary</Tab>
                <Tab >Financials</Tab>
                <Tab>Additional info <span style={{ color: 'red' }}>*</span></Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Details onDetailsChange={handleDetailsChange} event={event} entities={entities} profiles={profiles} />
                </TabPanel>
                <TabPanel>
                  <Commentary onCommentaryChange={handleCommentaryChange} event={event} />
                </TabPanel>
                <TabPanel>
                  <Finances onFinancesChange={handleFinancesChange} financesData={financesData} isEdit={isEdit} event={event} />
                </TabPanel>
                <TabPanel>
                  <Additional onAdditionalChange={handleAdditionalChange} event={event} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button onClick={ event ? handleUpdate : handleSubmit} colorScheme="blue" mr={2}>
              {event ? "Amend and Approuve" : "Save and Approuve"}
            </Button>
            {/* <GlobalViewEvent detailsData={detailsData} commentaryData={commentaryData} financesData={financesData} additionalData={additionalData} categories={categories} /> */}
            <Button colorScheme="red" mr={2} onClick={onClose}>Cancel</Button>
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
