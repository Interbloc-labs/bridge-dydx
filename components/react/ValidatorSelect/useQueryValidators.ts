import { useQuery } from "wagmi";

export interface ValidatorsQuery {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: Status;
  tokens: string;
  description: Description;
  unbonding_height: string;
  unbonding_time: Date;
  commission: Commission;
  min_self_delegation: string;
  slugName: string;
  delegator_shares: number;
  icon: string;
  ranking: number;
}

export interface Commission {
  commission_rates: CommissionRates;
  update_time: Date;
}

export interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

export interface ConsensusPubkey {
  "@type": Type;
  key: string;
}

export enum Type {
  CosmosCryptoEd25519PubKey = "/cosmos.crypto.ed25519.PubKey",
}

export interface Description {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

export enum Status {
  BondStatusBonded = "BOND_STATUS_BONDED",
  BondStatusUnbonded = "BOND_STATUS_UNBONDED",
}

export const useQueryValidators = () => {
  const validators = useQuery(["validators"], () =>
    fetch("http://validators-api.herokuapp.com/allValidators/dydx-mainnet-1")
      .then((resp) => resp.json())
      .then((data: ValidatorsQuery[]) => data)
  );

  return validators;
};
