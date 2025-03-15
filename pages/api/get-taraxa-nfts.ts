import { NextApiRequest, NextApiResponse } from "next";

// Dummy API to check if the endpoint is working
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ message: "API is working!" });
}
