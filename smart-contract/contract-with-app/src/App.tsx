import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
  useSendAndConfirmTransaction,
} from "thirdweb/react";
import { client } from "./client";
import { getContract, prepareContractCall, toWei } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import LotteryContractABI from "./abi/lottery-contract.json";
import { Button, Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { NotificationPlacement } from "antd/es/notification/interface";

const contract = getContract({
  client,
  address: "0x6F124B3E37B22fFe8036388B8a7e7D73c2494833",
  chain: sepolia,
  abi: JSON.parse(JSON.stringify(LotteryContractABI)),
});

export function App() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    method: string,
    description: string
  ) => {
    api[method]({
      message: `Notification ${placement}`,
      description,
      placement,
    });
  };

  const { mutate: sendAndConfirmTx } = useSendAndConfirmTransaction();

  const connectedAddress = useActiveAccount();

  const [form] = useForm();
  const mangerAddress = Form.useWatch("manager", form);
  const playerAddress = Form.useWatch("player", form);

  const { data } = useReadContract({
    contract,
    method: "getPlayers",
  });
  console.log(data);

  const [showPlayers, setShowPlayers] = useState(false);

  const startLottery = () => {
    const transaction = prepareContractCall({
      contract,
      method: "startLottery",
    });
    sendAndConfirmTx(transaction, {
      onSuccess: ({ transactionHash }) =>
        openNotification(
          "top",
          "success",
          `Tx success with hash: ${transactionHash} `
        ),
      onError: (error) =>
        openNotification(
          "top",
          "error",
          `Tx failed with error: ${error.message} `
        ),
    });
  };

  const enter = () => {
    const transaction = prepareContractCall({
      contract,
      method: "enter",
      params: [playerAddress],
      value: toWei("0.001"),
    });

    sendAndConfirmTx(transaction, {
      onSuccess: ({ transactionHash }) =>
        openNotification(
          "top",
          "success",
          `Tx success with hash: ${transactionHash} `
        ),
      onError: (error) =>
        openNotification(
          "top",
          "error",
          `Tx failed with error: ${error.message} `
        ),
    });
  };
  const pickWinner = () => {
    const transaction = prepareContractCall({
      contract,
      method: "pickWinner",
    });
    sendAndConfirmTx(transaction, {
      onSuccess: (receipt) => {
        openNotification(
          "top",
          "success",
          `Tx success with hash: ${receipt.transactionHash} `
        );
        console.log("transaction", receipt);
      },
      onError: (error) =>
        openNotification(
          "top",
          "error",
          `Tx failed with error: ${error.message} `
        ),
    });
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      {contextHolder}
      <div className="py-20 w-96">
        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            connectButton={{
              className: "w-full",
            }}
            connectModal={{
              size: "wide",
              title: "Connect Wallet",
              showThirdwebBranding: false,
            }}
          />
        </div>
        {connectedAddress && (
          <div>
            <div className="mb-10">
              <div className="flex">
                <Button className="mr-2" onClick={() => startLottery()}>
                  Start Lottery
                </Button>
                <Button className="mr-2" onClick={() => pickWinner()}>
                  Winner
                </Button>
                <Button
                  onClick={() => {
                    setShowPlayers((prevState) => !prevState);
                  }}
                >
                  Players
                </Button>
              </div>
              {showPlayers && (
                <p className="text-white mt-4">
                  {data.length ? JSON.stringify(data) : "No players found"}
                </p>
              )}
            </div>
            <Form form={form}>
              <Form.Item name={"player"}>
                <label className="text-white">Address</label>
                <Input
                  type="text"
                  onChange={({ target: { value } }) => {
                    form.setFieldValue("player", value);
                  }}
                />
              </Form.Item>
              <Button
                onClick={() => {
                  enter();
                }}
              >
                Enter
              </Button>

              <Form.Item name={"manager"}>
                <label className="text-white">Manager address</label>
                <Input
                  type="text"
                  onChange={({ target: { value } }) => {
                    form.setFieldValue("manager", value);
                  }}
                />
              </Form.Item>
              <Button
                onClick={() => {
                  const transaction = prepareContractCall({
                    contract,
                    method: "setManager",
                    params: [mangerAddress],
                  });
                  sendAndConfirmTx(transaction, {
                    onSuccess: ({ transactionHash }) =>
                      openNotification(
                        "top",
                        "success",
                        `Tx success with hash: ${transactionHash} `
                      ),
                    onError: (error) =>
                      openNotification(
                        "top",
                        "error",
                        `Tx failed with error: ${error.message} `
                      ),
                  });
                }}
              >
                Set Manager
              </Button>
            </Form>
          </div>
        )}
      </div>
    </main>
  );
}
