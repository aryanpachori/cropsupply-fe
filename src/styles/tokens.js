export const COLORS = {
  brand: '#0F6E56',
  brandDark: '#085041',
  brandLight: '#E1F5EE',
  brandMid: '#1D9E75',
  accent: '#5DCAA5',
  amber: '#EDA100',
  amberLight: '#FAEEDA',
  amberDark: '#854F0B',
  red: '#E24B4A',
  redLight: '#FCEBEB',
  redDark: '#A32D2D',
  blue: '#185FA5',
  blueLight: '#E6F1FB',
  purple: '#534AB7',
  purpleLight: '#EEEDFE',
  gray50: '#F1EFE8',
  gray100: '#D3D1C7',
  gray400: '#888780',
  gray600: '#5F5E5A',
  gray900: '#2C2C2A',
}

export const CROP_COLORS = {
  Maize: '#1D9E75',
  Rice: '#185FA5',
  Onion: '#EDA100',
  Groundnuts: '#993C1D',
  Avocado: '#3B6D11',
  'Sweet Pepper': '#D4537E',
  default: '#888780'
}

export const CROP_EMOJI = {
  Maize: '🌽',
  Rice: '🌾',
  Onion: '🧅',
  Groundnuts: '🥜',
  Avocado: '🥑',
  'Sweet Pepper': '🫑',
  default: '🌱'
}

export const CONFIDENCE_CONFIG = {
  high: { bg: '#E1F5EE', text: '#085041', label: 'High' },
  medium: { bg: '#FAEEDA', text: '#854F0B', label: 'Medium' },
  low: { bg: '#FCEBEB', text: '#A32D2D', label: 'Low' }
}

export const AGG_POINT_TYPES = {
  village_warehouse: { label: 'Village warehouse', color: '#1D9E75' },
  grain_storage: { label: 'Grain storage', color: '#185FA5' },
  cold_storage: { label: 'Cold storage', color: '#534AB7' },
  port_warehouse: { label: 'Port warehouse', color: '#D85A30' },
  collection_center: { label: 'Collection center', color: '#EDA100' },
  fulfillment_center: { label: 'Fulfillment center', color: '#888780' }
}

export const ACTIVITY_STEPS = [
  'Field inspection', 'Soil testing', 'Farm clearing',
  'Improving soil fertility', 'Main field prep', 'Harrowing',
  'Water harvesting structures', 'Making ridges', 'Irrigation system',
  'Sowing seeds', 'Irrigation', 'Weed control',
  'Fertilizer application', 'Pest control', 'Other techniques',
  'Harvest preparation', 'Harvesting', 'Post-harvest handling', 'Crop storage'
]
