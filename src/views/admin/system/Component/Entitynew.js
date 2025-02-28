import React, { useEffect, useState } from 'react';
import {
  Flex, Box, Select, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Image, Text, Radio, RadioGroup, Stack, Heading
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { connect, useDispatch } from 'react-redux';
import AddEntityModal from './AddEntityModal';
import { listEntities } from 'redux/entitiy/action';
import Loader from '../../../../assets/img/loader.gif';

const Entitynew = ({ entities, loading, profiles }) => {
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

  return (
    <>
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

            {/* Entity Table */}
            <Table>
              <Thead>
                <Tr>
                  <Th>Reference Id</Th>
                  <Th>Description</Th>
                  <Th>Owner</Th>
                  <Th>Nominee</Th>
                  <Th>Reviewer</Th>
                </Tr>
              </Thead>
              <Tbody>
                {entities.map(entity => (
                  <Tr
                    key={entity?._id}
                    onClick={() => {
                      setSelectedEntity(entity); // Set the selected entity when a row is clicked
                      setIsModalOpen(true);
                    }}
                    _hover={{ backgroundColor: "gray.100" }}
                    cursor="pointer"
                  >
                    <Td fontSize="12px">ENT{entity?.referenceId}</Td>
                    <Td fontSize="12px">CAM - {entity?.description}</Td>
                    <Td fontSize="12px">
                      {entity?.owner ? `${entity?.owner?.surname? entity?.owner?.surname + " " + entity?.owner?.name : entity?.owner?.name}` : null}
                    </Td>
                    <Td fontSize="12px">
                      {entity?.nominee ? `${entity?.nominee?.surname? entity?.nominee?.surname + " " + entity?.nominee?.name : entity?.nominee?.name}` : null}
                    </Td>
                    <Td fontSize="12px">
                      {entity?.reviewer ? `${entity?.reviewer?.surname? entity?.reviewer?.surname + " " + entity?.reviewer?.name : entity?.reviewer?.name}` : null}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )
      )}
      {/* Modal always rendered, only the selectedEntity is conditionally passed */}
      <AddEntityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        loading={loading}
        selectedEntity={selectedEntity}
        profiles={profiles}
      />
    </>
  );
}

const mapStateToProps = ({ EntityReducer }) => ({
  entities: EntityReducer.entities,
  loading: EntityReducer.loading,
});

export default connect(mapStateToProps)(Entitynew);
