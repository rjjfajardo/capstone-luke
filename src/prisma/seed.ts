const { PrismaClient } = require("@prisma/client");
const cuid = require("cuid");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { userId: cuid() },
    update: {},
    create: {
      fullName: "Blessy Grace Paglinawan",
      email: "andrew@gmail.com",
      password: bcrypt.hashSync("!JesusReigns2022", bcrypt.genSaltSync(10)),
      role: "admin",
      image: "",
      verificationStatus: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
