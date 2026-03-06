import { ACCENT_PRESETS } from '../themeColors'

const PRESET_ORDER = ['purple', 'blue', 'emerald', 'teal', 'violet', 'indigo', 'pink', 'rose', 'amber']

const PRESET_LABELS = {
  purple: 'Purple',
  blue: 'Blue',
  emerald: 'Emerald',
  teal: 'Teal',
  violet: 'Violet',
  indigo: 'Indigo',
  pink: 'Pink',
  rose: 'Rose',
  amber: 'Orange',
}

function Settings({ theme, setTheme, accent, setAccent, customColor, setCustomColor }) {
  const isCustom = accent === 'custom'

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Appearance settings</h1>
        <p className="text-slate-600">
          Personalise Perfection Care Disability Services with your preferred theme and highlight colour.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-white border border-slate-200/80 shadow-glass p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Theme mode</h2>
          <p className="text-slate-600 text-sm mb-6">Choose between light and dark mode for the interface.</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Dark
            </button>
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-slate-200/80 shadow-glass p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Accent colour</h2>
          <p className="text-slate-600 text-sm mb-4">Update the primary colour used for buttons and highlights.</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {PRESET_ORDER.map((key) => {
              const palette = ACCENT_PRESETS[key]
              if (!palette) return null
              const isSelected = accent === key
              return (
                <button
                  key={key}
                  type="button"
                  aria-label={`${PRESET_LABELS[key]} accent`}
                  title={PRESET_LABELS[key]}
                  onClick={() => setAccent(key)}
                  className={`h-9 w-9 rounded-full border-2 transition-all duration-200 flex-shrink-0 ${
                    isSelected ? 'border-slate-800 scale-110 shadow-lg ring-2 ring-offset-2 ring-primary-500' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ background: `linear-gradient(135deg, ${palette[500]}, ${palette[600]})` }}
                />
              )
            })}
            <button
              type="button"
              aria-label="Custom colour"
              title="Custom colour"
              onClick={() => setAccent('custom')}
              className={`h-9 w-9 rounded-full border-2 transition-all duration-200 flex-shrink-0 flex items-center justify-center ${
                isCustom ? 'border-slate-800 scale-110 shadow-lg ring-2 ring-offset-2 ring-primary-500' : 'border-slate-300 hover:scale-105'
              }`}
              style={{
                background: isCustom
                  ? `linear-gradient(135deg, ${customColor}, ${customColor})`
                  : 'linear-gradient(135deg, #94a3b8, #64748b)',
              }}
            >
              {!isCustom && <span className="text-white text-xs font-bold">+</span>}
            </button>
          </div>

          {isCustom && (
            <div className="pt-3 border-t border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-2">Custom colour</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-slate-200 p-0.5 bg-white"
                  aria-label="Pick custom colour"
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    const v = e.target.value
                    if (/^#[0-9A-Fa-f]{6}$/.test(v) || /^[0-9A-Fa-f]{6}$/.test(v)) {
                      setCustomColor(v.startsWith('#') ? v : '#' + v)
                    }
                  }}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-mono text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                  placeholder="#80276c"
                  maxLength={7}
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Settings
