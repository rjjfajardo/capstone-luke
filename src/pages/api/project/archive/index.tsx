import { prisma } from "@/prisma/prisma";

import { NextApiRequest, NextApiResponse } from "next";

async function getAllArchivedProjects(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects =
    await prisma.$queryRaw`SELECT * FROM Project WHERE deletedAt IS NOT NULL`;

  return res.status(200).json(projects);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getAllArchivedProjects(req, res);
    default:
      return res.status(404).send({});
  }
}
