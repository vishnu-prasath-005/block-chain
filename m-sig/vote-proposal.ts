import { DirectSecp256k1HdWallet, EncodeObject } from "@cosmjs/proto-signing";
import {
  AminoTypes,
  SigningStargateClient,
  coins,
  createDefaultAminoConverters,
} from "@cosmjs/stargate";

export async function voteOnProposal(
  proposalId: string,
  voterMnemonic: string,
  voteOption: "yes" | "no" | "abstain" | "no_with_veto"
) {
  const rpcEndpoint = "http://localhost:26657"; // Replace with your RPC endpoint
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(voterMnemonic);
  const [firstAccount] = await wallet.getAccounts();

  const client = await SigningStargateClient.connectWithSigner(
    rpcEndpoint,
    wallet,
    {
      aminoTypes: new AminoTypes(createDefaultAminoConverters()),
    }
  );

  const msgVote: EncodeObject = {
    typeUrl: "cosmos-sdk/MsgVote",
    value: {
      proposal_id: proposalId,
      voter: firstAccount.address,
      option: 0,
    },
  };

  const tx = await client.signAndBroadcast(
    firstAccount.address,
    [msgVote],
    {
      gas: "200000",
      amount: coins("2000", "uatom"), // Adjust fees as needed
    },
    ""
  );

  console.log("Vote transaction hash:", tx.transactionHash);
  return tx.transactionHash;
}
