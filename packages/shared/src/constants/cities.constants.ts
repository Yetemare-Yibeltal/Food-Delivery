// ─── City Interface ───────────────────────────────────────────────────────────
export interface ICity {
  id: string;
  name: string;
  nameAm: string;
  region: string;
  regionAm: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  deliveryZoneRadiusKm: number;
  baseDeliveryFeeETB: number;
  feePerKmETB: number;
  maxDeliveryFeeETB: number;
  minDeliveryFeeETB: number;
  estimatedPopulation: number;
  isActive: boolean;
  launchDate: string;
  subCities?: ISubCity[];
}

// ─── Sub City Interface ───────────────────────────────────────────────────────
export interface ISubCity {
  id: string;
  name: string;
  nameAm: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// ─── Ethiopian Cities ─────────────────────────────────────────────────────────
export const ETHIOPIAN_CITIES: ICity[] = [
  {
    id: 'addis_ababa',
    name: 'Addis Ababa',
    nameAm: 'አዲስ አበባ',
    region: 'Addis Ababa City Administration',
    regionAm: 'አዲስ አበባ ከተማ አስተዳደር',
    coordinates: { lat: 9.0222, lng: 38.7469 },
    deliveryZoneRadiusKm: 15,
    baseDeliveryFeeETB: 30,
    feePerKmETB: 5,
    maxDeliveryFeeETB: 150,
    minDeliveryFeeETB: 20,
    estimatedPopulation: 5000000,
    isActive: true,
    launchDate: '2024-01-01',
    subCities: [
      {
        id: 'bole',
        name: 'Bole',
        nameAm: 'ቦሌ',
        coordinates: { lat: 8.9806, lng: 38.7994 },
      },
      {
        id: 'kirkos',
        name: 'Kirkos',
        nameAm: 'ቅርቆስ',
        coordinates: { lat: 9.0127, lng: 38.7461 },
      },
      {
        id: 'arada',
        name: 'Arada',
        nameAm: 'አራዳ',
        coordinates: { lat: 9.0333, lng: 38.75 },
      },
      {
        id: 'lideta',
        name: 'Lideta',
        nameAm: 'ልደታ',
        coordinates: { lat: 9.005, lng: 38.735 },
      },
      {
        id: 'yeka',
        name: 'Yeka',
        nameAm: 'የካ',
        coordinates: { lat: 9.05, lng: 38.8 },
      },
      {
        id: 'kolfe_keranio',
        name: 'Kolfe Keranio',
        nameAm: 'ቆልፈ ቀራኒዮ',
        coordinates: { lat: 9.0167, lng: 38.7 },
      },
      {
        id: 'gulele',
        name: 'Gulele',
        nameAm: 'ጉለሌ',
        coordinates: { lat: 9.0667, lng: 38.7333 },
      },
      {
        id: 'nifas_silk_lafto',
        name: 'Nifas Silk Lafto',
        nameAm: 'ንፋስ ስልክ ላፍቶ',
        coordinates: { lat: 8.9833, lng: 38.7333 },
      },
      {
        id: 'akaky_kaliti',
        name: 'Akaky Kaliti',
        nameAm: 'አቃቂ ቃሊቲ',
        coordinates: { lat: 8.9167, lng: 38.7833 },
      },
      {
        id: 'addis_ketema',
        name: 'Addis Ketema',
        nameAm: 'አዲስ ከተማ',
        coordinates: { lat: 9.025, lng: 38.735 },
      },
      {
        id: 'cherkos',
        name: 'Cherkos',
        nameAm: 'ቼርቆስ',
        coordinates: { lat: 9.04, lng: 38.76 },
      },
    ],
  },
  {
    id: 'adama',
    name: 'Adama',
    nameAm: 'አዳማ',
    region: 'Oromia',
    regionAm: 'ኦሮሚያ',
    coordinates: { lat: 8.54, lng: 39.27 },
    deliveryZoneRadiusKm: 10,
    baseDeliveryFeeETB: 25,
    feePerKmETB: 4,
    maxDeliveryFeeETB: 100,
    minDeliveryFeeETB: 15,
    estimatedPopulation: 400000,
    isActive: true,
    launchDate: '2024-03-01',
    subCities: [
      {
        id: 'adama_01',
        name: 'Adama Subcity 01',
        nameAm: 'አዳማ ክፍለ ከተማ 01',
        coordinates: { lat: 8.545, lng: 39.265 },
      },
      {
        id: 'adama_02',
        name: 'Adama Subcity 02',
        nameAm: 'አዳማ ክፍለ ከተማ 02',
        coordinates: { lat: 8.535, lng: 39.275 },
      },
    ],
  },
  {
    id: 'hawassa',
    name: 'Hawassa',
    nameAm: 'ሀዋሳ',
    region: 'Sidama',
    regionAm: 'ሲዳማ',
    coordinates: { lat: 7.05, lng: 38.4667 },
    deliveryZoneRadiusKm: 10,
    baseDeliveryFeeETB: 25,
    feePerKmETB: 4,
    maxDeliveryFeeETB: 100,
    minDeliveryFeeETB: 15,
    estimatedPopulation: 350000,
    isActive: true,
    launchDate: '2024-03-01',
    subCities: [
      {
        id: 'haik_dar',
        name: 'Haik Dar',
        nameAm: 'ሃይቅ ዳር',
        coordinates: { lat: 7.045, lng: 38.46 },
      },
      {
        id: 'tabor',
        name: 'Tabor',
        nameAm: 'ታቦር',
        coordinates: { lat: 7.055, lng: 38.47 },
      },
      {
        id: 'menaharia',
        name: 'Menaharia',
        nameAm: 'መናሃሪያ',
        coordinates: { lat: 7.06, lng: 38.475 },
      },
    ],
  },
  {
    id: 'dire_dawa',
    name: 'Dire Dawa',
    nameAm: 'ድሬዳዋ',
    region: 'Dire Dawa City Administration',
    regionAm: 'ድሬዳዋ ከተማ አስተዳደር',
    coordinates: { lat: 9.5931, lng: 41.8661 },
    deliveryZoneRadiusKm: 10,
    baseDeliveryFeeETB: 25,
    feePerKmETB: 4,
    maxDeliveryFeeETB: 100,
    minDeliveryFeeETB: 15,
    estimatedPopulation: 450000,
    isActive: true,
    launchDate: '2024-06-01',
    subCities: [
      {
        id: 'kezira',
        name: 'Kezira',
        nameAm: 'ከዚራ',
        coordinates: { lat: 9.59, lng: 41.86 },
      },
      {
        id: 'sabian',
        name: 'Sabian',
        nameAm: 'ሳቢያን',
        coordinates: { lat: 9.595, lng: 41.87 },
      },
    ],
  },
  {
    id: 'bahir_dar',
    name: 'Bahir Dar',
    nameAm: 'ባህር ዳር',
    region: 'Amhara',
    regionAm: 'አማራ',
    coordinates: { lat: 11.5742, lng: 37.3614 },
    deliveryZoneRadiusKm: 10,
    baseDeliveryFeeETB: 25,
    feePerKmETB: 4,
    maxDeliveryFeeETB: 100,
    minDeliveryFeeETB: 15,
    estimatedPopulation: 350000,
    isActive: true,
    launchDate: '2024-06-01',
    subCities: [
      {
        id: 'bahir_dar_zuria',
        name: 'Bahir Dar Zuria',
        nameAm: 'ባህር ዳር ዙሪያ',
        coordinates: { lat: 11.58, lng: 37.37 },
      },
      {
        id: 'belay_zeleke',
        name: 'Belay Zeleke',
        nameAm: 'በላይ ዘለቀ',
        coordinates: { lat: 11.57, lng: 37.35 },
      },
    ],
  },
  {
    id: 'jimma',
    name: 'Jimma',
    nameAm: 'ጅማ',
    region: 'Oromia',
    regionAm: 'ኦሮሚያ',
    coordinates: { lat: 7.6667, lng: 36.8333 },
    deliveryZoneRadiusKm: 10,
    baseDeliveryFeeETB: 25,
    feePerKmETB: 4,
    maxDeliveryFeeETB: 100,
    minDeliveryFeeETB: 15,
    estimatedPopulation: 250000,
    isActive: true,
    launchDate: '2024-06-01',
    subCities: [
      {
        id: 'jimma_01',
        name: 'Jimma Subcity 01',
        nameAm: 'ጅማ ክፍለ ከተማ 01',
        coordinates: { lat: 7.67, lng: 36.84 },
      },
      {
        id: 'jimma_02',
        name: 'Jimma Subcity 02',
        nameAm: 'ጅማ ክፍለ ከተማ 02',
        coordinates: { lat: 7.66, lng: 36.82 },
      },
    ],
  },
] as const;

// ─── City IDs Type ────────────────────────────────────────────────────────────
export type CityId = 'addis_ababa' | 'adama' | 'hawassa' | 'dire_dawa' | 'bahir_dar' | 'jimma';

// ─── Active Cities ────────────────────────────────────────────────────────────
export const ACTIVE_CITIES = ETHIOPIAN_CITIES.filter((city) => city.isActive);

// ─── City Names for Dropdown ──────────────────────────────────────────────────
export const CITY_OPTIONS = ETHIOPIAN_CITIES.map((city) => ({
  value: city.id,
  label: city.name,
  labelAm: city.nameAm,
}));

// ─── Get City By ID ───────────────────────────────────────────────────────────
export const getCityById = (id: string): ICity | undefined => {
  return ETHIOPIAN_CITIES.find((city) => city.id === id);
};

// ─── Get City Name ────────────────────────────────────────────────────────────
export const getCityName = (id: string, lang: 'en' | 'am' = 'en'): string => {
  const city = getCityById(id);
  if (!city) return id;
  return lang === 'am' ? city.nameAm : city.name;
};

// ─── Get Sub Cities By City ID ────────────────────────────────────────────────
export const getSubCities = (cityId: string): ISubCity[] => {
  const city = getCityById(cityId);
  return city?.subCities ?? [];
};

// ─── Calculate Delivery Fee ───────────────────────────────────────────────────
export const calculateDeliveryFee = (cityId: string, distanceKm: number): number => {
  const city = getCityById(cityId);
  if (!city) return 50;
  const fee = city.baseDeliveryFeeETB + distanceKm * city.feePerKmETB;
  return Math.min(Math.max(fee, city.minDeliveryFeeETB), city.maxDeliveryFeeETB);
};
