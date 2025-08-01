import { ChakraProvider } from "@chakra-ui/react";
import { useTenant } from "./TenantProvider";
import React from "react";
import { buildTheme } from "theme/theme";

export const DynamicChakraProvider = ({ children }) => {
  const { tenant } = useTenant();

  // Attendre que le tenant soit chargé (optionnel : ajouter un écran de chargement)
  if (!tenant) return null;

  const theme = buildTheme(tenant);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
