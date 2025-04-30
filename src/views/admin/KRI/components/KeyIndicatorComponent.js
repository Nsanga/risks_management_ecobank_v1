import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Stack,
  Heading,
  Divider,
  SimpleGrid,
  Button,
  HStack,
  Text,
  Flex
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import History from "./History";
import Action from "./action";

const KeyIndicatorComponent = ({ kri, onClose, profiles }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = React.useState(null);

  // Options pour les catégories KRI
  const categoryOptions = [
    { value: 'Key Risk Indicator', label: 'Key Risk Indicator' },
    { value: 'Key Performance Indicator', label: 'Key Performance Indicator' }
  ];

  // Options pour les seuils
  const thresholdOptions = [
    { value: 'Target - higher value is worse', label: 'Target - higher value is worse' },
    { value: 'Target - lower value is worse', label: 'Target - lower value is worse' }
  ];

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

  // Préparation des options pour les profils
  const profilesOptions = React.useMemo(() => {
    if (!Array.isArray(profiles)) return []; // Handle non-array cases

    return profiles
      .filter(profile => profile?.activeUser)
      .map(profile => ({
        value: profile?._id,
        label: [profile?.name, profile?.surname].filter(Boolean).join(' ') || 'Unnamed Profile',
        profile
      }));
  }, [profiles]);

  // Normalisation des données KRI
  const kriData = React.useMemo(() => {
    const data = Array.isArray(kri) ? kri[0] : kri;
    return data || {};
  }, [kri]);

  // Fonction pour créer une option pour une valeur qui n'existe pas dans les profils
  const createCustomOption = (value) => {
    if (!value) return null;
    return {
      value,
      label: value,
      isCustom: true
    };
  };

  // Pré-remplissage des valeurs initiales
  React.useEffect(() => {
    if (kriData) {
      // Catégorie
      if (kriData.category) {
        setValue('category', categoryOptions.find(opt =>
          opt.value === kriData.category
        ) || categoryOptions[0]);
      }

      // Threshold
      setValue('thresholdType', thresholdOptions.find(opt =>
        opt.value === (kriData.thresholdType || 'Target - higher value is worse')
      ) || thresholdOptions[0]);

      // Owner, Nominee, Reviewer avec gestion des valeurs non trouvées
      ['ownerKeyIndicator', 'nomineeKeyIndicator', 'reviewerKeyIndicator'].forEach(field => {
        const fieldName = field.replace('KeyIndicator', '').toLowerCase();
        const fieldValue = kriData[field];

        if (fieldValue) {
          const foundOption = profilesOptions.find(opt =>
            opt.value === fieldValue || opt.label === fieldValue
          );

          setValue(fieldName, foundOption || createCustomOption(fieldValue));
        }
      });

      setValue('frequenceKeyIndicator', frequenciesOptions.find(opt =>
        opt.value === (kriData.frequenceKeyIndicator)
      ))
    }
  }, [kriData, setValue, profilesOptions]);


  const onSubmit = (data) => {
    // Transformation des données avant soumission
    const formData = {
      ...data,
      category: data.category.value,
      thresholdType: data.thresholdType.value,
      owner: data.owner?.value,
      nominee: data.nominee?.value,
      reviewer: data.reviewer?.value
    };
    // Convertir les valeurs en nombres pour comparaison
    const targetValue = parseFloat(data.target) || 0;
    const escaladeValue = parseFloat(kriData.escaladeKeyIndicator) || 0;

    // Vérifier si la target est supérieure à l'escaladeKeyIndicator
    if (targetValue > escaladeValue) {
      // Stocker les données et ouvrir la modal
      setFormDataToSubmit(formData);
      setIsModalOpen(true);
    } else {
      // Soumettre directement si la condition n'est pas remplie
      console.log("Form Submitted:", formData);
      // Ici vous ajouteriez votre logique de soumission réelle
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

  const handleConfirmSubmit = () => {
    // Soumettre après confirmation dans la modal
    console.log("Form Submitted after confirmation:", formDataToSubmit);
    // Ici vous ajouteriez votre logique de soumission réelle
    setIsModalOpen(false);
  };

  return (
    <Box p={5}>
      {/* Top Section */}
      <Heading size="md" mb={4}>
        Key Indicator Details
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
          <FormControl isRequired>
            <FormLabel fontSize="12px">Entity</FormLabel>
            <Input {...register("entity")} defaultValue={kriData.departmentFunction} fontSize="12px" />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="12px">Key Indicator Reference</FormLabel>
            <Input {...register("reference")} defaultValue={`KI${kriData.reference}`} isReadOnly fontSize="12px" />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="12px">Description</FormLabel>
            <Textarea fontSize="12px" {...register("description")} defaultValue={kriData.riskIndicatorDescription} />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="12px">Key Indicator Category</FormLabel>
            <Select
              name="category"
              options={categoryOptions}
              styles={customStyles}
              onChange={(selected) => setValue('category', selected)}
              value={watch('category')}
            />
          </FormControl>

        </SimpleGrid>

        <Divider mb={4} />

        {/* Tabs Section */}
        <Tabs variant="enclosed" index={tabIndex} onChange={setTabIndex}>
          <TabList>
            <Tab fontSize="12px">General</Tab>
            <Tab fontSize="12px">History</Tab>
            <Tab fontSize="12px">Actions</Tab>
            <Tab fontSize="12px">Linked Items</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <FormControl display="flex" alignItems="center" gap={16} marginBottom={4}>
                    <FormLabel fontSize="12px">Owner:</FormLabel>
                    <Box width="100%" >
                      <Select
                        name="owner"
                        options={profilesOptions}
                        styles={customStyles}
                        onChange={(selected) => setValue('owner', selected)}
                        value={watch('owner')}
                        placeholder="Select owner"
                        isClearable
                      />
                    </Box>
                  </FormControl>

                  <FormControl display="flex" alignItems="center" gap={12} marginBottom={4}>
                    <FormLabel fontSize="12px" marginRight={4}>Nominee:</FormLabel>
                    <Box width="100%" >
                      <Select
                        name="nominee"
                        options={profilesOptions}
                        styles={customStyles}
                        onChange={(selected) => setValue('nominee', selected)}
                        value={watch('nominee')}
                        placeholder="Select nominee"
                        isClearable
                      />
                    </Box>
                  </FormControl>

                  <FormControl display="flex" alignItems="center" gap={12} marginBottom={4}>
                    <FormLabel fontSize="12px" marginRight={4}>Reviewer:</FormLabel>
                    <Box width="100%" >
                      <Select
                        name="reviewer"
                        options={profilesOptions}
                        styles={customStyles}
                        onChange={(selected) => setValue('reviewer', selected)}
                        value={watch('reviewer')}
                        placeholder="Select reviewer"
                        isClearable
                      />
                    </Box>
                  </FormControl>

                  <FormControl display="flex" alignItems="center" gap={8} marginBottom={4}>
                    <FormLabel mb="0" whiteSpace="nowrap" fontSize="12px">Review Date:</FormLabel>
                    <Input fontSize="12px" {...register("reviewDate")} type="date" />
                  </FormControl>

                  <FormControl display="flex" alignItems="center" marginBottom={4}>
                    <Checkbox {...register("isActive")} defaultChecked mr={2} />
                    <FormLabel mb="0">Active Key Indicator</FormLabel>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="12px">Detailed Description</FormLabel>
                    <Textarea fontSize="12px" {...register("detailedDescription")} defaultValue={kriData.riskIndicatorDescription} />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl display="flex" alignItems="center" gap={4} mb={4}>
                    <FormLabel mb="0" whiteSpace="nowrap" fontSize="12px"> Type of KI</FormLabel>
                    <Input fontSize="12px" {...register("typeOfKi")} defaultValue={kriData.type} />
                  </FormControl>

                  <Box borderWidth="1px" borderRadius="md" p={4} mt={4}>
                    <Heading size="sm" mb={2}>Thresholds</Heading>
                    <FormControl display="flex" alignItems="center" gap={4} marginBottom={4}>
                      <FormLabel fontSize="12px">Threshold</FormLabel>
                      <Box width="100%" >
                        <Select
                          name="thresholdType"
                          options={thresholdOptions}
                          styles={customStyles}
                          onChange={(selected) => setValue('thresholdType', selected)}
                          value={watch('thresholdType')}
                        />
                      </Box>
                    </FormControl>
                    <FormControl display="flex" alignItems="center" gap={10} marginBottom={4}>
                      <FormLabel fontSize="12px">Target</FormLabel>
                      <Input fontSize="12px" {...register("target")} defaultValue="0" />
                    </FormControl>
                    <Box mt={4} borderRadius="md" overflow="hidden">
                      <FormControl display="flex" alignItems="center" gap={4} marginBottom={4}>
                        <Checkbox {...register("isPercentage")} mr={2} />
                        <FormLabel mb="0" fontSize="12px">Thresholds are percentages</FormLabel>
                      </FormControl>

                      <Box w="100%">
                        <HStack spacing={4} mb={2}>
                          <Text fontWeight="bold" w="30px">R :</Text>
                          <Input fontSize="12px" bg="red.400" color="white" size="sm" value={kriData.escaladeKeyIndicator} readOnly />
                        </HStack>

                        <HStack spacing={4} mb={2}>
                          <Text fontWeight="bold" w="30px">A :</Text>
                          <Input fontSize="12px" bg="orange.300" color="white" size="sm" value={kriData.seuilKeyIndicator} readOnly />
                        </HStack>

                        <HStack spacing={4}>
                          <Text fontWeight="bold" w="30px">G :</Text>
                          <Input fontSize="12px" bg="green.400" color="white" size="sm" value={kriData.toleranceKeyIndicator} readOnly />
                        </HStack>
                      </Box>

                      <HStack spacing={4} mt={4} flexWrap="wrap">
                        <Box width={{ base: "100%", md: "100%" }} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg" mt={4}>
                          <FormControl mb={4}>
                            <HStack spacing={2} alignItems="center">
                              <Text fontWeight="bold" fontSize={12} mb={2}>Frequency:</Text>
                              <Box width="100%" >
                                <Select
                                  name="frequenceKeyIndicator"
                                  placeholder='Select frequency'
                                  styles={customStyles}
                                  options={frequenciesOptions}
                                  value={frequenciesOptions?.find(option => option.value === kriData.frequenceKeyIndicator)}
                                  onChange={(selected) => setValue('frequenceKeyIndicator', selected)}
                                />
                              </Box>
                            </HStack>
                          </FormControl>
                          <FormControl>
                            <HStack spacing={2} alignItems="center">
                              <Text fontWeight="bold" fontSize={12} mb="0" whiteSpace="nowrap">Remind On:</Text>
                              <Input fontSize="12px" value="28/01/2025" />
                            </HStack>
                          </FormControl>
                        </Box>
                      </HStack>

                      <Flex justifyContent="flex-end" mt={6}>
                        <Button mt={4} colorScheme="blue" fontSize={12}
                          variant="solid"
                          width="auto"
                          minWidth="120px"
                          onClick={() => setTabIndex(1)}>
                          Capture de valeur
                        </Button>
                      </Flex>
                    </Box>

                  </Box>
                </Box>
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <History kriData={kriData} profilesOptions={profilesOptions} />
            </TabPanel>

            <TabPanel>
              <Action kriData={kriData} profilesOptions={profilesOptions} />
            </TabPanel>

            <TabPanel>
              <p>Linked Items content here...</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Stack direction="row" spacing={4} mt={6} justify="flex-end">
          <Button colorScheme="blue" type="submit" fontSize="12px">Save</Button>
          <Button onClick={onClose} colorScheme="red" type="reset" fontSize="12px">Cancel</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default KeyIndicatorComponent;
