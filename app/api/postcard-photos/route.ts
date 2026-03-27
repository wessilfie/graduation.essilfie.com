import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dir = join(process.cwd(), "public", "postcard-photos");
    const files = await readdir(dir);
    const images = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
    return NextResponse.json({ photos: images.map(f => `/postcard-photos/${f}`) });
  } catch {
    return NextResponse.json({ photos: [] });
  }
}
