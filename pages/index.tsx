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
  Button,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
// import { Product, Dependency, WalletSection } from "../components";
import { dependencies, products } from "../config";
import Form from "../components/react/Form/Form";
import { useChain } from "@cosmos-kit/react";

import { CosmosKitConnect } from "../components/react/CosmosKitConnect/CosmosKitConnect";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // @ts-ignore
    <Container>
      {/* // maxW="5xl" py={10} */}
      <Head>
        <title>dYdX Bridge</title>
        <meta name="description" content="dYdX Bridge by Interbloc" />
        <link rel="icon" href="/favicon.png" />
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
            }}
            padding="10px"
          >
            <w3m-button label="Eth Connect Wallet" />
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
