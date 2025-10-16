import { Box, Flex, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { listActions } from 'redux/actions/action';
import ActionCard from '../control/components/ActionCard';
import Loader from '../../../assets/img/loader.gif';

const Actions = ({ actions, loading }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('Tous'); // Default filter: show all actions
  const [filteredActions, setFilteredActions] = useState(actions);

  useEffect(() => {
    dispatch(listActions());
  }, [dispatch]);

  useEffect(() => {
    // Filter actions based on selected filter
    if (filter === 'Tous') {
      setFilteredActions(actions);
    } else {
      setFilteredActions(actions.filter(action => action.category === filter));
    }
  }, [filter, actions]);

//   console.log('actions:', actions);
//   console.log('filteredActions:', filteredActions);

  return (
    <Box mt={4}>
      {/* Radio Button Filters */}
      <Flex justifyContent="end" mb={6} mt={24}>
        <RadioGroup onChange={setFilter} value={filter}>
          <Stack direction="row" spacing={4}>
            <Radio value="Tous" colorScheme="purple">
              Tous
            </Radio>
            <Radio value="RCSA" colorScheme="purple">
              RCSA
            </Radio>
            <Radio value="KRI" colorScheme="purple">
              KRI
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>

      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Image src={Loader} alt="loading..." height={50} width={50} />
        </Flex>
      ) : (
        <Box>
          <ActionCard actions={filteredActions} />
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = ({ ActionReducer }) => ({
  actions: ActionReducer.actions,
  loading: ActionReducer.loading,
});

export default connect(mapStateToProps)(Actions);