import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Link,
  Flex,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import { connect, useDispatch } from "react-redux";
import { listKeyIndicator } from "redux/kri/action";
import Loader from '../../../../assets/img/loader.gif';
import KeyIndicatorComponent from "./KeyIndicatorComponent"; // ajuste le path selon ton projet

const truncateWords = (text = "", limit = 40) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

const KriCard = ({ keyIndicator, loading }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedKri, setSelectedKri] = useState(null);

  useEffect(() => {
    dispatch(listKeyIndicator());
  }, [dispatch]);

  const handleOpenKIs = (kri) => {
    console.log(kri)
    setSelectedKri(kri);
    onOpen();
  };

  const hasKIs = keyIndicator?.length > 0;

  return (
    <Box>
      {loading ? (
        <Flex alignItems='center' justifyContent='center'>
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : hasKIs ? (
        keyIndicator.map((kri, idx) => (
          <Box
            key={idx}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
            bg="white"
            mb={3}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            onClick={() => handleOpenKIs(kri)}
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
          >
            <Box mb={2}>
              <Flex alignItems="center">
                <Text fontWeight="bold" mr={2}>Reference :</Text>
                <Link color="blue.500" fontWeight="bold">
                  {kri?.reference || "N/A"}
                </Link>
              </Flex>
            </Box>

            <Box mb={2}>
              <Flex alignItems="center">
                <Text fontWeight="bold" mr={2}>Description :</Text>
                <Text>{truncateWords(kri?.riskIndicatorDescription)}</Text>
              </Flex>
            </Box>
          </Box>
        ))
      ) : (
        <Flex alignItems='center' justifyContent='center'>
          <Text fontSize='12px'>No Key Indicator found</Text>
        </Flex>
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedKri && (
              <KeyIndicatorComponent kri={selectedKri} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const mapStateToProps = ({ KeyIndicatorReducer }) => ({
  keyIndicator: KeyIndicatorReducer.keyIndicator,
  loading: KeyIndicatorReducer.loading,
});

export default connect(mapStateToProps)(KriCard);
