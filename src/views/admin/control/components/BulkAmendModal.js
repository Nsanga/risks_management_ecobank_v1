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
import Select from "react-select";
import { updateEntityRiskControl } from "redux/entityRiskControl/action";
import { useDispatch } from "react-redux";

const BulkAmendModal = ({ isOpen, onClose, profiles = [], onSave, selectedRows = [], itemType }) => {
  const [owner, setOwner] = React.useState(null);
  const [nominee, setNominee] = React.useState(null);
  const [reviewer, setReviewer] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const profileOptions = profiles.map((profile) => ({
    value: profile._id,
    label: profile.name,
  }));

  const handleSave = () => {
    console.log(selectedRows);
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

    const payload = {
      itemIds: selectedRows,
      itemType: itemType,
      updates: itemType === "risk" ? {
        ownerRisk: owner.label,
        nomineeRisk: nominee.label,
        reviewerRisk: reviewer ? reviewer.label : null,
      } : {
        ownerControl: owner.label,
        nomineeControl: nominee.label,
        reviewerControl: reviewer ? reviewer.label : null,
      },
    };
    console.log(payload);
    dispatch(updateEntityRiskControl(payload));

    onClose(); // Fermer la modal après sauvegarde
    setOwner(null);
    setNominee(null);
    setReviewer(null);
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
        </ModalBody>

        <ModalFooter>
        <Button colorScheme="red" fontSize={12} onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            fontSize={12}
            onClick={handleSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BulkAmendModal;
