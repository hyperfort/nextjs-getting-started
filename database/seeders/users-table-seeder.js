const { Role } = require("@prisma/client");
const bcrypt = require("bcrypt");

const { prisma } = require("../../lib/prisma");

class UsersTableSeeder {
  static async run() {
    await prisma.user.upsert({
      where: {
        email: "john.doe@nextjs.org",
      },
      update: {},
      create: {
        name: "John Doe",
        email: "john.doe@nextjs.org",
        password: bcrypt.hashSync("&elements.rope.562&", bcrypt.genSaltSync()),
        role: Role.ADMIN,
      },
    });
  }
}

module.exports = { UsersTableSeeder };
