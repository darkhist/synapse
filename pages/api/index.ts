import type { NextApiRequest, NextApiResponse } from "next";

interface Response {
  msg: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  res.status(403).json({ msg: "Forbidden" });
}
