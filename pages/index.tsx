import Head from "next/head";
import {
  Box,
  Divider,
  Stack,
  Grid,
  Heading,
  Text,
  Container,
  Link,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Button } from "@mui/material";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
// import { Product, Dependency, WalletSection } from "../components";
import { dependencies, products } from "../config";
import Form from "../components/react/Form/Form";
import { useChain } from "@cosmos-kit/react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { CosmosKitConnect } from "../components/react/CosmosKitConnect/CosmosKitConnect";


export const DYDX_RPC = "https://bridge-rpc.itbc.dev";
export const DYDX_REST = "https://bridge-api.itbc.dev";
export const BRIDGE_API = "https://api.bridge.interbloc.org";
// export const DYDX_RPC = "https://rpc.cosmos.directory/dydx";
// export const DYDX_REST = "https://rest.cosmos.directory/dydx";

export default function Home() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { open: openModal } = useWeb3Modal();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // @ts-ignore
    <Container>
      {/* // maxW="5xl" py={10} */}
      <Head>
        <title>dYdX Bridge</title>
        <meta name="description" content="dYdX Bridge by Interbloc" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        ></link>
        <script
          defer
          data-domain="bridge.interbloc.org"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <Stack direction="row" justifyContent={"space-between"}>
        <>&nbsp;</>
        {/* <Button variant="outline" px={0} onClick={toggleColorMode}>
          <Icon
            as={colorMode === "light" ? BsFillMoonStarsFill : BsFillSunFill}
          />
        </Button> */}
        <Box
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            flex={1}
            sx={{
              maxWidth: "1200px",

              gap: 2,
              alignItems: "center",
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
            padding="10px"
          >
            {isConnected ? (
              <w3m-account-button />
            ) : (
              <Button
                // color="#1A70FE"
                sx={{ backgroundColor: "#2CD7FF" }}
                variant="contained"
                onClick={() => openModal()}
              >
                ETH Connect Wallet
              </Button>
            )}
            <CosmosKitConnect />
          </Box>
        </Box>
      </Stack>

      {/* <WalletSection /> */}
      <Box display="flex" flex={1} justifyContent="center" alignItems="center">
        <Box maxWidth="800px">
          <Form />
        </Box>
      </Box>
    </Container>
  );
}
