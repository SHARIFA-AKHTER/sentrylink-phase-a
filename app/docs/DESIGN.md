# Phase B: Mini Design Doc - SentryLink Comply

## 1. Stack Choice & Justification
- **Frontend:** Next.js 15 (App Router) + Tailwind CSS + TypeScript. (Next.js provides excellent developer experience and built-in optimization).
- **Backend:** Node.js with NestJS (Standardized structure) or Next.js API Routes for simpler logic.
- **Database:** PostgreSQL with Prisma ORM (Relational DB is essential for Buyer-Supplier mapping).
- **Storage:** AWS S3 with IAM policies to ensure private document hosting.

## 2. Data Model (Key Entities)
- **Supplier:** `id, name, contact_email, country`
- **Evidence:** `id, supplier_id, name, type (Enum: ISO, Policy, etc.)`
- **EvidenceVersion:** `id, evidence_id, version_no, s3_url, is_shared (Boolean), created_at`
- **BuyerRequest:** `id, buyer_id, supplier_id, doc_type, status (Pending, Fulfilled), version_id (Nullable)`

## 3. Selective Disclosure Logic
- Only versions where `is_shared: true` are accessible to Buyers.
- When a Supplier "Fulfills" a request, the system creates a link between the `BuyerRequest` and the specific `EvidenceVersion`, automatically toggling the `is_shared` flag.

## 4. Export Pack Approach
- **Asynchronous Processing:** Since zipping large files is CPU intensive, we use a Redis-based queue (BullMQ).
- **Workflow:** 1. User triggers export -> API returns job_id. 
  2. Worker zips files and uploads to S3 -> Generates a Pre-signed URL. 
  3. User is notified via WebSocket/Email to download the pack.

## 5. 8-Week Delivery Plan
- **W1-2:** Core Auth, Database Schema, and Basic Evidence CRUD.
- **W3-4:** Buyer Request workflow and Fulfillment engine.
- **W5-6:** Access Control (Selective Disclosure) and Pack Export Worker.
- **W7-8:** Security Hardening, E2E Testing, and Deployment.