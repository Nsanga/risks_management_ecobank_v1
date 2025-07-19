import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    VStack,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const TenantForm = ({ isOpen, onClose, onSaved }) => {
    const [form, setForm] = useState({
      name: "",
      tenantId: "",
      primaryColor: "#2B6CB0",
      logo: null,
    });
  
    const toast = useToast();
  
    const handleSubmit = async () => {
      const body = new FormData();
      body.append("name", form.name);
      body.append("tenantId", form.tenantId);
      body.append("primaryColor", form.primaryColor);
      if (form.logo) {
        body.append("logo", form.logo);
      }
  
      const res = await fetch("/api/tenants", {
        method: "POST",
        body,
      });
  
      if (res.ok) {
        toast({ title: "Organisation créée", status: "success" });
        onClose();
        onSaved();
      } else {
        toast({ title: "Erreur", status: "error" });
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle Organisation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </FormControl>
  
              <FormControl>
                <FormLabel>Tenant ID (ex: ecobank)</FormLabel>
                <Input
                  value={form.tenantId}
                  onChange={(e) =>
                    setForm({ ...form, tenantId: e.target.value.toLowerCase() })
                  }
                />
              </FormControl>
  
              <FormControl>
                <FormLabel>Couleur principale</FormLabel>
                <Input
                  type="color"
                  value={form.primaryColor}
                  onChange={(e) =>
                    setForm({ ...form, primaryColor: e.target.value })
                  }
                />
              </FormControl>
  
              <FormControl>
                <FormLabel>Logo</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, logo: e.target.files[0] })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              Enregistrer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default TenantForm;
  