"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import PlatformHero from "@/components/PlatformHero";
import SalonMarketplace from "@/components/SalonMarketplace";
import { SALONS_DATA, Salon, ServiceCategory } from "@/lib/mock-data";
import {
  searchSalonsByCityClient,
  searchSalonsByCoordsClient,
} from "@/lib/salon-search";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<
    ServiceCategory | "Sve"
  >("Sve");
  const [searchQuery, setSearchQuery] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [radiusKm, setRadiusKm] = useState<number>(15);

  const [searchMode, setSearchMode] = useState<"default" | "city" | "nearby">(
    "default"
  );
  const [activeLocationLabel, setActiveLocationLabel] = useState("");
  const [activeRadiusKm, setActiveRadiusKm] = useState<number>(15);
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [salons, setSalons] = useState<Salon[]>(SALONS_DATA);
  const [isLoadingSalons, setIsLoadingSalons] = useState(false);
  const [quickRebookTrigger, setQuickRebookTrigger] = useState(0);

  const scrollToResults = () => {
    const el = document.getElementById("rezultati");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. Pretraga po imenu grada (npr. Sarajevo, London, München, Bristol)
  const handleSearchByCity = async (cityOverride?: string) => {
    const targetCity = (cityOverride ?? cityInput).trim();

    if (!targetCity) {
      setSearchMode("default");
      setSalons(SALONS_DATA);
      setActiveLocationLabel("");
      return;
    }

    setSearchMode("city");
    setIsLoadingSalons(true);
    setActiveLocationLabel(targetCity);
    scrollToResults();

    try {
      const fetchedSalons = await searchSalonsByCityClient(targetCity);
      const localFeatured = SALONS_DATA.filter(
        (s) => s.city.toLowerCase() === targetCity.toLowerCase()
      );

      const seenIds = new Set(fetchedSalons.map((s) => s.id));
      const merged = [
        ...fetchedSalons,
        ...localFeatured.filter((s) => !seenIds.has(s.id)),
      ];

      setSalons(merged);
    } catch {
      setSalons([]);
    } finally {
      setIsLoadingSalons(false);
    }
  };

  // 2. Dohvaćanje salona oko koordinata korisnika
  const fetchNearbyByCoords = async (
    lat: number,
    lon: number,
    radius: number,
    label: string
  ) => {
    setCityInput("");
    setSearchMode("nearby");
    setIsLoadingSalons(true);
    setActiveLocationLabel(label);
    setActiveRadiusKm(radius);
    scrollToResults();

    try {
      const nearbySalons = await searchSalonsByCoordsClient(
        lat,
        lon,
        radius,
        label
      );
      setSalons(nearbySalons);
    } catch {
      setSalons([]);
    } finally {
      setIsLoadingSalons(false);
    }
  };

  // 3. Automatska IP geolokacija ako GPS na uređaju nije dostupan ili je blokiran
  const detectLocationByIp = async (targetRadius: number) => {
    const providers = [
      async () => {
        const res = await fetch("https://freeipapi.com/api/json");
        const data = await res.json();
        if (data?.latitude && data?.longitude) {
          return {
            lat: Number(data.latitude),
            lon: Number(data.longitude),
            label: data.cityName || data.regionName || "Moja lokacija",
          };
        }
        return null;
      },
      async () => {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const data = await res.json();
        if (data?.latitude && data?.longitude) {
          return {
            lat: Number(data.latitude),
            lon: Number(data.longitude),
            label: data.city || data.region || "Moja lokacija",
          };
        }
        return null;
      },
      async () => {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        if (data?.success && data.latitude && data.longitude) {
          return {
            lat: Number(data.latitude),
            lon: Number(data.longitude),
            label: data.city || data.region || "Moja lokacija",
          };
        }
        return null;
      },
    ];

    for (const getLoc of providers) {
      try {
        const loc = await getLoc();
        if (loc) {
          setUserCoords({ lat: loc.lat, lon: loc.lon });
          await fetchNearbyByCoords(loc.lat, loc.lon, targetRadius, loc.label);
          return;
        }
      } catch {
        // Probaj sljedeći servis
      }
    }

    setIsLoadingSalons(false);
    setSearchMode("default");
    alert(
      "Nije moguće automatski očitati lokaciju. Upišite svoj grad u polje lijevo."
    );
  };

  // 4. Klik na dugme "Moja lokacija" ili promjena radijusa (km)
  const handleSearchNearby = async (radiusOverride?: number) => {
    const targetRadius = radiusOverride ?? radiusKm;

    setCityInput("");
    setSearchMode("nearby");
    setIsLoadingSalons(true);
    scrollToResults();

    // Ako već imamo koordinate korisnika i samo mijenja radijus (km)
    if (
      typeof radiusOverride === "number" &&
      userCoords &&
      activeLocationLabel
    ) {
      await fetchNearbyByCoords(
        userCoords.lat,
        userCoords.lon,
        targetRadius,
        activeLocationLabel
      );
      return;
    }

    if (!navigator.geolocation) {
      await detectLocationByIp(targetRadius);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lon: longitude });

        try {
          const revRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const revData = await revRes.json();
          const cityPart =
            revData.city ||
            revData.locality ||
            revData.principalSubdivision ||
            "Moja lokacija";

          await fetchNearbyByCoords(latitude, longitude, targetRadius, cityPart);
        } catch {
          await fetchNearbyByCoords(
            latitude,
            longitude,
            targetRadius,
            "Moja trenutna lokacija"
          );
        }
      },
      async () => {
        // Ako browser odbije GPS ili istekne 5s, odmah prebaci na IP lokaciju
        await detectLocationByIp(targetRadius);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Preloader />
      <Navbar />
      <PlatformHero
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cityInput={cityInput}
        setCityInput={setCityInput}
        radiusKm={radiusKm}
        setRadiusKm={setRadiusKm}
        searchMode={searchMode}
        onSearchByCity={handleSearchByCity}
        onSearchNearby={handleSearchNearby}
        isLoadingSalons={isLoadingSalons}
        onQuickRebook={() => setQuickRebookTrigger((prev) => prev + 1)}
      />
      <SalonMarketplace
        salons={salons}
        searchMode={searchMode}
        activeLocationLabel={activeLocationLabel}
        activeRadiusKm={activeRadiusKm}
        isLoadingSalons={isLoadingSalons}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        quickRebookTrigger={quickRebookTrigger}
      />
    </main>
  );
}