import { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "@/lib/s3";
// import { Pu } from "aws-sdk/clients/s3";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
	req: NextApiRequest,

	res: NextApiResponse
) {
	const ex = String(req.query.fileType).split("/")[1];

	try {
		const { fileType, file, origin } = req.query;

		// console.log(encodeURIComponent(file!));

		const Key = encodeURIComponent(`${uuidv4()}.${ex}`);

		const bucketParams = new PutObjectCommand({
			Bucket: "bbcs-repo",
			Key,
			Body: file as any,
			ContentType: fileType as string,
		});

		const signedUrl = await getSignedUrl(s3Client, bucketParams);

		// console.log(url);

		res.status(200).json({ signedUrl });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err });
	}
}
