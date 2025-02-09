import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const todos = [
    {
      title: "Learn Prisma",
      isCompleted: false,
    },
    {
      title: "Build API with Hono",
      isCompleted: true,
    },
    {
      title: "Deploy to Azure",
      isCompleted: false,
    },
  ];

  for (const todo of todos) {
    await prisma.todo.create({
      data: todo,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
