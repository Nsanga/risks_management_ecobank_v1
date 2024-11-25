import React from 'react';
import { ChakraProvider, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import LimitedRisks from './LimitedRisks';

const DataDisplay = () => {
  return (
    <ChakraProvider>
      <Box p={4} fontSize="12px"> {/* Apply font size to the Box for global font size */}
        <Tabs variant="soft-rounded" colorScheme="green" mt={6}>
          <TabList>
            <Tab fontSize="12px">Limited Risks</Tab>
            <Tab fontSize="12px">Limited Events</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LimitedRisks />
            </TabPanel>
            <TabPanel>
              {/* Content for Limited Events can go here */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
};

export default DataDisplay;
