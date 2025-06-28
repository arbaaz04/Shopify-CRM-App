import { useCallback, useEffect, useState, useMemo } from "react";
import {
  Page,
  Layout,
  Button,
  Card,
  FormLayout,
  TextField,
  Spinner,
  Banner,
  Text,
  SkeletonBodyText,
  Form,
  BlockStack,
  Divider,
  RadioButton,
  ButtonGroup,
  Badge,
  ResourceList,
  ResourceItem,
  InlineStack,
  Select,
  Tabs,
  Pagination,
  Filters,
  ChoiceList,
} from "@shopify/polaris";
import { PlusIcon, DeleteIcon } from "@shopify/polaris-icons";
import { api } from "../api";
import { useGadget } from "@gadgetinc/react-shopify-app-bridge";

// Default city lists for each courier type
const DEFAULT_SENDIT_CITIES = [
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

const DEFAULT_SPEEDAF_CITIES = [
  "SEMARA, essemara, MAA04356, MAC00099",
"RAHMA, Nouaceur, MAA04355, MAC00059",
"ROCHE NOIR, casablanca, MAA04354, MAC00070",
"Rue Choukri Mostapha Pitchou, casablanca, MAA04353, MAC00070",
"Benslimane, temara, MAA04352, MAC00092",
"Rue Al Bassatine, casablanca, MAA04351, MAC00070",
"Hay Raha, casablanca, MAA04350, MAC00070",
"Roudani, casablanca, MAA04349, MAC00070",
"rue avesnes angle rue albert, casablanca, MAA04348, MAC00070",
"Siege royal air maroc, casablanca, MAA04347, MAC00070",
"Rue al mansour al abidi, casablanca, MAA04346, MAC00070",
"Rue Zineb Ishak, casablanca, MAA04345, MAC00070",
"allée des Perses, casablanca, MAA04344, MAC00070",
"rue abou bakr wahrani, casablanca, MAA04343, MAC00070",
"op acharaf, casablanca, MAA04342, MAC00070",
"avenue hassan souktani, casablanca, MAA04341, MAC00070",
"DRIOUCH, Al Hoceïma, MAA04340, MAC00031",
"driouch, الدريوش, MAA04339, MAC00097",
"RUE MAARAKAT AIT ABDELLAH, casablanca, MAA04338, MAC00070",
"Residence du palais, casablanca, MAA04337, MAC00070",
"rue prosper mérimée, casablanca, MAA04336, MAC00070",
"Rue Al Moubarrid, casablanca, MAA04335, MAC00070",
"rue Amina Bent Wahab, casablanca, MAA04334, MAC00070",
"rue Abderrahman el kaouakibi, casablanca, MAA04333, MAC00070",
"rue van zeeland, casablanca, MAA04332, MAC00070",
"place nations unies, casablanca, MAA04331, MAC00070",
"derb El madania, casablanca, MAA04330, MAC00070",
"rue saria ben zounaim, casablanca, MAA04329, MAC00070",
"quartier Ghautier, casablanca, MAA04328, MAC00070",
"Rue la lande, casablanca, MAA04327, MAC00070",
"HAY TARIK, casablanca, MAA04326, MAC00070",
"Rue abou kacem zahraoui, casablanca, MAA04325, MAC00070",
"quartier les cretes casablanca, casablanca, MAA04324, MAC00070",
"ghandi mall, casablanca, MAA04323, MAC00070",
"Cité Guynemer, casablanca, MAA04322, MAC00070",
"rue sidi fateh, casablanca, MAA04321, MAC00070",
"rue biskra, casablanca, MAA04320, MAC00070",
"ot tazi & Miloud, les crêtes, casablanca, MAA04319, MAC00070",
"rue de berne, casablanca, MAA04318, MAC00070",
"bd alqods, casablanca, MAA04317, MAC00070",
"arest el kbir, casablanca, MAA04316, MAC00070",
"rue abou Faraj al asbahani, casablanca, MAA04315, MAC00070",
"salmia 2, casablanca, MAA04314, MAC00070",
"rue d' Anizy, casablanca, MAA04313, MAC00070",
"Rue immam attabarani, casablanca, MAA04312, MAC00070",
"rue imam el boussairi, casablanca, MAA04311, MAC00070",
"rue ibnou sali, casablanca, MAA04310, MAC00070",
"JEMAA IDA OUSSEMLAL, AGADIR, MAA04309, MAC00022",
"ROMMANI, khemisset, MAA04308, MAC00093",
"rue saria ibnou zounaim, casablanca, MAA04307, MAC00070",
"lotissement assakane al monaoaure, casablanca, MAA04306, MAC00070",
"rue charam cheikh, casablanca, MAA04305, MAC00070",
"hay moulay abdellah, casablanca, MAA04304, MAC00070",
"allee de Persée, casablanca, MAA04303, MAC00070",
"Rue El Manaziz, casablanca, MAA04302, MAC00070",
"Rue Moliére et Bd Abdellatif benkadour, casablanca, MAA04301, MAC00070",
"Rue Souleimane el Farissi, casablanca, MAA04300, MAC00070",
"l’oulfa, casablanca, MAA04299, MAC00070",
"LOT  LA COLLINE, casablanca, MAA04298, MAC00070",
"PLACE LOUIS PASTEUR, casablanca, MAA04297, MAC00070",
"BLVD de la corniche, casablanca, MAA04296, MAC00070",
"hay anigret, casablanca, MAA04295, MAC00070",
"rue lahcen laarjoun, casablanca, MAA04294, MAC00070",
"hay elmassira, casablanca, MAA04293, MAC00070",
"Hay Amal 2, casablanca, MAA04292, MAC00070",
"bv abi houraira, casablanca, MAA04291, MAC00070",
"hay jamal bd fouarat, casablanca, MAA04290, MAC00070",
"lot diyar azhari, casablanca, MAA04289, MAC00070",
"Rue ibnou kattan, casablanca, MAA04288, MAC00070",
"rue ibnou toufail, casablanca, MAA04287, MAC00070",
"Hay mohemadi, casablanca, MAA04286, MAC00070",
"rue taoujtate, casablanca, MAA04285, MAC00070",
"rue andromêde, casablanca, MAA04284, MAC00070",
"dar16, dar bouaza, MAA04283, MAC00095",
"SAKANI ALAZHAR, casablanca, MAA04282, MAC00070",
"rue Ibnou Bouraid, casablanca, MAA04281, MAC00070",
"rue du lierre, casablanca, MAA04280, MAC00070",
"rue la place, casablanca, MAA04279, MAC00070",
"rue el Ourjouane hay raha, casablanca, MAA04278, MAC00070",
"rue bahaa sanjari, casablanca, MAA04277, MAC00070",
"Derb Takadoum, casablanca, MAA04276, MAC00070",
"rue hadj Ahmed balafrej, casablanca, MAA04275, MAC00070",
"Masira 3, casablanca, MAA04274, MAC00070",
"Rue Abou Soufiane Attouri, casablanca, MAA04273, MAC00070",
"rue du Gabon, casablanca, MAA04272, MAC00070",
"rue ibnou sabadih, casablanca, MAA04271, MAC00070",
"BD TARIQ EL OUAHDA, casablanca, MAA04270, MAC00070",
"ain defali, ain dfali, MAA04269, MAC00094",
"hay nassim, casablanca, MAA04268, MAC00070",
"HOWARA, Inezgane - Ait Melloul, MAA04267, MAC00023",
"tamanar, Essaouira, MAA04266, MAC00021",
"Tiflet, khemisset, MAA04265, MAC00093",
"hay enassim, casablanca, MAA04264, MAC00070",
"EL MANSOURIA, Benslimane, MAA04263, MAC00074",
"avenu moulay rchid, casablanca, MAA04262, MAC00070",
"rue capitaine bouserghine hammadi, casablanca, MAA04261, MAC00070",
"HERAOUINE, Médiouna, MAA04260, MAC00072",
"HAY RAHMA, casablanca, MAA04259, MAC00070",
"SIDI YAHYA GHARB, sidi yahya gharb, MAA04258, MAC00091",
"عقبة بن نافع, casablanca, MAA04257, MAC00070",
"IMILCHIL, imilchil, MAA04256, MAC00090",
"DEMNATE, Khenifra, MAA04255, MAC00053",
"Rue des mesanges, casablanca, MAA04254, MAC00070",
"LOT NASSIM ISLANE, casablanca, MAA04253, MAC00070",
"cite guynemer, casablanca, MAA04252, MAC00070",
"SIDI ALI BEN HAMDOUCHE, El Jadida, MAA04251, MAC00035",
"Residence Guynemer, casablanca, MAA04250, MAC00070",
"Rue Abou Maachar, casablanca, MAA04249, MAC00070",
"Hay Amal, casablanca, MAA04248, MAC00070",
"rue abou abass al azfi, casablanca, MAA04247, MAC00070",
"Rue IBNOU ESSALI, casablanca, MAA04246, MAC00070",
"Hay enour, casablanca, MAA04245, MAC00070",
"boulevard ibnou adraa morakochi, casablanca, MAA04244, MAC00070",
"rue hafid ibrahim, casablanca, MAA04243, MAC00070",
"hay ouled herres, casablanca, MAA04242, MAC00070",
"KAA ASRASS, Tetouan, MAA04241, MAC00040",
"LOTS VIOLETTES, casablanca, MAA04240, MAC00070",
"Résidence andaloussia, casablanca, MAA04239, MAC00070",
"Rue Mamoun Mohamed, casablanca, MAA04238, MAC00070",
"Rue Abou El Hassan Es-Séghir, casablanca, MAA04237, MAC00070",
"Bd Mohammed 6, casablanca, MAA04236, MAC00070",
"حي سلامة, casablanca, MAA04235, MAC00070",
"Rue Abou Youssef Al Mazdaghi, casablanca, MAA04234, MAC00070",
"Rue de sidi bennour, casablanca, MAA04233, MAC00070",
"Boulevard Abachouaib Doukali, casablanca, MAA04232, MAC00070",
"Rue Attabib, casablanca, MAA04231, MAC00070",
"Rue Saint Omer, casablanca, MAA04230, MAC00070",
"rue lalla taja, casablanca, MAA04229, MAC00070",
"Rue Jilali Ghafiri, casablanca, MAA04228, MAC00070",
"Rue Kaid al Achtar, casablanca, MAA04227, MAC00070",
"EL HAGOUNIA, Laayoune, MAA04226, MAC00049",
"HOTEL KENZI, casablanca, MAA04225, MAC00070",
"Rue d'Alger, casablanca, MAA04224, MAC00070",
"Onomo hotel, casablanca, MAA04223, MAC00070",
"DERB FOUKARA, casablanca, MAA04222, MAC00070",
"Rue Ibnou Wahboune, casablanca, MAA04221, MAC00070",
"Ain chifa 3, casablanca, MAA04220, MAC00070",
"Rue de Varsovie, casablanca, MAA04219, MAC00070",
"Lot arset lekbir, casablanca, MAA04218, MAC00070",
"DB EL MITTER, casablanca, MAA04217, MAC00070",
"rue Abdellah el makoudi, casablanca, MAA04216, MAC00070",
"rue 10 mars, casablanca, MAA04215, MAC00070",
"Rue ait baha, casablanca, MAA04214, MAC00070",
"RUE EMIR ABDELKADER, casablanca, MAA04213, MAC00070",
"boulevard ziraoui, casablanca, MAA04212, MAC00070",
"Rue Ibrahim Allamtouni, casablanca, MAA04211, MAC00070",
"Résidences les champs du printemps, casablanca, MAA04210, MAC00070",
"Boulevard Lahcen Ouiddar, casablanca, MAA04209, MAC00070",
"Arba Aounate, El Jadida, MAA04208, MAC00035",
"CFC, casablanca, MAA04207, MAC00070",
"RÉSIDENCE PENINSULA, casablanca, MAA04206, MAC00070",
"Rue Ibnou Assakir, casablanca, MAA04205, MAC00070",
"Rue Abderrahmane El Mkhanet, casablanca, MAA04204, MAC00070",
"Chu rue des hôpitaux, casablanca, MAA04203, MAC00070",
"Youssoufia Est Rabat, Rabat, MAA04202, MAC00001",
"Rue Franche Comté, casablanca, MAA04201, MAC00070",
"Rue Mostafa el Maani, casablanca, MAA04200, MAC00070",
"rue al kassarRue Al Kassar, casablanca, MAA04199, MAC00070",
"Rue Abou Al Wakt Khalaf, casablanca, MAA04198, MAC00070",
"Rue Benvenuto Cellini, casablanca, MAA04197, MAC00070",
"لولفا, casablanca, MAA04196, MAC00070",
"Rue Lalande, casablanca, MAA04195, MAC00070",
"QUARTIER ERRACHIDIA Fes, FES, MAA04194, MAC00004",
"bab taghzout arset berrahmoune, Marrakech, MAA04193, MAC00014",
"Rue Abou Bakr Mohamed Ibn Zaher, casablanca, MAA04192, MAC00070",
"Rue Driss Ben Abdeslam, casablanca, MAA04191, MAC00070",
"madinati azhar, casablanca, MAA04190, MAC00070",
"rue avesnes, casablanca, MAA04189, MAC00070",
"AGDAL, Rabat, MAA04188, MAC00001",
"Rue de la Fraternité, casablanca, MAA04187, MAC00070",
"Rue La Fontaine, casablanca, MAA04186, MAC00070",
"OUKACHA TECMACO, casablanca, MAA04185, MAC00070",
"Dakhla, Dakhla, MAA04184, MAC00085",
"LKRIMAT, casablanca, MAA04182, MAC00070",
"Residence lilya, casablanca, MAA04181, MAC00070",
"حي مولاي عبدالله, casablanca, MAA04180, MAC00070",
"Lamharza, BIR JDID, MAA04179, MAC00089",
"ola blanca, SIDI RAHAL, MAA04178, MAC00088",
"sidi mohamed ben abdellah, casablanca, MAA04177, MAC00070",
"hay mohammadi, Benslimane, MAA04176, MAC00074",
"PROJET HASSAN 2 HAY MOHAMMEDI, casablanca, MAA04175, MAC00070",
"RUE AIT BAAMRANE, casablanca, MAA04174, MAC00070",
"DB MIMOUNA II, casablanca, MAA04173, MAC00070",
"DIOUR JAMAA, casablanca, MAA04172, MAC00070",
"DR MEDIOUNI BIR AABIDI, casablanca, MAA04171, MAC00070",
"BD KODS RESIDENCE ADAMAN, casablanca, MAA04170, MAC00070",
"douar wled mellouk, casablanca, MAA04169, MAC00070",
"HAY MISSIMI, casablanca, MAA04168, MAC00070",
"RUE RAHAL BEN AHMED, casablanca, MAA04167, MAC00070",
"DERB ABDELLAH, casablanca, MAA04166, MAC00070",
"PLACE CANTALE MAARIF, casablanca, MAA04164, MAC00070",
"RUE ABOU OMAR EL HARITE, casablanca, MAA04163, MAC00070",
"RUE D'ATHENES, casablanca, MAA04162, MAC00070",
"AV 10 MARS, casablanca, MAA04161, MAC00070",
"DOUAR LAHOUAMI BOUJAADIA, casablanca, MAA04160, MAC00070",
"BLOC SAADA HAY MOHAMMADI, casablanca, MAA04159, MAC00070",
"HAY EL IDRISSIA, casablanca, MAA04158, MAC00070",
"RUE IBNOU HALAKA, casablanca, MAA04157, MAC00070",
"rue Caporal Corbi, casablanca, MAA04156, MAC00070",
"Derb Moulay Cherif, casablanca, MAA04155, MAC00070",
"RUE JABIR EL ANSSARI DB GHALEF, casablanca, MAA04154, MAC00070",
"DERB KHALIFA CITE DJEMAA, casablanca, MAA04153, MAC00070",
"LOTISSEMENT POLYGONE, casablanca, MAA04152, MAC00070",
"Cite D'jemaa, casablanca, MAA04151, MAC00070",
"Itisal, casablanca, MAA04150, MAC00070",
"Rue ibnou khalikane, casablanca, MAA04149, MAC00070",
"rue el jihani, casablanca, MAA04148, MAC00070",
"Main street, casablanca, MAA04147, MAC00070",
"Rue Madrid, casablanca, MAA04146, MAC00070",
"rue tata, casablanca, MAA04145, MAC00070",
"bouchentouf, casablanca, MAA04144, MAC00070",
"rue Abou Al Waqt, casablanca, MAA04143, MAC00070",
"bd de l’aéropostale, casablanca, MAA04142, MAC00070",
"bd yaakoub el mansour, casablanca, MAA04141, MAC00070",
"nasim islan, casablanca, MAA04140, MAC00070",
"allee des casuarinas, casablanca, MAA04139, MAC00070",
"bd Hassan Al Alaoui, casablanca, MAA04138, MAC00070",
"rue taoufik alhakim, casablanca, MAA04137, MAC00070",
"rue najib mahfoud, casablanca, MAA04136, MAC00070",
"Résidence Ambar 3, casablanca, MAA04135, MAC00070",
"Rue Blida, casablanca, MAA04134, MAC00070",
"Rue Abou kassem Ex Babylone, casablanca, MAA04133, MAC00070",
"rue al yarmouk, casablanca, MAA04132, MAC00070",
"rue kaddi bekkar, casablanca, MAA04131, MAC00070",
"شارع تدارت, casablanca, MAA04130, MAC00070",
"rue ibnou katir maarif, casablanca, MAA04129, MAC00070",
"feddane nassib, casablanca, MAA04128, MAC00070",
"Bd abou baker el kadiri, casablanca, MAA04127, MAC00070",
"Rue abou al mahassine royani, casablanca, MAA04126, MAC00070",
"Lot smiralda les orangers, casablanca, MAA04125, MAC00070",
"rue ibnou assnaani, casablanca, MAA04124, MAC00070",
"Rue Jilali Ben Tajeddine, casablanca, MAA04123, MAC00070",
"bd d'alsace, casablanca, MAA04122, MAC00070",
"Lot ouled taleb, casablanca, MAA04121, MAC00070",
"hay chadia, casablanca, MAA04120, MAC00070",
"Rue Moussa ben Noussair, casablanca, MAA04119, MAC00070",
"Résidence ambar 2, casablanca, MAA04118, MAC00070",
"OUAOUIZARHT, Beni Mellal, MAA04117, MAC00066",
"Km 7.3 Route de RABAT, casablanca, MAA04116, MAC00070",
"rue Malik Ibnou morhil, casablanca, MAA04115, MAC00070",
"rue Mohamed elyazidi, casablanca, MAA04114, MAC00070",
"Rue Lahcen El Basri, casablanca, MAA04113, MAC00070",
"rue el kaissi, casablanca, MAA04112, MAC00070",
"Rue IMAM HARAMAIN, casablanca, MAA04111, MAC00070",
"souk larbaa du gharb, Kenitra, MAA04110, MAC00068",
"Sidi Yahya Zaër, Rabat, MAA04108, MAC00001",
"rue abdelkader sahraoui, casablanca, MAA04107, MAC00070",
"sidi maarouf 5, casablanca, MAA04105, MAC00070",
"ain jamaa, Berrechid, MAA04104, MAC00058",
"bd yaakoub manssour, Mohammedia, MAA04103, MAC00071",
"RUE AGADIR, Berrechid, MAA04102, MAC00058",
"boulevard mohamed 5, Médiouna, MAA04101, MAC00072",
"plage Essanaoubar, Mohammedia, MAA04100, MAC00071",
"Rue  ibn habbous, casablanca, MAA04099, MAC00070",
"Rue Duhaume, casablanca, MAA04098, MAC00070",
"rue houssine soussi, casablanca, MAA04097, MAC00070",
"HAY FATH, casablanca, MAA04096, MAC00070",
"Allée d’andromède, casablanca, MAA04095, MAC00070",
"hay andalouss, casablanca, MAA04094, MAC00070",
"Rue benghazala, casablanca, MAA04093, MAC00070",
"Rue el mourtada, casablanca, MAA04092, MAC00070",
"rue ibn chahid, casablanca, MAA04091, MAC00070",
"Casa port, casablanca, MAA04090, MAC00070",
"Hay masjid, casablanca, MAA04089, MAC00070",
"rue ahmed elmajjati, casablanca, MAA04088, MAC00070",
"rue oumaima saih, casablanca, MAA04087, MAC00070",
"rue assourkostie, casablanca, MAA04086, MAC00070",
"Rue Daoud Eddahiri, casablanca, MAA04085, MAC00070",
"Rue des Acacias, casablanca, MAA04084, MAC00070",
"taourirt, Taourirt, MAA04083, MAC00028",
"Bni hadifa, Al Hoceïma, MAA04082, MAC00031",
"rue ibnou habib, casablanca, MAA04081, MAC00070",
"rue almansour al abidi, casablanca, MAA04080, MAC00070",
"rue abdelhamid bnou badiss, casablanca, MAA04079, MAC00070",
"Boulevard Driss Slaoui, casablanca, MAA04078, MAC00070",
"MY LARBI ALAOUI, casablanca, MAA04077, MAC00070",
"abou moussa eljazouli, casablanca, MAA04076, MAC00070",
"Route de Rabat, Km 7.3, casablanca, MAA04075, MAC00070",
"ARBAA AOUNATE, El Jadida, MAA04074, MAC00035",
"rue cours des sports raja store, casablanca, MAA04073, MAC00070",
"Rue Allal Ben Ahmed Amkik, casablanca, MAA04072, MAC00070",
"Rue de Guise, casablanca, MAA04071, MAC00070",
"rue carthage, casablanca, MAA04070, MAC00070",
"rue bnou khalouia, casablanca, MAA04069, MAC00070",
"polygone ZI lot n*2 AS, casablanca, MAA04068, MAC00070",
"RUE LAHCEN EL BASRI, casablanca, MAA04067, MAC00070",
"Madina jadida, casablanca, MAA04066, MAC00070",
"rue assaad ibn zerrara, casablanca, MAA04065, MAC00070",
"Rue Maurice Ravel, casablanca, MAA04064, MAC00070",
"Hay mohamed ben lhssen louazani, casablanca, MAA04063, MAC00070",
"الأزهر عود البيض, casablanca, MAA04062, MAC00070",
"rue Abou Bakr Mohamed Ibnou Zahr, casablanca, MAA04061, MAC00070",
"Rue caid el achtar, casablanca, MAA04060, MAC00070",
"Rue Badr Assayab, casablanca, MAA04059, MAC00070",
"rue amina bent wahab, casablanca, MAA04058, MAC00070",
"rue hassan bnou tabit, casablanca, MAA04057, MAC00070",
"rue zakour ablaoui, casablanca, MAA04056, MAC00070",
"Palmier palace unité 4, casablanca, MAA04055, MAC00070",
"sidibad rubis, casablanca, MAA04053, MAC00070",
"rue la garonne, casablanca, MAA04052, MAC00070",
"MABROUKA DB BENANNI, casablanca, MAA04051, MAC00070",
"Hay assourour, casablanca, MAA04050, MAC00070",
"rue epinal, casablanca, MAA04049, MAC00070",
"rue ibnou assakir, casablanca, MAA04048, MAC00070",
"Andromèd, casablanca, MAA04047, MAC00070",
"Rue Abou Yaala Al Ifrani, casablanca, MAA04046, MAC00070",
"Ain chifa 2, casablanca, MAA04045, MAC00070",
"RUE OUSSAMA IBN ZAID, casablanca, MAA04044, MAC00070",
"rue ahmed mokri, casablanca, MAA04043, MAC00070",
"espace socrate, casablanca, MAA04042, MAC00070",
"Rue de Zerhoun, casablanca, MAA04041, MAC00070",
"Rue Ahmed Barakat, casablanca, MAA04040, MAC00070",
"Résidence Les Allées marines, casablanca, MAA04039, MAC00070",
"place al yasser, casablanca, MAA04038, MAC00070",
"Derb el manjra, casablanca, MAA04037, MAC00070",
"Siege social Societe generale, casablanca, MAA04036, MAC00070",
"bd abdelkader Sahrroui, casablanca, MAA04035, MAC00070",
"bd rehal El meskini, casablanca, MAA04034, MAC00070",
"rue Ali bnou abi taleb, casablanca, MAA04033, MAC00070",
"القريعة, casablanca, MAA04032, MAC00070",
"cité universitaire triq el jadida, casablanca, MAA04031, MAC00070",
"avenu khalifa ben ismail, casablanca, MAA04030, MAC00070",
"Lakremat, casablanca, MAA04029, MAC00070",
"AOUSSERD, Dakhla, MAA04028, MAC00085",
"زنقة سلطان عبد الحميد, casablanca, MAA04027, MAC00070",
"Salama 3, casablanca, MAA04026, MAC00070",
"bd Brahim Roudani, casablanca, MAA04025, MAC00070",
"rue du marchee maarif, casablanca, MAA04024, MAC00070",
"Rue Ibn Tofail, casablanca, MAA04023, MAC00070",
"rue abou Marouane AbdeLmalek, casablanca, MAA04022, MAC00070",
"rue des asphodèles, casablanca, MAA04021, MAC00070",
"lot elyakssour, casablanca, MAA04020, MAC00070",
"Rue Chajarat Addor, casablanca, MAA04019, MAC00070",
"الفوارات, casablanca, MAA04017, MAC00070",
"Rue al maadan , route cotiere n 111,km 11, casablanca, MAA04016, MAC00070",
"mabrouka avenue10 mars, casablanca, MAA04015, MAC00070",
"clinique Maghreb, casablanca, MAA04014, MAC00070",
"rue el farabi derb baladia, casablanca, MAA04013, MAC00070",
"rue Jean Jaures, casablanca, MAA04012, MAC00070",
"avenue hassan seghir, casablanca, MAA04011, MAC00070",
"derb Khalid CD, casablanca, MAA04010, MAC00070",
"Rue de l’imam Kabbab, casablanca, MAA04009, MAC00070",
"rue mustapha elmanfalouti, casablanca, MAA04008, MAC00070",
"bd oude ziz, casablanca, MAA04007, MAC00070",
"Rue Abou Alaa Zahr, casablanca, MAA04006, MAC00070",
"Rue Babylone, casablanca, MAA04005, MAC00070",
"LOTIS RAHMANI, casablanca, MAA04004, MAC00070",
"rue des plateformes, casablanca, MAA04003, MAC00070",
"Rue ibnou morhil, casablanca, MAA04002, MAC00070",
"la colline sidimaarouf, casablanca, MAA04001, MAC00070",
"Lot jardin majorelle, casablanca, MAA04000, MAC00070",
"Rue des Coriandres, casablanca, MAA03999, MAC00070",
"Anfa aerocity, casablanca, MAA03998, MAC00070",
"Piste taddart, casablanca, MAA03997, MAC00070",
"rue abtal, casablanca, MAA03996, MAC00070",
"boulevard d'Alsace, casablanca, MAA03995, MAC00070",
"brahim nakhai, casablanca, MAA03994, MAC00070",
"hay  karia, SALE, MAA03993, MAC00002",
"ARRAHMA 2, casablanca, MAA03992, MAC00070",
"Jorf El Melha, Kenitra, MAA03990, MAC00068",
"hay tassahoul, casablanca, MAA03988, MAC00070",
"tamaris, Berrechid, MAA03987, MAC00058",
"El Attaouia, El Kelaa des Sraghna, MAA03986, MAC00015",
"Dmnate, Azilal, MAA03985, MAC00052",
"Boumalne Dades, Boulemane, MAA03984, MAC00055",
"hay el jadid, Al Hoceïma, MAA03983, MAC00031",
"sidi moumen jadid, casablanca, MAA03982, MAC00070",
"chtouka ait baha, Chtouka - Ait Baha, MAA03981, MAC00045",
"Had soualem, El Jadida, MAA03980, MAC00035",
"dar 16, casablanca, MAA03979, MAC00070",
"Université internationale de rabat, Rabat, MAA03978, MAC00001",
"Douar oueld ghanem, casablanca, MAA03977, MAC00070",
"rue abou ishak el marouni, casablanca, MAA03976, MAC00070",
"rue arago et tarik ibnou ziad, casablanca, MAA03975, MAC00070",
"DERB LEKRAM, casablanca, MAA03974, MAC00070",
"rue assoundous, casablanca, MAA03973, MAC00070",
"Rue abou hayan elgharnati, casablanca, MAA03972, MAC00070",
"rue Turgot, casablanca, MAA03971, MAC00070",
"حي مولاي رشيد, casablanca, MAA03970, MAC00070",
"Rue Zaki Eddine Taoussi, casablanca, MAA03969, MAC00070",
"الحسين سوسي, casablanca, MAA03968, MAC00070",
"Rue mohamed alhoudaiki, casablanca, MAA03967, MAC00070",
"حي الصدري, casablanca, MAA03966, MAC00070",
"ahlam Sakane 2, casablanca, MAA03965, MAC00070",
"rue soumia, casablanca, MAA03964, MAC00070",
"Rue soulaimane azmi, casablanca, MAA03963, MAC00070",
"BENAHMED, Berrechid, MAA03962, MAC00058",
"Résidence BO 52, casablanca, MAA03961, MAC00070",
"Hay Katafa, casablanca, MAA03960, MAC00070",
"rue mohamed elbitali, casablanca, MAA03959, MAC00070",
"Rue Abou Marouane Abdelmalek, casablanca, MAA03958, MAC00070",
"حي الفضل شارع سمارة, casablanca, MAA03957, MAC00070",
"Hay rahmani, casablanca, MAA03956, MAC00070",
"allee des persee, casablanca, MAA03955, MAC00070",
"RUE AZIZ BILAL, casablanca, MAA03954, MAC00070",
"rue Ibn Al Athir, casablanca, MAA03953, MAC00070",
"rue BHALIL, casablanca, MAA03952, MAC00070",
"rue Ourjouane, casablanca, MAA03951, MAC00070",
"Rue Mozart, casablanca, MAA03950, MAC00070",
"rue pleades, casablanca, MAA03949, MAC00070",
"LOTISSEMENT BACHKOU, casablanca, MAA03948, MAC00070",
"rue michel ange, casablanca, MAA03947, MAC00070",
"blvd med bouzaian, casablanca, MAA03946, MAC00070",
"azhar panorama, casablanca, MAA03945, MAC00070",
"RUE MOHAMED EL HAYANI, casablanca, MAA03944, MAC00070",
"résidence fida 1, casablanca, MAA03943, MAC00070",
"La perle de nouaceur 1, Berrechid, MAA03942, MAC00058",
"rue ali Abderrazzak, casablanca, MAA03941, MAC00070",
"Hey ennasr 2, casablanca, MAA03940, MAC00070",
"بوليفارد الرئيس فيليكس هوفويت بوانيي, casablanca, MAA03939, MAC00070",
"Avenue Chaouki Jilali Meskini, casablanca, MAA03938, MAC00070",
"hay lamia, casablanca, MAA03937, MAC00070",
"rue Moustapha el manfalouti Gauthier, casablanca, MAA03936, MAC00070",
"castor, casablanca, MAA03935, MAC00070",
"TISSA, FES, MAA03934, MAC00004",
"Lahraouiyine, Médiouna, MAA03933, MAC00072",
"Sidi Rahal, Berrechid, MAA03931, MAC00058",
"rue Rahal ben Ahmed, casablanca, MAA03930, MAC00070",
"rue taha houcine, casablanca, MAA03929, MAC00070",
"boulvard tah, casablanca, MAA03927, MAC00070",
"Bd fes, residence jardins californie, casablanca, MAA03926, MAC00070",
"Lotissement ASSAKANE AL MOUNAWAR, casablanca, MAA03925, MAC00070",
"rue zoubir ben al ouam, casablanca, MAA03924, MAC00070",
"hay douma, casablanca, MAA03923, MAC00070",
"Société des boissons du maroc, casablanca, MAA03922, MAC00070",
"cité ONCf bd My Ismail, casablanca, MAA03921, MAC00070",
"kasbat amine, casablanca, MAA03920, MAC00070",
"rue bab El mansour, hay El Hana, casablanca, MAA03919, MAC00070",
"rue la fontaine, casablanca, MAA03918, MAC00070",
"rue abou abdellah nafii, casablanca, MAA03917, MAC00070",
"rue oussama bno zaid, casablanca, MAA03916, MAC00070",
"Place des Nations-Unies, casablanca, MAA03915, MAC00070",
"lot zoubir, casablanca, MAA03914, MAC00070",
"rue abou kacem et zehari, casablanca, MAA03913, MAC00070",
"Rue Laplace, casablanca, MAA03912, MAC00070",
"hay jamal, casablanca, MAA03911, MAC00070",
"Rue Lahcen Al Aarjoune, casablanca, MAA03910, MAC00070",
"Twin Centre, casablanca, MAA03909, MAC00070",
"rue attabarie, casablanca, MAA03908, MAC00070",
"RUE FRANCOIS PONSARD, casablanca, MAA03907, MAC00070",
"lot lafarge, Nouaceur, MAA03906, MAC00059",
"Rue Moulay bouchaib, casablanca, MAA03905, MAC00070",
"rue salim cherkaoui, casablanca, MAA03904, MAC00070",
"SUN SQARE, Nouaceur, MAA03902, MAC00059",
"Impasse Abdelhak El Kadmiri, casablanca, MAA03901, MAC00070",
"Rue Prosper Merimee, casablanca, MAA03900, MAC00070",
"rue Brahim Ibnou Adam, casablanca, MAA03899, MAC00070",
"Résidence Khouribga, casablanca, MAA03897, MAC00070",
"Royal Air Maroc (Siège Social), casablanca, MAA03895, MAC00070",
"Bd Moulay Abdellah Cherif, casablanca, MAA03894, MAC00070",
"Rue Mohamed El Radi Slaoui, casablanca, MAA03893, MAC00070",
"Rue Assakhaoui, casablanca, MAA03892, MAC00070",
"derb tazi, casablanca, MAA03891, MAC00070",
"HAY AL WALAA, casablanca, MAA03890, MAC00070",
"hay moulay rchid, Laayoune, MAA03889, MAC00049",
"Bd Okba bnou nafii, casablanca, MAA03888, MAC00070",
"Hay Al Inara, Mohammedia, MAA03887, MAC00071",
"derb laadam, casablanca, MAA03886, MAC00070",
"hay salama3, casablanca, MAA03885, MAC00070",
"résidence Arreda, casablanca, MAA03884, MAC00070",
"nouvelle hraouine, casablanca, MAA03882, MAC00070",
"lot charaf, casablanca, MAA03881, MAC00070",
"Rue Senhaja, casablanca, MAA03880, MAC00070",
"hay el hana, casablanca, MAA03879, MAC00070",
"hay nour, casablanca, MAA03878, MAC00070",
"lotissement essanaoubar, Mohammedia, MAA03877, MAC00071",
"diar saada ghofrane, casablanca, MAA03874, MAC00070",
"sidi khadir, casablanca, MAA03873, MAC00070",
"hay chrifa, casablanca, MAA03871, MAC00070",
"résidence haddiouia, casablanca, MAA03869, MAC00070",
"Siége OFPPT, casablanca, MAA03868, MAC00070",
"ouled taleb, Médiouna, MAA03865, MAC00072",
"lotissement Al Hamd, Médiouna, MAA03864, MAC00072",
"rue kalaa makouna, casablanca, MAA03862, MAC00070",
"OULAD ABBOU, Settat, MAA03861, MAC00065",
"Salla el jadida, SALE, MAA03860, MAC00002",
"hay esafaa, casablanca, MAA03859, MAC00070",
"rue ifrane, Midelt, MAA03858, MAC00056",
"hay elfath, Guelmim, MAA03857, MAC00046",
"la ville nouvelle fes, FES, MAA03856, MAC00004",
"cité de l'air, Nouaceur, MAA03855, MAC00059",
"Marjane MASSIRA, Marrakech, MAA03854, MAC00014",
"Porte Sud 2 Casanearshore, casablanca, MAA03853, MAC00070",
"lotissement mandaronna, casablanca, MAA03851, MAC00070",
"Lotissement hadj fateh, casablanca, MAA03850, MAC00070",
"BOULEVARD HASSAN 2, casablanca, MAA03849, MAC00070",
"Bank of Africa Siège Social, casablanca, MAA03848, MAC00070",
"almansouria, Benslimane, MAA03847, MAC00074",
"ait majdn, Azilal, MAA03846, MAC00052",
"imilchil, Errachidia, MAA03845, MAC00057",
"hotel farah, casablanca, MAA03844, MAC00070",
"Oulad Said, Settat, MAA03843, MAC00065",
"rue ahmed hamadi, Laayoune, MAA03842, MAC00049",
"Lhalhal, casablanca, MAA03840, MAC00070",
"Al Ghofrane, casablanca, MAA03838, MAC00070",
"Machrou3 Riyad sidi hajjaj, Settat, MAA03837, MAC00065",
"Rue des Écoles, casablanca, MAA03836, MAC00070",
"rue des tuileries, casablanca, MAA03835, MAC00070",
"Rue Abou Bakr Ibnou Koutia, casablanca, MAA03834, MAC00070",
"Al Farah Dar Essalam, casablanca, MAA03833, MAC00070",
"Rue Ibnou Khalikane, casablanca, MAA03832, MAC00070",
"Rue abou baker el'kadiri, casablanca, MAA03831, MAC00070",
"Siège BMCI, casablanca, MAA03830, MAC00070",
"Rue Al Ourjouane, casablanca, MAA03829, MAC00070",
"Quartier bloc maalem abdellah, casablanca, MAA03828, MAC00070",
"Rue Gascogne, casablanca, MAA03827, MAC00070",
"Bd El Qods, casablanca, MAA03826, MAC00070",
"Rue abou hassan essaghir, casablanca, MAA03824, MAC00070",
"Rue Bni Amir, casablanca, MAA03823, MAC00070",
"Rue Adaafan Hajjaji Lamzabi, casablanca, MAA03822, MAC00070",
"Quartier Cuba, casablanca, MAA03821, MAC00070",
"rue maarakat ait abdellah, casablanca, MAA03820, MAC00070",
"Rue de Bussang, casablanca, MAA03819, MAC00070",
"Rue Abou Alâa Zahr, casablanca, MAA03818, MAC00070",
"Rue Ibnou Majat, casablanca, MAA03817, MAC00070",
"rue benjilali taj eddine, casablanca, MAA03816, MAC00070",
"Rue Abdelmjid Benjelloun, casablanca, MAA03815, MAC00070",
"bd Ibn tachefine Rés Almajd 6, casablanca, MAA03813, MAC00070",
"Luxuria Tower, casablanca, MAA03812, MAC00070",
"Quartier Laymoun, casablanca, MAA03811, MAC00070",
"Rue Imam Al Aouzai, casablanca, MAA03810, MAC00070",
"Boulevard Mohamed Bouziane, casablanca, MAA03807, MAC00070",
"Rue du Roussillon, casablanca, MAA03805, MAC00070",
"bd mekka résidence porte de Californie, casablanca, MAA03804, MAC00070",
"hay el fath 3, casablanca, MAA03803, MAC00070",
"Rue ibn kassim, casablanca, MAA03802, MAC00070",
"Rue Tarik Ibnou Ziad, casablanca, MAA03801, MAC00070",
"Rue du Beaujolais, casablanca, MAA03800, MAC00070",
"Rue Ishaak Ibnou Hanine, casablanca, MAA03799, MAC00070",
"Rue Abou Kacem Zahraoui, casablanca, MAA03798, MAC00070",
"Rue Mouaffak Eddinne, casablanca, MAA03797, MAC00070",
"Rue Ibnou Bouraid, casablanca, MAA03796, MAC00070",
"Rue Camille St Saëns, casablanca, MAA03795, MAC00070",
"Bd Lagota, casablanca, MAA03794, MAC00070",
"Beni Chiker, Nador, MAA03793, MAC00030",
"Madinati, casablanca, MAA03792, MAC00070",
"Rue Al Banafsaj, casablanca, MAA03791, MAC00070",
"Mosquée El Yosser, casablanca, MAA03790, MAC00070",
"Bd Al Fouarat, casablanca, MAA03789, MAC00070",
"Rue Pierre Parent, casablanca, MAA03788, MAC00070",
"Av. Lalla Yacout, casablanca, MAA03787, MAC00070",
"Bd de la Résistance, casablanca, MAA03786, MAC00070",
"Casa voyageur, casablanca, MAA03785, MAC00070",
"Rue Des Gingembres, casablanca, MAA03784, MAC00070",
"El omaria, casablanca, MAA03782, MAC00070",
"Hay Mandarona, casablanca, MAA03781, MAC00070",
"Rue Mohamed Darri, casablanca, MAA03780, MAC00070",
"Rue Salim Cherkaoui, casablanca, MAA03779, MAC00070",
"BOULEVARD ZEKTOUNI, casablanca, MAA03778, MAC00070",
"Bd Omar Al Khiam, casablanca, MAA03777, MAC00070",
"Résidence Louise, casablanca, MAA03775, MAC00070",
"Rue Abou Abdellah Nafii, casablanca, MAA03774, MAC00070",
"Rue de Chauny, casablanca, MAA03773, MAC00070",
"Rue Pauline Kergomard, casablanca, MAA03772, MAC00070",
"Rue de Compiègne, casablanca, MAA03771, MAC00070",
"Rue Jabal Ayachi, casablanca, MAA03770, MAC00070",
"Derb khalid, casablanca, MAA03769, MAC00070",
"Rue François Ponsard, casablanca, MAA03768, MAC00070",
"Rue Mohamed Bahi, casablanca, MAA03767, MAC00070",
"Rue El Ghadfa, casablanca, MAA03766, MAC00070",
"Rue de la Réunion, casablanca, MAA03765, MAC00070",
"Rue Ibn Khalouiya, casablanca, MAA03764, MAC00070",
"Driouch, Driouch, MAA03763, MAC00062",
"Ain Attig, Skhirate - Témara, MAA03762, MAC00073",
"Rue Ait Bouamrane, casablanca, MAA03761, MAC00070",
"Rue Abou Zaid Eddaboussi, casablanca, MAA03760, MAC00070",
"Rue Darkoutni, casablanca, MAA03759, MAC00070",
"Quartier les princesses, casablanca, MAA03758, MAC00070",
"Rue Henri Murger, casablanca, MAA03756, MAC00070",
"darb saad, casablanca, MAA03754, MAC00070",
"hay mohammadi, oujda, MAA03753, MAC00027",
"Ben Ahmed, Settat, MAA03752, MAC00065",
"bahia golf beach, Mohammedia, MAA03751, MAC00071",
"All. Ibnou Nakia, casablanca, MAA03750, MAC00070",
"Rue Saria Ibnou Zounaim, casablanca, MAA03748, MAC00070",
"Rue De Hassan, casablanca, MAA03747, MAC00070",
"Rue Mohamed Kamal, casablanca, MAA03746, MAC00070",
"Rue Rommani, casablanca, MAA03745, MAC00070",
"Bd Abdellatif Ben Kaddour, casablanca, MAA03744, MAC00070",
"Rue Nabouls, casablanca, MAA03743, MAC00070",
"Technopolis, SALE, MAA03742, MAC00002",
"Rue Normandie, casablanca, MAA03741, MAC00070",
"Rue Attirmidi, casablanca, MAA03740, MAC00070",
"Hay omar ben khatab, casablanca, MAA03739, MAC00070",
"Had soualem, Nouaceur, MAA03737, MAC00059",
"Hay Anigrit, casablanca, MAA03736, MAC00070",
"avenue hassan 2, Inezgane - Ait Melloul, MAA03735, MAC00023",
"Boulevard Sidi Abderrahmane, casablanca, MAA03733, MAC00070",
"Bd ghandi, casablanca, MAA03732, MAC00070",
"ALNIF, Tinghir, MAA03731, MAC00060",
"Rte Al Ouahda, casablanca, MAA03729, MAC00070",
"Résidence Chabab, casablanca, MAA03728, MAC00070",
"Bd Tahar El Alaoui, casablanca, MAA03727, MAC00070",
"BLOC BENNANI, casablanca, MAA03726, MAC00070",
"Boulevard Mohamed Smiha, casablanca, MAA03725, MAC00070",
"Rue Esseka El Hadidia, casablanca, MAA03724, MAC00070",
"Rue des pléiades, casablanca, MAA03723, MAC00070",
"Hôpital 20 Août, casablanca, MAA03722, MAC00070",
"Sidi Hajjaj Oued Hassar, casablanca, MAA03721, MAC00070",
"Boulevard Bir Anzarane, casablanca, MAA03720, MAC00070",
"operation Rachad, Médiouna, MAA03719, MAC00072",
"Hay Massira, casablanca, MAA03718, MAC00070",
"Rue Essanaani, casablanca, MAA03717, MAC00070",
"bine lamdoune, casablanca, MAA03716, MAC00070",
"hay madrassa, casablanca, MAA03715, MAC00070",
"Rue du Marché, casablanca, MAA03714, MAC00070",
"rue oumaima essayeh, casablanca, MAA03713, MAC00070",
"standhal, casablanca, MAA03711, MAC00070",
"Haddaouia, casablanca, MAA03710, MAC00070",
"Ksar Labhar, casablanca, MAA03709, MAC00070",
"Ancienne Medina, casablanca, MAA03708, MAC00070",
"derb lingliz, casablanca, MAA03707, MAC00070",
"Rue de Berne, casablanca, MAA03706, MAC00070",
"Hay Rmila, casablanca, MAA03704, MAC00070",
"MEDIOUNA, Berrechid, MAA03703, MAC00058",
"Rue Gustave Nadaud, casablanca, MAA03702, MAC00070",
"Rue Tnaker, casablanca, MAA03701, MAC00070",
"Zaida, Errachidia, MAA03700, MAC00057",
"Tinejdad, Errachidia, MAA03698, MAC00057",
"Rissani, Errachidia, MAA03697, MAC00057",
"المكانسة, casablanca, MAA03696, MAC00070",
"MIDELT, Midelt, MAA03695, MAC00056",
"nassim islane, casablanca, MAA03694, MAC00070",
"RICH, Errachidia, MAA03693, MAC00057",
"Casaview, casablanca, MAA03692, MAC00070",
"Errachidia, Errachidia, MAA03690, MAC00057",
"Residence Prestigia, Nouaceur, MAA03689, MAC00059",
"Bouskoura Mzabiyine, Nouaceur, MAA03687, MAC00059",
"Derb Bennani, casablanca, MAA03686, MAC00070",
"Mabrouka, casablanca, MAA03685, MAC00070",
"Hay al Mansour, casablanca, MAA03684, MAC00070",
"rue jallal eddine sayouti, casablanca, MAA03683, MAC00070",
"Rue Aïn Asserdoun, casablanca, MAA03682, MAC00070",
"Rue de Larache Ancienne Medina, casablanca, MAA03681, MAC00070",
"Rue Imam Al Boukhari, casablanca, MAA03680, MAC00070",
"Ambassadeur Ben Aicha, casablanca, MAA03679, MAC00070",
"Avenue socrate, casablanca, MAA03678, MAC00070",
"La Villette, casablanca, MAA03677, MAC00070",
"rue hassan bnou tabit, casablanca, MAA03676, MAC00070",
"rue rembrandt, casablanca, MAA03675, MAC00070",
"ES SEMARA, Laayoune, MAA03674, MAC00049",
"quartier famille française, casablanca, MAA03673, MAC00070",
"ait kamra, Al Hoceïma, MAA03672, MAC00031",
"Oualidiya, El Jadida, MAA03671, MAC00035",
"MISSIMI, casablanca, MAA03670, MAC00070",
"diar Azhari, casablanca, MAA03668, MAC00070",
"avenue houmane el fetouaki rabat, Rabat, MAA03667, MAC00001",
"SIDI SLIMAN, Sidi Slimane, MAA03666, MAC00012",
"KHENICHET, Sidi Kacem, MAA03665, MAC00013",
"JORF MALHA, Sidi Kacem, MAA03664, MAC00013",
"Khemisset, Khemisset, MAA03663, MAC00093",
"HAD SOUALAM, Berrechid, MAA03662, MAC00058",
"EL GARA, Berrechid, MAA03661, MAC00058",
"Riad Assalam, Marrakech, MAA03649, MAC00014",
"Rommani, SALE, MAA03648, MAC00002",
"KAMOUNI, SALE, MAA03647, MAC00002",
"TIFELT, SALE, MAA03646, MAC00002",
"Sidi Taibi, Kenitra, MAA03645, MAC00068",
"SIDI REDOUAN, Tetouan, MAA03644, MAC00040",
"Mandarona, casablanca, MAA03643, MAC00070",
"El Marsa, Laayoune, MAA03642, MAC00049",
"Lgharbia, El Jadida, MAA03640, MAC00035",
"Oualidia, El Jadida, MAA03639, MAC00035",
"LAAWNATE, El Jadida, MAA03638, MAC00035",
"Zemamra, El Jadida, MAA03637, MAC00035",
"Sidi Bennour, El Jadida, MAA03636, MAC00035",
"LGHEDBANE, El Jadida, MAA03635, MAC00035",
"SALE, SALE, MAA03634, MAC00002",
"Témara, Skhirate - Témara, MAA03633, MAC00073",
"Souk Sebt Beni Khlef, Khouribga, MAA03632, MAC00043",
"AEROPORT MOHAMED V, Berrechid, MAA03631, MAC00058",
"standhal, casablanca, MAA03630, MAC00070",
"Derb tazi, casablanca, MAA03629, MAC00070",
"Kalaat MaGouna, Ouarzazate, MAA03628, MAC00018",
"Omar el khyam, casablanca, MAA03627, MAC00070",
"Fatima ezzahrra, casablanca, MAA03626, MAC00070",
"Occitania, casablanca, MAA03625, MAC00070",
"allée des Jardins, casablanca, MAA03623, MAC00070",
"El Oulfa, casablanca, MAA03622, MAC00070",
"VICTORIA, casablanca, MAA03621, MAC00070",
"ouled haddou, casablanca, MAA03620, MAC00070",
"Âïn-Harrouda, casablanca, MAA03619, MAC00070",
"FNIDEQ, M Diq - Fnideq, MAA03618, MAC00041",
"Ouezzane, Ouezzane, MAA03616, MAC00098",
"MOHAMMADIA, casablanca, MAA03615, MAC00070",
"YOUSSOUFIA, Youssoufia, MAA03614, MAC00019",
"ZAGORA, Zagora, MAA03612, MAC00061",
"SIDI SLIMANE, Sidi Slimane, MAA03611, MAC00012",
"AZROU, AZROU, MAA03610, MAC00087",
"TINGHIR, Tinghir, MAA03609, MAC00060",
"SIDI KACEM, Meknes, MAA03607, MAC00003",
"Ain Dorij, Ouezzane, MAA03605, MAC00098",
"Ribate El Kheir, FES, MAA03604, MAC00004",
"Asilah, Asilah, MAA03603, MAC00084",
"HAD GHARBIA, Asilah, MAA03602, MAC00084",
"El Mansouria, Mohammedia, MAA03601, MAC00071",
"HAD SOUALEM, casablanca, MAA03600, MAC00070",
"Missour, FES, MAA03599, MAC00004",
"MEDIQ, Tetouan, MAA03598, MAC00040",
"BNI HADIFA, Al Hoceïma, MAA03597, MAC00031",
"AIT SAID, Al Hoceïma, MAA03596, MAC00031",
"AIT-KAMARA, Al Hoceïma, MAA03595, MAC00031",
"ISSAGUEN, Al Hoceïma, MAA03594, MAC00031",
"TARGUIST, Al Hoceïma, MAA03593, MAC00031",
"AJDIR, Al Hoceïma, MAA03592, MAC00031",
"BNI BOUAYACH, Al Hoceïma, MAA03591, MAC00031",
"BOUKIDAN, Al Hoceïma, MAA03590, MAC00031",
"TOUNDOUTE, Ouarzazate, MAA03588, MAC00018",
"TINZOULINE, Ouarzazate, MAA03587, MAC00018",
"TIMEDLINE, Ouarzazate, MAA03586, MAC00018",
"TILMI, Ouarzazate, MAA03585, MAC00018",
"TIDILI, Ouarzazate, MAA03584, MAC00018",
"TELOUET, Ouarzazate, MAA03583, MAC00018",
"TAZNAKHT, Ouarzazate, MAA03582, MAC00018",
"TAZARINE, Ouarzazate, MAA03581, MAC00018",
"TARMIGT, Ouarzazate, MAA03580, MAC00018",
"TANSIKHT, Ouarzazate, MAA03579, MAC00018",
"TAMEGROUTE, Ouarzazate, MAA03578, MAC00018",
"TAGOUNITE, Ouarzazate, MAA03577, MAC00018",
"TAGHBALT, Ouarzazate, MAA03576, MAC00018",
"SOUK KHEMIS DADES, Ouarzazate, MAA03575, MAC00018",
"SKOURA, Ouarzazate, MAA03574, MAC00018",
"OUARZAZATE, Ouarzazate, MAA03573, MAC00018",
"NKOB, Ouarzazate, MAA03572, MAC00018",
"MSEMRIR, Ouarzazate, MAA03571, MAC00018",
"MHAMID EL GHIZLANE, Ouarzazate, MAA03570, MAC00018",
"KELAAT M'GOUNA, Ouarzazate, MAA03569, MAC00018",
"IKNIOUEN, Ouarzazate, MAA03568, MAC00018",
"IGHREM N'OUGDAL, Ouarzazate, MAA03567, MAC00018",
"IDELSANE, Ouarzazate, MAA03566, MAC00018",
"FOUM ZGUID, Ouarzazate, MAA03565, MAC00018",
"BOUMALNE DADES, Ouarzazate, MAA03564, MAC00018",
"AMERZGANE, Ouarzazate, MAA03563, MAC00018",
"AIT SEDRAT, Ouarzazate, MAA03562, MAC00018",
"AIT BENHDDOU, Ouarzazate, MAA03561, MAC00018",
"AGOUIM, Ouarzazate, MAA03560, MAC00018",
"AGDEZ, Ouarzazate, MAA03559, MAC00018",
"ZGHANGHAN, oujda, MAA03555, MAC00027",
"ZERADA, FES, MAA03554, MAC00004",
"ZAIDA, Midelt, MAA03553, MAC00056",
"ZAOUIAT CHEIKH, Beni Mellal, MAA03550, MAC00066",
"ZAIO, oujda, MAA03549, MAC00027",
"VILLE IBN BATOUTA, Tanger, MAA03547, MAC00036",
"TOUIMA, oujda, MAA03545, MAC00027",
"TLAT LOULED, Khouribga, MAA03542, MAC00043",
"TIZTOUTINE, oujda, MAA03541, MAC00027",
"TIZNIT​, TIZNIT, MAA03540, MAC00025",
"TIZI OUASLI, oujda, MAA03539, MAC00027",
"TIZIRINE, oujda, MAA03537, MAC00027",
"Tin Ali Mansour, AGADIR, MAA03532, MAC00022",
"TIKIOUINE​, AGADIR, MAA03527, MAC00022",
"TIGHIRT​, TIZNIT, MAA03525, MAC00025",
"Temsia, AGADIR, MAA03522, MAC00022",
"TELAT AZLAF, oujda, MAA03521, MAC00027",
"TAZA​, Taza, MAA03519, MAC00006",
"TARGHA, Tetouan, MAA03518, MAC00040",
"TAOURIRT​, oujda, MAA03517, MAC00027",
"TAOUNAT, FES, MAA03516, MAC00004",
"TAMSLOUHT, Marrakech, MAA03514, MAC00014",
"TAMRI​, AGADIR, MAA03513, MAC00022",
"TAHLA​, FES, MAA03510, MAC00004",
"TAGHAZOUT​, AGADIR, MAA03508, MAC00022",
"TAFRAOUTE​, TIZNIT, MAA03506, MAC00025",
"TAFOUGHALT​, oujda, MAA03505, MAC00027",
"TAFERSIT, oujda, MAA03504, MAC00027",
"STEHAT, Tetouan, MAA03500, MAC00040",
"SOUQ KHEMIS SAHEL, Tanger, MAA03499, MAC00036",
"SOUK TLETA EL GHARB, Kenitra, MAA03498, MAC00068",
"SOUK SEBT OULAD NEMA, Beni Mellal, MAA03497, MAC00066",
"SOUK SEBT OUED BEHT, Kenitra, MAA03495, MAC00068",
"Souk Elarbaa Du Gharb, Kenitra, MAA03494, MAC00068",
"Sidi Zouine, Marrakech, MAA03492, MAC00014",
"SIDI YOUSSEF BEN AHMED SENHAJA, FES, MAA03491, MAC00004",
"SIDI YAHYA DU GHARB, Kenitra, MAA03488, MAC00068",
"SIDI QANQOUCH, Tanger, MAA03485, MAC00036",
"SIDI MOUSSA LEMHAYA​, oujda, MAA03484, MAC00027",
"SIDI LAHCEN EL YOUSSI, FES, MAA03482, MAC00004",
"SIDI IFNI​, TIZNIT, MAA03479, MAC00025",
"SIDI HSSAIN, Tanger, MAA03478, MAC00036",
"SIDI HRAZEM, FES, MAA03477, MAC00004",
"SIDI EL MOKHFI, FES, MAA03475, MAC00004",
"SIDI BOUZID​, El Jadida, MAA03473, MAC00035",
"SIDI BOUSBER, Kenitra, MAA03472, MAC00068",
"SIDI BOULENOUAR​, oujda, MAA03471, MAC00027",
"SIDI BOUBKER EL HAJ, Kenitra, MAA03470, MAC00068",
"SIDI BOUATMAN, Marrakech, MAA03469, MAC00014",
"SIDI BIBI​, AGADIR, MAA03468, MAC00022",
"SIDI AMMAR EL HADI, Kenitra, MAA03467, MAC00068",
"SIDI AL KAMEL, Kenitra, MAA03466, MAC00068",
"SIDI ALI BORAKBA, oujda, MAA03465, MAC00027",
"SIDI AHMED EL BERNOUSSI, FES, MAA03463, MAC00004",
"SIDI AHMED CHERIF, Kenitra, MAA03462, MAC00068",
"Sidi Abdellah Ghiat, Marrakech, MAA03459, MAC00014",
"SIDI ABDELAH​, Taza, MAA03458, MAC00006",
"SIDI AADI, Meknes, MAA03457, MAC00003",
"SIDI RAHAL, casablanca, MAA03455, MAC00070",
"SIDI MELOUK, oujda, MAA03454, MAC00027",
"SIDI ALAL TAZI, Kenitra, MAA03452, MAC00068",
"SFAFAA, Kenitra, MAA03451, MAC00068",
"SELOUANE, oujda, MAA03450, MAC00027",
"SEFSAF, Kenitra, MAA03449, MAC00068",
"SEFRO, FES, MAA03448, MAC00004",
"Sebt El Guerdane, AGADIR, MAA03446, MAC00022",
"SEBAA ROUADI, FES, MAA03443, MAC00004",
"Saïdia, oujda, MAA03442, MAC00027",
"Sabaâ Aïyoun, Meknes, MAA03441, MAC00003",
"RISSANI, Errachidia, MAA03440, MAC00057",
"RICHE, Errachidia, MAA03439, MAC00057",
"RAS TBOUDA, FES, MAA03437, MAC00004",
"Ras El Ma, oujda, MAA03435, MAC00027",
"QUAA ASSERASSE, Tetouan, MAA03433, MAC00040",
"PORT MED, Tanger, MAA03432, MAC00036",
"OUZOUD, Beni Mellal, MAA03430, MAC00066",
"OURIKA, Marrakech, MAA03427, MAC00014",
"OUNNANA, Kenitra, MAA03426, MAC00068",
"OULED YOUSSEF, Kenitra, MAA03424, MAC00068",
"OULED TAYEB, FES, MAA03423, MAC00004",
"OULED DAOUD ZKHANINE, oujda, MAA03415, MAC00027",
"OULED BEN HAMMADI, Kenitra, MAA03413, MAC00068",
"OULED AYAD, Beni Mellal, MAA03411, MAC00066",
"Ouled Teima, AGADIR, MAA03407, MAC00022",
"OULAD TALEB​, Taza, MAA03404, MAC00006",
"OULAD JERRAR​, TIZNIT, MAA03403, MAC00025",
"OULAD HAMMOU, FES, MAA03401, MAC00004",
"OULAD DAOUD, Kenitra, MAA03400, MAC00068",
"OULAD BOUBKER, oujda, MAA03399, MAC00027",
"Oulad Dahou, AGADIR, MAA03398, MAC00022",
"OUJDA​, oujda, MAA03397, MAC00027",
"OUED LAOU, Tetouan, MAA03395, MAC00040",
"OUED LAHMAR, FES, MAA03394, MAC00004",
"OUED AMLIL​, Taza, MAA03393, MAC00006",
"OUAZANE, FES, MAA03391, MAC00004",
"OUAOULZEMT, FES, MAA03389, MAC00004",
"OUAD AMLIL, Taza, MAA03387, MAC00006",
"OLD GHANAM​, El Jadida, MAA03384, MAC00035",
"NOUIRATE, Kenitra, MAA03383, MAC00068",
"NOUINOUICH, Tanger, MAA03382, MAC00036",
"NAIIMA​, oujda, MAA03380, MAC00027",
"M HAJER, oujda, MAA03378, MAC00027",
"M'RIRT, Meknes, MAA03376, MAC00003",
"MOULAY YAKOUB, FES, MAA03375, MAC00004",
"MOULAY DRISS ZERHOUN, Meknes, MAA03374, MAC00003",
"Moulay-Bousselham, Kenitra, MAA03372, MAC00068",
"MOULAY BOUCHTA, FES, MAA03371, MAC00004",
"MOULAY ABDELKRIM, FES, MAA03370, MAC00004",
"MOULAY ABDELAH AMGHAR​, El Jadida, MAA03369, MAC00035",
"MNASRA, Kenitra, MAA03367, MAC00068",
"MIDAR, oujda, MAA03366, MAC00027",
"M'HAYA, FES, MAA03365, MAC00004",
"MESSOUSSATE, oujda, MAA03361, MAC00027",
"MESSASSA, FES, MAA03360, MAC00004",
"MERZOGA, Errachidia, MAA03359, MAC00057",
"MELOUSSA, Tanger, MAA03358, MAC00036",
"MELLAB, Errachidia, MAA03356, MAC00057",
"MATMATA, FES, MAA03354, MAC00004",
"MASSA​, TIZNIT, MAA03353, MAC00025",
"MARTIL, Tetouan, MAA03352, MAC00040",
"Mechra Bel Ksiri, Kenitra, MAA03351, MAC00068",
"LOULJA, FES, MAA03350, MAC00004",
"LOUDAYA, Marrakech, MAA03349, MAC00014",
"LEMRIJA​, oujda, MAA03347, MAC00027",
"LARBAA AYACHA, Tanger, MAA03346, MAC00036",
"LARACHE, Tanger, MAA03345, MAC00036",
"LAMRISS​, oujda, MAA03344, MAC00027",
"LAMNAKRA EL HADDADA, Kenitra, MAA03343, MAC00068",
"LALLA MIMOUNA, Kenitra, MAA03342, MAC00068",
"El Ksiba, Beni Mellal, MAA03341, MAC00066",
"LAKHSAS​, TIZNIT, MAA03340, MAC00025",
"LAKHERACHEFA, Tanger, MAA03339, MAC00036",
"LAAYOUNE CHARKIA​, oujda, MAA03337, MAC00027",
"KSAR EL SGHIR, Tanger, MAA03335, MAC00036",
"KSAR LKBIR, Tanger, MAA03334, MAC00036",
"KHOURIBGA, Khouribga, MAA03333, MAC00043",
"KHMIS ANJRA, Tetouan, MAA03332, MAC00040",
"KHLALFA, FES, MAA03331, MAC00004",
"KENITRA, Kenitra, MAA03328, MAC00068",
"KASSITA, oujda, MAA03327, MAC00027",
"KASSARAT, FES, MAA03326, MAC00004",
"KASBA TADLA, Beni Mellal, MAA03325, MAC00066",
"KARIA BENAOUDA, Kenitra, MAA03324, MAC00068",
"KARIAT BA MOHAMED, FES, MAA03323, MAC00004",
"KARIAT ARCKMANE, oujda, MAA03322, MAC00027",
"JRADA​, oujda, MAA03320, MAC00027",
"JORF SFAR​, El Jadida, MAA03319, MAC00035",
"JNAN ANNICH, Tetouan, MAA03317, MAC00040",
"JEMAA HAOUAFATE, Kenitra, MAA03316, MAC00068",
"JBEL LHBIB, Tetouan, MAA03314, MAC00040",
"JBABRA, FES, MAA03313, MAC00004",
"JAMAA IDAOUSSEMLAL​, TIZNIT, MAA03312, MAC00025",
"IZERBI​, TIZNIT, MAA03311, MAC00025",
"INEZGANE​, AGADIR, MAA03310, MAC00022",
"IMMOUZZER KANDER, FES, MAA03308, MAC00004",
"IMLIL, Beni Mellal, MAA03307, MAC00066",
"IMINTANOUT, Marrakech, MAA03306, MAC00014",
"IHDDADEN, oujda, MAA03304, MAC00027",
"IGHREM​, TIZNIT, MAA03303, MAC00025",
"IGHEZREN, FES, MAA03301, MAC00004",
"HATTANE, Khouribga, MAA03300, MAC00043",
"HASSI BILAL​, oujda, MAA03299, MAC00027",
"HASSI BERKAN, oujda, MAA03298, MAC00027",
"HAKKAMA, Tanger, MAA03297, MAC00036",
"HAD OLD FRAJ​, El Jadida, MAA03296, MAC00035",
"Bradia, Beni Mellal, MAA03295, MAC00066",
"HAD BNI CHIKER, oujda, MAA03293, MAC00027",
"HAD AIT OURIBEL, Kenitra, MAA03292, MAC00068",
"HADDADA EL GHARB, Kenitra, MAA03290, MAC00068",
"GUISSER, Settat, MAA03289, MAC00065",
"GUIGOU, FES, MAA03288, MAC00004",
"GUERCIF​, Taza, MAA03287, MAC00006",
"GUENFOUDA​, oujda, MAA03286, MAC00027",
"GUELMDAMANE​, Taza, MAA03285, MAC00006",
"GOULMIMA, Errachidia, MAA03284, MAC00057",
"GHOUAZI, FES, MAA03283, MAC00004",
"FES, FES, MAA03278, MAC00004",
"Fkih Ben Salah, Beni Mellal, MAA03277, MAC00066",
"Jemâa Feddalat, Mohammedia, MAA03276, MAC00071",
"FARKHANA, oujda, MAA03273, MAC00027",
"ESSIFA, Errachidia, MAA03271, MAC00057",
"ERRACHIDIA, Errachidia, MAA03270, MAC00057",
"ERFOUD, Errachidia, MAA03269, MAC00057",
"EL MORHRANE, Kenitra, MAA03266, MAC00068",
"EL MERS, FES, MAA03265, MAC00004",
"EL MENZEL, FES, MAA03264, MAC00004",
"EL JORF, Errachidia, MAA03262, MAC00057",
"EL JEBEHA, Tetouan, MAA03261, MAC00040",
"EL HAJEB, Meknes, MAA03260, MAC00003",
"EL HADDADA, Kenitra, MAA03259, MAC00068",
"EL BESSABSSA, FES, MAA03257, MAC00004",
"EL AOUAMRA, Larache, MAA03255, MAC00038",
"EL BROUJ, Settat, MAA03251, MAC00065",
"EDDALYA, Tanger, MAA03250, MAC00036",
"DRARGA​, AGADIR, MAA03248, MAC00022",
"DLALHA, Kenitra, MAA03247, MAC00068",
"DEBDOU​, oujda, MAA03246, MAC00027",
"DCHEIRA​, AGADIR, MAA03245, MAC00022",
"DAYET AOUA, FES, MAA03244, MAC00004",
"DAR LAASLOUJI, Kenitra, MAA03243, MAC00068",
"Dar Gueddari, Kenitra, MAA03242, MAC00068",
"DAR EL KEBDANI, oujda, MAA03241, MAC00027",
"DAR EL HAMRA, FES, MAA03240, MAC00004",
"DAR BELAMRI, Kenitra, MAA03239, MAC00068",
"DAR BOUAZA, casablanca, MAA03238, MAC00070",
"CHWITAR, Marrakech, MAA03235, MAC00014",
"CHTOUKA AIT BAHA​, AGADIR, MAA03234, MAC00022",
"CHICHAWA, Marrakech, MAA03233, MAC00014",
"CHEFCHAOUEN, Tetouan, MAA03232, MAC00040",
"CAPO NEGRO, Tetouan, MAA03231, MAC00040",
"BOUYAFAR, oujda, MAA03228, MAC00027",
"BOUNAAMANE​, TIZNIT, MAA03227, MAC00025",
"BOUMIA, FES, MAA03226, MAC00004",
"BOULMANE, FES, MAA03225, MAC00004",
"BOULANOUAR, Khouribga, MAA03224, MAC00043",
"BOULAAJOUL, FES, MAA03223, MAC00004",
"BOUJNIBA, Khouribga, MAA03222, MAC00043",
"Boujdour, Laayoune, MAA03221, MAC00049",
"Boujad, Khouribga, MAA03220, MAC00043",
"BOUFEKRAN, Meknes, MAA03217, MAC00003",
"BOUDNIB, Errachidia, MAA03216, MAC00057",
"BOUARG, oujda, MAA03213, MAC00027",
"BNI SIDEL LOUTA, oujda, MAA03212, MAC00027",
"BNI KORRA, FES, MAA03211, MAC00004",
"BNI ANSAR, oujda, MAA03209, MAC00027",
"BNI AAYAT, Beni Mellal, MAA03208, MAC00066",
"BNI KHLOUG, Settat, MAA03207, MAC00065",
"Beni Drar, oujda, MAA03206, MAC00027",
"BIR TAMTAM, FES, MAA03204, MAC00004",
"Briyech, Tanger, MAA03202, MAC00036",
"BIOUGRA​, AGADIR, MAA03201, MAC00022",
"BHALIL, FES, MAA03199, MAC00004",
"BERKANE​, oujda, MAA03198, MAC00027",
"Ben Taieb, oujda, MAA03197, MAC00027",
"BEN MANSOUR, Kenitra, MAA03196, MAC00068",
"Beni Mellal, Beni Mellal, MAA03193, MAC00066",
"BEN GUERIR, Marrakech, MAA03192, MAC00014",
"BELYOUNOCH, Tanger, MAA03191, MAC00036",
"BELFAA​, TIZNIT, MAA03190, MAC00025",
"BAB TAZA, Tetouan, MAA03189, MAC00040",
"BAB BERED, Tetouan, MAA03185, MAC00040",
"AZZABA, FES, MAA03184, MAC00004",
"AZLA, Tetouan, MAA03182, MAC00040",
"AZILAL, Beni Mellal, MAA03181, MAC00066",
"ASSEBBAB, oujda, MAA03180, MAC00027",
"ASNI, Marrakech, MAA03179, MAC00014",
"CTRE ASJENN, Kenitra, MAA03178, MAC00068",
"ARBAA MESTI​, TIZNIT, MAA03176, MAC00025",
"AOURIR​, AGADIR, MAA03175, MAC00022",
"AOUFOUS, Errachidia, MAA03174, MAC00057",
"ANZI​, TIZNIT, MAA03173, MAC00025",
"ANZA​, AGADIR, MAA03172, MAC00022",
"AMZMIZ, Marrakech, MAA03171, MAC00014",
"AMTAR, Tetouan, MAA03170, MAC00040",
"AMSA, Tetouan, MAA03169, MAC00040",
"AMESKROUD​, AGADIR, MAA03168, MAC00022",
"AL AROUI, oujda, MAA03167, MAC00027",
"AKLIM, oujda, MAA03161, MAC00027",
"AIT SEBAA, FES, MAA03160, MAC00004",
"AIT OURIR, Marrakech, MAA03159, MAC00014",
"AIT OUMRIBET​, TIZNIT, MAA03158, MAC00025",
"AIT OUFELLA, FES, MAA03157, MAC00004",
"AIT MILK​, TIZNIT, MAA03155, MAC00025",
"AIT BAZZA, FES, MAA03151, MAC00004",
"AIT AMIRA​, AGADIR, MAA03149, MAC00022",
"Ait Moussa, AGADIR, MAA03148, MAC00022",
"AIT MELLOUL, AGADIR, MAA03147, MAC00022",
"AIN ZOHRA, oujda, MAA03146, MAC00027",
"AIN TAOUJDATE, FES, MAA03145, MAC00004",
"AIN LAHCEN, Tetouan, MAA03141, MAC00040",
"AIN LAAH, FES, MAA03140, MAC00004",
"AIN DALIA, Tanger, MAA03138, MAC00036",
"AIN CHEGGAG, FES, MAA03137, MAC00004",
"AIN BNI MATHAR, oujda, MAA03135, MAC00027",
"AIN BARDA, FES, MAA03134, MAC00004",
"AIN ARISS, Kenitra, MAA03133, MAC00068",
"AIN AICHA, FES, MAA03132, MAC00004",
"AIN TAOUJTAT, FES, MAA03131, MAC00004",
"Ain Seddaq, AGADIR, MAA03130, MAC00022",
"AHFIR​, oujda, MAA03128, MAC00027",
"Agourai, Meknes, MAA03127, MAC00003",
"AGLOU, TIZNIT, MAA03126, MAC00025",
"AGADIR, AGADIR, MAA03124, MAC00022",
"AFSOU, oujda, MAA03123, MAC00027",
"AFOURAR, Azilal, MAA03122, MAC00052",
"SOUSS MASSA, AGADIR, MAA00665, MAC00022",
"Khénifra, Khenifra, MAA00664, MAC00053",
"tamelelt, Marrakech, MAA00663, MAC00014",
"safi, SAFI, MAA00662, MAC00033",
"BAB TAZA, Tetouan, MAA00661, MAC00040",
"Sidi Bernoussi, casablanca, MAA00659, MAC00070",
"ouad law, ouad law, MAA00658, MAC00083",
"jabha, jabha, MAA00657, MAC00082",
"Ksar Sghir, Ksar Sghir, MAA00656, MAC00081",
"Demnate, demnate, MAA00655, MAC00080",
"taznakht, Ouarzazate, MAA00654, MAC00018",
"imintanout, Chichaoua, MAA00653, MAC00020",
"tamelalt, Ouarzazate, MAA00652, MAC00018",
"Sidi Marrouf, casablanca, MAA00651, MAC00070",
"Tiflet, Tiflet, MAA00650, MAC00075",
"Sidi Alal El Bahraoui, Sidi Allal El Bahraoui, MAA00649, MAC00076",
"El Mansouria, casablanca, MAA00644, MAC00070",
"Azemmour, El Jadida, MAA00643, MAC00035",
"Douar Sidi Moussa, Marrakech, MAA00642, MAC00014",
"Oum soltane, Meknes, MAA00641, MAC00003",
"Mers el kheir, Skhirate - Témara, MAA00640, MAC00073",
"Riviera, casablanca, MAA00639, MAC00070",
"OUM AZZA, Skhirate - Témara, MAA00638, MAC00073",
"CENTRE COMUNE EL MENZEH, Skhirate - Témara, MAA00637, MAC00073",
"AIN EL AOUDA, Skhirate - Témara, MAA00636, MAC00073",
"benslimane, Benslimane, MAA00635, MAC00074",
"Tamesna, Skhirate - Témara, MAA00634, MAC00073",
"SKHIRAT, Skhirate - Témara, MAA00633, MAC00073",
"bouznika, Benslimane, MAA00632, MAC00074",
"block 2, Skhirate - Témara, MAA00631, MAC00073",
"lotissement beethoven, Skhirate - Témara, MAA00630, MAC00073",
"lotissement laayoune, Skhirate - Témara, MAA00629, MAC00073",
"Résidance momosas, Skhirate - Témara, MAA00628, MAC00073",
"Beni Brour, Skhirate - Témara, MAA00627, MAC00073",
"11 Janvier, Skhirate - Témara, MAA00626, MAC00073",
"Résidance Taoufiq, Skhirate - Témara, MAA00625, MAC00073",
"Cité Al Andalouss, Skhirate - Témara, MAA00624, MAC00073",
"Massira 3, Skhirate - Témara, MAA00623, MAC00073",
"Oued Eddahab, Skhirate - Témara, MAA00622, MAC00073",
"Hay Nahda 2, Skhirate - Témara, MAA00621, MAC00073",
"Hay Abbadi, Skhirate - Témara, MAA00620, MAC00073",
"Firdaous, Skhirate - Témara, MAA00619, MAC00073",
"Hay Nahda 1, Skhirate - Témara, MAA00618, MAC00073",
"Wifaq 2, Skhirate - Témara, MAA00617, MAC00073",
"Oulad Mtaa, Skhirate - Témara, MAA00616, MAC00073",
"Guich Oudaya, Skhirate - Témara, MAA00615, MAC00073",
"Massira 1, Skhirate - Témara, MAA00614, MAC00073",
"Harhoura, Skhirate - Témara, MAA00613, MAC00073",
"Sidi El Ayedi, Settat, MAA00611, MAC00065",
"berrechid, Berrechid, MAA00610, MAC00058",
"DEROUA, Berrechid, MAA00609, MAC00058",
"Nouaceur, Nouaceur, MAA00608, MAC00059",
"Polo, casablanca, MAA00607, MAC00070",
"Derb Omar, casablanca, MAA00606, MAC00070",
"Mediouna, Médiouna, MAA00605, MAC00072",
"Hobous, casablanca, MAA00604, MAC00070",
"benjdya, casablanca, MAA00603, MAC00070",
"La gironde, casablanca, MAA00602, MAC00070",
"Belveder, casablanca, MAA00601, MAC00070",
"Ain Borja, casablanca, MAA00600, MAC00070",
"Hay Farah, casablanca, MAA00599, MAC00070",
"Sbata, casablanca, MAA00597, MAC00070",
"Mkansa, casablanca, MAA00596, MAC00070",
"Ain Chock, casablanca, MAA00595, MAC00070",
"Salmia 1/2, casablanca, MAA00594, MAC00070",
"Hay Al Wahda, casablanca, MAA00593, MAC00070",
"Ben Msik, casablanca, MAA00591, MAC00070",
"Bournazel, casablanca, MAA00590, MAC00070",
"Sidi Othmane, casablanca, MAA00589, MAC00070",
"Hay Tissir, casablanca, MAA00588, MAC00070",
"Hay Moulay Rachid, casablanca, MAA00587, MAC00070",
"Al Fida, casablanca, MAA00586, MAC00070",
"Derb Milan, casablanca, MAA00585, MAC00070",
"Inara, casablanca, MAA00584, MAC00070",
"Al Idrissia, casablanca, MAA00583, MAC00070",
"Guathier, casablanca, MAA00582, MAC00070",
"California, casablanca, MAA00581, MAC00070",
"Bachkou, casablanca, MAA00579, MAC00070",
"Oasis, casablanca, MAA00578, MAC00070",
"Quartier Laayoun, casablanca, MAA00577, MAC00070",
"Casa nearshore, casablanca, MAA00576, MAC00070",
"Florida, casablanca, MAA00575, MAC00070",
"CHAIMAA, casablanca, MAA00573, MAC00070",
"Nassim 2, casablanca, MAA00572, MAC00070",
"Val Fleurie, casablanca, MAA00570, MAC00070",
"Derb Ghallef, casablanca, MAA00569, MAC00070",
"Arrahma, casablanca, MAA00568, MAC00070",
"quartier hopitaux, casablanca, MAA00567, MAC00070",
"Cil, casablanca, MAA00565, MAC00070",
"Hay Hassani, casablanca, MAA00564, MAC00070",
"Quartier el Hana, casablanca, MAA00563, MAC00070",
"La Corniche, casablanca, MAA00562, MAC00070",
"Ain Diab, casablanca, MAA00561, MAC00070",
"Racine, casablanca, MAA00560, MAC00070",
"El Hank, casablanca, MAA00559, MAC00070",
"Anfa, casablanca, MAA00558, MAC00070",
"Ancien Maarif, casablanca, MAA00557, MAC00070",
"Maarif, casablanca, MAA00556, MAC00070",
"Tit Mellil, Médiouna, MAA00552, MAC00072",
"Ain Harouda, Mohammedia, MAA00551, MAC00071",
"Mohammedia, Mohammedia, MAA00550, MAC00071",
"Roches Noires, casablanca, MAA00549, MAC00070",
"Ahl Loughlam, casablanca, MAA00548, MAC00070",
"Dar Laman, casablanca, MAA00547, MAC00070",
"Hadika, casablanca, MAA00545, MAC00070",
"Hay El Houda, casablanca, MAA00544, MAC00070",
"Hay Baraka, casablanca, MAA00543, MAC00070",
"El Qods, casablanca, MAA00542, MAC00070",
"Azhar, casablanca, MAA00541, MAC00070",
"Anassi, casablanca, MAA00540, MAC00070",
"Jawhara, casablanca, MAA00539, MAC00070",
"Sidi Moumen, casablanca, MAA00538, MAC00070",
"Hay Mohammadi, casablanca, MAA00537, MAC00070",
"Paloma, casablanca, MAA00536, MAC00070",
"Attacharouk, casablanca, MAA00535, MAC00070",
"Ain Sbàa, casablanca, MAA00534, MAC00070",
"BOUSKOURA, casablanca, MAA00533, MAC00070",
"EL JADIDA, El Jadida, MAA00531, MAC00035",
"CHTOUKA, El Jadida, MAA00529, MAC00035",
"Bir Jdid, El Jadida, MAA00528, MAC00035",
"Tamaris, casablanca, MAA00526, MAC00070",
"Lissasfa, casablanca, MAA00525, MAC00070",
"Cité Militaire, SALE, MAA00520, MAC00002",
"QUARTIER BELKHIYAT, FES, MAA00519, MAC00004",
"QUARTIER DES POTIERS, FES, MAA00518, MAC00004",
"R'HABET ZBIB, FES, MAA00517, MAC00004",
"EL MAKHFIYA, FES, MAA00516, MAC00004",
"AL AYOUN, FES, MAA00515, MAC00004",
"TALAA, FES, MAA00514, MAC00004",
"AIN NOKBI, FES, MAA00513, MAC00004",
"BENZAKOUR, FES, MAA00512, MAC00004",
"QUARTIER AGADIR, FES, MAA00511, MAC00004",
"MOULAY ABDALLAH, FES, MAA00510, MAC00004",
"HEY ESSALAM, FES, MAA00509, MAC00004",
"ZAZA, FES, MAA00508, MAC00004",
"ERAC, FES, MAA00507, MAC00004",
"BAB BOUJLOUD, FES, MAA00506, MAC00004",
"HAY MASSIRA, FES, MAA00505, MAC00004",
"EL ADOUA, FES, MAA00504, MAC00004",
"MELLAH, FES, MAA00503, MAC00004",
"HAY BENZAKOUR, FES, MAA00502, MAC00004",
"HAY JDID, FES, MAA00501, MAC00004",
"HAY GRIYOU, FES, MAA00500, MAC00004",
"JNAN ADDAR, FES, MAA00499, MAC00004",
"HAFAT MOULAY IDRISS, FES, MAA00498, MAC00004",
"EL KEDDAN, FES, MAA00497, MAC00004",
"KESBA EN NOUAR, FES, MAA00496, MAC00004",
"TGHAT, FES, MAA00495, MAC00004",
"AL MOURABITIN, FES, MAA00494, MAC00004",
"QUARTIER AL WAFAA, FES, MAA00493, MAC00004",
"HAY CHOUHADA, FES, MAA00492, MAC00004",
"QUETTANINE, FES, MAA00491, MAC00004",
"QUARTIER AL ADARISSA, FES, MAA00490, MAC00004",
"BOURMANA, FES, MAA00489, MAC00004",
"HAY AIT SKATO, FES, MAA00488, MAC00004",
"MONT FLEURI, FES, MAA00487, MAC00004",
"BATHA, FES, MAA00486, MAC00004",
"HAY TARIK 1, FES, MAA00485, MAC00004",
"HAY ESSAADA, FES, MAA00484, MAC00004",
"AOUINAT HAJJAJ, FES, MAA00483, MAC00004",
"JNAN LWARD, FES, MAA00482, MAC00004",
"OUED FES, FES, MAA00481, MAC00004",
"ZOUAGHA, FES, MAA00480, MAC00004",
"MECHOUR JDID, FES, MAA00479, MAC00004",
"NARJIS HAY EL AMAL, FES, MAA00478, MAC00004",
"N'KHAKHSA, Kenitra, MAA00475, MAC00068",
"OULED BERJAL, Kenitra, MAA00474, MAC00068",
"Quartier Ancienne Medina, Kenitra, MAA00472, MAC00068",
"CAMPUS UNIVERSITAIRE, Kenitra, MAA00471, MAC00068",
"Quartier de Bir Rami, Kenitra, MAA00470, MAC00068",
"Quartier d'Ouled Oujih, Kenitra, MAA00469, MAC00068",
"LOTISSEMENT MEHDIA, Kenitra, MAA00468, MAC00068",
"KASBAT EL MEHDIA, Kenitra, MAA00467, MAC00068",
"MEHDYA, Kenitra, MAA00466, MAC00068",
"bouknadel, SALE, MAA00463, MAC00002",
"SALE AL JADIDA, SALE, MAA00462, MAC00002",
"Lotissement Rouid, SALE, MAA00461, MAC00002",
"Kasba Tadla, Beni Mellal, MAA00460, MAC00066",
"Oued Zem, Khouribga, MAA00459, MAC00043",
"Fquih Ben Salah, Fquih Ben Salah, MAA00457, MAC00044",
"Sidi Hajjaj, Settat, MAA00454, MAC00065",
"Ben ahmed, Settat, MAA00453, MAC00065",
"ouazzane, Ouezzane, MAA00452, MAC00098",
"MARTIL, M Diq - Fnideq, MAA00450, MAC00041",
"Sale Medina, SALE, MAA00449, MAC00002",
"Sale Bettana, SALE, MAA00448, MAC00002",
"Sale Tabriquet, SALE, MAA00447, MAC00002",
"Mechra Bel Ksiri, Sidi Kacem, MAA00446, MAC00013",
"Jerada, Jerada, MAA00445, MAC00032",
"Bouarfa, Figuig, MAA00444, MAC00063",
"Al Aaroui, Nador, MAA00443, MAC00030",
"Tafersit, Driouch, MAA00442, MAC00062",
"Midar, Driouch, MAA00441, MAC00062",
"Imzouren, Al Hoceïma, MAA00440, MAC00031",
"Oulmes, Khemisset, MAA00438, MAC00093",
"dar bouazza, casablanca, MAA00435, MAC00070",
"Midelt, Midelt, MAA00431, MAC00056",
"Boulemane, Boulemane, MAA00430, MAC00055",
"Ain Taoujdate, El Hajeb, MAA00429, MAC00011",
"Taounate, Taounate, MAA00428, MAC00054",
"M'rirt, Khenifra, MAA00427, MAC00053",
"Laayoune, Laayoune, MAA00422, MAC00049",
"Smara, Laayoune, MAA00421, MAC00049",
"Tarfaya, Tarfaya, MAA00420, MAC00048",
"Tan Tan, Tan-Tan, MAA00419, MAC00047",
"Guelmim, Guelmim, MAA00418, MAC00046",
"Biougra, Chtouka - Ait Baha, MAA00417, MAC00045",
"JBILA, Tanger, MAA00414, MAC00036",
"AIN EL HIYANI, Tanger, MAA00413, MAC00036",
"ZIATEN, Tanger, MAA00412, MAC00036",
"STAR HILL, Tanger, MAA00411, MAC00036",
"Q.ZEMMOURI, Tanger, MAA00410, MAC00036",
"GOURZIANA, Tanger, MAA00409, MAC00036",
"Chefchaouen, Chefchaouen, MAA00408, MAC00042",
"Mdiq, M Diq - Fnideq, MAA00407, MAC00041",
"Tetouan, Tetouan, MAA00406, MAC00040",
"DAR CHAOUI, Tetouan, MAA00405, MAC00040",
"Ksar el kebir, Larache, MAA00404, MAC00038",
"Larache, Larache, MAA00402, MAC00038",
"NOUVELLE VILLE IBN BATOUTA, Tanger, MAA00401, MAC00036",
"El Hajriyine, Tanger, MAA00400, MAC00036",
"TALAA LAKRAA, Tanger, MAA00399, MAC00036",
"BNI WASSIN, Tanger, MAA00397, MAC00036",
"DAIMOUSS, Tanger, MAA00396, MAC00036",
"AIN DALIA, Tanger, MAA00395, MAC00036",
"BOUGDOUR, Tanger, MAA00394, MAC00036",
"SIDI HSSAIN, Tanger, MAA00393, MAC00036",
"CHRAKA, Tanger, MAA00392, MAC00036",
"Gueznaia, Tanger, MAA00391, MAC00036",
"NZAHA, Tanger, MAA00390, MAC00036",
"AIN MEZNOUD, Tanger, MAA00389, MAC00036",
"DEHAR JAYDI, Tanger, MAA00388, MAC00036",
"JIRRARI, Tanger, MAA00387, MAC00036",
"HAJR LASFAR, Tanger, MAA00385, MAC00036",
"HOUMAT FATMA, Tanger, MAA00384, MAC00036",
"QUARTIER AL MAJD, Tanger, MAA00382, MAC00036",
"QUARTIER HASSANI, Tanger, MAA00381, MAC00036",
"ZEMMOURI ZIATEN, Tanger, MAA00380, MAC00036",
"AL MIZAN, Tanger, MAA00379, MAC00036",
"ENNASR, Tanger, MAA00378, MAC00036",
"BAB AL ANDALOUS 1, Tanger, MAA00377, MAC00036",
"MERS ACHENAD, Tanger, MAA00376, MAC00036",
"EL MRABET, Tanger, MAA00375, MAC00036",
"KOUDIAT LAHCEN, Tanger, MAA00374, MAC00036",
"QUARTIER MIRADOR, Tanger, MAA00373, MAC00036",
"BNI MAKADA LEKDIMA, Tanger, MAA00371, MAC00036",
"GANBORIA, Tanger, MAA00370, MAC00036",
"LUXUS, Tanger, MAA00369, MAC00036",
"QUARTIER HANAA 1, Tanger, MAA00368, MAC00036",
"EL AOUDA, Tanger, MAA00367, MAC00036",
"QUARTIER QUESSIBAT, Tanger, MAA00366, MAC00036",
"AHLAN, Tanger, MAA00365, MAC00036",
"AHAMMAR, Tanger, MAA00364, MAC00036",
"BOUCHTA-ABDELATIF, Tanger, MAA00363, MAC00036",
"TAOURIRT, Taourirt, MAA00359, MAC00028",
"Guercif, Guercif, MAA00358, MAC00037",
"LAZARET, oujda, MAA00357, MAC00027",
"QUARTIER AL FATH, oujda, MAA00356, MAC00027",
"TOBA, oujda, MAA00355, MAC00027",
"HAY ZITOUNE, oujda, MAA00354, MAC00027",
"DRB ESSAYH, oujda, MAA00353, MAC00027",
"SIDI YAHYA, oujda, MAA00352, MAC00027",
"HAY EL-ANDALOUSS, oujda, MAA00351, MAC00027",
"HAY EL QODS, oujda, MAA00350, MAC00027",
"HAY RABAT, oujda, MAA00349, MAC00027",
"AOUAMA GHARBIA, Tanger, MAA00348, MAC00036",
"BRANS KDIMA, Tanger, MAA00347, MAC00036",
"KHANDEK EL WARD, Tanger, MAA00346, MAC00036",
"ADDOHA VAL FLEURI, Tanger, MAA00345, MAC00036",
"RIAD ESSALAM, Tanger, MAA00344, MAC00036",
"EL MERS 2, Tanger, MAA00343, MAC00036",
"BIRCHIFA, Tanger, MAA00342, MAC00036",
"BELLA VISTA, Tanger, MAA00341, MAC00036",
"BEN DIBAN, Tanger, MAA00340, MAC00036",
"CHARF, Tanger, MAA00339, MAC00036",
"ACHAKAR, Tanger, MAA00338, MAC00036",
"AHARRARINE, Tanger, MAA00337, MAC00036",
"LEAOUAMA, Tanger, MAA00336, MAC00036",
"MESNANA, Tanger, MAA00335, MAC00036",
"Sidi Smail, El Jadida, MAA00332, MAC00035",
"EL BEDDOUZA, SAFI, MAA00331, MAC00033",
"QARIAT SHAMSH, SAFI, MAA00329, MAC00033",
"JERIFAT, SAFI, MAA00328, MAC00033",
"SAIDA 2, SAFI, MAA00327, MAC00033",
"HAY BOUAB, SAFI, MAA00326, MAC00033",
"MESTARI, SAFI, MAA00325, MAC00033",
"QUARTIER INDUSTRIEL, SAFI, MAA00324, MAC00033",
"AZIB DRAI, SAFI, MAA00323, MAC00033",
"NOUVELLE VILLE, SAFI, MAA00322, MAC00033",
"ESSAADA, SAFI, MAA00321, MAC00033",
"LALLA HNIA AL-HAMRIYA, SAFI, MAA00320, MAC00033",
"OLD MEDINA, SAFI, MAA00319, MAC00033",
"LAMIA, SAFI, MAA00318, MAC00033",
"JNAN FESYAN, SAFI, MAA00317, MAC00033",
"AL-MOGHITIN, SAFI, MAA00316, MAC00033",
"BIYADA, SAFI, MAA00315, MAC00033",
"COOPERATIVE 3 MARS SAFI, SAFI, MAA00314, MAC00033",
"EL MASSIRA, SAFI, MAA00313, MAC00033",
"NAJAH AMIR, SAFI, MAA00312, MAC00033",
"ERRAHMA, SAFI, MAA00311, MAC00033",
"CHANKIT, SAFI, MAA00310, MAC00033",
"ASSALAM, SAFI, MAA00309, MAC00033",
"ANNAHDA, SAFI, MAA00308, MAC00033",
"ANDALOUS, SAFI, MAA00307, MAC00033",
"Ain bni mathar, Jerada, MAA00306, MAC00032",
"Saidia, Berkane, MAA00305, MAC00029",
"Al Hoceima, Al Hoceïma, MAA00304, MAC00031",
"NADOR, Nador, MAA00303, MAC00030",
"Ahfir, Berkane, MAA00302, MAC00029",
"berkane, Berkane, MAA00301, MAC00029",
"Naima, oujda, MAA00300, MAC00027",
"mghizrate, Taourirt, MAA00299, MAC00028",
"El Aioun Sidi Mellouk, Taourirt, MAA00298, MAC00028",
"OULED HASSOUN, Marrakech, MAA00297, MAC00014",
"ZAOUIET BEN SASSI, Marrakech, MAA00296, MAC00014",
"TAMENSOURT, Marrakech, MAA00295, MAC00014",
"Rahba Lekdima, Marrakech, MAA00294, MAC00014",
"Douar Ain Slim, Marrakech, MAA00293, MAC00014",
"Douar Graoua, Marrakech, MAA00292, MAC00014",
"CENTRE VILLE, oujda, MAA00291, MAC00027",
"VILLAGE SI LAKHDER, oujda, MAA00290, MAC00027",
"Tata, Tata, MAA00289, MAC00026",
"Taroudant, Taroudant, MAA00286, MAC00024",
"DCHIRA, AGADIR, MAA00285, MAC00022",
"Taddart, AGADIR, MAA00282, MAC00022",
"Anza, AGADIR, MAA00281, MAC00022",
"Nahda, AGADIR, MAA00280, MAC00022",
"Islane, AGADIR, MAA00278, MAC00022",
"Bouargane, AGADIR, MAA00277, MAC00022",
"Bensergao, AGADIR, MAA00274, MAC00022",
"Tilila, AGADIR, MAA00272, MAC00022",
"Drarga, AGADIR, MAA00269, MAC00022",
"Adrar, AGADIR, MAA00266, MAC00022",
"Hay Mohammadi, AGADIR, MAA00265, MAC00022",
"Les amicales, AGADIR, MAA00262, MAC00022",
"Charaf, AGADIR, MAA00261, MAC00022",
"Illigh, AGADIR, MAA00260, MAC00022",
"Haut-Founty, AGADIR, MAA00259, MAC00022",
"Baie des palmiers, AGADIR, MAA00258, MAC00022",
"Secteur Résidentiel, AGADIR, MAA00257, MAC00022",
"Quartier suisse, AGADIR, MAA00256, MAC00022",
"Quartier Boutchakkat, AGADIR, MAA00255, MAC00022",
"essaouira, Essaouira, MAA00254, MAC00021",
"OUNAGHA, Essaouira, MAA00253, MAC00021",
"Chichaoua, Chichaoua, MAA00252, MAC00020",
"Echemmaia, Youssoufia, MAA00250, MAC00019",
"ouarzazate, Ouarzazate, MAA00249, MAC00018",
"El Kelaa des Sraghna, El Kelaa des Sraghna, MAA00247, MAC00015",
"Ben guerir, Rehamna, MAA00246, MAC00017",
"Tameslohte, Al Haouz, MAA00245, MAC00016",
"SOUIHLA, Marrakech, MAA00244, MAC00014",
"DOUAR LAATAOUIA, El Kelaa des Sraghna, MAA00243, MAC00015",
"OUAHAT SIDI BRAHIM, Marrakech, MAA00242, MAC00014",
"TAZAKOURTE, Marrakech, MAA00241, MAC00014",
"OULAD SAID, Marrakech, MAA00240, MAC00014",
"LAGOUASSEM, Marrakech, MAA00239, MAC00014",
"AIN JDID, Marrakech, MAA00238, MAC00014",
"Wjeh Arouss, Meknes, MAA00237, MAC00003",
"Bin Lkchali, Marrakech, MAA00236, MAC00014",
"Bab Ighli, Marrakech, MAA00235, MAC00014",
"Rouidat, Marrakech, MAA00234, MAC00014",
"Douar Dlam, Marrakech, MAA00233, MAC00014",
"Socoma, Marrakech, MAA00232, MAC00014",
"Douar Laaskar, Marrakech, MAA00231, MAC00014",
"Sidi Amara, Marrakech, MAA00230, MAC00014",
"Dar Tounsi, Marrakech, MAA00229, MAC00014",
"Sanaoubar, Marrakech, MAA00228, MAC00014",
"Amerchich, Marrakech, MAA00227, MAC00014",
"Douar el Koudia, Marrakech, MAA00226, MAC00014",
"Issil, Marrakech, MAA00225, MAC00014",
"Riad Zitoun Jdid, Marrakech, MAA00224, MAC00014",
"Quartier Mabrouka, Marrakech, MAA00223, MAC00014",
"Ain Itti, Marrakech, MAA00222, MAC00014",
"Derb Dabachi, Marrakech, MAA00221, MAC00014",
"Bab Aylan, Marrakech, MAA00220, MAC00014",
"Sidi Abad, Marrakech, MAA00219, MAC00014",
"Hay Charaf, Marrakech, MAA00218, MAC00014",
"Riad Salam, Marrakech, MAA00217, MAC00014",
"Rmila, Marrakech, MAA00216, MAC00014",
"Hay Zitoun, Marrakech, MAA00215, MAC00014",
"Mouassine, Marrakech, MAA00214, MAC00014",
"Hay Lbehja, Marrakech, MAA00213, MAC00014",
"Izdihar, Marrakech, MAA00212, MAC00014",
"Bab Taghazout, Marrakech, MAA00211, MAC00014",
"EL Azzouzia, Marrakech, MAA00210, MAC00014",
"Mhamid, Marrakech, MAA00209, MAC00014",
"Jnan Awrad, Marrakech, MAA00208, MAC00014",
"Douar Iziki, Marrakech, MAA00207, MAC00014",
"Bab Ghemat, Marrakech, MAA00206, MAC00014",
"Ain Mezouar, Marrakech, MAA00205, MAC00014",
"Les Portes De Marrakesh, Marrakech, MAA00204, MAC00014",
"Semlalia, Marrakech, MAA00202, MAC00014",
"Bab Doukala, Marrakech, MAA00201, MAC00014",
"AZLI, Marrakech, MAA00200, MAC00014",
"Hay AL Massar, Marrakech, MAA00199, MAC00014",
"Massira 1, Marrakech, MAA00198, MAC00014",
"Daoudiat, Marrakech, MAA00197, MAC00014",
"Gueliz, Marrakech, MAA00195, MAC00014",
"Sidi kacem, Sidi Kacem, MAA00193, MAC00013",
"El-Hajeb, El Hajeb, MAA00191, MAC00011",
"DOUAR ALAOUI, Meknes, MAA00188, MAC00003",
"DOUAR KAID HOUSSAIN ETOUALA, Meknes, MAA00187, MAC00003",
"DOUAR RIAFA, Meknes, MAA00186, MAC00003",
"OUARZIGHA, Meknes, MAA00185, MAC00003",
"ZOUALETH DKHISSA, Meknes, MAA00184, MAC00003",
"OUED JDIDA, Meknes, MAA00183, MAC00003",
"Ouled Ben Sidehoume, Meknes, MAA00182, MAC00003",
"SIDI SLIMAN MOUL LKIFANE, Meknes, MAA00181, MAC00003",
"MAJJATE, Meknes, MAA00180, MAC00003",
"Zitoune, Meknes, MAA00179, MAC00003",
"Zehoua, Meknes, MAA00178, MAC00003",
"Zerhounia, Meknes, MAA00177, MAC00003",
"Volubilis, Meknes, MAA00176, MAC00003",
"Touargua, Meknes, MAA00175, MAC00003",
"Sidi Said, Meknes, MAA00174, MAC00003",
"Sidi Bouzekri, Meknes, MAA00173, MAC00003",
"Sidi Baba, Meknes, MAA00172, MAC00003",
"Sidi Amar, Meknes, MAA00171, MAC00003",
"Sbata, Meknes, MAA00170, MAC00003",
"Rouamzine, Meknes, MAA00169, MAC00003",
"Roua, Meknes, MAA00168, MAC00003",
"Riad (¤), Meknes, MAA00167, MAC00003",
"Plaisance, Meknes, MAA00166, MAC00003",
"Place d'Armes, Meknes, MAA00165, MAC00003",
"Ouislane, Meknes, MAA00164, MAC00003",
"Neejarine, Meknes, MAA00163, MAC00003",
"Mellah, Meknes, MAA00162, MAC00003",
"Marjane, Meknes, MAA00161, MAC00003",
"Kasbat Hadress, Meknes, MAA00160, MAC00003",
"Hay El Fakharin, Meknes, MAA00158, MAC00003",
"Hacienda, Meknes, MAA00157, MAC00003",
"Hay Salam, Meknes, MAA00156, MAC00003",
"Hamria (ville nouvelle), Meknes, MAA00155, MAC00003",
"Ennasre, Meknes, MAA00154, MAC00003",
"El Menzeh, Meknes, MAA00153, MAC00003",
"El Mansour (1, 2, 3 et 4), Meknes, MAA00152, MAC00003",
"El Malah Lakdim, Meknes, MAA00151, MAC00003",
"El Hedim (Place), Meknes, MAA00150, MAC00003",
"Dkhissa, Meknes, MAA00149, MAC00003",
"Diour Salam, Meknes, MAA00148, MAC00003",
"Diour Jedad, Meknes, MAA00147, MAC00003",
"Camilia, Meknes, MAA00146, MAC00003",
"Borj Moulay Omar, Meknes, MAA00145, MAC00003",
"Borj Meshqoq, Meknes, MAA00144, MAC00003",
"Bni-Mhmmed, Meknes, MAA00143, MAC00003",
"Berrima, Meknes, MAA00142, MAC00003",
"Belle Vue (1, 2 et 3), Meknes, MAA00141, MAC00003",
"Bel Air, Meknes, MAA00140, MAC00003",
"Bab El Khmiss, Meknes, MAA00139, MAC00003",
"Bassatine, Meknes, MAA00138, MAC00003",
"Ancienne Médina, Meknes, MAA00137, MAC00003",
"Al Manar, Meknes, MAA00136, MAC00003",
"Al Bassatine, Meknes, MAA00135, MAC00003",
"Agdal, Meknes, MAA00134, MAC00003",
"20 Aout, Meknes, MAA00133, MAC00003",
"Ifrane, Ifrane, MAA00130, MAC00008",
"Sefrou, Sefrou, MAA00129, MAC00007",
"Taza, Taza, MAA00128, MAC00006",
"MOULAY YAAKOUB, FES, MAA00127, MAC00004",
"AIN SHIKH, FES, MAA00126, MAC00004",
"SIDI HRAZEM, FES, MAA00125, MAC00004",
"DOUAR EL GAADA, FES, MAA00124, MAC00004",
"AIN BIDA, FES, MAA00123, MAC00004",
"OULAD TAYEB, FES, MAA00122, MAC00004",
"AIN CHKEF, Moulay Yaâcoub, MAA00121, MAC00005",
"DOUAR MACHERAA KRIM, FES, MAA00120, MAC00004",
"AIN ALLAH, FES, MAA00119, MAC00004",
"DOUAR TLAHA, FES, MAA00118, MAC00004",
"HAY TARIK 2, FES, MAA00117, MAC00004",
"QUARTIER ERRACHIDIA, FES, MAA00116, MAC00004",
"HAY LHANDIYA, FES, MAA00115, MAC00004",
"Hay Chemaaou, SALE, MAA00114, MAC00002",
"Municipalité Toulal, Meknes, MAA00113, MAC00003",
"KOUASS, Rabat, MAA00112, MAC00001",
"Sehb, SALE, MAA00111, MAC00002",
"Lotissement Assalam, SALE, MAA00110, MAC00002",
"Groupe Residantiel Annaim, SALE, MAA00109, MAC00002",
"Nahda, SALE, MAA00108, MAC00002",
"Kariat, SALE, MAA00107, MAC00002",
"Lotissement Fath AL Khayr, SALE, MAA00106, MAC00002",
"Lotissement Villa, SALE, MAA00105, MAC00002",
"Addoha Abwab Sale, SALE, MAA00104, MAC00002",
"Hay Rahma, SALE, MAA00103, MAC00002",
"Hay Sakani, SALE, MAA00102, MAC00002",
"Hay Houria, SALE, MAA00101, MAC00002",
"Hay Al Qoriaa, SALE, MAA00100, MAC00002",
"Haja, SALE, MAA00099, MAC00002",
"Hay Moulay Smail, SALE, MAA00098, MAC00002",
"Lotissement Said Haji, SALE, MAA00097, MAC00002",
"Quartier Betana, SALE, MAA00096, MAC00002",
"SOUISSI, Rabat, MAA00092, MAC00001",
"SOUIKA, Rabat, MAA00091, MAC00001",
"SIDI FATEH, Rabat, MAA00090, MAC00001",
"SAHAT AL ALAOUINE, Rabat, MAA00089, MAC00001",
"RYAD HAUT (AV, JACARANDA- AUTOROUTE CASA-FÈS), Rabat, MAA00088, MAC00001",
"RYAD BAS (AV, JACARANDA- AV. IBN ROCHD), Rabat, MAA00087, MAC00001",
"ROUTE CASABLANCA, Rabat, MAA00086, MAC00001",
"QUARTIER INDUSTRIEL, Rabat, MAA00085, MAC00001",
"PLACE PIETRI, Rabat, MAA00084, MAC00001",
"PLACE BRUXELLES, Rabat, MAA00083, MAC00001",
"PLACE BAB TAMESNA, Rabat, MAA00082, MAC00001",
"PLACE AL OUAHDA AL IFRIQUIA, Rabat, MAA00081, MAC00001",
"PLACE AL JOULANE, Rabat, MAA00080, MAC00001",
"PLACE AL BARID, Rabat, MAA00079, MAC00001",
"PLACE ABRAHAM LINCON, Rabat, MAA00078, MAC00001",
"PLACE ABDELLAH CHEFCHAOUNI, Rabat, MAA00077, MAC00001",
"OUM KALTHOUM, Rabat, MAA00076, MAC00001",
"OLM, Rabat, MAA00075, MAC00001",
"OCÉAN, Rabat, MAA00074, MAC00001",
"MOUNTAZAH, Rabat, MAA00073, MAC00001",
"MOUNTALAK, Rabat, MAA00072, MAC00001",
"MELLAH, Rabat, MAA00071, MAC00001",
"MEDINA, Rabat, MAA00070, MAC00001",
"MECHOUAR, Rabat, MAA00069, MAC00001",
"MASSIRA, Rabat, MAA00068, MAC00001",
"MARASSA SANIAT GHARBIA, Rabat, MAA00067, MAC00001",
"MABILLA, Rabat, MAA00066, MAC00001",
"LOT TAZI, Rabat, MAA00065, MAC00001",
"LES ORANGERS, Rabat, MAA00064, MAC00001",
"LES AMBASSADEURS, Rabat, MAA00063, MAC00001",
"LAGZA, Rabat, MAA00062, MAC00001",
"LAALOU, Rabat, MAA00061, MAC00001",
"LA CORNICHE, Rabat, MAA00060, MAC00001",
"LA CIGOGNE, Rabat, MAA00059, MAC00001",
"KSAR LABHAR, Rabat, MAA00058, MAC00001",
"AMAL, Rabat, MAA00057, MAC00001",
"AL WAHDA, Rabat, MAA00056, MAC00001",
"AL INBIAT, Rabat, MAA00055, MAC00001",
"FARAH, Rabat, MAA00054, MAC00001",
"AKKARI, Rabat, MAA00053, MAC00001",
"AIN KHALLOUIA, Rabat, MAA00052, MAC00001",
"HAUT AGDAL (AVENUE DE FRANCE- AVENUE, IBN ROCH), Rabat, MAA00051, MAC00001",
"BAS AGDAL (AVENUE DE FRANCE - AVENUE DE LA VICTOIRE), Rabat, MAA00050, MAC00001",
"ABI REKRAK, Rabat, MAA00049, MAC00001",
"KEBIBAT, Rabat, MAA00047, MAC00001",
"KASBAT OUDAYA, Rabat, MAA00046, MAC00001",
"KARYOUNE, Rabat, MAA00045, MAC00001",
"KAMRA SUD, Rabat, MAA00044, MAC00001",
"KAMRA NORD, Rabat, MAA00043, MAC00001",
"TAKADDOUM, Rabat, MAA00042, MAC00001",
"IMMEUBLE KARRAKCHOU, Rabat, MAA00041, MAC00001",
"HAY EL KHEIR, Rabat, MAA00040, MAC00001",
"HAY EL FATH, Rabat, MAA00039, MAC00001",
"HASSAN, Rabat, MAA00038, MAC00001",
"HAJ SLIMANE, Rabat, MAA00037, MAC00001",
"HAJ KACEM, Rabat, MAA00036, MAC00001",
"GUICH LOUDAYA, Rabat, MAA00035, MAC00001",
"FADESA, Rabat, MAA00034, MAC00001",
"ESSABAH, Rabat, MAA00033, MAC00001",
"ERRACHAD, Rabat, MAA00032, MAC00001",
"ENNAHDA III, Rabat, MAA00031, MAC00001",
"ENNAHDA II, Rabat, MAA00030, MAC00001",
"ENNAHDA I, Rabat, MAA00029, MAC00001",
"ENNAHDA, Rabat, MAA00028, MAC00001",
"EL OUFIR, Rabat, MAA00027, MAC00001",
"EL MOUADDA, Rabat, MAA00026, MAC00001",
"EL MENZEH, Rabat, MAA00025, MAC00001",
"DOUAR RJA FELLAH, Rabat, MAA00024, MAC00001",
"DIOUR JAMAA, Rabat, MAA00023, MAC00001",
"DAR ESSALAM, Rabat, MAA00022, MAC00001",
"CYM, Rabat, MAA00021, MAC00001",
"CITE YAACOUB AL MANSOUR, Rabat, MAA00020, MAC00001",
"CITÉ OLM, Rabat, MAA00019, MAC00001",
"CITÉ FOCH, Rabat, MAA00018, MAC00001",
"CITÉ ADMINISTRATIVE, Rabat, MAA00017, MAC00001",
"CENTRE VILLE, Rabat, MAA00016, MAC00001",
"BOUITATE, Rabat, MAA00015, MAC00001",
"BOUHLAL, Rabat, MAA00014, MAC00001",
"BIR KACEM, Rabat, MAA00013, MAC00001",
"BD. MOHAMED V, Rabat, MAA00012, MAC00001",
"AVIATION, Rabat, MAA00011, MAC00001",
"AVENUE FÈS ET TAREK IBN ZYAD, Rabat, MAA00010, MAC00001",
"AV. BOUREGREG, Rabat, MAA00009, MAC00001",
"AV. ALLAL BEN ABDELLAH, Rabat, MAA00008, MAC00001",
"ANCIENNE MÉDINA, Rabat, MAA00007, MAC00001",
"AMAL 6, Rabat, MAA00006, MAC00001",
"AMAL 5, Rabat, MAA00005, MAC00001",
"AMAL 4, Rabat, MAA00004, MAC00001",
"AMAL 3, Rabat, MAA00003, MAC00001",
"AMAL 2, Rabat, MAA00002, MAC00001",
"AMAL 1, Rabat, MAA00001, MAC00001"
];

const DEFAULT_MOROCCAN_CITIES = [
  "Achakkar", "Afourar", "Afra", "Afsou", "Agadir", "Agafay", "Agdez", "Agds", 
  "Agouidir", "Agourai", "Aguelmous", "Ahfir", "Ain Aicha", "Ain Attig", 
  "Ain chkaf", "Ain El Aouda", "Ain Erreggada", "Ain Harrouda", "Ain Leuh", 
  "Ain Mediouna", "Ain Taoujdate", "Ain-Beni-Mathar", "Ain-Cheggag", 
  "Ait Aiaaza", "Ait Aissa Ou Brahim", "Ait Amira", "Ait Boudaoud", "Ait Daoud",
  "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir", "Meknes", 
  "Oujda", "Kenitra", "Tetouan", "Safi", "Mohammedia", "El Jadida", "Beni Mellal",
  "Essaouira", "Azilal", "Ouarzazate", "Al Hoceima", "Larache", "Guelmim", 
  "Khouribga", "Berkane", "Settat", "Nador", "Sidi Bennour", "Boulemane",
  "Chefchaouen", "Ifrane", "Khenifra", "Midelt", "Taounate", "Jerada", "Sefrou",
  "Benguerir", "Assilah", "Azemmour", "Berrechid", "Benslimane", "Biougra",
  "Bouznika", "Drarga", "Errachidia", "Fquih Ben Salah", "Guercif", "Ighoud",
  "Imintanout", "Inzegane", "Kasba Tadla", "Kelaat MGouna", "Ksar El Kebir",
  "Laarache", "Laayoune", "Martil", "Mdiq", "Ouazzane", "Outat El Haj",
  "Oulad Teima", "Saidia", "Sale", "Sala El Jadida", "Smara", "Tan-Tan",
  "Tarfaya", "Taroudant", "Taza", "Tiznit", "Tinghir", "Youssoufia", "Zagora"
];

// Define the types inline instead of importing from non-existent module
type ShopifyShopRecord = {
  id: string;
  [key: string]: any;
};

type GoogleSheetConfigRecord = {
  id: string;
  spreadsheetId: string;
  orderSheetName: string;
  customerSheetName: string;
  courierApiKey: string | null;
  courierApiProvider: string | null;
  [key: string]: any;
};

// Fallback mock functions for development
const mockApiFunctions = {
  quickTestWrite: async (params: { shopId: string }) => ({
    success: true,
    message: "Test data successfully written (mock)",
  }),
  testWriteToSheet: async (params: { spreadsheetId: string, sheetName: string }) => ({
    success: true,
    message: "Test data successfully written (mock)",
  })
};

// Helper function to safely call API with fallback
const safeApiCall = async (functionName: string, params?: any) => {
  try {
    // @ts-ignore - We know these might not exist yet
    if (typeof api[functionName] === 'function') {
      // @ts-ignore
      return await api[functionName](params);
    } else {
      console.warn(`API function ${functionName} not found, using mock data`);
      // @ts-ignore
      return await mockApiFunctions[functionName](params);
    }
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    // @ts-ignore
    if (mockApiFunctions[functionName]) {
      // @ts-ignore
      return await mockApiFunctions[functionName](params);
    }
    throw error;
  }
};

export const GoogleSheetConfigPage = () => {
  const { isAuthenticated } = useGadget();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [gSheetTestLoading, setGSheetTestLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [gSheetError, setGSheetError] = useState("");
  const [gSheetSuccess, setGSheetSuccess] = useState("");
  const [existingConfig, setExistingConfig] = useState<GoogleSheetConfigRecord | null>(null);
  const [shop, setShop] = useState<ShopifyShopRecord | null>(null);
  
  // Sendit API configuration
  const [senditConfig, setSenditConfig] = useState({
    publicKey: "",
    secretKey: ""
  });
  const [existingSenditConfig, setExistingSenditConfig] = useState<any | null>(null);
  const [senditSaveLoading, setSenditSaveLoading] = useState(false);
  const [senditError, setSenditError] = useState("");
  const [senditSuccess, setSenditSuccess] = useState("");

  // City management state
  const [customCities, setCustomCities] = useState<any[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [selectedCourierType, setSelectedCourierType] = useState("sendit");
  const [cityError, setCityError] = useState("");
  const [citySuccess, setCitySuccess] = useState("");
  
  // Enhanced city management state for better UX with large lists
  const [citySearchValue, setCitySearchValue] = useState("");
  const [cityFilterCourier, setCityFilterCourier] = useState("all");
  const [citiesCurrentPage, setCitiesCurrentPage] = useState(1);
  const [citiesPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<'name' | 'courierType'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Bulk city import state
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkCityText, setBulkCityText] = useState("");
  const [bulkCourierType, setBulkCourierType] = useState("sendit");
  const [bulkImportLoading, setBulkImportLoading] = useState(false);

  // Speedaf API configuration
  const [speedafConfig, setSpeedafConfig] = useState({
    appCode: "",
    secretKey: "",
    customerCode: "",
    platformSource: "",
    apiEndpoint: ""
  });
  const [existingSpeedafConfig, setExistingSpeedafConfig] = useState<any | null>(null);
  const [speedafSaveLoading, setSpeedafSaveLoading] = useState(false);
  const [speedafError, setSpeedafError] = useState("");
  const [speedafSuccess, setSpeedafSuccess] = useState("");

  // Tab state
  const [selectedTab, setSelectedTab] = useState(0);

  const [config, setConfig] = useState({
    spreadsheetId: "",
    orderSheetName: "Orders",
    customerSheetName: "Inventory",
    courierApiKey: "",
    courierApiProvider: "shippo" // Default value
  });

  // Enhanced city management functions for large lists
  const getFilteredAndSortedCities = useCallback(() => {
    let filtered = [...customCities];
    
    // Apply search filter
    if (citySearchValue.trim()) {
      const searchTerm = citySearchValue.toLowerCase();
      filtered = filtered.filter(city => 
        city.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply courier type filter
    if (cityFilterCourier !== 'all') {
      filtered = filtered.filter(city => city.courierType === cityFilterCourier);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'courierType':
          aValue = a.courierType;
          bValue = b.courierType;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  }, [customCities, citySearchValue, cityFilterCourier, sortBy, sortDirection]);

  const getPaginatedCities = useCallback(() => {
    const filtered = getFilteredAndSortedCities();
    const startIndex = (citiesCurrentPage - 1) * citiesPageSize;
    const endIndex = Math.min(startIndex + citiesPageSize, filtered.length);
    return {
      cities: filtered.slice(startIndex, endIndex),
      totalCount: filtered.length,
      totalPages: Math.ceil(filtered.length / citiesPageSize)
    };
  }, [getFilteredAndSortedCities, citiesCurrentPage, citiesPageSize]);

  const handleCityPageChange = useCallback((newPage: number) => {
    setCitiesCurrentPage(newPage);
  }, []);

  const handleSortChange = useCallback((newSortBy: 'name' | 'courierType') => {
    if (sortBy === newSortBy) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
    setCitiesCurrentPage(1); // Reset to first page when sorting changes
  }, [sortBy]);

  // Pre-computed normalized city sets for O(1) lookup performance
  const normalizedCitySets = useMemo(() => {
    const senditSet = new Set<string>(DEFAULT_SENDIT_CITIES.map(city => city.toLowerCase().trim()));
    const generalSet = new Set<string>(DEFAULT_MOROCCAN_CITIES.map(city => city.toLowerCase().trim()));
    
    // For speedaf, create a set of all city parts (normalized)
    const speedafSet = new Set<string>();
    DEFAULT_SPEEDAF_CITIES.forEach(city => {
      const parts = city.split(',').map(part => part.toLowerCase().trim());
      parts.forEach(part => speedafSet.add(part));
    });
    
    return {
      sendit: senditSet,
      speedaf: speedafSet,
      general: generalSet
    };
  }, []);

  // Helper function to get default cities for a courier type
  const getDefaultCitiesForCourierType = useCallback((courierType: string): string[] => {
    switch (courierType) {
      case "sendit":
        return DEFAULT_SENDIT_CITIES;
      case "speedaf":
        return DEFAULT_SPEEDAF_CITIES;
      case "general":
        return DEFAULT_MOROCCAN_CITIES;
      default:
        return DEFAULT_SENDIT_CITIES;
    }
  }, []);

  // Optimized helper function to check if a city exists in legacy list - O(1) time complexity
  const checkCityExistsInLegacyList = useCallback((cityName: string, courierType: string): boolean => {
    const normalizedInputCity = cityName.toLowerCase().trim();
    
    let citySet: Set<string>;
    switch (courierType) {
      case 'sendit':
        citySet = normalizedCitySets.sendit;
        break;
      case 'speedaf':
        citySet = normalizedCitySets.speedaf;
        break;
      case 'general':
        citySet = normalizedCitySets.general;
        break;
      default:
        citySet = normalizedCitySets.sendit;
    }
    
    const isFound = citySet.has(normalizedInputCity);
    
    // Optional: Only log during development, remove in production for better performance
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Fast lookup: "${cityName}" in ${courierType} -> ${isFound ? '✅ FOUND' : '❌ NOT FOUND'}`);
    }
    
    return isFound;
  }, [normalizedCitySets]);

  // Memoized custom city map for O(1) lookups
  const customCityMap = useMemo(() => {
    const map = new Map<string, boolean>();
    customCities.forEach(city => {
      const cityKey = `${city.name.toLowerCase().trim()}:${city.courierType}`;
      map.set(cityKey, true);
    });
    return map;
  }, [customCities]);

  // Optimized helper function to check if city exists in custom cities - O(1) time complexity
  const checkCityExistsInCustomList = useCallback((cityName: string, courierType: string): boolean => {
    const normalizedInputCity = cityName.toLowerCase().trim();
    const key = `${normalizedInputCity}:${courierType}`;
    
    const isFound = customCityMap.has(key);
    
    // Optional: Only log during development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Fast custom lookup: "${cityName}" in ${courierType} -> ${isFound ? '✅ FOUND' : '❌ NOT FOUND'}`);
    }
    
    return isFound;
  }, [customCityMap]);

  // City management functions - defined early to avoid reference errors
  const loadCustomCities = useCallback(async () => {
    if (!shop?.id) return;

    try {
      setCitiesLoading(true);
      // @ts-ignore - API type not available but works at runtime
      const result = await api.getCustomCities({ shopId: shop.id });

      if (result.success) {
        setCustomCities(result.cities || []);
      } else {
        console.error("Failed to load custom cities:", result.error);
      }
    } catch (error: any) {
      console.error("Error loading custom cities:", error);
    } finally {
      setCitiesLoading(false);
    }
  }, [shop?.id]);

  // Load existing config when authenticated
  useEffect(() => {
    const loadConfig = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const shopResult = await api.shopifyShop.findFirst();
          setShop(shopResult);
          
          // Load Google Sheet config
          const result = await api.googleSheetConfig.findFirst({
            filter: { shopId: { equals: shopResult.id } }
          });
          
          if (result) {
            setExistingConfig(result);
            setConfig({
              spreadsheetId: result.spreadsheetId || "",
              orderSheetName: result.orderSheetName || "Orders",
              customerSheetName: result.customerSheetName || "Inventory",
              courierApiKey: result.courierApiKey || "",
              courierApiProvider: result.courierApiProvider || "shippo"
            });
          }
          
          // Load Sendit config
          try {
            const senditResult = await api.senditConfig.findFirst({
              filter: { shopId: { equals: shopResult.id } }
            });
            
            if (senditResult) {
              setExistingSenditConfig(senditResult);
              setSenditConfig({
                publicKey: senditResult.publicKey || "",
                secretKey: "" // Don't show the secret key for security
              });
              setSenditSuccess(`Existing configuration found. Connected as: ${senditResult.name || 'Sendit User'}`);
            }
          } catch (senditError) {
            console.warn("No existing Sendit configuration found", senditError);
          }
          
          // Load Speedaf config
          try {
            const speedafResult = await api.speedafConfig.findFirst({
              filter: { shopId: { equals: shopResult.id } }
            });
            
            if (speedafResult) {
              setExistingSpeedafConfig(speedafResult);
              setSpeedafConfig({
                appCode: speedafResult.appCode || "",
                secretKey: "", // Don't show the secret key for security
                customerCode: speedafResult.customerCode || "",
                platformSource: speedafResult.platformSource || "",
                apiEndpoint: speedafResult.apiEndpoint || ""
              });
              setSpeedafSuccess(`Existing configuration found. Connected as: ${speedafResult.name || 'Speedaf User'}`);
            }
          } catch (speedafError) {
            console.warn("No existing Speedaf configuration found", speedafError);
          }

          // Load custom cities
          await loadCustomCities();

        } catch (error) {
          console.error("Error loading config:", error);
          setFormError("Error loading configuration. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadConfig();
  }, [isAuthenticated, loadCustomCities]);

  // Test Google Sheet connection
  const testGoogleSheetConnection = async (shopId: string, spreadsheetId: string): Promise<boolean> => {
    try {
      // Call the quickTestWrite action directly
      const result = await safeApiCall('quickTestWrite', {
        shopId: shopId
      });
      
      if (result && result.success) {
        return true;
      } else {
        setGSheetError(`Test failed: ${result?.message || "Unknown error"}`);
        return false;
      }
    } catch (error: unknown) {
      console.error("Error testing Google Sheets:", error);
      setGSheetError(`Connection test failed: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  };

  // Handle create or update Google Sheet config
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setGSheetError("You must be authenticated to save configuration");
      return;
    }

    try {
      setSaveLoading(true);
      setGSheetError("");
      setGSheetSuccess("");
      
      if (!shop?.id) {
        throw new Error("Could not find shop ID");
      }
      
      if (!config.spreadsheetId.trim()) {
        setGSheetError("Spreadsheet ID is required");
        return;
      }
      
      // Create the configuration object with the correct field format
      const configData = {
        spreadsheetId: config.spreadsheetId.trim(),
        orderSheetName: config.orderSheetName || "Orders",
        customerSheetName: config.customerSheetName || "Inventory",
        // Keep these fields in the backend data but don't show in UI
        courierApiKey: config.courierApiKey || "",
        courierApiProvider: config.courierApiProvider || "shippo",
        shop: { _link: shop.id }
      };
      
      let result;
      if (existingConfig) {
        // Update existing config
        result = await api.googleSheetConfig.update(existingConfig.id, configData);
        setExistingConfig(result);
        
        // After updating, test the connection
        const testResult = await testGoogleSheetConnection(shop.id, config.spreadsheetId.trim());
        if (testResult) {
          setGSheetSuccess("Google Sheet configuration updated and connection tested successfully!");
        } else {
          setGSheetSuccess("Google Sheet configuration updated, but connection test failed. Please check your Spreadsheet ID.");
        }
      } else {
        // Create new config
        result = await api.googleSheetConfig.create(configData);
        setExistingConfig(result);
        
        // After creating, test the connection
        const testResult = await testGoogleSheetConnection(shop.id, config.spreadsheetId.trim());
        if (testResult) {
          setGSheetSuccess("Google Sheet configuration created and connection tested successfully!");
        } else {
          setGSheetSuccess("Google Sheet configuration created, but connection test failed. Please check your Spreadsheet ID.");
        }
      }

    } catch (error) {
      console.error("Error saving config:", error);
      
      // Extract a better error message
      let errorMessage = "Failed to save configuration. Please try again.";
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setGSheetError(errorMessage);
    } finally {
      setSaveLoading(false);
    }
  };

  // Test and save Sendit API credentials
  const testSenditConnection = async () => {
    // Validate input
    if (!senditConfig.publicKey.trim()) {
      setSenditError("Public key is required");
      return;
    }
    
    if (!senditConfig.secretKey.trim()) {
      setSenditError("Secret key is required");
      return;
    }
    
    try {
      // Clear previous messages
      setSenditError("");
      setSenditSuccess("");
      
      // Set loading state
      setSenditSaveLoading(true);
      
      // Call the API with saveToPersistent=true
      const result = await api.testSenditConnection({
        publicKey: senditConfig.publicKey.trim(),
        secretKey: senditConfig.secretKey.trim(),
        saveToPersistent: true
      });
      
      console.log("Sendit test result:", result);
      
      if (result.success) {
        // Update the local state with the new config
        if (result.configId) {
          setExistingSenditConfig({
            id: result.configId,
            name: result.name,
            publicKey: senditConfig.publicKey,
            isNew: result.isNew
          });
        }
        
        // Format success message
        let message = `Connection successful! Connected as: ${result.name || 'Sendit User'}`;
        
        // Add saved credentials info if applicable
        if (result.savedCredentials) {
          message += ". Configuration has been saved.";
        } else if (result.saveError) {
          message += `. However, failed to save credentials: ${result.saveError}`;
        }
            
        setSenditSuccess(message);
      } else {
        // For failed connection
        setSenditError(`Connection failed: ${result.message || result.error || 'Unknown error'}`);
      }
      
    } catch (error: unknown) {
      console.error("Error testing Sendit connection:", error);
      setSenditError(`Error testing connection: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSenditSaveLoading(false);
    }
  };

  // Delete Sendit configuration
  const deleteSenditConfig = async () => {
    if (!isAuthenticated || !existingSenditConfig?.id) {
      setSenditError("Cannot delete configuration. No existing configuration found.");
      return;
    }
    
    try {
      // Clear previous messages
      setSenditError("");
      setSenditSuccess("");
      
      // Set loading state
      setSenditSaveLoading(true);
      
      // Store ID for later verification
      const configIdToDelete = existingSenditConfig.id;
      
      // Perform deletion
      await api.senditConfig.delete(configIdToDelete);
      console.log("Delete API call completed for configId:", configIdToDelete);
      
      // Reset local state immediately
      setExistingSenditConfig(null);
      setSenditConfig({
        publicKey: "",
        secretKey: ""
      });
      
      setSenditSuccess("Sendit configuration has been deleted successfully.");
      
      // Verify deletion after a delay
      setTimeout(() => {
        // Try to verify the deletion worked - but don't block on this
        api.senditConfig.findFirst().then(
          (result) => {
            if (result) {
              console.warn("A configuration still exists after deletion");
              setSenditError("Configuration may not have been fully deleted. Please try again or contact support.");
            } else {
              console.log("Verified: No active configurations exist");
            }
          },
          (error) => console.log("Verification error (this is normal if deletion worked):", error)
        );
      }, 2000);
    } catch (error) {
      console.error("Error deleting Sendit configuration:", error);
      setSenditError(`Error deleting configuration: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSenditSaveLoading(false);
    }
  };

  // City management functions
  const addCustomCity = useCallback(async () => {
    if (!shop?.id || !newCityName.trim()) return;

    try {
      setCityError("");
      setCitySuccess("");

      const cityName = newCityName.trim();

      // Check if city already exists in custom cities
      if (checkCityExistsInCustomList(cityName, selectedCourierType)) {
        setCityError(`City "${cityName}" is already added to your custom ${selectedCourierType} cities list.`);
        return;
      }

      // Check if city exists in legacy/default cities
      if (checkCityExistsInLegacyList(cityName, selectedCourierType)) {
        setCityError(`City "${cityName}" already exists in the default ${selectedCourierType} cities list. No need to add it again.`);
        return;
      }

      console.log("Attempting to create city:", {
        name: cityName,
        courierType: selectedCourierType,
        shopId: shop.id
      });

      // @ts-ignore - API type not available but works at runtime
      const result = await api.customCity.create({
        name: cityName,
        courierType: selectedCourierType,
        shop: { _link: shop.id }
      });

      console.log("Create city result:", result);

      // Check if the record was created successfully (result should be the created record)
      if (result && result.id) {
        setCitySuccess(`City "${cityName}" added successfully!`);
        setNewCityName("");
        setCitiesCurrentPage(1); // Reset to first page
        await loadCustomCities(); // Reload the list
      } else {
        console.error("Unexpected result format:", result);
        setCityError("Failed to add city - unexpected response format");
      }
    } catch (error: any) {
      console.error("Error adding custom city:", error);
      
      // More detailed error message
      let errorMessage = "Failed to add city";
      if (error.message) {
        errorMessage += `: ${error.message}`;
      } else if (error.toString) {
        errorMessage += `: ${error.toString()}`;
      }
      
      setCityError(errorMessage);
    }
  }, [shop?.id, newCityName, selectedCourierType, loadCustomCities, checkCityExistsInCustomList, checkCityExistsInLegacyList]);

  const removeCustomCity = useCallback(async (cityId: string, cityName: string) => {
    try {
      setCityError("");
      setCitySuccess("");

      // @ts-ignore - API type not available but works at runtime
      await api.customCity.delete(cityId);

      setCitySuccess(`City "${cityName}" removed successfully!`);
      
      // Check if we need to go back a page (if we just removed the last item on current page)
      const { totalPages } = getPaginatedCities();
      if (citiesCurrentPage > totalPages && citiesCurrentPage > 1) {
        setCitiesCurrentPage(citiesCurrentPage - 1);
      }
      
      await loadCustomCities(); // Reload the list
    } catch (error: any) {
      console.error("Error removing custom city:", error);
      setCityError(error.message || "Failed to remove city");
    }
  }, [loadCustomCities, getPaginatedCities, citiesCurrentPage]);

  // Save or update Speedaf API credentials (without testing)
  const handleSpeedafSubmit = async () => {
    // Validate input
    if (!speedafConfig.appCode.trim()) {
      setSpeedafError("App Code is required");
      return;
    }
    
    if (!speedafConfig.secretKey.trim() && !existingSpeedafConfig) {
      setSpeedafError("Secret Key is required");
      return;
    }
    
    if (!speedafConfig.customerCode.trim()) {
      setSpeedafError("Customer Code is required");
      return;
    }
    
    try {
      // Clear previous messages
      setSpeedafError("");
      setSpeedafSuccess("");
      
      // Set loading state
      setSpeedafSaveLoading(true);

      // Get the shop ID - either from state or fetch new
      let shopId = shop?.id;
      if (!shopId) {
        const shopResult = await api.shopifyShop.findFirst();
        if (!shopResult?.id) {
          throw new Error("Could not find shop ID");
        }
        setShop(shopResult);
        shopId = shopResult.id;
      }
      
      let result;
      
      // If we have an existing config, update it
      if (existingSpeedafConfig) {
        // Prepare data for update
        const updateData: any = {
          appCode: speedafConfig.appCode.trim(),
          customerCode: speedafConfig.customerCode.trim(),
          platformSource: speedafConfig.platformSource.trim() || undefined,
          apiEndpoint: speedafConfig.apiEndpoint.trim() || undefined
        };
        
        // Only include secretKey if it was provided (to maintain existing one)
        if (speedafConfig.secretKey.trim()) {
          updateData.secretKey = speedafConfig.secretKey.trim();
        }
        
        result = await api.speedafConfig.update(existingSpeedafConfig.id, updateData);
        
        // Update local state
        setExistingSpeedafConfig({
          ...existingSpeedafConfig,
          ...updateData,
          // Don't update the secret key in UI state
          secretKey: undefined
        });
        
        setSpeedafSuccess("Speedaf configuration updated successfully.");
      } else {
        // Create new configuration
        result = await api.speedafConfig.create({
          appCode: speedafConfig.appCode.trim(),
          secretKey: speedafConfig.secretKey.trim(),
          customerCode: speedafConfig.customerCode.trim(),
          platformSource: speedafConfig.platformSource.trim() || undefined,
          apiEndpoint: speedafConfig.apiEndpoint.trim() || undefined,
          name: "Speedaf User", // Set a default name
          shop: { _link: shopId }
        });
        
        // Update local state with new config
        setExistingSpeedafConfig({
          id: result.id,
          name: result.name || "Speedaf User",
          appCode: speedafConfig.appCode,
          customerCode: speedafConfig.customerCode,
          platformSource: speedafConfig.platformSource,
          apiEndpoint: speedafConfig.apiEndpoint
        });
        
        setSpeedafSuccess("Speedaf configuration created successfully.");
      }
      
    } catch (error: unknown) {
      console.error("Error saving Speedaf configuration:", error);
      setSpeedafError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSpeedafSaveLoading(false);
    }
  };

  // Delete Speedaf configuration
  const deleteSpeedafConfig = async () => {
    if (!isAuthenticated || !existingSpeedafConfig?.id) {
      setSpeedafError("Cannot delete configuration. No existing configuration found.");
      return;
    }
    
    try {
      // Clear previous messages
      setSpeedafError("");
      setSpeedafSuccess("");
      
      // Set loading state
      setSpeedafSaveLoading(true);
      
      // Store ID for later verification
      const configIdToDelete = existingSpeedafConfig.id;
      
      // Perform deletion
      await api.speedafConfig.delete(configIdToDelete);
      
      // Reset local state immediately
      setExistingSpeedafConfig(null);
      setSpeedafConfig({
        appCode: "",
        secretKey: "",
        customerCode: "",
        platformSource: "",
        apiEndpoint: ""
      });
      
      setSpeedafSuccess("Speedaf configuration has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting Speedaf configuration:", error);
      setSpeedafError(`Error deleting configuration: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSpeedafSaveLoading(false);
    }
  };

  const tabs = [
    {
      id: 'general',
      content: 'General',
      accessibilityLabel: 'General Configuration',
      panelID: 'general-panel',
    },
    {
      id: 'city-list',
      content: 'City List',
      accessibilityLabel: 'City Management',
      panelID: 'city-list-panel',
    },
  ];

  const handleTabChange = (selectedTabIndex: number) => {
    setSelectedTab(selectedTabIndex);
  };

  // Bulk city import function
  const handleBulkImport = useCallback(async () => {
    if (!shop?.id || !bulkCityText.trim()) return;

    setBulkImportLoading(true);
    setCityError("");
    setCitySuccess("");

    try {
      // Parse the bulk text - split by lines and clean up
      const cityNames = bulkCityText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .filter((name, index, arr) => arr.indexOf(name) === index); // Remove duplicates

      if (cityNames.length === 0) {
        setCityError("No valid city names found. Please enter city names separated by new lines.");
        return;
      }

      console.log(`Attempting to create ${cityNames.length} cities for courier: ${bulkCourierType}`);

      const results: string[] = [];
      const failed: Array<{ name: string; error: string }> = [];
      const skipped: Array<{ name: string; reason: string }> = [];

      // Pre-filter all cities to separate new ones from duplicates (ultra-fast O(1) operations)
      const newCities = [];
      for (const cityName of cityNames) {
        // Check if city already exists in custom cities (O(1))
        if (checkCityExistsInCustomList(cityName, bulkCourierType)) {
          skipped.push({ name: cityName, reason: "Already in custom cities list" });
          continue;
        }

        // Check if city exists in legacy/default cities (O(1))
        if (checkCityExistsInLegacyList(cityName, bulkCourierType)) {
          skipped.push({ name: cityName, reason: "Already in default cities list" });
          continue;
        }

        // If we reach here, city is new and can be added
        newCities.push(cityName);
      }

      console.log(`📊 Pre-filtering results: ${newCities.length} new, ${skipped.length} skipped`);

      // Process new cities in parallel batches for maximum performance
      const BATCH_SIZE = 10; // Process 10 cities at once
      for (let i = 0; i < newCities.length; i += BATCH_SIZE) {
        const batch = newCities.slice(i, i + BATCH_SIZE);
        
        // Process batch in parallel
        const batchPromises = batch.map(async (cityName) => {
          try {
            // @ts-ignore - API type not available but works at runtime
            const result = await api.customCity.create({
              name: cityName,
              courierType: bulkCourierType,
              shop: { _link: shop.id }
            });

            if (result && result.id) {
              return { success: true, cityName };
            } else {
              return { success: false, cityName, error: "Unexpected response format" };
            }
          } catch (error: any) {
            console.error(`Error adding city "${cityName}":`, error);
            return { 
              success: false, 
              cityName, 
              error: error.message || error.toString() || "Unknown error" 
            };
          }
        });

        // Wait for batch to complete
        const batchResults = await Promise.all(batchPromises);
        
        // Process batch results
        batchResults.forEach(result => {
          if (result.success) {
            results.push(result.cityName);
          } else {
            failed.push({ name: result.cityName, error: result.error });
          }
        });

        // Optional: small delay between batches to be gentle on the API
        if (i + BATCH_SIZE < newCities.length) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      // Show results with counts only for better performance and cleaner UI
      let successMessage = "";
      let errorMessage = "";

      if (results.length > 0) {
        successMessage = `Successfully added ${results.length} cities`;
      }

      if (skipped.length > 0) {
        const skipMessage = `Skipped ${skipped.length} cities (already exist)`;
        successMessage = successMessage ? `${successMessage}. ${skipMessage}` : skipMessage;
      }

      if (failed.length > 0) {
        errorMessage = `Failed to add ${failed.length} cities`;
        // For debugging, log the failed cities to console
        if (failed.length > 0 && process.env.NODE_ENV === 'development') {
          console.log('Failed cities:', failed.map(f => `${f.name}: ${f.error}`));
        }
      }

      // Set appropriate messages
      if (successMessage) {
        setCitySuccess(successMessage);
      }
      
      if (errorMessage) {
        if (results.length > 0 || skipped.length > 0) {
          setCityError(`Partial success - ${errorMessage}`);
        } else {
          setCityError(errorMessage);
        }
      }

      // Reset form and reload if we had any success
      if (results.length > 0) {
        setBulkCityText("");
        setShowBulkImport(false);
        setCitiesCurrentPage(1);
        await loadCustomCities();
      } else if (skipped.length > 0 && failed.length === 0) {
        // All cities were skipped (already exist) - clear the form
        setBulkCityText("");
        setShowBulkImport(false);
      }

    } catch (error: any) {
      console.error("Error in bulk import:", error);
      setCityError(`Bulk import failed: ${error.message || error.toString() || "Unknown error"}`);
    } finally {
      setBulkImportLoading(false);
    }
  }, [shop?.id, bulkCityText, bulkCourierType, loadCustomCities, checkCityExistsInCustomList, checkCityExistsInLegacyList]);

  return (
    <Page title="Configuration">
      <Layout>
        <Layout.Section>
          {formError && (
            <div style={{ marginBottom: '16px' }}>
              <Banner tone="critical">
                <p>{formError}</p>
              </Banner>
            </div>
          )}

          {/* Tabs outside the card */}
          <div style={{ marginBottom: '16px' }}>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
          </div>

          <Card>
            {selectedTab === 0 && (
              <div style={{ padding: '24px' }}>
                <BlockStack gap="600">
                    {/* Google Sheets Configuration */}
                    <BlockStack gap="400">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text as="h2" variant="headingMd" alignment="start">
                          Google Sheet Configuration
                        </Text>
                        {existingConfig && (
                          <Badge tone="success">Connected</Badge>
                        )}
                      </div>
                      
                      <Text as="p" variant="bodySm">
                        Connect your Google Sheets to automatically track orders. Make sure your Google Sheet has the following sheets: "Pending Orders", "Orders", and "Inventory".
                      </Text>
                      
                      {existingConfig && (
                        <Banner tone="success">
                          <p>Existing configuration found. Your data is being synced to Google Sheets: <strong>{existingConfig.spreadsheetId}</strong></p>
                        </Banner>
                      )}
                      
                      {gSheetError && (
                        <Banner tone="critical">
                          <p>{gSheetError}</p>
                        </Banner>
                      )}
                      
                      {gSheetSuccess && (
                        <Banner tone="success">
                          <p>{gSheetSuccess}</p>
                        </Banner>
                      )}
                      
                      <Form onSubmit={handleSubmit}>
                        <FormLayout>
                          <TextField
                            label="Google Spreadsheet ID"
                            helpText="The ID from your Google Sheets URL (e.g., docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit)"
                            value={config.spreadsheetId}
                            onChange={(value) => setConfig({...config, spreadsheetId: value})}
                            autoComplete="off"
                          />
                          
                          <FormLayout.Group>
                            <TextField
                              label="Orders Sheet Name"
                              value={config.orderSheetName}
                              onChange={(value) => setConfig({...config, orderSheetName: value})}
                              autoComplete="off"
                              helpText="Default: Orders"
                            />
                            
                            <TextField
                              label="Inventory Sheet Name"
                              value={config.customerSheetName}
                              onChange={(value) => setConfig({...config, customerSheetName: value})}
                              autoComplete="off"
                              helpText="Default: Inventory"
                            />
                          </FormLayout.Group>
                          
                          <div>
                            <Button
                              variant="primary"
                              loading={saveLoading}
                              submit
                            >
                              {existingConfig ? "Update Configuration" : "Test and Connect"}
                            </Button>
                          </div>
                        </FormLayout>
                      </Form>
                    </BlockStack>

                    <Divider />

                    {/* Speedaf Configuration */}
                    <BlockStack gap="400">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text as="h2" variant="headingMd" alignment="start">
                          Speedaf Courier Setup
                        </Text>
                        <Badge tone="success">Connected</Badge>
                      </div>
                      
                      <Text as="p" variant="bodySm">
                        Configure integration with Speedaf courier service for order fulfillment.
                      </Text>
                      
                      <Banner tone="success">
                        <p>Existing configuration found. Connected as: <strong>Bambe.ma</strong>. Kindly contact Scrptble team to change Speedaf API credentials</p>
                      </Banner>
                      
                      {speedafError && (
                        <Banner tone="critical">
                          <p>{speedafError}</p>
                        </Banner>
                      )}
                      
                      {speedafSuccess && !existingSpeedafConfig && (
                        <Banner tone="success">
                          <p>{speedafSuccess}</p>
                        </Banner>
                      )}
                    </BlockStack>

                    <Divider />

                    {/* Sendit Configuration */}
                    <BlockStack gap="400">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text as="h2" variant="headingMd" alignment="start">
                          Sendit Courier Setup
                        </Text>
                        {existingSenditConfig && (
                          <Badge tone="success">Connected</Badge>
                        )}
                      </div>
                      
                      <Text as="p" variant="bodySm">
                        Configure integration with Sendit courier service for order fulfillment.
                      </Text>
                      
                      {existingSenditConfig && (
                        <Banner tone="success">
                          <p>Existing configuration found. Connected as: <strong>{existingSenditConfig.name || 'Sendit User'}</strong></p>
                        </Banner>
                      )}
                      
                      {senditError && (
                        <Banner tone="critical">
                          <p>{senditError}</p>
                        </Banner>
                      )}
                      
                      {senditSuccess && !existingSenditConfig && (
                        <Banner tone="success">
                          <p>{senditSuccess}</p>
                        </Banner>
                      )}
                      
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          testSenditConnection();
                        }}
                      >
                        <FormLayout>
                          <TextField
                            label="Public Key"
                            value={senditConfig.publicKey}
                            onChange={(value) => setSenditConfig({...senditConfig, publicKey: value})}
                            autoComplete="off"
                            type="text"
                            helpText="Available in your Sendit dashboard settings"
                          />
                          
                          <TextField
                            label="Secret Key"
                            value={senditConfig.secretKey}
                            onChange={(value) => setSenditConfig({...senditConfig, secretKey: value})}
                            autoComplete="off"
                            type="password"
                            placeholder={existingSenditConfig ? "••••••••••••••••" : ""}
                            helpText="Enter your secret key (for security reasons, we don't display the existing one)"
                          />
                          
                          <div>
                            <ButtonGroup>
                              <Button
                                variant="primary"
                                submit
                                loading={senditSaveLoading}
                              >
                                {existingSenditConfig ? "Update Configuration" : "Test and Connect"}
                              </Button>
                              
                              {existingSenditConfig && (
                                <Button
                                  variant="primary"
                                  tone="critical"
                                  loading={senditSaveLoading}
                                  onClick={() => {
                                    deleteSenditConfig();
                                  }}
                                >
                                  Delete Configuration
                                </Button>
                              )}
                            </ButtonGroup>
                          </div>
                        </FormLayout>
                      </Form>
                    </BlockStack>

                    <Divider />

                    {/* Need Help Section */}
                    <BlockStack gap="400">
                      <Text as="h2" variant="headingMd" alignment="start">
                        Need Help?
                      </Text>
                      
                      <Text as="p" variant="bodySm">
                        Feel free to contact the Scrptble team on WhatsApp:
                      </Text>
                      
                      <InlineStack gap="400">
                        <Text as="p" variant="bodySm">
                          <a href="https://wa.me/923201268955" target="_blank" rel="noopener noreferrer" style={{ color: '#2c6ecb', textDecoration: 'none' }}>
                            Arbaaz Murtaza: +92 320 1268955
                          </a>
                        </Text>
                        
                        <Text as="p" variant="bodySm">
                          <a href="https://wa.me/923355191903" target="_blank" rel="noopener noreferrer" style={{ color: '#2c6ecb', textDecoration: 'none' }}>
                            Safwan Adnan: +92 335 5191903
                          </a>
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </BlockStack>
                </div>
              )}

              {selectedTab === 1 && (
                <div style={{ padding: '24px' }}>
                  <BlockStack gap="500">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text as="h2" variant="headingMd" alignment="start">
                        Custom City Management
                      </Text>
                      <Badge tone="info">{`${customCities.length} cities`}</Badge>
                    </div>

                    <Text as="p" variant="bodySm">
                      Manage custom cities for courier services. Add new cities as couriers update their coverage areas, or remove cities that are no longer supported. The system automatically prevents duplicate cities by checking against both existing custom cities and the default courier city lists.
                    </Text>

                    {cityError && (
                      <Banner tone="critical">
                        <p>{cityError}</p>
                      </Banner>
                    )}

                    {citySuccess && (
                      <Banner tone="success">
                        <p>{citySuccess}</p>
                      </Banner>
                    )}

                    {/* Add New City Form */}
                    <Card>
                      <div style={{ padding: '16px' }}>
                        <BlockStack gap="400">
                          <Text as="h3" variant="headingSm">
                            Add New City
                          </Text>

                          <FormLayout>
                            <FormLayout.Group>
                              <TextField
                                label="City Name"
                                value={newCityName}
                                onChange={setNewCityName}
                                placeholder="Enter city name..."
                                autoComplete="off"
                              />

                              <Select
                                label="Courier Type"
                                options={[
                                  { label: 'Sendit', value: 'sendit' },
                                  { label: 'Speedaf', value: 'speedaf' },
                                  { label: 'General', value: 'general' }
                                ]}
                                value={selectedCourierType}
                                onChange={setSelectedCourierType}
                              />
                            </FormLayout.Group>

                            <Button
                              variant="primary"
                              onClick={addCustomCity}
                              disabled={!newCityName.trim()}
                            >
                              Add City
                            </Button>
                          </FormLayout>
                        </BlockStack>
                      </div>
                    </Card>

                    {/* Bulk City Import */}
                    <Card>
                      <div style={{ padding: '16px' }}>
                        <BlockStack gap="400">
                          <Text as="h3" variant="headingSm">
                            Bulk City Import
                          </Text>

                          <Text as="p" variant="bodySm">
                            Add multiple cities at once by entering city names separated by new lines. The system will automatically skip cities that already exist in your custom list or the default courier city list, so you can safely paste a complete updated city list from your courier without worrying about duplicates.
                          </Text>

                          {showBulkImport ? (
                            <BlockStack gap="400">
                              <TextField
                                label="City Names (one per line)"
                                value={bulkCityText}
                                onChange={setBulkCityText}
                                placeholder="Casablanca
Rabat
Marrakech
Fez
Tangier"
                                autoComplete="off"
                                multiline={4}
                                helpText="Enter each city name on a new line. You can copy-paste from a spreadsheet or document."
                              />

                              <Select
                                label="Courier Type"
                                options={[
                                  { label: 'Sendit', value: 'sendit' },
                                  { label: 'Speedaf', value: 'speedaf' },
                                  { label: 'General', value: 'general' }
                                ]}
                                value={bulkCourierType}
                                onChange={setBulkCourierType}
                              />

                              {bulkCityText.trim() && (
                                <Text as="p" variant="bodySm" tone="subdued">
                                  {(() => {
                                    const cities = bulkCityText
                                      .split('\n')
                                      .map(line => line.trim())
                                      .filter(line => line.length > 0)
                                      .filter((name, index, arr) => arr.indexOf(name) === index);
                                    return `Ready to import ${cities.length} unique cities`;
                                  })()}
                                </Text>
                              )}

                              <InlineStack gap="200">
                                <Button
                                  variant="primary"
                                  onClick={handleBulkImport}
                                  loading={bulkImportLoading}
                                  disabled={!bulkCityText.trim()}
                                >
                                  {bulkImportLoading ? "Importing..." : "Import Cities"}
                                </Button>

                                <Button
                                  onClick={() => {
                                    setShowBulkImport(false);
                                    setBulkCityText("");
                                  }}
                                  disabled={bulkImportLoading}
                                >
                                  Cancel
                                </Button>
                              </InlineStack>
                            </BlockStack>
                          ) : (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button
                                variant="primary"
                                onClick={() => setShowBulkImport(true)}
                                icon={PlusIcon}
                              >
                                Add Cities in Bulk
                              </Button>
                            </div>
                          )}
                        </BlockStack>
                      </div>
                    </Card>

                    {/* Custom Cities List */}
                    <div>
                      <BlockStack gap="400">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text as="h3" variant="headingSm">
                            Custom Cities ({customCities.length})
                          </Text>
                          
                          {/* Quick Stats */}
                          <InlineStack gap="200">
                            <Badge tone="info">
                              {`${customCities.filter(c => c.courierType === 'sendit').length} Sendit`}
                            </Badge>
                            <Badge tone="warning">
                              {`${customCities.filter(c => c.courierType === 'speedaf').length} Speedaf`}
                            </Badge>
                            <Badge tone="success">
                              {`${customCities.filter(c => c.courierType === 'general').length} General`}
                            </Badge>
                          </InlineStack>
                        </div>

                        {customCities.length > 5 && (
                          <div>
                            <BlockStack gap="300">
                              {/* Search and Filter Controls */}
                              <FormLayout>
                                <FormLayout.Group>
                                  <TextField
                                    label="Search cities"
                                    value={citySearchValue}
                                    onChange={setCitySearchValue}
                                    placeholder="Search by city name..."
                                    clearButton
                                    onClearButtonClick={() => setCitySearchValue('')}
                                    autoComplete="off"
                                  />
                                  
                                  <Select
                                    label="Filter by courier"
                                    options={[
                                      { label: 'All couriers', value: 'all' },
                                      { label: 'Sendit', value: 'sendit' },
                                      { label: 'Speedaf', value: 'speedaf' },
                                      { label: 'General', value: 'general' }
                                    ]}
                                    value={cityFilterCourier}
                                    onChange={setCityFilterCourier}
                                  />
                                </FormLayout.Group>
                              </FormLayout>

                              {/* Sort Controls */}
                              <InlineStack gap="200" align="center">
                                <Text as="span" variant="bodySm" tone="subdued">Sort by:</Text>
                                <ButtonGroup>
                                  <Button
                                    pressed={sortBy === 'name'}
                                    onClick={() => handleSortChange('name')}
                                    size="micro"
                                  >
                                    {`Name ${sortBy === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}`}
                                  </Button>
                                  <Button
                                    pressed={sortBy === 'courierType'}
                                    onClick={() => handleSortChange('courierType')}
                                    size="micro"
                                  >
                                    {`Courier ${sortBy === 'courierType' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}`}
                                  </Button>
                                </ButtonGroup>
                              </InlineStack>
                            </BlockStack>
                          </div>
                        )}

                        {citiesLoading ? (
                          <div style={{ padding: '20px', textAlign: 'center' }}>
                            <Spinner size="small" />
                          </div>
                        ) : (() => {
                          const { cities, totalCount, totalPages } = getPaginatedCities();
                          
                          if (totalCount === 0) {
                            return (
                              <div style={{ padding: '40px', textAlign: 'center' }}>
                                <Text as="p" variant="bodySm" tone="subdued">
                                  {citySearchValue.trim() || cityFilterCourier !== 'all' 
                                    ? 'No cities match your search criteria. Try adjusting your filters.'
                                    : 'No custom cities added yet. Add cities above to extend the default city list.'
                                  }
                                </Text>
                                {(citySearchValue.trim() || cityFilterCourier !== 'all') && (
                                  <div style={{ marginTop: '10px' }}>
                                    <Button
                                      onClick={() => {
                                        setCitySearchValue('');
                                        setCityFilterCourier('all');
                                        setCitiesCurrentPage(1);
                                      }}
                                      size="micro"
                                    >
                                      Clear filters
                                    </Button>
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return (
                            <BlockStack gap="300">
                              {/* Results Summary */}
                              {(citySearchValue.trim() || cityFilterCourier !== 'all') && (
                                <div style={{ padding: '8px 0' }}>
                                  <Text as="p" variant="bodySm" tone="subdued">
                                    Showing {cities.length} of {totalCount} cities
                                    {totalCount !== customCities.length && ` (filtered from ${customCities.length} total)`}
                                  </Text>
                                </div>
                              )}

                              {/* Cities List */}
                              <ResourceList
                                resourceName={{ singular: 'city', plural: 'cities' }}
                                items={cities}
                                renderItem={(city) => {
                                  const { id, name, courierType, addedAt } = city;
                                  return (
                                    <ResourceItem id={id} onClick={() => {}}>  
                                      <InlineStack align="space-between">
                                        <InlineStack gap="300" align="center">
                                          <Text as="span" variant="bodyMd" fontWeight="semibold">
                                            {name}
                                          </Text>
                                          <Badge tone={
                                            courierType === 'sendit' ? 'info' :
                                            courierType === 'speedaf' ? 'warning' : 'success'
                                          }>
                                            {courierType}
                                          </Badge>
                                        </InlineStack>

                                        <Button
                                          size="micro"
                                          tone="critical"
                                          onClick={() => removeCustomCity(id, name)}
                                          icon={DeleteIcon}
                                          accessibilityLabel={`Remove ${name}`}
                                        />
                                      </InlineStack>
                                    </ResourceItem>
                                  );
                                }}
                              />

                              {/* Pagination */}
                              {totalPages > 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                                  <Pagination
                                    hasPrevious={citiesCurrentPage > 1}
                                    onPrevious={() => handleCityPageChange(citiesCurrentPage - 1)}
                                    hasNext={citiesCurrentPage < totalPages}
                                    onNext={() => handleCityPageChange(citiesCurrentPage + 1)}
                                    label={`Page ${citiesCurrentPage} of ${totalPages}`}
                                  />
                                </div>
                              )}
                            </BlockStack>
                          );
                        })()}
                      </BlockStack>
                    </div>
                  </BlockStack>
                </div>
              )}
          </Card>
        </Layout.Section>
      </Layout>

      {/* Footer */}
      <div style={{ textAlign: 'center', margin: '40px 0', color: '#637381', fontSize: '14px' }}>
        Designed by Scrptble in Pakistan
      </div>
    </Page>
  );
};

export default GoogleSheetConfigPage;