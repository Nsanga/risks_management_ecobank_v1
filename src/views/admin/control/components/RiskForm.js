import {
  Box,
  Flex,
  FormControl,
  Text,
  HStack,
  Input,
  Checkbox,
  Textarea,
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
import Select from 'react-select';
import { connect, useDispatch } from 'react-redux';
import { updateEntityRiskControl } from 'redux/entityRiskControl/action';
import { useEffect, useState } from 'react';
import { listEntityRiskControls } from 'redux/entityRiskControl/action';

function RiskForm({ riskFormData, handleSelectChange, profiles, handleChange, onClose, selectedRisk, handleTestControlClick, selectedEntityDescription }) {
  const dispatch = useDispatch();
  const [ownerValue, setOwnerValue] = useState(null);
  const [nomineeValue, setNomineeValue] = useState(null);
  const [reviewerValue, setReviewerValue] = useState(null);

  const profilesOptions = profiles
    ?.filter(profile => profile.activeUser)
    ?.map((profile, index) => {
      // Vérification de la présence de name et surname
      const name = profile.name ? profile.name : "";
      const surname = profile.surname ? profile.surname : "";

      return {
          key: `${profile._id}-${index}`, // Unicité assurée
          value: `${name} ${surname}`.trim(),
          label: `${name} ${surname}`.trim(), // Concaténation des valeurs et suppression des espaces inutiles
      };
  });

  const frequencies = [
    { id: 1, label: "Daily" },
    { id: 2, label: "Weekly" },
    { id: 3, label: "Monthly" },
    { id: 4, label: "Quarterly" },
    { id: 5, label: "Semi-Annually" },
    { id: 6, label: "Annually"},
  ];

  const frequenciesOptions = frequencies.map((frequency) => ({
    value: frequency.label,
    label: frequency.label,
  }));

  const calculateRemindOnDate = (frequency) => {
    const today = new Date();
    let remindOnDate;

    if (frequency === "Daily") {
      remindOnDate = new Date(today.setDate(today.getDate() + 1));  // Add 1 day
    } else if (frequency === "Weekly") {
      remindOnDate = new Date(today.setDate(today.getDate() + 7));  // Add 7 days
    } else if (frequency === "Monthly") {
      remindOnDate = new Date(today.setMonth(today.getMonth() + 1));  // Add 1 month
    } else if (frequency === "Quarterly") {
      remindOnDate = new Date(today.setMonth(today.getMonth() + 3));  // Add 3 month
    } else if (frequency === "Semi-Annually") {
      remindOnDate = new Date(today.setMonth(today.getMonth() + 6));  // Add 6 month
    } else if (frequency === "Annually") {
      remindOnDate = new Date(today.setMonth(today.getMonth() + 12));  // Add 12 month
    }

    // Format date as YYYY-MM-DD
    return remindOnDate.toISOString().split("T")[0];
  };

  // Update the handleSelectChange to also update the remindOne field
  const handleSelectChangeWithRemind = (name, selectedOption) => {
    const frequency = selectedOption.value;

    // Calculate new remindOn date based on the frequency
    const newRemindOnDate = calculateRemindOnDate(frequency);

    // Update the frequency and remindOne fields in the form data
    handleChange({
      target: {
        name: "frequency",
        value: frequency,
      }
    });

    handleChange({
      target: {
        name: "remindOne",
        value: newRemindOnDate,
      }
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 9999,
      maxHeight: '300px',
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '150px',
      overflowY: 'auto',
      borderRadius: '8px',
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

  const handleAmend = async () => {
    const payload = {
      itemIds: [selectedRisk._id],
      itemType: "risk",
      updates: {
        ...riskFormData,
        ownerRisk: riskFormData.ownerRisk ? riskFormData.ownerRisk : undefined,
        nomineeRisk: riskFormData.nomineeRisk ? riskFormData.nomineeRisk : undefined,
        reviewerRisk: riskFormData.reviewerRisk ? riskFormData.reviewerRisk : undefined,
        riskDescription: riskFormData.riskDescription ? riskFormData.riskDescription : undefined,
      },
    };
    console.log(payload);
    await dispatch(updateEntityRiskControl(payload)); 
    dispatch(listEntityRiskControls(selectedEntityDescription)); 
  };
  
  useEffect(() => {
    if (selectedRisk) {
      handleChange({ target: { name: 'riskDescription', value: selectedRisk.riskDescription } });
      handleChange({ target: { name: 'ownerEmail', value: selectedRisk.ownerEmail } });
      handleChange({ target: { name: 'activeRisk', value: selectedRisk.activeRisk } });
      const ownerOption = profilesOptions.find(option => option.value === selectedRisk.ownerRisk);
      if (ownerOption) {
        setOwnerValue(ownerOption);
      } else {
        // Si la valeur n'est pas dans les options, définir une valeur personnalisée
        setOwnerValue({ value: selectedRisk.ownerRisk, label: selectedRisk.ownerRisk });
      }
      const nomineeOption = profilesOptions.find(option => option.value === selectedRisk.nomineeRisk);
      if (nomineeOption) {
        setNomineeValue(nomineeOption);
      } else {
        setNomineeValue({ value: selectedRisk.nomineeRisk, label: selectedRisk.nomineeRisk });
      }
      const reviewerOption = profilesOptions.find(option => option.value === selectedRisk.reviewerRisk);
      if (reviewerOption) {
        setReviewerValue(reviewerOption);
      } else {
        setReviewerValue({ value: selectedRisk.reviewerRisk, label: selectedRisk.reviewerRisk });
      }
    }
  }, [selectedRisk]);
  
  return (
    <Box>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start" p={4}>
        {/* Left Column */}
        <Box width={{ base: "100%", md: "40%" }}>
          <FormControl>
            <HStack spacing={6} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Owner: </Text>
              <Box width="100%" >
                <Select
                  name="owner"
                  placeholder='Select owner'
                  styles={customStyles}
                  options={profilesOptions}
                  value={ownerValue} // Utiliser l'état pour la valeur
                  onChange={(selectedOption) => {
                    setOwnerValue(selectedOption);
                    handleSelectChange('ownerRisk', selectedOption);
                  }}
                />
              </Box>
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Nominee: </Text>
              <Box width="100%" >
                <Select
                  name="nominee"
                  placeholder='Select nominee'
                  styles={customStyles}
                  options={profilesOptions}
                  value={nomineeValue}
                  onChange={(selectedOption) => {
                    setNomineeValue(selectedOption);
                    handleSelectChange('nomineeRisk', selectedOption);
                  }}
                />
              </Box>
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Reviewer: </Text>
              <Box width="100%" >
                <Select
                  name="reviewer"
                  placeholder='Select reviewer'
                  styles={customStyles}
                  options={profilesOptions}
                  value={reviewerValue}
                  onChange={(selectedOption) => {
                    setReviewerValue(selectedOption);
                    handleSelectChange('reviewerRisk', selectedOption);
                  }}
                />
              </Box>
            </HStack>
          </FormControl>

          <FormControl mt={4} display="flex" alignItems="center" >
            <Checkbox
              name="activeRisk"
              isChecked={riskFormData.activeRisk}
              onChange={handleChange}
              fontWeight="bold"
              mb={2}
            >
              <span style={{ fontSize: 12 }}>Active Risk</span>
            </Checkbox>
          </FormControl>
        </Box>

        <Box width={{ base: "100%", md: "40%" }} textAlign="center">
          <Checkbox
            size="sm"
            fontWeight="bold"
            mb={2}
            name="ownerEmail"
            isChecked={riskFormData.ownerEmail}
            onChange={handleChange}
          >
            <span style={{ fontSize: 12 }}>Owner Email</span>
          </Checkbox>
        </Box>

        {/* Right Column with shadow and buttons */}
        <Box width={{ base: "100%", md: "40%" }} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
          <FormControl>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Frequency: </Text>
              <Box width="100%" >
                <Select
                  name="frequency"
                  placeholder='Select frequency'
                  styles={customStyles}
                  options={frequenciesOptions}
                  value={frequenciesOptions?.find(option => option.value === riskFormData.frequency)}
                  onChange={(selectedOption) => handleSelectChangeWithRemind('frequency', selectedOption)}  // Handle frequency change and set remindOn
                />
              </Box>
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack spacing={2} alignItems="center">
              <Text fontWeight="bold" fontSize={12} mb={2}>Remind On: </Text>
              <Input fontSize={12} type="date" name="remindOne" value={riskFormData.remindOne} onChange={handleChange} isReadOnly />
            </HStack>
          </FormControl>

          {/* Buttons in Right Column */}
          <Flex justifyContent="flex-end" mt={6}>
            <Button fontSize={12}
              colorScheme="blue"
              variant="solid"
              width="auto"
              minWidth="120px"
              onClick={handleTestControlClick}

            >
              Test du Controle
            </Button>
          </Flex>
        </Box>
      </Flex>

      <FormControl mt={4}>
        <Text fontWeight="bold" fontSize={12} mb={2}>Description: </Text>
        <Textarea fontSize={12} name="riskDescription" value={riskFormData.riskDescription} onChange={handleChange} />
      </FormControl>

      {/* Buttons Section */}
      <HStack spacing={4} mt={6} justify='center'>
        <Button fontSize={12} colorScheme="blue" variant="outline" leftIcon={<ArrowBackIcon />} onClick={onClose}>
          Home
        </Button>
        <Button fontSize={12} colorScheme="green" variant="outline" leftIcon={<CheckIcon />} >
          Approve
        </Button>
        <Button fontSize={12} colorScheme="yellow" variant="outline" leftIcon={<CloseIcon />}>
          Unapprove
        </Button>
        <Button fontSize={12} colorScheme="teal" variant="outline" leftIcon={<EditIcon />}>
          Save
        </Button>
        <Button fontSize={12} colorScheme="teal" variant="outline" leftIcon={<EditIcon />} onClick={handleAmend}>
          Amend
        </Button>
        <Button fontSize={12} colorScheme="red" variant="outline" leftIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button fontSize={12} colorScheme="green" variant="outline" leftIcon={<CheckIcon />} >
          Save and Approve
        </Button>
      </HStack>
    </Box>
  );
}

const mapStateToProps = ({ EntityRiskControlReducer }) => ({
  loading: EntityRiskControlReducer.loading,
});

export default connect(mapStateToProps)(RiskForm);


