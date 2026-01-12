import { NextResponse } from 'next/server';

/**
 * Option 3: Share link access control
 * Endpoint: /api/share?token=VALID_TOKEN
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // ১. Security Check: Token Validation (Mocked)
  if (token !== "sentry-access-token-2026") {
    return NextResponse.json(
      { error: "Access Denied: Invalid or expired token" }, 
      { status: 403 }
    );
  }

  // ২. Logic: Access Logging (Implementation of requirement)
  console.log(`[AUDIT LOG]: Supplier profile accessed via token at ${new Date().toISOString()}`);

  // ৩. Response: Selective Data (Limited Profile Info)
  return NextResponse.json({
    status: "Success",
    supplier: "Global Garments Factory",
    shared_documents: [
      { name: "Fire Safety Certificate", version: "v2", expiry: "2027-01-01" },
      { name: "Code of Conduct", version: "v1", expiry: "2026-12-15" }
    ],
    permissions: "READ_ONLY",
    expiresAt: "2026-02-15T23:59:59Z"
  });
}