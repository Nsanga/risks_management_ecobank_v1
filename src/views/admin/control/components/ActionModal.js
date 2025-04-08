import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Select from "react-select";

const ActionModal = ({
  isOpen,
  onClose,
  actionData,
  setActionData,
  onConfirm,
  profileOptions,
  entitiesOptions,
}) => {
  console.log("profileOptions", profileOptions);

  // Créer les options de pourcentage
  const percentageOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1) * 10, // Valeur de 10 à 100
    label: `${(i + 1) * 10}%`, // Affichage sous forme de pourcentage
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "12px",
      maxHeight: "200px", // Définir une hauteur maximale pour le menu
      overflowY: "auto", // Activer le défilement vertical
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
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Action</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Description de l’action</FormLabel>
            <Textarea
              value={actionData.descriptionAction}
              onChange={(e) =>
                setActionData({
                  ...actionData,
                  descriptionAction: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Délais</FormLabel>
            <Input
              type="date"
              value={actionData.delaisAction}
              onChange={(e) =>
                setActionData({ ...actionData, delaisAction: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Propriétaire de l’action</FormLabel>
            <Select
              placeholder="Select Owner"
              options={profileOptions}
              styles={customStyles}
              value={profileOptions?.find(
                (option) => option.label === actionData.proprioAction
              )}
              onChange={(selectedOption) => {
                setActionData({
                  ...actionData,
                  proprioAction: selectedOption.label, // Récupérer le label
                  emailProprio: selectedOption.email, // Récupérer l'email
                });
              }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Entité</FormLabel>
            <Select
              options={entitiesOptions}
              styles={customStyles}
              placeholder="Select Entity"
              value={entitiesOptions?.find(
                (ent) => ent.value === actionData.idEntity
              )}
              onChange={(selectedOption) => {
                setActionData({
                  ...actionData,
                  idEntity: selectedOption.value, // Récupérer le value
                });
              }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Évolution</FormLabel>
            <Select
              options={percentageOptions}
              value={percentageOptions.find(option => option.value === actionData.evolutionAction)}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  setActionData({
                    ...actionData,
                    evolutionAction: selectedOption.value, // Mettre à jour avec la valeur sélectionnée
                  });
                }
              }}
              placeholder="Sélectionnez un pourcentage"
              className="z-10"
              // styles={customStyles}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Annuler
          </Button>
          <Button colorScheme="blue" ml={3} onClick={onConfirm}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActionModal;
