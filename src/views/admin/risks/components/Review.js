import React from 'react';
import { Box, Flex, Text, Input, Textarea, Select, Checkbox } from '@chakra-ui/react';

const Review = ({ details }) => {
    return (
        <Box>
            <Flex flexDirection='column' gap={4}>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={6} alignItems="center">
                        <Text fontSize={14}>Event Date:</Text>
                        <Box width={200}>
                            <Input value={details.eventDate} size='md' type='date' readOnly />
                        </Box>
                    </Flex>
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={14}>RAG:</Text>
                        <Box width={200}>
                            <Select value={details.rag} size='md' readOnly>
                            </Select>
                        </Box>
                    </Flex>
                    <Flex width={155}>
                        <Checkbox isChecked={details.activeEvent} isReadOnly>Active Event</Checkbox>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={5} alignItems="center">
                        <Text fontSize={14}>Event Time:</Text>
                        <Box width={200}>
                            <Input value={details.eventTime} size='md' type='time' readOnly />
                        </Box>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between' alignItems="center">
                    <Flex gap={5} alignItems="center"></Flex>
                        <Checkbox isChecked={details.externalEvent} isReadOnly>External Event</Checkbox>
                        <Flex gap={5} alignItems="center">
                            <Text>External Ref:</Text>
                            <Box>
                                <Input value={details.externalRef} size='md' type='text' readOnly />
                            </Box>
                        </Flex>
                        <Flex width={155}>
                            <Checkbox isChecked={details.notify} isReadOnly>Notify</Checkbox>
                        </Flex>
                    </Flex>
                    <Flex justifyContent='space-between'>
                        <Box p={5} shadow='md' borderWidth='1px' width='49%'>
                            <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                                Area of Detection
                            </Box>
                            <Flex flexDirection='column' gap={4}>
                                <Flex justifyContent='space-between' alignItems="center">
                                    <Text>Entity:</Text>
                                    <Box width={200}>
                                        <Select value={details.detectionEntity} size='md' readOnly>
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                        </Select>
                                    </Box>
                                </Flex>
                                <Flex justifyContent='space-between' alignItems="center">
                                    <Text>Sub Entity:</Text>
                                    <Box width={200}>
                                        <Input value={details.detectionSubEntity} size='md' type='text' readOnly />
                                    </Box>
                                </Flex>
                                <Flex justifyContent='space-between' alignItems="center">
                                    <Text>Detection Date:</Text>
                                    <Box width={200}>
                                        <Input value={details.detectionDate} size='md' type='date' readOnly />
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
                                    <Text>Entity:</Text>
                                    <Box width={200}>
                                        <Select value={details.originEntity} size='md' readOnly>
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                        </Select>
                                    </Box>
                                </Flex>
                                <Flex justifyContent='space-between' alignItems="center">
                                    <Text>Sub Entity:</Text>
                                    <Box width={200}>
                                        <Input value={details.originSubEntity} size='md' type='text' readOnly />
                                    </Box>
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>
                    <Box pt={5} pb={5}>
                        <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                            Description
                        </Box>
                        <Input value={details.description} readOnly />
                    </Box>
                    <Box p={5} shadow='md' borderWidth='1px'>
                        <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                            Detailed Description
                        </Box>
                        <Textarea value={details.detailedDescription} readOnly />
                    </Box>
                    <Flex justifyContent='space-between' pt={5}>
                        <Flex flexDirection='column' gap={2}>
                            <Flex gap={14} alignItems="center">
                                <Text>Approved Date:</Text>
                                <Box width={200}>
                                    <Input value={details.approvedDate} size='md' type='date' readOnly />
                                </Box>
                            </Flex>
                            <Flex gap={16} alignItems="center">
                                <Text>Closed Date:</Text>
                                <Box width={200} marginLeft={3}>
                                    <Input value={details.closedDate} size='md' type='date' readOnly />
                                </Box>
                            </Flex>
                            <Flex gap={6} alignItems="center">
                                <Text>Target Closure Date:</Text>
                                <Box width={200}>
                                    <Input value={details.targetClosureDate} size='md' type='date' readOnly />
                                </Box>
                            </Flex>
                        </Flex>
                        <Flex flexDirection='column' gap={2}>
                            <Flex gap={14} alignItems="center">
                                <Text>Owner:</Text>
                                <Box width={200} marginLeft={1}>
                                    <Input value={details.owner} size='md' type='text' readOnly />
                                </Box>
                            </Flex>
                            <Flex gap={10} alignItems="center">
                                <Text>Nominee:</Text>
                                <Box width={200} marginLeft={1}>
                                    <Input value={details.nominee} size='md' type='text' readOnly />
                                </Box>
                            </Flex>
                            <Flex gap={10} alignItems="center">
                                <Text>Reviewer:</Text>
                                <Box width={200} marginLeft={1}>
                                    <Input value={details.reviewer} size='md' type='text' readOnly />
                                </Box>
                            </Flex>
                            <Flex gap={6} alignItems="center">
                                <Text>Review Date:</Text>
                                <Box width={200}>
                                    <Input value={details.reviewDate} size='md' type='date' readOnly />
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Box pt={5} pb={5}>
                        <Box bg='green.400' color='#FFF' mb={6} padding={2}>
                            Uploaded Files
                        </Box>
                        <Box>
                            {details.uploadedFiles && details.uploadedFiles.length > 0 ? (
                                details.uploadedFiles.map((file, index) => (
                                    <Box key={index} mb={2}>
                                        {file.name}
                                    </Box>
                                ))
                            ) : (
                                <Text>No files uploaded.</Text>
                            )}
                        </Box>
                    </Box>
                </Flex>
        </Box>
    );
};

export default Review;
