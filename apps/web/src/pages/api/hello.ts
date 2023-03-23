import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@bites/db";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await db.selectFrom("users").selectAll().execute();

  res.status(200).json({ users });
}
