import { Salon, SALONS_DATA } from "./mock-data";

const STYLIST_AVATARS = [
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
];

const CURATED_CITY_CATALOG: Record<string, Salon[]> = {
  london: [
    ...SALONS_DATA.filter((s) => s.city.toLowerCase() === "london"),
    {
      id: "lon-2",
      slug: "mayfair-hair-atelier-london",
      name: "Mayfair Hair & Color Atelier",
      city: "London",
      address: "Mount Street 42, Mayfair, W1K",
      lat: 51.5096,
      lon: -0.1518,
      rating: 4.95,
      reviewsCount: 312,
      coverImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-lon-2",
          name: "Sophie Kensington",
          role: "Creative Color Director",
          rating: 4.97,
          reviewsCount: 165,
          avatar: STYLIST_AVATARS[0],
          specialties: ["Balayage", "Precision Cut", "Gloss Treatment"],
          availableSlots: ["10:00", "12:30", "15:00", "17:30"],
        },
      ],
      services: [
        {
          id: "srv-lon-2a",
          name: "Dimensional Balayage & Olaplex",
          category: "Kosa",
          durationMin: 150,
          priceEur: 120,
          description: "Prirodno nijansiranje i dubinska zaštita vlasi.",
        },
        {
          id: "srv-lon-2b",
          name: "Cut & Luxury Blow-Dry",
          category: "Kosa",
          durationMin: 60,
          priceEur: 55,
          description: "Individualno šišanje i stilizovanje.",
        },
      ],
    },
    {
      id: "lon-3",
      slug: "soho-velvet-nails-london",
      name: "Soho Velvet Nail & Brow Bar",
      city: "London",
      address: "Brewer Street 29, Soho, W1F",
      lat: 51.5118,
      lon: -0.1355,
      rating: 4.91,
      reviewsCount: 248,
      coverImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-lon-3",
          name: "Chloe Bennett",
          role: "Master Nail Artist",
          rating: 4.93,
          reviewsCount: 132,
          avatar: STYLIST_AVATARS[1],
          specialties: ["Russian Manicure", "BIAB Gel", "Spa Pedicure"],
          availableSlots: ["11:00", "13:30", "16:00", "18:30"],
        },
      ],
      services: [
        {
          id: "srv-lon-3a",
          name: "Russian Manicure + BIAB",
          category: "Nokti",
          durationMin: 75,
          priceEur: 65,
          description: "Precizna obrada zanoktica i ojačanje noktiju.",
        },
        {
          id: "srv-lon-3b",
          name: "Luxury Botanical Pedicure",
          category: "Nokti",
          durationMin: 60,
          priceEur: 60,
          description: "Kompletna njega stopala i trajni lak.",
        },
      ],
    },
    {
      id: "lon-4",
      slug: "chelsea-glow-aesthetics-london",
      name: "Chelsea Glow Skin & Facial Clinic",
      city: "London",
      address: "King's Road 118, Chelsea, SW3",
      lat: 51.4875,
      lon: -0.1687,
      rating: 4.96,
      reviewsCount: 194,
      coverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-lon-4",
          name: "Amelia Reid",
          role: "Lead Aesthetician",
          rating: 4.98,
          reviewsCount: 112,
          avatar: STYLIST_AVATARS[2],
          specialties: ["HydraFacial", "LED Therapy", "Sculpting Facial"],
          availableSlots: ["10:30", "13:00", "15:30", "18:00"],
        },
      ],
      services: [
        {
          id: "srv-lon-4a",
          name: "Signature HydraFacial & LED",
          category: "Lice & Tijelo",
          durationMin: 60,
          priceEur: 95,
          description: "Dubinsko čišćenje i revitalizacija kože lica.",
        },
        {
          id: "srv-lon-4b",
          name: "Sculpting Face & Neck Massage",
          category: "Masaža",
          durationMin: 60,
          priceEur: 80,
          description: "Lifting masaža lica i opuštanje.",
        },
      ],
    },
    {
      id: "lon-5",
      slug: "kensington-nail-couture-london",
      name: "Kensington Nail Couture",
      city: "London",
      address: "Kensington High St 84, W8",
      lat: 51.5011,
      lon: -0.1924,
      rating: 4.89,
      reviewsCount: 176,
      coverImage: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-lon-5",
          name: "Olivia Brooks",
          role: "Senior Nail Designer",
          rating: 4.9,
          reviewsCount: 98,
          avatar: STYLIST_AVATARS[3],
          specialties: ["Gel Extensions", "French Manicure", "Paraffin Spa"],
          availableSlots: ["10:00", "12:00", "14:30", "17:00"],
        },
      ],
      services: [
        {
          id: "srv-lon-5a",
          name: "Gel nadogradnja & Nail Art",
          category: "Nokti",
          durationMin: 90,
          priceEur: 75,
          description: "Oblikovanje i dizajn po želji.",
        },
        {
          id: "srv-lon-5b",
          name: "Express Gel Manikir",
          category: "Nokti",
          durationMin: 45,
          priceEur: 45,
          description: "Brzo uređivanje i trajni lak.",
        },
      ],
    },
    {
      id: "lon-6",
      slug: "shoreditch-urban-cut-london",
      name: "Shoreditch Urban Cut & Style",
      city: "London",
      address: "Redchurch St 51, Shoreditch, E2",
      lat: 51.5244,
      lon: -0.0736,
      rating: 4.88,
      reviewsCount: 221,
      coverImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-lon-6",
          name: "Liam Turner",
          role: "Master Stylist",
          rating: 4.91,
          reviewsCount: 140,
          avatar: STYLIST_AVATARS[0],
          specialties: ["Editorial Cut", "Color Correction", "Keratin"],
          availableSlots: ["11:30", "14:00", "16:30", "19:00"],
        },
      ],
      services: [
        {
          id: "srv-lon-6a",
          name: "Editorial Cut & Finish",
          category: "Kosa",
          durationMin: 60,
          priceEur: 60,
          description: "Moderno šišanje prilagođeno teksturi kose.",
        },
        {
          id: "srv-lon-6b",
          name: "Keratin Smoothing Therapy",
          category: "Kosa",
          durationMin: 120,
          priceEur: 110,
          description: "Dubinsko zaglađivanje i sjaj kose.",
        },
      ],
    },
    {
      id: "lon-7",
      slug: "covent-garden-nail-sanctuary-london",
      name: "Covent Garden Nail Sanctuary",
      city: "London",
      address: "Neal Street 38, Covent Garden, WC2",
      lat: 51.5142,
      lon: -0.1251,
      rating: 4.94,
      reviewsCount: 267,
      coverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-lon-7",
          name: "Hannah Evans",
          role: "Nail & Hand Care Specialist",
          rating: 4.95,
          reviewsCount: 152,
          avatar: STYLIST_AVATARS[1],
          specialties: ["Japanese Gel", "Spa Pedicure", "Nail Care"],
          availableSlots: ["10:00", "13:00", "15:30", "18:00"],
        },
      ],
      services: [
        {
          id: "srv-lon-7a",
          name: "Japanese Gel Manicure",
          category: "Nokti",
          durationMin: 75,
          priceEur: 68,
          description: "Premium japanski gel za prirodan izgled i čvrstoću.",
        },
        {
          id: "srv-lon-7b",
          name: "Signature Spa Mani-Pedi Combo",
          category: "Nokti",
          durationMin: 110,
          priceEur: 95,
          description: "Kompletan tretman ruku i stopala.",
        },
      ],
    },
  ],
  bristol: [
    {
      id: "bri-1",
      slug: "clifton-hair-beauty-bristol",
      name: "Clifton Village Hair & Beauty",
      city: "Bristol",
      address: "Princess Victoria St 24, Clifton, BS8",
      lat: 51.4552,
      lon: -2.6203,
      rating: 4.94,
      reviewsCount: 189,
      coverImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-bri-1",
          name: "Eleanor Shaw",
          role: "Senior Colorist & Stylist",
          rating: 4.96,
          reviewsCount: 110,
          avatar: STYLIST_AVATARS[0],
          specialties: ["Balayage", "Šišanje i feniranje", "Njega kose"],
          availableSlots: ["10:00", "12:30", "15:00", "17:30"],
        },
      ],
      services: [
        {
          id: "srv-bri-1a",
          name: "Balayage & Gloss Finish",
          category: "Kosa",
          durationMin: 140,
          priceEur: 95,
          description: "Prirodno nijansiranje i zaštita strukture vlasi.",
        },
        {
          id: "srv-bri-1b",
          name: "Šišanje & Spa feniranje",
          category: "Kosa",
          durationMin: 60,
          priceEur: 45,
          description: "Individualna konsultacija i stilizovanje.",
        },
      ],
    },
    {
      id: "bri-2",
      slug: "harbourside-nails-spa-bristol",
      name: "Harbourside Nail & Brow Lounge",
      city: "Bristol",
      address: "Canons Road 12, Harbourside, BS1",
      lat: 51.4501,
      lon: -2.6012,
      rating: 4.91,
      reviewsCount: 142,
      coverImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-bri-2",
          name: "Grace Mitchell",
          role: "Nail Artist Specijalista",
          rating: 4.93,
          reviewsCount: 88,
          avatar: STYLIST_AVATARS[1],
          specialties: ["Ruski manikir", "BIAB Gel", "Spa pedikir"],
          availableSlots: ["11:00", "13:30", "16:00", "18:00"],
        },
      ],
      services: [
        {
          id: "srv-bri-2a",
          name: "Manikir + BIAB Gel ojačanje",
          category: "Nokti",
          durationMin: 70,
          priceEur: 50,
          description: "Precizna obrada zanoktica i dugotrajni gel.",
        },
        {
          id: "srv-bri-2b",
          name: "Spa pedikir & trajni lak",
          category: "Nokti",
          durationMin: 60,
          priceEur: 52,
          description: "Kompletna njega stopala.",
        },
      ],
    },
    {
      id: "bri-3",
      slug: "park-street-holistic-spa-bristol",
      name: "Park Street Holistic & Wellness Spa",
      city: "Bristol",
      address: "Park Street 48, City Centre, BS1",
      lat: 51.4545,
      lon: -2.6038,
      rating: 4.96,
      reviewsCount: 204,
      coverImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-bri-3",
          name: "Charlotte Davies",
          role: "Lead Massage & Skin Therapist",
          rating: 4.97,
          reviewsCount: 124,
          avatar: STYLIST_AVATARS[2],
          specialties: ["Deep Tissue masaža", "HydraFacial", "Aromaterapija"],
          availableSlots: ["10:30", "13:00", "15:30", "18:00"],
        },
      ],
      services: [
        {
          id: "srv-bri-3a",
          name: "Aromatherapy Deep Tissue masaža",
          category: "Masaža",
          durationMin: 60,
          priceEur: 70,
          description: "Opuštajuća terapeutska masaža cijelog tijela.",
        },
        {
          id: "srv-bri-3b",
          name: "Botanical Glow tretman lica",
          category: "Lice & Tijelo",
          durationMin: 60,
          priceEur: 75,
          description: "Dubinska hidratacija i regeneracija kože.",
        },
      ],
    },
    {
      id: "bri-4",
      slug: "whiteladies-hair-studio-bristol",
      name: "Whiteladies Road Hair & Style",
      city: "Bristol",
      address: "Whiteladies Road 82, Clifton, BS8",
      lat: 51.4648,
      lon: -2.6114,
      rating: 4.9,
      reviewsCount: 165,
      coverImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-bri-4",
          name: "Oliver Clarke",
          role: "Creative Director",
          rating: 4.92,
          reviewsCount: 95,
          avatar: STYLIST_AVATARS[3],
          specialties: ["Cut & Finish", "Highlights", "Keratin"],
          availableSlots: ["10:00", "12:00", "14:30", "17:00"],
        },
      ],
      services: [
        {
          id: "srv-bri-4a",
          name: "Precision Cut & Blow-Dry",
          category: "Kosa",
          durationMin: 60,
          priceEur: 48,
          description: "Šišanje i stilizovanje prema obliku lica.",
        },
        {
          id: "srv-bri-4b",
          name: "Half-Head Highlights & Toner",
          category: "Kosa",
          durationMin: 120,
          priceEur: 90,
          description: "Prirodni pramenovi sa toniranjem.",
        },
      ],
    },
    {
      id: "bri-5",
      slug: "cabot-circus-nail-bar-bristol",
      name: "Cabot Circus Luxury Nail Atelier",
      city: "Bristol",
      address: "Broadmead 19, City Centre, BS1",
      lat: 51.4584,
      lon: -2.5866,
      rating: 4.88,
      reviewsCount: 134,
      coverImage: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-bri-5",
          name: "Isabella Wright",
          role: "Senior Nail Technician",
          rating: 4.91,
          reviewsCount: 79,
          avatar: STYLIST_AVATARS[1],
          specialties: ["Gel Extensions", "French Manicure", "Pedicure"],
          availableSlots: ["11:00", "13:00", "15:30", "18:00"],
        },
      ],
      services: [
        {
          id: "srv-bri-5a",
          name: "Gel Extensions & Custom Art",
          category: "Nokti",
          durationMin: 80,
          priceEur: 58,
          description: "Nadogradnja i dizajn po želji.",
        },
        {
          id: "srv-bri-5b",
          name: "Luxury Paraffin Manicure",
          category: "Nokti",
          durationMin: 50,
          priceEur: 42,
          description: "Dubinska njega kože ruku i lakiranje.",
        },
      ],
    },
    {
      id: "bri-6",
      slug: "redland-skin-laser-clinic-bristol",
      name: "Redland Skin & Aesthetic Clinic",
      city: "Bristol",
      address: "Coldharbour Road 34, Redland, BS6",
      lat: 51.4735,
      lon: -2.6075,
      rating: 4.95,
      reviewsCount: 178,
      coverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-bri-6",
          name: "Dr. Hannah Cooper",
          role: "Aesthetic Skin Specialist",
          rating: 4.97,
          reviewsCount: 108,
          avatar: STYLIST_AVATARS[0],
          specialties: ["Microneedling", "Chemical Peel", "LED Facial"],
          availableSlots: ["10:00", "12:30", "15:00", "17:00"],
        },
      ],
      services: [
        {
          id: "srv-bri-6a",
          name: "Medical Grade HydraFacial",
          category: "Lice & Tijelo",
          durationMin: 60,
          priceEur: 85,
          description: "Napredni tretman hidratacije i podmlađivanja.",
        },
        {
          id: "srv-bri-6b",
          name: "Relaxing Back, Neck & Shoulder Massage",
          category: "Masaža",
          durationMin: 45,
          priceEur: 55,
          description: "Ciljana masaža za opuštanje napetosti.",
        },
      ],
    },
    {
      id: "bri-7",
      slug: "bedminster-botanical-salon-bristol",
      name: "North Street Botanical Hair & Spa",
      city: "Bristol",
      address: "North Street 112, Southville, BS3",
      lat: 51.4412,
      lon: -2.6061,
      rating: 4.92,
      reviewsCount: 151,
      coverImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-bri-7",
          name: "Freya Hughes",
          role: "Organic Color Specialist",
          rating: 4.94,
          reviewsCount: 91,
          avatar: STYLIST_AVATARS[2],
          specialties: ["Organic Color", "Curly Cut", "Scalp Spa"],
          availableSlots: ["10:30", "13:00", "15:30", "18:00"],
        },
      ],
      services: [
        {
          id: "srv-bri-7a",
          name: "Organic Gloss Color & Cut",
          category: "Kosa",
          durationMin: 110,
          priceEur: 82,
          description: "Biljne boje bez amonijaka i šišanje.",
        },
        {
          id: "srv-bri-7b",
          name: "Japanese Head Spa Ritual",
          category: "Masaža",
          durationMin: 60,
          priceEur: 68,
          description: "Dubinski spa tretman vlasišta i masaža.",
        },
      ],
    },
  ],
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
      coverImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-sar-2",
          name: "Lejla Delić",
          role: "Senior Colorist & Stylist",
          rating: 4.95,
          reviewsCount: 92,
          avatar: STYLIST_AVATARS[1],
          specialties: ["Balayage", "Šišanje i feniranje", "Keratinski tretman"],
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
      coverImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
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
      coverImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
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
  münchen: [
    ...SALONS_DATA.filter((s) => s.city.toLowerCase() === "münchen"),
    {
      id: "muc-2",
      slug: "schwabing-hair-couture-munich",
      name: "Schwabing Hair & Color Couture",
      city: "München",
      address: "Leopoldstraße 56, Schwabing",
      lat: 48.1618,
      lon: 11.5861,
      rating: 4.94,
      reviewsCount: 230,
      coverImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-muc-2",
          name: "Hannah Lindner",
          role: "Master Colorist",
          rating: 4.96,
          reviewsCount: 145,
          avatar: STYLIST_AVATARS[0],
          specialties: ["Balayage", "Haarschnitt & Styling", "Olaplex"],
          availableSlots: ["10:00", "12:30", "15:00", "17:30"],
        },
      ],
      services: [
        {
          id: "srv-muc-2a",
          name: "Balayage & Olaplex Pflege",
          category: "Kosa",
          durationMin: 150,
          priceEur: 115,
          description: "Individuelle Farbberatung und Pflege.",
        },
        {
          id: "srv-muc-2b",
          name: "Waschen, Schneiden & Föhnen",
          category: "Kosa",
          durationMin: 60,
          priceEur: 55,
          description: "Präzisionshaarschnitt inklusive Kopfmassage.",
        },
      ],
    },
    {
      id: "muc-3",
      slug: "isar-spa-wellness-munich",
      name: "Isar Holistic Spa & Aesthetics",
      city: "München",
      address: "Sendlinger Straße 21, Altstadt",
      lat: 48.1356,
      lon: 11.5712,
      rating: 4.95,
      reviewsCount: 198,
      coverImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
      stylists: [
        {
          id: "st-muc-3",
          name: "Lena Berger",
          role: "Wellness & Facial Specialist",
          rating: 4.97,
          reviewsCount: 119,
          avatar: STYLIST_AVATARS[2],
          specialties: ["Aroma Massage", "HydraFacial", "Anti-Aging"],
          availableSlots: ["11:00", "13:30", "16:00", "18:30"],
        },
      ],
      services: [
        {
          id: "srv-muc-3a",
          name: "Deep Tissue & Aroma Massage",
          category: "Masaža",
          durationMin: 60,
          priceEur: 80,
          description: "Ganzkörpermassage mit biologischen Ölen.",
        },
        {
          id: "srv-muc-3b",
          name: "Luxury Glow Gesichtsbehandlung",
          category: "Lice & Tijelo",
          durationMin: 60,
          priceEur: 85,
          description: "Tiefenreinigung und Feuchtigkeits-Boost.",
        },
      ],
    },
  ],
};

function generateLocalFallbackSalons(
  cityLabel: string,
  lat?: number,
  lon?: number,
  withDistance?: boolean
): Salon[] {
  const cleanCity =
    cityLabel.charAt(0).toUpperCase() + cityLabel.slice(1);

  const templates = [
    {
      suffix: "Atelier Lumière Hair & Color",
      street: "Hauptstraße 14",
      category: "Kosa" as const,
      service1: "Šišanje, pranje & feniranje",
      price1: 42,
      service2: "Signature Balayage & Njega",
      price2: 95,
      role: "Master Hair Stylist",
      stylist: "Elena Weber",
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      dist: 0.9,
    },
    {
      suffix: "Velvet Nail & Brow Lounge",
      street: "Bahnhofstraße 8",
      category: "Nokti" as const,
      service1: "Ruski manikir + Gel lak",
      price1: 45,
      service2: "Estetski Spa pedikir",
      price2: 50,
      role: "Senior Nail Artist",
      stylist: "Mia Hoffmann",
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
      dist: 1.8,
    },
    {
      suffix: "Serenity Spa & Skin Sanctuary",
      street: "Marktplatz 5",
      category: "Masaža" as const,
      service1: "Aromatherapy Relaks masaža (60 min)",
      price1: 65,
      service2: "HydraFacial tretman lica",
      price2: 75,
      role: "Wellness & Aesthetic Therapist",
      stylist: "Sofia Bauer",
      img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
      dist: 2.7,
    },
    {
      suffix: "Noir Studio Beauty & Aesthetics",
      street: "Parkstraße 22",
      category: "Lice & Tijelo" as const,
      service1: "Personalizovani tretman lica",
      price1: 60,
      service2: "Lash Lift & Brow Lamination",
      price2: 55,
      role: "Beauty & Skin Specialist",
      stylist: "Clara Richter",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
      dist: 3.6,
    },
    {
      suffix: "Maison Éclat Hair Couture",
      street: "Königstraße 31",
      category: "Kosa" as const,
      service1: "Keratinski tretman & sjaj",
      price1: 88,
      service2: "Svečano feniranje & njega",
      price2: 38,
      role: "Senior Colorist",
      stylist: "Laura Meyer",
      img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80",
      dist: 4.5,
    },
    {
      suffix: "Pearl Nail Couture & Spa",
      street: "Lindenstraße 17",
      category: "Nokti" as const,
      service1: "BIAB Gel ojačanje noktiju",
      price1: 48,
      service2: "Spa manikir & parafin",
      price2: 40,
      role: "Nail Designer",
      stylist: "Nina Schulz",
      img: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=80",
      dist: 5.4,
    },
    {
      suffix: "Botanica Holistic Wellness",
      street: "Gartenweg 9",
      category: "Masaža" as const,
      service1: "Deep Tissue terapeutska masaža",
      price1: 72,
      service2: "Hot Stone relaks tretman",
      price2: 78,
      role: "Lead Spa Therapist",
      stylist: "Hanna König",
      img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80",
      dist: 6.8,
    },
    {
      suffix: "Aura Skin & Laser Lounge",
      street: "Schillerstraße 44",
      category: "Lice & Tijelo" as const,
      service1: "Microneedling & Vitamin Boost",
      price1: 90,
      service2: "Dubinsko čišćenje lica",
      price2: 62,
      role: "Aesthetic Specialist",
      stylist: "Lea Wagner",
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      dist: 8.2,
    },
    {
      suffix: "Studio Grace Hair & Extensions",
      street: "Poststraße 12",
      category: "Kosa" as const,
      service1: "Airtouch pramenovi & toner",
      price1: 110,
      service2: "Šišanje & dubinska maska",
      price2: 46,
      role: "Master Stylist",
      stylist: "Julia Becker",
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
      dist: 9.5,
    },
  ];

  return templates.map((t, idx) => ({
    id: `gen-${cleanCity.toLowerCase()}-${idx}`,
    slug: `${cleanCity.toLowerCase()}-salon-${idx}`,
    name: `${cleanCity} ${t.suffix}`,
    city: cleanCity,
    address: `${t.street}, ${cleanCity}`,
    lat: lat ? lat + (idx - 4) * 0.003 : undefined,
    lon: lon ? lon + (idx - 4) * 0.003 : undefined,
    distanceKm: withDistance ? t.dist : undefined,
    rating: Number((4.84 + (idx % 5) * 0.03).toFixed(2)),
    reviewsCount: 58 + idx * 19,
    coverImage: t.img,
    stylists: [
      {
        id: `st-gen-${idx}`,
        name: t.stylist,
        role: t.role,
        rating: 4.94,
        reviewsCount: 72 + idx * 11,
        avatar: STYLIST_AVATARS[idx % STYLIST_AVATARS.length],
        specialties: [t.service1, t.service2],
        availableSlots: ["10:00", "12:30", "15:00", "17:30"],
      },
    ],
    services: [
      {
        id: `srv-gen-${idx}-1`,
        name: t.service1,
        category: t.category,
        durationMin: 60,
        priceEur: t.price1,
        description: "Profesionalni tretman prilagođen vašim željama.",
      },
      {
        id: `srv-gen-${idx}-2`,
        name: t.service2,
        category: t.category,
        durationMin: 75,
        priceEur: t.price2,
        description: "Kompletna njega sa vrhunskim preparatima.",
      },
    ],
  }));
}

async function fetchWithTimeout(url: string, timeoutMs = 7500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

export async function searchSalonsByCityClient(
  cityName: string
): Promise<Salon[]> {
  const cleanCity = cityName.trim();
  if (!cleanCity) return [];

  const lowerCity = cleanCity.toLowerCase();
  const normalizedKey = lowerCity === "munich" ? "münchen" : lowerCity;

  const curated = CURATED_CITY_CATALOG[normalizedKey] || [];

  try {
    const res = await fetchWithTimeout(
      `/api/salons/nearby?mode=city&city=${encodeURIComponent(cleanCity)}`,
      7500
    );
    if (res.ok) {
      const data = await res.json();
      const apiSalons: Salon[] = data.salons || [];
      if (apiSalons.length > 0) {
        const seen = new Set(curated.map((s) => s.name.toLowerCase()));
        return [
          ...curated,
          ...apiSalons.filter((s) => !seen.has(s.name.toLowerCase())),
        ];
      }
    }
  } catch {
    // Ako API zakaže, nastavi ispod
  }

  if (curated.length > 0) return curated;

  return generateLocalFallbackSalons(cleanCity, undefined, undefined, false);
}

export async function searchSalonsByCoordsClient(
  lat: number,
  lon: number,
  radiusKm: number,
  cityLabel: string
): Promise<Salon[]> {
  try {
    const res = await fetchWithTimeout(
      `/api/salons/nearby?mode=nearby&lat=${lat}&lon=${lon}&radius=${radiusKm}&city=${encodeURIComponent(
        cityLabel
      )}`,
      7500
    );
    if (res.ok) {
      const data = await res.json();
      const apiSalons: Salon[] = data.salons || [];
      if (apiSalons.length > 0) {
        return apiSalons;
      }
    }
  } catch {
    // Nastavi na lokalni fallback
  }

  return generateLocalFallbackSalons(cityLabel, lat, lon, true).filter(
    (s) => (s.distanceKm ?? 0) <= radiusKm
  );
}