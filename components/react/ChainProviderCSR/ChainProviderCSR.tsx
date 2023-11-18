import { ChainProvider } from "@cosmos-kit/react";
import React from "react";
export default function ChainProviderCSR({ children, chains, assetLists, wallets, walletConnectOptions, signerOptions} : {children: React.ReactNode, signerOptions: any, walletConnectOptions: any, wallets:any, assetLists: any, chains: any }) {

    return (
        <ChainProvider
            chains={chains}
            assetLists={assetLists}
            wallets={wallets}
            walletConnectOptions={walletConnectOptions}
            signerOptions={signerOptions}
        >
            {children}
        </ChainProvider>
    )
}