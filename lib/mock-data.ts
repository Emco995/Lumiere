export type ServiceCategory = "Kosa" | "Nokti" | "Masaža" | "Lice & Tijelo";

export interface Stylist {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  specialties: string[];
  isOnVacation?: boolean;
  vacationUntil?: string;
  substituteId?: string;
  matchScore?: number;
  availableSlots: string[];
}

export interface SalonService {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMin: number;
  priceEur: number;
  description: string;
}

export interface Salon {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  lat?: number;
  lon?: number;
  website?: string;
  distanceKm?: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  badge?: string;
  stylists: Stylist[];
  services: SalonService[];
}

export const SALONS_DATA: Salon[] = [
  {
    id: "salon-1",
    slug: "atelier-lumiere-sarajevo",
    name: "Atelier Lumière & Hair Spa",
    city: "Sarajevo",
    address: "Ferhadija 18, Centar",
    lat: 43.8589,
    lon: 18.4256,
    rating: 4.96,
    reviewsCount: 342,
    coverImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
    stylists: [
      {
        id: "st-sara",
        name: "Sara Kovač",
        role: "Master Colorist & Balayage",
        rating: 4.98,
        reviewsCount: 184,
        avatar:
          "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80",
        specialties: ["Balayage", "Šišanje i feniranje", "Keratinski tretman"],
        isOnVacation: true,
        vacationUntil: "28.11.",
        substituteId: "st-elena",
        availableSlots: [],
      },
      {
        id: "st-elena",
        name: "Elena Marić",
        role: "Senior Hair Stylist",
        rating: 4.94,
        reviewsCount: 129,
        avatar:
          "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80",
        specialties: ["Balayage", "Šišanje i feniranje", "Svečane frizure"],
        matchScore: 98,
        availableSlots: ["11:30", "14:00", "16:30", "18:00"],
      },
    ],
    services: [
      {
        id: "srv-1",
        name: "Signature Balayage + Olaplex njega",
        category: "Kosa",
        durationMin: 150,
        priceEur: 95,
        description: "Personalizovano nijansiranje uz zaštitu strukture vlasi i feniranje.",
      },
      {
        id: "srv-2",
        name: "Precizno šišanje & Spa feniranje",
        category: "Kosa",
        durationMin: 60,
        priceEur: 35,
        description: "Konsultacija oblika lica, pranje sa masažom vlasišta i stilizovanje.",
      },
    ],
  },
  {
    id: "salon-2",
    slug: "velvet-nail-lounge-munich",
    name: "Velvet Nail & Aesthetic Lounge",
    city: "München",
    address: "Maximilianstraße 34",
    lat: 48.1391,
    lon: 11.5802,
    rating: 4.92,
    reviewsCount: 218,
    coverImage:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
    stylists: [
      {
        id: "st-mia",
        name: "Mia Weber",
        role: "Nail Art & Russian Manicure",
        rating: 4.95,
        reviewsCount: 140,
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        specialties: ["Ruski manikir", "Gel nadogradnja", "Spa pedikir"],
        availableSlots: ["10:00", "12:15", "15:00", "17:30"],
      },
    ],
    services: [
      {
        id: "srv-3",
        name: "Ruski manikir + BIAB ojačanje",
        category: "Nokti",
        durationMin: 75,
        priceEur: 65,
        description: "Precizna obrada zanoktica i dugotrajni prirodni BIAB gel.",
      },
      {
        id: "srv-4",
        name: "Luksuzni Spa pedikir",
        category: "Nokti",
        durationMin: 60,
        priceEur: 55,
        description: "Piling morskom soli, njega stopala i trajni lak po izboru.",
      },
    ],
  },
  {
    id: "salon-3",
    slug: "aura-holistic-spa-london",
    name: "Aura Holistic & Massage Sanctuary",
    city: "London",
    address: "Marylebone High St 72",
    lat: 51.5205,
    lon: -0.1523,
    rating: 4.97,
    reviewsCount: 410,
    coverImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85",
    stylists: [
      {
        id: "st-claire",
        name: "Claire Bennett",
        role: "Lead Massage Therapist",
        rating: 4.99,
        reviewsCount: 205,
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        specialties: ["Deep Tissue masaža", "Aromaterapija", "Hot Stone"],
        availableSlots: ["11:00", "13:30", "16:00", "19:00"],
      },
    ],
    services: [
      {
        id: "srv-5",
        name: "Deep Tissue & Aromatherapy masaža",
        category: "Masaža",
        durationMin: 60,
        priceEur: 85,
        description: "Ciljano opuštanje duboke muskulature uz organska eterična ulja.",
      },
      {
        id: "srv-6",
        name: "Hot Stone regenerativni tretman",
        category: "Masaža",
        durationMin: 90,
        priceEur: 115,
        description: "Terapija toplim vulkanskim kamenjem za potpuni reset tijela.",
      },
    ],
  },
];