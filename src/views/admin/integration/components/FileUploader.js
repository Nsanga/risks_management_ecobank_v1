import { useState, useCallback, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from 'redux/uploadFile/action';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const toast = useToast();

    // Récupération des états depuis le store Redux
    const { loading, progress, error, success } = useSelector(state => state.UploadReducer);

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

    // Gestion de l'upload
    const handleUpload = useCallback(() => {
        if (!file) return;

        dispatch(uploadFile(file));
    }, [file, dispatch]);

    // Effets pour les notifications
    useEffect(() => {
        if (error) {
            toast({
                title: 'Erreur',
                description: error,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }, [error, toast]);

    useEffect(() => {
        if (success) {
            toast({
                title: 'Succès',
                description: 'Fichier uploadé avec succès',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setFile(null); // Réinitialiser après succès
        }
    }, [success, toast]);

    const handleCancel = () => {
        setFile(null);
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
                            {!loading ? (
                                <Icon
                                    as={FiX}
                                    boxSize={5}
                                    color="red.500"
                                    cursor="pointer"
                                    onClick={handleCancel}
                                />
                            ) : null}
                        </Flex>

                        {loading && (
                            <Box w="full">
                                <Progress
                                    value={progress}
                                    size="sm"
                                    colorScheme="blue"
                                    borderRadius="full"
                                    mb={2}
                                />
                                <Text fontSize="sm" textAlign="right" color="gray.500">
                                    {progress}%
                                </Text>
                            </Box>
                        )}

                        <Flex w="full" justify="flex-end" gap={3}>
                            {!loading && (
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
                                isLoading={loading}
                                loadingText="Upload en cours..."
                                rightIcon={!loading ? <FiCheck /> : undefined}
                                isDisabled={loading}
                            >
                                {loading ? '' : 'Uploader'}
                            </Button>
                        </Flex>
                    </>
                )}
            </VStack>
        </Box>
    );
};

export default FileUploader;