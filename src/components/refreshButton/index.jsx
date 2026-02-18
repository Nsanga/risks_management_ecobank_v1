import { Button, Spinner } from '@chakra-ui/react'
import React from 'react'
import { IoRefresh } from 'react-icons/io5'

const RefreshButton = ({isRefreshing, handleRefresh}) => {
    return (
        <Button
            variant="solid"
            color='green'
            leftIcon={isRefreshing ? <Spinner size="sm" /> : <IoRefresh />}
            onClick={handleRefresh}
            fontSize={12}
            isLoading={isRefreshing}
            disabled={isRefreshing}
        >
            {isRefreshing ? 'Refreshing...' : 'Refresh List'}
        </Button>
    )
}

export default RefreshButton
