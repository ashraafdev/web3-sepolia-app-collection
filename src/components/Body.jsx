import { useContext } from "react";
import { WalletDataContext } from "../App";

export default function Body() {
  const { getAddressData } = useContext(WalletDataContext);

  return (
    <>
      <div className="body">
        <div className="header">
          <h1>
            Your Web3 Transactions between Your Hands!
          </h1>
          <h3>Get Your Portfolio Transactions</h3>
        </div>
        <form onSubmit={getAddressData}>
          <input name="walletAddress" id="walletAddress" required placeholder="Give your wallet address" />
          <button>Find Wallet Data</button>
        </form>
      </div>
    </>
  );
}
