export const getTenantFromSubdomain = () => {
    const [subdomain] = window.location.hostname.split(".");
    return subdomain.toLowerCase();
};