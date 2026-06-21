export const ETHIOPIAN_CITIES = [
  {
    id: 'addis_ababa',
    name: 'Addis Ababa',
    nameAm: 'አዲስ አበባ',
    coordinates: { lat: 9.0192, lng: 38.7525 },
    isActive: true,
  },
  {
    id: 'adama',
    name: 'Adama',
    nameAm: 'አዳማ',
    coordinates: { lat: 8.5414, lng: 39.2699 },
    isActive: true,
  },
  {
    id: 'hawassa',
    name: 'Hawassa',
    nameAm: 'ሐዋሳ',
    coordinates: { lat: 7.0621, lng: 38.4768 },
    isActive: true,
  },
  {
    id: 'dire_dawa',
    name: 'Dire Dawa',
    nameAm: 'ድሬዳዋ',
    coordinates: { lat: 9.5931, lng: 41.8661 },
    isActive: true,
  },
  {
    id: 'bahir_dar',
    name: 'Bahir Dar',
    nameAm: 'ባህር ዳር',
    coordinates: { lat: 11.5742, lng: 37.3614 },
    isActive: true,
  },
  {
    id: 'jimma',
    name: 'Jimma',
    nameAm: 'ጅማ',
    coordinates: { lat: 7.6667, lng: 36.8333 },
    isActive: true,
  },
] as const;

export type EthiopianCity = (typeof ETHIOPIAN_CITIES)[number];
export type CityId = EthiopianCity['id'];
