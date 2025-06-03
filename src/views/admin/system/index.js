import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Card from 'components/card/Card'
import React, { useEffect } from 'react'
import Entitynew from './Component/Entitynew'
import CreateProfile from './Component/Createprofile'
import UserGroup from './Component/UserGroup'
import { connect, useDispatch, useSelector } from 'react-redux'
import { listUserGroups } from 'redux/userGroup/action'
import { listProfiles } from 'redux/profile/action'
import { listEntities } from 'redux/entitiy/action'

const System = ({ userGroups, loading, profiles }) => {
  const entities = useSelector(state => state.EntityReducer.entities);
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listUserGroups());
        dispatch(listProfiles());
        dispatch(listEntities());
    }, [dispatch]);

  return (
    <div>
      <Card mt="100px">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
           <Tab>USER GROUP</Tab>
            <Tab>ENTITY</Tab>
            <Tab>USER</Tab>
          </TabList>
          <TabPanels>
          <TabPanel>
              <UserGroup userGroups={userGroups} loading={loading}/>
            </TabPanel>
            <TabPanel>
              <Entitynew profiles={profiles}/>
            </TabPanel>
            <TabPanel>
              <CreateProfile userGroups={userGroups} profiles={profiles} entities={entities} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </div>
  )
}

const mapStateToProps = ({ UserGroupReducer, ProfileReducer }) => ({
  profiles: ProfileReducer.profiles,
  userGroups: UserGroupReducer.userGroups,
  loading: UserGroupReducer.loading,
});

export default connect(mapStateToProps)(System);
