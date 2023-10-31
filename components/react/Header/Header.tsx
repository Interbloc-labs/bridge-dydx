import { Box, Container } from "@mui/material";

import { CosmosKitConnect } from "../CosmosKitConnect/CosmosKitConnect";

export const Header = () => {
  return (
    <Box
      flexDirection="row"
      flexGrow={1}
      justifyContent="flex-end"
      width={"100%"}
    >
      <w3m-connect-button label="Eth Connect Wallet" />
      <CosmosKitConnect />
    </Box>
  );
};
