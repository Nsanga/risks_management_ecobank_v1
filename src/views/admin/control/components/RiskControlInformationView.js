import React from 'react'
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
    ModalFooter, useDisclosure, Tabs, TabList, TabPanels, Tab, TabPanel, // Import Chakra UI Tabs components
    Text
} from '@chakra-ui/react';
import TreeSelect from './TreeSelect';
import LogTable from './LogTable';
import DataDisplay from './DataDisplay';
import RiskControl from './RiskControl';
import MyTableComponent from './MyTableComponent';
import ActionsPanel from './ActionsPanel';
import RiskPage from './RiskPage';
import RiskForm from './RiskForm';

const RiskControlInformationView = ({ isOpen, onClose, selectedRisk, isEditMode }) => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEditMode ? "Edit Risk Control" : "Add New Risk Control"}</ModalHeader>
            <ModalBody p={4}>
              {/* You can pass selectedRisk data to the RiskPage or any other component as needed */}
              <RiskPage riskData={selectedRisk} />
              <Tabs variant='enclosed' mt={6}>
                <TabList>
                  <Tab fontSize={12} >General</Tab>
                  <Tab fontSize={12} >Goals</Tab>
                  <Tab fontSize={12} >Controls</Tab>
                  <Tab fontSize={12} >Actions</Tab>
                  <Tab fontSize={12} >Risk focus</Tab>
                  <Tab fontSize={12} >Risks logs</Tab>
                  <Tab fontSize={12} >Linked items</Tab>
                </TabList>
  
                <TabPanels>
                  <TabPanel>
                    {/* You can pass selectedRisk to any component here */}
                    <RiskForm riskData={selectedRisk} />
                  </TabPanel>
                  <TabPanel>
                    <MyTableComponent />
                  </TabPanel>
                  <TabPanel>
                    <RiskControl />  {/* Added RiskControl here */}
                  </TabPanel>
                  <TabPanel>
                    <ActionsPanel />  {/* Add ActionsPanel to the Actions tab */}
                  </TabPanel>
                  <TabPanel>
                    <TreeSelect />  {/* Add TreeSelect to the Risk focus tab */}
                  </TabPanel>
                  <TabPanel>
                    <LogTable /> {/* Include LogTable here for Risks logs */}
                  </TabPanel>
                  <TabPanel>
                    <DataDisplay />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

export default RiskControlInformationView
