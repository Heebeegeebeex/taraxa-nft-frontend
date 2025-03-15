import { useState, useEffect } from "react";
import { ethers } from "ethers";
import QRCode from "qrcode.react";

export default function Home() {  // ✅ This must be a React component
  const [wallet, setWallet] = useState("");
  const [nfts, setNfts] = useState([]);
  const [minting, setMinting] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  
  // Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setWallet(await signer.getAddress());
    } else {
      alert("MetaMask is required to use this feature");
    }
  };
  
  // Fetch User NFTs
  useEffect(() => {
    if (wallet) {
      fetch(`/api/get-taraxa-nfts?wallet=${wallet}`)
        .then((res) => res.json())
        .then((data) => setNfts(data.nfts || []))
        .catch((err) => console.error("Error fetching NFTs:", err));
    }
  }, [wallet]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Taraxa NFT Platform</h1>
      {!wallet ? (
        <button onClick={connectWallet} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected: {wallet}</p>
          <h2 className="mt-6 text-xl font-semibold">Your NFTs</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {nfts.map((nft, index) => (
              <div key={index} className="border p-2">
                <img src={nft.metadata} alt="NFT" className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
