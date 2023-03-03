// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { format } from "sql-formatter";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let { sql, language }: { sql: string; language: string } = req.body;
  try {
    let results = format(sql, { language: language });
    res.status(200).json({ result: results });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
