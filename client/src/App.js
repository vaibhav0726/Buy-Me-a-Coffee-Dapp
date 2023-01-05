import abi from "./contracts/buyACoffee.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import Memos from "./components/Memos";
import Buy from "./components/Buy";

import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x71fe89cd46bcf07f503272a60696af932d6d7ee7";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          // reflecting chain changed to ui
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          // reflecting accounts changed to ui
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (err) {
        console.error(err);
      }
    };
    connectWallet();
  }, []);

  // console.log(state);

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <p
        className="text-muted lead"
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account:- {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
