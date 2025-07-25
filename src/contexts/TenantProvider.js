import { createContext, useContext, useState, useEffect } from "react";
import { getTenantFromSubdomain } from "utils/getTenant";

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
    const [tenant, setTenant] = useState(null);

    useEffect(() => {
        const tenantId = getTenantFromSubdomain();
        setTenant(tenantId);
        console.log("tenantId:", tenantId);
    }, []);

    return (
        <TenantContext.Provider value={{ tenant }}>
            {children}
        </TenantContext.Provider>
    );
};

export const useTenant = () => useContext(TenantContext);
