import { useEffect, useState } from "react";
import { useQuery } from "wagmi";

const QUERY =
  "https://rest.cosmos.directory/dydx/cosmos/tx/v1beta1/txs?events=message.action=%27/dydxprotocol.bridge.MsgAcknowledgeBridges%27";

export interface Txs {
  txs: Tx[];
  tx_responses: TxResponse[];
  pagination: null;
  total: string;
}

export interface TxResponse {
  height: string;
  txhash: string;
  codespace: string;
  code: number;
  data: string;
  raw_log: string;
  logs: Log[];
  info: string;
  gas_wanted: string;
  gas_used: string;
  tx: Tx;
  timestamp: Date;
  events: TxResponseEvent[];
}

export interface TxResponseEvent {
  type: TypeEnum;
  attributes: PurpleAttribute[];
}

export interface PurpleAttribute {
  key: Key;
  value: ValueEnum;
  index: boolean;
}

export enum Key {
  Action = "action",
  Module = "module",
}

export enum ValueEnum {
  Bridge = "bridge",
  DydxprotocolBridgeMsgAcknowledgeBridges = "/dydxprotocol.bridge.MsgAcknowledgeBridges",
}

export enum TypeEnum {
  Message = "message",
}

export interface Log {
  msg_index: number;
  log: string;
  events: LogEvent[];
}

export interface LogEvent {
  type: TypeEnum;
  attributes: FluffyAttribute[];
}

export interface FluffyAttribute {
  key: Key;
  value: ValueEnum;
}

export interface Tx {
  "@type"?: Type;
  body: Body;
  auth_info: AuthInfo;
  signatures: any[];
}

export enum Type {
  CosmosTxV1Beta1Tx = "/cosmos.tx.v1beta1.Tx",
}

export interface AuthInfo {
  signer_infos: any[];
  fee: Fee;
  tip: null;
}

export interface Fee {
  amount: any[];
  gas_limit: string;
  payer: string;
  granter: string;
}

export interface Body {
  messages: Message[];
  memo: string;
  timeout_height: string;
  extension_options: any[];
  non_critical_extension_options: any[];
}

export interface Message {
  "@type": ValueEnum;
  events: MessageEvent[];
}

export interface MessageEvent {
  id: number;
  coin: Coin;
  address: string;
  eth_block_height: string;
}

export interface Coin {
  denom: Denom;
  amount: string;
}

export enum Denom {
  Adydx = "adydx",
}

export interface LatestResp {
  block_id: BlockID;
  block: Block;
}

export interface Block {
  header: Header;
  data: Data;
  evidence: Evidence;
  last_commit: LastCommit;
}

export interface Data {
  txs: string[];
}

export interface Evidence {
  evidence: any[];
}

export interface Header {
  version: Version;
  chain_id: string;
  height: string;
  time: Date;
  last_block_id: BlockID;
  last_commit_hash: string;
  data_hash: string;
  validators_hash: string;
  next_validators_hash: string;
  consensus_hash: string;
  app_hash: string;
  last_results_hash: string;
  evidence_hash: string;
  proposer_address: string;
}

export interface BlockID {
  hash: string;
  part_set_header: PartSetHeader;
}

export interface PartSetHeader {
  total: number;
  hash: string;
}

export interface Version {
  block: string;
  app: string;
}

export interface LastCommit {
  height: string;
  round: number;
  block_id: BlockID;
  signatures: Signature[];
}

export interface Signature {
  block_id_flag: BlockIDFlag;
  validator_address: string;
  timestamp: Date;
  signature: string;
}

export enum BlockIDFlag {
  BlockIDFlagCommit = "BLOCK_ID_FLAG_COMMIT",
}

export type PendingMigration = {
  address: string;
  startBlock: number;
  tokenAmount: bigint;
};

export const useGetPendingMigrations = (address: string | undefined) => {
  const latest = useQuery(
    ["blocks/latest"],
    () =>
      fetch(
        `https://rest.cosmos.directory/dydx/cosmos/base/tendermint/v1beta1/blocks/latest`
      )
        .then((resp) => resp.json())
        .then((data: LatestResp) => Number(data.block.header.height)),
    // refetch block height every 90 seconds
    { refetchInterval: 1000 * 60 * 1.5 }
  );

  const { data: pendingMigrations, isLoading: pendingMigrationsLoading } =
    useQuery(
      ["pendingMigrations", address],
      () => {
        return address
          ? fetch(QUERY)
              .then((res) => res.json())
              .then((res: Txs) =>
                res.tx_responses
                  // .filter((tx) =>
                  //   tx.tx.body.messages.some(({ events }) =>
                  //     events.some(
                  //       ({ address: eventAddress }) => eventAddress === address
                  //     )
                  //   )
                  // )
                  // denormalize the data so we can filter again
                  .map(
                    ({
                      height,
                      tx: {
                        body: { messages },
                      },
                    }) =>
                      messages.flatMap(({ events }) =>
                        events
                          .filter(
                            ({ address: eventAddress }) =>
                              eventAddress === address
                          )
                          .map(
                            ({ address, coin }): PendingMigration => ({
                              address,
                              startBlock: Number(height),
                              tokenAmount: BigInt(coin.amount),
                            })
                          )
                      )
                  )
                  .filter((x) => x.length > 0)
                  .flat()
              )
          : [];
      },
      { refetchInterval: 1000 * 60 * 6 }
    );

  return {
    pendingMigrations,
    currentBlock: latest.data,
    isLoading: latest.isLoading || pendingMigrationsLoading,
  };
};
