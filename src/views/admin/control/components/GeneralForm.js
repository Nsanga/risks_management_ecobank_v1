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
import Select from 'react-select';

const GeneralForm = ({ formData, handleSelectChange, profiles, handleChange }) => {
  // Déclaration des états locaux
  // const [controlRef, setControlRef] = useState('');
  // const [controlCategory, setControlCategory] = useState('');
  // const [description, setDescription] = useState('');
  // const [nominee, setNominee] = useState('');
  // const [reviewer, setReviewer] = useState('');
  // const [reviewDate, setReviewDate] = useState('');
  // const [frequency, setFrequency] = useState('');
  // const [lastOperator, setLastOperator] = useState('');
  // const [nextOperation, setNextOperation] = useState('');
  // const [keyControl, setKeyControl] = useState(false);
  // const [activeControl, setActiveControl] = useState(true);

  const profilesOptions = profiles
    ?.filter(profile => profile.activeUser)
    ?.map((profile, index) => ({
      key: `${profile._id}-${index}`, // Unicité assurée
      value: profile.email,
      label: `${profile.name} ${profile.surname}`,
    }));

  const frequencies = [
    { "id": 1, "label": "Daily" },
    { "id": 2, "label": "Weekly" },
    { "id": 3, "label": "Monthly" },
    { "id": 4, "label": "Quarterly" },
    { "id": 5, "label": "Semi-Annually" }
  ];

  const frequenciesOptions = frequencies.map((frequency) => ({
    value: frequency.label,
    label: frequency.label,
  }));

  const calculateRemindOnDate = (frequency) => {
    const today = new Date();
    let nextDate;

    if (frequency === "Daily") {
      nextDate = new Date(today.setDate(today.getDate() + 1));  // Add 1 day
    } else if (frequency === "Weekly") {
      nextDate = new Date(today.setDate(today.getDate() + 7));  // Add 7 days
    } else if (frequency === "Monthly") {
      nextDate = new Date(today.setMonth(today.getMonth() + 1));  // Add 1 month
    } else if (frequency === "Quarterly") {
      nextDate = new Date(today.setMonth(today.getMonth() + 3));  // Add 3 months
    } else if (frequency === "Semi-Annually") {
      nextDate = new Date(today.setMonth(today.getMonth() + 6));  // Add 6 months
    }

    return nextDate.toISOString().split("T")[0];  // Format date as YYYY-MM-DD
  };

  // General handler for frequency change
  const handleSelectChangeWithNext = (frequencyType, selectedOption) => {
    const frequency = selectedOption.value;
    const newNextDate = calculateRemindOnDate(frequency);

    handleChange({
      target: {
        name: frequencyType,
        value: frequency,
      }
    });

    handleChange({
      target: {
        name: frequencyType === 'frequency' ? 'nextOperation' : 'nextAssessment',
        value: newNextDate,
      }
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '12px'
    })
  };

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = () => {

    console.log('Payload:', formData);
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
              isChecked={formData.keyControl}
              onChange={handleChange}
            >
              <span style={{ fontSize: 12 }}>Key Control</span>
            </Checkbox>
            <Checkbox
              fontWeight="bold"
              mb={4}
              name="activeControl"
              isChecked={formData.activeControl}
              onChange={handleChange}
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
                name='controlRef'
                value={formData.controlRef}
                onChange={handleChange}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={10} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Control Category:</Text>
              <Input
                fontSize={12}
                type="text"
                name='controlCategory'
                value={formData.controlCategory}
                onChange={handleChange}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={14} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Description:</Text>
              <Textarea
                fontSize={12}
                name='description'
                value={formData.description}
                onChange={handleChange}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={16} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Nominee:</Text>
              <Box width="100%" >
                <Select
                  name="nominee"
                  placeholder='Select nominee'
                  styles={customStyles}
                  options={profilesOptions}
                  value={profilesOptions?.find(option => option.value === formData.nominee || null)}
                  onChange={(selectedOption) => handleSelectChange('nominee', selectedOption)}
                />
              </Box>
            </HStack>
          </FormControl>
          <FormControl mb={4}>
            <HStack spacing={16} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Reviewer:</Text>
              <Box width="100%" >
                <Select
                  name="reviewer"
                  placeholder='Select reviewer'
                  styles={customStyles}
                  options={profilesOptions}
                  value={profilesOptions?.find(option => option.value === formData.reviewer || null)}
                  onChange={(selectedOption) => handleSelectChange('reviewer', selectedOption)}
                />
              </Box>
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={14} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>Review Date:</Text>
              <Input
                fontSize={12}
                type="date"
                name='reviewDate'
                value={formData.reviewDate}
                onChange={handleChange}
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
                  <Box width="100%" >
                    <Select
                      name="frequency"
                      placeholder='Select frequency'
                      styles={customStyles}
                      options={frequenciesOptions}
                      value={frequenciesOptions?.find(option => option.value === formData.frequency)}
                      onChange={(selectedOption) => handleSelectChangeWithNext('frequency', selectedOption)}
                    />
                  </Box>
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={4} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Last Operation:</Text>
                  <Input
                    fontSize={12}
                    type="date"
                    name="lastOperation"
                    value={formData.lastOperation}
                    onChange={handleChange}
                  />
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={2} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Next Operation:</Text>
                  <Input
                    fontSize={12}
                    type="date"
                    name='nextOperation'
                    value={formData.nextOperation}
                    onChange={handleChange}
                    isReadOnly
                  />
                </HStack>
              </FormControl>
            </Flex>
          </Box>

          <Box flex="1" width={{ base: "100%", md: "100%" }} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
            <Text fontSize={12} fontWeight="bold" mb={4}>Assessment:</Text>
            <Flex direction="column">
              <FormControl mb={4}>
                <HStack spacing={8} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Frequency:</Text>
                  <Box width="100%" >
                    <Select
                      name="frequencyAssessment"
                      placeholder='Select frequency'
                      styles={customStyles}
                      options={frequenciesOptions}
                      value={frequenciesOptions?.find(option => option.value === formData.frequencyAssessment)}
                      onChange={(selectedOption) => handleSelectChangeWithNext('frequencyAssessment', selectedOption)}
                    />
                  </Box>
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={2} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>Next Assessment:</Text>
                  <Input
                    fontSize={12}
                    type="date"
                    name="nextAssessment"
                    value={formData.nextAssessment}
                    onChange={handleChange}
                    isReadOnly
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