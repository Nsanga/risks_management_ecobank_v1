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
  Select,
  useToast,
} from "@chakra-ui/react";

const BulkAmendModal = ({ isOpen, onClose, profiles, onSave, selectedRows }) => {
  const [owner, setOwner] = React.useState("");
  const [nominee, setNominee] = React.useState("");
  const [reviewer, setReviewer] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const toast = useToast();

  const handleSave = () => {
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
      owner,
      nominee,
      reviewer,
      selectedRows, // Passer les lignes sélectionnées
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
              fontSize={12}
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              isDisabled={!isEditing}
            >
              {profiles.map((profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel fontSize={12}>Nominee</FormLabel>
            <Select
              placeholder="Select Nominee"
              fontSize={12}
              value={nominee}
              onChange={(e) => setNominee(e.target.value)}
              isDisabled={!isEditing}
            >
              {profiles.map((profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={12}>Reviewer</FormLabel>
            <Select
              placeholder="Select Reviewer"
              fontSize={12}
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              isDisabled={!isEditing}
            >
              {profiles.map((profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {isEditing ? (
            <>
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
            </>
          ) : (
            <Button colorScheme="blue" fontSize={12} onClick={handleAmend}>
              Amend
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BulkAmendModal;