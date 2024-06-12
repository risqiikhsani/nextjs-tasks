

## Pretest 1
jalankan di [vercel]([http://localhost:3000/](https://pretest1-6jx532x2g-risqiikhsanis-projects.vercel.app))



Sebelum menjalankan di local

```bash
set DATABASE_URL & NEXT_PUBLIC_URL di .env
npm install
npx prisma migrate dev --name init
npx prisma migrate reset

```

Cara menjalankan

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

jalankan di [localhost](http://localhost:3000/)
database dump location = /prisma/db.sql
