import { useState, useEffect } from "react";
import { ethers } from "ethers";
import crypto_making_tree_abi from "../artifacts/contracts/Frontend.sol/Frontend.json";

export default function Homepage() {
  const [meMessage, setMeMessage] = useState("Account Holder Name: ARYAN VISHWAKARMA");
  const [defaultAccount, setDefaultAccount] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ethWallet, setEthWallet] = useState(undefined);
  const [Frontend, setFrontend] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const smcABI = crypto_making_tree_abi.abi;

  const getBalance = async () => {
    if (Frontend) {
      setBalance((await Frontend.getBalance()).toNumber());
    }
  };

  const topUp = async () => {
    if (Frontend) {
      let tx = await Frontend.topUp(1);
      await tx.wait();
      getBalance();
    }
  };

  const cashOut = async () => {
    if (Frontend) {
      let tx = await Frontend.cashOut(1);
      await tx.wait();
      getBalance();
    }
  };    

  const verifyAddress = async () => {
    if (Frontend) {
      try {
        const result = await Frontend.verifyAddress(defaultAccount[0]); // Replace with your verification logic
        setVerificationResult(result); // Set the verification result
      } catch (error) {
        console.error("Error verifying address:", error);
        setVerificationResult("Error verifying address");
      }
    }
  };

  const accessTransaction = async () => {
    if (Frontend) {
      try {
        const txResult = await Frontend.accessResource(); 
        console.log("Access Transaction Result:", txResult);
      } catch (error) {
        console.error("Error during access transaction:", error);
      }
    }
  };

  const displayAddress = async () => {
    if (Frontend) {
      let tx = await Frontend.displayAddress();
      await tx.wait();
    }
  };

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      console.log("getwallet is executed");
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      accountHandler(account);
    }
  };

  const accountHandler = async (accounts) => {
    if (accounts) {
      console.log("Account connected =", accounts);
      setDefaultAccount(accounts);
    } else {
      console.log("Account Not Located");
    }
  };

  const connectWalletHandler = async () => {
    if (!ethWallet) {
      alert("MetaMask Wallet is required to Connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });

    accountHandler(accounts);

    getMyContract();
  };

  const getMyContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, smcABI, signer);

    setFrontend(contract);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Enhance your experience by installing the MetaMask browser extension</p>;
    }
    if (!defaultAccount) {
      return (
        <button
          onClick={connectWalletHandler}
          style={{ color: "white", background: "Red" }}
        >
          <h3>"Link to Your Wallet"</h3>
        </button>
      );
    }

    getBalance();

    // Inside the return statement of the `initUser` function
return (
  <div>
    <h3 style={{ color: "Brown" }}>User Account : {defaultAccount}</h3>
    <p style={{ color: "Blue" }}>User Balance : {balance}</p>
    <button
      onClick={displayAddress}
      style={{ color: "Violet", background: "blue" }}
    >
      <h3 >Verify Address </h3>
    </button>
    <button
      onClick={topUp}
      style={{ color: "Black", background: "pink" }}
    >
      <h3 >Top Up Balance</h3>
    </button>
    <button
      onClick={cashOut}
      style={{ color: "white", background: "green" }}
    >
      <h3>Cash Out</h3>
    </button>
    <button
      onClick={displayAddress}
      style={{ color: "white", background: "blue" }}
    >
      <h3 >accessTransaction</h3>
    </button>
    
    
  </div>
);
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="ARYAN VISHWAKARMA">
      <h1>
        <marquee width="60%" direction="Left" height="80%">
        Welcome to Metacrafters ATM, where your banking journey begins with a warm greeting!
        </marquee>
      </h1>
      <h2>{meMessage}</h2>

      {initUser()}
      <style jsx>{`
        .ARYAN {
          background-image: url("https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjBza3l8ZW58MHx8MHx8fDA%3D&w=1000&q=80");
          background-position: center;
          background-size: cover;
          /* Adjust this to control how the image is displayed */
          width: 100%;
          /* Make sure it covers the entire viewport width */
          height: 100vh;
          /* Make it cover the entire viewport height */
          text-align: center;
          color: Black;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </main>
  );
}