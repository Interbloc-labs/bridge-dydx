import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// dydxToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export const dydxTokenABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'distributor', internalType: 'address', type: 'address' },
      {
        name: 'transfersRestrictedBefore',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'transferRestrictionLiftedNoLaterThan',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'mintingRestrictedBefore',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'mintMaxPercent', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegatee',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'DelegateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'DelegatedPowerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'isAllowed', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'TransferAllowlistUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'transfersRestrictedBefore',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransfersRestrictedBeforeUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DELEGATE_BY_TYPE_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DELEGATE_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'EIP712_DOMAIN',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'EIP712_VERSION',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'INITIAL_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINT_MAX_PERCENT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINT_MIN_INTERVAL',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'TRANSFER_RESTRICTION_LIFTED_NO_LATER_THAN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_mintingRestrictedBefore',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_propositionPowerDelegates',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: '_propositionPowerSnapshots',
    outputs: [
      { name: 'blockNumber', internalType: 'uint128', type: 'uint128' },
      { name: 'value', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_propositionPowerSnapshotsCounts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_tokenTransferAllowlist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_totalSupplySnapshots',
    outputs: [
      { name: 'blockNumber', internalType: 'uint128', type: 'uint128' },
      { name: 'value', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_totalSupplySnapshotsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_transfersRestrictedBefore',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_votingDelegates',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: '_votingSnapshots',
    outputs: [
      { name: 'blockNumber', internalType: 'uint128', type: 'uint128' },
      { name: 'value', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_votingSnapshotsCounts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addressesToAdd', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'addToTokenTransferAllowlist',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'delegatee', internalType: 'address', type: 'address' }],
    name: 'delegate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'delegatee', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegateBySig',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'delegatee', internalType: 'address', type: 'address' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
    ],
    name: 'delegateByType',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'delegatee', internalType: 'address', type: 'address' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegateByTypeBySig',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
    ],
    name: 'getDelegateeByType',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
    ],
    name: 'getPowerAtBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
    ],
    name: 'getPowerCurrent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'addressesToRemove',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    name: 'removeFromTokenTransferAllowlist',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'transfersRestrictedBefore',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'updateTransfersRestrictedBefore',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export const dydxTokenAddress = {
  1: '0x92D6C1e31e14520e676a687F0a93788B716BEff5',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export const dydxTokenConfig = {
  address: dydxTokenAddress,
  abi: dydxTokenABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// wrappedDydxToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export const wrappedDydxTokenABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'tokenAddress', internalType: 'contract ERC20', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'accAddress',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Bridge',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegatee',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'DelegateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'DelegatedPowerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DELEGATE_BY_TYPE_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DELEGATE_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DYDX_TOKEN',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'EIP712_DOMAIN',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'EIP712_VERSION',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_nextAvailableBridgeId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_propositionPowerDelegates',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: '_propositionPowerSnapshots',
    outputs: [
      { name: 'blockNumber', internalType: 'uint128', type: 'uint128' },
      { name: 'value', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_propositionPowerSnapshotsCounts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_votingDelegates',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: '_votingSnapshots',
    outputs: [
      { name: 'blockNumber', internalType: 'uint128', type: 'uint128' },
      { name: 'value', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_votingSnapshotsCounts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'accAddress', internalType: 'bytes', type: 'bytes' },
      { name: 'memo', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'bridge',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'delegatee', internalType: 'address', type: 'address' }],
    name: 'delegate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'delegatee', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegateBySig',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'delegatee', internalType: 'address', type: 'address' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
    ],
    name: 'delegateByType',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'delegatee', internalType: 'address', type: 'address' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegateByTypeBySig',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
    ],
    name: 'getDelegateeByType',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
    ],
    name: 'getPowerAtBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      {
        name: 'delegationType',
        internalType: 'enum IGovernancePowerDelegationERC20.DelegationType',
        type: 'uint8',
      },
    ],
    name: 'getPowerCurrent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export const wrappedDydxTokenAddress = {
  1: '0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export const wrappedDydxTokenConfig = {
  address: wrappedDydxTokenAddress,
  abi: wrappedDydxTokenABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"DELEGATE_BY_TYPE_TYPEHASH"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDelegateByTypeTypehash<
  TFunctionName extends 'DELEGATE_BY_TYPE_TYPEHASH',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'DELEGATE_BY_TYPE_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"DELEGATE_TYPEHASH"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDelegateTypehash<
  TFunctionName extends 'DELEGATE_TYPEHASH',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'DELEGATE_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"EIP712_DOMAIN"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenEip712Domain<
  TFunctionName extends 'EIP712_DOMAIN',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'EIP712_DOMAIN',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"EIP712_VERSION"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenEip712Version<
  TFunctionName extends 'EIP712_VERSION',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'EIP712_VERSION',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"INITIAL_SUPPLY"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenInitialSupply<
  TFunctionName extends 'INITIAL_SUPPLY',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'INITIAL_SUPPLY',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"MINT_MAX_PERCENT"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenMintMaxPercent<
  TFunctionName extends 'MINT_MAX_PERCENT',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'MINT_MAX_PERCENT',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"MINT_MIN_INTERVAL"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenMintMinInterval<
  TFunctionName extends 'MINT_MIN_INTERVAL',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'MINT_MIN_INTERVAL',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"PERMIT_TYPEHASH"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenPermitTypehash<
  TFunctionName extends 'PERMIT_TYPEHASH',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'PERMIT_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"TRANSFER_RESTRICTION_LIFTED_NO_LATER_THAN"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTransferRestrictionLiftedNoLaterThan<
  TFunctionName extends 'TRANSFER_RESTRICTION_LIFTED_NO_LATER_THAN',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'TRANSFER_RESTRICTION_LIFTED_NO_LATER_THAN',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_mintingRestrictedBefore"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenMintingRestrictedBefore<
  TFunctionName extends '_mintingRestrictedBefore',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_mintingRestrictedBefore',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_propositionPowerDelegates"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenPropositionPowerDelegates<
  TFunctionName extends '_propositionPowerDelegates',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_propositionPowerDelegates',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_propositionPowerSnapshots"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenPropositionPowerSnapshots<
  TFunctionName extends '_propositionPowerSnapshots',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_propositionPowerSnapshots',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_propositionPowerSnapshotsCounts"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenPropositionPowerSnapshotsCounts<
  TFunctionName extends '_propositionPowerSnapshotsCounts',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_propositionPowerSnapshotsCounts',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_tokenTransferAllowlist"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTokenTransferAllowlist<
  TFunctionName extends '_tokenTransferAllowlist',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_tokenTransferAllowlist',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_totalSupplySnapshots"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTotalSupplySnapshots<
  TFunctionName extends '_totalSupplySnapshots',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_totalSupplySnapshots',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_totalSupplySnapshotsCount"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTotalSupplySnapshotsCount<
  TFunctionName extends '_totalSupplySnapshotsCount',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_totalSupplySnapshotsCount',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_transfersRestrictedBefore"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTransfersRestrictedBefore<
  TFunctionName extends '_transfersRestrictedBefore',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_transfersRestrictedBefore',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_votingDelegates"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenVotingDelegates<
  TFunctionName extends '_votingDelegates',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_votingDelegates',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_votingSnapshots"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenVotingSnapshots<
  TFunctionName extends '_votingSnapshots',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_votingSnapshots',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"_votingSnapshotsCounts"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenVotingSnapshotsCounts<
  TFunctionName extends '_votingSnapshotsCounts',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: '_votingSnapshotsCounts',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"getDelegateeByType"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenGetDelegateeByType<
  TFunctionName extends 'getDelegateeByType',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'getDelegateeByType',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"getPowerAtBlock"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenGetPowerAtBlock<
  TFunctionName extends 'getPowerAtBlock',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'getPowerAtBlock',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"getPowerCurrent"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenGetPowerCurrent<
  TFunctionName extends 'getPowerCurrent',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'getPowerCurrent',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"nonces"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenNonces<
  TFunctionName extends 'nonces',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'nonces',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof dydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof dydxTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof dydxTokenABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, TFunctionName, TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"addToTokenTransferAllowlist"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenAddToTokenTransferAllowlist<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'addToTokenTransferAllowlist'
        >['request']['abi'],
        'addToTokenTransferAllowlist',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'addToTokenTransferAllowlist'
      }
    : UseContractWriteConfig<
        typeof dydxTokenABI,
        'addToTokenTransferAllowlist',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'addToTokenTransferAllowlist'
      } = {} as any,
) {
  return useContractWrite<
    typeof dydxTokenABI,
    'addToTokenTransferAllowlist',
    TMode
  >({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'addToTokenTransferAllowlist',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof dydxTokenABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'approve', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      }
    : UseContractWriteConfig<
        typeof dydxTokenABI,
        'decreaseAllowance',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'decreaseAllowance', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"delegate"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDelegate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'delegate'
        >['request']['abi'],
        'delegate',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'delegate' }
    : UseContractWriteConfig<typeof dydxTokenABI, 'delegate', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegate'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'delegate', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'delegate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"delegateBySig"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDelegateBySig<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'delegateBySig'
        >['request']['abi'],
        'delegateBySig',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'delegateBySig'
      }
    : UseContractWriteConfig<typeof dydxTokenABI, 'delegateBySig', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegateBySig'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'delegateBySig', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'delegateBySig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"delegateByType"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDelegateByType<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'delegateByType'
        >['request']['abi'],
        'delegateByType',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'delegateByType'
      }
    : UseContractWriteConfig<typeof dydxTokenABI, 'delegateByType', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegateByType'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'delegateByType', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'delegateByType',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"delegateByTypeBySig"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDelegateByTypeBySig<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'delegateByTypeBySig'
        >['request']['abi'],
        'delegateByTypeBySig',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'delegateByTypeBySig'
      }
    : UseContractWriteConfig<
        typeof dydxTokenABI,
        'delegateByTypeBySig',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegateByTypeBySig'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'delegateByTypeBySig', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'delegateByTypeBySig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      }
    : UseContractWriteConfig<
        typeof dydxTokenABI,
        'increaseAllowance',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'increaseAllowance', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof dydxTokenABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'mint', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"permit"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenPermit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'permit' }
    : UseContractWriteConfig<typeof dydxTokenABI, 'permit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'permit'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'permit', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"removeFromTokenTransferAllowlist"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenRemoveFromTokenTransferAllowlist<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'removeFromTokenTransferAllowlist'
        >['request']['abi'],
        'removeFromTokenTransferAllowlist',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'removeFromTokenTransferAllowlist'
      }
    : UseContractWriteConfig<
        typeof dydxTokenABI,
        'removeFromTokenTransferAllowlist',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'removeFromTokenTransferAllowlist'
      } = {} as any,
) {
  return useContractWrite<
    typeof dydxTokenABI,
    'removeFromTokenTransferAllowlist',
    TMode
  >({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'removeFromTokenTransferAllowlist',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof dydxTokenABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'renounceOwnership', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof dydxTokenABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'transfer', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof dydxTokenABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'transferFrom', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof dydxTokenABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof dydxTokenABI, 'transferOwnership', TMode>({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"updateTransfersRestrictedBefore"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenUpdateTransfersRestrictedBefore<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof dydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof dydxTokenABI,
          'updateTransfersRestrictedBefore'
        >['request']['abi'],
        'updateTransfersRestrictedBefore',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTransfersRestrictedBefore'
      }
    : UseContractWriteConfig<
        typeof dydxTokenABI,
        'updateTransfersRestrictedBefore',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTransfersRestrictedBefore'
      } = {} as any,
) {
  return useContractWrite<
    typeof dydxTokenABI,
    'updateTransfersRestrictedBefore',
    TMode
  >({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'updateTransfersRestrictedBefore',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"addToTokenTransferAllowlist"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenAddToTokenTransferAllowlist(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof dydxTokenABI,
      'addToTokenTransferAllowlist'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'addToTokenTransferAllowlist',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof dydxTokenABI,
    'addToTokenTransferAllowlist'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"delegate"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenDelegate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'delegate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'delegate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'delegate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"delegateBySig"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenDelegateBySig(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'delegateBySig'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'delegateBySig',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'delegateBySig'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"delegateByType"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenDelegateByType(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'delegateByType'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'delegateByType',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'delegateByType'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"delegateByTypeBySig"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenDelegateByTypeBySig(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'delegateByTypeBySig'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'delegateByTypeBySig',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof dydxTokenABI,
    'delegateByTypeBySig'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"permit"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'permit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'permit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"removeFromTokenTransferAllowlist"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenRemoveFromTokenTransferAllowlist(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof dydxTokenABI,
      'removeFromTokenTransferAllowlist'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'removeFromTokenTransferAllowlist',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof dydxTokenABI,
    'removeFromTokenTransferAllowlist'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof dydxTokenABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof dydxTokenABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dydxTokenABI}__ and `functionName` set to `"updateTransfersRestrictedBefore"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function usePrepareDydxTokenUpdateTransfersRestrictedBefore(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof dydxTokenABI,
      'updateTransfersRestrictedBefore'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    functionName: 'updateTransfersRestrictedBefore',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof dydxTokenABI,
    'updateTransfersRestrictedBefore'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link dydxTokenABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof dydxTokenABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    ...config,
  } as UseContractEventConfig<typeof dydxTokenABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link dydxTokenABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof dydxTokenABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof dydxTokenABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link dydxTokenABI}__ and `eventName` set to `"DelegateChanged"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDelegateChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof dydxTokenABI, 'DelegateChanged'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    eventName: 'DelegateChanged',
    ...config,
  } as UseContractEventConfig<typeof dydxTokenABI, 'DelegateChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link dydxTokenABI}__ and `eventName` set to `"DelegatedPowerChanged"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenDelegatedPowerChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof dydxTokenABI, 'DelegatedPowerChanged'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    eventName: 'DelegatedPowerChanged',
    ...config,
  } as UseContractEventConfig<typeof dydxTokenABI, 'DelegatedPowerChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link dydxTokenABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof dydxTokenABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof dydxTokenABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link dydxTokenABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof dydxTokenABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof dydxTokenABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link dydxTokenABI}__ and `eventName` set to `"TransferAllowlistUpdated"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTransferAllowlistUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof dydxTokenABI, 'TransferAllowlistUpdated'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    eventName: 'TransferAllowlistUpdated',
    ...config,
  } as UseContractEventConfig<typeof dydxTokenABI, 'TransferAllowlistUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link dydxTokenABI}__ and `eventName` set to `"TransfersRestrictedBeforeUpdated"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5)
 */
export function useDydxTokenTransfersRestrictedBeforeUpdatedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof dydxTokenABI,
      'TransfersRestrictedBeforeUpdated'
    >,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof dydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: dydxTokenABI,
    address: dydxTokenAddress[1],
    eventName: 'TransfersRestrictedBeforeUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof dydxTokenABI,
    'TransfersRestrictedBeforeUpdated'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"DELEGATE_BY_TYPE_TYPEHASH"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDelegateByTypeTypehash<
  TFunctionName extends 'DELEGATE_BY_TYPE_TYPEHASH',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'DELEGATE_BY_TYPE_TYPEHASH',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"DELEGATE_TYPEHASH"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDelegateTypehash<
  TFunctionName extends 'DELEGATE_TYPEHASH',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'DELEGATE_TYPEHASH',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"DYDX_TOKEN"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDydxToken<
  TFunctionName extends 'DYDX_TOKEN',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'DYDX_TOKEN',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"EIP712_DOMAIN"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenEip712Domain<
  TFunctionName extends 'EIP712_DOMAIN',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'EIP712_DOMAIN',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"EIP712_VERSION"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenEip712Version<
  TFunctionName extends 'EIP712_VERSION',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'EIP712_VERSION',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"PERMIT_TYPEHASH"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenPermitTypehash<
  TFunctionName extends 'PERMIT_TYPEHASH',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'PERMIT_TYPEHASH',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"_nextAvailableBridgeId"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenNextAvailableBridgeId<
  TFunctionName extends '_nextAvailableBridgeId',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: '_nextAvailableBridgeId',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"_propositionPowerDelegates"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenPropositionPowerDelegates<
  TFunctionName extends '_propositionPowerDelegates',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: '_propositionPowerDelegates',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"_propositionPowerSnapshots"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenPropositionPowerSnapshots<
  TFunctionName extends '_propositionPowerSnapshots',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: '_propositionPowerSnapshots',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"_propositionPowerSnapshotsCounts"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenPropositionPowerSnapshotsCounts<
  TFunctionName extends '_propositionPowerSnapshotsCounts',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: '_propositionPowerSnapshotsCounts',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"_votingDelegates"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenVotingDelegates<
  TFunctionName extends '_votingDelegates',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: '_votingDelegates',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"_votingSnapshots"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenVotingSnapshots<
  TFunctionName extends '_votingSnapshots',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: '_votingSnapshots',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"_votingSnapshotsCounts"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenVotingSnapshotsCounts<
  TFunctionName extends '_votingSnapshotsCounts',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: '_votingSnapshotsCounts',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"getDelegateeByType"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenGetDelegateeByType<
  TFunctionName extends 'getDelegateeByType',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'getDelegateeByType',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"getPowerAtBlock"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenGetPowerAtBlock<
  TFunctionName extends 'getPowerAtBlock',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'getPowerAtBlock',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"getPowerCurrent"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenGetPowerCurrent<
  TFunctionName extends 'getPowerCurrent',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'getPowerCurrent',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"nonces"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenNonces<
  TFunctionName extends 'nonces',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'nonces',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof wrappedDydxTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wrappedDydxTokenABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof wrappedDydxTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof wrappedDydxTokenABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, TFunctionName, TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof wrappedDydxTokenABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, 'approve', TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"bridge"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenBridge<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'bridge'
        >['request']['abi'],
        'bridge',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'bridge' }
    : UseContractWriteConfig<typeof wrappedDydxTokenABI, 'bridge', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'bridge'
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, 'bridge', TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'bridge',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      }
    : UseContractWriteConfig<
        typeof wrappedDydxTokenABI,
        'decreaseAllowance',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<
    typeof wrappedDydxTokenABI,
    'decreaseAllowance',
    TMode
  >({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"delegate"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDelegate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'delegate'
        >['request']['abi'],
        'delegate',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'delegate' }
    : UseContractWriteConfig<typeof wrappedDydxTokenABI, 'delegate', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegate'
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, 'delegate', TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'delegate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"delegateBySig"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDelegateBySig<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'delegateBySig'
        >['request']['abi'],
        'delegateBySig',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'delegateBySig'
      }
    : UseContractWriteConfig<
        typeof wrappedDydxTokenABI,
        'delegateBySig',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegateBySig'
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, 'delegateBySig', TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'delegateBySig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"delegateByType"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDelegateByType<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'delegateByType'
        >['request']['abi'],
        'delegateByType',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'delegateByType'
      }
    : UseContractWriteConfig<
        typeof wrappedDydxTokenABI,
        'delegateByType',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegateByType'
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, 'delegateByType', TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'delegateByType',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"delegateByTypeBySig"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDelegateByTypeBySig<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'delegateByTypeBySig'
        >['request']['abi'],
        'delegateByTypeBySig',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'delegateByTypeBySig'
      }
    : UseContractWriteConfig<
        typeof wrappedDydxTokenABI,
        'delegateByTypeBySig',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegateByTypeBySig'
      } = {} as any,
) {
  return useContractWrite<
    typeof wrappedDydxTokenABI,
    'delegateByTypeBySig',
    TMode
  >({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'delegateByTypeBySig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      }
    : UseContractWriteConfig<
        typeof wrappedDydxTokenABI,
        'increaseAllowance',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<
    typeof wrappedDydxTokenABI,
    'increaseAllowance',
    TMode
  >({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"permit"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenPermit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'permit' }
    : UseContractWriteConfig<typeof wrappedDydxTokenABI, 'permit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'permit'
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, 'permit', TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof wrappedDydxTokenABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, 'transfer', TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wrappedDydxTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wrappedDydxTokenABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<
        typeof wrappedDydxTokenABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof wrappedDydxTokenABI, 'transferFrom', TMode>({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    ...config,
  } as UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"bridge"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenBridge(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'bridge'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'bridge',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'bridge'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wrappedDydxTokenABI,
      'decreaseAllowance'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wrappedDydxTokenABI,
    'decreaseAllowance'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"delegate"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenDelegate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'delegate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'delegate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'delegate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"delegateBySig"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenDelegateBySig(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'delegateBySig'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'delegateBySig',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wrappedDydxTokenABI,
    'delegateBySig'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"delegateByType"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenDelegateByType(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'delegateByType'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'delegateByType',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wrappedDydxTokenABI,
    'delegateByType'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"delegateByTypeBySig"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenDelegateByTypeBySig(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wrappedDydxTokenABI,
      'delegateByTypeBySig'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'delegateByTypeBySig',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wrappedDydxTokenABI,
    'delegateByTypeBySig'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wrappedDydxTokenABI,
      'increaseAllowance'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wrappedDydxTokenABI,
    'increaseAllowance'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"permit"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'permit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'permit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function usePrepareWrappedDydxTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wrappedDydxTokenABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wrappedDydxTokenABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wrappedDydxTokenABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof wrappedDydxTokenABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    ...config,
  } as UseContractEventConfig<typeof wrappedDydxTokenABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof wrappedDydxTokenABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof wrappedDydxTokenABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `eventName` set to `"Bridge"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenBridgeEvent(
  config: Omit<
    UseContractEventConfig<typeof wrappedDydxTokenABI, 'Bridge'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    eventName: 'Bridge',
    ...config,
  } as UseContractEventConfig<typeof wrappedDydxTokenABI, 'Bridge'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `eventName` set to `"DelegateChanged"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDelegateChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof wrappedDydxTokenABI, 'DelegateChanged'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    eventName: 'DelegateChanged',
    ...config,
  } as UseContractEventConfig<typeof wrappedDydxTokenABI, 'DelegateChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `eventName` set to `"DelegatedPowerChanged"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenDelegatedPowerChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof wrappedDydxTokenABI, 'DelegatedPowerChanged'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    eventName: 'DelegatedPowerChanged',
    ...config,
  } as UseContractEventConfig<
    typeof wrappedDydxTokenABI,
    'DelegatedPowerChanged'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wrappedDydxTokenABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9)
 */
export function useWrappedDydxTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof wrappedDydxTokenABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wrappedDydxTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: wrappedDydxTokenABI,
    address: wrappedDydxTokenAddress[1],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof wrappedDydxTokenABI, 'Transfer'>)
}
