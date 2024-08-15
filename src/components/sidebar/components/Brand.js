import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import LogoMakeda from "../../../assets/img/logoMakeda.png";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      <div style={{ marginBottom: 12 }}>
        {/* <Image src={LogoMakeda} alt='Logo Makeda' width="200px" /> */}
      </div>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
