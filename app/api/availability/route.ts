import { NextResponse } from "next/server";

// Exemple d’API simple qui limite à 4 commandes/jour.
export async function GET() {
  return NextResponse.json({ quotaPerDay: 4 });
}
