import { useContext } from "react";
import { WalletDataContext } from "../App";
import { convertToEther } from "../logic/wallet";

export default function SideBar() {
  const { walletAddress, transactions, status } = useContext(WalletDataContext);

  return (
    <>
      <div className="sideBar">
          {
            status == "loading" && (
              <div className="loaderBox">
                <div className="loader"></div>
              </div>
            )
          }
          
        <div className="transactionsCard" style={{ filter: status == "loading" ? "blur(10px)" : null}}>
          <ul className="headerOfTransactions">
            <li className="closeButton"></li>
            <li className="minimizeButton"></li>
            <li className="expandButton"></li>
            <li>
              <h3>Your Transactions</h3>
            </li>
          </ul>
          <div className="transactions">
            {transactions &&
              transactions.map((transaction) => {
                return (
                  <div className="transactionData">
                    <span className="amount">
                      {convertToEther(transaction.value)} ETH{" "}
                      {transaction.to.toLowerCase() ==
                      walletAddress.toLowerCase()
                        ? "Received"
                        : "Sended"}
                    </span>
                    <a href={`https://sepolia.etherscan.io/tx/${transaction.hash}`} target="blank" className="transactionEye">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABl0lEQVR4nO2Wv0oDQRCHY6FBNFErfQCxNDFYi71iJxa24kskWpigEUSUPISSYCfYWIldIsSHiPljKRKrfLIwgbjZ2btogk0+2GbvN7+5nZ3du0hkzJj/BlgHssAjUAfaMuoydwKkhplwB3ghPGVg+y8JV4AHfs89sDxo0j3g02HWBNJAEpiRsQZk5JnNB7AbJuEEcAp0HCZFIOaJjQElR5zxyhlvX9KCUraiGtjv4UpuuHZ6ABe4afpW6vCJAy3F69wWH6KTtrRTxgB4A2pA3sxZmiOP30FXlAC+PMKEZWoS2eQtjWk4jTawakQV/Pwos6zSpuZoNB8VI6qOILHZZx9VI9pUjk+XZIhSnw1Q6g6w0RVeeYQZR3PlZeVacx17/C5ts+chHac54F3xegIm7YAF4FUJKA1wgdwpHlVgXgtckq+LljwesFItaRlYDHrraeBWMWjJ5ZACZmWkZE+18t4Yz6Bq9ZZsXzk6YamJR+AW9SEXQc6zGq0q2UEaUgWIAlvy9TLd3+j59WnIXEE0Ud1pzJjI6PkGDLCOslXUiekAAAAASUVORK5CYII=" />
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
