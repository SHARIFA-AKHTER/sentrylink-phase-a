# SentryLink Comply - Evidence Vault & Buyer Request UI

A modern, responsive dashboard built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**. This project features a modular architecture for managing compliance documents and buyer requests.

## 🚀 Key Features
- **Evidence Vault**: Filter and search through compliance documents.
- **Version Tracking**: Detailed view of document history and versioning.
- **Buyer Requests (To-Do)**: Track and fulfill document requests from buyers.
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
- **Modular Components**: Reusable Table, Modal, and Status Chips.

## 📁 Project Structure
- `src/app`: Routes and Page layouts.
- `src/components/ui`: Basic UI elements (Modal, StatusChip).
- `src/components/table`: Reusable Data Table.
- `src/components/shared`: Sidebar and Navbar.
- `src/data`: Mocked JSON data storage.

## 🛠️ Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/SHARIFA-AKHTER/sentrylink-phase-a.git
   cd sentrylink-task
Install dependencies:

Live Demo: https://sentrylink-task.vercel.app

npm install
Run the development server:
npm run dev
Open http://localhost:3000 in your browser.

🧠 Assumptions
Data is served from a local JSON file (mockData.json).

Next.js 15 App Router is used for navigation.

Tailwind CSS is used for styling to ensure scalability.

---
## Phase B: Implementation Details

### Part C: Change Request
**Rule:** "Buyer can only access evidence versions that were explicitly shared."
**Change Implemented:** I introduced an `is_shared` boolean attribute in the `EvidenceVersion` entity. 
- **The Filter:** The API logic was updated to add a mandatory condition: `WHERE version.is_shared = true`. 
- **The Trigger:** This flag is set to `true` only when a Supplier selects a specific version during the "Fulfill Request" process or manually adds it to a "Pack".

### Top 3 Risks & Mitigation
1. **Security (Document Leakage):** Using public S3 URLs is a risk. 
   - *Mitigation:* Use **AWS S3 Pre-signed URLs** with a 5-minute expiration for all document views.
2. **Scalability (Heavy Exports):** Large zip exports can crash the main server. 
   - *Mitigation:* Offload zipping to an **Async Background Worker** (Node.js worker threads or AWS Lambda).
3. **Compliance (Data Residency):** Some buyers require data to stay in specific regions (e.g., GDPR). 
   - *Mitigation:* Implement **Multi-region S3 buckets** and store metadata identifying the region of origin.