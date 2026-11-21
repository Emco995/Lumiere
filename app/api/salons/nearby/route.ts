import { NextRequest, NextResponse } from "next/server";

const STYLIST_AVATARS = [
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
];

function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

async function extractRealSalonImage(websiteUrl?: string): Promise<string | null> {
  if (!websiteUrl) return null;
  const normalizedUrl = websiteUrl.startsWith("http")
    ? websiteUrl
    : `https://${websiteUrl}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1800);
    const res = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });
    clearTimeout(timer);
    if (!res.ok) return null;

    const html = await res.text();
    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);

    if (ogMatch && ogMatch[1]) {
      const rawImg = ogMatch[1].trim();
      if (rawImg.startsWith("http")) return rawImg;
      if (rawImg.startsWith("//")) return `https:${rawImg}`;
      if (rawImg.startsWith("/")) {
        const origin = new URL(normalizedUrl).origin;
        return `${origin}${rawImg}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function formatSalonObject(
  id: string,
  name: string,
  city: string,
  address: string,
  shopType: string,
  idx: number,
  realImageUrl: string | null,
  distanceKm?: number,
  ratingOverride?: number,
  reviewsOverride?: number
) {
  const lower = `${shopType} ${name}`.toLowerCase();

  const isHair =
    lower.includes("hair") ||
    lower.includes("friseur") ||
    lower.includes("frizer") ||
    lower.includes("coiffeur") ||
    lower.includes("barber");
  const isNail =
    lower.includes("nail") ||
    lower.includes("nokt") ||
    lower.includes("manik") ||
    lower.includes("pedik");
  const isMassage =
    lower.includes("massage") ||
    lower.includes("spa") ||
    lower.includes("masaž") ||
    lower.includes("wellness") ||
    lower.includes("thai");

  const category = isHair
    ? "Kosa"
    : isNail
    ? "Nokti"
    : isMassage
    ? "Masaža"
    : "Lice & Tijelo";

  const cleanCity = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    id,
    slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${idx}`,
    name,
    city: cleanCity,
    address: address || `${cleanCity}, Centar`,
    distanceKm,
    rating: ratingOverride ?? Number((4.75 + (idx % 5) * 0.05).toFixed(2)),
    reviewsCount: reviewsOverride ?? 42 + idx * 17,
    coverImage: realImageUrl || "",
    stylists: [
      {
        id: `st-${id}-1`,
        name: isHair
          ? "Senior Frizer & Stilista"
          : isNail
          ? "Nail Artist Specijalista"
          : isMassage
          ? "Wellness Terapeut"
          : "Kozmetičar Specijalista",
        role: isHair
          ? "Hair Styling & Color"
          : isNail
          ? "Manicure & Pedicure"
          : isMassage
          ? "Massage & Spa Therapy"
          : "Beauty & Aesthetic Care",
        rating: 4.91,
        reviewsCount: 58 + idx * 9,
        avatar: STYLIST_AVATARS[idx % STYLIST_AVATARS.length],
        specialties: isHair
          ? ["Šišanje i feniranje", "Balayage / Koloracija", "Njega kose"]
          : isNail
          ? ["Ruski manikir", "Gel nokti", "Spa pedikir"]
          : ["Relaks masaža", "Tretman lica", "Njega tijela"],
        availableSlots: ["10:00", "12:30", "15:00", "17:30"],
      },
    ],
    services: isHair
      ? [
          {
            id: `srv-${id}-1`,
            name: "Šišanje, pranje & feniranje",
            category,
            durationMin: 60,
            priceEur: 35,
            description: "Individualna konsultacija, pranje i stilizovanje kose.",
          },
          {
            id: `srv-${id}-2`,
            name: "Balayage / Koloracija & Njega",
            category,
            durationMin: 120,
            priceEur: 85,
            description: "Profesionalno nijansiranje uz zaštitu strukture vlasi.",
          },
        ]
      : isNail
      ? [
          {
            id: `srv-${id}-1`,
            name: "Manikir + Trajni lak / Gel",
            category,
            durationMin: 60,
            priceEur: 45,
            description: "Detaljna obrada zanoktica i oblikovanje noktiju.",
          },
          {
            id: `srv-${id}-2`,
            name: "Estetski Spa pedikir",
            category,
            durationMin: 60,
            priceEur: 50,
            description: "Kompletna njega stopala i lakiranje.",
          },
        ]
      : [
          {
            id: `srv-${id}-1`,
            name: "Personalizovani tretman njege",
            category,
            durationMin: 60,
            priceEur: 55,
            description: "Profesionalni tretman prilagođen vašem tipu kože.",
          },
          {
            id: `srv-${id}-2`,
            name: "Relaks & Regenerativni tretman",
            category,
            durationMin: 60,
            priceEur: 65,
            description: "Opuštajući tretman za potpunu revitalizaciju.",
          },
        ],
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "city";
  const cityQuery = searchParams.get("city")?.trim() || "";
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");
  const radiusKm = Math.min(
    Math.max(Number(searchParams.get("radius") || 10), 1),
    100
  );

  try {
    let centerLat: number | null = latParam ? Number(latParam) : null;
    let centerLon: number | null = lonParam ? Number(lonParam) : null;
    let resolvedCityName = cityQuery;

    // 1. Pouzdano geokodiranje grada putem Open-Meteo Geocoding API-ja (radi munjevito na Windowsu)
    if (mode === "city" || centerLat === null || centerLon === null) {
      if (!cityQuery) {
        return NextResponse.json({ salons: [] });
      }

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityQuery
        )}&count=1&language=en&format=json`
      );

      if (!geoRes.ok) {
        return NextResponse.json({ salons: [] });
      }

      const geoData = await geoRes.json();
      const firstResult = geoData?.results?.[0];

      if (!firstResult) {
        return NextResponse.json({ salons: [] });
      }

      centerLat = firstResult.latitude;
      centerLon = firstResult.longitude;
      resolvedCityName = firstResult.name || cityQuery;
    }

    const searchRadiusMeters =
      mode === "city" ? 12000 : Math.round(radiusKm * 1000);

    // 2. Ako postoji Google Places API ključ -> povuci stvarne Google Maps salone i prave slike
    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (googleApiKey && centerLat !== null && centerLon !== null) {
      const textQuery =
        mode === "city"
          ? `hair salon beauty salon nail salon massage spa in ${resolvedCityName}`
          : `hair salon beauty salon nail salon massage spa`;

      const gRes = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": googleApiKey,
            "X-Goog-FieldMask":
              "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.photos",
          },
          body: JSON.stringify({
            textQuery,
            locationBias: {
              circle: {
                center: { latitude: centerLat, longitude: centerLon },
                radius: searchRadiusMeters,
              },
            },
            maxResultCount: 20,
          }),
        }
      );

      if (gRes.ok) {
        const gData = await gRes.json();
        const places = gData.places || [];

        const salons = places
          .map((p: any, idx: number) => {
            const pLat = p.location?.latitude ?? centerLat!;
            const pLon = p.location?.longitude ?? centerLon!;
            const dist =
              mode === "nearby"
                ? calculateDistanceKm(centerLat!, centerLon!, pLat, pLon)
                : undefined;

            const photoName = p.photos?.[0]?.name;
            const realPhotoUrl = photoName
              ? `/api/salons/photo?name=${encodeURIComponent(photoName)}`
              : null;

            return formatSalonObject(
              `google-${p.id}`,
              p.displayName?.text || "Beauty Salon",
              resolvedCityName || "Grad",
              p.formattedAddress || resolvedCityName,
              (p.types || []).join(" "),
              idx,
              realPhotoUrl,
              dist,
              p.rating,
              p.userRatingCount
            );
          })
          .filter((s: any) =>
            mode === "nearby" ? (s.distanceKm ?? 0) <= radiusKm : true
          );

        return NextResponse.json({ salons, source: "google_places" });
      }
    }

    // 3. Paralelni upit prema Overpass serverima (ko prvi odgovori dobija prednost)
    const overpassQuery = `[out:json][timeout:12];(node["shop"~"hairdresser|beauty|massage|cosmetics"](around:${searchRadiusMeters},${centerLat},${centerLon});way["shop"~"hairdresser|beauty|massage|cosmetics"](around:${searchRadiusMeters},${centerLat},${centerLon}););out center 30;`;

    const mirrors = [
      "https://overpass-api.de/api/interpreter",
      "https://lz4.overpass-api.de/api/interpreter",
      "https://z.overpass-api.de/api/interpreter",
    ];

    let elements: any[] = [];

    for (const mirror of mirrors) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 9000);

        const res = await fetch(mirror, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "LumiereBeautyPlatform/1.0",
          },
          body: `data=${encodeURIComponent(overpassQuery)}`,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const text = await res.text();
          if (text.trim().startsWith("{")) {
            const parsed = JSON.parse(text);
            elements = parsed.elements || [];
            if (elements.length > 0) break;
          }
        }
      } catch {
        // Nastavi na sljedeći mirror
      }
    }

    const seenKeys = new Set<string>();
    const rawItems: {
      id: string;
      name: string;
      city: string;
      address: string;
      shopType: string;
      website?: string;
      image?: string;
      dist?: number;
    }[] = [];

    for (const el of elements) {
      const tags = el.tags || {};
      const name = tags.name;
      if (!name) continue;

      const elLat = el.lat ?? el.center?.lat ?? centerLat!;
      const elLon = el.lon ?? el.center?.lon ?? centerLon!;
      const dist =
        mode === "nearby"
          ? calculateDistanceKm(centerLat!, centerLon!, elLat, elLon)
          : undefined;

      if (mode === "nearby" && dist !== undefined && dist > radiusKm) continue;

      const street = tags["addr:street"] || "";
      const houseNum = tags["addr:housenumber"] || "";
      const postcode = tags["addr:postcode"] || "";
      const itemCity = tags["addr:city"] || resolvedCityName || cityQuery;
      const address = [
        `${street} ${houseNum}`.trim(),
        postcode,
        itemCity,
      ]
        .filter(Boolean)
        .join(", ");

      const key = `${name.toLowerCase()}-${street.toLowerCase()}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        rawItems.push({
          id: `osm-${el.id}`,
          name,
          city: itemCity,
          address,
          shopType: tags.shop || "beauty",
          website: tags.website || tags["contact:website"],
          image: tags.image,
          dist,
        });
      }
    }

    if (mode === "nearby") {
      rawItems.sort((a, b) => (a.dist ?? 0) - (b.dist ?? 0));
    }

    const limitedItems = rawItems.slice(0, 24);

    // Pokušaj izvući stvarnu fotografiju sa zvaničnog sajta salona za prvih 12 rezultata radi brzine
    const salons = await Promise.all(
      limitedItems.map(async (item, idx) => {
        const directImg =
          typeof item.image === "string" && item.image.startsWith("http")
            ? item.image
            : null;
        const websiteImg =
          directImg ||
          (idx < 12 ? await extractRealSalonImage(item.website) : null);

        return formatSalonObject(
          item.id,
          item.name,
          item.city,
          item.address,
          item.shopType,
          idx,
          websiteImg,
          item.dist
        );
      })
    );

    return NextResponse.json({ salons, mode, resolvedCityName });
  } catch (error) {
    console.error("Greška pri pretrazi salona:", error);
    return NextResponse.json({ salons: [] });
  }
}