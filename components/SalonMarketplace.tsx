"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  CreditCard,
  FileText,
  UserCheck,
  Loader2,
  Navigation,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  SALONS_DATA,
  Salon,
  Stylist,
  SalonService,
  ServiceCategory,
} from "@/lib/mock-data";
import LumiereLogo from "./LumiereLogo";

interface SalonMarketplaceProps {
  salons: Salon[];
  searchMode: "default" | "city" | "nearby";
  activeLocationLabel: string;
  activeRadiusKm: number;
  isLoadingSalons: boolean;
  selectedCategory: ServiceCategory | "Sve";
  searchQuery: string;
  quickRebookTrigger: number;
}

const ITEMS_PER_PAGE = 6;

export default function SalonMarketplace({
  salons,
  searchMode,
  activeLocationLabel,
  activeRadiusKm,
  isLoadingSalons,
  selectedCategory,
  searchQuery,
  quickRebookTrigger,
}: SalonMarketplaceProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBooking, setActiveBooking] = useState<{
    salon: Salon;
    stylist: Stylist;
    service: SalonService;
    slot: string;
    isSubstitute?: boolean;
    originalStylistName?: string;
  } | null>(null);

  const [resolvedSiteImages, setResolvedSiteImages] = useState<
    Record<string, string>
  >({});
  const checkedWebsitesRef = useRef<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const [paymentMethod, setPaymentMethod] = useState<
    "salon" | "stripe" | "paypal"
  >("salon");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [styleNotes, setStyleNotes] = useState(
    "Formula #7.1 + 8.0, Olaplex No.2, blagi talasi na krajevima"
  );
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredSalons = useMemo(() => {
    return salons.filter((salon) => {
      const matchesCategory =
        selectedCategory === "Sve" ||
        salon.services.some((s) => s.category === selectedCategory);
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        salon.name.toLowerCase().includes(q) ||
        salon.city.toLowerCase().includes(q) ||
        salon.address.toLowerCase().includes(q) ||
        salon.services.some((s) => s.name.toLowerCase().includes(q)) ||
        salon.stylists.some((st) => st.name.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [salons, selectedCategory, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [salons, selectedCategory, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSalons.length / ITEMS_PER_PAGE)
  );

  const paginatedSalons = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSalons.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSalons, currentPage]);

  // Sigurno pozadinsko dohvaćanje stvarnih slika sa web sajtova salona (samo jednom po ID-ju, bez petlje)
  useEffect(() => {
    paginatedSalons.forEach((salon) => {
      if (
        !salon.coverImage &&
        salon.website &&
        !checkedWebsitesRef.current.has(salon.id)
      ) {
        checkedWebsitesRef.current.add(salon.id);
        fetch(`/api/salons/site-image?url=${encodeURIComponent(salon.website)}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (data?.imageUrl) {
              setResolvedSiteImages((prev) => ({
                ...prev,
                [salon.id]: data.imageUrl,
              }));
            }
          })
          .catch(() => {});
      }
    });
  }, [paginatedSalons]);

  useEffect(() => {
    if (quickRebookTrigger > 0) {
      const salon = SALONS_DATA[0];
      const elena = salon.stylists.find((s) => s.id === "st-elena")!;
      const service = salon.services[0];
      setBookingConfirmed(false);
      setActiveBooking({
        salon,
        stylist: elena,
        service,
        slot: "14:00",
        isSubstitute: true,
        originalStylistName: "Sara Kovač",
      });
    }
  }, [quickRebookTrigger]);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("rezultati");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="rezultati" className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Zaglavlje rezultata */}
        <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            {searchMode === "city" && activeLocationLabel && (
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9E7E4F]">
                Grad: {activeLocationLabel} ({filteredSalons.length} pronađenih
                salona)
              </p>
            )}
            {searchMode === "nearby" && activeLocationLabel && (
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9E7E4F]">
                Moja lokacija: {activeLocationLabel} • Radijus {activeRadiusKm}{" "}
                km ({filteredSalons.length} salona)
              </p>
            )}
            {searchMode === "default" && (
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9E7E4F]">
                Istaknuti partner saloni ({filteredSalons.length})
              </p>
            )}

            <h2 className="mt-1 font-serif text-3xl font-medium text-[#1C1917]">
              Odaberi salon, stilistu i direktan termin
            </h2>
          </div>

          {totalPages > 1 && (
            <p className="text-xs font-medium text-[#78716C]">
              Stranica {currentPage} od {totalPages}
            </p>
          )}
        </div>

        {isLoadingSalons ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7DFD5] bg-white py-20 text-center">
            <Loader2 className="h-9 w-9 animate-spin text-[#9E7E4F]" />
            <p className="mt-4 font-serif text-xl text-[#1C1917]">
              {searchMode === "city"
                ? `Pretražujemo salone u gradu ${activeLocationLabel}...`
                : `Lociramo salone u krugu od ${activeRadiusKm} km oko vas...`}
            </p>
            <p className="mt-1 text-xs text-[#78716C]">
              Učitavamo adrese, lokacije i slobodne termine
            </p>
          </div>
        ) : filteredSalons.length === 0 ? (
          <div className="rounded-3xl border border-[#E7DFD5] bg-white p-12 text-center">
            <p className="font-serif text-2xl text-[#1C1917]">
              Nema pronađenih salona za odabrani upit.
            </p>
            <p className="mt-2 text-sm text-[#57534E]">
              {searchMode === "nearby"
                ? `Pokušaj povećati radijus sa ${activeRadiusKm} km na 20 km ili 35 km.`
                : "Provjeri naziv grada ili klikni na jedan od predloženih gradova iznad."}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {paginatedSalons.map((salon, index) => {
                const candidateImage =
                  salon.coverImage || resolvedSiteImages[salon.id] || "";
                const hasValidPhoto =
                  Boolean(candidateImage) && !failedImages[salon.id];

                const hasCoords =
                  typeof salon.lat === "number" &&
                  typeof salon.lon === "number";

                const delta = 0.0032;
                const mapEmbedUrl = hasCoords
                  ? `https://www.openstreetmap.org/export/embed.html?bbox=${
                      salon.lon! - delta
                    }%2C${salon.lat! - delta}%2C${salon.lon! + delta}%2C${
                      salon.lat! + delta
                    }&layer=mapnik&marker=${salon.lat}%2C${salon.lon}`
                  : "";

                const googleMapsLink = hasCoords
                  ? `https://www.google.com/maps/search/?api=1&query=${salon.lat},${salon.lon}`
                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${salon.name} ${salon.address}`
                    )}`;

                return (
                  <motion.div
                    key={salon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.04, 0.25),
                    }}
                    className="overflow-hidden rounded-3xl border border-[#E7DFD5] bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#1C1917]/5"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Lijeva strana: Stvarna slika objekta ILI mapa tačne lokacije objekta */}
                      <div className="relative min-h-[260px] overflow-hidden bg-[#EAE4DA] lg:col-span-4">
                        {hasValidPhoto ? (
                          <img
                            src={candidateImage}
                            alt={salon.name}
                            loading="lazy"
                            onError={() =>
                              setFailedImages((prev) => ({
                                ...prev,
                                [salon.id]: true,
                              }))
                            }
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : hasCoords ? (
                          <div className="relative h-full min-h-[260px] w-full">
                            <iframe
                              title={`Lokacija - ${salon.name}`}
                              src={mapEmbedUrl}
                              className="h-full min-h-[260px] w-full border-0"
                              loading="lazy"
                            />
                            <div className="pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between rounded-xl bg-[#1C1917]/90 px-3 py-2 text-xs text-[#FAF8F5] backdrop-blur-md">
                              <span className="truncate font-medium">
                                {salon.name}
                              </span>
                              <span className="ml-2 shrink-0 text-[10px] uppercase tracking-wider text-[#E5C89B]">
                                Lokacija
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex h-full min-h-[260px] flex-col items-center justify-center bg-[#1C1917] p-8 text-center">
                            <LumiereLogo size={58} variant="light" />
                            <p className="mt-4 font-serif text-xl font-medium text-[#FAF8F5]">
                              {salon.name}
                            </p>
                            <p className="mt-1 text-xs text-[#C6A87C]">
                              {salon.city}
                            </p>
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                          {searchMode === "nearby" &&
                          typeof salon.distanceKm === "number" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1917]/90 px-3 py-1 text-xs font-medium text-[#E5C89B] backdrop-blur-md">
                              <Navigation className="h-3 w-3" />
                              {salon.distanceKm} km
                            </span>
                          ) : (
                            <span />
                          )}

                          <a
                            href={googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1C1917] shadow-sm backdrop-blur-md transition-colors hover:bg-[#1C1917] hover:text-white"
                          >
                            <span>Google Maps</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>

                      {/* Desna strana: Sadržaj salona */}
                      <div className="p-6 sm:p-8 lg:col-span-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#F2ECE4] pb-5">
                          <div>
                            <div className="flex items-center gap-2 text-xs text-[#78716C]">
                              <MapPin className="h-3.5 w-3.5 text-[#9E7E4F]" />
                              <span>
                                {salon.city} • {salon.address}
                              </span>
                            </div>
                            <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]">
                              {salon.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 rounded-full border border-[#E7DFD5] bg-[#FAF8F5] px-3.5 py-1.5">
                            <Star className="h-4 w-4 fill-[#C6A87C] text-[#C6A87C]" />
                            <span className="text-sm font-bold text-[#1C1917]">
                              {salon.rating}
                            </span>
                            <span className="text-xs text-[#78716C]">
                              ({salon.reviewsCount})
                            </span>
                          </div>
                        </div>

                        {/* Usluge */}
                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {salon.services.map((srv) => (
                            <div
                              key={srv.id}
                              className="flex items-center justify-between rounded-2xl border border-[#F0EAE1] bg-[#FAF8F5]/70 px-4 py-3"
                            >
                              <div>
                                <p className="text-sm font-semibold text-[#1C1917]">
                                  {srv.name}
                                </p>
                                <p className="mt-0.5 flex items-center gap-2 text-xs text-[#78716C]">
                                  <Clock className="h-3 w-3" /> {srv.durationMin}{" "}
                                  min
                                </p>
                              </div>
                              <span className="font-serif text-lg font-semibold text-[#9E7E4F]">
                                {srv.priceEur} €
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tim stilista & slobodni slotovi */}
                        <div className="mt-6 space-y-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                            Odaberi stilistu &amp; slobodan termin danas:
                          </p>

                          {salon.stylists.map((stylist) => {
                            const substitute = stylist.substituteId
                              ? salon.stylists.find(
                                  (s) => s.id === stylist.substituteId
                                )
                              : null;

                            return (
                              <div
                                key={stylist.id}
                                className={`rounded-2xl border p-4 transition-all ${
                                  stylist.isOnVacation
                                    ? "border-amber-200/80 bg-amber-50/40"
                                    : "border-[#E7DFD5] bg-white"
                                }`}
                              >
                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                  <div className="flex items-center gap-3.5">
                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#C6A87C]/50">
                                      <img
                                        src={stylist.avatar}
                                        alt={stylist.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-[#1C1917]">
                                          {stylist.name}
                                        </h4>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#8A6D43]">
                                          <Star className="h-3 w-3 fill-[#C6A87C] text-[#C6A87C]" />
                                          {stylist.rating}
                                        </span>
                                      </div>
                                      <p className="text-xs text-[#57534E]">
                                        {stylist.role}
                                      </p>
                                    </div>
                                  </div>

                                  {stylist.isOnVacation ? (
                                    <div className="flex flex-col items-start gap-2 sm:items-end">
                                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        Na odmoru do {stylist.vacationUntil}
                                      </span>
                                      {substitute && (
                                        <button
                                          onClick={() => {
                                            setBookingConfirmed(false);
                                            setActiveBooking({
                                              salon,
                                              stylist: substitute,
                                              service: salon.services[0],
                                              slot: substitute.availableSlots[1],
                                              isSubstitute: true,
                                              originalStylistName: stylist.name,
                                            });
                                          }}
                                          className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1917] px-4 py-1.5 text-xs font-medium text-[#E5C89B] transition-colors hover:bg-[#9E7E4F] hover:text-white"
                                        >
                                          <Sparkles className="h-3.5 w-3.5" />
                                          Pametna zamjena: {substitute.name} (
                                          {substitute.matchScore}% match)
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="flex flex-wrap gap-2">
                                      {stylist.availableSlots.map((slot) => (
                                        <button
                                          key={slot}
                                          onClick={() => {
                                            setBookingConfirmed(false);
                                            setActiveBooking({
                                              salon,
                                              stylist,
                                              service: salon.services[0],
                                              slot,
                                            });
                                          }}
                                          className="rounded-xl border border-[#D6CFC5] bg-[#FAF8F5] px-3.5 py-2 text-xs font-semibold text-[#1C1917] transition-all hover:border-[#1C1917] hover:bg-[#1C1917] hover:text-white"
                                        >
                                          {slot}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* NUMERISANA PAGINACIJA (1, 2, 3...) */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D6CFC5] bg-white text-[#1C1917] transition-colors hover:bg-[#1C1917] hover:text-white disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-[#1C1917] text-[#E5C89B] shadow-md scale-105"
                            : "border border-[#D6CFC5] bg-white text-[#1C1917] hover:border-[#1C1917]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D6CFC5] bg-white text-[#1C1917] transition-colors hover:bg-[#1C1917] hover:text-white disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* SLIDE-OVER BOOKING DRAWER */}
      <AnimatePresence>
        {activeBooking && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative h-full w-full max-w-lg overflow-y-auto bg-[#FAF8F5] p-6 shadow-2xl sm:p-8"
            >
              <button
                onClick={() => setActiveBooking(null)}
                className="absolute top-6 right-6 rounded-full border border-[#E7DFD5] bg-white p-2 text-[#57534E] hover:text-[#1C1917]"
              >
                <X className="h-5 w-5" />
              </button>

              {!bookingConfirmed ? (
                <form onSubmit={handleConfirmBooking} className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#9E7E4F]">
                      Direktna rezervacija • {activeBooking.salon.city}
                    </span>
                    <h3 className="mt-1 font-serif text-3xl font-medium text-[#1C1917]">
                      Potvrdi svoj termin
                    </h3>
                  </div>

                  {activeBooking.isSubstitute && (
                    <div className="rounded-2xl border border-[#C6A87C] bg-[#1C1917] p-4 text-xs text-[#FAF8F5]">
                      <div className="flex items-center gap-2 font-semibold text-[#E5C89B]">
                        <Sparkles className="h-4 w-4" />
                        <span>Pametna zamjena &amp; Prenos kartona aktivni</span>
                      </div>
                      <p className="mt-1.5 leading-relaxed text-[#D6D3D1]">
                        Pošto je{" "}
                        <strong>{activeBooking.originalStylistName}</strong> na
                        odmoru, vaš termin preuzima{" "}
                        <strong>{activeBooking.stylist.name}</strong> sa vašim
                        prethodnim postavkama stila.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 rounded-2xl border border-[#E7DFD5] bg-white p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#78716C]">Salon:</span>
                      <span className="font-semibold text-[#1C1917]">
                        {activeBooking.salon.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#78716C]">Stilista:</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#1C1917]">
                        <UserCheck className="h-4 w-4 text-[#9E7E4F]" />
                        {activeBooking.stylist.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#78716C]">Vrijeme:</span>
                      <span className="rounded-lg bg-[#FAF3E8] px-2.5 py-0.5 font-semibold text-[#8A6D43]">
                        Danas u {activeBooking.slot}
                      </span>
                    </div>

                    <div className="border-t border-[#F0EAE1] pt-3">
                      <label className="block text-xs font-medium text-[#78716C]">
                        Izabrani tretman:
                      </label>
                      <select
                        value={activeBooking.service.id}
                        onChange={(e) => {
                          const srv = activeBooking.salon.services.find(
                            (s) => s.id === e.target.value
                          )!;
                          setActiveBooking({ ...activeBooking, service: srv });
                        }}
                        className="mt-1 w-full rounded-xl border border-[#E7DFD5] bg-[#FAF8F5] px-3 py-2 text-sm font-medium text-[#1C1917]"
                      >
                        {activeBooking.salon.services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.durationMin} min) — {s.priceEur} €
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E7DFD5] bg-white p-4">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6D43]">
                      <FileText className="h-4 w-4" />
                      Digitalni karton stila (Style Card)
                    </label>
                    <textarea
                      rows={2}
                      value={styleNotes}
                      onChange={(e) => setStyleNotes(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#E7DFD5] bg-[#FAF8F5] p-2.5 text-xs text-[#1C1917] focus:border-[#9E7E4F] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#57534E]">
                        Ime i prezime *
                      </label>
                      <input
                        required
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Npr. Amila Hadžić"
                        className="mt-1 w-full rounded-xl border border-[#D6CFC5] bg-white px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#57534E]">
                        Telefon / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+387 61 000 000"
                        className="mt-1 w-full rounded-xl border border-[#D6CFC5] bg-white px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                      <CreditCard className="h-3.5 w-3.5 text-[#9E7E4F]" />
                      Način plaćanja
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "salon", label: "U salonu" },
                        { id: "stripe", label: "Kartica (Stripe)" },
                        { id: "paypal", label: "PayPal" },
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() =>
                            setPaymentMethod(
                              opt.id as "salon" | "stripe" | "paypal"
                            )
                          }
                          className={`rounded-xl border py-2.5 text-xs font-semibold transition-all ${
                            paymentMethod === opt.id
                              ? "border-[#1C1917] bg-[#1C1917] text-white"
                              : "border-[#D6CFC5] bg-white text-[#57534E]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#1C1917] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#9E7E4F]"
                  >
                    Potvrdi rezervaciju ({activeBooking.service.priceEur} €)
                  </button>
                </form>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-5 font-serif text-3xl font-medium text-[#1C1917]">
                    Termin je uspješno zakazan!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-[#57534E]">
                    Rezervacija kod <strong>{activeBooking.stylist.name}</strong>{" "}
                    ({activeBooking.salon.name}) danas u{" "}
                    <strong>{activeBooking.slot}</strong> je upisana u kalendar.
                  </p>
                  <button
                    onClick={() => setActiveBooking(null)}
                    className="mt-8 rounded-full bg-[#1C1917] px-8 py-3 text-sm font-medium text-white"
                  >
                    Nazad na platformu
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}