import { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "@/lib/s3";
// import { Pu } from "aws-sdk/clients/s3";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const bucketParams = new PutObjectCommand({
      Bucket: "sleekbbcs",
      Key: String(req.query.file),
      Body: "",
      ContentType: String(req.query.fileType),
    });

    const signedUrl = await getSignedUrl(s3Client, bucketParams);

    // console.log(url);

    res.status(200).json({ signedUrl });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
}
