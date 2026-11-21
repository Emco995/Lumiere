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

function buildSalonObject(
  id: string,
  name: string,
  city: string,
  address: string,
  tags: Record<string, any>,
  idx: number,
  lat?: number,
  lon?: number,
  distanceKm?: number
) {
  const shopType = String(tags.shop || "");
  const beautyType = String(tags.beauty || "");
  const lower = `${shopType} ${beautyType} ${name}`.toLowerCase();

  const isNail =
    lower.includes("nail") ||
    lower.includes("nokt") ||
    lower.includes("manik") ||
    lower.includes("pedik") ||
    lower.includes("nagel");

  const isMassage =
    lower.includes("massage") ||
    lower.includes("spa") ||
    lower.includes("masaž") ||
    lower.includes("wellness") ||
    lower.includes("thai");

  const isHair =
    !isNail &&
    !isMassage &&
    (lower.includes("hair") ||
      lower.includes("friseur") ||
      lower.includes("frizer") ||
      lower.includes("coiffeur") ||
      lower.includes("barber") ||
      shopType === "hairdresser");

  const category = isHair
    ? "Kosa"
    : isNail
    ? "Nokti"
    : isMassage
    ? "Masaža"
    : "Lice & Tijelo";

  let realImage = "";
  if (typeof tags.image === "string" && tags.image.startsWith("http")) {
    realImage = tags.image;
  } else if (typeof tags.wikimedia_commons === "string") {
    const fileName = tags.wikimedia_commons.replace(/^File:/i, "");
    realImage = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
      fileName
    )}?width=800`;
  }

  return {
    id,
    slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${idx}`,
    name,
    city,
    address: address || `${city}, Centar`,
    lat,
    lon,
    website: tags.website || tags["contact:website"],
    distanceKm,
    rating: Number((4.75 + (idx % 5) * 0.05).toFixed(2)),
    reviewsCount: 38 + idx * 14,
    coverImage: realImage,
    stylists: [
      {
        id: `st-${id}`,
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
        rating: 4.92,
        reviewsCount: 54 + idx * 7,
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
    Math.max(Number(searchParams.get("radius") || 15), 1),
    100
  );

  try {
    let centerLat: number | null = latParam ? Number(latParam) : null;
    let centerLon: number | null = lonParam ? Number(lonParam) : null;
    let resolvedCity = cityQuery;

    // 1. Geokodiraj grad putem Open-Meteo API-ja
    if (mode === "city" || centerLat === null || centerLon === null) {
      if (!cityQuery) {
        return NextResponse.json({ salons: [] });
      }

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityQuery
        )}&count=1&language=en&format=json`,
        { cache: "no-store" }
      );

      if (!geoRes.ok) {
        return NextResponse.json({ salons: [] });
      }

      const geoData = await geoRes.json();
      const first = geoData?.results?.[0];
      if (!first) {
        return NextResponse.json({ salons: [] });
      }

      centerLat = first.latitude;
      centerLon = first.longitude;
      resolvedCity = first.name || cityQuery;
    }

    const searchRadiusMeters =
      mode === "city" ? 9000 : Math.min(Math.round(radiusKm * 1000), 25000);

    // 2. Overpass upit sa Vercel servera
    const overpassQuery = `[out:json][timeout:10];(node["shop"~"hairdresser|beauty|massage|cosmetics|nail_salon"](around:${searchRadiusMeters},${centerLat},${centerLon});way["shop"~"hairdresser|beauty|massage|cosmetics|nail_salon"](around:${searchRadiusMeters},${centerLat},${centerLon}););out center 50;`;

    const mirrors = [
      "https://overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
    ];

    let elements: any[] = [];

    for (const mirror of mirrors) {
      try {
        const res = await fetch(mirror, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "LumiereBookingVercel/1.0",
          },
          body: `data=${encodeURIComponent(overpassQuery)}`,
          cache: "no-store",
        });

        if (res.ok) {
          const text = await res.text();
          if (text.trim().startsWith("{")) {
            const parsed = JSON.parse(text);
            elements = parsed.elements || [];
            if (elements.length > 0) break;
          }
        }
      } catch {
        // Probaj sljedeći mirror
      }
    }

    const seen = new Set<string>();
    const rawItems: { el: any; dist: number }[] = [];

    for (const el of elements) {
      const name = el.tags?.name;
      if (!name) continue;

      const elLat = el.lat ?? el.center?.lat ?? centerLat!;
      const elLon = el.lon ?? el.center?.lon ?? centerLon!;
      const dist = calculateDistanceKm(centerLat!, centerLon!, elLat, elLon);

      if (mode === "nearby" && dist > radiusKm) continue;

      const key = `${name.toLowerCase()}-${el.tags?.["addr:street"] || ""}`;
      if (seen.has(key)) continue;
      seen.add(key);

      rawItems.push({ el, dist });
    }

    if (mode === "nearby") {
      rawItems.sort((a, b) => a.dist - b.dist);
    }

    const salons = rawItems.slice(0, 36).map((item, idx) => {
      const tags = item.el.tags || {};
      const street = tags["addr:street"] || "";
      const houseNum = tags["addr:housenumber"] || "";
      const postcode = tags["addr:postcode"] || "";
      const city = tags["addr:city"] || resolvedCity;
      const address = [`${street} ${houseNum}`.trim(), postcode, city]
        .filter(Boolean)
        .join(", ");

      return buildSalonObject(
        `osm-${item.el.id}-${idx}`,
        tags.name,
        city,
        address,
        tags,
        idx,
        item.el.lat ?? item.el.center?.lat,
        item.el.lon ?? item.el.center?.lon,
        mode === "nearby" ? item.dist : undefined
      );
    });

    // 3. Ako Overpass ne vrati ništa, dopuni putem Nominatim-a sa Vercel servera
    if (salons.length === 0 && resolvedCity) {
      const nomRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=25&q=${encodeURIComponent(
          `hair beauty salon ${resolvedCity}`
        )}`,
        {
          headers: { "User-Agent": "LumiereBookingVercel/1.0" },
          cache: "no-store",
        }
      );

      if (nomRes.ok) {
        const nomList = await nomRes.json();
        for (const item of nomList) {
          const name = item.name || item.display_name?.split(",")[0];
          if (!name || seen.has(name.toLowerCase())) continue;

          const itemLat = Number(item.lat);
          const itemLon = Number(item.lon);
          const dist = calculateDistanceKm(
            centerLat!,
            centerLon!,
            itemLat,
            itemLon
          );
          if (dist > 25) continue;

          seen.add(name.toLowerCase());
          const addr = item.address || {};
          const street = `${addr.road || ""} ${addr.house_number || ""}`.trim();
          const city = addr.city || addr.town || resolvedCity;

          salons.push(
            buildSalonObject(
              `nom-${item.place_id}-${salons.length}`,
              name,
              city,
              [street, addr.postcode, city].filter(Boolean).join(", "),
              { shop: item.type || "beauty" },
              salons.length,
              itemLat,
              itemLon,
              mode === "nearby" ? dist : undefined
            )
          );
        }
      }
    }

    return NextResponse.json({ salons, resolvedCity });
  } catch (error) {
    console.error("Vercel API greška:", error);
    return NextResponse.json({ salons: [] });
  }
}