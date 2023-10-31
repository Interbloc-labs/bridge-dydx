import { useChain } from "@cosmos-kit/react";
import { Cancel, Close } from "@mui/icons-material";
import { Box, Button, Link, IconButton, Typography } from "@mui/material";
import Image from "next/image";

type Props = {};

export const CosmosKitConnect = ({}: Props) => {
  const {
    isWalletConnected,
    isWalletConnecting,
    connect,
    disconnect,
    isWalletDisconnected,
    address,
    username,
    wallet,
  } = useChain("dydx");

  return (
    <Box>
      {isWalletConnected && address ? (
        <Box
          sx={{
            direction: "row",
            justifyContent: "center",
            gap: 1,
            alignItems: "center",
            display: "flex",
          }}
        >
          {wallet?.logo && (
            <Image
              height={"18px"}
              width={"18px"}
              src={
                typeof wallet.logo === "string"
                  ? wallet.logo
                  : wallet.logo.minor || wallet.logo.major
              }
              alt="Connected wallet logo"
            />
          )}
          <Box sx={{ display: "flex", direction: "column", gap: 1 }}>
            <div>
              <Link
                href={`https://mintscan.io/dydx/address/${address}`}
                textAlign="center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {username
                  ? username
                  : `${address.substring(0, 7)}..${address.substring(
                      address.length - 6
                    )}`}
              </Link>
            </div>
          </Box>
          <IconButton onClick={disconnect}>
            <Close />
          </IconButton>
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={connect}
          disabled={isWalletConnected || isWalletConnecting}
        >
          Connect to DYDX Chain
        </Button>
      )}
    </Box>
  );
};
