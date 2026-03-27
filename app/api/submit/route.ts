import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    name,
    email,
    digitalOnly,
    street,
    city,
    state,
    zip,
    country,
  } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 422 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required" },
      { status: 422 }
    );
  }

  const supabase = createServerClient();

  const { error } = await supabase.from("submissions").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    digital_only: digitalOnly === true,
    street: typeof street === "string" && street.trim() ? street.trim() : null,
    city: typeof city === "string" && city.trim() ? city.trim() : null,
    state: typeof state === "string" && state.trim() ? state.trim() : null,
    zip: typeof zip === "string" && zip.trim() ? zip.trim() : null,
    country:
      typeof country === "string" && country.trim() ? country.trim() : null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Failed to save your information. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
