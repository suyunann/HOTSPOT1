@echo off
echo Generating Prisma client...
call npx prisma generate
echo Starting development server...
call npm run dev 