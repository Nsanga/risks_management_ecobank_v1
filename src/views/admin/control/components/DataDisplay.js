import React from 'react';
import { ChakraProvider, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import LimitedRisks from './LimitedRisks';


const DataDisplay = () => {
  return (
    <ChakraProvider>
      <Box p={4}>
      <Tabs variant="soft-rounded" colorScheme="green" mt={6}>
          <TabList>
            <Tab>Limited Risks</Tab>
            <Tab>Limited Events</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LimitedRisks />
            </TabPanel>
            <TabPanel>
            
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
};

export default DataDisplay;
