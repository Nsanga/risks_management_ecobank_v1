// BulkAmendModal.js
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import Select from "react-select"; // Import de react-select

const BulkAmendModal = ({ isOpen, onClose, profiles = [], onSave, selectedRows = [] }) => {
  const [owner, setOwner] = React.useState(null);
  const [nominee, setNominee] = React.useState(null);
  const [reviewer, setReviewer] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const toast = useToast();

  // Convertir les profils en format compatible avec react-select
  const profileOptions = profiles.map((profile) => ({
    value: profile._id,
    label: profile.name,
  }));

  const handleSave = () => {
    console.log(selectedRows)
    // Vérifier que owner et nominee sont remplis
    if (!owner || !nominee) {
      toast({
        title: "Erreur",
        description: "Owner et Nominee sont obligatoires.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Passer les valeurs sélectionnées à la fonction onSave
    onSave({
      owner: owner.value,
      nominee: nominee.value,
      reviewer: reviewer ? reviewer.value : null,
      selectedRows, // Passer les IDs des risques sélectionnés
    });
    onClose(); // Fermer la modal
  };

  const handleAmend = () => {
    setIsEditing(true); // Activer l'édition
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={14}>Bulk Amend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel fontSize={12}>Owner</FormLabel>
            <Select
              placeholder="Select Owner"
              options={profileOptions}
              value={owner}
              onChange={(selectedOption) => setOwner(selectedOption)}
              // isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel fontSize={12}>Nominee</FormLabel>
            <Select
              placeholder="Select Nominee"
              options={profileOptions}
              value={nominee}
              onChange={(selectedOption) => setNominee(selectedOption)}
              // isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={12}>Reviewer</FormLabel>
            <Select
              placeholder="Select Reviewer"
              options={profileOptions}
              value={reviewer}
              onChange={(selectedOption) => setReviewer(selectedOption)}
              // isDisabled={!isEditing}
            />
          </FormControl>

          {/* Afficher les IDs des risques sélectionnés (pour débogage) */}
          <FormControl mb={4}>
            <FormLabel fontSize={12}>Risques sélectionnés</FormLabel>
            <div>
              {selectedRows.map((rowId) => (
                <span key={rowId} style={{ marginRight: "8px" }}>
                  {rowId}
                </span>
              ))}
            </div>
          </FormControl>
        </ModalBody>
        <ModalFooter>
              <Button
                colorScheme="blue"
                fontSize={12}
                mr={3}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button colorScheme="red" fontSize={12} onClick={onClose}>
                Cancel
              </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BulkAmendModal;