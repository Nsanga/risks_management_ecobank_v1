import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Card from 'components/card/Card'
import React from 'react'
import Entitynew from './Component/Entitynew'
import CreateProfile from './Component/Createprofile'
import UserGroup from './Component/UserGroup'

const System = () => {
  return (
    <div>
      <Card mt="100px">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
           <Tab>USER GROUP</Tab>
            <Tab>ENTITY</Tab>
            <Tab>PROFIL</Tab>
          </TabList>
          <TabPanels>
          <TabPanel>
              <UserGroup />
            </TabPanel>
            <TabPanel>
              <Entitynew />
            </TabPanel>
            <TabPanel>
              <CreateProfile />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </div>
  )
}

export default System
