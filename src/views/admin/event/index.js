import Card from 'components/card/Card'
import React, { useEffect, useRef, useState } from 'react'
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
} from '@chakra-ui/react'
import Head from './components/Head'
import { MdClose, MdInsertDriveFile } from 'react-icons/md'
import { useLocation } from 'react-router-dom';
import LossesEntities from './components/LossesEntities'
import Loader from '../../../assets/img/loader.gif'
import DetailsForm from './components/DetailsForm'
import Commentary from './components/commentary'
import Finances from './components/Financials'
import { FaPrint } from 'react-icons/fa'
import { ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import AddEventForm from '../risks/components/AddEventForm'
import { FaEnvelope } from 'react-icons/fa6'
import jsPDF from 'jspdf'
import html2canvas from "html2canvas";
import DeleteModal from './components/DeleteModal'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { connect, useDispatch } from 'react-redux'
import { listEntities } from 'redux/entitiy/action'
import { listProfiles } from 'redux/profile/action'
import { url } from 'urlLoader'
import moment from 'moment'

const generatePDF = async () => {
    const headElement = document.getElementById('head-component'); // Assume the Head component has an ID

    const canvas = await html2canvas(headElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);

    const pdfBlob = pdf.output('blob');
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
    const location = useLocation();
    const event = location.state?.event;
    const loading = location.state?.loading;
    const iframeRef = useRef(null);
    const history = useHistory();

    console.log('evttttt:::', event)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listEntities());
        dispatch(listProfiles());
    }, [dispatch]);

    if (!event) {
        return <Text>Cet évènement n'existe pas.</Text>;
    }

    const uploadPDF = async (pdfBlob) => {
        const formData = new FormData();
        formData.append('files', pdfBlob, 'event-head.pdf');

        const response = await fetch(`${url}/api/v1/upload/files`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.status === 200) {
            return result.data.downloadLinks[0];
        } else {
            throw new Error('Failed to upload PDF');
        }
    };

    const handleUnapprovedClick = () => {
        setIsEmailDisabled(true);
        setIsPrintDisabled(true);
        setIsUnapprovedDisabled(true);
        setIsDeleteDisabled(true);
        setIsAmendDisabled(false);
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
            console.error('Error generating or uploading PDF:', error);
            setLoader(false);
        }
    };

    const handlePrint = () => {
        const headContent = document.getElementById('head-component').innerHTML;
        const iframe = iframeRef.current.contentWindow;

        iframe.document.open();
        iframe.document.write(`
            <html>
                <head>
                    <style>
                        /* Include external CSS */
                        ${Array.from(document.styleSheets)
                .map(sheet => {
                    try {
                        return Array.from(sheet.cssRules)
                            .map(rule => rule.cssText)
                            .join('');
                    } catch (e) {
                        // Handle cross-origin restrictions
                        return '';
                    }
                })
                .join('')}
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

    const totalRow = event?.financials.find(f => f.name === 'Total');
    const name = event.details.reviewer?.name ? event.details.reviewer?.name : "";
    const surname = event.details.reviewer?.surname ? event.details.reviewer?.surname : "";

    return (
        <Card mt="100px">
            <ChakraLink as={ReactRouterLink} to='/admin/events' color='blue'>
                <Flex alignItems='center' mb={4}>
                    <ChevronLeftIcon />
                    Back to Events Page
                </Flex>
            </ChakraLink>
            {
                loading ? (
                    <Flex alignItems='center' justifyContent='center'>
                        <Image src={Loader} alt="Loading..." height={50} width={50} />
                    </Flex>
                ) : (
                    <>
                        {
                            !event ? (
                                <Flex alignItems='center' justifyContent='center'>
                                    <Text color='gray.500' fontSize='2xl'>This event do not exist.</Text>
                                </Flex>
                            ) : (
                                <Flex direction='column' gap={6}>
                                    <div id='head-component' style={{ display: 'flex', flexDirection: 'column', gap: 12 }} >
                                        <Head
                                            eventRef={`EVT${event.num_ref}`}
                                            currentState={event.approved === true ? 'Approved' : 'Unapproved'}
                                            currentLocks={<Icon as={MdInsertDriveFile} boxSize={6} />}
                                            description={event.details.description}
                                            totalLosses={totalRow?.values ? totalRow?.values[0] + totalRow?.values[1] + totalRow?.values[2] + totalRow?.values[3] : ''}
                                            devise={event?.details?.rate}
                                            externalRef={event.details.externalRef}
                                        />
                                        <DetailsForm detailledDescription={event.details.descriptionDetailled} />
                                        <LossesEntities
                                            entityofDetection={'ENT' + event.details.entityOfDetection.referenceId + ' ' + 'CAM - ' + event.details.entityOfDetection.description}
                                            subEntityofDetection={event.details.subentityOfDetection}
                                            entityofDOrigin={'ENT' + event.details.entityOfOrigin.referenceId + ' ' + 'CAM - ' + event.details.entityOfOrigin.description}
                                            subEntityofOrigin={event.details.subentityOfOrigin}
                                        />
                                        <Commentary
                                            eventDate={event.details?.event_date ? event.details?.event_date : ""}
                                            rag={event.details?.RAG}
                                            activeEvent={event.details?.activeEvent ? event.details?.activeEvent : ""}
                                            eventTime={event.details?.event_time ? event.details?.event_time : ""}
                                            recordedBy={event.details?.recorded_by ? event.details?.recorded_by : ""}
                                            dateRecording={event?.createdAt ? event?.createdAt : ""}
                                            timeRecording={event?.createdAt ? event?.createdAt : ""}
                                            excludeFundLosse={event.details.excludeFundLosses}
                                            externalEvent={event.details.externalEvent}
                                            notify={event.details.notify}
                                            detectionDate={event.details?.detection_date}
                                        />
                                        <Finances
                                            approved={event.details.approved_date}
                                            closed={event.details.closed_date}
                                            targetClosure={moment(event.details.targetClosureDate).format('DD/MM/YYYY')}
                                            owner={event.details.owner?.name ? event.details.owner?.name + ' ' + event.details.owner?.surname : ""}
                                            nominee={event.details.nominee?.name ? event.details.nominee?.name + ' ' + event.details.nominee?.surname : ""}
                                            reviewer={name + " " + surname}
                                            reviewerDate={event.details.reviewer_date}
                                        />
                                    </div>
                                    <Flex justifyContent='flex-end' gap={4}>
                                        <Flex>
                                            <Button leftIcon={<FaEnvelope />} variant='outline' colorScheme='red' onClick={handleEmailClick} isLoading={loader} isDisabled={isEmailDisabled}>
                                                E-mail
                                            </Button>
                                        </Flex>
                                        <Flex>
                                            <Button leftIcon={<FaPrint />} variant='outline' colorScheme='teal' onClick={handlePrint} isDisabled={isPrintDisabled}>Print</Button>
                                        </Flex>
                                        <Flex>
                                            <Button leftIcon={<MdClose />} variant='outline' colorScheme='green' onClick={handleUnapprovedClick} isDisabled={isUnapprovedDisabled}>Unapproved</Button>
                                        </Flex>
                                        <Flex>
                                            <AddEventForm event={event} entities={entities} profiles={profiles} isEdit={isEdit} isAmendDisabled={isAmendDisabled}/>
                                        </Flex>
                                        <Flex>
                                            <DeleteModal event={event} isDeleteDisabled={isDeleteDisabled}/>
                                        </Flex>

                                    </Flex>
                                </Flex>
                            )
                        }
                    </>

                )
            }
            <iframe ref={iframeRef} style={{ display: 'none' }} />
        </Card>
    )
}

const mapStateToProps = ({ EntityReducer, ProfileReducer }) => ({
    profiles: ProfileReducer.profiles,
    entities: EntityReducer.entities,
    loading: EntityReducer.loading,
});

export default connect(mapStateToProps)(Event);
