import { Flex, Input, Text, Textarea, Box, Checkbox, Grid, GridItem, Button } from '@chakra-ui/react';
import Select from 'react-select';
import { FaFilePdf, FaFileWord, FaFileAlt, FaFileImage } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import DocumentUploader from './DocumentUploader';
import RAG from '../RAG';
import moment from 'moment';

const Details = ({ event, onDetailsChange, entities, profiles }) => {
    const [rag, setRag] = useState([]);

    function getCurrentTime() {
        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        // Format HH:MM
        const formattedTime = `${hours}:${minutes}`;

        return formattedTime;
    }

    const [formData, setFormData] = useState({
        event_date: '',
        RAG: '',
        activeEvent: false,
        event_time: getCurrentTime(),
        excludeFundLosses: false,
        externalEvent: false,
        recorded_by: '',
        recorded_date: '',
        externalRef: '',
        notify: false,
        entityOfDetection: null,
        subentityOfDetection: '',
        detection_date: '',
        entityOfOrigin: null,
        subentityOfOrigin: '',
        description: '',
        descriptionDetailled: '',
        approved_date: '',
        closed_date: '',
        targetClosureDate: '',
        owner: null,
        nominee: null,
        reviewer: null,
        reviewer_date: '',
        document: [],
    });

    const profilesOptions = profiles
        ?.filter(profile => profile.activeUser)
        ?.map((profile, index) => {
            // Vérification de la présence de name et surname
            const name = profile.name ? profile.name : "";
            const surname = profile.surname ? profile.surname : "";

            return {
                key: `${profile._id}-${index}`, // Unicité assurée
                value: profile.email,
                label: `${name} ${surname}`.trim(), // Concaténation des valeurs et suppression des espaces inutiles
            };
        });

    const entitiesOptions = entities?.map((entity, index) => ({
        key: `${entity._id}-${index}`, // Unicité assurée
        value: entity._id,
        label: `ENT${entity.referenceId} CAM - ${entity.description}`,
    }));

    const handleSelectChange = (name, selectedOption) => {
        setFormData(prevState => {
            const updatedFormData = {
                ...prevState,
                [name]: selectedOption ? selectedOption.value : null,
            };
            onDetailsChange(updatedFormData); // Notify parent about changes
            return updatedFormData;
        });
    };

    useEffect(() => {
        const loadRag = async () => {
            const formattedRag = RAG.map(rag => ({
                value: rag.name,
                label: rag.name
            }));
            setRag(formattedRag);
        };
        loadRag();
    }, []);

    useEffect(() => {
        if (event && event.details) {
            setFormData(prevState => ({
                ...prevState,
                event_date: moment(event.details.event_date).format('YYYY-MM-DD') || '',
                event_time: event.details.event_time || getCurrentTime(),
                detection_date: event.details.detection_date ? new Date(event.details.detection_date).toISOString().split('T')[0] : '',
                approved_date: event.details.approved_date ? new Date(event.details.approved_date).toISOString().split('T')[0] : '',
                closed_date: event.details.closed_date ? new Date(event.details.closed_date).toISOString().split('T')[0] : '',
                recorded_by: event.details.recorded_by || '',
                recorded_date: event.details.recorded_date || '',
                description: event.details.description || '',
                descriptionDetailled: event.details.descriptionDetailled || '',
                owner: event.details.owner ? `${event.details.owner?.name} ${event.details.owner?.surname}` : null,
                nominee: event.details.nominee ? `${event.details.nominee?.name} ${event.details.nominee?.surname}` : null,
                reviewer: event.details.reviewer ? `${event.details.reviewer?.name} ${event.details.reviewer?.surname}` : null,
                reviewer_date: event.details.reviewer_date ? new Date(event.details.reviewer_date).toISOString().split('T')[0] : '',
                activeEvent: event.details.activeEvent || false,
                excludeFundLosses: event.details.excludeFundLosses || false,
                notify: event.details.notify || false,
                externalEvent: event.details.externalEvent || false,
                externalRef: event.details.externalRef || '',
                entityOfDetection: event.details.entityOfDetection ? event.details.entityOfDetection._id : null, // Stocker l'ID
                subentityOfDetection: event.details.subentityOfDetection || '',
                entityOfOrigin: event.details.entityOfOrigin ? event.details.entityOfOrigin._id : null, // Stocker l'ID
                subentityOfOrigin: event.details.subentityOfOrigin || '',
                RAG: event.details.RAG || '',
                targetClosureDate: event.details.targetClosureDate || '',
                document: event.details.document || [],
            }));
        }
    }, [event]);


    useEffect(() => {
        // Initialiser la date du jour dans createdOn lors du montage du composant ou lorsque selectedEntity change
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        setFormData(prevValues => ({
            ...prevValues,
            event_date: prevValues.event_date || today,
            recorded_date: prevValues.recorded_date || today,
        }));
    }, [event]);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: '14px',
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '14px',
            maxHeight: '200px', // Définir la hauteur maximale du menu
            overflowY: 'auto', // Activer le défilement si le contenu dépasse la hauteur
        }),
        option: (provided) => ({
            ...provided,
            fontSize: '14px',
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '14px',
        }),
    };

    const handleInputChange = (field, value) => {
        setFormData(prevData => {
            const newData = { ...prevData, [field]: value };
            onDetailsChange(newData); // Notify parent about changes
            return newData;
        });
    };

    const handleUploadLinks = (newLinks) => {
        setFormData(prevData => {
            const updatedDocuments = [...prevData.document, ...newLinks];
            const newData = { ...prevData, document: updatedDocuments };
            onDetailsChange(newData); // Notify parent about changes
            return newData;
        });
    };

    const recordedName = localStorage.getItem('username');

    return (
        <Box>
            <Box pt={5} pb={5}>
                <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                    Description <span style={{ color: 'red' }}>*</span>
                </Box>
                <Input name='description' placeholder='Event description' size='sm' value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
            </Box>
            <Box pt={5} pb={5}>
                <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                    Detailed Description
                </Box>
                <Textarea name='descriptionDetailled' placeholder='Description détaillée' size='sm' value={formData.descriptionDetailled} onChange={(e) => handleInputChange('descriptionDetailled', e.target.value)} />
            </Box>
            <Flex flexDirection='column' gap={4}>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={6} alignItems="center">
                        <Text fontSize={12}>Event Date :</Text>
                        <Box width={200}>
                            <Input
                                placeholder='Select Date'
                                size='sm'
                                type='date'
                                value={formData.event_date}
                                onChange={(e) => handleInputChange('event_date', e.target.value)} />
                        </Box>
                    </Flex>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>RAG :</Text>
                        <Box width={200}>
                            <Select
                                options={rag}
                                styles={customStyles}
                                placeholder='Select RAG'
                                value={rag.find(r => r.value === formData.RAG)}
                                onChange={(selectedOption) => handleInputChange('RAG', selectedOption ? selectedOption.value : '')}
                            />
                        </Box>
                    </Flex>
                    <Flex width={155}>
                        <Checkbox size='sm' isChecked={formData.activeEvent} onChange={(e) => handleInputChange('activeEvent', e.target.checked)}>Active Event</Checkbox>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>Event Time :</Text>
                        <Box width={200}>
                            <Input placeholder='Select Date and Time' size='sm' type='text' value={formData.event_time} readOnly />
                        </Box>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>Recorded by :</Text>
                        <Text color='blue' fontSize={12}>{recordedName}</Text>
                    </Flex>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>On :</Text>
                        <Text color='blue' fontSize={12}>{moment(formData.recorded_date).format('DD/MM/YYYY')}</Text>
                    </Flex>
                    <Flex width={155}>
                        <Checkbox size='sm' isChecked={formData.excludeFundLosses} onChange={(e) => handleInputChange('excludeFundLosses', e.target.checked)}>Exclude Fund Losses</Checkbox>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Checkbox size='sm' isChecked={formData.externalEvent} onChange={(e) => handleInputChange('externalEvent', e.target.checked)}>External Event</Checkbox>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={12}>External Ref :</Text>
                        <Box >
                            <Input placeholder='External Ref' size='sm' type='text' value={formData.externalRef} onChange={(e) => handleInputChange('externalRef', e.target.value)} />
                        </Box>
                    </Flex>
                    <Flex width={155}>
                        <Checkbox size='sm' isChecked={formData.notify} onChange={(e) => handleInputChange('notify', e.target.checked)}>Notify</Checkbox>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between'>
                    <Box p={5} shadow='md' borderWidth='1px' width='49%'>
                        <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                            Area of Detection
                        </Box>
                        <Flex flexDirection='column' gap={4}>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Entity : <span style={{ color: 'red' }}>*</span></Text>
                                <Box width={200}>
                                    <Select
                                        options={entitiesOptions}
                                        styles={customStyles}
                                        placeholder='Select Entity'
                                        value={entitiesOptions?.find(ent => ent.value === formData.entityOfDetection)}
                                        onChange={(selectedOption) => handleSelectChange('entityOfDetection', selectedOption)}
                                    />
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Sub Entity :</Text>
                                <Box width={200}>
                                    <Input placeholder='' size='sm' type='text' value={formData.subentityOfDetection} onChange={(e) => handleInputChange('subentityOfDetection', e.target.value)} />
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Detection Date : <span style={{ color: 'red' }}>*</span></Text>
                                <Box width={200}>
                                    <Input
                                        placeholder='Select Date'
                                        size='sm' type='date'
                                        value={formData.detection_date}
                                        onChange={(e) => handleInputChange('detection_date', e.target.value)} />
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box p={5} shadow='md' borderWidth='1px' width='49%'>
                        <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                            Area of Origin
                        </Box>
                        <Flex flexDirection='column' gap={4}>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Entity : <span style={{ color: 'red' }}>*</span></Text>
                                <Box width={200}>
                                    <Select
                                        options={entitiesOptions}
                                        styles={customStyles}
                                        placeholder='Select Entity'
                                        value={entitiesOptions?.find(ent => ent.value === formData.entityOfOrigin)}
                                        onChange={(selectedOption) => handleSelectChange('entityOfOrigin', selectedOption)}
                                    />
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={12}>Sub Entity :</Text>
                                <Box width={200}>
                                    <Input placeholder='' size='sm' type='text' value={formData.subentityOfOrigin} onChange={(e) => handleInputChange('subentityOfOrigin', e.target.value)} />
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
                <Flex justifyContent='space-between' pt={5}>
                    <Flex flexDirection='column' gap={2}>
                        <Flex gap={20} alignItems="center">
                            <Text fontSize={12}>Approved  :</Text>
                            <Box width={200} >
                                <Input
                                    placeholder='Select Date'
                                    size='sm' type='date'
                                    value={formData.approved_date}
                                    onChange={(e) => handleInputChange('approved_date', e.target.value)} />
                            </Box>
                        </Flex>
                        <Flex gap={14} alignItems="center">
                            <Text fontSize={12}>Closed Date :</Text>
                            <Box width={200} marginLeft={3}>
                                <Input
                                    placeholder='Select Date'
                                    size='sm' type='date'
                                    value={formData.closed_date}
                                    onChange={(e) => handleInputChange('closed_date', e.target.value)} />
                            </Box>
                        </Flex>
                        <Flex gap={6} alignItems="center">
                            <Text fontSize={12}>Target Closure Date :</Text>
                            <Box width={200}>
                                <Input
                                    placeholder='Select Date'
                                    size='sm' type='date'
                                    value={formData.targetClosureDate}
                                    onChange={(e) => handleInputChange('targetClosureDate', e.target.value)} />
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex flexDirection='column' gap={2}>
                        <Flex gap={10} alignItems="center">
                            <Text fontSize={12}>Owner : <span style={{ color: 'red' }}>*</span></Text>
                            <Box width={200} marginLeft={1}>
                                <Select
                                    name="owner"
                                    placeholder='Select owner'
                                    options={profilesOptions}
                                    styles={customStyles}
                                    value={profilesOptions?.find(option => event ? option.label === formData.owner : option.value === formData.owner) || null} // Assurez-vous que la valeur est null si non trouvée
                                    onChange={(selectedOption) => handleSelectChange('owner', selectedOption)}
                                />
                            </Box>
                        </Flex>
                        <Flex gap={8} alignItems="center">
                            <Text fontSize={12}>Nominee : <span style={{ color: 'red' }}>*</span></Text>
                            <Box width={200} >
                                <Select
                                    name="nominee"
                                    placeholder='Select nominee'
                                    options={profilesOptions}
                                    styles={customStyles}
                                    value={profilesOptions?.find(option => event ? option.label === formData.nominee : option.value === formData.nominee)}
                                    onChange={(selectedOption) => handleSelectChange('nominee', selectedOption)}
                                />
                            </Box>
                        </Flex>
                        <Flex gap={10} alignItems="center">
                            <Text fontSize={12}>Reviewer :</Text>
                            <Box width={200} marginLeft={1}>
                                <Select
                                    name="reviewer"
                                    placeholder='Select reviewer'
                                    options={profilesOptions}
                                    styles={customStyles}
                                    value={profilesOptions?.find(option => event ? option.label === formData.reviewer : option.value === formData.reviewer)}
                                    onChange={(selectedOption) => handleSelectChange('reviewer', selectedOption)}
                                />
                            </Box>
                        </Flex>
                        <Flex gap={6} alignItems="center">
                            <Text fontSize={12}>Reviewer Date :</Text>
                            <Box width={200}>
                                <Input
                                    placeholder='Select Date'
                                    size='sm' type='date'
                                    value={formData.reviewer_date}
                                    onChange={(e) => handleInputChange('reviewer_date', e.target.value)} />
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Box mt={8}>
                <GridItem colSpan={1}>
                    <Text fontWeight="bold" fontSize={12}>Documents<span style={{ fontStyle: 'italic' }}> (Importer vos documents dans l'espace ci-dessous)</span></Text>
                </GridItem>
                <Box mt={4}>
                    <DocumentUploader onMediaUpload={handleUploadLinks} />
                </Box>
            </Box>
        </Box>
    );
}

export default Details;
