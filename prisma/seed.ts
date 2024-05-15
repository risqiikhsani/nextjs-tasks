import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

  const jenisKelamin = [
    {
      "kode": "1",
      "jenis_kelamin": "laki-laki"
    },
    {
      "kode": "2",
      "jenis_kelamin": "perempuan"
    },
  ]
  const seed1 = await prisma.jenisKelamin.createMany({ data: jenisKelamin })
  const profesi = [
    {
      "kode": "A",
      "nama_profesi": "Petani"
    },
    {
      "kode": "B",
      "nama_profesi": "Teknisi"
    },
    {
      "kode": "C",
      "nama_profesi": "Guru"
    },
    {
      "kode": "D",
      "nama_profesi": "Nelayan"
    },
    {
      "kode": "E",
      "nama_profesi": "Seniman"
    },

  ]
  const seed2 = await prisma.profesi.createMany({data:profesi})
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