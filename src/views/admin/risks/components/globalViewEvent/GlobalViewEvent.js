import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useDisclosure,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react'
import DetailsEvent from './DetailsEvent'
import CommentaryEvent from './CommentaryEvent'
import FinancesEvent from './FinancesEvent'
import AdditionalInfoEvent from './AdditionalInfoEvent'
import { AddEvent } from 'redux/events/action'
import { connect, useDispatch } from 'react-redux'

const GlobalViewEvent = ({ detailsData, commentaryData, financesData, additionalData, categories, loading }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch();

    const additionalInfoData = Object.keys(additionalData).map((key, index) => ({
        category: categories[index],
        description: additionalData[key]
    }));

    const approved = true

    const entityAreaOfOriginLabel = detailsData.entityOfOrigin ? detailsData.entityOfOrigin.label : '';
    const entityAreaOfDetectionLabel = detailsData.entityOfDetection ? detailsData.entityOfDetection.label : '';
    const ownerLabel = detailsData.owner ? detailsData.owner.label : '';
    const nomineeLabel = detailsData.nominee ? detailsData.nominee.label : '';
    const RAGLabel = detailsData.RAG ? detailsData.RAG.label : '';

    const handleSubmit = async () => {
        const payload = {
            details: {
                ...detailsData,
                entityOfOrigin: entityAreaOfOriginLabel,
                entityOfDetection: entityAreaOfDetectionLabel,
                owner: ownerLabel,
                nominee: nomineeLabel,
                RAG: RAGLabel
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

        try {
            // Affichage du payload dans la console
            // console.log('Payload:', payload);
            await dispatch(AddEvent(payload));
            onClose(); // Ferme la modal après la soumission réussie
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            // Vous pouvez également gérer les erreurs ici, par exemple en affichant un message d'erreur
        }
    };


    return (
        <>
            <Button
                disabled={!detailsData.owner || !detailsData.nominee || !detailsData.entityOfOrigin}
                onClick={onOpen} colorScheme="blue" mr={2}>
                Save
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size='5xl'>
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>Create your account</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Tabs>
                            <TabList>
                                <Tab>Details</Tab>
                                <Tab>Commentary</Tab>
                                <Tab >Financials</Tab>
                                <Tab>Additional info</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <DetailsEvent detailsData={detailsData} />
                                </TabPanel>
                                <TabPanel>
                                    <CommentaryEvent commentaryData={commentaryData} />
                                </TabPanel>
                                <TabPanel>
                                    <FinancesEvent financesData={financesData} />
                                </TabPanel>
                                <TabPanel>
                                    <AdditionalInfoEvent additionalData={additionalData} categories={categories} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={handleSubmit} isLoading={loading}>
                            Save and Approved
                        </Button>
                        <Button onClick={onClose} colorScheme='red'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ EventReducer }) => ({
    events: EventReducer.events,
    loading: EventReducer.loading,
});

export default connect(mapStateToProps)(GlobalViewEvent);
