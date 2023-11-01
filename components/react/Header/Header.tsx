import { Box, Container } from "@mui/material";
import { useAccount } from "wagmi";

import { CosmosKitConnect } from "../CosmosKitConnect/CosmosKitConnect";

export const Header = () => {
  return (
    <Box
      flexDirection="row"
      flexGrow={1}
      justifyContent="flex-end"
      width={"100%"}
    >
      <CosmosKitConnect />
    </Box>
  );
};
