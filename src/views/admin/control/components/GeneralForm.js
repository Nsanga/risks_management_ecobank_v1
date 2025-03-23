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

const GeneralForm = ({
  formData,
  handleSelectChange,
  profiles,
  handleChange,
  currentAssoCiate,
  handleTestControlBySubTabClick,
}) => {
  const [nomineeValue, setNomineeValue] = useState(null);
  const [reviewerValue, setReviewerValue] = useState(null);

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
    { id: 5, label: "Semi-Annually" },
    { id: 6, label: "Annually" },
  ];

  const frequenciesOptions = frequencies.map((frequency) => ({
    value: frequency.label,
    label: frequency.label,
  }));

  const calculateRemindOnDate = (frequency) => {
    const today = new Date();
    let nextDate;

    if (frequency === "Daily") {
      nextDate = new Date(today.setDate(today.getDate() + 1)); // Add 1 day
    } else if (frequency === "Weekly") {
      nextDate = new Date(today.setDate(today.getDate() + 7)); // Add 7 days
    } else if (frequency === "Monthly") {
      nextDate = new Date(today.setMonth(today.getMonth() + 1)); // Add 1 month
    } else if (frequency === "Quarterly") {
      nextDate = new Date(today.setMonth(today.getMonth() + 3)); // Add 3 months
    } else if (frequency === "Semi-Annually") {
      nextDate = new Date(today.setMonth(today.getMonth() + 6)); // Add 6 months
    }

    return nextDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  };

  // General handler for frequency change
  const handleSelectChangeWithNext = (frequencyType, selectedOption) => {
    const frequency = selectedOption.value;
    const newNextDate = calculateRemindOnDate(frequency);

    handleChange({
      target: {
        name: frequencyType,
        value: frequency,
      },
    });

    handleChange({
      target: {
        name:
          frequencyType === "frequency" ? "nextOperation" : "nextAssessment",
        value: newNextDate,
      },
    });
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

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = () => {
    // handleSubmit(payload); // Appeler handleSubmit avec le payload
  };

  useEffect(() => {
    if (currentAssoCiate) {
      handleChange({
        target: { name: "description", value: currentAssoCiate.description },
      });
      handleChange({
        target: { name: "activeControl", value: currentAssoCiate.activeControl },
      });
      // Vérifier si historyControl a des éléments
      if (
        currentAssoCiate.historyControl &&
        currentAssoCiate.historyControl.length > 0
      ) {
        // Récupérer l'élément le plus récent
        const latestHistory = currentAssoCiate.historyControl[0]; // Supposons que le plus récent est le premier élément

        // Passer les valeurs de dueOn et assessedOn
        handleChange({
          target: { name: "nextAssessment", value: latestHistory.assessedOn },
        });
      }
      const nomineeOption = profilesOptions.find(
        (option) => option.value === currentAssoCiate.nomineeControl
      );
      if (nomineeOption) {
        setNomineeValue(nomineeOption);
      } else {
        setNomineeValue({
          value: currentAssoCiate.nomineeControl,
          label: currentAssoCiate.nomineeControl,
        });
      }
      const reviewerOption = profilesOptions.find(
        (option) => option.value === currentAssoCiate.reviewerControl
      );
      if (reviewerOption) {
        setReviewerValue(reviewerOption);
      } else {
        setReviewerValue({
          value: currentAssoCiate.reviewerControl,
          label: currentAssoCiate.reviewerControl,
        });
      }
      if (currentAssoCiate.frequence) {
        handleChange({
          target: {
            name: "frequencyAssessment",
            value: currentAssoCiate.frequence,
          },
        });
      }
    }
  }, [currentAssoCiate]);

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
                defaultValue={currentAssoCiate?.reference}
                // value={formData.controlRef}
                onChange={handleChange}
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
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={14} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Description:
              </Text>
              <Textarea
                defaultValue={
                  currentAssoCiate?.controlDescription
                    ? currentAssoCiate?.controlDescription
                    : currentAssoCiate?.description
                }
                fontSize={12}
                name="description"
                // value={formData.description}
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
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack spacing={5} alignItems="center">
              <Text fontSize={12} fontWeight="bold" mb={4}>
                Resumé du control :
              </Text>
              <Textarea
                defaultValue={
                  currentAssoCiate?.controlSummary
                    ? currentAssoCiate?.controlSummary
                    : currentAssoCiate?.controlSummary
                }
                fontSize={12}
                name="description"
                // value={formData.description}
                onChange={handleChange}
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
                      options={frequenciesOptions}
                      value={frequenciesOptions?.find(
                        (option) => option.value === formData.frequency
                      )}
                      onChange={(selectedOption) =>
                        handleSelectChangeWithNext("frequency", selectedOption)
                      }
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
                    onChange={handleChange}
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
                      onChange={(selectedOption) =>
                        handleSelectChangeWithNext(
                          "frequencyAssessment",
                          selectedOption
                        )
                      }
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
                    value={formData.nextAssessment}
                    onChange={handleChange}
                    isReadOnly
                  />
                </HStack>
              </FormControl>
              <Box>
                <Button
                  fontSize={12}
                  colorScheme="blue"
                  variant="solid"
                  onClick={handleTestControlBySubTabClick}
                  disabled={
                    new Date(currentAssoCiate?.historyControl[0]?.assessedOn) >
                    new Date()
                  }
                >
                  Test du controle
                </Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      </SimpleGrid>
      <FormControl mb={4}>
        <Text fontSize={12} fontWeight="bold" mb={4}>
          Methodologie du teste:
        </Text>
        <Textarea
          defaultValue={
            currentAssoCiate?.monitoringMethodology
              ? currentAssoCiate?.monitoringMethodology
              : currentAssoCiate?.monitoringMethodology
          }
          fontSize={12}
          name="description"
          // value={formData.description}
          onChange={handleChange}
        />
      </FormControl>
      <HStack spacing={4} mt={6} justify="center">
        <Button
          fontSize={12}
          colorScheme="blue"
          variant="outline"
          leftIcon={<AddIcon />}
        >
          Add Control
        </Button>
        <Button
          fontSize={12}
          colorScheme="green"
          variant="outline"
          leftIcon={<EditIcon />}
        >
          Amend Control
        </Button>
        <Button
          fontSize={12}
          colorScheme="red"
          variant="outline"
          leftIcon={<DeleteIcon />}
        >
          Delete Control
        </Button>
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
        >
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default GeneralForm;
