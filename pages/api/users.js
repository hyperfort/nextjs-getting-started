import { createPaginator } from "prisma-pagination";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      break;
    default:
      const { page, filter } = req.query;
      const paginate = createPaginator({ perPage: 15, page });
      const users = await paginate(prisma.user, {
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              name: {
                contains: filter,
              },
            },
            { email: { contains: filter } },
          ],
        },
        select: {
          name: true,
          email: true,
        },
      });
      res.status(200).json(users);
  }
}
