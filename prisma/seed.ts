import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('test')
}

await main()
  .then(async () => {
    console.log('seeded')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('error')
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
