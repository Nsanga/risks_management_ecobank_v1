import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import ActionCard from "./components/ActionCard";

const Action = () => {
    const location = useLocation();
    const action = location.state?.action;

    // console.log("action:::", action);

    return (
        <Box mt={24}>
            <ActionCard action={action} />
        </Box>
    );
};

export default Action;
