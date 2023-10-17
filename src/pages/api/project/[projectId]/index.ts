import { prisma } from "@/prisma/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { getSession } from "next-auth/react";
import { createActivityLog } from "../../activityLog";

async function getProject(req: NextApiRequest, res: NextApiResponse) {
	// const user = await getSession({ req });

	// const assignee = await prisma.projectAssignee.findMany({
	//   where: {
	//     projectId: String(req.query.projectId),
	//   },
	//   select: {
	//     userId: true,
	//   },
	// });TODO
	// //If user directly access the link and doest not have permission to view
	// if (user && user.user && !assignee.includes(user.user["id"]))
	//   console.log(typeof user?.user.id);

	try {
		const project = await prisma.project.findUnique({
			where: {
				id: String(req.query.projectId),
			},
			select: {
				id: true,
				title: true,
				procuringEntity: true,
				referenceNumber: true,
				areaOfDelivery: true,
				approvedBudgetContract: true,
				procurementMode: true,
				contractDuration: true,
				priority: true,
				status: true,
				postQualificationResult: {
					select: {
						result: true,
						dq_remarks: true,
					},
				},
				media: {
					select: {
						id: true,
						projectId: true,
						file: true,
						type: true,
					},
				},
				comment: {
					select: {
						user: {
							select: {
								fullName: true,
							},
						},
						text: true,
						createdAt: true,
					},
					orderBy: {
						createdAt: "desc",
					},
				},
				activityLog: {
					select: {
						user: {
							select: {
								fullName: true,
							},
						},
						createdAt: true,
						after: true,
					},
				},
			},
		});
		res.status(200).json(project);
	} catch (err) {
		res.status(404).send({});
	}
}

async function updateProject(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { status, remarks, result, userId } = req.body;

		return await prisma.$transaction(async (transaction) => {
			if (status) {
				const project = await transaction.project.update({
					where: {
						id: String(req.query.projectId),
					},
					data: {
						status,
					},
				});

				await createActivityLog(transaction, {
					projectId: String(project.id),
					userId,
					before: { values: [] },
					after: {
						values: [
							{
								message: `moved status to ${status}`,
								...(remarks && {
									info: `${result} - ${remarks}`,
								}),
							},
						],
					},
				});

				if (remarks && result) {
					await transaction.postQualificationResult.create({
						data: {
							projectId: project.id,
							dq_remarks: remarks,
							result,
						},
					});
				}
			}
			res.status(200).json({});
		});
	} catch (err) {
		res.status(400).send({ message: err });
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case "GET":
			return getProject(req, res);
		case "PUT":
			return updateProject(req, res);
		default:
			return res.status(404).send({});
	}
}
