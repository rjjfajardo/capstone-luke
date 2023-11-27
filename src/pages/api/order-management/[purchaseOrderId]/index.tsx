import { FileUploadI } from "@/components/templates/PurchaseOrderDetails/hooks";
import { prisma } from "@/prisma/prisma";
import { PurchaseOrderStatus } from "@prisma/client";

import { NextApiRequest, NextApiResponse } from "next";

async function getPurchaseOrder(req: NextApiRequest, res: NextApiResponse) {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: {
      id: String(req.query.purchaseOrderId),
    },
    select: {
      id: true,
      purchaseOrderNumber: true,
      projectId: true,
      status: true,
      deliveredAt: true,
      orderedAt: true,
      createdAt: true,
      deletedAt: true,
      project: {
        select: {
          createdAt: true,
        },
      },
      purchaseOrderMedia: {
        select: {
          id: true,
          fileName: true,
          fileUrl: true,
        },
      },
    },
  });

  return res.status(200).json(purchaseOrder);
}
async function updatePurchaseOrder(req: NextApiRequest, res: NextApiResponse) {
  const {
    values,
    files,
  }: {
    values: { status: PurchaseOrderStatus; deliveredAt: Date; orderedAt: Date };
    files: FileUploadI[];
  } = req.body;

  try {
    return await prisma.$transaction(async (transaction) => {
      await transaction.purchaseOrder.update({
        where: {
          id: String(req.query.purchaseOrderId),
        },
        data: {
          status: values.status,
          ...(values.deliveredAt && {
            deliveredAt: new Date(values.deliveredAt),
          }),
          ...(values.orderedAt && { orderedAt: new Date(values.orderedAt) }),
        },
      });

      const filesToSave = files.map((file) => ({
        purchaseOrderId: String(req.query.purchaseOrderId),
        fileUrl: file.fileUrl || "",
        fileName: file.fileName || "",
      }));

      await transaction.purchaseOrderMedia.deleteMany({
        where: {
          purchaseOrderId: String(req.query.purchaseOrderId),
        },
      });

      await transaction.purchaseOrderMedia.createMany({
        data: filesToSave,
      });

      return res.status(200).json({});
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getPurchaseOrder(req, res);
    case "PUT":
      return updatePurchaseOrder(req, res);
    default:
      return res.status(404).send({});
  }
}
