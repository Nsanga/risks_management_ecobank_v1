import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTenant } from "redux/tenant/action";

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
    const tenant = useSelector((state) => state.TenantReducer.tenant);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTenant());
      }, [dispatch]);
      
    return (
        <TenantContext.Provider value={{ tenant }}>
            {children}
        </TenantContext.Provider>
    );
};

export const useTenant = () => useContext(TenantContext);
