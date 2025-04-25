
export interface Tournament {
  id: string;
  title: string;
  buyIn: number;
  prizePool: number;
  date: string;
  casino: Casino;
  location: string;
  image?: string;
}

export interface Casino {
  id: string;
  name: string;
  logo: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  countryCode: string;
}

export const casinos: Casino[] = [
  {
    id: "1",
    name: "Card Casino Šamorín",
    logo: "https://via.placeholder.com/150/7e00fc/ffffff?text=Card+Casino",
    address: "Bratislavská cesta 1798/1",
    city: "Šamorín",
    country: "Slovakia",
    phoneNumber: "+421 123 456 789",
    email: "info@cardcasino.sk",
    latitude: 48.0279,
    longitude: 17.3009,
    description: "Card Casino Šamorín is Slovakia's premier poker destination, featuring regular tournaments and cash games.",
    countryCode: "sk"
  },
  {
    id: "2",
    name: "City Casino Nitra",
    logo: "https://via.placeholder.com/150/d4af37/ffffff?text=City+Casino",
    address: "Nábrežná 4901",
    city: "Nitra",
    country: "Slovakia",
    phoneNumber: "+421 987 654 321",
    latitude: 48.3092,
    longitude: 18.0872,
    description: "City Casino Nitra offers the best poker experience in Nitra with tournaments and cash games running daily.",
    countryCode: "sk"
  },
  {
    id: "3",
    name: "Kings Rozvadov",
    logo: "https://via.placeholder.com/150/d4af37/ffffff?text=Kings",
    address: "Rozvadov 7",
    city: "Rozvadov",
    country: "Czech Republic",
    phoneNumber: "+420 374 616 050",
    email: "info@pokerroomkings.com",
    latitude: 49.6703,
    longitude: 12.5567,
    description: "One of Europe's largest poker rooms with daily tournaments and cash games.",
    countryCode: "cz"
  },
  {
    id: "4",
    name: "Grand Casino Aš",
    logo: "https://via.placeholder.com/150/d4af37/ffffff?text=Grand",
    address: "Selbská 2721",
    city: "Aš",
    country: "Czech Republic",
    phoneNumber: "+420724883148",
    latitude: 50.2139,
    longitude: 12.1705,
    description: "Enjoy poker in the welcoming atmosphere of Grand Casino Aš.",
    countryCode: "cz"
  },
  {
    id: "5",
    name: "Casino Malta",
    logo: "https://via.placeholder.com/150/d4af37/ffffff?text=Casino+Malta",
    address: "Dragonara Road",
    city: "St. Julian's",
    country: "Malta",
    phoneNumber: "+356 2137 4283",
    latitude: 35.9225,
    longitude: 14.4912,
    description: "Casino Malta by Olympic Casino is Malta's biggest gaming and entertainment venue.",
    countryCode: "mt"
  }
];

// Define countries and their flags
export const countries = [
  { name: "Slovakia", code: "sk", flag: "https://flagcdn.com/sk.svg" },
  { name: "Czech Republic", code: "cz", flag: "https://flagcdn.com/cz.svg" },
  { name: "Malta", code: "mt", flag: "https://flagcdn.com/mt.svg" },
  { name: "Austria", code: "at", flag: "https://flagcdn.com/at.svg" },
  { name: "Hungary", code: "hu", flag: "https://flagcdn.com/hu.svg" }
];

export const tournaments: Tournament[] = [
  {
    id: "1",
    title: "SKILL POKER MASTER €500,000 GTD",
    buyIn: 350,
    prizePool: 500000,
    date: "2025-04-22",
    casino: casinos[0],
    location: "Šamorín, Slovakia",
    image: "https://via.placeholder.com/600/e6384c/ffffff?text=SKILL+POKER+MASTER"
  },
  {
    id: "2",
    title: "WPT Slovakia",
    buyIn: 1100,
    prizePool: 300000,
    date: "2025-05-23",
    casino: casinos[0],
    location: "Šamorín, Slovakia",
    image: "https://via.placeholder.com/600/0000ff/ffffff?text=WPT+Slovakia"
  },
  {
    id: "3",
    title: "Grand Prix €100,000 GTD",
    buyIn: 200,
    prizePool: 100000,
    date: "2025-05-05",
    casino: casinos[0],
    location: "Šamorín, Slovakia",
    image: "https://via.placeholder.com/600/003366/ffffff?text=GRAND+PRIX"
  },
  {
    id: "4",
    title: "City Casino Championship",
    buyIn: 150,
    prizePool: 150000,
    date: "2025-04-21",
    casino: casinos[1],
    location: "Nitra, Slovakia",
    image: "https://via.placeholder.com/600/ffd700/000000?text=CITY+CASINO+CHAMPIONSHIP"
  },
  {
    id: "5",
    title: "Mystery Bounty €50,000 GTD",
    buyIn: 400,
    prizePool: 50000,
    date: "2025-04-09",
    casino: casinos[1],
    location: "Komárno, Slovakia",
    image: "https://via.placeholder.com/600/444444/ffffff?text=MYSTERY+BOUNTY"
  },
  {
    id: "6",
    title: "Battle of Malta – 10th Anniversary",
    buyIn: 900,
    prizePool: 2000000,
    date: "2025-10-28",
    casino: casinos[4],
    location: "St. Julian's, Malta",
    image: "https://via.placeholder.com/600/ffA500/ffffff?text=BATTLE+OF+MALTA"
  },
];

export const liveTournaments: Tournament[] = [
  {
    id: "7",
    title: "SATELLITE TO PLO MASTERS REBUY",
    buyIn: 55,
    prizePool: 1500,
    date: "2025-04-25",
    casino: casinos[0],
    location: "Šamorín"
  },
  {
    id: "8",
    title: "SKILL POKER MASTER MAIN EVENT DAY 1C",
    buyIn: 350,
    prizePool: 500000,
    date: "2025-04-25",
    casino: casinos[0],
    location: "Šamorín"
  },
  {
    id: "9",
    title: "SATELLITE TO MAIN EVENT",
    buyIn: 55,
    prizePool: 1050,
    date: "2025-04-25",
    casino: casinos[0],
    location: "Šamorín"
  },
  {
    id: "10",
    title: "CCC DAY 1E",
    buyIn: 130,
    prizePool: 150000,
    date: "2025-04-25",
    casino: casinos[1],
    location: "Nitra - Zbehy"
  },
  {
    id: "11",
    title: "PLO MASTERS",
    buyIn: 500,
    prizePool: 30000,
    date: "2025-04-25",
    casino: casinos[0],
    location: "Šamorín"
  }
];
