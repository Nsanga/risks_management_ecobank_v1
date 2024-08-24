import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Card from 'components/card/Card'
import React, { useEffect } from 'react'
import Entitynew from './Component/Entitynew'
import CreateProfile from './Component/Createprofile'
import UserGroup from './Component/UserGroup'
import { connect, useDispatch } from 'react-redux'
import { listUserGroups } from 'redux/userGroup/action'

const System = ({ userGroups, loading }) => {

  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listUserGroups());
    }, [dispatch]);

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
              <UserGroup userGroups={userGroups} loading={loading}/>
            </TabPanel>
            <TabPanel>
              <Entitynew />
            </TabPanel>
            <TabPanel>
              <CreateProfile userGroups={userGroups} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </div>
  )
}

const mapStateToProps = ({ UserGroupReducer }) => ({
  userGroups: UserGroupReducer.userGroups,
  loading: UserGroupReducer.loading,
});

export default connect(mapStateToProps)(System);
