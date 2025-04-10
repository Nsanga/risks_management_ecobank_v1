import React from "react";
import { MdClose, MdInsertDriveFile } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Loader from "../../../assets/img/loader.gif";
import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { connect, useDispatch } from "react-redux";
import { listEntities } from "redux/entitiy/action";
import { listProfiles } from "redux/profile/action";
import { url } from "urlLoader";
import moment from "moment";
import ActionCard from "./components/ActionCard";

const Action = () => {
    const location = useLocation();
    const action = location.state?.action;
    const history = useHistory();

    console.log("action:::", action);

    return (
        <Box mt={24}>
            <ActionCard action={action} />
        </Box>
    );
};

export default Action;
