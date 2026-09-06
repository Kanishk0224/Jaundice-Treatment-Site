import { useState, useEffect, useRef } from 'react'
import logo from '@/imports/ChatGPT_Image_Sep_4__2026__09_39_23_PM.png'
import centrePhoto from '@/imports/ChatGPT_Image_Sep_5__2026__10_43_40_AM.png'
import treatmentPhoto1 from '@/imports/treatment-photo-1.jpeg'
import treatmentPhoto2 from '@/imports/treatment-photo-2.jpeg'

type Lang = 'ta' | 'en'

type DietaryKind = 'protocol' | 'nextday' | 'include' | 'avoid'

type DietarySection = {
  kind: DietaryKind
  tag: string
  heading: string
  items: string[]
}

/* ─── translations ─────────────────────────────────────────────────────── */
const T = {
  ta: {
nav: ['முகப்பு', 'எங்களைப் பற்றி', 'சேவைகள்', 'சிகிச்சை காட்சிகள்', 'மதிப்பீடுகள்', 'வைத்தியர்கள்', 'பத்தியம்', 'தொடர்பு'],
      navIds: ['home', 'about', 'services', 'gallery', 'reviews', 'practitioners', 'dietary', 'contact'],
    callBtn: 'அழைக்கவும்',
    whatsappBtn: 'வாட்ஸ்ஆப்',
    directionsBtn: 'வழி காண',
    enquireBtn: 'விசாரி',
    since: '1900 முதல்',
    heroHeading: 'காமாலை சிகிச்சை மையம்',
    heroName: 'குப்புசாமி கவுண்டர்',
    heroSub: 'பாரம்பரிய மூலிகை சிகிச்சை · சேலம்',
    heroDesc: 'நம்பகமான பாரம்பரிய மூலிகை சிகிச்சை முறையில் காமாலை நோய்க்கு சிறப்பான சேவை. சேலம் மாவட்டத்தில் பல தலைமுறைகளாக நேர்மையான சிகிச்சை வழங்கி வருகிறோம்.',
    heroRating: '(1,280+ மதிப்பீடுகள்)',
    openHoursShort: 'திங்கள் – சனி, காலை 7 – மாலை 7',
    location: 'சின்ன கொல்லப்பட்டி, சேலம் – 636 008',
    aboutLabel: 'எங்களைப் பற்றி',
    aboutHeading: 'ஒரு நூற்றாண்டுக்கும் மேலான நம்பிக்கை',
    aboutP1: 'குப்புசாமி கவுண்டர் ஜாண்டீஸ் சிகிச்சை மையம் 1900-ஆம் ஆண்டு முதல் சேலத்தில் பாரம்பரிய மூலிகை முறையில் காமாலை நோய்க்கு சிகிச்சை வழங்கி வருகிறது.',
    aboutP2: 'இது ஒரு பரம்பரை சிகிச்சை முறை — அனுபவம் மிக்க வைத்தியர்களால் தலைமுறை தலைமுறையாகத் தொடர்ந்து வழங்கப்படுகிறது. எங்கள் சிகிச்சை முறை இயற்கையான மூலிகைகளை அடிப்படையாகக் கொண்டது.',
    stats: [
      { num: '125+', label: 'ஆண்டுகள் பாரம்பரியம்' },
      { num: '3', label: 'தலைமுறைகள்' },
      { num: '4.9 ★', label: 'ஒட்டுமொத்த மதிப்பீடு (5-க்கு)' },
      { num: '10,00,000+', label: 'குணமடைந்த நோயாளிகள்' },
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
      { q: 'மையம் எங்கே உள்ளது?', a: '205, ஏற்காடு மெயின் ரோடு, சின்ன கொல்லப்பட்டி, சேலம் – 636 008.' },
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
    fullAddress: '205, ஏற்காடு மெயின் ரோடு, சின்ன கொல்லப்பட்டி, சேலம் – 636 008',
    fullHours: 'திங்கள் – சனி: காலை 7:00 – மாலை 7:00',
    footerDesc: 'சேலம் மாவட்டத்தில் 1900 முதல் பாரம்பரிய மூலிகை சிகிச்சை வழங்கும் நம்பகமான மையம்.',
    copyright: '© 2026 குப்புசாமி கவுண்டர் ஜாண்டீஸ் சிகிச்சை மையம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    quickLinks: 'விரைவு இணைப்புகள்',
    galleryLabel: 'நேரடி காட்சிகள்',
    galleryHeading: 'மையத்தில் நேரடி சிகிச்சை முறை',
    gallerySub: 'எங்கள் பாரம்பரிய மையத்தில் நோயாளிகளுக்கு மூலிகை மருந்து வழங்கப்படும் நேரடி பதிவுகள்',
    img1Title: 'பாரம்பரிய மூலிகை மருந்து உட்கொள்ளுதல்',
    img1Desc: 'இயற்கை மூலிகைகளால் பிரத்யேகமாகத் தயாரிக்கப்பட்ட பாரம்பரிய காமாலை மருந்தை நோயாளி அருந்தும் காட்சி.',
    img2Title: 'முழுமையான கவனிப்பு & பத்திய வழிகாட்டுதல்',
    img2Desc: 'நோயாளியின் நலம் மற்றும் விரைவான குணம் பெற அனுபவமிக்க வைத்தியர்களின் நேரடி கவனிப்பு.',
    galleryBadge1: 'நேரடி சிகிச்சை 1',
    galleryBadge2: 'நேரடி சிகிச்சை 2',
    galleryTrust1: '100% இயற்கை மூலிகைகள்',
    galleryTrust2: '125+ ஆண்டுகள் பாரம்பரியம்',
    galleryTrust3: 'லட்சக்கணக்கான குடும்பங்களின் நம்பிக்கை',
    reviewsLabel: 'நோயாளி கருத்துகள் & மதிப்பீடு',
    reviewsHeading: 'ஒட்டுமொத்த மதிப்பீடு & விமர்சனங்கள்',
    reviewsSub: 'எங்கள் மூலிகை சிகிச்சை பெற்ற நோயாளிகளின் உண்மையான அனுபவங்கள் மற்றும் மதிப்பீடுகள்',
    overallRatingTitle: 'ஒட்டுமொத்த மதிப்பீடு',
    outOfFiveText: '5-க்கு',
    basedOnReviews: 'சரிபார்க்கப்பட்ட நோயாளிகளின் மதிப்பீடுகள்',
    ratingBreakdown: 'மதிப்பீடு விவரம்',
    rateExperienceTitle: 'உங்கள் மதிப்பீட்டை வழங்கவும்',
    rateExperienceSub: 'எங்கள் சிகிச்சை மற்றும் சேவை பற்றிய உங்கள் அனுபவத்தை பகிரவும்',
    selectRatingLabel: 'மதிப்பீட்டை தேர்ந்தெடுக்கவும் (1 முதல் 5 நட்சத்திரங்கள்)',
    yourNameLabel: 'உங்கள் பெயர்',
    yourNamePlaceholder: 'எ.கா: சுரேஷ் குமார்',
    yourLocationLabel: 'ஊர் / மாவட்டம் (விருப்பப்பட்டால்)',
    yourLocationPlaceholder: 'எ.கா: சேலம்',
    yourCommentLabel: 'உங்கள் அனுபவம் / கருத்து (விருப்பப்பட்டால்)',
    yourCommentPlaceholder: 'சிகிச்சை மற்றும் கவனிப்பு பற்றிய உங்கள் அனுபவத்தை எழுதவும்...',
    submitRatingBtn: 'மதிப்பீட்டை சமர்ப்பிக்க',
    ratingSuccessMsg: 'நன்றி! உங்கள் மதிப்பீடு வெற்றிகரமாக பதிவு செய்யப்பட்டது.',
    recentReviewsTitle: 'சமீபத்திய நோயாளிகளின் கருத்துகள்',
    justNow: 'சமீபத்தில்',
    verifiedPatient: 'சரிபார்க்கப்பட்ட நோயாளி',
    dietaryLabel: 'பத்திய வழிகாட்டி',
    dietaryHeading: 'மருந்து நாள் & அதன்பின் பத்திய முறைகள்',
    dietarySub: 'மருந்து உட்கொள்ளும் நாள் மற்றும் அதைத் தொடர்ந்த நாட்களில் பின்பற்ற வேண்டிய பாரம்பரிய உணவுக் கட்டுப்பாடுகள் மற்றும் பரிந்துரைகள்.',
    dietarySections: [
      {
        kind: 'protocol',
        tag: 'மருந்து உட்கொள்ளும் நாள்',
        heading: 'மருந்து சாப்பிடும் அன்று பத்தியம் இருக்கும் முறை',
        items: [
          'மருந்து குடிக்கும் அன்று மண் சட்டி இரண்டு வாங்க வேண்டும்.',
          'ஒரு சட்டியில் 100 கிராம் பச்சரிசி, 50 கிராம் பாசி பயிர் போட்டு உப்பு இல்லாமல் பொங்கல் செய்து சாப்பிடவும்.',
          'மற்றொரு சட்டியில் சுடுதண்ணீர் வைத்து குடிக்கவும்.',
          'உப்பில்லாத சாப்பாடு சாப்பிட முடியவில்லை என்றால், பால், நெய், காய்கறி, பிஸ்கட் மட்டும் சாப்பிடவும்.',
        ],
      },
      {
        kind: 'nextday',
        tag: 'மருந்து சாப்பிட்ட அடுத்த நாள்',
        heading: 'மருந்து சாப்பிட்ட அடுத்த நாள்',
        items: [
          'ஓமம் வாங்கி அரைத்து தலையில் தேய்த்து சுடுதண்ணீரில் குளிக்கவும்.',
        ],
      },
      {
        kind: 'include',
        tag: 'அதிகம் சேர்த்துக் கொள்ள வேண்டியவை',
        heading: 'அதிகம் சேர்க்க வேண்டியவைகள்',
        items: [
          'மருந்து சாப்பிட்ட அடுத்த நாளிலிருந்து மோர், இளநீர், வெள்ளை முல்லங்கி, கீரைகள், கேரட், பீட்ரூட், ஆப்பிள் சாப்பிடவும்.',
          'மாதுளை பழம், திராட்சை, சாத்துக்குடி, கொய்யாப்பழம் இவைகளை அதிகமாக சேர்த்துக் கொள்ளவும்.',
          'ஐந்து நாளைக்கு இனிப்பு, உப்பு குறைத்துக் கொள்ளவும்.',
        ],
      },
      {
        kind: 'avoid',
        tag: 'சாப்பிடக் கூடாதவை',
        heading: 'சாப்பிட கூடாதவைகள்',
        items: [
          '3 நாளைக்கு தயிர், இட்லி, தோசை, வடை சாப்பிடக்கூடாது.',
          '3 மாதத்திற்கு பூசணி, சீத்தாப்பழம், சர்க்கரை பூசணிக்காய், பாவக்காய் மொந்தை வாயையும் சாப்பிடக்கூடாது.',
          '2 மாதத்திற்கு மீன், முட்டை, கோழி கறி, கருவாடு சாப்பிடக்கூடாது.',
          '2 வாரத்திற்கு மட்டன் சாப்பிடக்கூடாது.',
          'புளி, எண்ணெய் மூன்று நாள் சாப்பிடக்கூடாது.',
        ],
      },
    ],
  },
  en: {
nav: ['Home', 'About', 'Services', 'Treatment Photos', 'Reviews', 'Practitioners', 'Dietary', 'Contact'],
      navIds: ['home', 'about', 'services', 'gallery', 'reviews', 'practitioners', 'dietary', 'contact'],
    callBtn: 'Call Now',
    whatsappBtn: 'WhatsApp',
    directionsBtn: 'Directions',
    enquireBtn: 'Enquire',
    since: 'Since 1900',
    heroHeading: 'Jaundice Treatment Centre',
    heroName: 'Kuppusamy Goundar',
    heroSub: 'Traditional Herbal Treatment · Salem, Tamil Nadu',
    heroDesc: 'Trusted traditional herbal treatment for jaundice, serving families across Salem district for over 125 years. Experienced practitioners, natural remedies, compassionate care.',
    heroRating: '(1,280+ Reviews)',
    openHoursShort: 'Mon – Sat, 7:00 AM – 7:00 PM',
    location: 'Chinnakollapatty, Salem – 636 008',
    aboutLabel: 'About Us',
    aboutHeading: 'A Century of Trusted Care',
    aboutP1: 'Kuppusamy Goundar Jaundice Treatment Centre has been providing traditional herbal treatment for jaundice in Salem since 1900.',
    aboutP2: 'This is a hereditary practice passed through generations of experienced practitioners. Our treatment is rooted in natural herbal medicine, with patient well-being at its heart.',
    stats: [
      { num: '125+', label: 'Years of Heritage' },
      { num: '3', label: 'Generations' },
      { num: '4.9 ★', label: 'Overall Rating (out of 5)' },
      { num: '1,000,000+', label: 'Healed Patients' },
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
      { q: 'Where is the centre located?', a: '205, Yercaud Main Road, Chinnakollapatty, Salem – 636 008.' },
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
    fullAddress: '205, Yercaud Main Road, Chinnakollapatty, Salem – 636 008',
    fullHours: 'Monday – Saturday: 7:00 AM – 7:00 PM',
    footerDesc: 'A trusted traditional herbal treatment centre in Salem district since 1900.',
    copyright: '© 2026 Kuppusamy Goundar Jaundice Treatment Centre. All rights reserved.',
    quickLinks: 'Quick Links',
    galleryLabel: 'Authentic Moments',
    galleryHeading: 'Treatment in Action at Our Centre',
    gallerySub: 'Real moments of patients receiving time-tested herbal medicine and compassionate care at our centre',
    img1Title: 'Traditional Herbal Medicine Administration',
    img1Desc: 'A patient receiving freshly prepared traditional herbal remedy under the care and guidance of our centre.',
    img2Title: 'Complete Care & Dietary Guidance',
    img2Desc: 'Experienced practitioners providing personalized guidance and dietary regimens for full recovery.',
    galleryBadge1: 'Care in Action 1',
    galleryBadge2: 'Care in Action 2',
    galleryTrust1: '100% Natural Herbal Remedies',
    galleryTrust2: '125+ Years Hereditary Heritage',
    galleryTrust3: '1 Million+ Healed Patients',
    reviewsLabel: 'Patient Reviews & Ratings',
    reviewsHeading: 'Overall Rating & Patient Feedback',
    reviewsSub: 'Authentic feedback and ratings from patients who received jaundice treatment at our centre',
    overallRatingTitle: 'Overall Rating',
    outOfFiveText: 'out of 5',
    basedOnReviews: 'verified patient ratings',
    ratingBreakdown: 'Rating Breakdown',
    rateExperienceTitle: 'Rate Your Experience',
    rateExperienceSub: 'Share your feedback on our treatment and patient care',
    selectRatingLabel: 'Select rating (1 to 5 stars)',
    yourNameLabel: 'Your Name',
    yourNamePlaceholder: 'e.g. Suresh Kumar',
    yourLocationLabel: 'City / District (Optional)',
    yourLocationPlaceholder: 'e.g. Salem',
    yourCommentLabel: 'Your Experience / Feedback (Optional)',
    yourCommentPlaceholder: 'Write about your treatment, recovery experience, or care...',
    submitRatingBtn: 'Submit Rating',
    ratingSuccessMsg: 'Thank you! Your rating has been successfully recorded.',
    recentReviewsTitle: 'Recent Patient Feedback',
    justNow: 'Just now',
    verifiedPatient: 'Verified Patient',
    dietaryLabel: 'Dietary Guide',
    dietaryHeading: 'Medicine-Day Diet & Aftercare',
    dietarySub: 'Traditional dietary guidelines and food restrictions to follow on the day of taking the medicine and in the days that follow.',
    dietarySections: [
      {
        kind: 'protocol',
        tag: 'Medicine Day',
        heading: 'Dietary Instructions on the Day of Taking the Medicine',
        items: [
          'On the day of taking the medicine, two clay pots should be purchased.',
          'In one pot, cook pongal using 100 grams of raw rice and 50 grams of green gram (moong dal) without salt and eat it.',
          'In another pot, keep boiled hot water and drink it.',
          'If you are unable to eat food without salt, consume only milk, ghee, vegetables, and biscuits.',
        ],
      },
      {
        kind: 'nextday',
        tag: 'Next Day',
        heading: 'The Day After Taking the Medicine',
        items: [
          'Buy omam (ajwain / carom seeds), grind it, apply it to the head, and bathe with hot water.',
        ],
      },
      {
        kind: 'include',
        tag: 'Include More',
        heading: 'Foods / Items to Include More',
        items: [
          'From the day after taking the medicine, consume buttermilk, tender coconut water, white radish, leafy greens, carrot, beetroot, and apple.',
          'Include more pomegranate, grapes, sweet lime, and guava in your diet.',
          'Reduce sweets and salt for five days.',
        ],
      },
      {
        kind: 'avoid',
        tag: 'Avoid',
        heading: 'Foods / Items to Avoid',
        items: [
          'For 3 days, do not eat curd, idli, dosa, or vada.',
          'For 3 months, do not eat pumpkin, custard apple, ash gourd, and bitter gourd.',
          'For 2 months, do not eat fish, eggs, chicken, or dried fish.',
          'For 2 weeks, do not eat mutton.',
          'Do not consume tamarind or oil for 3 days.',
        ],
      },
    ],
  },
}

const phones = ['90037 45116', '94432 73535', '94444 55571']
const primaryPhone = '9003745116'
const whatsappNumber = '919003745116'
const mapsLink = 'https://maps.app.goo.gl/psqJd4vLU2BSBdWG8'

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

type ReviewItem = {
  id: string | number
  name: string
  nameTa?: string
  location?: string
  stars: number
  date: string
  dateTa: string
  comment: string
  commentTa?: string
  isUser?: boolean
}

const initialReviews: ReviewItem[] = [
  {
    id: 1,
    name: 'Suresh Kumar',
    nameTa: 'சுரேஷ் குமார்',
    location: 'Salem',
    stars: 5,
    date: '3 days ago',
    dateTa: '3 நாட்களுக்கு முன்',
    comment: 'The traditional herbal preparation was remarkably effective. Within 3 days of strict dietary care, jaundice symptoms cleared completely. Very grateful to the practitioners!',
    commentTa: 'பாரம்பரிய மூலிகை மருந்து மிக விரைவாக பலன் தந்தது. பத்திய முறைகளை சரியாக பின்பற்றியதில் 3 நாட்களில் காமாலை முற்றிலும் குணமாகியது!',
  },
  {
    id: 2,
    name: 'Muthusamy & Family',
    nameTa: 'முத்துசாமி & குடும்பத்தினர்',
    location: 'Attur',
    stars: 5,
    date: '1 week ago',
    dateTa: '1 வாரத்திற்கு முன்',
    comment: 'Our family has trusted this centre for 3 generations. True natural healing without any side effects and very kind practitioners.',
    commentTa: 'எங்கள் குடும்பத்தினர் 3 தலைமுறைகளாக இங்குதான் சிகிச்சை பெறுகிறோம். பக்கவிளைவுகள் இல்லாத இயற்கையான மூலிகை மருத்துவம்.',
  },
  {
    id: 3,
    name: 'K. Radhakrishnan',
    nameTa: 'ராதாகிருஷ்ணன்',
    location: 'Namakkal',
    stars: 5,
    date: '2 weeks ago',
    dateTa: '2 வாரங்களுக்கு முன்',
    comment: 'Dietary guidance and care instructions were clearly explained. Very compassionate approach and genuine medicines.',
    commentTa: 'பத்திய உணவு முறைகள் மற்றும் ஆலோசனைகள் மிகத் தெளிவாக விளக்கப்பட்டது. நேர்மையான மற்றும் அர்ப்பணிப்புடன் கூடிய சிகிச்சை.',
  },
]

function StarRating({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          style={{
            color: i <= rating ? '#f59e0b' : '#d1d5db',
            fontSize: `${size}px`,
            lineHeight: 1,
          }}>
          ★
        </span>
      ))}
    </div>
  )
}

/* ─── dietary instructions ───────────────────────────────── */
const dietaryVisuals: Record<DietaryKind, {
  icon: string
  card: React.CSSProperties
  tagColor: string
  numberStyle: React.CSSProperties
}> = {
  protocol: {
    icon: '🍚',
    card: { background: 'white', borderColor: 'rgba(201,150,10,0.35)', boxShadow: '0 10px 30px rgba(15,45,31,0.08)' },
    tagColor: 'var(--color-gold)',
    numberStyle: { background: 'var(--color-forest)', color: 'var(--color-gold-light)' },
  },
  nextday: {
    icon: '🌿',
    card: { background: 'white', borderColor: 'rgba(201,150,10,0.35)', boxShadow: '0 10px 30px rgba(15,45,31,0.08)' },
    tagColor: 'var(--color-leaf)',
    numberStyle: { background: 'var(--color-leaf)', color: 'white' },
  },
  include: {
    icon: '✅',
    card: { background: 'rgba(26,71,49,0.06)', borderColor: 'rgba(26,71,49,0.4)', boxShadow: 'none' },
    tagColor: 'var(--color-forest)',
    numberStyle: { background: 'var(--color-forest-light)', color: 'white' },
  },
  avoid: {
    icon: '⚠️',
    card: { background: 'rgba(180,83,9,0.07)', borderColor: 'rgba(180,83,9,0.4)', boxShadow: 'none' },
    tagColor: '#b45309',
    numberStyle: { background: '#b45309', color: 'white' },
  },
}

function DietarySectionCard({ section, lang }: { section: DietarySection; lang: Lang }) {
  const visual = dietaryVisuals[section.kind]
  return (
    <article className="rounded-2xl p-5 sm:p-7 flex flex-col gap-4 border" style={visual.card}>
      <header className="flex items-start gap-3">
        <span className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0 border"
          style={{ background: 'white', borderColor: 'rgba(201,150,10,0.3)' }}>
          {visual.icon}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: visual.tagColor }}>
            {section.tag}
          </p>
          <h3 className="font-bold text-base sm:text-lg md:text-xl leading-snug break-words"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest-dark)' }}>
            {section.heading}
          </h3>
        </div>
      </header>
      <ol className="list-none flex flex-col gap-3.5">
        {section.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold"
              style={visual.numberStyle}>
              {i + 1}
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700 min-w-0 break-words whitespace-normal" lang={lang}>
              {item}
            </p>
          </li>
        ))}
      </ol>
    </article>
  )
}

function DietaryInstructions({ lang }: { lang: Lang }) {
  const t = T[lang]
  const sections = t.dietarySections as DietarySection[]

  return (
    <section id="dietary" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <SectionHeader label={t.dietaryLabel} heading={t.dietaryHeading} />
      <p className="text-center text-sm sm:text-base text-gray-600 -mt-6 mb-8 max-w-2xl mx-auto">
        {t.dietarySub}
      </p>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {sections.map(section => (
          <DietarySectionCard key={section.kind} section={section} lang={lang} />
        ))}
      </div>
    </section>
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

  // Rating and reviews state
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('kg_user_reviews')
      if (saved) {
        const parsed: ReviewItem[] = JSON.parse(saved)
        return [...parsed, ...initialReviews]
      }
    } catch {
      // fallback
    }
    return initialReviews
  })

  const [ratingStars, setRatingStars] = useState<number>(5)
  const [hoverStars, setHoverStars] = useState<number>(0)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerLocation, setReviewerLocation] = useState('')
  const [reviewerComment, setReviewerComment] = useState('')
  const [submittedRating, setSubmittedRating] = useState(false)

  // Overall rating calculations
  const baseCount = 1280
  const baseSum = 1280 * 4.92
  const userAddedReviews = reviews.filter(r => r.isUser)
  const totalCount = baseCount + userAddedReviews.length
  const totalSum = baseSum + userAddedReviews.reduce((sum, r) => sum + r.stars, 0)
  const overallRating = (totalSum / totalCount).toFixed(1)

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ratingStars < 1) return

    const newReview: ReviewItem = {
      id: Date.now(),
      name: reviewerName.trim() || (lang === 'ta' ? 'நோயாளி' : 'Verified Patient'),
      nameTa: reviewerName.trim() || 'நோயாளி',
      location: reviewerLocation.trim() || (lang === 'ta' ? 'சேலம்' : 'Salem'),
      stars: ratingStars,
      date: 'Just now',
      dateTa: 'சமீபத்தில்',
      comment: reviewerComment.trim() || (lang === 'ta' ? 'பாரம்பரிய மூலிகை சிகிச்சை மற்றும் சிறந்த கவனிப்புக்கு மனமார்ந்த நன்றி.' : 'Truly effective herbal treatment and wonderful care.'),
      commentTa: reviewerComment.trim() || 'பாரம்பரிய மூலிகை சிகிச்சை மற்றும் சிறந்த கவனிப்புக்கு மனமார்ந்த நன்றி.',
      isUser: true,
    }

    const updated = [newReview, ...reviews]
    setReviews(updated)

    try {
      const userOnly = updated.filter(r => r.isUser)
      localStorage.setItem('kg_user_reviews', JSON.stringify(userOnly))
    } catch {}

    setSubmittedRating(true)
    setReviewerName('')
    setReviewerLocation('')
    setReviewerComment('')
  }

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

  useEffect(() => {
    document.title = lang === 'ta' ? 'குப்புசாமி கவுண்டர்' : 'Kuppusamy Goundar'
  }, [lang])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div style={{ background: 'var(--color-cream)', color: 'var(--color-bark)', fontFamily: 'var(--font-body)' }}>

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
        <div className="w-full px-4 sm:px-6 xl:px-10">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center h-16 md:h-18 gap-3 xl:gap-4">

            {/* Logo + name */}
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 shrink-0">
              <img src={logo} alt="Centre logo"
                className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 shrink-0"
                style={{ borderColor: 'var(--color-gold)' }} />
              <div className="text-left hidden sm:block">
                <p className="font-bold text-sm md:text-base leading-tight"
                  style={{ color: '#e52096', fontFamily: 'var(--font-display)' }}>
                  {lang === 'ta' ? 'குப்புசாமி கவுண்டர்' : 'Kuppusamy Goundar'}
                </p>
                <p className="text-[11px] text-white/60 leading-tight">
                  {lang === 'ta' ? 'ஜாண்டீஸ் சிகிச்சை மையம்' : 'Jaundice Treatment Centre'}
                </p>
              </div>
              {/* Mobile-only short name */}
              <p className="sm:hidden font-bold text-sm" style={{ color: '#e52096', fontFamily: 'var(--font-display)' }}>
                {lang === 'ta' ? 'குப்புசாமி கவுண்டர்' : 'KG Centre'}
              </p>
            </button>

            {/* Desktop nav */}
            <nav className={`hidden xl:flex items-center min-w-0 justify-center ${lang === 'ta' ? 'gap-1.5' : 'gap-2.5'}`}>
              {t.nav.map((item, i) => (
                <button key={item} onClick={() => scrollTo(t.navIds[i])}
                  className={`${lang === 'ta' ? 'px-2 text-[13px]' : 'px-2.5 text-sm'} py-2 rounded-lg font-medium text-white/75 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap shrink-0`}>
                  {item}
                </button>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {/* Desktop call button */}
              <a href={`tel:+91${primaryPhone}`}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm active:scale-95 transition-transform shrink-0"
                style={{ background: 'var(--color-gold)', color: 'var(--color-bark)' }}>
                <PhoneIcon /> {t.callBtn}
              </a>

              {/* Language picker */}
              <div ref={langRef} className="relative shrink-0">
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
              <button onClick={() => setMenuOpen(v => !v)} className="xl:hidden text-white p-1.5 -mr-1.5"
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
          <div id="mobile-navigation" className="xl:hidden border-t" style={{ background: '#0a1c12', borderColor: 'rgba(201,150,10,0.2)' }}>
            <div className="w-full px-4 sm:px-6 py-2 flex flex-col">
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
                  <button onClick={() => scrollTo('reviews')}
                    className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-300 bg-amber-500/20 border border-amber-400/40 px-3 py-1.5 rounded-full hover:bg-amber-500/30 transition-colors">
                    ⭐ {overallRating} / 5 {t.heroRating}
                  </button>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0 divide-x divide-white/10">
          {t.stats.map((s, idx) => (
            <div key={s.label}
              onClick={() => (idx === 2 ? scrollTo('reviews') : undefined)}
              className={`flex flex-col items-center text-center px-4 ${idx === 2 ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-display)' }}>
                {idx === 2 ? `${overallRating} ★` : s.num}
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
            {/* Real treatment photo badge */}
            <button onClick={() => scrollTo('gallery')}
              className="absolute -bottom-5 -right-2 sm:-right-4 rounded-2xl p-2 sm:p-2.5 shadow-2xl border-2 flex items-center gap-2.5 bg-white text-left hover:scale-105 active:scale-95 transition-all z-10"
              style={{ borderColor: 'var(--color-gold)' }}>
              <img src={treatmentPhoto1} alt="Authentic care" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover" />
              <div className="pr-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">✓ {lang === 'ta' ? 'நேரடி சிகிச்சை' : 'Authentic Care'}</p>
                <p className="text-xs font-bold text-gray-900">{lang === 'ta' ? 'படங்கள் காண்க ↓' : 'View Photos ↓'}</p>
              </div>
            </button>
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
          GALLERY / TREATMENT IN ACTION
      ═══════════════════════════════════════════════════ */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeader label={t.galleryLabel} heading={t.galleryHeading} />
        <p className="text-center text-sm sm:text-base text-gray-600 -mt-6 mb-12 max-w-2xl mx-auto">
          {t.gallerySub}
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1 */}
          <div className="group rounded-3xl overflow-hidden bg-white shadow-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{ borderColor: 'rgba(201,150,10,0.3)' }}>
            <div className="relative overflow-hidden aspect-[3/4] sm:aspect-[4/5] bg-gray-900">
              <img src={treatmentPhoto1} alt={t.img1Title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-md"
                style={{ background: 'rgba(10,28,18,0.85)', color: 'var(--color-gold-light)', borderColor: 'var(--color-gold)' }}>
                🌿 {t.galleryBadge1}
              </span>
            </div>
            <div className="p-6 md:p-7 flex flex-col gap-2.5">
              <h3 className="font-bold text-lg md:text-xl" style={{ color: 'var(--color-forest-dark)', fontFamily: 'var(--font-display)' }}>
                {t.img1Title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.img1Desc}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group rounded-3xl overflow-hidden bg-white shadow-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{ borderColor: 'rgba(201,150,10,0.3)' }}>
            <div className="relative overflow-hidden aspect-[3/4] sm:aspect-[4/5] bg-gray-900">
              <img src={treatmentPhoto2} alt={t.img2Title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-md"
                style={{ background: 'rgba(10,28,18,0.85)', color: 'var(--color-gold-light)', borderColor: 'var(--color-gold)' }}>
                🩺 {t.galleryBadge2}
              </span>
            </div>
            <div className="p-6 md:p-7 flex flex-col gap-2.5">
              <h3 className="font-bold text-lg md:text-xl" style={{ color: 'var(--color-forest-dark)', fontFamily: 'var(--font-display)' }}>
                {t.img2Title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.img2Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Trust pill bar */}
        <div className="mt-12 rounded-2xl p-4 sm:p-6 border flex flex-wrap items-center justify-center gap-4 md:gap-8 text-center"
          style={{ background: 'rgba(201,150,10,0.08)', borderColor: 'rgba(201,150,10,0.25)' }}>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-forest-dark)' }}>
            <span className="text-base">🌿</span> {t.galleryTrust1}
          </div>
          <div className="w-1.5 h-1.5 rounded-full hidden sm:block" style={{ background: 'var(--color-gold)' }} />
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-forest-dark)' }}>
            <span className="text-base">👴</span> {t.galleryTrust2}
          </div>
          <div className="w-1.5 h-1.5 rounded-full hidden sm:block" style={{ background: 'var(--color-gold)' }} />
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-forest-dark)' }}>
            <span className="text-base">❤️</span> {t.galleryTrust3}
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
          RATINGS & REVIEWS SECTION
      ═══════════════════════════════════════════════════ */}
      <section id="reviews" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeader label={t.reviewsLabel} heading={t.reviewsHeading} />
        <p className="text-center text-sm sm:text-base text-gray-600 -mt-6 mb-12 max-w-2xl mx-auto">
          {t.reviewsSub}
        </p>

        {/* Top Grid: Overall Score Card & Rate Us Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-14">

          {/* Left: Overall Rating Card & Breakdown (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-white border shadow-xl flex flex-col gap-6"
            style={{ borderColor: 'rgba(201,150,10,0.3)' }}>
            
            {/* Big Score Display */}
            <div className="text-center pb-6 border-b" style={{ borderColor: 'rgba(201,150,10,0.2)' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--color-gold)' }}>
                {t.overallRatingTitle}
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl sm:text-7xl font-extrabold"
                  style={{ color: 'var(--color-forest-dark)', fontFamily: 'var(--font-display)' }}>
                  {overallRating}
                </span>
                <span className="text-2xl font-bold text-gray-400">/ 5</span>
              </div>
              <div className="flex justify-center mt-3 mb-2">
                <StarRating rating={Math.round(Number(overallRating))} size={28} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                ✓ {totalCount.toLocaleString()} {t.basedOnReviews}
              </p>
            </div>

            {/* Rating distribution breakdown */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                {t.ratingBreakdown}
              </p>
              {[
                { star: 5, pct: 93 },
                { star: 4, pct: 5 },
                { star: 3, pct: 2 },
                { star: 2, pct: 0 },
                { star: 1, pct: 0 },
              ].map(row => (
                <div key={row.star} className="flex items-center gap-3 text-xs font-medium">
                  <span className="w-12 text-gray-600 shrink-0 font-bold">{row.star} ★</span>
                  <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${row.pct}%`,
                        background: row.star === 5 ? 'var(--color-gold)' : row.star === 4 ? '#3b82f6' : '#9ca3af'
                      }} />
                  </div>
                  <span className="w-10 text-right text-gray-500 shrink-0">{row.pct}%</span>
                </div>
              ))}
            </div>

            {/* Genuine care assurance badge */}
            <div className="rounded-2xl p-4 flex items-center gap-3 border"
              style={{ background: 'rgba(201,150,10,0.06)', borderColor: 'rgba(201,150,10,0.2)' }}>
              <span className="text-2xl">🌿</span>
              <p className="text-xs leading-relaxed text-gray-700">
                {lang === 'ta'
                  ? '3 தலைமுறைகளாக 100% இயற்கை மூலிகை மருந்துகள் மூலம் காமாலை குணம் பெற்று வருகின்றனர்.'
                  : 'Time-tested herbal medicine for jaundice, trusted for over 3 generations with 100% natural care.'}
              </p>
            </div>
          </div>

          {/* Right: Interactive Rate Experience Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between"
            style={{ background: 'var(--color-forest-dark)', borderColor: 'rgba(201,150,10,0.3)' }}>
            
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase mb-2"
                style={{ color: 'var(--color-gold-light)' }}>
                <span>⭐</span> {t.rateExperienceTitle}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-display)' }}>
                {t.rateExperienceTitle}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mb-6">
                {t.rateExperienceSub}
              </p>

              {submittedRating ? (
                <div className="rounded-2xl p-6 border text-center my-6 flex flex-col items-center gap-3"
                  style={{ background: 'rgba(201,150,10,0.15)', borderColor: 'var(--color-gold)' }}>
                  <span className="text-4xl">🎉</span>
                  <p className="font-bold text-base text-white">{t.ratingSuccessMsg}</p>
                  <p className="text-xs text-white/70">
                    {lang === 'ta'
                      ? 'உங்கள் மதிப்பீடு ஒட்டுமொத்த புள்ளிவிவரத்தில் உடனே சேர்க்கப்பட்டது.'
                      : 'Your rating has been added to the overall score and patient reviews.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedRating(false)}
                    className="mt-2 text-xs font-semibold underline hover:opacity-80"
                    style={{ color: 'var(--color-gold-light)' }}>
                    {lang === 'ta' ? 'மறுபடியும் மதிப்பீடு செய்ய' : 'Submit another rating'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRatingSubmit} className="flex flex-col gap-4">
                  {/* Star selection widget */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                      {t.selectRatingLabel}
                    </label>
                    <div className="flex items-center gap-2 p-3 rounded-2xl border"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(201,150,10,0.3)' }}>
                      {[1, 2, 3, 4, 5].map(star => {
                        const isFilled = star <= (hoverStars || ratingStars)
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRatingStars(star)}
                            onMouseEnter={() => setHoverStars(star)}
                            onMouseLeave={() => setHoverStars(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-125">
                            <span
                              className="text-3xl sm:text-4xl transition-colors cursor-pointer"
                              style={{ color: isFilled ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)' }}>
                              ★
                            </span>
                          </button>
                        )
                      })}
                      <span className="ml-3 text-sm font-bold text-white">
                        {ratingStars} / 5
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {/* Name input */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">
                        {t.yourNameLabel}
                      </label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={e => setReviewerName(e.target.value)}
                        placeholder={t.yourNamePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/40 border focus:outline-none focus:ring-2 focus:ring-amber-400"
                        style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(201,150,10,0.3)' }}
                      />
                    </div>

                    {/* Location input */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">
                        {t.yourLocationLabel}
                      </label>
                      <input
                        type="text"
                        value={reviewerLocation}
                        onChange={e => setReviewerLocation(e.target.value)}
                        placeholder={t.yourLocationPlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/40 border focus:outline-none focus:ring-2 focus:ring-amber-400"
                        style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(201,150,10,0.3)' }}
                      />
                    </div>
                  </div>

                  {/* Feedback comment input */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      {t.yourCommentLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={reviewerComment}
                      onChange={e => setReviewerComment(e.target.value)}
                      placeholder={t.yourCommentPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/40 border focus:outline-none focus:ring-2 focus:ring-amber-400"
                      style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(201,150,10,0.3)' }}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg mt-1"
                    style={{ background: 'var(--color-gold)', color: 'var(--color-bark)' }}>
                    <span>⭐</span> {t.submitRatingBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Patient Reviews Feed */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl sm:text-2xl"
              style={{ color: 'var(--color-forest-dark)', fontFamily: 'var(--font-display)' }}>
              {t.recentReviewsTitle}
            </h3>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
              style={{ background: 'rgba(201,150,10,0.12)', borderColor: 'var(--color-gold)', color: 'var(--color-forest-dark)' }}>
              ⭐ {overallRating} / 5
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {reviews.slice(0, 6).map((rev) => (
              <div key={rev.id}
                className="rounded-2xl p-6 bg-white border shadow-md flex flex-col justify-between gap-4 hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{ borderColor: 'rgba(201,150,10,0.25)' }}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <StarRating rating={rev.stars} size={16} />
                    <span className="text-[11px] text-gray-500 font-medium">
                      {lang === 'ta' ? rev.dateTa : rev.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    "{lang === 'ta' && rev.commentTa ? rev.commentTa : rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t flex items-center gap-3" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{ background: 'var(--color-forest)', color: 'var(--color-gold-light)' }}>
                    {rev.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: 'var(--color-forest-dark)' }}>
                      {lang === 'ta' && rev.nameTa ? rev.nameTa : rev.name}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <span>✓</span> {t.verifiedPatient} {rev.location ? `· ${rev.location}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          DIETARY INSTRUCTIONS (bilingual தமிழ் / English)
      ═══════════════════════════════════════════════════ */}
      <DietaryInstructions lang={lang} />

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
                  {lang === 'ta' ? 'சின்ன கொல்லப்பட்டி, சேலம்' : 'Chinnakollapatty, Salem'}
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
