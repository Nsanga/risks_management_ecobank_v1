import React, { useEffect, useState } from 'react';
import {
  Flex, Box, Select, Button, Table, Thead, Tbody, Tr, Th, Td, Input,
  Image,
  Text
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddEntityModal from './AddEntityModal';
import { connect, useDispatch } from 'react-redux';
import { listEntities } from 'redux/entitiy/action';
import DeleteModal from './deleteModal';
import Loader from '../../../../assets/img/loader.gif';

const Entitynew = ({ entities, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const openModal = () => {
    setSelectedEntity(null); // Clear selected entity for adding a new one
    setIsModalOpen(true);
  };
  
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listEntities());
  }, [dispatch]);

  console.log('list des entities', entities)

  return (
    <>
      {loading ? (
        <Flex alignItems='center' justifyContent='center'>
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : (
        entities.length === 0 ? (
          <Flex alignItems='center' justifyContent='center'>
            <Text color='gray.500' fontSize='2xl'>No data found</Text>
          </Flex>
        ) : (
          <Box p={4}>
            {/* Button aligned to the right with AddIcon and "Add Entity" text */}
            <Flex direction="row" justifyContent="flex-end" align="center" mb={4}>
              <Button
                variant="outline" color='blue' 
                leftIcon={<AddIcon />}
                onClick={openModal}
              >
                Add Entity
              </Button>
            </Flex>

            <Table>
              <Thead>
                <Tr>
                  <Th>Reference Id</Th>
                  <Th>Description</Th>
                  <Th>Owner</Th>
                  <Th>Nominee</Th>
                  <Th>Reviewer</Th>
                  <Th></Th>
                </Tr>
              </Thead> 
              <Tbody> 
                {entities.map(entity => (
                  <Tr
                    key={entity?.id}
                    onClick={() => {
                      setSelectedEntity(entity); // Set the selected entity when a row is clicked
                      setIsModalOpen(true);
                    }}
                    _hover={{ backgroundColor: "gray.100" }}
                    cursor="pointer"
                  >
                    <Td>{entity.referenceId}</Td>
                    <Td>{entity.description}</Td>
                    <Td>{entity.owner}</Td>
                    <Td>{entity.nominee}</Td>
                    <Td>{entity.reviewer}</Td>
                    <Td>
                      <DeleteModal
                        selectedEntity={entity}
                        onClick={(e) => e.stopPropagation()} // Stop event propagation
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Modal always rendered, only the selectedEntity is conditionally passed */}
            <AddEntityModal 
              isOpen={isModalOpen} 
              onClose={closeModal} 
              loading={loading} 
              selectedEntity={selectedEntity} 
            />
          </Box>
        ))}
    </>
  );
}

const mapStateToProps = ({ EntityReducer }) => ({
  entities: EntityReducer.entities,
  loading: EntityReducer.loading,
});

export default connect(mapStateToProps)(Entitynew);
