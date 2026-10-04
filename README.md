# Full-Stack Dockerized App (React + Node + Nginx)

This project demonstrates a clean, production-style full-stack setup using:

- React for the frontend UI  
- Node.js (Express) for the backend API  
- Nginx as a reverse proxy and single public entry point  
- Docker & Docker Compose for isolation and orchestration  

The goal is to show how real-world apps are structured, routed, and deployed — not just how to “make it work”.

## Google Cloud Storage configuration

Deployment uploads are stored in Google Cloud Storage. Create a bucket, then grant the backend runtime service account permission to create objects in that bucket (for example, `roles/storage.objectCreator`). Do not commit service-account JSON files.

Set these backend environment variables:

```dotenv
GCS_BUCKET=your-bucket-name
# Optional when the project cannot be inferred from credentials:
GOOGLE_CLOUD_PROJECT=your-project-id
# Local development only when running Node directly:
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/service-account.json
```

The backend uses [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials). On Google Cloud, prefer an attached service account or Workload Identity and omit `GOOGLE_APPLICATION_CREDENTIALS`. For direct local Node development, copy `backend/.env.example` to `backend/.env` and point `GOOGLE_APPLICATION_CREDENTIALS` to a service-account file stored outside this repository.

A host credential path is not automatically visible inside Docker. For local Compose use, mount the file read-only and set its in-container path:

```yaml
services:
  backend:
    environment:
      GCS_BUCKET: your-bucket-name
      GOOGLE_APPLICATION_CREDENTIALS: /run/secrets/gcp-service-account.json
    volumes:
      - /absolute/host/path/service-account.json:/run/secrets/gcp-service-account.json:ro
```

This code change does not copy existing objects from S3. Migrate and verify historical objects separately before removing the AWS bucket.

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
