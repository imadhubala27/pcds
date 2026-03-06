import { useState, useEffect, useLayoutEffect, useMemo } from 'react'
import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Settings from './pages/Settings'
import { ACCENT_PRESETS, paletteFromHex } from './themeColors'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [accent, setAccent] = useState(() => {
    const saved = localStorage.getItem('accent')
    if (saved === 'orange') return 'amber'
    return saved || 'purple'
  })
  const [customColor, setCustomColor] = useState(() => localStorage.getItem('customAccent') || '#80276c')

  const palette = useMemo(
    () =>
      accent === 'custom'
        ? paletteFromHex(customColor)
        : (ACCENT_PRESETS[accent] || ACCENT_PRESETS.purple),
    [accent, customColor]
  )

  const accentStyle = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(palette).map(([key, value]) => [`--color-primary-${key}`, value])
      ),
    [palette]
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Apply accent palette to document root so all pages (Home, Navbar, etc.) use it immediately
  useLayoutEffect(() => {
    const root = document.documentElement
    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value)
    })
  }, [palette])

  useEffect(() => {
    localStorage.setItem('accent', accent)
    if (accent === 'custom') localStorage.setItem('customAccent', customColor)
  }, [accent, customColor])

  const appClassName = `app theme-${theme} accent-${accent}`

  return (
    <FrappeProvider>
      <div
        className={`min-h-screen flex flex-col ${appClassName}`}
        style={accentStyle}
      >
        <Navbar />
        <main className="main-content flex-1 px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/settings"
              element={
                <Settings
                  theme={theme}
                  setTheme={setTheme}
                  accent={accent}
                  setAccent={setAccent}
                  customColor={customColor}
                  setCustomColor={setCustomColor}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </FrappeProvider>
  )
}

export default App
