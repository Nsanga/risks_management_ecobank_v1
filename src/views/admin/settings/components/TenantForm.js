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
  Box,
  Text,
  Icon,
  Flex,
  Avatar,
  useColorModeValue,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { listTenants } from "redux/tenant/action";
import { url } from "urlLoader";
import { FiUpload, FiImage, FiX, FiSave } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa6";

const TenantForm = ({ isOpen, onClose, tenant, viderTenantChoice }) => {
  const [form, setForm] = useState({
    name: "",
    tenantId: "",
    primaryColor: "#2B6CB0",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  // Theme colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const labelColor = useColorModeValue("gray.700", "gray.300");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const gradientBg = useColorModeValue(
    "linear(to-r, blue.400, purple.500)",
    "linear(to-r, blue.600, purple.700)"
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const body = new FormData();
      body.append("name", form.name);
      body.append("tenantId", form.tenantId);
      body.append("primaryColor", form.primaryColor);
      if (form.logo) {
        body.append("logo", form.logo);
      }

      const method = tenant ? "PUT" : "POST";
      const endpoint = tenant
        ? `${url}/api/v1/tenant/${tenant?._id}`
        : `${url}/api/v1/tenant`;

      const res = await fetch(endpoint, {
        method,
        body,
      });

      if (res.ok) {
        toast({
          title: tenant ? "Organisation mise à jour" : "Organisation créée",
          description: "Les modifications ont été enregistrées avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        dispatch(listTenants());
      } else {
        const errorData = await res.json();
        toast({
          title: "Erreur",
          description: errorData.message || "Erreur inconnue",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, logo: file });
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setForm({ ...form, logo: null });
    setLogoPreview(null);
  };

  useEffect(() => {
    if (tenant) {
      setForm({
        name: tenant.name,
        tenantId: tenant.tenantId,
        primaryColor: tenant.primaryColor,
        logo: tenant.logo,
      });
      if (tenant.logo) {
        setLogoPreview(tenant.logo);
      }
    } else {
      // Reset form when creating new tenant
      setForm({
        name: "",
        tenantId: "",
        primaryColor: "#2B6CB0",
        logo: null,
      });
      setLogoPreview(null);
    }
  }, [tenant]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        bg={bgColor}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="2xl"
        mx={4}
      >
        {/* Header avec gradient */}
        <Box bgGradient={gradientBg} borderTopRadius="2xl" p={6} color="white">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <Icon as={FaBuilding} fontSize="24px" />
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  {tenant
                    ? "Mise à jour de l'organisation"
                    : "Nouvelle Organisation"}
                </Text>
                <Text fontSize="sm" opacity={0.8}>
                  {tenant
                    ? "Modifiez les informations de votre organisation"
                    : "Créez une nouvelle organisation"}
                </Text>
              </Box>
            </Flex>
            <ModalCloseButton
              position="static"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={() => {
                onClose(); // ferme la modale
                viderTenantChoice(); // nettoie la sélection
              }}
            />
          </Flex>
        </Box>

        <ModalBody p={8}>
          <VStack spacing={6} align="stretch">
            <Box>
              <FormLabel color={labelColor} fontWeight="semibold" mb={3}>
                Logo de l'organisation
              </FormLabel>
              <Flex align="center" gap={4}>
                <Avatar
                  size="lg"
                  src={logoPreview}
                  bg="gray.200"
                  icon={<Icon as={FiImage} fontSize="24px" />}
                  borderRadius="xl"
                  objectFit="cover"
                />
                <Box flex={1}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    display="none"
                    id="logo-upload"
                  />
                  <Flex gap={2}>
                    <Button
                      as="label"
                      htmlFor="logo-upload"
                      leftIcon={<Icon as={FiUpload} />}
                      size="sm"
                      variant="outline"
                      cursor="pointer"
                      _hover={{ bg: inputBg }}
                    >
                      Choisir un fichier
                    </Button>
                    {logoPreview && (
                      <IconButton
                        icon={<Icon as={FiX} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={removeLogo}
                        aria-label="Supprimer le logo"
                      />
                    )}
                  </Flex>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Formats acceptés: PNG, JPG, SVG (max 2MB)
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Divider />

            <FormControl>
              <FormLabel color={labelColor} fontWeight="semibold">
                Nom de l'organisation
              </FormLabel>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Ma Super Entreprise"
                bg={inputBg}
                border="2px solid transparent"
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: form.primaryColor,
                  bg: "white",
                  boxShadow: `0 0 0 1px ${form.primaryColor}`,
                }}
                borderRadius="lg"
                size="lg"
              />
            </FormControl>

            <FormControl>
              <FormLabel color={labelColor} fontWeight="semibold">
                Identifiant unique (Tenant ID)
              </FormLabel>
              <Input
                value={form.tenantId}
                onChange={(e) =>
                  setForm({ ...form, tenantId: e.target.value.toLowerCase() })
                }
                placeholder="ex: ecobank"
                bg={inputBg}
                border="2px solid transparent"
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: form.primaryColor,
                  bg: "white",
                  boxShadow: `0 0 0 1px ${form.primaryColor}`,
                }}
                borderRadius="lg"
                size="lg"
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Uniquement des lettres minuscules et chiffres, sans espaces
              </Text>
            </FormControl>

            <FormControl>
              <FormLabel color={labelColor} fontWeight="semibold">
                Couleur principale
              </FormLabel>
              <Flex align="center" gap={4}>
                <Box
                  w={16}
                  h={12}
                  bg={form.primaryColor}
                  borderRadius="lg"
                  border="3px solid white"
                  boxShadow="0 0 0 1px rgba(0,0,0,0.1)"
                  position="relative"
                  cursor="pointer"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) =>
                      setForm({ ...form, primaryColor: e.target.value })
                    }
                    position="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    opacity={0}
                    cursor="pointer"
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" color={labelColor}>
                    {form.primaryColor.toUpperCase()}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Cette couleur sera utilisée dans l'interface
                  </Text>
                </Box>
              </Flex>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter p={8} pt={0}>
          <Flex gap={3} w="full" justify="flex-end">
            <Button
              // onClick={onClose}
              onClick={() => {
                onClose();
                viderTenantChoice();
              }}
              variant="ghost"
              size="lg"
              borderRadius="lg"
            >
              Annuler
            </Button>
            <Button
              leftIcon={<Icon as={FiSave} />}
              bg={form.primaryColor}
              color="white"
              size="lg"
              borderRadius="lg"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Enregistrement..."
              _hover={{
                bg: form.primaryColor,
                filter: "brightness(1.1)",
                transform: "translateY(-1px)",
              }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
              minW="140px"
            >
              Enregistrer
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TenantForm;
