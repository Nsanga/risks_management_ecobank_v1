import React, { useState, useEffect } from "react";
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
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import History from "./History";
import Action from "./action";
import { updateKeyIndicator } from "redux/kri/action";
import { useDispatch, useSelector } from "react-redux";
import { listEntityKeyIndicators } from "redux/kri/action";
import { listKeyIndicator } from "redux/kri/action";
import ActionForm from "./ActionForm";
import { listHistoriesKRI } from "redux/historyKri/action";
import { listActionsKRI } from "redux/actionKRI/action";

const KeyIndicatorComponent = ({
  kri,
  onClose,
  profilesOptions,
  selectedEntity,
  search = false,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [dataHostorie, setDataHostorie] = useState([]);
  const [amend, setAmend] = useState(false);

  const [isHistory, setIsHistory] = useState(false);

  const { histories } = useSelector((state) => state.HistoryKRIReducer);
  const { average } = useSelector((state) => state.HistoryKRIReducer);
  const { actionsKRI } = useSelector((state) => state.ActionKRIReducer);

  const [valuePeriod, setValuePeriod] = useState("");
  const [valueRemindOne, setValueRemindOne] = useState("");

  const changeHistory = () => {
    setIsHistory(true);
  };

  const changeCapture = () => {
    setTabIndex(1);
    setIsHistory(false);
  };

  // Fonction pour formater une Date en JJ/MM/AAAA
  const formatDate = (dateObj) => {
    const jour = dateObj.getDate().toString().padStart(2, "0");
    const mois = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const annee = dateObj.getFullYear();
    return `${jour}/${mois}/${annee}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = React.useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (dataHostorie.length === 0) {
      setValuePeriod("01/01/2025");
      setValueRemindOne("01/01/2025");
    } else if (dataHostorie.length) {
      setValuePeriod(dataHostorie[0]?.period);
    } else {
      let baseDate;

      if (valuePeriod === "") {
        baseDate = new Date();
      } else {
        const [jour, mois, annee] = valuePeriod.split("/");
        baseDate = new Date(`${annee}-${mois}-${jour}`);
      }

      baseDate.setMonth(baseDate.getMonth() + 3);
      setValuePeriod(formatDate(baseDate));
    }
  }, [dataHostorie]);

  useEffect(() => {
    if (dataHostorie.length === 0) {
      setValueRemindOne("01/01/2025");
    } else if (dataHostorie.length) {
      // const dateString = dataHostorie[0]?.period;
      const dateString = "01/01/2025";
      const [day, month, year] = dateString.split("/").map(Number);
      const date = new Date(year, month - 1, day); // JS months are 0-based
      date.setMonth(date.getMonth() + 3); // Ajouter 3 mois

      const newDay = String(date.getDate()).padStart(2, "0");
      const newMonth = String(date.getMonth() + 1).padStart(2, "0");
      const newYear = date.getFullYear();

      const newDateString = `${newDay}/${newMonth}/${newYear}`;
      setValueRemindOne(newDateString);
    }
  }, [dataHostorie]);

  // Options pour les catégories KRI
  const categoryOptions = [
    { value: "Key Risk Indicator", label: "Key Risk Indicator" },
    { value: "Key Performance Indicator", label: "Key Performance Indicator" },
  ];

  // Options pour les seuils
  const thresholdOptions = [
    {
      value: "Target - higher value is worse",
      label: "Target - higher value is worse",
    },
    {
      value: "Target - lower value is worse",
      label: "Target - lower value is worse",
    },
  ];

  const frequencies = [
    { id: 1, label: "Daily" },
    { id: 2, label: "Weekly" },
    { id: 3, label: "Monthly" },
    { id: 4, label: "Quarterly" },
  ];

  const frequenciesOptions = frequencies.map((frequency) => ({
    value: frequency.label.toLowerCase(), // Conversion en minuscules pour comparaison insensible à la casse
    label: frequency.label,
  }));

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
      isCustom: true,
    };
  };

  useEffect(() => {
    const fetchHistoriesData = async () => {
      if (kriData) {
        try {
          // Exécute les appels en parallèle pour meilleure performance
          await Promise.all([
            dispatch(listHistoriesKRI(kriData._id)),
            dispatch(listActionsKRI(kriData._id)),
          ]);
        } catch (error) {
          console.error("Error fetching entity data:", error);
          // Gérer l'erreur ici (affichage à l'utilisateur, etc.)
        }
      }
    };

    fetchHistoriesData();
  }, [kriData, dispatch]);

  // Pré-remplissage des valeurs initiales
  React.useEffect(() => {
    if (kriData) {
      // Catégorie
      if (kriData.category) {
        setValue(
          "category",
          categoryOptions.find((opt) => opt.value === kriData.category) ||
          categoryOptions[0]
        );
      }

      // Threshold
      setValue(
        "thresholdType",
        thresholdOptions.find(
          (opt) =>
            opt.value ===
            (kriData.thresholdType || "Target - higher value is worse")
        ) || thresholdOptions[0]
      );

      // Owner, Nominee, Reviewer avec gestion des valeurs non trouvées
      [
        "ownerKeyIndicator",
        "nomineeKeyIndicator",
        "reviewerKeyIndicator",
      ].forEach((field) => {
        const fieldName = field.replace("KeyIndicator", "").toLowerCase();
        const fieldValue = kriData[field];

        if (fieldValue) {
          const foundOption = profilesOptions.find(
            (opt) => opt.value === fieldValue || opt.label === fieldValue
          );

          setValue(fieldName, foundOption || createCustomOption(fieldValue));
        }
      });

      // Normalisation de la valeur pour comparaison insensible à la casse
      const normalizedValue = kriData.frequenceKeyIndicator
        .toLowerCase()
        .trim();

      const foundOption = frequenciesOptions.find(
        (opt) => opt.value.toLowerCase() === normalizedValue
      );

      if (foundOption) {
        setValue("frequenceKeyIndicator", foundOption);
      } else {
        // Si la valeur n'existe pas dans les options, on l'ajoute comme option temporaire
        setValue("frequenceKeyIndicator", {
          value: kriData.frequenceKeyIndicator,
          label: kriData.frequenceKeyIndicator,
        });

        // Optionnel: ajouter cette valeur aux options disponibles
        frequenciesOptions.push({
          value: kriData.frequenceKeyIndicator,
          label: kriData.frequenceKeyIndicator,
        });
      }
    }
  }, [kriData, setValue, profilesOptions]);

  const onSubmit = async (data) => {
    setAmend(false)
    // Transformation des données avant soumission
    const formData = {
      ...data,
      category: data.category.value,
      thresholdType: data.thresholdType.value,
      ownerKeyIndicator: data.owner?.label,
      nomineeKeyIndicator: data.nominee?.label,
      reviewerKeyIndicator: data.reviewer?.label,
      frequenceKeyIndicator: data.frequenceKeyIndicator.label,
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
    }
    const postData = {
      itemIds: [kriData?._id],
      updates: formData,
    };
    await dispatch(updateKeyIndicator(postData));
    if (selectedEntity) {
      try {
        // Exécute les appels en parallèle pour meilleure performance
        dispatch(listEntityKeyIndicators({ entityId: selectedEntity?._id }));
      } catch (error) {
        console.error("Error fetching entity data:", error);
        // Gérer l'erreur ici (affichage à l'utilisateur, etc.)
      }
    } else {
      dispatch(listKeyIndicator());
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
    option: (provided, state) => ({
      ...provided,
      fontSize: "12px",
      color: state.isDisabled ? "#999" : "#333",
      backgroundColor: state.isDisabled ? "#eee" : "white",
      cursor: state.isDisabled ? "not-allowed" : "default",
      zIndex: 50,
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
  };

  const disabledOptions = ["daily", "weekly"];

  const handleAmend = () => {
    setAmend(true);
  }

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
            <Input
              {...register("entity")}
              defaultValue={kriData.departmentFunction}
              fontSize="12px"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="12px">Key Indicator Reference</FormLabel>
            <Input
              {...register("reference")}
              defaultValue={`KI${kriData.reference}`}
              isReadOnly
              fontSize="12px"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="12px">Description</FormLabel>
            <Textarea
              fontSize="12px"
              {...register("description")}
              defaultValue={kriData.riskIndicatorDescription}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="12px">Key Indicator Category</FormLabel>
            <Select
              name="category"
              options={categoryOptions}
              styles={customStyles}
              onChange={(selected) => setValue("category", selected)}
              value={watch("category")}
            />
          </FormControl>
        </SimpleGrid>

        <Divider mb={4} />

        {/* Tabs Section */}
        <Tabs variant="enclosed" index={tabIndex} onChange={setTabIndex}>
          <TabList>
            <Tab fontSize="12px">General</Tab>
            <Tab fontSize="12px" onClick={changeHistory}>
              History
            </Tab>
            <Tab fontSize="12px">Actions</Tab>
            <Tab fontSize="12px">Linked Items</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    gap={16}
                    marginBottom={4}
                  >
                    <FormLabel fontSize="12px">Owner:</FormLabel>
                    <Box width="100%">
                      <Select
                        name="owner"
                        options={profilesOptions}
                        styles={customStyles}
                        onChange={(selected) => setValue("owner", selected)}
                        value={watch("owner")}
                        placeholder="Select owner"
                        isClearable
                        isDisabled={!amend}
                      />
                    </Box>
                  </FormControl>

                  <FormControl
                    display="flex"
                    alignItems="center"
                    gap={12}
                    marginBottom={4}
                  >
                    <FormLabel fontSize="12px" marginRight={4}>
                      Nominee:
                    </FormLabel>
                    <Box width="100%">
                      <Select
                        name="nominee"
                        options={profilesOptions}
                        styles={customStyles}
                        onChange={(selected) => setValue("nominee", selected)}
                        value={watch("nominee")}
                        placeholder="Select nominee"
                        isClearable
                        isDisabled={!amend}
                      />
                    </Box>
                  </FormControl>

                  <FormControl
                    display="flex"
                    alignItems="center"
                    gap={12}
                    marginBottom={4}
                  >
                    <FormLabel fontSize="12px" marginRight={4}>
                      Reviewer:
                    </FormLabel>
                    <Box width="100%">
                      <Select
                        name="reviewer"
                        options={profilesOptions}
                        styles={customStyles}
                        onChange={(selected) => setValue("reviewer", selected)}
                        value={watch("reviewer")}
                        placeholder="Select reviewer"
                        isClearable
                        isDisabled={!amend}
                      />
                    </Box>
                  </FormControl>

                  <FormControl
                    display="flex"
                    alignItems="center"
                    gap={8}
                    marginBottom={4}
                  >
                    <FormLabel mb="0" whiteSpace="nowrap" fontSize="12px">
                      Review Date:
                    </FormLabel>
                    <Input
                      fontSize="12px"
                      {...register("reviewDate")}
                      type="date"
                      readOnly={!amend}
                    />
                  </FormControl>

                  <FormControl
                    display="flex"
                    alignItems="center"
                    marginBottom={4}
                  >
                    <Checkbox {...register("isActive")} defaultChecked mr={2} isDisabled={!amend} />
                    <FormLabel mb="0" fontSize="12px">Active Key Indicator</FormLabel>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="12px">Detailed Description</FormLabel>
                    <Textarea
                      fontSize="12px"
                      {...register("detailedDescription")}
                      defaultValue={kriData.riskIndicatorDescription}
                      readOnly={!amend}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    gap={4}
                    mb={4}
                  >
                    <FormLabel mb="0" whiteSpace="nowrap" fontSize="12px">
                      {" "}
                      Type of KI
                    </FormLabel>
                    <Input
                      fontSize="12px"
                      {...register("typeOfKi")}
                      defaultValue={kriData.type}
                      readOnly={!amend}
                    />
                  </FormControl>

                  <Box borderWidth="1px" borderRadius="md" p={4} mt={4}>
                    <Heading size="sm" mb={2}>
                      Thresholds
                    </Heading>
                    <FormControl
                      display="flex"
                      alignItems="center"
                      gap={4}
                      marginBottom={4}
                    >
                      <FormLabel fontSize="12px">Threshold</FormLabel>
                      <Box width="100%">
                        <Select
                          name="thresholdType"
                          options={thresholdOptions}
                          styles={customStyles}
                          onChange={(selected) =>
                            setValue("thresholdType", selected)
                          }
                          value={watch("thresholdType")}
                          isDisabled={!amend}
                        />
                      </Box>
                    </FormControl>
                    <FormControl
                      display="flex"
                      alignItems="center"
                      gap={10}
                      marginBottom={4}
                    >
                      <FormLabel fontSize="12px">Target</FormLabel>
                      <Input
                        fontSize="12px"
                        // {...register("target")}
                        defaultValue="0"
                        readOnly
                      />
                    </FormControl>
                    <Box mt={4} borderRadius="md" overflow="hidden">
                      <FormControl
                        display="flex"
                        alignItems="center"
                        gap={4}
                        marginBottom={4}
                      >
                        <Checkbox {...register("isPercentage")} mr={2} />
                        <FormLabel mb="0" fontSize="12px">
                          Thresholds are percentages
                        </FormLabel>
                      </FormControl>

                      <Box w="100%">
                        <HStack spacing={4} mb={2}>
                          <Text fontWeight="bold" w="30px">
                            R :
                          </Text>
                          <Input
                            fontSize="12px"
                            bg="red.400"
                            color="white"
                            size="sm"
                            value={kriData.escaladeKeyIndicator}
                            readOnly
                          />
                        </HStack>

                        <HStack spacing={4} mb={2}>
                          <Text fontWeight="bold" w="30px">
                            A :
                          </Text>
                          <Input
                            fontSize="12px"
                            bg="orange.300"
                            color="white"
                            size="sm"
                            value={kriData.seuilKeyIndicator}
                            readOnly
                          />
                        </HStack>

                        <HStack spacing={4}>
                          <Text fontWeight="bold" w="30px">
                            G :
                          </Text>
                          <Input
                            fontSize="12px"
                            bg="green.400"
                            color="white"
                            size="sm"
                            value={kriData.toleranceKeyIndicator}
                            readOnly
                          />
                        </HStack>
                      </Box>

                      <HStack spacing={4} mt={4} flexWrap="wrap">
                        <Box
                          width={{ base: "100%", md: "100%" }}
                          p={4}
                          borderWidth="1px"
                          borderRadius="md"
                          boxShadow="lg"
                          mt={4}
                        >
                          <FormControl mb={4}>
                            <HStack spacing={2} alignItems="center">
                              <Text fontWeight="bold" fontSize={12} mb={2}>
                                Frequency:
                              </Text>
                              <Box width="100%">
                                <Select
                                  name="frequenceKeyIndicator"
                                  placeholder="Select frequency"
                                  styles={customStyles}
                                  options={frequenciesOptions}
                                  value={watch("frequenceKeyIndicator")}
                                  onChange={(selected) =>
                                    setValue("frequenceKeyIndicator", selected)
                                  }
                                  isOptionDisabled={(option) =>
                                    !frequencies.some(
                                      (f) =>
                                        f.label.toLowerCase() ===
                                        option.value.toLowerCase()
                                    ) ||
                                    disabledOptions.includes(
                                      option.value.toLowerCase()
                                    )
                                  }
                                />
                              </Box>
                            </HStack>
                          </FormControl>
                          <FormControl>
                            <HStack spacing={2} alignItems="center">
                              <Text
                                fontWeight="bold"
                                fontSize={12}
                                mb="0"
                                whiteSpace="nowrap"
                              >
                                Remind On:
                              </Text>
                              <Input fontSize="12px" value={valueRemindOne} />
                            </HStack>
                          </FormControl>
                        </Box>
                      </HStack>

                      <Flex justifyContent="flex-end" mt={6}>
                        <Button
                          mt={4}
                          colorScheme="blue"
                          fontSize={12}
                          variant="solid"
                          width="auto"
                          minWidth="120px"
                          // onClick={() => setTabIndex(1)}
                          onClick={changeCapture}
                        >
                          Capture de la valeur
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </SimpleGrid>
              <Stack direction="row" spacing={4} mt={6} justify="flex-end">
                <Button onClick={handleAmend} colorScheme="blue" type="button" fontSize="12px">
                  Amend
                </Button>
                <Button colorScheme="green" type="submit" fontSize="12px" disabled={!amend}>
                  Save
                </Button>
                {!search && (
                  <Button
                    onClick={onClose}
                    colorScheme="red"
                    type="reset"
                    fontSize="12px"
                  >
                    Cancel
                  </Button>
                )}
              </Stack>
            </TabPanel>

            <TabPanel>
              <History
                kriData={kriData}
                profilesOptions={profilesOptions}
                setDataHostorie={setDataHostorie}
                valuePeriod={valuePeriod}
                valueRemindOne={valueRemindOne}
                historiesKRI={histories}
                average={average}
                isHistory={isHistory}
                onCancel={() => setTabIndex(0)}
              />
            </TabPanel>

            <TabPanel>
              {/* <Action kriData={kriData} profilesOptions={profilesOptions} /> */}
              <ActionForm
                isActionTab={true}
                profilesOptions={profilesOptions}
                actionsKRI={actionsKRI}
              />
            </TabPanel>

            <TabPanel>
              <p>Linked Items content here...</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </form>
    </Box>
  );
};

export default KeyIndicatorComponent;
