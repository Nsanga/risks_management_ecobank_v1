import Card from 'components/card/Card'
import React, { useRef, useState } from 'react'
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
import { DeleteIcon } from '@chakra-ui/icons'
import AddEventForm from '../risks/components/AddEventForm'
import { FaEnvelope } from 'react-icons/fa6'
import jsPDF from 'jspdf'
import html2canvas from "html2canvas";

const generatePDF = async () => {
    const headElement = document.getElementById('head-component'); // Assume the Head component has an ID

    const canvas = await html2canvas(headElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);

    const pdfBlob = pdf.output('blob');
    return pdfBlob;
};

const Event = () => {
    const [loader, setLoader] = useState(false);
    const location = useLocation();
    const event = location.state?.event;
    const loading = location.state?.loading;
    const iframeRef = useRef(null);
    console.log('evttttt:::', event.details)

    if (!event) {
        return <Text>Cet évènement n'existe pas.</Text>;
    }

    const uploadPDF = async (pdfBlob) => {
        const formData = new FormData();
        formData.append('files', pdfBlob, 'event-head.pdf');

        const response = await fetch('http://localhost:4500/api/v1/upload/files', {
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



    return (
        <Card mt="100px">
            {
                loading ? (
                    <Flex alignItems='center' justifyContent='center'>
                        <Image src={Loader} alt="Loading..." height={50} width={50} />
                    </Flex>
                ) : (
                    <Flex direction='column' gap={6}>
                        <div id='head-component' style={{ display: 'flex', flexDirection: 'column', gap: 12 }} >
                            <Head
                                eventRef={`EVT${event.num_ref}`}
                                currentState={event.approved === true ? 'Approved' : 'Unapproved'}
                                currentLocks={<Icon as={MdInsertDriveFile} boxSize={6} />}
                                description={event.details.description}
                                totalLosses=' '
                                externalRef={event.details.externalRef}
                            />
                            <DetailsForm detailledDescription={event.details.descriptionDetailled} />
                            <LossesEntities
                                entityofDetection={event.details.entityOfDetection}
                                subEntityofDetection={event.details.subentityOfDetection}
                                entityofDOrigin={event.details.entityOfOrigin}
                                subEntityofOrigin={event.details.subentityOfOrigin}
                            />
                            <Commentary
                                eventDate={event.details.event_date}
                                rag={event.details.RAG}
                                activeEvent={event.details.activeEvent}
                                eventTime={event.details.event_time}
                                recordedBy={event.details.recorded_by}
                                dateRecording={event.createdAt}
                                timeRecording={event.createdAt}
                                excludeFundLosse={event.details.excludeFundLosses}
                                externalEvent={event.details.externalEvent}
                                notify={event.details.notify}
                                detectionDate={event.details.detection_date}
                            />
                            <Finances
                                approved={event.details.approved_date}
                                closed={event.details.closed_date}
                                targetClosure={event.details.targetClosureDate}
                                owner={event.details.owner}
                                nominee={event.details.nominee}
                                reviewer={event.details.reviewer}
                                reviewerDate={event.details.reviewer_date}
                            />
                        </div>
                        <Flex justifyContent='flex-end' gap={4}>
                            <Flex>
                                <Button leftIcon={<FaEnvelope />} variant='outline' colorScheme='red' onClick={handleEmailClick} isLoading={loader}>
                                    E-mail
                                </Button>
                            </Flex>
                            <Flex>
                                <Button leftIcon={<FaPrint />} variant='outline' colorScheme='teal' onClick={handlePrint}>Print</Button>
                            </Flex>
                            <Flex>
                                <Button leftIcon={<MdClose />} variant='outline' colorScheme='green'>Unapproved</Button>
                            </Flex>
                            <Flex>
                                <AddEventForm event={event} />
                            </Flex>
                            <Flex>
                                <Button leftIcon={<DeleteIcon />} variant='outline' colorScheme='red'>Delete</Button>
                            </Flex>

                        </Flex>
                    </Flex>
                )
            }
            <iframe ref={iframeRef} style={{ display: 'none' }} />
        </Card>
    )
}

export default Event
