const StakingBankStorageArtifact = artifacts.require('StakingBankStorage');
const StakingBankArtifact = artifacts.require('StakingBank');
const ContractRegistryArtifact = artifacts.require('ContractRegistry');
const VerifierRegistryArtifact = artifacts.require('VerifierRegistry');
const HumanStandardTokenArtifact = artifacts.require('HumanStandardToken');
const ChainArtifact = artifacts.require('Chain');

const tokenConf = require('token-sale-contracts/conf/development');

const StakingBankUtil = require('../ministro-contracts/ministroStakingBank');

const deployContractRegistry = async () => ContractRegistryArtifact.new();

const deployVerifierRegistry = async (contractRegistryAddr, verifiersPerShard) => {
  const contractRegistry = await ContractRegistryArtifact.at(contractRegistryAddr);

  const verifierRegistry = await VerifierRegistryArtifact.new(
    verifiersPerShard,
  );

  await contractRegistry.add(verifierRegistry.address);

  return verifierRegistry;
};

const deployHumanStandardToken = async () => HumanStandardTokenArtifact.new(
  tokenConf.total,
  tokenConf.name,
  tokenConf.decimals,
  tokenConf.symbol,
);

const deployChain = async (contractRegistryAddr) => {
  const contractRegistry = await ContractRegistryArtifact.at(contractRegistryAddr);

  const chain = await ChainArtifact.new();

  await contractRegistry.add(chain.address);

  return chain;
};

const deployStakingBank = async (owner, tokenAddr) => {
  const contractRegistry = await deployContractRegistry();

  const storage = await StakingBankStorageArtifact.new(tokenAddr);

  const stakingBankInstance = await StakingBankArtifact.new(
    contractRegistry.address,
    storage.address,
  );

  await storage.initStorageOwner(stakingBankInstance.address);
  await contractRegistry.add(stakingBankInstance.address);

  await deployVerifierRegistry(contractRegistry.address, 100);
  await deployChain(contractRegistry.address);

  const ministroStakingBank = StakingBankUtil();
  ministroStakingBank.setInstanceVar(stakingBankInstance);
  ministroStakingBank.setFromVar(owner);

  return {
    stakingBankInstance,
    ministroStakingBank,
  };
};

module.exports = {
  deployHumanStandardToken,
  deployStakingBank,
};
