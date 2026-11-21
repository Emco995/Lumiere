import { Salon, SALONS_DATA } from "./mock-data";

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

function buildSalonFromBrowserOsm(
  el: any,
  resolvedCity: string,
  idx: number,
  distanceKm?: number
): Salon {
  const tags = el.tags || {};
  const name: string = tags.name || "Beauty Studio";
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

  const street = tags["addr:street"] || "";
  const houseNum = tags["addr:housenumber"] || "";
  const postcode = tags["addr:postcode"] || "";
  const city = tags["addr:city"] || resolvedCity;
  const address =
    [`${street} ${houseNum}`.trim(), postcode, city]
      .filter(Boolean)
      .join(", ") || `${city}, Centar`;

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
    id: `osm-${el.id}-${idx}`,
    slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${idx}`,
    name,
    city,
    address,
    lat: el.lat ?? el.center?.lat,
    lon: el.lon ?? el.center?.lon,
    website: tags.website || tags["contact:website"],
    distanceKm,
    rating: Number((4.75 + (idx % 5) * 0.05).toFixed(2)),
    reviewsCount: 38 + idx * 14,
    coverImage: realImage,
    stylists: [
      {
        id: `st-${el.id}-${idx}`,
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
            id: `srv-${el.id}-1`,
            name: "Šišanje, pranje & feniranje",
            category,
            durationMin: 60,
            priceEur: 35,
            description: "Individualna konsultacija, pranje i stilizovanje kose.",
          },
          {
            id: `srv-${el.id}-2`,
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
            id: `srv-${el.id}-1`,
            name: "Manikir + Trajni lak / Gel",
            category,
            durationMin: 60,
            priceEur: 45,
            description: "Detaljna obrada zanoktica i oblikovanje noktiju.",
          },
          {
            id: `srv-${el.id}-2`,
            name: "Estetski Spa pedikir",
            category,
            durationMin: 60,
            priceEur: 50,
            description: "Kompletna njega stopala i lakiranje.",
          },
        ]
      : [
          {
            id: `srv-${el.id}-1`,
            name: "Personalizovani tretman njege",
            category,
            durationMin: 60,
            priceEur: 55,
            description: "Profesionalni tretman prilagođen vašem tipu kože.",
          },
          {
            id: `srv-${el.id}-2`,
            name: "Relaks & Regenerativni tretman",
            category,
            durationMin: 60,
            priceEur: 65,
            description: "Opuštajući tretman za potpunu revitalizaciju.",
          },
        ],
  };
}

async function browserDirectOverpass(
  lat: number,
  lon: number,
  radiusMeters: number,
  cityLabel: string,
  withDistance: boolean,
  maxKm?: number
): Promise<Salon[]> {
  const safeRadius = Math.min(Math.max(radiusMeters, 5000), 20000);
  const query = `[out:json][timeout:10];(node["shop"~"hairdresser|beauty|massage|cosmetics|nail_salon"](around:${safeRadius},${lat},${lon});way["shop"~"hairdresser|beauty|massage|cosmetics|nail_salon"](around:${safeRadius},${lat},${lon}););out center 50;`;

  try {
    const res = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const elements = data?.elements || [];

    const seen = new Set<string>();
    const list: { el: any; dist: number }[] = [];

    for (const el of elements) {
      const name = el.tags?.name;
      if (!name) continue;
      const elLat = el.lat ?? el.center?.lat ?? lat;
      const elLon = el.lon ?? el.center?.lon ?? lon;
      const dist = calculateDistanceKm(lat, lon, elLat, elLon);
      if (maxKm && dist > maxKm) continue;

      const key = `${name.toLowerCase()}-${el.tags?.["addr:street"] || ""}`;
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({ el, dist });
    }

    if (withDistance) {
      list.sort((a, b) => a.dist - b.dist);
    }

    return list
      .slice(0, 36)
      .map((item, idx) =>
        buildSalonFromBrowserOsm(
          item.el,
          cityLabel,
          idx,
          withDistance ? item.dist : undefined
        )
      );
  } catch {
    return [];
  }
}

export async function searchSalonsByCityClient(
  cityName: string
): Promise<Salon[]> {
  const cleanCity = cityName.trim();
  if (!cleanCity) return [];

  const localFeatured = SALONS_DATA.filter(
    (s) => s.city.toLowerCase() === cleanCity.toLowerCase()
  );

  // 1. Pokušaj preko Vercel backend API-ja (ultrabrzo na Vercelu)
  try {
    const res = await fetch(
      `/api/salons/nearby?mode=city&city=${encodeURIComponent(cleanCity)}`
    );
    if (res.ok) {
      const data = await res.json();
      const apiSalons: Salon[] = data.salons || [];
      if (apiSalons.length > 0) {
        const seen = new Set(localFeatured.map((s) => s.name.toLowerCase()));
        return [
          ...localFeatured,
          ...apiSalons.filter((s) => !seen.has(s.name.toLowerCase())),
        ];
      }
    }
  } catch {
    // Nastavi na direktan browser fallback
  }

  // 2. Direktan browser fallback (radi kada si lokalno na Windowsu gdje Node blokira vanjski fetch)
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cleanCity
      )}&count=1&language=en&format=json`
    );
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      const place = geoData?.results?.[0];
      if (place) {
        const directSalons = await browserDirectOverpass(
          place.latitude,
          place.longitude,
          8000,
          place.name || cleanCity,
          false
        );
        const seen = new Set(localFeatured.map((s) => s.name.toLowerCase()));
        return [
          ...localFeatured,
          ...directSalons.filter((s) => !seen.has(s.name.toLowerCase())),
        ];
      }
    }
  } catch {
    // Vrati barem lokalne ako postoje
  }

  return localFeatured;
}

export async function searchSalonsByCoordsClient(
  lat: number,
  lon: number,
  radiusKm: number,
  cityLabel: string
): Promise<Salon[]> {
  // 1. Pokušaj preko Vercel backend API-ja
  try {
    const res = await fetch(
      `/api/salons/nearby?mode=nearby&lat=${lat}&lon=${lon}&radius=${radiusKm}&city=${encodeURIComponent(
        cityLabel
      )}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.salons && data.salons.length > 0) {
        return data.salons;
      }
    }
  } catch {
    // Nastavi na direktan browser fallback
  }

  // 2. Direktan browser fallback (radi na lokalnom Windowsu)
  return browserDirectOverpass(
    lat,
    lon,
    radiusKm * 1000,
    cityLabel,
    true,
    radiusKm
  );
}