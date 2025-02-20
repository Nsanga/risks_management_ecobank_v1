import { Spinner, IconButton, Box, AlertIcon, AlertTitle, AlertDescription, Alert } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FiImage, FiVideo } from 'react-icons/fi'; // Importer les icônes de react-icons
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { url } from 'urlLoader';
import { FaFile, FaFileVideo, FaUpload } from 'react-icons/fa';

const DocumentUploader = ({ onMediaUpload, initialDocuments }) => {
    console.log('initialDocuments', initialDocuments)
    const [mediaData, setMediaData] = useState(initialDocuments || []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setError(null);
        const newMediaData = [];

        acceptedFiles.forEach(file => {
            if (file.size > 20 * 1024 * 1024) {
                setError('La taille du fichier dépasse la limite de 20 Mo.');
                return;
            }

            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const binaryStr = reader.result;
                newMediaData.push({ dataURL: binaryStr, file });
                setMediaData(prevState => [...prevState, ...newMediaData]);
            };
            reader.readAsDataURL(file);
        });

        // Après la lecture des fichiers, initier le téléchargement
        if (acceptedFiles.length > 0) {
            uploadToCloudinary(acceptedFiles);
        }
    }, []);

    const uploadToCloudinary = async (files) => {
        setIsLoading(true);
        const formData = new FormData();
        files.forEach(file => formData.append('files', file)); // Ajouter tous les fichiers
        formData.append('upload_preset', 'your_upload_preset');

        try {
            const response = await fetch(`${url}/api/v1/upload/files`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log('Réponse de l\'upload Cloudinary:', data);

            // Vérifier si data.data.downloadLinks est un tableau avant de l'utiliser
            if (Array.isArray(data.data.downloadLinks)) {
                onMediaUpload(data.data.downloadLinks); // Appel du callback avec les liens
            } else {
                console.error('Les liens de téléchargement ne sont pas un tableau:', data.data.downloadLinks);
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement des fichiers:', error);
            setError('Erreur lors du téléchargement des fichiers.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveMedia = (file) => {
        setMediaData(prevState => prevState.filter(media => media.file !== file));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: 20 * 1024 * 1024,
        multiple: true
    });

    return (
        <div {...getRootProps()} style={{ display: 'flex', flexDirection: 'row', border: '2px dashed #ccc', padding: '20px', justifyContent: 'center' }}>
            <input {...getInputProps()} />

            {mediaData.length > 0 && (
                <Box mt={4} display="flex" justifyContent='center' alignItems="center" mr={2}>
                    {mediaData.map((media, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                            {typeof media === 'string' ? (
                                <img src="{media}" alt="Aperçu du document" style={{ maxWidth: '50%', maxHeight: '100px' }} />
                            ) : media.file.type.startsWith('image') ? (
                                <img src={media.dataURL} alt="Aperçu du média" style={{ maxWidth: '50%', maxHeight: '100px' }} />
                            ) : media.file.type.startsWith('video') ? (
                                <Box display="flex" flexDirection='column' justifyContent='center' alignItems="center">
                                    <FaFileVideo size={50} style={{ marginRight: '10px' }} />
                                    <Box>{media.file.name}</Box>
                                </Box>
                            ) : (
                                <Box display="flex" flexDirection='column' justifyContent='center' alignItems="center">
                                    <FaFile size={50} style={{ marginRight: '10px' }} />
                                    <Box>{media.file.name}</Box>
                                </Box>
                            )}
                            <IconButton
                                icon={<CloseIcon />}
                                aria-label="Supprimer le fichier"
                                onClick={() => handleRemoveMedia(media.file)}
                                variant="ghost"
                                size="sm"
                                colorScheme="red"
                            />
                        </Box>
                    ))}
                </Box>
            )}
            <div style={{ cursor: 'pointer' }}><FaUpload size='70px' /></div>
            {isLoading && <Spinner color='blue.500' size='sm' />}
            {error && (
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>Erreur de téléchargement!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default DocumentUploader;
