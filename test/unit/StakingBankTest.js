import { fromAscii } from 'web3-utils';

const BigNumber = require('bignumber.js');

const {
  deployStakingBank,
  deployHumanStandardToken,
} = require('../helpers/deployers');

const ContractRegistryArtifact = artifacts.require('ContractRegistry');
const VerifierRegistryArtifact = artifacts.require('VerifierRegistry');
const ChainArtifact = artifacts.require('Chain');

contract('StakingBank', (accounts) => {
  let verifierRegistry;
  let chain;
  let stakingBankInstance;
  let ministroStakingBank;
  let token;
  const verifier = accounts[1];

  describe('when token is deployed', async () => {
    before(async () => {
      token = await deployHumanStandardToken();
    });

    describe('when stakingBank is deployed', async () => {
      before(async () => {
        ({ ministroStakingBank, stakingBankInstance } = await deployStakingBank(
          accounts[0],
          token.address,
        ));

        const contractRegistry = await ContractRegistryArtifact
          .at(await ministroStakingBank.instance.contractRegistry.call());

        verifierRegistry = await VerifierRegistryArtifact.at(await contractRegistry.contractByName.call(fromAscii('VerifierRegistry')));
        chain = await ChainArtifact.at(await contractRegistry.contractByName.call(fromAscii('Chain')));
      });

      it('token address should match', async () => {
        assert.strictEqual(await token.address, await stakingBankInstance.token.call(), 'invalid token address');
      });

      describe('when we have unregistered verifier', async () => {
        it('should be possible to transfer tokens to verifier', async () => {
          await token.transfer(verifier, 1, { from: accounts[0] });
        });

        it('verifier should have regular token balance', async () => {
          const balance = await token.balanceOf.call(verifier);
          assert(BigNumber(balance).eq(1), 'invalid balance');
        });

        it('verifier should have NO staking balance', async () => {
          const balance = await stakingBankInstance.stakingBalance.call(verifier);
          assert(BigNumber(balance).eq(0), 'invalid staking balance');
        });

        it('before veriefier registry is notified', async () => {
          const { balance } = (await verifierRegistry.verifiers.call(verifier));
          assert(BigNumber(balance).eq(0), 'invalid shard balance');
        });

        it('should be possible to approveAndCall()', async () => {
          await token.approveAndCall(stakingBankInstance.address, 1, '0x0', { from: verifier });
        });

        it('veriefier should have staking balance', async () => {
          const balance = await stakingBankInstance.stakingBalance.call(verifier);
          assert(BigNumber(balance).eq(1), 'invalid staking balance');
        });

        it('veriefier registry should be notified', async () => {
          const { balance } = (await verifierRegistry.verifiers.call(verifier));
          assert(BigNumber(balance).eq(1), 'invalid shard balance');
        });

        describe('when proposing phase', async () => {
          before(async () => {
            await chain.setProposePhase(true);
            assert(await chain.isProposePhase(), 'should be propose');
          });

          it('staking tokens should be locked and withdraw should throw', async () => {
            await ministroStakingBank.withdraw(1, { from: verifier }, true);
          });

          describe('when revealing phase', async () => {
            before(async () => {
              await chain.setProposePhase(false);
              assert.isFalse(await chain.isProposePhase(), 'should be propose');
            });

            it('staking tokens should be unlocked and withdraw should be possible', async () => {
              await ministroStakingBank.withdraw(1, { from: verifier });
            });

            it('veriefier registry should be notified', async () => {
              const { balance } = (await verifierRegistry.verifiers.call(verifier));
              assert(BigNumber(balance).eq(0), 'invalid shard balance');
            });
          });
        });
      });
    });
  });
});
