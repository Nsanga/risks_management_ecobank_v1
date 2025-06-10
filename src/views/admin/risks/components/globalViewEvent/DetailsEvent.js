import { Flex, Input, Text, Textarea, Box, Checkbox, Grid, GridItem, Button } from '@chakra-ui/react';
import Select from 'react-select';
import { FaFilePdf, FaFileWord, FaFileAlt, FaFileImage, FaFile } from 'react-icons/fa';
import React from 'react';

const DetailsEvent = (
    {
        detailsData
    }
) => {

    const renderDocumentPreview = (document) => {
        const isImage = document.match(/\.(jpeg|jpg|gif|png)$/i);
        const isVideo = document.match(/\.(mp4|webm|ogg)$/i);
        const isPDF = document.match(/\.pdf$/i);

        if (isImage) {
            return <img src={document} alt="Aperçu du document" style={{ maxWidth: '100px', maxHeight: '100px' }} />;
        } else if (isVideo) {
            return (
                <video width="100" height="100" controls>
                    <source src={document} type="video/mp4" />
                    <source src={document} type="video/webm" />
                    <source src={document} type="video/ogg" />
                    Votre navigateur ne supporte pas la balise vidéo.
                </video>
            );
        } else if (isPDF) {
            return (
                <iframe
                    src={document}
                    title="Aperçu du document PDF"
                    style={{ width: '100px', height: '100px' }}
                />
            );
        } else {
            return (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <FaFile size={50} style={{ marginBottom: '10px' }} />
                    <Box>{document.split('/').pop()}</Box>
                </Box>
            );
        }
    };

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Les mois sont de 0 à 11
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Format YYYY-MM-DD
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    const currentDate = getCurrentDate();

    const recordedName = localStorage.getItem('username');

    console.log('=======', detailsData)

    return (
        <Box>
            <Flex flexDirection='column' gap={4}>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={6} alignItems="center">
                        <Text fontSize={12}>Date de l’événement:</Text>
                        <Box width={200}>
                            <Text color='blue' fontSize={12}>{detailsData.event_date}</Text>
                        </Box>
                    </Flex>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>RAG:</Text>
                        <Box width={200}>
                            <Text color='blue' fontSize={12}>{detailsData.RAG}</Text>
                        </Box>
                    </Flex>
                    <Flex width={155}>
                        <Checkbox size='sm' isChecked={detailsData.activeEvent} readOnly>Active Event</Checkbox>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>Heure de l’événement:</Text>
                        <Box width={200}>
                            <Text color='blue' fontSize={12}>{detailsData.event_time}</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>Enregistré par:</Text>
                        <Text color='blue' fontSize={12}>{recordedName}</Text>
                    </Flex>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>le:</Text>
                        <Text color='blue' fontSize={12}>{currentDate}</Text>
                    </Flex>
                    <Flex width={155}>
                        <Checkbox size='sm' isChecked={detailsData.excludeFundLosses} readOnly>Exclure les pertes de fonds</Checkbox>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Checkbox size='sm' isChecked={detailsData.externalEvent} readOnly>Événement externe</Checkbox>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>Réf externe:</Text>
                        <Box >
                            <Text color='blue' fontSize={12}>{detailsData.externalRef}</Text>
                        </Box>
                    </Flex>
                    <Flex width={155}>
                        <Checkbox size='sm' isChecked={detailsData.notify} readOnly>Notifier</Checkbox>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between'>
                    <Box p={5} shadow='md' borderWidth='1px' width='49%'>
                        <Box bg='blue.400' color='#FFF' mb={6} padding={2}>
                            Zone de détection
                        </Box>
                        <Flex flexDirection='column' gap={4}>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Entité:</Text>
                                <Box width={200}>
                                    <Text color='blue' fontSize={12}>{detailsData.entityOfDetection}</Text>
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Sous-entité:</Text>
                                <Box width={200}>
                                    <Text color='blue' fontSize={12}>{detailsData.subentityOfDetection}</Text>
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Date de détection:</Text>
                                <Box width={200}>
                                    <Text color='blue' fontSize={12}>{detailsData.detection_date}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box p={5} shadow='md' borderWidth='1px' width='49%'>
                        <Box bg='blue.400' color='#FFF' mb={6} padding={2}>
                            Zone d’origine
                        </Box>
                        <Flex flexDirection='column' gap={4}>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Entité:</Text>
                                <Box width={200}>
                                    <Text color='blue' fontSize={12}>{detailsData.entityOfOrigin}</Text>
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Sous-entité:</Text>
                                <Box width={200}>
                                    <Text color='blue' fontSize={12}>{detailsData.subentityOfOrigin}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
                <Box pt={5} pb={5}>
                    <Box bg='blue.400' color='#FFF' mb={6} padding={2}>
                        Description
                    </Box>
                    <Text color='blue' fontSize={12}>{detailsData.description}</Text>
                </Box>
                <Box p={5} shadow='md' borderWidth='1px'>
                    <Box bg='blue.400' color='#FFF' mb={6} padding={2}>
                        Description détaillée
                    </Box>
                    <Text color='blue' fontSize={12}>{detailsData.descriptionDetailled}</Text>
                </Box>
                <Flex justifyContent='space-between' pt={5}>
                    <Flex flexDirection='column' gap={2}>
                        <Flex gap={12} alignItems="center">
                            <Text fontSize={12}>Date d’approbation:</Text>
                            <Box width={200} marginLeft={1}>
                                <Text color='blue' fontSize={12}>{detailsData.approved_date}</Text>
                            </Box>
                        </Flex>
                        <Flex gap={14} alignItems="center">
                            <Text fontSize={12}>Date de clôture:</Text>
                            <Box width={200} marginLeft={3}>
                                <Text color='blue' fontSize={12}>{detailsData.closed_date}</Text>
                            </Box>
                        </Flex>
                        <Flex gap={6} alignItems="center">
                            <Text fontSize={12}>Date cible de clôture:</Text>
                            <Box width={200}>
                                <Text color='blue' fontSize={12}>{detailsData.targetClosureDate}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex flexDirection='column' gap={2}>
                        <Flex gap={14} alignItems="center">
                            <Text fontSize={12}>Propriétaire:</Text>
                            <Box width={200} marginLeft={1}>
                                <Text color='blue' fontSize={12}>{detailsData.owner}</Text>
                            </Box>
                        </Flex>
                        <Flex gap={10} alignItems="center">
                            <Text fontSize={12}>Désigné:</Text>
                            <Box width={200} marginLeft={1}>
                                <Text color='blue' fontSize={12}>{detailsData.nominee}</Text>
                            </Box>
                        </Flex>
                        <Flex gap={10} alignItems="center">
                            <Text fontSize={12}>Réviseur:</Text>
                            <Box width={200} marginLeft={1}>
                                <Text color='blue' fontSize={12}>{detailsData.reviewer}</Text>
                            </Box>
                        </Flex>
                        <Flex gap={6} alignItems="center">
                            <Text fontSize={12}>Date de révision:</Text>
                            <Box width={200}>
                                <Text color='blue' fontSize={12}>{detailsData.reviewer_date}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Box mt={8}>
                <GridItem colSpan={1}>
                    <Text fontWeight="bold" fontSize={12}>Document(s) importée(s) :</Text>
                </GridItem>
                <Box mt={4}>
                    <Flex justifyContent='center' gap={2}>
                        {detailsData.documents && detailsData.documents.length > 0 ? (
                            detailsData.documents.map((document, index) => (
                                <Box key={index} p={2} borderWidth="1px" borderRadius="md">
                                    <a href={document} target="_blank" rel="noopener noreferrer">
                                        {renderDocumentPreview(document)}
                                    </a>
                                </Box>
                            ))
                        ) : (
                            <Text>Aucun document téléchargé.</Text>
                        )}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}

export default DetailsEvent;
