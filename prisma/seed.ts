import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

  const postsData = [
    {
      "title": "coba 1",
      "text":"coba 1 text"
    },
    {
      "title": "coba 2",
      "text":"coba 2 text"
    },
  ]
  const seed1 = await prisma.post.createMany({ data: postsData })

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