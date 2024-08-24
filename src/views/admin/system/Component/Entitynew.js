import React, { useEffect, useState } from 'react';
import {
  Flex, Box, Select, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Image, Text, Radio, RadioGroup, Stack, Heading
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { connect, useDispatch } from 'react-redux';
import AddEntityModal from './AddEntityModal';
import { listEntities } from 'redux/entitiy/action';
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

            {/* Form Section with Header */}
            <Box p={1} border="1px" borderColor="gray.200" borderRadius="md" mb={4} width="105%">
              <Heading as="h4" size="md" mb={4}>
                Select Entity
              </Heading>
              
              <Flex direction="row" justifyContent="space-between" align="center" mb={4}>
                {/* Left Side */}
                <Flex direction="column" flex="1" mr={1}>
                  <Flex mb={4} align="center">
                    <Text width="70px">Entity :</Text>
                    <Select placeholder="Select Entity" />
                  </Flex>
                  <Flex mb={4} align="center">
                    <Text width="70px">Show :</Text>
                    <RadioGroup defaultValue="Risks">
                      <Stack direction="row">
                        <Radio value="Risks">Risks</Radio>
                        <Radio value="Controls">Controls</Radio>
                        <Radio value="Events">Events</Radio>
                        <Radio value="Actions">Actions</Radio>
                        <Radio value="Kits">Kits</Radio>
                        <Radio value="Obligations">Obligations</Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>
                  <Flex mb={4} align="center">
                    <Text width="70px">Filter on :</Text>
                    <Select placeholder="All Approval State">
                      {/* Add filter options here */}
                    </Select>
                  </Flex>
                </Flex>

                {/* Right Side */}
                <Flex direction="column" flex="1" ml={2}>
                  <Flex mb={4} align="center">
                    <Text width="100px">RAM :</Text>
                    <Input placeholder="RAM" width="100%" />
                  </Flex>
                  <Flex mb={4} align="center">
                    <Text width="100px">Owner :</Text>
                    <Input placeholder="Owner" width="100%" />
                  </Flex>
                </Flex>
              </Flex>

              <Flex align="center" justifyContent="flex-end">
                <Text>Status : </Text>
                <Text ml={2} mr={4}>Number of Risks : 0</Text>
                <Text>Total Annual Residual Exposure : 0.00</Text>
              </Flex>
            </Box>

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
        )
      )}
    </>
  );
}

const mapStateToProps = ({ EntityReducer }) => ({
  entities: EntityReducer.entities,
  loading: EntityReducer.loading,
});

export default connect(mapStateToProps)(Entitynew);
