/** Preset accent palettes (Tailwind-style 50–900). Applied as CSS variables. */
export const ACCENT_PRESETS = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  purple: {
    50: '#faf5f9',
    100: '#f4e8f1',
    200: '#ead2e3',
    300: '#d9a9c8',
    400: '#c47aa8',
    500: '#80276c',
    600: '#7a2466',
    700: '#6b2057',
    800: '#5a1b49',
    900: '#4a163c',
  },
}

/** Parse hex to r, g, b (0–255). */
function hexToRgb(hex) {
  const n = hex.replace('#', '')
  const v = parseInt(n, 16)
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 }
}

/** rgb 0–255 to hex. */
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('')
}

/** Mix color with white. amount 0 = all white, 1 = full color. */
function lighten(hex, amount) {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(
    255 - (255 - r) * amount,
    255 - (255 - g) * amount,
    255 - (255 - b) * amount
  )
}

/** Darken: multiply rgb by factor (0–1). */
function darken(hex, factor) {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(r * (1 - factor), g * (1 - factor), b * (1 - factor))
}

/** Generate a 50–900 palette from a single hex (used as 500). */
export function paletteFromHex(hex) {
  const normal = hex.startsWith('#') ? hex : '#' + hex
  return {
    50: lighten(normal, 0.95),
    100: lighten(normal, 0.85),
    200: lighten(normal, 0.7),
    300: lighten(normal, 0.5),
    400: lighten(normal, 0.25),
    500: normal,
    600: darken(normal, 0.1),
    700: darken(normal, 0.2),
    800: darken(normal, 0.3),
    900: darken(normal, 0.4),
  }
}
