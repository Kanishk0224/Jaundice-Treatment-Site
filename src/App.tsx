import { useState, useEffect, useRef } from 'react'
import logo from '@/imports/ChatGPT_Image_Sep_4__2026__09_39_23_PM.png'
import centrePhoto from '@/imports/ChatGPT_Image_Sep_5__2026__10_43_40_AM.png'

type Lang = 'ta' | 'en'

/* ─── translations ─────────────────────────────────────────────────────── */
const T = {
  ta: {
    nav: ['முகப்பு', 'எங்களைப் பற்றி', 'சேவைகள்', 'வைத்தியர்கள்', 'தொடர்பு'],
    navIds: ['home', 'about', 'services', 'practitioners', 'contact'],
    callBtn: 'அழைக்கவும்',
    whatsappBtn: 'வாட்ஸ்ஆப்',
    directionsBtn: 'வழி காண',
    enquireBtn: 'விசாரி',
    since: '1900 முதல்',
    heroHeading: 'காமாலை சிகிச்சை மையம்',
    heroName: 'குப்புசாமி கவுண்டர்',
    heroSub: 'பாரம்பரிய மூலிகை சிகிச்சை · சேலம்',
    heroDesc: 'நம்பகமான பாரம்பரிய மூலிகை சிகிச்சை முறையில் காமாலை நோய்க்கு சிறப்பான சேவை. சேலம் மாவட்டத்தில் பல தலைமுறைகளாக நேர்மையான சிகிச்சை வழங்கி வருகிறோம்.',
    openHoursShort: 'திங்கள் – சனி, காலை 7 – மாலை 7',
    location: 'சின்னசேலம், சேலம் – 636 008',
    aboutLabel: 'எங்களைப் பற்றி',
    aboutHeading: 'ஒரு நூற்றாண்டுக்கும் மேலான நம்பிக்கை',
    aboutP1: 'குப்புசாமி கவுண்டர் ஜாண்டீஸ் சிகிச்சை மையம் 1900-ஆம் ஆண்டு முதல் சேலத்தில் பாரம்பரிய மூலிகை முறையில் காமாலை நோய்க்கு சிகிச்சை வழங்கி வருகிறது.',
    aboutP2: 'இது ஒரு பரம்பரை சிகிச்சை முறை — அனுபவம் மிக்க வைத்தியர்களால் தலைமுறை தலைமுறையாகத் தொடர்ந்து வழங்கப்படுகிறது. எங்கள் சிகிச்சை முறை இயற்கையான மூலிகைகளை அடிப்படையாகக் கொண்டது.',
    stats: [
      { num: '125+', label: 'ஆண்டுகள்' },
      { num: '3', label: 'தலைமுறைகள்' },
      { num: 'ஆயிரக்கணக்கான', label: 'நோயாளிகள்' },
    ],
    servicesLabel: 'சேவைகள்',
    servicesHeading: 'எங்கள் சேவைகள்',
    services: [
      { icon: '🌿', title: 'மூலிகை சிகிச்சை', desc: 'இயற்கை மூலிகைகள் மூலம் காமாலை நோய்க்கு பாரம்பரிய சிகிச்சை வழங்குகிறோம்.' },
      { icon: '🩺', title: 'நேரில் ஆலோசனை', desc: 'அனுபவமிக்க வைத்தியர்களிடம் நேரடியாக ஆலோசனை பெறலாம்.' },
      { icon: '🔄', title: 'தொடர் கண்காணிப்பு', desc: 'சிகிச்சைக்கு பின்னரும் நோயாளி நலனில் அக்கறை காட்டுகிறோம்.' },
      { icon: '📋', title: 'ஆரோக்கிய தகவல்', desc: 'காமாலை நோய் பற்றிய விழிப்புணர்வு மற்றும் தடுப்பு ஆலோசனை.' },
    ],
    practitionersLabel: 'வைத்தியர்கள்',
    practitionersHeading: 'எங்கள் வைத்தியர்கள்',
    practitioners: [
      { name: 'செந்தில்குமார்', phone: '90037 45116', role: 'மூத்த வைத்தியர்' },
      { name: 'நித்யகுமார்', phone: '94432 73535', role: 'வைத்தியர்' },
      { name: 'பொன்னழகர்', phone: '94444 55571', role: 'வைத்தியர்' },
    ],
    faqLabel: 'கேள்வி-பதில்',
    faqHeading: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    faqs: [
      { q: 'மையம் எங்கே உள்ளது?', a: 'எரிபாளையம் சாலை, சின்னசேலம், சேலம் – 636 008.' },
      { q: 'திறக்கும் நேரம் என்ன?', a: 'திங்கள் முதல் சனி வரை காலை 7:00 மணி முதல் மாலை 7:00 மணி வரை.' },
      { q: 'முன்பதிவு தேவையா?', a: 'இல்லை. நேரில் வரலாம். எனினும் முன்கூட்டியே அழைக்கலாம்.' },
      { q: 'எந்த எண்ணில் தொடர்பு கொள்வது?', a: '90037 45116 அல்லது 94432 73535 அல்லது 94444 55571.' },
    ],
    contactLabel: 'தொடர்பு',
    contactHeading: 'தொடர்பு கொள்ளுங்கள்',
    contactSub: 'எங்களை அழையுங்கள் அல்லது வாட்ஸ்ஆப்பில் தொடர்பு கொள்ளுங்கள்',
    addressLabel: 'முகவரி',
    phoneLabel: 'தொலைபேசி',
    hoursLabel: 'நேரம்',
    fullAddress: 'எரிபாளையம் சாலை, சின்னசேலம், சேலம் – 636 008',
    fullHours: 'திங்கள் – சனி: காலை 7:00 – மாலை 7:00',
    disclaimer: 'இந்த வலைத்தளம் பொதுவான தகவல் நோக்கங்களுக்காக மட்டுமே. மருத்துவ ஆலோசனைக்கு தகுதிவாய்ந்த மருத்துவரை அணுகவும்.',
    footerDesc: 'சேலம் மாவட்டத்தில் 1900 முதல் பாரம்பரிய மூலிகை சிகிச்சை வழங்கும் நம்பகமான மையம்.',
    copyright: '© 2026 குப்புசாமி கவுண்டர் ஜாண்டீஸ் சிகிச்சை மையம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    announce: '📢 மையம் இன்று திறந்துள்ளது — காலை 7 மணி முதல் மாலை 7 மணி வரை.',
    quickLinks: 'விரைவு இணைப்புகள்',
  },
  en: {
    nav: ['Home', 'About', 'Services', 'Practitioners', 'Contact'],
    navIds: ['home', 'about', 'services', 'practitioners', 'contact'],
    callBtn: 'Call Now',
    whatsappBtn: 'WhatsApp',
    directionsBtn: 'Directions',
    enquireBtn: 'Enquire',
    since: 'Since 1900',
    heroHeading: 'Jaundice Treatment Centre',
    heroName: 'Kuppusamy Goundar',
    heroSub: 'Traditional Herbal Treatment · Salem, Tamil Nadu',
    heroDesc: 'Trusted traditional herbal treatment for jaundice, serving families across Salem district for over 125 years. Experienced practitioners, natural remedies, compassionate care.',
    openHoursShort: 'Mon – Sat, 7:00 AM – 7:00 PM',
    location: 'Chinnasalem, Salem – 636 008',
    aboutLabel: 'About Us',
    aboutHeading: 'A Century of Trusted Care',
    aboutP1: 'Kuppusamy Goundar Jaundice Treatment Centre has been providing traditional herbal treatment for jaundice in Salem since 1900.',
    aboutP2: 'This is a hereditary practice passed through generations of experienced practitioners. Our treatment is rooted in natural herbal medicine, with patient well-being at its heart.',
    stats: [
      { num: '125+', label: 'Years' },
      { num: '3', label: 'Generations' },
      { num: 'Thousands', label: 'Patients' },
    ],
    servicesLabel: 'Services',
    servicesHeading: 'Our Services',
    services: [
      { icon: '🌿', title: 'Herbal Treatment', desc: 'Traditional jaundice treatment using carefully selected natural herbal remedies.' },
      { icon: '🩺', title: 'Consultation', desc: 'In-person consultation with experienced practitioners at the centre.' },
      { icon: '🔄', title: 'Follow-up Care', desc: 'Ongoing support and monitoring after treatment for full recovery.' },
      { icon: '📋', title: 'Health Guidance', desc: 'Education on jaundice awareness, prevention, and general liver health.' },
    ],
    practitionersLabel: 'Practitioners',
    practitionersHeading: 'Our Practitioners',
    practitioners: [
      { name: 'S. Senthilkumar', phone: '90037 45116', role: 'Senior Practitioner' },
      { name: 'S. Nithiyakumar', phone: '94432 73535', role: 'Practitioner' },
      { name: 'S. Ponnazhwar', phone: '94444 55571', role: 'Practitioner' },
    ],
    faqLabel: 'FAQ',
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      { q: 'Where is the centre located?', a: 'Eripalayam Road, Chinnasalem, Salem – 636 008.' },
      { q: 'What are the opening hours?', a: 'Monday to Saturday, 7:00 AM to 7:00 PM.' },
      { q: 'Do I need an appointment?', a: 'No appointment needed. Walk-ins are welcome. You can also call ahead.' },
      { q: 'What are the contact numbers?', a: '90037 45116 | 94432 73535 | 94444 55571' },
    ],
    contactLabel: 'Contact',
    contactHeading: 'Get in Touch',
    contactSub: 'Call us or reach us on WhatsApp — we are happy to help',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    hoursLabel: 'Hours',
    fullAddress: 'Eripalayam Road, Chinnasalem, Salem – 636 008',
    fullHours: 'Monday – Saturday: 7:00 AM – 7:00 PM',
    disclaimer: 'This website is for general information only. For medical advice, please consult a qualified medical professional.',
    footerDesc: 'A trusted traditional herbal treatment centre in Salem district since 1900.',
    copyright: '© 2026 Kuppusamy Goundar Jaundice Treatment Centre. All rights reserved.',
    announce: '📢 Centre is open today — 7:00 AM to 7:00 PM.',
    quickLinks: 'Quick Links',
  },
}

const phones = ['90037 45116', '94432 73535', '94444 55571']
const primaryPhone = '9003745116'
const whatsappNumber = '919003745116'
const mapsLink = 'https://maps.google.com/?q=Kuppusamy+Goundar+Jaundice+Treatment+Centre+Salem'

const langOptions: { code: Lang; native: string }[] = [
  { code: 'ta', native: 'தமிழ்' },
  { code: 'en', native: 'English' },
]

/* ─── tiny icon components ─────────────────────────────────────────────── */
function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
    </svg>
  )
}

function WAIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function PinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 10a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

/* ─── section header ───────────────────────────────────────────────────── */
function SectionHeader({ label, heading, light = false }: { label: string; heading: string; light?: boolean }) {
  return (
    <div className="text-center mb-10 md:mb-14">
      <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
        style={{ color: light ? 'var(--color-gold-light)' : 'var(--color-gold)' }}>
        {label}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
        style={{ fontFamily: 'var(--font-display)', color: light ? 'white' : 'var(--color-forest-dark)' }}>
        {heading}
      </h2>
      <div className="mx-auto mt-4 w-14 h-1 rounded-full" style={{ background: 'var(--color-gold)' }} />
    </div>
  )
}

/* ─── main app ─────────────────────────────────────────────────────────── */
export default function App() {
  const [lang, setLang] = useState<Lang>('ta')
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const t = T[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  return (
    <div style={{ background: 'var(--color-cream)', color: 'var(--color-bark)', fontFamily: 'var(--font-body)' }}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div style={{ background: 'var(--color-forest)', color: 'var(--color-gold-light)' }}
        className="text-center text-xs sm:text-sm py-2 px-4 font-medium">
        {t.announce}
      </div>

      {/* ═══════════════════════════════════════════════════
          HEADER — sticky, glass on scroll
      ═══════════════════════════════════════════════════ */}
      <header id="home"
        style={{
          background: scrolled ? 'rgba(10, 28, 18, 0.96)' : 'var(--color-forest-dark)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.35)' : 'none',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
        className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18 gap-4">

            {/* Logo + name */}
            <button onClick={() => scrollTo('home')} className="flex items-center gap-3 shrink-0">
              <img src={logo} alt="Centre logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 shrink-0"
                style={{ borderColor: 'var(--color-gold)' }} />
              <div className="text-left hidden sm:block">
                <p className="font-bold text-sm md:text-base leading-tight"
                  style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-display)' }}>
                  {lang === 'ta' ? 'குப்புசாமி கவுண்டர்' : 'Kuppusamy Goundar'}
                </p>
                <p className="text-[11px] text-white/60 leading-tight">
                  {lang === 'ta' ? 'ஜாண்டீஸ் சிகிச்சை மையம்' : 'Jaundice Treatment Centre'}
                </p>
              </div>
              {/* Mobile-only short name */}
              <p className="sm:hidden font-bold text-sm" style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-display)' }}>
                {lang === 'ta' ? 'குப்புசாமி கவுண்டர்' : 'KG Centre'}
              </p>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {t.nav.map((item, i) => (
                <button key={item} onClick={() => scrollTo(t.navIds[i])}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-white/75 hover:text-white hover:bg-white/8 transition-all duration-150">
                  {item}
                </button>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Desktop call button */}
              <a href={`tel:+91${primaryPhone}`}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
                style={{ background: 'var(--color-gold)', color: 'var(--color-bark)' }}>
                <PhoneIcon /> {t.callBtn}
              </a>

              {/* Language picker */}
              <div ref={langRef} className="relative">
                <button onClick={() => setLangOpen(v => !v)}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={{ borderColor: 'rgba(201,150,10,0.5)', color: 'var(--color-gold-light)' }}>
                  {langOptions.find(l => l.code === lang)?.native}
                  <ChevronDown open={langOpen} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden shadow-2xl border z-50"
                    style={{ background: '#0a1c12', borderColor: 'rgba(201,150,10,0.4)', minWidth: '130px' }}>
                    {langOptions.map(opt => (
                      <button key={opt.code} onClick={() => { setLang(opt.code); setLangOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors"
                        style={{
                          background: lang === opt.code ? 'rgba(201,150,10,0.15)' : 'transparent',
                          color: lang === opt.code ? 'var(--color-gold-light)' : 'rgba(255,255,255,0.7)',
                        }}>
                        {lang === opt.code && <span style={{ color: 'var(--color-gold)' }}>✓</span>}
                        {lang !== opt.code && <span className="w-4" />}
                        {opt.native}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button onClick={() => setMenuOpen(v => !v)} className="md:hidden text-white p-1.5 -mr-1.5"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation">
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {menuOpen && (
          <div id="mobile-navigation" className="md:hidden border-t" style={{ background: '#0a1c12', borderColor: 'rgba(201,150,10,0.2)' }}>
            <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
              {t.nav.map((item, i) => (
                <button key={item} onClick={() => scrollTo(t.navIds[i])}
                  className="text-left py-3.5 text-white/85 hover:text-white text-sm font-medium border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  {item}
                </button>
              ))}
              <div className="py-3 flex gap-3">
                <a href={`tel:+91${primaryPhone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
                  style={{ background: 'var(--color-forest-light)', color: 'white' }}>
                  <PhoneIcon /> {t.callBtn}
                </a>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
                  style={{ background: '#25d366', color: 'white' }}>
                  <WAIcon /> {t.whatsappBtn}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden"
        style={{ minHeight: 'calc(100svh - 40px)' }}>
        {/* Background: centre photo */}
        <img src={centrePhoto} alt="Kuppusamy Goundar Jaundice Treatment Centre, Salem"
          className="absolute inset-0 w-full h-full object-cover object-center" />

        {/* Dark gradient overlay — stronger at bottom */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(8,22,14,0.72) 0%, rgba(8,22,14,0.50) 40%, rgba(8,22,14,0.88) 75%, rgba(5,18,10,0.97) 100%)' }} />

        {/* ─ Hero content ─ */}
        <div className="relative z-10 flex flex-col justify-end min-h-[inherit]"
          style={{ minHeight: 'calc(100svh - 40px)' }}>
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end">

              {/* ── Left: text ── */}
              <div className="flex flex-col gap-5 md:gap-6">
                {/* Since badge */}
                <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border"
                  style={{ borderColor: 'var(--color-gold)', color: 'var(--color-gold-light)', background: 'rgba(201,150,10,0.12)' }}>
                  🌿 {t.since}
                </span>

                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2"
                    style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                    {t.heroHeading}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold" style={{ color: 'var(--color-gold-light)' }}>
                    {t.heroName}
                  </p>
                  <p className="text-sm sm:text-base text-white/65 mt-1">{t.heroSub}</p>
                </div>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg">
                  {t.heroDesc}
                </p>

                {/* Info chips */}
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm text-white/80 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
                    🕐 {t.openHoursShort}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm text-white/80 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
                    📍 {t.location}
                  </span>
                </div>

                {/* CTA row — desktop shows 3, mobile shows 2×2 grid */}
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
                  <a href={`tel:+91${primaryPhone}`}
                    className="flex items-center justify-center gap-2 py-3.5 md:py-3 px-5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform"
                    style={{ background: 'var(--color-forest)', color: 'white' }}>
                    <PhoneIcon /> {t.callBtn}
                  </a>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 md:py-3 px-5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform"
                    style={{ background: '#25d366', color: 'white' }}>
                    <WAIcon /> {t.whatsappBtn}
                  </a>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 md:py-3 px-5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform"
                    style={{ background: 'var(--color-gold)', color: 'var(--color-bark)' }}>
                    <PinIcon /> {t.directionsBtn}
                  </a>
                  <button onClick={() => scrollTo('contact')}
                    className="flex items-center justify-center gap-2 py-3.5 md:py-3 px-5 rounded-xl font-bold text-sm border-2 active:scale-95 transition-transform"
                    style={{ borderColor: 'rgba(255,255,255,0.45)', color: 'white', background: 'transparent' }}>
                    ✉️ {t.enquireBtn}
                  </button>
                </div>
              </div>

              {/* ── Right: logo badge (hidden on small mobile, shown md+) ── */}
              <div className="hidden md:flex justify-center items-center pb-4">
                <div className="relative">
                  {/* Glow ring */}
                  <div className="absolute -inset-4 rounded-full opacity-40"
                    style={{ background: 'radial-gradient(circle, var(--color-gold) 0%, transparent 70%)', filter: 'blur(20px)' }} />
                  <img src={logo} alt="Kuppusamy Goundar Jaundice Treatment Centre logo"
                    className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full object-cover border-4 shadow-2xl"
                    style={{ borderColor: 'var(--color-gold)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile logo — floats in hero top-right */}
        <div className="md:hidden absolute top-6 right-4 z-10">
          <img src={logo} alt="Centre logo"
            className="w-20 h-20 rounded-full object-cover border-[3px] shadow-xl"
            style={{ borderColor: 'var(--color-gold)' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          QUICK STATS BAR
      ═══════════════════════════════════════════════════ */}
      <div style={{ background: 'var(--color-forest)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-3 divide-x divide-white/10">
          {t.stats.map(s => (
            <div key={s.label} className="flex flex-col items-center text-center px-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-display)' }}>
                {s.num}
              </span>
              <span className="text-[11px] sm:text-xs text-white/60 mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════════════ */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Photo */}
          <div className="relative order-2 md:order-1">
            <img src={centrePhoto} alt="Kuppusamy Goundar Treatment Centre building"
              className="w-full rounded-2xl object-cover shadow-2xl"
              style={{ aspectRatio: '4/3', border: '3px solid var(--color-gold)' }} />
            {/* Since badge */}
            <div className="absolute -top-5 -right-3 md:-top-6 md:-right-6 w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-xl font-bold text-center"
              style={{ background: 'var(--color-forest)', borderColor: 'var(--color-gold)', color: 'var(--color-gold-light)' }}>
              <span className="text-[10px] md:text-xs leading-tight">
                {lang === 'ta' ? 'முதல்' : 'Since'}
              </span>
              <span className="text-xl md:text-2xl leading-tight font-bold">1900</span>
            </div>
            {/* Green leaf accent */}
            <div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border-2"
              style={{ background: 'var(--color-cream)', borderColor: 'var(--color-gold)' }}>
              🌿
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2 flex flex-col gap-5">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--color-gold)' }}>
                {t.aboutLabel}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest-dark)' }}>
                {t.aboutHeading}
              </h2>
              <div className="mt-4 w-14 h-1 rounded-full" style={{ background: 'var(--color-gold)' }} />
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-gray-700">{t.aboutP1}</p>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700">{t.aboutP2}</p>

            {/* Feature list */}
            <ul className="flex flex-col gap-2.5">
              {[
                lang === 'ta' ? 'பாரம்பரிய மூலிகை சிகிச்சை முறை' : 'Traditional herbal treatment methodology',
                lang === 'ta' ? 'பல தலைமுறை அனுபவம்' : 'Multi-generational practitioner experience',
                lang === 'ta' ? 'இயற்கை மூலிகை மருந்துகள்' : 'Natural herbal remedies',
                lang === 'ta' ? 'நோயாளி நலன் மையப்படுத்திய சிகிச்சை' : 'Patient-centred care approach',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'var(--color-forest)' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 pt-1 flex-wrap">
              <a href={`tel:+91${primaryPhone}`}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm shadow-md active:scale-95 transition-transform"
                style={{ background: 'var(--color-forest)', color: 'white' }}>
                <PhoneIcon /> {t.callBtn}
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm shadow-md active:scale-95 transition-transform"
                style={{ background: '#25d366', color: 'white' }}>
                <WAIcon /> {t.whatsappBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════ */}
      <section id="services" style={{ background: 'var(--color-forest-dark)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SectionHeader label={t.servicesLabel} heading={t.servicesHeading} light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.services.map(s => (
              <div key={s.title}
                className="group rounded-2xl p-6 md:p-7 flex flex-col gap-4 border hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-250"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(201,150,10,0.2)' }}>
                <span className="text-4xl">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-2"
                    style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-display)' }}>
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-auto pt-2">
                  <div className="w-8 h-0.5 rounded-full" style={{ background: 'var(--color-gold)', opacity: 0.5 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRACTITIONERS
      ═══════════════════════════════════════════════════ */}
      <section id="practitioners" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeader label={t.practitionersLabel} heading={t.practitionersHeading} />
        <div className="grid sm:grid-cols-3 gap-5 md:gap-6">
          {t.practitioners.map((p, idx) => (
            <div key={p.name}
              className="rounded-2xl p-6 md:p-8 flex flex-col items-center text-center gap-4 border"
              style={{ background: 'var(--color-cream-dark)', borderColor: 'rgba(201,150,10,0.2)' }}>
              {/* Avatar placeholder */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center text-3xl shadow-lg"
                style={{ background: 'var(--color-forest)', borderColor: 'var(--color-gold)' }}>
                {idx === 0 ? '👴' : '👨'}
              </div>
              <div>
                <p className="font-bold text-lg md:text-xl" style={{ color: 'var(--color-forest-dark)', fontFamily: 'var(--font-display)' }}>
                  {p.name}
                </p>
                <p className="text-xs mt-1 font-medium" style={{ color: 'var(--color-leaf)' }}>{p.role}</p>
              </div>
              <a href={`tel:+91${p.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 w-full justify-center"
                style={{ background: 'var(--color-forest)', color: 'white' }}>
                <PhoneIcon /> {p.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-cream-dark)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <SectionHeader label={t.faqLabel} heading={t.faqHeading} />
          <div className="flex flex-col gap-3">
            {t.faqs.map((faq, i) => (
              <div key={i}
                className="rounded-xl border overflow-hidden"
                style={{
                  borderColor: openFaq === i ? 'var(--color-gold)' : 'rgba(201,150,10,0.2)',
                  background: 'white',
                  boxShadow: openFaq === i ? '0 4px 20px rgba(201,150,10,0.12)' : 'none',
                  transition: 'box-shadow 0.2s, border-color 0.2s'
                }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:py-5 text-left font-semibold text-sm sm:text-base"
                  style={{ color: 'var(--color-forest-dark)' }}>
                  {faq.q}
                  <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}>
                    <ChevronDown open={openFaq === i} />
                  </span>
                </button>
                {openFaq === i && (
                  <div id={`faq-answer-${i}`} className="px-5 pb-5 text-sm leading-relaxed text-gray-600 border-t"
                    style={{ borderColor: 'rgba(201,150,10,0.15)' }}>
                    <div className="pt-3">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════ */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeader label={t.contactLabel} heading={t.contactHeading} />
        <p className="text-center text-sm sm:text-base text-gray-500 -mt-8 mb-10">{t.contactSub}</p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">

          {/* Info card */}
          <div className="rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
            style={{ background: 'var(--color-forest-dark)', border: '1px solid rgba(201,150,10,0.3)' }}>
            {[
              { icon: '📍', label: t.addressLabel, content: t.fullAddress },
              { icon: '🕐', label: t.hoursLabel, content: t.fullHours },
            ].map(row => (
              <div key={row.label} className="flex gap-4">
                <span className="text-2xl mt-0.5 shrink-0">{row.icon}</span>
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-1.5" style={{ color: 'var(--color-gold)' }}>
                    {row.label}
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">{row.content}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <span className="text-2xl mt-0.5 shrink-0">📞</span>
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--color-gold)' }}>
                  {t.phoneLabel}
                </p>
                <div className="flex flex-col gap-1.5">
                  {phones.map(ph => (
                    <a key={ph} href={`tel:+91${ph.replace(/\s/g, '')}`}
                      className="text-sm font-semibold hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--color-gold-light)' }}>
                      +91 {ph}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a href={`tel:+91${primaryPhone}`}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm active:scale-95 transition-transform"
                style={{ background: 'var(--color-forest-light)', color: 'white' }}>
                <PhoneIcon /> {t.callBtn}
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm active:scale-95 transition-transform"
                style={{ background: '#25d366', color: 'white' }}>
                <WAIcon /> {t.whatsappBtn}
              </a>
            </div>
          </div>

          {/* Directions card */}
          <div className="rounded-2xl overflow-hidden relative border"
            style={{ minHeight: '320px', borderColor: 'rgba(201,150,10,0.3)' }}>
            <img src={centrePhoto} alt="Centre location"
              className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(8,22,14,0.72)' }} />
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-5 p-8 text-center">
              <div>
                <p className="text-white/60 text-xs mb-1 uppercase tracking-wider">
                  {lang === 'ta' ? 'எங்கள் இருப்பிடம்' : 'Our Location'}
                </p>
                <p className="font-bold text-xl text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  {lang === 'ta' ? 'சின்னசேலம், சேலம்' : 'Chinnasalem, Salem'}
                </p>
                <p className="text-white/65 text-sm mt-1">{t.fullAddress}</p>
              </div>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 py-3.5 px-8 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-transform"
                style={{ background: 'var(--color-gold)', color: 'var(--color-bark)' }}>
                <PinIcon /> {t.directionsBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DISCLAIMER
      ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-xl px-5 py-4 text-xs sm:text-sm text-center border"
          style={{ background: 'rgba(201,150,10,0.07)', borderColor: 'rgba(201,150,10,0.2)', color: '#6b5b2e' }}>
          ⚠️ {t.disclaimer}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer style={{ background: 'var(--color-forest-dark)' }}
        className="pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-14 h-14 rounded-full object-cover border-2"
                  style={{ borderColor: 'var(--color-gold)' }} />
                <div>
                  <p className="font-bold text-base" style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-display)' }}>
                    {lang === 'ta' ? 'குப்புசாமி கவுண்டர்' : 'Kuppusamy Goundar'}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5">
                    {lang === 'ta' ? 'ஜாண்டீஸ் சிகிச்சை மையம்' : 'Jaundice Treatment Centre'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/55 leading-relaxed">{t.footerDesc}</p>
            </div>

            {/* Nav links */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--color-gold)' }}>
                {t.quickLinks}
              </p>
              <div className="flex flex-col gap-2.5">
                {t.nav.map((item, i) => (
                  <button key={item} onClick={() => scrollTo(t.navIds[i])}
                    className="text-left text-sm text-white/55 hover:text-white/90 transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--color-gold)' }}>
                {t.phoneLabel}
              </p>
              <div className="flex flex-col gap-2 mb-4">
                {phones.map(ph => (
                  <a key={ph} href={`tel:+91${ph.replace(/\s/g, '')}`}
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-gold-light)' }}>
                    +91 {ph}
                  </a>
                ))}
              </div>
              <p className="text-xs text-white/45 leading-relaxed">{t.fullAddress}</p>
              <p className="text-xs text-white/40 mt-1">{t.fullHours}</p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <p className="text-[11px] text-white/35 text-center">{t.copyright}</p>
            <div className="flex items-center gap-4">
              {langOptions.map(opt => (
                <button key={opt.code} onClick={() => setLang(opt.code)}
                  className="text-xs transition-colors font-medium"
                  style={{ color: lang === opt.code ? 'var(--color-gold-light)' : 'rgba(255,255,255,0.3)' }}>
                  {opt.native}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════
          MOBILE STICKY BOTTOM BAR  (hidden on md+)
      ═══════════════════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t grid grid-cols-4"
        style={{ background: 'var(--color-forest-dark)', borderColor: 'rgba(201,150,10,0.4)' }}>
        <a href={`tel:+91${primaryPhone}`}
          className="flex flex-col items-center justify-center py-2.5 gap-0.5 active:bg-white/10 transition-colors">
          <span className="text-xl">📞</span>
          <span className="text-[10px] font-semibold" style={{ color: 'var(--color-gold-light)' }}>{t.callBtn}</span>
        </a>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 gap-0.5 active:bg-white/10 transition-colors">
          <span className="text-xl">💬</span>
          <span className="text-[10px] font-semibold" style={{ color: 'var(--color-gold-light)' }}>{t.whatsappBtn}</span>
        </a>
        <a href={mapsLink} target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 gap-0.5 active:bg-white/10 transition-colors">
          <span className="text-xl">🗺️</span>
          <span className="text-[10px] font-semibold" style={{ color: 'var(--color-gold-light)' }}>{t.directionsBtn}</span>
        </a>
        <button onClick={() => scrollTo('contact')}
          className="flex flex-col items-center justify-center py-2.5 gap-0.5 active:bg-white/10 transition-colors">
          <span className="text-xl">✉️</span>
          <span className="text-[10px] font-semibold" style={{ color: 'var(--color-gold-light)' }}>{t.enquireBtn}</span>
        </button>
      </div>

    </div>
  )
}
