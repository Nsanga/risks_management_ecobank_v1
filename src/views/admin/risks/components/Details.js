import { Flex, Input, Text, Textarea, Box, Checkbox, Grid, GridItem, Button } from '@chakra-ui/react';
import Select from 'react-select';
import { FaFilePdf, FaFileWord, FaFileAlt, FaFileImage } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import DocumentUploader from './DocumentUploader';
import Profiles from '../profiles';
import Entity from '../entity';
import RAG from '../RAG';
import entityAreaOfOrigin from '../entityOfOrigin';
import moment from 'moment';

const Details = ({ event, onDetailsChange }) => {
    const [options, setOptions] = useState([]);
    const [entityofdetection, setEntityofdetection] = useState([]);
    const [entityOfOrigin, setEntityOfOrigin] = useState([]);
    const [rag, setRag] = useState([]);

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Les mois sont de 0 à 11
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Format 
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    function getCurrentTime() {
        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        // Format HH:MM
        const formattedTime = `${hours}:${minutes}`;

        return formattedTime;
    }
    // console.log('>>>>>>>>>>>>>>', event.details.RAG)

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
        entityOfDetection: '',
        subentityOfDetection: '',
        detection_date: '',
        entityOfOrigin: '',
        subentityOfOrigin: '',
        description: '',
        descriptionDetailled: '',
        approved_date: '',
        closed_date: '',
        targetClosureDate: '',
        owner: '',
        nominee: '',
        reviewer: '',
        reviewer_date: '',
        documents: [],
    });

    useEffect(() => {
        const loadOptions = async () => {
            const formattedOptions = Profiles.map(user => ({
                value: user.email,
                label: user.name
            }));
            setOptions(formattedOptions);
        };

        const loadEntityOfDetection = async () => {
            const formattedEntities = Entity.map(entityofdetection => ({
                value: entityofdetection.name,
                label: entityofdetection.name
            }));
            setEntityofdetection(formattedEntities);
        };

        const loadEntityOfOrigin = async () => {
            const formattedEntityOfOrigin = entityAreaOfOrigin.map(entityoforigin => ({
                value: entityoforigin.name,
                label: entityoforigin.name
            }));
            setEntityOfOrigin(formattedEntityOfOrigin);
        };

        const loadRag = async () => {
            const formattedRag = RAG.map(rag => ({
                value: rag.name,
                label: rag.name
            }));
            setRag(formattedRag);
        };

        loadOptions();
        loadEntityOfDetection();
        loadEntityOfOrigin();
        loadRag();
    }, []);

    useEffect(() => {
        if (event) {
            setFormData({
                event_date: event.details.event_date || getCurrentDate(),
                RAG: event.details.RAG || '',
                activeEvent: event.details.activeEvent || false,
                event_time: event.details.event_time || getCurrentTime(),
                excludeFundLosses: event.details.excludeFundLosses || false,
                externalEvent: event.details.externalEvent || false,
                recorded_by: event.details.recorded_by || '',
                recorded_date: event.details.recorded_date || '',
                externalRef: event.details.externalRef || '',
                notify: event.details.notify || false,
                entityOfDetection: event.details.entityOfDetection || '',
                subentityOfDetection: event.details.subentityOfDetection || '',
                detection_date: event.details.detection_date || '',
                entityOfOrigin: event.details.entityOfOrigin || '',
                subentityOfOrigin: event.details.subentityOfOrigin || '',
                description: event.details.description || '',
                descriptionDetailled: event.details.descriptionDetailled || '',
                approved_date: event.details.approved_date || '',
                closed_date: event.details.closed_date || '',
                targetClosureDate: event.details.targetClosureDate || '',
                owner: event.details.owner || '',
                nominee: event.details.nominee || '',
                reviewer: event.details.reviewer || '',
                reviewer_date: event.details.reviewer_date || '',
                documents: [],
            });
        }
    }, [event]);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: '14px'
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '14px'
        }),
        option: (provided) => ({
            ...provided,
            fontSize: '14px'
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '14px'
        })
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
            const updatedDocuments = [...prevData.documents, ...newLinks];
            const newData = { ...prevData, documents: updatedDocuments };
            onDetailsChange(newData); // Notify parent about changes
            return newData;
        });
    };

    const recordedName = localStorage.getItem('username');

    const handleSubmit = () => {
        console.log('Payload:', formData);
    };

    return (
        <Box>
            <Box pt={5} pb={5}>
                <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                    Description <span style={{ color: 'red' }}>*</span>
                </Box>
                <Input placeholder='Event description' size='sm' value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
            </Box>
            <Box pt={5} pb={5}>
                <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                    Detailed Description
                </Box>
                <Textarea placeholder='Description détaillée' size='sm' value={formData.descriptionDetailled} onChange={(e) => handleInputChange('descriptionDetailled', e.target.value)} />
            </Box>
            <Flex flexDirection='column' gap={4}>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={6} alignItems="center">
                        <Text fontSize={14}>Event Date :</Text>
                        <Box width={200}>
                            <Input placeholder='Select Date' size='sm' type='texte' value={moment(formData.event_date).format('DD-MM-YYYY')} isReadOnly />
                        </Box>
                    </Flex>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={14}>RAG :</Text>
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
                        <Text fontSize={14}>Event Time :</Text>
                        <Box width={200}>
                            <Input placeholder='Select Date and Time' size='sm' type='text' value={formData.event_time} readOnly />
                        </Box>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={14}>Recorded by :</Text>
                        <Text color='blue' fontSize={14}>{recordedName}</Text>
                    </Flex>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={14}>On :</Text>
                        <Text color='blue' fontSize={14}>{moment(formData.reviewer_date).format('DD-MM-YYYY')}</Text>
                    </Flex>
                    <Flex width={155}>
                        <Checkbox size='sm' isChecked={formData.excludeFundLosses} onChange={(e) => handleInputChange('excludeFundLosses', e.target.checked)}>Exclude Fund Losses</Checkbox>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Checkbox size='sm' isChecked={formData.externalEvent} onChange={(e) => handleInputChange('externalEvent', e.target.checked)}>External Event</Checkbox>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={14}>External Ref :</Text>
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
                                <Text fontSize={14}>Entity : <span style={{ color: 'red' }}>*</span></Text>
                                <Box width={200}>
                                    <Select
                                        options={entityofdetection} 
                                        styles={customStyles}
                                        placeholder='Select Entity'
                                        value={entityofdetection.find(ent => ent.value === formData.entityOfDetection)}
                                        onChange={(selectedOption) => handleInputChange('entityOfDetection', selectedOption ? selectedOption.value : '')}
                                    />
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={14}>Sub Entity :</Text>
                                <Box width={200}>
                                    <Input placeholder='' size='sm' type='text' value={formData.subentityOfDetection} onChange={(e) => handleInputChange('subentityOfDetection', e.target.value)} />
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={14}>Detection Date :</Text>
                                <Box width={200}>
                                    <Input
                                        placeholder='Select Date'
                                        size='sm' type='date'
                                        value={moment(formData.detection_date, 'DD-MM-YYYY').format('YYYY-MM-DD')}
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
                                <Text fontSize={14}>Entity : <span style={{ color: 'red' }}>*</span></Text>
                                <Box width={200}>
                                    <Select
                                        options={entityOfOrigin}
                                        styles={customStyles}
                                        placeholder='Select Entity'
                                        value={entityOfOrigin.find(ent => ent.value === formData.entityOfOrigin)}
                                        onChange={(selectedOption) => handleInputChange('entityOfOrigin', selectedOption ? selectedOption.value : '')}
                                    />
                                </Box>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems="center">
                                <Text fontSize={14}>Sub Entity :</Text>
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
                            <Text fontSize={14}>Approved  :</Text>
                            <Box width={200} >
                                <Input
                                    placeholder='Select Date'
                                    size='sm' type='date'
                                    value={moment(formData.approved_date, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                                    onChange={(e) => handleInputChange('approved_date', e.target.value)} />
                            </Box>
                        </Flex>
                        <Flex gap={14} alignItems="center">
                            <Text fontSize={14}>Closed Date :</Text>
                            <Box width={200} marginLeft={3}>
                                <Input
                                    placeholder='Select Date'
                                    size='sm' type='date'
                                    value={moment(formData.closed_date, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                                    onChange={(e) => handleInputChange('closed_date', e.target.value)} />
                            </Box>
                        </Flex>
                        <Flex gap={6} alignItems="center">
                            <Text fontSize={14}>Target Closure Date :</Text>
                            <Box width={200}>
                                <Input
                                    placeholder='Select Date'
                                    size='sm' type='date'
                                    value={moment(formData.targetClosureDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                                    onChange={(e) => handleInputChange('targetClosureDate', e.target.value)} />
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex flexDirection='column' gap={2}>
                        <Flex gap={10} alignItems="center">
                            <Text fontSize={14}>Owner : <span style={{ color: 'red' }}>*</span></Text>
                            <Box width={200} marginLeft={1}>
                                <Select
                                    options={options}
                                    styles={customStyles}
                                    placeholder='Select owner'
                                    value={options.find(o => o.value === formData.owner)}
                                    onChange={(selectedOption) => handleInputChange('owner', selectedOption ? selectedOption.value : '')}
                                />
                            </Box>
                        </Flex>
                        <Flex gap={8} alignItems="center">
                            <Text fontSize={14}>Nominee : <span style={{ color: 'red' }}>*</span></Text>
                            <Box width={200} >
                                <Select
                                    options={options}
                                    styles={customStyles}
                                    placeholder='Select nominee'
                                    value={options.find(o => o.value === formData.nominee)}
                                    onChange={(selectedOption) => handleInputChange('nominee', selectedOption ? selectedOption.value : '')}
                                />
                            </Box>
                        </Flex>
                        <Flex gap={10} alignItems="center">
                            <Text fontSize={14}>Reviewer :</Text>
                            <Box width={200} marginLeft={1}>
                                <Input size='sm' type='text' value={formData.reviewer} onChange={(e) => handleInputChange('reviewer', e.target.value)} />
                            </Box>
                        </Flex>
                        <Flex gap={6} alignItems="center">
                            <Text fontSize={14}>Reviewer Date :</Text>
                            <Box width={200}>
                                <Input
                                    placeholder='Select Date'
                                    size='sm' type='date'
                                    value={moment(formData.reviewer_date, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                                    onChange={(e) => handleInputChange('reviewer_date', e.target.value)} />
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Box mt={8}>
                <GridItem colSpan={1}>
                    <Text fontWeight="bold" fontSize={14}>Documents<span style={{ fontStyle: 'italic' }}> (Importer vos documents dans l'espace ci-dessous)</span></Text>
                </GridItem>
                <Box mt={4}>
                    <DocumentUploader onMediaUpload={handleUploadLinks} />
                </Box>
            </Box>
        </Box>
    );
}

export default Details;