import React from "react";
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
  Button
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const KeyIndicatorComponent = ({ kri, onClose, profiles }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

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
    console.log("Form Submitted:", formData);
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

  return (
    <Box p={5} fontSize="12px">
      {/* Top Section */}
      <Heading size="md" mb={4}>
        Key Indicator Details
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
          <FormControl isRequired>
            <FormLabel>Entity</FormLabel>
            <Input {...register("entity")} defaultValue={kriData.departmentFunction} />
          </FormControl>

          <FormControl>
            <FormLabel>Key Indicator Reference</FormLabel>
            <Input {...register("reference")} defaultValue={kriData.reference} isReadOnly />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} defaultValue={kriData.riskIndicatorDescription} />
          </FormControl>

          <FormControl>
            <FormLabel>Key Indicator Category</FormLabel>
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
        <Tabs variant="enclosed">
          <TabList>
            <Tab>General</Tab>
            <Tab>History</Tab>
            <Tab>Actions</Tab>
            <Tab>Linked Items</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel>Owner</FormLabel>
                  <Select
                    name="owner"
                    options={profilesOptions}
                    styles={customStyles}
                    onChange={(selected) => setValue('owner', selected)}
                    value={watch('owner')}
                    placeholder="Select owner"
                    isClearable
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Nominee</FormLabel>
                  <Select
                    name="nominee"
                    options={profilesOptions}
                    styles={customStyles}
                    onChange={(selected) => setValue('nominee', selected)}
                    value={watch('nominee')}
                    placeholder="Select nominee"
                    isClearable
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Reviewer</FormLabel>
                  <Select
                    name="reviewer"
                    options={profilesOptions}
                    styles={customStyles}
                    onChange={(selected) => setValue('reviewer', selected)}
                    value={watch('reviewer')}
                    placeholder="Select reviewer"
                    isClearable
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Review Date</FormLabel>
                  <Input {...register("reviewDate")} type="date" />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <Checkbox {...register("isActive")} defaultChecked mr={2} />
                  <FormLabel mb="0">Active Key Indicator</FormLabel>
                </FormControl>

                <FormControl>
                  <FormLabel>Detailed Description</FormLabel>
                  <Textarea {...register("detailedDescription")} defaultValue={kriData.riskIndicatorDescription} /> 
                </FormControl>

                <FormControl>
                  <FormLabel>Type of KI</FormLabel>
                  <Input {...register("typeOfKi")} defaultValue={kriData.type} />
                </FormControl>

                <Box borderWidth="1px" borderRadius="md" p={4} mt={4}>
                  <Heading size="sm" mb={2}>Thresholds</Heading>
                  <FormControl>
                    <FormLabel>Threshold</FormLabel>
                    <Select
                      name="thresholdType"
                      options={thresholdOptions}
                      styles={customStyles}
                      onChange={(selected) => setValue('thresholdType', selected)}
                      value={watch('thresholdType')}
                    />
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Target</FormLabel>
                    <Input {...register("target")} defaultValue="0" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" mt={2}>
                    <Checkbox {...register("isPercentage")} mr={2} />
                    <FormLabel mb="0">Thresholds are percentages</FormLabel>
                  </FormControl>
                </Box>
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <p>History content here...</p>
            </TabPanel>

            <TabPanel>
              <p>Actions content here...</p>
            </TabPanel>

            <TabPanel>
              <p>Linked Items content here...</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Stack direction="row" spacing={4} mt={6} justify="flex-end">
          <Button colorScheme="blue" type="submit">Save</Button>
          <Button onClick={onClose} colorScheme="red" type="reset">Cancel</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default KeyIndicatorComponent;
