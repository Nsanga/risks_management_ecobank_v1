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
import { listTenants } from "redux/tenant/action";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../../assets/img/loader.gif'

const SettingsPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { tenants, loading } = useSelector((state) => state.TenantReducer);

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listTenants());
    }, [dispatch]);

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
                    {isOpen && <TenantForm isOpen={isOpen} onClose={onClose} />}
                </Box>
            )}
        </Card>
    );
};

export default SettingsPage;
