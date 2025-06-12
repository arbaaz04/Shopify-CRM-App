/**
 * Utilities for standardizing Moroccan city names
 * Handles database matching and integration with ChatGPT for unknown cities
 */
import { standardizeWithGPT } from './chatgptcity';

// In-memory cache to store standardized city names
const cityNameCache: Record<string, string> = {};

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  // Initialize matrix with dimensions (m+1) x (n+1)
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Fill the first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  // Fill the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If characters match, no additional cost
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,        // deletion
        dp[i][j - 1] + 1,        // insertion
        dp[i - 1][j - 1] + cost  // substitution
      );
    }
  }
  
  return dp[m][n];
}

/**
 * Normalize a string for comparison
 * - Convert to lowercase
 * - Remove diacritics
 * - Remove special characters
 */
function normalizeString(str: string): string {
  if (!str) return '';
  
  // Convert to lowercase
  let normalized = str.toLowerCase();
  
  // Remove diacritics
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Remove special characters and extra spaces
  normalized = normalized.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  
  return normalized;
}

/**
 * Normalize Arabic text by removing diacritics and standardizing characters
 */
function normalizeArabicText(text: string): string {
  if (!text) return '';
  
  // First apply general normalization
  let normalized = text.trim();
  
  // Remove Arabic diacritics (harakat)
  // Arabic diacritics Unicode ranges:
  // - Fathatan, Dammatan, Kasratan, Fatha, Damma, Kasra, Shadda, Sukun, etc.
  normalized = normalized.replace(/[\u064B-\u065F\u0670]/g, '');
  
  // Normalize Arabic presentation forms
  normalized = normalized
    // Normalize Alef forms
    .replace(/[\u0622\u0623\u0625]/g, '\u0627')
    // Normalize Ya forms
    .replace(/[\u064A\u0649]/g, '\u064A')
    // Normalize Hamza forms
    .replace(/[\u0624\u0626]/g, '\u0621');
  
  return normalized;
}

/**
 * Detect if text contains Arabic characters
 */
function containsArabic(text: string): boolean {
  // Arabic Unicode range: \u0600-\u06FF
  return /[\u0600-\u06FF]/.test(text);
}

/**
 * Map of Arabic city names to their English equivalents - Part 1 (A-G)
 * Format: "Arabic name": "English name from MOROCCAN_CITIES list"
 */
const ARABIC_TO_ENGLISH_CITIES_PART1: Record<string, string> = {
  // A
  "أشكار": "Achakkar",
  "أفورار": "Afourar", 
  "أفرا": "Afra",
  "أفسو": "Afsou",
  "أكادير": "Agadir",
  "أكفاي": "Agafay", 
  "أكدز": "Agdez",
  "أكدس": "Agds",
  "أكويدير": "Agouidir",
  "أكوراي": "Agourai",
  "أكلموس": "Aguelmous",
  "أحفير": "Ahfir",
  "عين عائشة": "Ain Aicha",
  "عين عتيق": "Ain Attig",
  "عين الشقف": "Ain chkaf",
  "عين العودة": "Ain El Aouda",
  "عين الركادة": "Ain Erreggada",
  "عين حرودة": "Ain Harrouda",
  "عين اللوح": "Ain Leuh",
  "عين مديونة": "Ain Mediouna",
  "عين توجطات": "Ain Taoujdate",
  "عين بني مطهر": "Ain-Beni-Mathar",
  "عين الشكاك": "Ain-Cheggag",
  "أيت عيازة": "Ait Aiaaza",
  "أيت عيسى أو إبراهيم": "Ait Aissa Ou Brahim",
  "أيت عميرة": "Ait Amira", 
  "أيت بوداود": "Ait Boudaoud",
  "أيت داود": "Ait Daoud",
  "أيت هادي": "Ait hadi",
  "أيت إسحاق": "Ait Ishaq",
  "أيت ملول": "Ait Melloul",
  "أيت أورير": "Ait ourir",
  "أيت سدرات سهل الغربية": "Ait Sedrate Sahl Gharbia",
  "أيت تارزوت": "Ait Tarzout",
  "أيت كمرة": "Ait-Kamara",
  "أجدير": "Ajdir",
  "أكليم": "Aklim",
  "أكنول": "Aknoul",
  "العروي": "Al Aaroui",
  "الحسيمة": "Al Hoceima",
  "ألنيف": "Alnif",
  "أنزا": "Anza",
  "أوفوس": "Aoufous",
  "أولوز": "Aoulouz",
  "أورير منطقة أكادير": "Aourir Region Agadir",
  "أرفود": "Arfoud",
  "أسني": "Asni",
  "الصهريج": "Assahrij",
  "أصيلة": "Assilah",
  "أيت إحيا": "Ayt Ihya",
  "أزمور": "Azemmour",
  "أزيلال": "Azilal",
  "أزرو أيت ملول": "Azrou Ait Melloul",
  "أزرو منطقة فاس-مكناس": "Azrou Region de Fes-Meknes",

  // B
  "باب برد": "Bab Berred",
  "باب مرزوقة": "Bab Marzouka",
  "باب تازة": "Bab Taza",
  "بني وليد": "Bani Walid",
  "بساتين المنزه": "Bassatine El Menzeh",
  "بجعد": "Bejaad",
  "بلعكيد": "Belaaguid",
  "بلفاع": "Belfaa",
  "بن أحمد": "Ben Ahmed",
  "بن رحمون": "Ben Rahmoun",
  "بن الطيب": "Ben Taieb",
  "بنكرير": "Benguerir",
  "بني عياط": "Beni Ayat",
  "بني شيكر": "Beni Chiker",
  "بني درار": "Beni Drar",
  "بني انصار": "Beni Ensar",
  "بني ملال": "Beni Mellal",
  "بني سيدال جبل": "Beni Sidal Jbel",
  "بني زولي": "Beni zoli",
  "بنسليمان": "Benslimane",
  "بركان": "Berkane",
  "برشيد": "Berrechid",
  "بيوكرة": "Biougra",
  "بير الجديد": "Bir Jdid",
  "بركوات": "Birkouate",
  "البليدة": "Bleida",
  "بني بوعياش": "Bni Bouayach",
  "بني حديفة": "Bni Hadifa",
  "بني يخلف": "Bni yakhlef",
  "بوعبود": "Bouaboud",
  "بوعرفة": "Bouarfa",
  "بوارج": "Bouarg",
  "بودربالة": "Bouderbala",
  "بودينار": "Boudinar",
  "بوفكران": "Boufakrane",
  "بوهودة": "Bouhouda",
  "بوجدور": "Boujdour",
  "بوجنيبة": "Boujniba",
  "بوكيدارن": "Boukidaren",
  "بولمان": "Boulman",
  "بومالن دادس": "Boumalen dades",
  "بومية": "Boumia",
  "بونوار": "Bounoir",
  "بوريد": "Boured",
  "بوسكورة المركز": "Bouskoura-Centre",
  "بوسكورة أولاد صالح": "Bouskoura-Ouled Saleh",
  "بوسكورة المدينة الخضراء": "Bouskoura-Ville Verte",
  "بوزنيقة": "Bouznika",
  "براديا": "Bradia",

  // C
  "كابو نيكرو": "Cabo Negro",
  "الدار البيضاء - ٢ مارس": "Casablanca - 2 mars",
  "الدار البيضاء - عبد المومن": "Casablanca - Abdelmoumen",
  "الدار البيضاء - عين برجة": "Casablanca - Ain Borja",
  "الدار البيضاء - عين الشق": "Casablanca - Ain chok",
  "الدار البيضاء - عين الذياب": "Casablanca - Ain diab",
  "الدار البيضاء - عين السبع": "Casablanca - Ain sebaa",
  "الدار البيضاء - الفداء": "Casablanca - Al fida",
  "الدار البيضاء - المستقبل": "Casablanca - Al Mostakbal",
  "الدار البيضاء - الأنسي": "Casablanca - Anassi",
  "الدار البيضاء - المدينة القديمة": "Casablanca - Ancienne Medina",
  "الدار البيضاء - أنفا": "Casablanca - Anfa",
  "الدار البيضاء - التشارك": "Casablanca - Attacharok",
  "الدار البيضاء - أحياء أخرى": "Casablanca - Autres quartiers",
  "الدار البيضاء - الأزهر": "Casablanca - Azhar",
  "الدار البيضاء - باشكو": "Casablanca - Bachkou",
  "الدار البيضاء - بوسيجور": "Casablanca - Beausejour",
  "الدار البيضاء - بلفدير": "Casablanca - Belvedere",
  "الدار البيضاء - بن مسيك": "Casablanca - Ben msik",
  "الدار البيضاء - البرنوصي": "Casablanca - Bernoussi",
  "الدار البيضاء - بوركون": "Casablanca - Bourgogne",
  "الدار البيضاء - بورنازل": "Casablanca - Bournazel",
  "الدار البيضاء - كاليفورنيا": "Casablanca - Californie",
  "الدار البيضاء - وسط المدينة": "Casablanca - Centre Ville",
  "الدار البيضاء - سيل": "Casablanca - CIL"
};

/**
 * Map of Arabic city names to their English equivalents - Part 2 (H-O)
 * Format: "Arabic name": "English name from MOROCCAN_CITIES list"
 */
const ARABIC_TO_ENGLISH_CITIES_PART2: Record<string, string> = {
  // H
  "حد بوموسى": "Had Boumoussa",
  "حد الدرعة": "Had Draa",
  "حد السوالم": "Had Soualem",
  "حاج قدور": "Haj Kaddour",
  "هرهورة": "Harhoura",
  "حطان": "Hettan",

  // I
  "إفران": "Ifran",
  "إيغود": "Ighoud",
  "إيغرم العلم": "Ighrem Laalam",
  "إيمينتانوت": "Imintanout",
  "إيموزار الكندر": "Imouzzer du Kandar",
  "إيمزورن": "Imzouren",
  "إنزكان": "Inzegane",
  "إساكن": "Issaguen",

  // J
  "جعدار": "Jaadar",
  "جماعة شعيم": "Jamaat Shaim",
  "جبيلة": "Jebila",
  "جرادة": "Jerada",
  "جرف الملحة": "Jorf El Melha",

  // K
  "قرية أركمان": "Kariat Arekmane",
  "قصبة تادلة": "Kasba Tadla",
  "قسيطة": "Kassita",
  "كلعة مكونة": "Kelaat MGouna",
  "القنيطرة": "Kenitra",
  "خنداكور": "Khandagour",
  "خميس الزمامرة": "Khemis Des Zemamra",
  "خميس الساحل": "Khemis du Sahel",
  "الخميسات": "Khemisset",
  "خنيشات": "Khenichet",
  "خنيفرة": "Khenifra",
  "خريبكة": "Khouribga",
  "القصر الكبير": "Ksar El Kebir",
  "القصر الصغير": "Ksar Sghir",

  // L
  "لعوامرة": "Laaouamera",
  "العرائش": "Laarache",
  "لعطاوية": "Laattaouia",
  "لعيايطة": "Laayayta",
  "العيون": "Laayoune",
  "لاكفيفات": "Lagfifat",
  "لهبيشات": "Lahbichat",
  "لالة ميمونة": "Lalla Mimouna",
  "لقليعة": "Leqliaa",
  "لوداية": "Loudaya",

  // M
  "المحاميد الغزلان": "MHamid El Ghizlane",
  "مداغ": "Madagh",
  "مريواري": "Mariouari",
  "مرنيسة": "Marnissa",
  "مراكش": "Marrakech",
  "مرتيل": "Martil",
  "ماسة": "Massa",
  "المضيق": "Mdiq",
  "مشرع بلقصيري": "Mechra Bel Ksiri",
  "مديونة": "Mediouna",
  "المهدية": "Mehdia",
  "مجاط منطقة فاس-مكناس": "Mejat Region de Fes-Meknes",
  "مجاط - منطقة مراكش": "Mejjat - Region de Marrakech",
  "مكناس": "Meknes",
  "مرس الخير": "Mers El Kheir",
  "مرزوكة": "Merzouga",
  "مسكالة": "Meskala",
  "مسور رأسو": "Messawerr Rasso",
  "ميضار": "Midar",
  "ميدلت": "Midelt",
  "ميسور": "Missour",
  "منار": "Mnar",
  "المحمدية - الوحدة": "Mohammdia - Al Wahda",
  "المحمدية": "Mohammedia",
  "المحمدية - المسيرة": "Mohammedia - Al Massira",
  "المحمدية - العالية": "Mohammedia - Alia",
  "المحمدية - الحسنية": "Mohammedia - Hassania",
  "المحمدية - حي الوفاء": "Mohammedia - Hay Wafa",
  "المحمدية - القصبة": "Mohammedia - Kasbah",
  "المحمدية - النسيم": "Mohammedia - Nassim",
  "المحمدية - بارك": "Mohammedia - Parc",
  "مولاي عبد الله": "Moulay Abdellah",
  "مولاي بوسلهام": "Moulay Bousselham",
  "مولاي إدريس زرهون": "Moulay Idriss zerhouni",
  "مولاي يعقوب": "Moulay Yacoub",
  "مريرت": "Mrirt",
  "مزودية": "Mzoudia",

  // N
  "الناظور": "Nador",
  "نقوب": "Nkoub",
  "النواصر": "Nouacer",

  // O
  "واحات سيدي إبراهيم": "Ouahat Sidi Brahim",
  "الوليدية": "Oualidia",
  "واويزغت": "Ouaouizeght",
  "ورزازات": "Ouarzazate",
  "وزان": "Ouazzane",
  "واد أمليل": "Oued Amlil",
  "واد لو": "Oued law",
  "وادي زم": "Oued Zem",
  "ويسلان": "Ouislane",
  "وجدة": "Oujda",
  "أولاد عبو": "Oulad Abbou",
  "أولاد علي": "Oulad Ali",
  "أولاد عمران منطقة الجديدة": "Oulad Amrane Region El Jadida",
  "أولاد عياد": "Oulad Ayad",
  "أولاد عزوز دار ١٦": "Oulad Azzouz Dar 16",
  "أولاد برحيل": "Oulad Berhil",
  "أولاد فرج": "Oulad Frej",
  "أولاد مبارك": "Oulad Mbarek",
  "أولاد سعيد منطقة سطات": "Oulad Said Region de Settat",
  "أولاد الطيب": "Oulad Tayeb",
  "أولاد تايمة": "Oulad Teima",
  "أولاد يعيش": "Oulad Yaich",
  "أولاد يوسف": "Oulad Youssef",
  "أولاد زمام": "Oulad Zmam",
  "أولاد ضهو": "Ouled Dahhou",
  "أولاد حسون": "Ouled Hassoune",
  "أولاد مومنة": "Ouled Moumna",
  "أولاد سطوت": "Ouled Settout",
  "أولماس": "Oulmes",
  "أوناغة": "Ounagha",
  "أوريكا": "Ourika",
  "أوطاط الحاج": "Outat El Haj"
};

/**
 * Map of Arabic city names to their English equivalents - Part 3 (P-Z)
 * Format: "Arabic name": "English name from MOROCCAN_CITIES list"
 */
const ARABIC_TO_ENGLISH_CITIES_PART3: Record<string, string> = {
  // P
  "بوجعدة": "Poujda",

  // Q
  "القباب": "Qasbat Al Qbab",

  // R
  "الرباط - أكدال": "Rabat - Agdal",
  "الرباط - سويسي": "Rabat - Souissi",
  "الرباط - اليوسفية": "Rabat - Youssoufia",
  "الرشيدية": "Rachidia",
  "الراشدية": "Rachidiyah",
  "رسلان": "Rasslan",
  "الريصاني": "Rissani",
  "رملية فلان": "Rmilat Flan",
  "الرباط": "Rabat",
  "الرماني": "Rommani", 

  // S
  "صفرو": "Sefrou",
  "السمارة": "Smara",
  "سبعالمكينات": "Sabaa Layoun",
  "سبت الزينات": "Sabte Zinat",
  "سعادة": "Saada",
  "سعيدية": "Saidia",
  "سبع عيون": "Sbaa Ayoune",
  "سكورة": "Skoura",
  "سلا": "Sale",
  "سلا - حي كريمة": "Sale - Hay Karima",
  "سلا - القرية": "Sale - Karya",
  "سلا - العيايدة": "Sale - Layada",
  "سلا - تكادوم": "Sale - Takadom",
  "السهول": "Sanhaja",
  "سانية بركيك": "Saniat Berguig",
  "سبت بني شيكر": "Sebt Beni Chiker",
  "سبت قورارة": "Sebt Korraraa",
  "سبت سايس": "Sebt Saiss",
  "سخينات": "Sekhinate",
  "سلوان": "Selouane",
  "سيدي إفني": "Sidi Ifni",
  "سيدي علال التازي": "Sidi Allal Tazi",
  "سيدي بنور": "Sidi Bennour",
  "سيدي بوبكر": "Sidi Boubker",
  "سيدي بوزيد": "Sidi Bouzid",
  "سيدي قاسم": "Sidi Kacem",
  "سيدي معروف": "Sidi Maarouf",
  "سيدي رحال": "Sidi Rahal",
  "سيدي سليمان": "Sidi Slimane",
  "سيدي يحيى الغرب": "Sidi Yahya El Gharb",
  "سيدي حجاج - سيدي حجاج": "Sidi-Hajjaj",
  "سيدي حجاج - واد حسار": "Sidi Hajjaj Oued Hassar",
  "سفي": "Souira Kdima",
  "صغينية": "Soghainya",
  "سكورة - النواحي": "Sokoura",
  "الصويرة - المدينة": "Essaouira",
  "سيدي بيبي": "Sidi Bibi",
  "سوق الأربعاء": "Souk el Arbaâ",
  "سوق الخميس": "Souk El Khmis",
  "سوق السبت - أولاد النمة": "Souk Sebt Oulad Nemma",
  "سوق سبت الضحاك": "Souk Sebt Rharbia",

  // T
  "تافراوت": "Tafraoute",
  "تازناخت": "Taznakht",
  "طنطان": "Tan Tan",
  "طنجة": "Tanger",
  "طانطان": "Tantan",
  "تاهلة": "Tahla",
  "تاماريس - المحمدية": "Tamaris",
  "تاماسينت": "Tamasint",
  "تامنصورت": "Tamansourt",
  "تاونات": "Taounate",
  "تاوريرت": "Taourirt",
  "تارجيست": "Targuist",
  "تارميكت": "Tarmigte",
  "تاروداتن": "Taroudant",
  "تاونزا": "Taounza",
  "تازة": "Taza",
  "تازارين": "Tazarine",
  "تفليت": "Tiflet",
  "تكراست": "Tikgrasst",
  "تينزولين": "Tinzouline",
  "تيزنيت": "Tiznit",
  "تمارة": "Temara",
  "تنجداد": "Tinjdad",
  "تينغير": "Tinghir",
  "تلات بوغراين": "Tlat Boughrein",
  "تلوات": "Tlouate",
  "تماشيت تاجوين": "Tmachite Tagouine",
  "تماسينت - الريف": "Tmasin",
  "تامسينت قيادة أيت سغروشن السفلى": "Tmsint Caidate Ait Seghrouchene Soufla",
  "تولال": "Toulal",
  "تواتة": "Touate",
  "توريرت": "Touririrte",
  "تراست": "Trast",
  "تتاوت -منطقة ورزازات": "Ttaout - Region de Ouarzazate",
  "تزنيت": "Tzinet",

  // U
  "أوجدة": "Oujda",

  // W
  "واحة تامداغوست": "Wahat Tamdaghoucht",

  // Y
  "اليوسفية": "Youssoufia",

  // Z
  "زاوية اشيخ": "Zaouiat Cheikh",
  "زاوية سايس": "Zaouiat Sais",
  "زاوية سيدي حمزة": "Zaouiat Sidi Hamza",
  "زايو": "Zaio",
  "زغنغان": "Zeghanghane",
  "زمران شرقية": "Zemrane Charqiya",
  "زناتة": "Zenata",
  "زرهون": "Zerhoune",
  "زيدة": "Zida",
  "زويريشة": "Zouericha",
  "زرقطن": "Zraqtene"
};

/**
 * Map of Arabic city names to their English equivalents - Part 4 (Speedaf Cities)
 * Format: "Arabic name": "English name from SPEEDAF_CITIES list"
 */
const ARABIC_TO_ENGLISH_CITIES_PART4: Record<string, string> = {
  "خريبكة": "Khouribga",
  "الفقيه بن صالح": "Fquih Ben Salah",
  "أزيلال": "Azilal",
  "خنيفرة": "Khenifra",
  "بني ملال": "Beni Mellal",
  "سيدي بنور": "Sidi Bennour",
  "الجديدة": "El Jadida",
  "برشيد": "Berrechid",
  "النواصر": "Nouaceur",
  "سطات": "Settat",
  "الدار البيضاء": "casablanca",
  "المحمدية": "Mohammedia",
  "مديونة": "Médiouna",
  "بنسليمان": "Benslimane",
  "سيدي معروف": "Sidi Maarouf",
  "واد الذهب": "Oued Ed-Dahab",
  "الداخلة": "Dakhla",
  "ميدلت": "Midelt",
  "الرشيدية": "Errachidia",
  "تنغير": "Tinghir",
  "زاكورة": "Zagora",
  "مكناس": "Meknes",
  "فاس": "FES",
  "مولاي يعقوب": "Moulay Yaâcoub",
  "تازة": "Taza",
  "صفرو": "Sefrou",
  "إفران": "Ifrane",
  "الحاجب": "El Hajeb",
  "تاونات": "Taounate",
  "بولمان": "Boulemane",
  "فاس - مكناس": "Fès - Meknès",
  "الخميسات": "Khémisset",
  "أزرو": "AZROU",
  "كلميم": "Guelmim",
  "طانطان": "Tan-Tan",
  "طرفاية": "Tarfaya",
  "العيون": "Laayoune",
  "بوجدور": "Boujdour",
  "مراكش": "Marrakech",
  "قلعة السراغنة": "El Kelaa des Sraghna",
  "الحوز": "Al Haouz",
  "الرحامنة": "Rehamna",
  "ورزازات": "Ouarzazate",
  "اليوسفية": "Youssoufia",
  "شيشاوة": "Chichaoua",
  "الصويرة": "Essaouira",
  "آسفي": "SAFI",
  "دمنات": "demnate",
  "وجدة": "oujda",
  "تاوريرت": "Taourirt",
  "بركان": "Berkane",
  "الناظور": "Nador",
  "جرادة": "Jerada",
  "جرسيف": "Guercif",
  "الدريوش": "Driouch",
  "فكيك": "Figuig",
  "الرباط": "Rabat",
  "سلا": "SALE",
  "سيدي سليمان": "Sidi Slimane",
  "سيدي قاسم": "Sidi Kacem",
  "القنيطرة": "Kenitra",
  "قنيطرة": "Kénitra",
  "الصخيرات - تمارة": "Skhirate - Témara",
  "تيفلت": "Tiflet",
  "سيدي علال البحراوي": "Sidi Alal El Bahr aoui",
  "أكادير": "AGADIR",
  "إنزكان - آيت ملول": "Inezgane - Ait Melloul",
  "تارودانت": "Taroudant",
  "تيزنيت": "TIZNIT",
  "طاطا": "Tata",
  "اشتوكة - آيت باها": "Chtouka - Ait Baha",
  "الحسيمة": "Al Hoceïma",
  "طنجة": "Tanger",
  "العرائش": "Larache",
  "تطوان": "Tetouan",
  "المضيق - الفنيدق": "M Diq - Fnideq",
  "شفشاون": "Chefchaouen",
  "وزان": "Ouezzane",
  "القصر الصغير": "Ksar Sghir",
  "الجبهة": "jabha", 
  "واد لاو": "ouad law",
  "أصيلة": "Asilah"
};

/**
 * Map of common alternative spellings to standardized city names
 * This includes English, French and other common variations
 */
const ALTERNATIVE_CITY_SPELLINGS: Record<string, string> = {
  // A
  "agadir ida outanane": "Agadir",
  "agadeer": "Agadir",
  "al hoceïma": "Al Hoceima",
  "al-hoceima": "Al Hoceima",
  "alhoceima": "Al Hoceima",
  "asila": "Assilah",
  "asileh": "Assilah",
  "azrou": "Azrou Region de Fes-Meknes",

  // B
  "ben guerir": "Benguerir",
  "ben guérir": "Benguerir",
  "bengrir": "Benguerir",
  "ben slimane": "Benslimane",
  "beni-mellal": "Beni Mellal",
  "béni mellal": "Beni Mellal",
  "biougra": "Biougra",

  // C
  "casa": "Casablanca",
  "casablanca": "Casablanca - Autres quartiers",
  "casablanca anfa": "Casablanca - Anfa",
  "casablanca maarif": "Casablanca - Maarif",
  "casablance": "Casablanca",
  "chaouen": "Chefchaouen",
  "chawen": "Chefchaouen",
  "chef chaouen": "Chefchaouen",
  "chtouka ait baha": "Chtouka - Ait Baha",

  // D
  "dar bouazza": "Dar Bouaza",
  "dakhla-oued ed dahab": "Dakhla",
  "dcheira": "Dcheira El Jihadia",

  // E
  "eljadida": "El jadida",
  "el jadida": "El jadida",
  "el-jadida": "El jadida",
  "essaouire": "Essaouira",
  "errachidia": "Errachidia",

  // F
  "fas": "FES",
  "fes": "FES",
  "fès": "FES",
  "fes-meknes": "Fès - Meknès",
  "fes-boulemane": "Fès - Meknès",
  "fez": "FES",
  "fkih ben salah": "Fquih Ben Salah",
  "fqih ben saleh": "Fquih Ben Salah",

  // G
  "gelmim": "Guelmim",
  "guelmin": "Guelmim",
  "guelmime": "Guelmim",
  "guerssif": "Guercif",
  "geursif": "Guercif",

  // I
  "ifran": "Ifrane",
  "ifrane": "Ifrane",
  "inezgane": "Inzegane",
  "inzegane ait melloul": "Inzegane",

  // K
  "kebdana": "Dar-El Kebdani",
  "khenifra": "Khenifra",
  "khemisset": "Khemisset",
  "kenitra": "Kenitra",
  "kinitra": "Kenitra",
  "qunaytirah": "Kenitra",
  "kouribga": "Khouribga",
  "khouribgha": "Khouribga",
  "ksar kebir": "Ksar El Kebir",
  "ksar el-kebir": "Ksar El Kebir",

  // L
  "larache": "Laarache",
  "laayoun": "Laayoune",
  "layoune": "Laayoune",
  "el aaiun": "Laayoune",
  "el ayoun": "Laayoune",

  // M
  "marrakech": "Marrakech",
  "marrakesh": "Marrakech",
  "marakesh": "Marrakech",
  "marrakch": "Marrakech",
  "meknes": "Meknes",
  "meknas": "Meknes",
  "meknès": "Meknes",
  "mdiq": "Mdiq",
  "mdieq": "Mdiq",
  "martil": "Martil",
  "mertil": "Martil",
  "mohammadia": "Mohammedia",
  "mohamedia": "Mohammedia",
  "mohammadiya": "Mohammedia",
  "midelt": "Midelt",

  // N
  "nador": "Nador",
  "nadour": "Nador",
  "nadhur": "Nador",
  "nouasser": "Nouacer",
  "nouaceur": "Nouacer",
  "nouaseur": "Nouacer",

  // O
  "oujda": "Oujda",
  "ujda": "Oujda",
  "wajda": "Oujda",
  "ouarzazate": "Ouarzazate",
  "ouarzazat": "Ouarzazate",
  "warzazat": "Ouarzazate",
  "ouazzane": "Ouazzane",
  "wazan": "Ouazzane",
  "ouezzane": "Ouazzane",

  // R
  "rabat": "Rabat",
  "rabat salé": "Rabat",
  "rbat": "Rabat",
  "rachidia": "Errachidia",
  "er-rachidia": "Errachidia",
  "rashidiya": "Errachidia",

  // S
  "safi": "SAFI",
  "asfi": "SAFI",
  "sale": "Sale",
  "salé": "Sale",
  "sla": "Sale",
  "settat": "Settat",
  "setat": "Settat",
  "sidi bennour": "Sidi Bennour",
  "sidi benour": "Sidi Bennour",
  "sidi ifni": "Sidi Ifni",
  "sidi kacem": "Sidi Kacem",
  "sidi kasem": "Sidi Kacem",
  "sidi slimane": "Sidi Slimane",
  "sidi sulaimane": "Sidi Slimane",
  "sidi yahia": "Sidi Yahya El Gharb",
  "sidi yahya": "Sidi Yahya El Gharb",
  "skhirat": "Skhirat",
  "skhirat-temara": "Skhirate - Témara",
  "smara": "Smara",
  "semara": "Smara",
  "souk larbaa": "Souk el Arbaâ",
  "souk el arbaa": "Souk el Arbaâ",

  // T
  "tanger": "Tanger",
  "tangier": "Tanger",
  "tanja": "Tanger",
  "tangiers": "Tanger",
  "tantan": "Tan Tan",
  "tan-tan": "Tan Tan",
  "tan tan": "Tan Tan",
  "taroudant": "Taroudant",
  "taroudannte": "Taroudant",
  "taounate": "Taounate",
  "taounat": "Taounate",
  "taza": "Taza",
  "tazah": "Taza",
  "tetouan": "Tetouan",
  "tetuan": "Tetouan",
  "tétouan": "Tetouan",
  "titwan": "Tetouan",
  "temara": "Temara",
  "tamara": "Temara",
  "témara": "Temara",
  "tifelt": "Tiflet",
  "tiflete": "Tiflet",
  "tinghir": "Tinghir",
  "tinerhir": "Tinghir",
  "tiznit": "Tiznit",
  "tiznet": "Tiznit",

  // Y
  "youssoufia": "Youssoufia",
  "youssoufiya": "Youssoufia",

  // Z
  "zagora": "Zagoura",
  "zagoura": "Zagoura"
};

// Merge all parts into a single mapping for lookup
const ARABIC_TO_ENGLISH_CITIES = {
  ...ARABIC_TO_ENGLISH_CITIES_PART1,
  ...ARABIC_TO_ENGLISH_CITIES_PART2,
  ...ARABIC_TO_ENGLISH_CITIES_PART3,
  ...ARABIC_TO_ENGLISH_CITIES_PART4
};

/**
 * Fuzzy find best match from city database
 * @param cityName City name to match
 * @param maxDistance Maximum Levenshtein distance to consider a match
 * @returns The best match or null if no good match found
 */
function findBestCityMatch(cityName: string, maxDistance: number = 3): string | null {
  if (!cityName) {
    return null;
  }
  
  // Normalize input city name
  const normalizedInput = normalizeString(cityName);
  
  if (!normalizedInput) {
    return null;
  }
  
  // First look for exact matches after normalization
  for (const city of MOROCCAN_CITIES) {
    const normalizedCity = normalizeString(city);
    
    if (normalizedCity === normalizedInput) {
      return city;
    }
  }
  
  // If no exact match, try fuzzy matching using Levenshtein distance
  let bestMatch: string | null = null;
  let bestDistance = maxDistance + 1;
  
  for (const city of MOROCCAN_CITIES) {
    const normalizedCity = normalizeString(city);
    const distance = levenshteinDistance(normalizedInput, normalizedCity);
    
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = city;
    }
  }
  
  // Only return if we found a match within the max distance
  if (bestDistance <= maxDistance) {
    return bestMatch;
  }
  
  return null;
}

/**
 * Enhanced function to normalize Arabic text for better fuzzy matching
 * Handles variations in spelling and common typos in Arabic text
 */
function normalizeArabicTextForFuzzy(text: string): string {
  if (!text) return '';
  
  // First apply standard normalization
  let normalized = normalizeArabicText(text);
  
  // Remove Arabic definite article "ال" (Al/El) for better matching
  normalized = normalized.replace(/^ال/g, '');
  
  // Common spelling variations in Arabic city names
  const replacements: Record<string, string> = {
    'خريبجة': 'خريبكة', // Khouribga variations
    'خريبكه': 'خريبكة',
    'بني ملل': 'بني ملال', // Beni Mellal variations
    'بنى ملال': 'بني ملال',
    'فقيه بن صالح': 'الفقيه بن صالح', // Fquih Ben Salah variations
    'فاص': 'فاس', // Fes variations
    'فأس': 'فاس',
    'دارالبيضاء': 'الدار البيضاء', // Casablanca variations
    'كازابلانكا': 'الدار البيضاء',
    'كازا': 'الدار البيضاء',
    'مراكش الحمراء': 'مراكش', // Marrakech variations
    'مراكض': 'مراكش',
    'وجده': 'وجدة', // Oujda variations
    'الرباط العاصمة': 'الرباط', // Rabat variations
    'الرباط العصيمة': 'الرباط',
    'صلا': 'سلا', // Sale variations
    'سالي': 'سلا',
    'طانطن': 'طانطان', // Tantan variations
    'تيزنت': 'تيزنيت', // Tiznit variations
    'أكدير': 'أكادير', // Agadir variations
    'اغادير': 'أكادير'
  };
  
  // Apply replacements for known variants
  for (const [variant, standard] of Object.entries(replacements)) {
    if (normalized === variant) {
      return standard;
    }
  }
  
  return normalized;
}

/**
 * Enhanced fuzzy find for Arabic text
 * First tries exact matching, then progressively more flexible matching
 */
function findBestArabicCityMatch(arabicCityName: string): string | null {
  if (!arabicCityName || !containsArabic(arabicCityName)) {
    return null;
  }
  
  // Normalize the input for matching
  const normalizedInput = normalizeArabicTextForFuzzy(arabicCityName);
  
  // 1. Try direct lookup first
  if (ARABIC_TO_ENGLISH_CITIES[arabicCityName]) {
    return ARABIC_TO_ENGLISH_CITIES[arabicCityName];
  }
  
  // 2. Try normalized lookup
  if (ARABIC_TO_ENGLISH_CITIES[normalizedInput]) {
    return ARABIC_TO_ENGLISH_CITIES[normalizedInput];
  }
  
  // 3. Check against all normalized Arabic city names
  for (const [arabicName, englishName] of Object.entries(ARABIC_TO_ENGLISH_CITIES)) {
    const normalizedArabicName = normalizeArabicTextForFuzzy(arabicName);
    
    if (normalizedArabicName === normalizedInput) {
      return englishName;
    }
    
    // Check for partial matches (city name contained in the address)
    if (normalizedInput.includes(normalizedArabicName) || normalizedArabicName.includes(normalizedInput)) {
      return englishName;
    }
  }
  
  // 4. Try fuzzy matching for Arabic text with Levenshtein distance
  let bestMatch: string | null = null;
  let bestScore = Infinity;
  const maxDistance = Math.min(3, Math.floor(normalizedInput.length / 2)); // Adaptive threshold
  
  for (const [arabicName, englishName] of Object.entries(ARABIC_TO_ENGLISH_CITIES)) {
    const normalizedArabicName = normalizeArabicTextForFuzzy(arabicName);
    
    // Skip very short names for fuzzy matching to avoid false positives
    if (normalizedArabicName.length < 3) continue;
    
    const distance = levenshteinDistance(normalizedInput, normalizedArabicName);
    
    // Use a relative distance score that accounts for name length
    const relativeScore = distance / Math.max(normalizedInput.length, normalizedArabicName.length);
    
    if (relativeScore < 0.4 && distance < bestScore) { // 40% difference threshold
      bestScore = distance;
      bestMatch = englishName;
    }
  }
  
  // Only return match if we have reasonable confidence
  if (bestMatch && bestScore <= maxDistance) {
    return bestMatch;
  }
  
  return null;
}

/**
 * Enhanced translation function for Arabic city names
 * Uses both exact matching and fuzzy matching
 */
function translateArabicCityName(cityName: string): string | null {
  // Clean up the input
  const cleanInput = cityName?.trim() || '';
  
  // Check if the input has Arabic characters
  if (!cleanInput || !containsArabic(cleanInput)) {
    return null;
  }
  
  // First try exact matching
  if (ARABIC_TO_ENGLISH_CITIES[cleanInput]) {
    return ARABIC_TO_ENGLISH_CITIES[cleanInput];
  }
  
  // Then try the enhanced fuzzy matching specifically for Arabic
  return findBestArabicCityMatch(cleanInput);
}

/**
 * Database of standard Moroccan cities
 */
const MOROCCAN_CITIES = [
  "Khouribga",
  "Fquih Ben Salah",
  "Azilal",
  "Khenifra",
  "Beni Mellal",
  "Sidi Bennour",
  "El Jadida",
  "Berrechid",
  "Nouaceur",
  "Settat",
  "Casablanca",
  "Mohammedia",
  "Médiouna",
  "Benslimane",
  "Sidi Maarouf",
  "Oued Ed-Dahab",
  "Dakhla",
  "Midelt",
  "Errachidia",
  "Tinghir",
  "Zagora",
  "Meknes",
  "FES",
  "Moulay Yaâcoub",
  "Taza",
  "Sefrou",
  "Ifrane",
  "Khenifra",
  "El Hajeb",
  "Taounate",
  "Boulemane",
  "Fès - Meknès",
  "Khémisset",
  "AZROU",
  "Guelmim",
  "Tan-Tan",
  "Tarfaya",
  "Laayoune",
  "Boujdour",
  "Marrakech",
  "El Kelaa des Sraghna",
  "Al Haouz",
  "Rehamna",
  "Ouarzazate",
  "Youssoufia",
  "Chichaoua",
  "Essaouira",
  "SAFI",
  "Demnate",
  "Oujda",
  "Taourirt",
  "Berkane",
  "Nador",
  "Jerada",
  "Guercif",
  "Driouch",
  "Figuig",
  "Rabat",
  "SALE",
  "Khemisset",
  "Sidi Slimane",
  "Sidi Kacem",
  "Khémisset",
  "Kenitra",
  "Kénitra",
  "Skhirate - Témara",
  "Tiflet",
  "Sidi Alal El Bahr aoui",
  "AGADIR",
  "Inezgane - Ait Melloul",
  "Taroudant",
  "TIZNIT",
  "Tata",
  "Chtouka - Ait Baha",
  "Al Hoceïma",
  "Tanger",
  "Larache",
  "Tetouan",
  "M Diq - Fnideq",
  "Chefchaouen",
  "Ouezzane",
  "Ksar Sghir",
  "Jabha",
  "Ouad Law",
  "Asilah",
  "Achakkar",
  "Afourar",
  "Afra",
  "Afsou",
  "Agadir",
  "Agafay",
  "Agdez",
  "Agds",
  "Agouidir",
  "Agourai",
  "Aguelmous",
  "Ahfir",
  "Ain Aicha",
  "Ain Attig",
  "Ain chkaf",
  "Ain El Aouda",
  "Ain Erreggada",
  "Ain Harrouda",
  "Ain Leuh",
  "Ain Mediouna",
  "Ain Taoujdate",
  "Ain-Beni-Mathar",
  "Ain-Cheggag",
  "Ait Aiaaza",
  "Ait Aissa Ou Brahim",
  "Ait Amira",
  "Ait Boudaoud",
  "Ait Daoud",
  "Ait hadi",
  "Ait Ishaq",
  "Ait Melloul",
  "Ait ourir",
  "Ait Sedrate Sahl Gharbia",
  "Ait Tarzout",
  "Ait-Kamara",
  "Ajdir",
  "Aklim",
  "Aknoul",
  "Al Aaroui",
  "Al Hoceima",
  "Alnif",
  "Anza",
  "Aoufous",
  "Aoulouz",
  "Aourir Region Agadir",
  "Arfoud",
  "Asni",
  "Assahrij",
  "Assilah",
  "Ayt Ihya",
  "Azemmour",
  "Azilal",
  "Azrou Ait Melloul",
  "Azrou Region de Fes-Meknes",
  "Bab Berred",
  "Bab Marzouka",
  "Bab Taza",
  "Bani Walid",
  "Bassatine El Menzeh",
  "Bejaad",
  "Belaaguid",
  "Belfaa",
  "Ben Ahmed",
  "Ben Rahmoun",
  "Ben Taieb",
  "Benguerir",
  "Beni Ayat",
  "Beni Chiker",
  "Beni Drar",
  "Beni Ensar",
  "Beni Mellal",
  "Beni Sidal Jbel",
  "Beni zoli",
  "Benslimane",
  "Berkane",
  "Berrechid",
  "Biougra",
  "Bir Jdid",
  "Birkouate",
  "Bleida",
  "Bni Bouayach",
  "Bni Hadifa",
  "Bni yakhlef",
  "Bouaboud",
  "Bouarfa",
  "Bouarg",
  "Bouderbala",
  "Boudinar",
  "Boufakrane",
  "Bouhouda",
  "Boujdour",
  "Boujniba",
  "Boukidaren",
  "Boulman",
  "Boumalen dades",
  "Boumia",
  "Bounoir",
  "Boured",
  "Bouskoura-Centre",
  "Bouskoura-Ouled Saleh",
  "Bouskoura-Ville Verte",
  "Bouznika",
  "Bradia",
  "Cabo Negro",
  "Casablanca - 2 mars",
  "Casablanca - Abdelmoumen",
  "Casablanca - Ain Borja",
  "Casablanca - Ain chok",
  "Casablanca - Ain diab",
  "Casablanca - Ain sebaa",
  "Casablanca - Al fida",
  "Casablanca - Al Mostakbal",
  "Casablanca - Anassi",
  "Casablanca - Ancienne Medina",
  "Casablanca - Anfa",
  "Casablanca - Attacharok",
  "Casablanca - Autres quartiers",
  "Casablanca - Azhar",
  "Casablanca - Bachkou",
  "Casablanca - Beausejour",
  "Casablanca - Belvedere",
  "Casablanca - Ben msik",
  "Casablanca - Bernoussi",
  "Casablanca - Bourgogne",
  "Casablanca - Bournazel",
  "Casablanca - Californie",
  "Casablanca - Centre Ville",
  "Casablanca - CIL",
  "Casablanca - Derb alkabir",
  "Casablanca - Derb Ghalef",
  "Casablanca - Derb Milan",
  "Casablanca - Derb Omar",
  "Casablanca - Derb sultan",
  "Casablanca - El Hana",
  "Casablanca - El hank",
  "Casablanca - Floride",
  "Casablanca - France Ville II",
  "Casablanca - Garage Allal",
  "Casablanca - Gauthier",
  "Casablanca - Ghandi",
  "Casablanca - Habous",
  "Casablanca - Hay Al Inara",
  "Casablanca - Hay assalama",
  "Casablanca - Hay el farah",
  "Casablanca - Hay Hassani",
  "Casablanca - Hay mohammedi",
  "Casablanca - Hay moulay Abdellah",
  "Casablanca - Hay Moulay Rachid",
  "Casablanca - Hay Tissir",
  "Casablanca - Jawhara",
  "Casablanca - La Gironde",
  "Casablanca - Lahraouine",
  "Casablanca - Lamkansa",
  "Casablanca - Les Hopitaux",
  "Casablanca - Lissassfa",
  "Casablanca - Maarif",
  "Casablanca - Mandarona",
  "Casablanca - Mers sultan",
  "Casablanca - Nassim II",
  "Casablanca - Oasis",
  "Casablanca - Oulfa",
  "Casablanca - Palmier",
  "Casablanca - Polo",
  "Casablanca - Racine",
  "Casablanca - Riveira",
  "Casablanca - Roches noires",
  "Casablanca - Salmia",
  "Casablanca - Sbata",
  "Casablanca - Sid Al Khadir",
  "Casablanca - Sidi Belyout",
  "Casablanca - Sidi Maarouf",
  "Casablanca - Sidi Moumen",
  "Casablanca - Sidi Othmane",
  "Casablanca - TANTONVILLE",
  "Casablanca - Val fleurie",
  "Chefchaouen",
  "Chellalat Mohammedia",
  "Chichaoua",
  "Chrifia",
  "Chtouka - region Agadir",
  "Chwiter",
  "Dakhla",
  "Dar Bouaza",
  "Dar Essalam",
  "Dar Ould Zidouh",
  "Dar-El Kebdani",
  "Dcheira El Jihadia",
  "Demnate",
  "Deroua",
  "Dlalha",
  "Douar laarab",
  "Douar Lahna",
  "Drarga",
  "Driouch",
  "Echemmaia",
  "El Aarjate",
  "El Aioun Charqiya",
  "El Borouj Region de Settat",
  "El Gara",
  "El Hajeb",
  "El Haouzia",
  "El jadida",
  "El Kebab",
  "El Kelaa Des Sraghna",
  "El Ksiba",
  "El Mansouria",
  "El-afak",
  "Er-Rich",
  "Errachidia",
  "Errahma",
  "Errouha",
  "Essaouira",
  "Essemara",
  "farkhana",
  "Fes",
  "Fezouata",
  "Figuig",
  "Fnideq",
  "Foum Oudi",
  "Fquih Ben Salah",
  "Ghafsai",
  "Ghazoua",
  "Goulmima",
  "Guelmim",
  "Guercif",
  "Gueznaia",
  "Guisser",
  "Had Boumoussa",
  "Had Draa",
  "Had Soualem",
  "Haj Kaddour",
  "Harhoura",
  "Hettan",
  "Ifran",
  "Ighoud",
  "Ighrem Laalam",
  "Imintanout",
  "Imouzzer du Kandar",
  "Imzouren",
  "Inzegane",
  "Issaguen",
  "Jaadar",
  "Jamaat Shaim",
  "Jebila",
  "Jerada",
  "Jorf El Melha",
  "Kariat Arekmane",
  "Kasba Tadla",
  "Kassita",
  "Kelaat MGouna",
  "Kenitra",
  "Khandagour",
  "Khemis Des Zemamra",
  "Khemis du Sahel",
  "Khemisset",
  "Khenichet",
  "Khenifra",
  "Khouribga",
  "Ksar El Kebir",
  "Ksar Sghir",
  "Laaouamera",
  "Laarache",
  "Laattaouia",
  "Laayayta",
  "Laayoune",
  "Lagfifat",
  "Lahbichat",
  "Lalla Mimouna",
  "Leqliaa",
  "Loudaya",
  "MHamid El Ghizlane",
  "Madagh",
  "Mariouari",
  "Marnissa",
  "Marrakech",
  "Martil",
  "Massa",
  "Mdiq",
  "Mechra Bel Ksiri",
  "Mediouna",
  "Mehdia",
  "Mejat Region de Fes-Meknes",
  "Mejjat - Region de Marrakech",
  "Meknes",
  "Mers El Kheir",
  "Merzouga",
  "Meskala",
  "Messawerr Rasso",
  "Midar",
  "Midelt",
  "Missour",
  "Mnar",
  "Mohammdia - Al Wahda",
  "Mohammedia",
  "Mohammedia - Al Massira",
  "Mohammedia - Alia",
  "Mohammedia - Hassania",
  "Mohammedia - Hay Wafa",
  "Mohammedia - Kasbah",
  "Mohammedia - Nassim",
  "Mohammedia - Parc",
  "Moulay Abdellah",
  "Moulay Bousselham",
  "Moulay Idriss zerhouni",
  "Moulay Yacoub",
  "Mrirt",
  "Mzoudia",
  "Nador",
  "Nkoub",
  "Nouacer",
  "Ouahat Sidi Brahim",
  "Oualidia",
  "Ouaouizeght",
  "Ouarzazate",
  "Ouazzane",
  "Oued Amlil",
  "Oued law",
  "Oued Zem",
  "Ouislane",
  "Oujda",
  "Oulad Abbou",
  "Oulad Ali",
  "Oulad Amrane Region El Jadida",
  "Oulad Ayad",
  "Oulad Azzouz Dar 16",
  "Oulad Berhil",
  "Oulad Frej",
  "Oulad Mbarek",
  "Oulad Said Region de Settat",
  "Oulad Tayeb",
  "Oulad Teima",
  "Oulad Yaich",
  "Oulad Youssef",
  "Oulad Zmam",
  "Ouled Dahhou",
  "Ouled Hassoune",
  "Ouled Moumna",
  "Ouled Settout",
  "Oulmes",
  "Ounagha",
  "Ourika",
  "Outat El Haj",
  "Rabat",
  "Rabat - Hay Riad",
  "Rabat - Hassan",
  "Rabat - El Youssoufia",
  "Rabat - Souissi",
  "Rabat - Yacoub El Mansour",
  "Rabat - Madinat Al Irfane",
  "Rabat - Takaddoum",
  "Rabat - Hay Nahda",
  "Rabat - Agdal",
  "Rabat - El Akkari",
  "Rabat - Qbibat",
  "Rabat - Diour Jamaa",
  "Rabat - LOcean",
  "Rabat - Medina",
  "Ras El Ma - Cap de leau",
  "Rencon",
  "Rissani",
  "Safi",
  "Saidia",
  "Saiss",
  "Sakia El hamra",
  "Sala El Jadida - UIR",
  "Sala El Jadida - Technopolice",
  "Sala El Jadida - Maamoura",
  "Sala El Jadida",
  "Sale - Bettana",
  "Sale - Hay Chemaaou",
  "Sale - Hay Karima",
  "Sale - Laayayda",
  "Sale - Medina",
  "Sale - Sidi Moussa",
  "Sale - Hay Al Qoriaa",
  "Sale - Hay Moulay Ismail",
  "Sale - Tabriquet",
  "Sale - Said Hajji",
  "Sale - Hay Arrahma",
  "Sale - Hay inbiaat",
  "Sale",
  "Sebt Ben Sassi",
  "Sebt El Guerdane",
  "Sebt Gzoula",
  "Sebt Jahjouhe",
  "Sebt Oulad Nemma",
  "Sefrou",
  "Selouane",
  "Settat",
  "Sid LMokhtar",
  "Sidi Abdellah Ghiyat",
  "Sidi Addi",
  "Sidi Aissa",
  "Sidi Allal El Bahraoui",
  "Sidi Allal Tazi",
  "Sidi Bennour",
  "Sidi Bibi",
  "Sidi Bou Othmane",
  "Sidi bou zid Chichaoua",
  "Sidi Bouknadel",
  "Sidi Bouzid",
  "Sidi chiker",
  "Sidi El Ayedi",
  "Sidi Hajjaj Region de Settat",
  "Sidi Hrazem",
  "Sidi Hssain",
  "Sidi Ifni",
  "Sidi Jaber",
  "Sidi Kacem",
  "Sidi Kaouki",
  "Sidi Moussa Region de Marrakech",
  "Sidi rahal",
  "Sidi Slimane",
  "Sidi Smail",
  "Sidi Taibi",
  "Sidi Yahya El Gharb",
  "Sidi Zouine",
  "Skhinate",
  "Skhirat",
  "Skoura",
  "Smimou",
  "Souihla",
  "Souira Guedima",
  "Souk El Arbaa Du Gharb",
  "Souk Sebt",
  "Tafersit",
  "Tafetachte",
  "Taghazout",
  "Taghbalt",
  "Tagounite",
  "Tagzirt",
  "Tahanaout",
  "Tahla",
  "Taliouine",
  "Talmest",
  "Tamanar",
  "Tamansourt",
  "Tamaris",
  "Tamegroute",
  "Tamellalt",
  "Tameslouht",
  "Tamesna - Sidi Yahya Zaer",
  "Tamesna",
  "Tamezmoute",
  "Tamraght",
  "Tamsamane",
  "Tan-Tan",
  "Tanger",
  "Tansifte",
  "Taounate",
  "Taourirt",
  "Tarast",
  "Targuist",
  "Taroudant",
  "Tata",
  "Taza",
  "Tazarine",
  "Taznakht",
  "Telat Azlaf",
  "Temara - Oulad Mtaa",
  "Temara - Guich Oudaya",
  "Temara - Hay Massira",
  "Temara - Hay Nahda",
  "Temara - Hay Wifaq",
  "Temara - Hay Firdaous",
  "Temara - Hay Andalouss",
  "Temara - Hay Ennaser",
  "Temara - Hay Abbadi",
  "Temara",
  "Temsia",
  "Tendrara",
  "Ternata",
  "Tetouan",
  "Tiddas",
  "Tidzi",
  "Tiflet",
  "Tighassaline",
  "Tikiwin",
  "Timahdite",
  "Timezgadiouine",
  "Timoulilt",
  "Tinejdad",
  "Tinghir",
  "Tinzouline",
  "Tissa",
  "Tit Melil",
  "Tizi Ouasli",
  "Tiznit",
  "Tiztoutine",
  "Tlat Bouguedra",
  "Tleta-El Henchane",
  "Touima",
  "Tssoultante",
  "Youssoufia",
  "zaer",
  "Zagoura",
  "Zaida",
  "Zaio",
  "Zaouiat Cheikh",
  "Zeghanghane",
  "Zouada",
  "Casablanca"
];

/**
 * Get a cached city name if available
 * @param cityName The input city name
 * @returns The cached standardized name or undefined if not found
 */
function getCachedCityName(cityName: string): string | undefined {
  const normalizedCityName = cityName.trim().toLowerCase();
  const cachedValue = cityNameCache[normalizedCityName];
  
  return cachedValue;
}

/**
 * Cache a standardized city name for future lookups
 * @param inputCity The original input city name
 * @param standardizedCity The standardized city name
 */
function cacheCityName(inputCity: string, standardizedCity: string): void {
  const normalizedCityName = inputCity.trim().toLowerCase();
  cityNameCache[normalizedCityName] = standardizedCity;
}

/**
 * Standardize a Moroccan city name
 * 1. Check if it's in the cache
 * 2. Check if it matches an alternative spelling
 * 3. Check if it's an Arabic name and translate
 * 4. Check for exact match in database
 * 5. Try fuzzy matching for typos and misspellings
 * 6. If not found, use ChatGPT to standardize
 * 
 * @param cityName The city name to standardize
 * @returns The standardized city name
 */
export async function standardizeMoroccanCity(cityName: string): Promise<string> {
  if (!cityName) {
    return cityName;
  }
  
  // 1. Check the cache first for quick responses
  const trimmedCityName = cityName.trim();
  
  const cachedResult = getCachedCityName(trimmedCityName);
  
  if (cachedResult) {
    return cachedResult;
  }
  
  // Fully normalize the city name to handle diacritics and accented characters
  const normalizedCityName = normalizeString(trimmedCityName);
  
  // Try to get a cached result for the normalized version
  const cachedNormalizedResult = getCachedCityName(normalizedCityName);
  if (cachedNormalizedResult) {
    cacheCityName(trimmedCityName, cachedNormalizedResult); // Cache the original input too
    return cachedNormalizedResult;
  }
  
  // 2. Check if it matches an alternative spelling
  const lowercaseCityName = trimmedCityName.toLowerCase();
  if (ALTERNATIVE_CITY_SPELLINGS[lowercaseCityName]) {
    const standardName = ALTERNATIVE_CITY_SPELLINGS[lowercaseCityName];
    cacheCityName(trimmedCityName, standardName);
    return standardName;
  }
  
  // 3. Check for Arabic city names and use enhanced translation function
  if (containsArabic(trimmedCityName)) {
    const translatedName = translateArabicCityName(trimmedCityName);
    
    if (translatedName) {
      cacheCityName(trimmedCityName, translatedName);
      return translatedName;
    }
  }
  
  // 4. Look for exact match in the database after normalization
  let exactMatch = null;
  
  // First try with the trimmed version (preserve case)
  exactMatch = MOROCCAN_CITIES.find(city => city === trimmedCityName);
  
  if (!exactMatch) {
    // Then try to match using normalized versions of both the input and the database cities
    exactMatch = MOROCCAN_CITIES.find(city => normalizeString(city) === normalizedCityName);
  }
  
  if (exactMatch) {
    cacheCityName(trimmedCityName, exactMatch);
    return exactMatch;
  }
  
  // 5. Try fuzzy matching for typos and misspellings
  const fuzzyMatch = findBestCityMatch(trimmedCityName);
  if (fuzzyMatch) {
    cacheCityName(trimmedCityName, fuzzyMatch);
    return fuzzyMatch;
  }
  
  // 6. If not found in database, use ChatGPT to get a match
  try {
    const gptResult = await standardizeWithGPT(trimmedCityName, MOROCCAN_CITIES);
    
    if (!gptResult) {
      return trimmedCityName;
    }
    
    cacheCityName(trimmedCityName, gptResult);
    return gptResult;
  } catch (gptError) {
    return trimmedCityName;
  }
}

/**
 * Synchronous version of standardizeMoroccanCity that only checks the database
 * Returns null if not in database (caller should then use the async version)
 * @param cityName The city name to standardize
 * @returns The standardized city name or null if not found in database
 */
export function standardizeMoroccanCitySync(cityName: string): string | null {
  if (!cityName) return cityName;
  
  const trimmedCityName = cityName.trim();
  
  // Return cached result if available
  const cachedResult = getCachedCityName(trimmedCityName);
  if (cachedResult) return cachedResult;
  
  // Normalize the city name to handle accents and diacritics
  const normalizedCityName = normalizeString(trimmedCityName);
  
  // Try to get a cached result for the normalized version
  const cachedNormalizedResult = getCachedCityName(normalizedCityName);
  if (cachedNormalizedResult) {
    cacheCityName(trimmedCityName, cachedNormalizedResult); // Cache the original input too
    return cachedNormalizedResult;
  }
  
  // Check alternative spellings
  const lowercaseCityName = trimmedCityName.toLowerCase();
  if (ALTERNATIVE_CITY_SPELLINGS[lowercaseCityName]) {
    const standardName = ALTERNATIVE_CITY_SPELLINGS[lowercaseCityName];
    cacheCityName(trimmedCityName, standardName);
    return standardName;
  }
  
  // For Arabic names, check the mapping
  if (containsArabic(trimmedCityName)) {
    const translatedName = translateArabicCityName(trimmedCityName);
    if (translatedName) {
      cacheCityName(trimmedCityName, translatedName);
      return translatedName;
    }
  }
  
  // Check for exact match in the database
  let exactMatch = MOROCCAN_CITIES.find(city => city === trimmedCityName);
  
  if (!exactMatch) {
    // Try to match using normalized versions
    exactMatch = MOROCCAN_CITIES.find(city => normalizeString(city) === normalizedCityName);
  }
  
  if (exactMatch) {
    cacheCityName(trimmedCityName, exactMatch);
    return exactMatch;
  }
  
  // If no match found, return null to indicate we need the async version
  return null;
}

/**
 * Get all standard city names
 * For debugging or UI autocomplete
 */
export function getAllStandardCities(): string[] {
  return [...MOROCCAN_CITIES];
} 