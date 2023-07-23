# https://knexjs.org/guide/#configuration-options
# https://www.npmjs.com/package/better-sqlite3
echo [Install db libs]
npm i knex better-sqlite3 @types/better-sqlite3


# npm i sqlite3 @types/sqlite3
echo [Install db prisma]
npm install -D prisma
npm install @prisma/client


# https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props