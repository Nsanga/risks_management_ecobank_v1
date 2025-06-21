import React, { useEffect, useState } from "react";
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
  Button,
} from "@chakra-ui/react";
import {
  AddIcon,
  CheckCircleIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import Select from "react-select";
import { updateEntityRiskControl } from "redux/entityRiskControl/action";
import { useDispatch } from "react-redux";
import { listEntityRiskControls } from "redux/entityRiskControl/action";

const GeneralForm = ({
  formData,
  handleSelectChange,
  profiles,
  handleChange,
  selectedControl,
  handleTestControlBySubTabClick,
  selectedEntityDescription,
  onClose,
}) => {
  const [nomineeValue, setNomineeValue] = useState(null);
  const [reviewerValue, setReviewerValue] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState(() => {
    // Initialiser avec la fréquence par défaut
    return selectedControl?.frequence || '';
  });
  const [amend, setAmend] = useState(false);

  const dispatch = useDispatch();

  const userRole = localStorage.getItem('role')

  const profilesOptions = profiles
    ?.filter((profile) => profile.activeUser)
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
    // { id: 5, label: "Semi-Annually" },
    // { id: 6, label: "Annually" },
  ];

  const frequenciesOperationOptions = frequencies.map((frequency) => ({
    value: frequency.label,
    label: frequency.label,
  }));

  const frequenciesOptions = frequencies.map((frequency) => ({
    value: frequency.label,
    label: frequency.label,
    isDisabled: frequency.label !== "Quarterly",
  }));

  const calculateRemindOnDate = (frequency, lastOperationDate) => {
    // Vérifiez si lastOperationDate est valide
    if (!lastOperationDate || isNaN(new Date(lastOperationDate).getTime())) {
      // console.error("Invalid lastOperationDate:", lastOperationDate);
      return null; // Ou une date par défaut, selon vos besoins
    }

    const lastOperation = new Date(lastOperationDate);
    let nextDate;

    if (frequency === "Daily") {
      nextDate = new Date(lastOperation.setDate(lastOperation.getDate() + 1)); // Add 1 day
    } else if (frequency === "Weekly") {
      nextDate = new Date(lastOperation.setDate(lastOperation.getDate() + 7)); // Add 7 days
    } else if (frequency === "Monthly") {
      nextDate = new Date(lastOperation.setMonth(lastOperation.getMonth() + 1)); // Add 1 month
    } else if (frequency === "Quarterly") {
      nextDate = new Date(lastOperation.setMonth(lastOperation.getMonth() + 3)); // Add 3 months
    } else if (frequency === "Semi-Annually") {
      nextDate = new Date(lastOperation.setMonth(lastOperation.getMonth() + 6)); // Add 6 months
    } else if (frequency === "Annually") {
      nextDate = new Date(lastOperation.setFullYear(lastOperation.getFullYear() + 1)); // Add 1 year
    }

    return nextDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  }

  const handleFrequencyChange = (selectedOption) => {
    handleChange("frequency", selectedOption.value);

    // Si lastOperation est déjà défini, calcule nextOperation
    if (formData.lastOperation) {
      const newNextDate = calculateRemindOnDate(selectedOption.value, formData.lastOperation);
      handleChange("nextOperation", newNextDate);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
  };

  const handleAmendControl = async () => {
    setAmend(true);
  };

  const handleFormSubmit = async () => {
    const postData = {
      itemIds: [selectedControl?._id],
      itemType: "control",
      updates: {
        activeControl: formData.activeControl,
        controlCategory: formData.controlCategory,
        controlRef: formData.controlRef,
        description: formData.description,
        frequence: formData.frequency,
        frequencyAssessment: formData.frequencyAssessment,
        keyControl: formData.keyControl,
        lastOperation: formData.lastOperation,
        nextAssessment: formData.nextAssessment,
        nextOperation: formData.nextOperation,
        nomineeRisk: formData.nomineeRisk,
        reviewDate: formData.reviewDate,
        reviewerRisk: formData.reviewerRisk,
        monitoringMethodology: formData.monitoringMethodology,
        controlSummary: formData.controlSummary,
      },
    };
    // console.log("postData:", postData);
    await dispatch(updateEntityRiskControl(postData));
    dispatch(listEntityRiskControls(selectedEntityDescription));
  };

  useEffect(() => {
    if (selectedControl) {
      handleChange("description", selectedControl?.controlDescription);
      handleChange("activeControl", selectedControl?.activeControl);
      handleChange("keyControl", selectedControl?.keyControl);
      handleChange("reviewDate", selectedControl?.reviewDate);
      handleChange("lastOperation", selectedControl?.lastOperation);
      if (selectedControl) {
        const frequency = selectedControl?.frequence;
        if (frequency) {
          handleChange("frequency", frequency); // Mettre à jour la fréquence
        }
      }
      handleChange("nextOperation", selectedControl?.nextOperation);
      handleChange("controlRef", selectedControl?.reference);
      handleChange("controlSummary", selectedControl?.controlSummary);

      const nomineeOption = profilesOptions.find(
        (option) =>
          option.value === selectedControl?.nomineeControl
      );
      if (nomineeOption) {
        setNomineeValue(nomineeOption);
      } else {
        setNomineeValue({
          value:
            selectedControl?.nomineeControl,
          label:
            selectedControl?.nomineeControl,
        });
      }

      const reviewerOption = profilesOptions.find(
        (option) =>
          option.value === selectedControl?.reviewerControl
      );
      if (reviewerOption) {
        setReviewerValue(reviewerOption);
      } else {
        setReviewerValue({
          value:
            selectedControl?.reviewerControl,
          label:
            selectedControl?.reviewerControl,
        });
      }

      if (selectedControl) {
        const frequency = selectedControl?.frequence;
        if (frequency) {
          setSelectedFrequency(frequency); // Mettre à jour la fréquence sélectionnée
          handleChange("frequencyAssessment", frequency);
        }
      }
    }
  }, [selectedControl]);

  return (
    <Box className="form-container" as="form">
      <SimpleGrid columns={2} spacing={10}>
        {/* Left section */}
        <Box bg="white">
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
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Control Library Reference:
              </Text>
              <Input
                fontSize={12}
                type="text"
                name="controlRef"
                // value={selectedControl?.reference}
                value={formData.controlRef}
                onChange={handleChange}
                readOnly
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={10} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Control Category:
              </Text>
              <Input
                fontSize={12}
                type="text"
                name="controlCategory"
                value={formData.controlCategory}
                onChange={handleChange}
                readOnly={!amend}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={5} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Resumé du control :
              </Text>
              <Textarea
                value={formData?.controlSummary}
                fontSize={12}
                name="controlSummary"
                onChange={handleChange}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={14} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Description:
              </Text>
              <Textarea
                value={formData?.description}
                fontSize={12}
                name="description"
                onChange={handleChange}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={16} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Nominee:
              </Text>
              <Box width="100%">
                <Select
                  name="nominee"
                  placeholder="Select nominee"
                  styles={customStyles}
                  options={profilesOptions}
                  value={nomineeValue}
                  onChange={(selectedOption) => {
                    setNomineeValue(selectedOption);
                    handleSelectChange("nominee", selectedOption);
                  }}
                />
              </Box>
            </HStack>
          </FormControl>
          <FormControl mb={4}>
            <HStack spacing={16} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Reviewer:
              </Text>
              <Box width="100%">
                <Select
                  name="reviewer"
                  placeholder="Select reviewer"
                  styles={customStyles}
                  options={profilesOptions}
                  value={reviewerValue}
                  onChange={(selectedOption) => {
                    setReviewerValue(selectedOption);
                    handleSelectChange("reviewer", selectedOption);
                  }}
                />
              </Box>
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={14} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Review Date:
              </Text>
              <Input
                fontSize={12}
                type="date"
                name="reviewDate"
                value={formData.reviewDate}
                onChange={handleChange}
                readOnly={!amend}
              />
            </HStack>
          </FormControl>
        </Box>

        {/* Right section */}
        <Box>
          <Box
            flex="1"
            width={{ base: "100%", md: "100%" }}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="lg"
            mb={8}
          >
            <Text fontSize={12} fontWeight="bold" mb={4}>
              Operation:
            </Text>
            <Flex direction="column">
              <FormControl mb={4}>
                <HStack spacing={6} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>
                    Frequency:
                  </Text>
                  <Box width="100%">
                    <Select
                      name="frequency"
                      placeholder="Select frequency"
                      styles={customStyles}
                      options={frequenciesOperationOptions}
                      value={frequenciesOperationOptions?.find(
                        (option) => option.value === formData.frequency
                      )}
                      onChange={handleFrequencyChange}
                    />
                  </Box>
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={4} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>
                    Last Operation:
                  </Text>
                  <Input
                    fontSize={12}
                    type="date"
                    name="lastOperation"
                    value={formData.lastOperation}
                    onChange={(e) => {
                      handleChange("lastOperation", e.target.value); // Traite d'abord la mise à jour de lastOperation

                      // Si la fréquence est définie, calcule automatiquement nextOperation
                      if (formData.frequency) {
                        const newNextDate = calculateRemindOnDate(formData.frequency, e.target.value);
                        handleChange({
                          target: {
                            name: "nextOperation",
                            value: newNextDate,
                          },
                        });
                      }
                    }}
                    readOnly={!amend}
                  />
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={2} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>
                    Next Operation:
                  </Text>
                  <Input
                    fontSize={12}
                    type="date"
                    name="nextOperation"
                    value={formData.nextOperation}
                    onChange={handleChange}
                    isReadOnly
                  />
                </HStack>
              </FormControl>
            </Flex>
          </Box>

          <Box
            flex="1"
            width={{ base: "100%", md: "100%" }}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="lg"
          >
            <Text fontSize={12} fontWeight="bold" mb={4}>
              Assessment:
            </Text>
            <Flex direction="column">
              <FormControl mb={4}>
                <HStack spacing={8} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>
                    Frequency:
                  </Text>
                  <Box width="100%">
                    <Select
                      name="frequencyAssessment"
                      placeholder="Select frequency"
                      styles={customStyles}
                      options={frequenciesOptions}
                      value={frequenciesOptions?.find(
                        (option) =>
                          option.value === formData.frequencyAssessment
                      )}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          setSelectedFrequency(selectedOption.value);
                          handleChange("frequencyAssessment", selectedOption.value); // Passez directement le nom et la valeur
                        }
                      }}
                    />
                  </Box>
                </HStack>
              </FormControl>
              <FormControl mb={4}>
                <HStack spacing={2} alignItems="center">
                  <Text fontSize={12} fontWeight="bold" mb={4}>
                    Next Assessment:
                  </Text>
                  <Input
                    fontSize={12}
                    type="date"
                    name="nextAssessment"
                    value={selectedControl?.nextAssessMent}
                    isReadOnly
                  />
                </HStack>
              </FormControl>
              <Flex gap={2}>
                <Button
                  fontSize={12}
                  colorScheme="blue"
                  variant="solid"
                  onClick={() => handleTestControlBySubTabClick(selectedFrequency)}
                  disabled={
                    (selectedControl?.historyControl?.length > 0 &&
                    !selectedControl.historyControl[0]?.attested) ||
                    userRole === 'validated'
                  }
                >
                  Test du contrôle
                </Button>
                <Button
                  fontSize={12}
                  colorScheme="red"
                  variant="solid"
                  disabled = {userRole === 'inputeurs'}
                  onClick={() => handleTestControlBySubTabClick(selectedFrequency)}
                >
                  Valider le Test
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </SimpleGrid>
      <HStack spacing={4} mt={6} justify="center">
        {/* <Button
          fontSize={12}
          colorScheme="blue"
          variant="outline"
          leftIcon={<AddIcon />}
        >
          Add Control
        </Button> */}
        <Button
          fontSize={12}
          colorScheme="green"
          variant="outline"
          onClick={handleAmendControl}
          leftIcon={<EditIcon />}
        >
          Amend Control
        </Button>
        {/* <Button
          fontSize={12}
          colorScheme="red"
          variant="outline"
          leftIcon={<DeleteIcon />}
        >
          Delete Control
        </Button> */}
        <Button
          fontSize={12}
          colorScheme="blue"
          variant="outline"
          leftIcon={<CheckCircleIcon />}
          onClick={handleFormSubmit}
        >
          Save
        </Button>
        <Button
          fontSize={12}
          colorScheme="red"
          variant="outline"
          leftIcon={<CloseIcon />}
          onClick={onClose}
        >
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default GeneralForm;
