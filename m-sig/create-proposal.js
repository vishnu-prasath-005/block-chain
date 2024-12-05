import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import {
  SigningStargateClient,
  coins,
  AminoTypes,
  createDefaultAminoConverters,
  defaultRegistryTypes,
} from "@cosmjs/stargate";
import { stringToPath } from "@cosmjs/crypto";
import {
  createWasmAminoConverters,
  wasmTypes,
} from "@cosmjs/cosmwasm-stargate";

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

export async function createProposalTransaction(
  multisigAddress,
  recipientAddress,
  amount,
  denom
) {
  // Replace with your RPC endpoint
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    "add reflect letter theory trim junior apple private bounce slogan must stem sausage morning empty local pool explain warrior ankle achieve orbit cycle odor",
    {
      prefix: HEDGE_CHAIN.addressPrefix,
      hdPaths: [stringToPath(`${"m/44'/118'/0'/0"}/${0}`)],
    }
  );
  const [firstAccount] = await wallet.getAccounts();

  // const client = await SigningStargateClient.connectWithSigner(
  //   rpcEndpoint,
  //   wallet,
  //   {
  //     aminoTypes: new AminoTypes(createDefaultAminoConverters()),
  //   }
  // );

  const client = await SigningStargateClient.connectWithSigner(
    HEDGE_CHAIN.rpcEndpoint,
    wallet,
    {
      registry: new Registry([...defaultRegistryTypes, ...wasmTypes]),
      aminoTypes: new AminoTypes({
        ...createDefaultAminoConverters(),
        ...createWasmAminoConverters(),
      }),
    }
  );

  const proposal = {
    type: "cosmos-sdk/TextProposal",
    value: {
      title: "Withdrawal Proposal",
      description: `Proposal to withdraw ${amount} ${denom} from ${multisigAddress} to ${recipientAddress}`,
    },
  };

  const deposit = [
    {
      denom: HEDGE_CHAIN.nativeDenom,
      amount: amount, // Adjust the deposit amount as needed
    },
  ];

  const msgSubmitProposal = {
    typeUrl: "cosmos-sdk/MsgSubmitProposal",
    value: {
      content: proposal,
      initial_deposit: deposit,
      proposer: firstAccount.address,
    },
  };

  console.log(firstAccount);

  const tx = await client.signAndBroadcast(
    firstAccount.address,
    [msgSubmitProposal],
    {
      gas: "200000",
      amount: coins(amount, HEDGE_CHAIN.nativeDenom), // Adjust fees as needed
    },
    ""
  );

  console.log("Proposal transaction hash:", tx.transactionHash);
  return tx.transactionHash;
}
createProposalTransaction(
  "hedge16qmtv9yjdh7q6cd3umjpnre73qgsgtrujwjsfn",
  "hedge1qqs959pype5xexrd5gkvw0p8yskga3vglzfmy8",
  280,
  HEDGE_CHAIN.denom
);
