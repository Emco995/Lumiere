import { Salon, SALONS_DATA } from "./mock-data";

const STYLIST_AVATARS = [
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
];

const VERIFIED_CITY_SALONS: Record<string, Salon[]> = {
  sarajevo: [
    ...SALONS_DATA.filter((s) => s.city.toLowerCase() === "sarajevo"),
    {
      id: "sar-2",
      slug: "hair-studio-enchanted-sarajevo",
      name: "Hair & Beauty Studio Enchanted",
      city: "Sarajevo",
      address: "Zmaja od Bosne 7, Marijin Dvor",
      lat: 43.8554,
      lon: 18.4079,
      rating: 4.93,
      reviewsCount: 164,
      coverImage:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-sar-2",
          name: "Lejla Delić",
          role: "Senior Colorist & Stylist",
          rating: 4.95,
          reviewsCount: 92,
          avatar: STYLIST_AVATARS[1],
          specialties: [
            "Balayage",
            "Šišanje i feniranje",
            "Keratinski tretman",
          ],
          availableSlots: ["10:00", "12:30", "15:00", "17:30"],
        },
      ],
      services: [
        {
          id: "srv-sar-2a",
          name: "Balayage & Olaplex njega",
          category: "Kosa",
          durationMin: 140,
          priceEur: 85,
          description: "Prirodni prelazi i dubinska regeneracija kose.",
        },
        {
          id: "srv-sar-2b",
          name: "Šišanje i svečano feniranje",
          category: "Kosa",
          durationMin: 60,
          priceEur: 30,
          description: "Pranje, masaža vlasišta i stilizovanje.",
        },
      ],
    },
    {
      id: "sar-3",
      slug: "velvet-nails-spa-sarajevo",
      name: "Velvet Nails & Aesthetic Sarajevo",
      city: "Sarajevo",
      address: "Titova 28, Centar",
      lat: 43.8588,
      lon: 18.4195,
      rating: 4.91,
      reviewsCount: 128,
      coverImage:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-sar-3",
          name: "Amina Kovač",
          role: "Nail & Brow Artist",
          rating: 4.94,
          reviewsCount: 84,
          avatar: STYLIST_AVATARS[2],
          specialties: ["Ruski manikir", "Gel nokti", "Lash & Brow lift"],
          availableSlots: ["11:00", "13:30", "16:00", "18:00"],
        },
      ],
      services: [
        {
          id: "srv-sar-3a",
          name: "Ruski manikir + Gel lak",
          category: "Nokti",
          durationMin: 70,
          priceEur: 35,
          description: "Precizna obrada zanoktica i dugotrajni sjaj.",
        },
        {
          id: "srv-sar-3b",
          name: "Spa pedikir & njega stopala",
          category: "Nokti",
          durationMin: 60,
          priceEur: 40,
          description: "Kompletan estetski i relaks tretman.",
        },
      ],
    },
    {
      id: "sar-4",
      slug: "serenity-spa-wellness-sarajevo",
      name: "Serenity Holistic & Thai Spa",
      city: "Sarajevo",
      address: "Branilaca Sarajeva 14",
      lat: 43.8576,
      lon: 18.4218,
      rating: 4.97,
      reviewsCount: 215,
      coverImage:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-sar-4",
          name: "Selma Hadžić",
          role: "Lead Wellness Therapist",
          rating: 4.98,
          reviewsCount: 118,
          avatar: STYLIST_AVATARS[3],
          specialties: ["Relaks masaža", "Tretman lica", "Aromaterapija"],
          availableSlots: ["10:30", "13:00", "15:30", "18:30"],
        },
      ],
      services: [
        {
          id: "srv-sar-4a",
          name: "Aromatherapy Relaks masaža (60 min)",
          category: "Masaža",
          durationMin: 60,
          priceEur: 55,
          description: "Opuštajuća masaža toplim eteričnim uljima.",
        },
        {
          id: "srv-sar-4b",
          name: "HydraFacial dubinski tretman lica",
          category: "Lice & Tijelo",
          durationMin: 60,
          priceEur: 70,
          description: "Čišćenje, hidratacija i revitalizacija kože lica.",
        },
      ],
    },
  ],
};

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

function buildSalonFromRaw(
  id: string,
  name: string,
  city: string,
  address: string,
  tags: Record<string, any>,
  idx: number,
  lat?: number,
  lon?: number,
  distanceKm?: number
): Salon {
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

async function fetchOverpassResilient(
  lat: number,
  lon: number,
  radiusMeters: number
): Promise<any[]> {
  const safeRadius = Math.min(Math.max(radiusMeters, 5000), 25000);
  const query = `[out:json][timeout:12];(node["shop"~"hairdresser|beauty|massage|cosmetics|nail_salon"](around:${safeRadius},${lat},${lon});way["shop"~"hairdresser|beauty|massage|cosmetics|nail_salon"](around:${safeRadius},${lat},${lon}););out center 50;`;
  const encoded = encodeURIComponent(query);

  const endpoints = [
    `https://overpass-api.de/api/interpreter?data=${encoded}`,
    `https://overpass.kumi.systems/api/interpreter?data=${encoded}`,
  ];

  const requests = endpoints.map(async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Server busy");
    const data = await res.json();
    if (!data?.elements || data.elements.length === 0) {
      throw new Error("No elements");
    }
    return data.elements as any[];
  });

  try {
    return await Promise.any(requests);
  } catch {
    return [];
  }
}

async function fetchNominatimSalons(
  cityName: string,
  lat: number,
  lon: number,
  maxDistKm: number
): Promise<Salon[]> {
  const delta = Math.max(0.15, maxDistKm / 80);
  const viewbox = `${lon - delta},${lat + delta},${lon + delta},${lat - delta}`;
  const terms = [
    "hair salon",
    "beauty salon",
    "nail salon",
    "friseur",
    "kosmetik",
    "massage",
  ];

  const responses = await Promise.all(
    terms.map((term) =>
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&bounded=1&viewbox=${viewbox}&limit=10&q=${encodeURIComponent(
          term
        )}`
      )
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => [])
    )
  );

  const seen = new Set<string>();
  const salons: Salon[] = [];

  for (const list of responses) {
    for (const item of list) {
      const name = item.name || item.display_name?.split(",")[0];
      if (!name || seen.has(name.toLowerCase())) continue;

      const itemLat = Number(item.lat);
      const itemLon = Number(item.lon);
      const dist = calculateDistanceKm(lat, lon, itemLat, itemLon);
      if (dist > maxDistKm) continue;

      seen.add(name.toLowerCase());
      const addr = item.address || {};
      const street = `${addr.road || ""} ${addr.house_number || ""}`.trim();
      const city = addr.city || addr.town || addr.village || cityName;

      salons.push(
        buildSalonFromRaw(
          `nom-${item.place_id}-${salons.length}`,
          name,
          city,
          [street, addr.postcode, city].filter(Boolean).join(", "),
          { shop: item.type || "beauty" },
          salons.length,
          itemLat,
          itemLon,
          dist
        )
      );
    }
  }

  return salons.slice(0, 36);
}

export async function searchSalonsByCityClient(
  cityName: string
): Promise<Salon[]> {
  const cleanCity = cityName.trim();
  if (!cleanCity) return [];

  const lowerCity = cleanCity.toLowerCase();
  const preloaded = VERIFIED_CITY_SALONS[lowerCity] || [];

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cleanCity
      )}&count=1&language=en&format=json`
    );
    if (!geoRes.ok) return preloaded;

    const geoData = await geoRes.json();
    const place = geoData?.results?.[0];
    if (!place) return preloaded;

    const lat: number = place.latitude;
    const lon: number = place.longitude;
    const resolvedCity: string = place.name || cleanCity;

    const [elements, nomSalons] = await Promise.all([
      fetchOverpassResilient(lat, lon, 7000),
      fetchNominatimSalons(resolvedCity, lat, lon, 15),
    ]);

    const seen = new Set<string>(preloaded.map((s) => s.name.toLowerCase()));
    const osmSalons: Salon[] = [];

    for (const el of elements) {
      const name = el.tags?.name;
      if (!name || seen.has(name.toLowerCase())) continue;
      seen.add(name.toLowerCase());

      const tags = el.tags || {};
      const street = tags["addr:street"] || "";
      const houseNum = tags["addr:housenumber"] || "";
      const postcode = tags["addr:postcode"] || "";
      const city = tags["addr:city"] || resolvedCity;
      const address = [`${street} ${houseNum}`.trim(), postcode, city]
        .filter(Boolean)
        .join(", ");

      osmSalons.push(
        buildSalonFromRaw(
          `osm-${el.id}-${osmSalons.length}`,
          name,
          city,
          address,
          tags,
          osmSalons.length,
          el.lat ?? el.center?.lat,
          el.lon ?? el.center?.lon
        )
      );
      if (osmSalons.length >= 40) break;
    }

    const extraNom = nomSalons
      .filter((s) => !seen.has(s.name.toLowerCase()))
      .map((s) => ({ ...s, distanceKm: undefined }));

    return [...preloaded, ...osmSalons, ...extraNom];
  } catch {
    return preloaded;
  }
}

export async function searchSalonsByCoordsClient(
  lat: number,
  lon: number,
  radiusKm: number,
  cityLabel: string
): Promise<Salon[]> {
  const radiusMeters = Math.round(radiusKm * 1000);

  // Paralelno pretražujemo Overpass i Nominatim oko koordinata korisnika
  const [elements, nomSalons] = await Promise.all([
    fetchOverpassResilient(lat, lon, radiusMeters),
    fetchNominatimSalons(cityLabel, lat, lon, radiusKm),
  ]);

  const seen = new Set<string>();
  const list: { el: any; dist: number }[] = [];

  for (const el of elements) {
    const name = el.tags?.name;
    if (!name) continue;

    const elLat = el.lat ?? el.center?.lat ?? lat;
    const elLon = el.lon ?? el.center?.lon ?? lon;
    const dist = calculateDistanceKm(lat, lon, elLat, elLon);

    if (dist > radiusKm) continue;

    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    list.push({ el, dist });
  }

  list.sort((a, b) => a.dist - b.dist);

  const osmResults = list.slice(0, 40).map((item, idx) => {
    const tags = item.el.tags || {};
    const street = tags["addr:street"] || "";
    const houseNum = tags["addr:housenumber"] || "";
    const postcode = tags["addr:postcode"] || "";
    const city = tags["addr:city"] || cityLabel;
    const address = [`${street} ${houseNum}`.trim(), postcode, city]
      .filter(Boolean)
      .join(", ");

    return buildSalonFromRaw(
      `osm-${item.el.id}-${idx}`,
      tags.name,
      city,
      address,
      tags,
      idx,
      item.el.lat ?? item.el.center?.lat,
      item.el.lon ?? item.el.center?.lon,
      item.dist
    );
  });

  const extraNom = nomSalons.filter((s) => !seen.has(s.name.toLowerCase()));
  const combined = [...osmResults, ...extraNom];
  combined.sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));

  return combined;
}