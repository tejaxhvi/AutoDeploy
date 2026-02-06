# Full-Stack Dockerized App (React + Node + Nginx)

This project demonstrates a clean, production-style full-stack setup using:

- React for the frontend UI  
- Node.js (Express) for the backend API  
- Nginx as a reverse proxy and single public entry point  
- Docker & Docker Compose for isolation and orchestration  

The goal is to show how real-world apps are structured, routed, and deployed — not just how to “make it work”.

---

## Architecture Overview

There are three separate services, each running in its own container:

1. Frontend (React)
   - Serves the UI
   - Sends API requests and file uploads
2. Backend (Node + Express)
   - Handles API requests
   - Exposes:
     - `GET /api/hello`
     - `POST /api/upload` (file upload)
3. Nginx
   - Acts as the single public gateway
   - Routes requests to frontend or backend based on URL path

📁 Project Structure

AutoDeploy/
│
├── docker-compose.yml
│
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── build/
│
└── backend/
    ├── Dockerfile
    ├── package.json
    └── server.js
