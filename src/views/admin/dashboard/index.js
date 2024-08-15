import React, { useEffect } from 'react';
import { Box, Flex, Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import Cards from './Card';
import Card from 'components/card/Card';
import { connect, useDispatch } from 'react-redux';
import { listAccounts } from 'redux/accountManagement/action';
import { MdDangerous, MdHourglassTop, MdVerified,MdPeople } from 'react-icons/md';


const Dashboard = ({ totals, loading }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listAccounts());
  }, [dispatch]);

  return (
    <></>
    // <Card mt="100px">
    //   {
    //     loading ? (
    //       <Flex alignItems='center' justifyContent='center'>
    //         <Spinner color='blue.500' size='xl' />
    //       </Flex>
    //     ) : (
    //       <Box mt={4}>
    //         <Heading mb={4} size="md">Comptes</Heading>
    //         <SimpleGrid columns={[1, null, 2, 4]} spacing="4">
    //           <Cards title="Total créés" description={totals.totalAccounts} icon={MdPeople} color={'blue'}/>
    //           <Cards title="Total vérifiés" description={totals.totalVerified} icon={MdVerified} color={'green'}/>
    //           <Cards title="Total en attente" description={totals.totalPending} icon={MdHourglassTop} color={'grey'}/>
    //           <Cards title="Total rejetés" description={totals.totalRejected} icon={MdDangerous} color={'red'}/>
    //         </SimpleGrid>
    //       </Box>
    //     )
    //   }

    // </Card>
  );
};

const mapStateToProps = ({ AccountReducer }) => ({
  totals: AccountReducer.totals,
  loading: AccountReducer.loading,
});

export default connect(mapStateToProps)(Dashboard);
