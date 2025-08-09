# School Management API

Simple Node.js + Express API with MySQL to add schools and list them sorted by proximity.

## Features
- POST /api/addSchool — add a school (name, address, latitude, longitude)
- GET  /api/listSchools?latitude=..&longitude=.. — list schools sorted by distance

## Quick start (local)
1. Clone repo
2. Copy `.env.example` to `.env` and fill DB credentials
3. Create database and table (see `sql/create_table.sql`)
4. Install deps:
   ```bash
   npm install
   ```
5. Run:
   ```bash
   npm run dev
   ```
6. Test with Postman collection `Postman/SchoolManagement.postman_collection.json`

## SQL
See `sql/create_table.sql` for the `schools` table definition.

## Deploy
- Push to GitHub and deploy on Render/Railway.
- Set environment variables in the host dashboard from `.env`.
