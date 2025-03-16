import React from "react";

interface NFTProps {
  metadata: string;
  qrCodeUrl: string;
}

const NFTCard: React.FC<NFTProps> = ({ metadata, qrCodeUrl }) => {
  return (
    <div className="border p-2">
      <img src={metadata} alt="NFT" className="w-full h-auto" />
      <p>{qrCodeUrl}</p>
    </div>
  );
};

export default NFTCard;
