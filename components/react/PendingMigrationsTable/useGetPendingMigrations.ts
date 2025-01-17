import { useEffect, useState } from "react";
import { useQuery } from "wagmi";
import {BRIDGE_API, DYDX_REST} from "../../../pages";

export interface BridgeApiMigrationsResponse {
  height: string;
  address: string;
  eth_block_height: string;
  denom: number;
  amount: string;
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
        fetch(`${DYDX_REST}/cosmos/base/tendermint/v1beta1/blocks/latest`)
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
          ? fetch(
              `${BRIDGE_API}/migrations/address/${address}`
            )
              .then((res) => res.json())
              .then((res: BridgeApiMigrationsResponse[]) =>
                res
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
                        address,
                        height,
                        eth_block_height,
                        denom,
                        amount
                    }) : PendingMigration => ({
                              address,
                              startBlock: Number(height),
                              tokenAmount: BigInt(amount),
                            })
                  )
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
