// import { createProposalTransaction } from "./create-proposal";
// import { voteOnProposal } from "./vote-proposal";

// async function main() {
//   const multisigAddress = "cosmos1multisigaddress"; // Replace with actual multisig address
//   const recipientAddress = "cosmos1recipientaddress"; // Replace with actual recipient address
//   const amount = "1000";
//   const denom = "uatom";
//   const proposerMnemonic = "your mnemonic here"; // Replace with actual mnemonic

//   const proposalTxHash = await createProposalTransaction(
//     multisigAddress,
//     recipientAddress,
//     amount,
//     denom,
//     proposerMnemonic
//   );
//   console.log("Proposal transaction hash:", proposalTxHash);

//   const proposalId = "1"; // Replace with the actual proposal ID from the chain
//   const voterMnemonic = "another mnemonic here"; // Replace with actual mnemonic
//   const voteOption = "yes";

//   const voteTxHash = await voteOnProposal(
//     proposalId,
//     voterMnemonic,
//     voteOption
//   );
//   console.log("Vote transaction hash:", voteTxHash);
// }

// main().catch(console.error);

import { decodeTxRaw } from "@cosmjs/proto-signing";
import { fromBase64, toHex } from "@cosmjs/encoding";

import { StargateClient } from "@cosmjs/stargate";
import { sha256 } from "@cosmjs/crypto";

const client = await StargateClient.connect(
  "https://www.rpc-berberis.hedgeblock.io"
);

console.log(
  "txs ",
  await client.getTx(
    "E8293BDB144C2A6FBB5192EAA3AFBA02A077177B3BBE5B62BBF689BC0C93B418"
  )
);

const txRaw = decodeTxRaw(
  fromBase64(
    "CpUBCpIBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEnIKLGhlZGdlMXY5ZnAzaHN0YzRlenJ5enZ3anc2M2ZwOG5nd3JlcG1wdnd5Y2E0EixoZWRnZTFqODVhcjltZ3Rsa2tjbGszamZseDV2dHE0NjRnajdreHZuMnMzehoUCgZ1aGVkZ2USCjMwMDAwMDAwMDASagpRCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA/jauw23uQipEDZqEkNWyuPN6l19ho5HA92XoDbmRJH8EgQKAggBGOgHEhUKDwoGdWhlZGdlEgUyMjIwMBCY4wYaQBLijri/h8rGzxWEm8IMnaKTXl4Xh6mJWNxpcL78Xur6EPsQsH1T1VPFH7HAXn5H826QzDQqLmJ/G/Rpt/0SDBI="
  )
);

// const registry = new createDefaultRegistry();

// console.log("raw txs", registry.decode(txRaw.body.messages));

// console.log(
//   "Decoded sign",

//   toHex(
//     fromBase64(
//       "CkDOzuqKWF+PjbFTqDYQyoh8kKi8e9TJhcLrJGJsgpHpGlxXY7xo1ZUKzhS3mUFotmymwY6zmwFFjh9vBllhyD4Y"
//     )
//   )
// );
