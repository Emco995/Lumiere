"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Sparkles,
  FileText,
  ArrowLeft,
  Plane,
  CheckCircle2,
  Clock,
  TrendingUp,
  Edit3,
  Save,
} from "lucide-react";
import LumiereLogo from "@/components/LumiereLogo";
import { SALONS_DATA } from "@/lib/mock-data";

interface DashboardBooking {
  id: string;
  time: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  stylistName: string;
  priceEur: number;
  paymentStatus: "Plaćeno (Stripe)" | "U salonu" | "PayPal";
  styleCard: string;
  isSubstitute?: boolean;
}

const INITIAL_BOOKINGS: DashboardBooking[] = [
  {
    id: "bk-101",
    time: "11:30",
    clientName: "Amila Hadžić",
    clientPhone: "+387 61 234 567",
    serviceName: "Signature Balayage + Olaplex njega",
    stylistName: "Elena Marić",
    priceEur: 95,
    paymentStatus: "Plaćeno (Stripe)",
    styleCard: "Formula #7.1 + 8.0, Olaplex No.2, blagi talasi na krajevima",
    isSubstitute: true,
  },
  {
    id: "bk-102",
    time: "14:00",
    clientName: "Lejla Begić",
    clientPhone: "+387 62 987 654",
    serviceName: "Precizno šišanje & Spa feniranje",
    stylistName: "Elena Marić",
    priceEur: 35,
    paymentStatus: "U salonu",
    styleCard: "Stepenasto šišanje, bez stanjivanja vrhova, zaštita od toplote",
  },
  {
    id: "bk-103",
    time: "16:30",
    clientName: "Hana Kovačević",
    clientPhone: "+387 61 555 888",
    serviceName: "Signature Balayage + Olaplex njega",
    stylistName: "Elena Marić",
    priceEur: 95,
    paymentStatus: "PayPal",
    styleCard: "Hladni plavi ton 9.1, toniranje 15 min, bez zagrijavanja",
  },
];

export default function SalonDashboardPage() {
  const salon = SALONS_DATA[0];
  const [stylists, setStylists] = useState(salon.stylists);
  const [bookings, setBookings] = useState<DashboardBooking[]>(INITIAL_BOOKINGS);
  const [selectedBooking, setSelectedBooking] =
    useState<DashboardBooking | null>(INITIAL_BOOKINGS[0]);
  const [editingCard, setEditingCard] = useState(false);
  const [cardDraft, setCardDraft] = useState(INITIAL_BOOKINGS[0].styleCard);

  const toggleVacation = (stylistId: string) => {
    setStylists((prev) =>
      prev.map((st) =>
        st.id === stylistId
          ? {
              ...st,
              isOnVacation: !st.isOnVacation,
              vacationUntil: !st.isOnVacation ? "28.11." : undefined,
            }
          : st
      )
    );
  };

  const handleSaveStyleCard = () => {
    if (!selectedBooking) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id ? { ...b, styleCard: cardDraft } : b
      )
    );
    setSelectedBooking({ ...selectedBooking, styleCard: cardDraft });
    setEditingCard(false);
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + b.priceEur, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      {/* Top Bar */}
      <header className="border-b border-[#E7DFD5] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-5">
            <LumiereLogo size={38} variant="dark" showWordmark={true} />
            <span className="hidden rounded-full border border-[#C6A87C]/50 bg-[#FAF3E8] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8A6D43] sm:inline-block">
              Salon Partner Portal
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#D6CFC5] px-4 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:bg-[#1C1917] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Nazad na Marketplace</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Zaglavlje salona + Statistika */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#E7DFD5] pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9E7E4F]">
              {salon.city} • {salon.address}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-medium sm:text-4xl">
              {salon.name}
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#E7DFD5] bg-white px-4 py-3">
              <p className="flex items-center gap-1.5 text-[11px] text-[#78716C]">
                <Calendar className="h-3.5 w-3.5 text-[#9E7E4F]" />
                Danas termina
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold">
                {bookings.length}
              </p>
            </div>
            <div className="rounded-2xl border border-[#E7DFD5] bg-white px-4 py-3">
              <p className="flex items-center gap-1.5 text-[11px] text-[#78716C]">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                Dnevni promet
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold">
                {totalRevenue} €
              </p>
            </div>
            <div className="rounded-2xl border border-[#E7DFD5] bg-white px-4 py-3">
              <p className="flex items-center gap-1.5 text-[11px] text-[#78716C]">
                <Sparkles className="h-3.5 w-3.5 text-[#9E7E4F]" />
                Smart Zamjene
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold">1 aktivna</p>
            </div>
          </div>
        </div>

        {/* Upravljanje timom & Status odsustva */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-medium">
              <Users className="h-5 w-5 text-[#9E7E4F]" />
              <span>Tim stilista &amp; Status dostupnosti</span>
            </h2>
            <span className="text-xs text-[#78716C]">
              Uključi odsustvo da sistem automatski preusmjeri klijente zamjeni
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {stylists.map((st) => (
              <div
                key={st.id}
                className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                  st.isOnVacation
                    ? "border-amber-300 bg-amber-50/60"
                    : "border-[#E7DFD5] bg-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#C6A87C]/50">
                    <Image
                      src={st.avatar}
                      alt={st.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{st.name}</h3>
                    <p className="text-xs text-[#57534E]">{st.role}</p>
                    {st.isOnVacation ? (
                      <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                        <Plane className="h-3 w-3" /> Na odmoru • Zamjena: Elena
                        Marić
                      </p>
                    ) : (
                      <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" /> Aktivan u smjeni
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleVacation(st.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    st.isOnVacation
                      ? "bg-[#1C1917] text-white hover:bg-[#9E7E4F]"
                      : "border border-[#D6CFC5] bg-[#FAF8F5] text-[#1C1917] hover:border-amber-600 hover:text-amber-800"
                  }`}
                >
                  {st.isOnVacation ? "Vrati u smjenu" : "Označi odmor"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Dnevni raspored + Digitalni karton klijenta */}
        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Lijeva strana: Lista termina */}
          <div className="lg:col-span-7">
            <h2 className="mb-4 font-serif text-2xl font-medium">
              Današnji raspored rezervacija
            </h2>
            <div className="space-y-3">
              {bookings.map((bk) => {
                const isSelected = selectedBooking?.id === bk.id;
                return (
                  <motion.div
                    key={bk.id}
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      setSelectedBooking(bk);
                      setCardDraft(bk.styleCard);
                      setEditingCard(false);
                    }}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? "border-[#1C1917] bg-white shadow-md"
                        : "border-[#E7DFD5] bg-white/70 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="rounded-xl bg-[#1C1917] px-3 py-2 text-center text-[#E5C89B]">
                          <Clock className="mx-auto h-3.5 w-3.5" />
                          <span className="mt-0.5 block text-xs font-bold">
                            {bk.time}
                          </span>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold">{bk.clientName}</h3>
                            {bk.isSubstitute && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF3E8] px-2.5 py-0.5 text-[10px] font-semibold text-[#8A6D43]">
                                <Sparkles className="h-3 w-3" /> Smart Zamjena
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs font-medium text-[#57534E]">
                            {bk.serviceName}
                          </p>
                          <p className="mt-1 text-[11px] text-[#78716C]">
                            Stilista: <strong>{bk.stylistName}</strong> •{" "}
                            {bk.clientPhone}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-lg font-semibold text-[#1C1917]">
                          {bk.priceEur} €
                        </span>
                        <span className="mt-1 block rounded-full bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-medium text-[#57534E]">
                          {bk.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desna strana: Digitalni Style Card odabranog klijenta */}
          <div className="lg:col-span-5">
            <h2 className="mb-4 font-serif text-2xl font-medium">
              Digitalni karton klijenta
            </h2>
            {selectedBooking && (
              <div className="rounded-3xl border border-[#C6A87C]/50 bg-[#1C1917] p-6 text-[#FAF8F5] shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C6A87C]">
                      Style Card • Historija tretmana
                    </span>
                    <h3 className="mt-1 font-serif text-2xl">
                      {selectedBooking.clientName}
                    </h3>
                  </div>
                  <FileText className="h-6 w-6 text-[#E5C89B]" />
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-[#D6D3D1]">
                      Formula, nijansa &amp; napomene stiliste:
                    </label>
                    {!editingCard ? (
                      <button
                        onClick={() => setEditingCard(true)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#E5C89B] hover:underline"
                      >
                        <Edit3 className="h-3.5 w-3.5" /> Uredi karton
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveStyleCard}
                        className="inline-flex items-center gap-1 rounded-full bg-[#C6A87C] px-3 py-1 text-xs font-semibold text-[#1C1917]"
                      >
                        <Save className="h-3.5 w-3.5" /> Sačuvaj
                      </button>
                    )}
                  </div>

                  {editingCard ? (
                    <textarea
                      rows={4}
                      value={cardDraft}
                      onChange={(e) => setCardDraft(e.target.value)}
                      className="mt-2.5 w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-xs leading-relaxed text-white focus:border-[#E5C89B] focus:outline-none"
                    />
                  ) : (
                    <div className="mt-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-[#E7E5E4]">
                      {selectedBooking.styleCard}
                    </div>
                  )}
                </div>

                <p className="mt-5 text-[11px] leading-relaxed text-[#A8A29E]">
                  * Ovaj karton se automatski sinhronizuje sa profilom klijenta i
                  prosljeđuje zamjenskom stilisti u slučaju odsustva.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}