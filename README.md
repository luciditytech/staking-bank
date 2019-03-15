# Staking Banok

Staking token manager for andromeda consensus.

## Prerequisites

1. [brew](http://brew.sh)

  ```sh
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

1. [HubFlow](http://datasift.github.io/gitflow/)

  ```sh
  brew install hubflow
  ```

> If you are on Linux

  ```sh
  git clone https://github.com/datasift/gitflow
  cd gitflow
  sudo ./install.sh
  ```

---

## Setup

1. `clone the repo`
1. `npm hf init`
1. `npm install`

---

## Compiling and migrating smart contracts

1. `truffle compile`
1. `truffle migrate`

---

## Testing smart contracts

> Be sure compiled contracts are latest before testing
1. `npm run test`
1. `npm run lint`

---

## Linting smart contracts
1. `solhint "contracts/**/*.sol"`

---

## Deploy

On deploy you need to remember to register contract in `ContractRegistry` ie:

```
const ContractRegistry = artifacts.require('ContractRegistry');
const contractRegistry = await ContractRegistry.at(config.ContractRegistry.address);
await contractRegistry.add(StakingBank.address);
```

### Addresses

#### Storage

- staging: 0xa37c1f72b355acc14b49dfa15437da3b99372a62

#### Contract

- staging: 0x357d9959ae144ed97091e072b24199ef2f138963
