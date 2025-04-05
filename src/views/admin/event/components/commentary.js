import { Box, Checkbox, Flex, Text, Textarea } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

const Commentary = (
    {
        eventDate,
        rag,
        activeEvent,
        eventTime,
        recordedBy,
        dateRecording,
        timeRecording,
        excludeFundLosse,
        externalEvent,
        notify,
        detectionDate
    }
) => {
    return (
        <Flex flexDirection='column' gap={4} fontSize="12px">
            <Box p={5} shadow='md' borderWidth='1px'>
            <Flex justifyContent='space-between' alignItems="center">
                <Flex gap={6} alignItems="center">
                    <Text>Event Date:</Text>
                    <Box width={200}>
                        <Text style={{ color: 'blue', fontWeight: 'bold' }}>{moment(eventDate).format('DD/MM/YYYY')}</Text>
                    </Box>
                </Flex>
                <Flex gap={5} alignItems="center">
                    <Text>RAG:</Text>
                    <Box width={200}>
                        <Text style={{ color: 'blue', fontWeight: 'bold' }}>{rag}</Text>
                    </Box>
                </Flex>
                <Flex width={155}>
                    <Checkbox isChecked={activeEvent} readOnly><span style={{fontSize:"12px"}}>Active Event</span></Checkbox>
                </Flex>
            </Flex>
            <Flex justifyContent='space-between' alignItems="center">
                <Flex gap={5} alignItems="center">
                    <Text>Event Time:</Text>
                    <Box width={200}>
                        <Text style={{ color: 'blue', fontWeight: 'bold' }}>{eventTime}</Text>
                    </Box>
                </Flex>
            </Flex>
            <Flex justifyContent='space-between' alignItems="center">
                <Flex gap={5} alignItems="center">
                    <Text>Recorded by:</Text>
                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>{recordedBy}</Text>
                </Flex>
                <Flex gap={5} alignItems="center">
                    <Text>On:</Text>
                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>{moment(dateRecording).format('DD/MM/YYYY')} at {moment(timeRecording).format('HH:MM')}</Text>
                </Flex>
                <Flex width={155}>
                    <Checkbox isChecked={excludeFundLosse} readOnly><span style={{fontSize:"12px"}}>Exclude Fund Losses</span></Checkbox>
                </Flex>
            </Flex>
            <Flex justifyContent='space-between' alignItems="center">
                <Checkbox isChecked={externalEvent} readOnly><span style={{fontSize:"12px"}}>External Event</span></Checkbox>
                <Flex gap={5} alignItems="center">
                    <Text>Detection Date:</Text>
                    <Box >
                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>{detectionDate === null ? "" : moment(detectionDate).format('DD/MM/YYYY')}</Text>
                    </Box>
                </Flex>
                <Flex width={155}>
                    <Checkbox isChecked={notify} readOnly><span style={{fontSize:"12px"}}>Notify</span></Checkbox>
                </Flex>
            </Flex>
            </Box>
        </Flex>
    )
}

export default Commentary
