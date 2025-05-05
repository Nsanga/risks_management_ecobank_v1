import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listProfiles } from 'redux/profile/action';
import Card from 'components/card/Card';
import KeyIndicatorComponent from '../KRI/components/KeyIndicatorComponent';
import { useHistory } from "react-router-dom";
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

const Indicator = () => {
  const location = useLocation();
  const selectedKri = location.state?.kri;
  const profiles = useSelector(state => state.ProfileReducer.profiles);
  const dispatch = useDispatch()

  const history = useHistory();

  const profilesOptions = React.useMemo(() => {
    if (!Array.isArray(profiles)) return []; // Handle non-array cases

    return profiles
      .filter(profile => profile?.activeUser)
      .map(profile => ({
        value: profile?._id,
        label: [profile?.name, profile?.surname].filter(Boolean).join(' ') || 'Unnamed Profile',
        profile 
      }));
  }, [profiles]);

  useEffect(() => {
    dispatch(listProfiles());
  }, [dispatch]);

  return (
    <Card mt="100px">
      <ChakraLink as={ReactRouterLink} to="/admin/key-risk-indicator" color="blue">
        <Flex alignItems="center" mb={4}>
          <ChevronLeftIcon />
          Back to KRI Page
        </Flex>
      </ChakraLink>
      <KeyIndicatorComponent kri={selectedKri} profiles={profiles} profilesOptions={profilesOptions} search={true} />
      {/* < KriCard entities={entities} profiles={profiles} loading={loading} /> */}
    </Card>
  );
};

export default Indicator;


