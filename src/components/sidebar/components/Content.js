import { Box, Flex, Stack } from "@chakra-ui/react";
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import React from "react";

function SidebarContent(props) {
  const { routes, isCollapsed } = props;
  const getFilteredRoutes = () => {
    const userRole = localStorage.getItem('role');
    const systemIntegrationRoutes = ["Login", "Event", "Action", "KeyIndicator"];
    const validatedOnlyRoutes = ["System", "Integration"];
    
    // Liste des rôles qui ont accès aux routes validées
    const privilegedRoles = ['validated', 'inputeurs'];
    
    if (!privilegedRoles.includes(userRole)) {
      // Cas 1: Rôles privilégiés - on exclut uniquement les routes système
      return routes.filter(route => !systemIntegrationRoutes.includes(route.name));
    } else {
      // Cas 2: Autres rôles - on exclut routes système + routes réservées
      return routes.filter(route => 
        ![...systemIntegrationRoutes, ...validatedOnlyRoutes].includes(route.name)
      );
    }
  };
  
  // Utilisation
  const filteredRoutes = getFilteredRoutes();

  return (
    <Flex
      direction='column'
      height='100%'
      pt='25px'
      px={isCollapsed ? "8px" : "16px"}
      borderRadius='30px'
      alignItems={isCollapsed ? "center" : "flex-start"}
    >
      <Brand isCollapsed={isCollapsed} />
      <Stack direction='column' mb='auto' mt='8px' alignItems={isCollapsed ? "center" : "flex-start"}>
        <Box ps={isCollapsed ? "0px" : '20px'} pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={filteredRoutes} isCollapsed={isCollapsed} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
