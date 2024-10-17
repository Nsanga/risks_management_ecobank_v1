import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Flex,
  Checkbox,
  FormControl,
  Input,
  Textarea,
  Text,
  FormLabel,
  HStack,
  Button
} from '@chakra-ui/react';
import { AddIcon, CheckCircleIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const GeneralForm = ({ handleSubmit }) => {
  // Déclaration des états locaux
  const [controlRef, setControlRef] = useState('');
  const [controlCategory, setControlCategory] = useState('');
  const [description, setDescription] = useState('');
  const [nominee, setNominee] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [reviewDate, setReviewDate] = useState('');
  const [frequency, setFrequency] = useState('');
  const [lastOperator, setLastOperator] = useState('');
  const [nextOperation, setNextOperation] = useState('');
  const [keyControl, setKeyControl] = useState(false);
  const [activeControl, setActiveControl] = useState(true);

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = () => {

    const payload = {
      controlRef,
      controlCategory,
      description,
      nominee,
      reviewer,
      reviewDate,
      frequency,
      lastOperator,
      nextOperation,
      keyControl,
      activeControl
    };

    console.log('Payload:', payload);
    // handleSubmit(payload); // Appeler handleSubmit avec le payload
  };

  return (
    <Box className="form-container" as="form">
      <SimpleGrid columns={2} spacing={10}>
        {/* Left section */}
        <Box bg="white" >
          <Flex justifyContent="space-between" mb={4}>
            <Checkbox
              fontWeight="bold"
              mb={4}
              name="keyControl"
              isChecked={keyControl}
              onChange={(e) => setKeyControl(e.target.checked)}
            >
              <span style={{ fontSize: 12 }}>Key Control</span>
            </Checkbox>
            <Checkbox
              fontWeight="bold"
              mb={4}
              name="activeControl"
              isChecked={activeControl}
              onChange={(e) => setActiveControl(e.target.checked)}
            >
              <span style={{ fontSize: 12 }}>Active Control</span>
            </Checkbox>
          </Flex>

          <FormControl mb={4}>
            <HStack spacing={2} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Control Library Reference:</Text>
              <Input
                fontSize={12}
                type="text"
                value={controlRef}
                onChange={(e) => setControlRef(e.target.value)}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={10} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Control Category:</Text>
              <Input
                fontSize={12}
                type="text"
                value={controlCategory}
                onChange={(e) => setControlCategory(e.target.value)}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={14} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Description:</Text>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={16} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Nominee:</Text>
              <Input
                fontSize={12}
                type="text"
                value={nominee}
                onChange={(e) => setNominee(e.target.value)}
              />
            </HStack>
          </FormControl>
          <FormControl mb={4}>
            <HStack spacing={16} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Reviewer:</Text>
              <Input
                fontSize={12}
                type="text"
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={14} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Review Date:</Text>
              <Input
                fontSize={12}
                type="date"
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
              />
            </HStack>
          </FormControl>
        </Box>

        {/* Right section */}
        <Box>
          <Box flex="1" width={{ base: "100%", md: "100%" }} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg" mb={8}>
            <Text fontSize={12} fontWeight="bold" mb={4}>Operation:</Text>
            <Flex direction="column">
              <FormControl mb={4}>
                <HStack spacing={6} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Frequency:</Text>
                  <Input
                    fontSize={12}
                    type="text"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={4} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Last Operator:</Text>
                  <Input
                    fontSize={12}
                    type="text"
                    value={lastOperator}
                    onChange={(e) => setLastOperator(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={2} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Next Operation:</Text>
                  <Input
                    fontSize={12}
                    type="text"
                    value={nextOperation}
                    onChange={(e) => setNextOperation(e.target.value)}
                  />
                </HStack>
              </FormControl>
            </Flex>
          </Box>

          <Box flex="1" width={{ base: "100%", md: "100%" }} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
            <Text fontSize={12} fontWeight="bold" mb={4}>Assessment:</Text>
            <Flex direction="column">
              <FormControl mb={4}>
                <HStack spacing={6} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Frequency:</Text>
                  <Input
                    fontSize={12}
                    type="text"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={2} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Next Assessment:</Text>
                  <Input
                    fontSize={12}
                    type="text"
                    value={lastOperator}
                    onChange={(e) => setLastOperator(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <Box>
              <Button fontSize={12} colorScheme="blue" variant="solid" >
                Sign Off/Add Next
              </Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      </SimpleGrid>
      <HStack spacing={4} mt={6} justify='center'>
        <Button fontSize={12} colorScheme="blue" variant="outline" leftIcon={<AddIcon />}>
          Add Control
        </Button>
        <Button fontSize={12} colorScheme="green" variant="outline" leftIcon={<EditIcon />}>
          Amend Control
        </Button>
        <Button fontSize={12} colorScheme="red" variant="outline" leftIcon={<DeleteIcon />}>
          Delete Control
        </Button>
        <Button fontSize={12} colorScheme="blue" variant="outline" leftIcon={<CheckCircleIcon />} onClick={handleFormSubmit}>
          Save
        </Button>
        <Button fontSize={12} colorScheme="red" variant="outline" leftIcon={<CloseIcon />}>
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default GeneralForm;
