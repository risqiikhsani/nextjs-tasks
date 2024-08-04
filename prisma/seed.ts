import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { 
          name: 'Computer',
          price: 1000000,
          category: "electronics"
        },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
      username:'admin',
      password:'admin123'
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })

}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })