import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { data } = req.body;
    const tok = uuidv4();
    const checkEmail = await prisma.user.findFirst({
      where: {
        email: data.data.email,
        deletedAt: null,
      },
    });

    if (checkEmail) {
      const createRecord = await prisma.forgotPassword.create({
        data: {
          userId: checkEmail.userId,
          token: tok,
        },
      });
      if (createRecord) {
        const transporter = nodemailer.createTransport({
          port: 465,
          host: process.env.MAIL_HOST,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
          secure: true,
        });
        const mailData = {
          from: process.env.SMTP_USER,
          to: checkEmail.email,
          subject: `Reset Password`,
          html: `<div>
              Hello ${checkEmail.fullName}!
              This is an automated reply from BBCS Data System. Please do not reply.
              You are receiving this email because we received a request to reset the password for your account.
              To proceed, reset your password through this <a href="${process.env.NEXTAUTH_URL}/password/reset-password/${createRecord.token}">link</a>.
              The link will only be available for 5 minutes and can only be used once.

          <div>`,
        };

        await transporter.sendMail(mailData);
        res.status(200).send({ message: "Success!" });
      }
    } else {
      res.status(400).send({ message: "Email doesn't exist" });
    }

    await prisma.$disconnect();
  }
}
