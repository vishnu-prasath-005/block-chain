import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { toBase64 } from "@cosmjs/encoding";
import { pubkeyToAddress } from "@cosmjs/amino";
import { stringToPath } from "@cosmjs/crypto";

export const HEDGE_CHAIN = {
  name: "HEDGE",
  prettyName: "Hedge-Berberis",
  rpcEndpoint: "https://www.rpc-berberis.hedgeblock.io",
  restEndpoint: "https://www.lcd-berberis.hedgeblock.io",
  chainID: "berberis-1",
  chainName: "hedge-berberis",
  addressPrefix: "hedge",
  nativeDenom: "uhedge",
  coinType: 118,
  decimals: 6,
  symbol: "HEDGE",
  display: "hedge",
  imageURL: "Hedge",
  txPageURL: "https://dev.hedgescan.io/txs/",
  isUsed: true,
};
export const sixFigures = 1e6;
export const gasLimit = 111000;

const signers = [
  "dignity six dinosaur job asthma broom arm wall gather divide seminar medal advice split similar room edge stadium skill joy differ segment brave priority",
  "add reflect letter theory trim junior apple private bounce slogan must stem sausage morning empty local pool explain warrior ankle achieve orbit cycle odor",
  "response donkey inject invite gate pool captain athlete skill prize wolf mouse mad rug stove agent tape palm sample wood bright holiday episode praise",
  //   "remove love moral tennis stone faith border drastic dove flock time notice display injury story seek citizen report banana celery donor clay pear coconut",
];

async function createMultisigAccount(signers, threshold) {
  const pubkeys = await Promise.all(
    signers.map(async (signer) => {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(signer, {
        prefix: HEDGE_CHAIN.addressPrefix,
        hdPaths: [stringToPath(`${"m/44'/118'/0'/0"}/${0}`)],
      });
      const [firstAccount] = await wallet.getAccounts();
      return firstAccount.pubkey;
    })
  );

  const multisigPubkey = {
    type: "tendermint/PubKeyMultisigThreshold",
    value: {
      threshold: threshold,
      pubkeys: pubkeys.map((pubkey) => ({
        type: "tendermint/PubKeySecp256k1",
        value: toBase64(pubkey),
      })),
    },
  };

  const address = pubkeyToAddress(multisigPubkey, HEDGE_CHAIN.addressPrefix);
  console.log("address", address);

  return address;
}

createMultisigAccount(signers, 2);
