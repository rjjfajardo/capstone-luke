import { prisma } from "@/prisma/prisma";
import nodemailer from "nodemailer";
import { PrismaClientValidationError } from "@prisma/client/runtime";

import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { getSession } from "next-auth/react";
import { createActivityLog } from "../activityLog";
// function NotifyUserAssignee()

async function createProject(req: NextApiRequest, res: NextApiResponse) {
  const {
    title,
    procuringEntity,
    referenceNumber,
    areaOfDelivery,
    approvedBudgetContract,
    procurementMode,
    contractDuration,
    priority,
    userId,
  } = req.body;

  const { files, assignee } = req.body;

  try {
    return await prisma.$transaction(async (transaction) => {
      const project = await transaction.project.create({
        data: {
          title,
          procuringEntity,
          referenceNumber,
          areaOfDelivery,
          approvedBudgetContract,
          procurementMode,
          contractDuration,
          priority,
          status: "Pre Bid",
        },
      });

      if (!project) return;

      assignee.map(async (u: string) => {
        const user = await transaction.projectAssignee.create({
          data: {
            userId: u,
            projectId: project.id,
          },
        });
        return user;
      });

      await createActivityLog(transaction, {
        projectId: String(project.id),
        userId,
        before: { values: [] },
        after: { values: [{ message: "created a project", userId }] },
      });

      //TODO: Refactor this one for more effienciency since this takes time during the transaction process
      // const transporter = nodemailer.createTransport({
      //   port: 465,
      //   host: process.env.MAIL_HOST,
      //   auth: {
      //     user: process.env.SMTP_USER,
      //     pass: process.env.SMTP_PASSWORD,
      //   },
      //   secure: true,
      // });
      // const mailData = {
      //   from: process.env.SMTP_USER,
      //   to: "bgrace25@gmail.com",
      //   subject: `You have been assign to a project`,
      //   html: `<div>
      //       Hello Blessy!
      //       <a href="${process.env.NEXTAUTH_URL}/projects/${project.id}">link</a>.

      //   <div>`,
      // };

      // await transporter.sendMail(mailData);

      // const mediaPromises = files.map(
      //   async (file: { file: string; fileType: string }) => {
      //     const media = await transaction.media.create({
      //       data: {
      //         projectId: project.id,
      //         file: file.file,
      //         type: file.fileType,
      //       },
      //     });
      //     return media;
      //   }
      // );
      // await Promise.all(mediaPromises);
      return res.status(200).send({});
    });
  } catch (err: any) {
    console.log(err);
    return res.status(400).send({ err });
  }
}
async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  // if (user?.user.role !== "admin")
  //   return res.status(400).send({ message: "Unauthorized access" });

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      referenceNumber: true,
      approvedBudgetContract: true,
      priority: true,
      status: true,
      projectAssignee: {
        select: {
          user: {
            select: {
              userId: true,
              image: true,
              fullName: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(projects);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getProjects(req, res);
    case "POST":
      return createProject(req, res);
    default:
      return res.status(404).send({});
  }
}
