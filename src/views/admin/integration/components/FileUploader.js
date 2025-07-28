import { useState, useCallback } from 'react';
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useToast,
    Progress,
    VStack,
    Avatar
} from '@chakra-ui/react';
import { FiUpload, FiCheck, FiX, FiFile } from 'react-icons/fi';
import axios from 'axios';
import { url } from 'urlLoader';
import { getTenantFromSubdomain } from 'utils/getTenant';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const tenantId = getTenantFromSubdomain();
    const toast = useToast();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
                toast({
                    title: 'Fichier trop volumineux',
                    description: 'La taille maximale est de 10MB',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = useCallback(async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file); // 'file' est le nom du champ attendu par l'API

        try {
            const response = await axios.post(`${url}/api/v1/risks-controls/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'x-tenant-id': tenantId
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(progress);
                    }
                },
            });

            setIsUploading(false);
            toast({
                title: 'Upload réussi',
                description: `${file.name} a été uploadé avec succès`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Réinitialiser après succès (optionnel)
            setFile(null);
            setUploadProgress(0);

            // Retourner la réponse de l'API si nécessaire
            return response.data;

        } catch (error) {
            setIsUploading(false);
            setUploadProgress(0);

            let errorMessage = "Échec de l'upload du fichier";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }

            toast({
                title: 'Erreur',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });

            throw error;
        }
    }, [file, toast]);

    const handleCancel = () => {
        setFile(null);
        setUploadProgress(0);
        setIsUploading(false);
    };

    const getFileIcon = () => {
        if (!file) return null;
        const extension = file.name.split('.').pop()?.toLowerCase();

        // Vous pouvez ajouter plus de types de fichiers ici
        const icons = {
            pdf: 'red',
            doc: 'blue',
            docx: 'blue',
            xls: 'green',
            xlsx: 'green',
            jpg: 'purple',
            png: 'purple',
            default: 'gray'
        };

        return icons[extension || 'default'] || icons.default;
    };

    return (
        <Box
            p={6}
            border="2px dashed"
            borderColor="gray.200"
            borderRadius="lg"
            bg="white"
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{
                borderColor: 'blue.300',
                boxShadow: 'md'
            }}
        >
            <VStack spacing={4} align="center">
                {!file ? (
                    <>
                        <Avatar
                            size="xl"
                            icon={<Icon as={FiUpload} boxSize={8} />}
                            bg="blue.50"
                            color="blue.500"
                        />
                        <Text fontSize="lg" fontWeight="medium" color="gray.600">
                            Glissez-déposez votre fichier ici ou
                        </Text>
                        <Button
                            as="label"
                            colorScheme="blue"
                            variant="outline"
                            cursor="pointer"
                            leftIcon={<FiUpload />}
                        >
                            Sélectionner un fichier
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                            />
                        </Button>
                        <Text fontSize="sm" color="gray.500">
                            Formats supportés: PDF, DOC, XLS, JPG, PNG (max. 10MB)
                        </Text>
                    </>
                ) : (
                    <>
                        <Flex align="center" w="full" p={4} bg="gray.50" borderRadius="md">
                            <Icon
                                as={FiFile}
                                boxSize={6}
                                color={`${getFileIcon()}.500`}
                                mr={3}
                            />
                            <Box flex={1}>
                                <Text fontWeight="medium" isTruncated>
                                    {file.name}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </Text>
                            </Box>
                            {!isUploading ? (
                                <Icon
                                    as={FiX}
                                    boxSize={5}
                                    color="red.500"
                                    cursor="pointer"
                                    onClick={handleCancel}
                                />
                            ) : null}
                        </Flex>

                        {isUploading && (
                            <Box w="full">
                                <Progress
                                    value={uploadProgress}
                                    size="sm"
                                    colorScheme="blue"
                                    borderRadius="full"
                                    mb={2}
                                />
                                <Text fontSize="sm" textAlign="right" color="gray.500">
                                    {uploadProgress}%
                                </Text>
                            </Box>
                        )}

                        <Flex w="full" justify="flex-end" gap={3}>
                            {!isUploading && (
                                <Button
                                    variant="outline"
                                    colorScheme="red"
                                    onClick={handleCancel}
                                >
                                    Annuler
                                </Button>
                            )}
                            <Button
                                colorScheme="blue"
                                onClick={handleUpload}
                                isLoading={isUploading}
                                loadingText="Upload en cours..."
                                rightIcon={!isUploading ? <FiCheck /> : undefined}
                                isDisabled={isUploading}
                            >
                                {isUploading ? '' : 'Uploader'}
                            </Button>
                        </Flex>
                    </>
                )}
            </VStack>
        </Box>
    );
};

export default FileUploader;