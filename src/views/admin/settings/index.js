import {
    Box,
    Heading,
    Button,
    Grid,
    Image,
    Text,
    VStack,
    useDisclosure,
    Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TenantForm from "./components/TenantForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Card from 'components/card/Card';
import { AddIcon } from "@chakra-ui/icons";

const SettingsPage = () => {
    const [tenants, setTenants] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const history = useHistory();

    useEffect(() => {
        // Appelle l’API pour charger tous les tenants
        fetch("/api/tenants")
            .then((res) => res.json())
            .then((data) => setTenants(data.tenants || []))
            .catch((err) => console.error("Erreur chargement tenants", err));
    }, []);

    return (
        <Card mt="100px">

            <Box p={6}>
                <Flex justifyContent="space-between">
                    <Heading mb={6}>Organisations</Heading>

                    <Button fontSize={12}
                        variant="solid"
                        colorScheme="blue"
                        leftIcon={<AddIcon />} onClick={onOpen}
                    >
                        Ajouter une organisation
                    </Button>
                </Flex>

                <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
                    {tenants.map((tenant) => (
                        <Box
                            key={tenant._id}
                            p={4}
                            borderWidth="1px"
                            borderRadius="md"
                            cursor="pointer"
                            _hover={{ boxShadow: "md", bg: "gray.50" }}
                            onClick={() => history.push(`/settings/${tenant._id}`)}
                        >
                            <VStack>
                                <Image
                                    src={tenant.logo || "/default-logo.png"}
                                    alt="logo"
                                    boxSize="80px"
                                    objectFit="contain"
                                />
                                <Text fontWeight="bold">{tenant.name}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    ID : {tenant.tenantId}
                                </Text>
                            </VStack>
                        </Box>
                    ))}
                </Grid>

                {/* Modal/Form pour ajout */}
                {isOpen && <TenantForm isOpen={isOpen} onClose={onClose} onSaved={() => window.location.reload()} />}
            </Box>
        </Card>
    );
};

export default SettingsPage;
