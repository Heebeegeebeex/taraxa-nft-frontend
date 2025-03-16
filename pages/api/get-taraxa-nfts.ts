import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { wallet } = req.query;
    if (!wallet) {
        return res.status(400).json({ error: "Missing wallet address" });
    }

    try {
        // Replace this URL with the actual Taraxa API
        const response = await fetch(`https://taraxa-api.example.com/nfts?wallet=${wallet}`);

        if (!response.ok) {
            throw new Error(`Taraxa API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return res.status(200).json({ nfts: data.nfts || [] });

    } catch (error) {
        console.error("Error fetching NFTs:", error);
        return res.status(500).json({ error: "Failed to fetch NFTs" });
    }
}


