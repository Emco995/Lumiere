import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const website = searchParams.get("url")?.trim();

  if (!website) {
    return NextResponse.json({ imageUrl: null });
  }

  const normalizedUrl = website.startsWith("http")
    ? website
    : `https://${website}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    clearTimeout(timer);

    if (!res.ok) {
      return NextResponse.json({ imageUrl: null });
    }

    const html = await res.text();

    // 1. Provjeri OpenGraph ili Twitter sliku sa zvaničnog sajta salona
    const metaMatch =
      html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
      ) ||
      html.match(
        /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
      );

    let candidate = metaMatch?.[1]?.trim() || "";

    // 2. Ako nema og:image, pronađi prvu veliku sliku (jpg/png/webp) sa stranice salona
    if (!candidate) {
      const imgMatches = Array.from(
        html.matchAll(/<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/gi)
      );
      for (const m of imgMatches) {
        const src = m[1];
        if (
          src &&
          !src.toLowerCase().includes("logo") &&
          !src.toLowerCase().includes("icon")
        ) {
          candidate = src;
          break;
        }
      }
    }

    if (!candidate) {
      return NextResponse.json({ imageUrl: null });
    }

    if (candidate.startsWith("//")) {
      candidate = `https:${candidate}`;
    } else if (candidate.startsWith("/")) {
      const origin = new URL(normalizedUrl).origin;
      candidate = `${origin}${candidate}`;
    } else if (!candidate.startsWith("http")) {
      const origin = new URL(normalizedUrl).origin;
      candidate = `${origin}/${candidate}`;
    }

    return NextResponse.json({ imageUrl: candidate });
  } catch {
    return NextResponse.json({ imageUrl: null });
  }
}