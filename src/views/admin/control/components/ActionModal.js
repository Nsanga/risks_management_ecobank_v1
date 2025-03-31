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
  Select,
  Textarea,
} from "@chakra-ui/react";

const ActionModal = ({ isOpen, onClose, actionData, setActionData, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Action</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Description de l’action</FormLabel>
            <Textarea
              value={actionData.description}
              onChange={(e) =>
                setActionData({ ...actionData, description: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Délai</FormLabel>
            <Input
              type="date"
              value={actionData.delais}
              onChange={(e) =>
                setActionData({ ...actionData, delais: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Propriétaire de l’action</FormLabel>
            <Input
              type="text"
              value={actionData.proprietaire}
              onChange={(e) =>
                setActionData({ ...actionData, proprietaire: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Entité</FormLabel>
            <Select
              value={actionData.entite}
              onChange={(e) =>
                setActionData({ ...actionData, entite: e.target.value })
              }
            >
              <option value="">Sélectionnez une entité</option>
              <option value="Entité 1">Entité 1</option>
              <option value="Entité 2">Entité 2</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Évolution</FormLabel>
            <Input
              type="text"
              value={actionData.evolution}
              onChange={(e) =>
                setActionData({ ...actionData, evolution: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Annuler</Button>
          <Button colorScheme="green" ml={3} onClick={onConfirm}>Confirmer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActionModal;
