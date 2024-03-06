import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import SideBar from "./components/Sidebar";
import Header from "./components/Header";
import Body from "./components/Body";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";

export const WalletDataContext = createContext(null);

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  const [transactions, setTransactions] = useState([]);

  console.log(import.meta.env.VITE_ETHERSCAN_API);

  const fetchTransactions = async () => {
    try {
      const req = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${import.meta.env.VITE_ETHERSCAN_API}`);
      const res = await req.json();
  
      if (res.status == 0) throw new Error(res.result);
      return res.result;
    } catch (err) {
      setTransactions([]);
      throw new Error(walletAddress);
    }
  }

  const {data, status, refetch} = useQuery(["transactions", walletAddress], fetchTransactions, {
    enabled: false,
    cacheTime: 1000,
  });

  const getAddressData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    setWalletAddress(formData.get('walletAddress'));
  }

  useEffect(() => {
    if (walletAddress) refetch();
  }, [walletAddress])

  useEffect(() => {
    if (!appIsLoaded) setAppIsLoaded(true);
    else {
      if (status == "success") setTransactions(data);
      else if (status == "error") toast.error("Error when try to fetch transactions");
    }
  }, [status, data]);

  return (
    <WalletDataContext.Provider value={{walletAddress, setWalletAddress, getAddressData, status, transactions}}>
      <SideBar />
      <div className="mainContent">
        <Header />
        <Body />
      </div>
      <Toaster />
    </WalletDataContext.Provider>
  );
}

export default App;
