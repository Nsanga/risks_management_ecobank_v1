import { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  Text,
  HStack,
  Input,
  Checkbox,
  Textarea,
  Select,
  Button,
  VStack
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  CheckIcon,
  CloseIcon,
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons';

function RiskForm() {
  // State for form inputs
  const [owner, setOwner] = useState('');
  const [ownerEmailChecked, setOwnerEmailChecked] = useState(false);
  const [nominee, setNominee] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [activeRisk, setActiveRisk] = useState(false);
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [remindOne, setRemindOne] = useState('');

  // Handle form submission
  const handleSave = () => {
    const payload = {
      owner,
      ownerEmailChecked,
      nominee,
      reviewer,
      activeRisk,
      description,
      frequency,
      remindOne,
    };

    console.log('Form Payload:', payload);
    // Here, you can also add logic to submit the payload to an API or service
  };

  return (
    <Box>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start" p={4}>
        {/* Left Column */}
        <Box width={{ base: "100%", md: "40%" }}>
          <FormControl>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Owner: </Text>
              <Input fontSize={12} value={owner} onChange={(e) => setOwner(e.target.value)} />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Nominee: </Text>
              <Input fontSize={12} value={nominee} onChange={(e) => setNominee(e.target.value)} />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Reviewer: </Text>
              <Input fontSize={12} value={reviewer} onChange={(e) => setReviewer(e.target.value)} />
            </HStack>
          </FormControl>

          <FormControl mt={4} display="flex" alignItems="center" >
            <Checkbox
              isChecked={activeRisk}
              onChange={(e) => setActiveRisk(e.target.checked)}
              fontWeight="bold"
              mb={2}
            >
              <span style={{fontSize:12}}>Active Risk</span>
            </Checkbox>
          </FormControl>
        </Box>

        <Box width={{ base: "100%", md: "40%" }} textAlign="center">
          <Checkbox
            size="sm"
            fontWeight="bold"
            mb={2}
            isChecked={ownerEmailChecked}
            onChange={(e) => setOwnerEmailChecked(e.target.checked)}
          >
            <span style={{fontSize:12}}>Owner Email</span>
          </Checkbox>
        </Box>

        {/* Right Column with shadow and buttons */}
        <Box width={{ base: "100%", md: "40%" }} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
          <FormControl>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Frequency: </Text>
              <Select value={frequency} onChange={(e) => setFrequency(e.target.value)} fontSize={12}>
                <option value="" >Select Frequency</option>
                <option value="Daily" >Daily</option>
                <option value="Weekly" >Weekly</option>
                <option value="Monthly" >Monthly</option>
              </Select>
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Remind One: </Text>
              <Input fontSize={12} type="date" value={remindOne} onChange={(e) => setRemindOne(e.target.value)} />
            </HStack>
          </FormControl>

          {/* Buttons in Right Column */}
          <Flex justifyContent="flex-end" mt={6}>
            <Button fontSize={12}
              colorScheme="blue"
              variant="solid"
              width="auto"
              minWidth="120px"
              onClick={handleSave}
            >
              Sign Off/add next
            </Button>
          </Flex>
        </Box>
      </Flex>

      <FormControl mt={4}>
        <Text fontWeight="bold" fontSize={12} mb={2}>Description: </Text>
        <Textarea fontSize={12} value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>

      {/* Buttons Section */}
      <HStack spacing={4} mt={6} justify='center'>
        <Button fontSize={12} colorScheme="blue" variant="outline" leftIcon={<ArrowBackIcon />}>
          Home
        </Button>
        <Button fontSize={12} colorScheme="green" variant="outline" leftIcon={<CheckIcon />} onClick={handleSave}>
          Approve
        </Button>
        <Button fontSize={12} colorScheme="yellow" variant="outline" leftIcon={<CloseIcon />}>
          Unapprove
        </Button>
        <Button fontSize={12} colorScheme="teal" variant="outline" leftIcon={<EditIcon />} onClick={handleSave}>
          Save
        </Button>
        <Button fontSize={12} colorScheme="teal" variant="outline" leftIcon={<EditIcon />}>
          Amend
        </Button>
        <Button fontSize={12} colorScheme="red" variant="outline" leftIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button fontSize={12} colorScheme="red" variant="outline" leftIcon={<CheckIcon />} onClick={handleSave}>
          Save and Approve
        </Button>
      </HStack>
    </Box>
  );
}

export default RiskForm;
