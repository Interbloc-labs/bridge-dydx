import { Box, Container } from "@mui/material";
import { DYDX_TOKEN_ADDRESS } from "../../App";
import { useAccount } from "wagmi";
// import { Modal } from "@interchain-ui/react";

type Props = {};

export const Header = () => {
  const { address, isConnected, isConnecting } = useAccount();
  return (
    <Box
      flexDirection="row"
      flexGrow={1}
      justifyContent="flex-end"
      width={"100%"}
    >
      {<w3m-button balance={"show"} />}
      {/* <Modal isOpen={true} header={undefined} /> */}
    </Box>
  );
};
