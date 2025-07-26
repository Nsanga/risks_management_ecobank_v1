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
    Icon,
    Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TenantForm from "./components/TenantForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Card from 'components/card/Card';
import { AddIcon } from "@chakra-ui/icons";
import { listTenants } from "redux/tenant/action";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../../assets/img/loader.gif'
import { FaBuilding } from "react-icons/fa";

const SettingsPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tenant, setTenant] = useState();
    const { tenants, loading } = useSelector((state) => state.TenantReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listTenants());
    }, [dispatch]);

    const handleUpdate = (tenant_selected) => {
        setTenant(tenant_selected);
        onOpen();
    }

    return (
        <Card mt="100px">
            {loading ? (
                <Flex alignItems='center' justifyContent='center'>
                    <Image src={Loader} alt="Loading..." height={25} width={25} />
                </Flex>
            ) : (
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
                                position="relative"
                                p={6}
                                borderWidth="2px"
                                borderColor="gray.200"
                                borderRadius="2xl"
                                cursor="pointer"
                                bg="white"
                                transition="all 0.3s ease"
                                _hover={{
                                    transform: "translateY(-4px)",
                                    boxShadow: "xl",
                                    borderColor: tenant.primaryColor || "blue.400",
                                    bg: "gray.50"
                                }}
                                _active={{ transform: "translateY(-2px)" }}
                                onClick={() => handleUpdate(tenant)}
                                overflow="hidden"
                            >
                                {/* Bande colorée en haut */}
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    h="4px"
                                    bg={tenant.primaryColor || "blue.400"}
                                    bgGradient={`linear(to-r, ${tenant.primaryColor || "blue.400"}, ${tenant.primaryColor || "blue.400"}88)`}
                                />

                                {/* Badge couleur */}
                                <Box
                                    position="absolute"
                                    top={4}
                                    right={4}
                                    w={4}
                                    h={4}
                                    borderRadius="full"
                                    bg={tenant.primaryColor || "blue.400"}
                                    border="2px solid white"
                                    boxShadow="sm"
                                />

                                <VStack spacing={4} align="center">
                                    {/* Container logo avec effet */}
                                    <Box
                                        position="relative"
                                        borderRadius="xl"
                                        overflow="hidden"
                                        bg="gray.100"
                                        p={2}
                                        border="3px solid"
                                        borderColor="gray.200"
                                        transition="all 0.3s ease"
                                        _groupHover={{ borderColor: tenant.primaryColor || "blue.400" }}
                                    >
                                        <Image
                                            src={tenant.logo || "/default-logo.png"}
                                            alt={`Logo ${tenant.name}`}
                                            boxSize="80px"
                                            objectFit="contain"
                                            borderRadius="lg"
                                            fallback={
                                                <Box
                                                    boxSize="80px"
                                                    bg="gray.200"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    borderRadius="lg"
                                                >
                                                    <Icon as={FaBuilding} fontSize="24px" color="gray.500" />
                                                </Box>
                                            }
                                        />
                                    </Box>

                                    {/* Informations */}
                                    <VStack spacing={2} align="center">
                                        <Text
                                            fontWeight="bold"
                                            fontSize="lg"
                                            textAlign="center"
                                            color="gray.800"
                                            noOfLines={2}
                                        >
                                            {tenant.name}
                                        </Text>

                                        {/* Badge ID */}
                                        <Badge
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            bg={`${tenant.primaryColor || "blue.400"}15`}
                                            color={tenant.primaryColor || "blue.400"}
                                            fontSize="xs"
                                            fontWeight="semibold"
                                            border="1px solid"
                                            borderColor={`${tenant.primaryColor || "blue.400"}30`}
                                        >
                                            ID: {tenant.tenantId}
                                        </Badge>

                                        {/* Indicateur de couleur avec texte */}
                                        <Flex align="center" gap={2}>
                                            <Box
                                                w={3}
                                                h={3}
                                                borderRadius="full"
                                                bg={tenant.primaryColor || "blue.400"}
                                                border="1px solid white"
                                                boxShadow="0 0 0 1px rgba(0,0,0,0.1)"
                                            />
                                            <Text fontSize="xs" color="gray.500" fontWeight="medium">
                                                {(tenant.primaryColor || "#2B6CB0").toUpperCase()}
                                            </Text>
                                        </Flex>
                                    </VStack>
                                </VStack>

                                {/* Effet de shine au hover */}
                                <Box
                                    position="absolute"
                                    top="-50%"
                                    left="-50%"
                                    w="200%"
                                    h="200%"
                                    bg="linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)"
                                    transform="translateX(-100%)"
                                    transition="transform 0.6s"
                                    _groupHover={{ transform: "translateX(100%)" }}
                                    pointerEvents="none"
                                />
                            </Box>
                        ))}
                    </Grid>

                    {/* Modal/Form pour ajout */}
                    {isOpen && <TenantForm isOpen={isOpen} onClose={onClose} tenant={tenant} />}
                </Box>
            )}
        </Card>
    );
};

export default SettingsPage;
