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
  Textarea,
} from "@chakra-ui/react";

const BulkAmendModal = ({ isOpen, onClose, profiles, onSave, selectedRows }) => {
  const [owner, setOwner] = React.useState("");
  const [nominee, setNominee] = React.useState("");
  const [reviewer, setReviewer] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSave = () => {
    // Passer les valeurs sélectionnées à la fonction onSave
    onSave({
      owner,
      nominee,
      reviewer,
      description,
      selectedRows, // Passer les lignes sélectionnées
    });
    onClose(); // Fermer la modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={14}>Bulk Amend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel fontSize={12}>Owner</FormLabel>
            <Select
              placeholder="Select Owner"
              fontSize={12}
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            >
              {profiles.map((profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={12}>Nominee</FormLabel>
            <Select
              placeholder="Select Nominee"
              fontSize={12}
              value={nominee}
              onChange={(e) => setNominee(e.target.value)}
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
            >
              {profiles.map((profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={12}>Description</FormLabel>
            <Textarea
              placeholder="Enter description"
              fontSize={12}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" fontSize={12} mr={3} onClick={handleSave}>
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