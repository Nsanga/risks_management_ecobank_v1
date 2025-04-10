import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { listActions } from 'redux/actions/action';
import ActionCard from '../control/components/ActionCard';
import Loader from "../../../assets/img/loader.gif";

const Actions = ({ actions, loading }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listActions());
    }, [dispatch]);

    console.log("actions::", actions); // Cela devrait maintenant afficher uniquement le tableau d'actions

    return (
        <Box mt={4}>
            {loading ? (
                <Flex alignItems="center" justifyContent="center" mt={24}>
                    <Image src={Loader} alt="loading..." height={50} width={50} />
                </Flex>
            ) : (
                <Box mt={24}>
                    <ActionCard actions={actions} />
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
