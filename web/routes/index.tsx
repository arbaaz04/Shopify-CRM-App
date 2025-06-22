import React, { useState, useEffect, FormEvent, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Banner,
  Text,
  Box,
  Spinner,
  Frame,
  BlockStack,
  InlineStack,
  Select,
  EmptyState,
  ResourceList,
  ResourceItem,
  Avatar,
  Badge,
  Checkbox,
  Toast,
  Tabs,
  Collapsible,
  ChoiceList,
  Divider,
  Modal,
  Combobox,
  Icon,
  Pagination
} from "@shopify/polaris";
import { RefreshIcon, AlertDiamondIcon, LogoGoogleIcon } from "@shopify/polaris-icons";
import { api } from "../api";
import { useGadget } from "@gadgetinc/react-shopify-app-bridge";
import { useFindFirst, useFindMany } from "@gadgetinc/react";
import { useQuery } from "@gadgetinc/react";
import { SpeedafApiConfig, testSpeedafApiWithDocExample, createMockOrderData, sendSpeedafApiRequest } from "../utils/speedafApiTester";

// Tags we're looking for
const CONFIRMATION_TAGS = [
  "✅ WhatF Confirmed",
  "Confirmed By Wtp 💬",
  "Confirmed By Call 📞",
  "Confirmed IG 📷",
  "Confirmed ✅"
];

// City list for dropdown - moved outside component
const MOROCCAN_CITIES = [
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

// Speedaf specific city list - moved outside component
const SPEEDAF_CITIES = [
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

// Define proper return type interfaces
interface FulfillmentBaseResult {
  success: boolean;
  message?: string;
}

interface FulfillmentSuccessResult extends FulfillmentBaseResult {
  success: true;
  fulfillmentId: string;
  message: string;
  fulfillment: any;
  background?: false;
}

interface FulfillmentErrorResult extends FulfillmentBaseResult {
  success: false;
  error: string;
}

interface FulfillmentBackgroundResult extends FulfillmentBaseResult {
  success: true;
  message: string;
  background: true;
  fulfillmentId?: undefined;
}

type FulfillmentResult = FulfillmentSuccessResult | FulfillmentErrorResult | FulfillmentBackgroundResult;

// Simple function to create a fulfillment tracking URL for Sendit
const getSenditTrackingUrl = (trackingNumber: string): string => {
  return `https://app.sendit.ma/deliveries/${trackingNumber}`;
};

// Simple function to create a fulfillment tracking URL for Speedaf
const getSpeedafTrackingUrl = (trackingNumber: string): string => {
  return `https://t.17track.net/en#nums=${trackingNumber}`;
};

// Helper function to format Shopify order ID for GraphQL
const formatShopifyOrderId = (orderId: string): string => {
  try {
    // Clean the order ID (remove any non-numeric characters)
    const cleanOrderId = String(orderId).replace(/\D/g, '');
    console.log(`Cleaning order ID: ${orderId} -> ${cleanOrderId}`);
    return cleanOrderId;
  } catch (error) {
    console.error("Error formatting Shopify order ID:", error);
    return String(orderId).replace(/\D/g, '');
  }
};

/**
 * Creates a fulfillment for a Shopify order using GraphQL
 * @param {Object} params - Fulfillment parameters
 * @param {string} params.shopId - The Shopify shop ID
 * @param {string} params.orderId - The Shopify order ID (numeric or with #)
 * @param {string} params.trackingNumber - The tracking number
 * @param {string} params.trackingCompany - The tracking company name
 * @param {boolean} params.notifyCustomer - Whether to notify the customer
 * @returns {Promise<FulfillmentResult>} The fulfillment result
 */
const createOrderFulfillment = async ({
  shopId,
  orderId,
  trackingNumber,
  trackingCompany,
  notifyCustomer = false
}: {
  shopId: string;
  orderId: string;
  trackingNumber: string;
  trackingCompany: string;
  notifyCustomer?: boolean;
}): Promise<FulfillmentResult> => {
  try {
    // Clean order ID
    const cleanOrderId = formatShopifyOrderId(orderId);
    
    // Get fulfillment order ID using our newer function
    const fulfillmentOrderResponse = await getShopifyFulfillmentOrderId(cleanOrderId);
    
    if (!fulfillmentOrderResponse.success || !fulfillmentOrderResponse.fulfillmentOrderId) {
      throw new Error(fulfillmentOrderResponse.error || `Failed to get fulfillment order ID for order ${cleanOrderId}`);
    }
    
    // Get the raw numeric fulfillment order ID
    const fulfillmentOrderId = fulfillmentOrderResponse.fulfillmentOrderId;
    console.log(`Using fulfillment order ID: ${fulfillmentOrderId} for order ${cleanOrderId}`);
    
    // Format the fulfillment order ID as a Shopify global ID
    const formattedFulfillmentOrderId = `gid://shopify/FulfillmentOrder/${fulfillmentOrderId}`;
    console.log(`Formatted fulfillment order ID: ${formattedFulfillmentOrderId}`);
    
    // Create tracking URL based on carrier
    const trackingUrl = trackingCompany === "Sendit" ? 
      getSenditTrackingUrl(trackingNumber) : 
      trackingCompany === "Speedaf" ?
      getSpeedafTrackingUrl(trackingNumber) :
      "";
    
    // Properly formatted GraphQL mutation for creating a fulfillment
    const fulfillmentMutation = `
      mutation fulfillmentCreateV2($fulfillment: FulfillmentV2Input!) {
        fulfillmentCreateV2(fulfillment: $fulfillment) {
          fulfillment {
            id
            trackingInfo {
              number
              company
              url
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Prepare input variables for the mutation
    const variables = {
      fulfillment: {
        lineItemsByFulfillmentOrder: [
          {
            fulfillmentOrderId: formattedFulfillmentOrderId  // Use the formatted global ID
          }
        ],
        notifyCustomer: notifyCustomer,
        trackingInfo: {
          company: trackingCompany,
          number: trackingNumber,
          url: trackingUrl
        }
      }
    };

    console.log(`Creating fulfillment with variables:`, JSON.stringify(variables, null, 2));

    // Execute the GraphQL mutation
    const result = await api.writeToShopify({
      shopId: shopId,
      mutation: fulfillmentMutation,
      variables: variables
    });

    console.log(`Fulfillment creation result:`, result);

    // Check for GraphQL errors
    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    // Check for user errors in the response
    if (result.data?.fulfillmentCreateV2?.userErrors?.length > 0) {
      const errors = result.data.fulfillmentCreateV2.userErrors;
      throw new Error(`Shopify fulfillment creation failed: ${errors.map((e: { message: string }) => e.message).join(', ')}`);
    }

    // Get the fulfillment ID - but don't throw an error if it's not found
    const fulfillmentId = result.data?.fulfillmentCreateV2?.fulfillment?.id || 'unknown';
    
    // If no ID was returned but there were no errors, still treat as success
    if (!result.data?.fulfillmentCreateV2?.fulfillment?.id) {
      console.log("Warning: Fulfillment was likely created but no ID was returned. Treating as success.");
    }

    // Return success result
    return {
      success: true,
      message: `Successfully created fulfillment for order #${cleanOrderId}`,
      fulfillmentId: fulfillmentId,
      fulfillment: result.data?.fulfillmentCreateV2?.fulfillment
    } as FulfillmentSuccessResult;
  } catch (error) {
    console.error("Error creating Shopify fulfillment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    } as FulfillmentErrorResult;
  }
};

/**
 * Gets fulfillment order ID for a Shopify order
 * @param {string} orderNumber - The Shopify order number
 * @returns {Promise<{success: boolean, fulfillmentOrderId?: string, error?: string}>}
 */
const getShopifyFulfillmentOrderId = async (orderNumber: string) => {
  try {
    // Ensure order ID is string and contains only digits
    const orderId = String(orderNumber).replace(/\D/g, '');
    
    if (!orderId) {
      throw new Error("Invalid order number format");
    }
    
    // Get shop to get shop ID
    const shop = await api.shopifyShop.findFirst();
    if (!shop) {
      throw new Error("Shop not found");
    }
    
    // GraphQL query to get fulfillment orders
    const graphqlQuery = `
      query GetOrder($id: ID!) {
        order(id: $id) {
          id
          name
          fulfillmentOrders(first: 5) {
            edges {
              node {
                id
                status
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      id: `gid://shopify/Order/${orderId}`
    };
    
    // Execute the GraphQL query
    const result = await api.writeToShopify({
      shopId: shop.id,
      mutation: graphqlQuery,
      variables: variables
    });
    
    // Handle different possible response formats
    const orderData = 
      result.data?.order ||          // Standard GraphQL response
      result.body?.data?.order ||    // HTTP body-wrapped response
      result.data?.data?.order ||    // Double-nested response (common in HTTP clients)
      result.order;                  // Direct root response structure
    
    if (!orderData) {
      // Check for errors
      const errors = result.errors || result.body?.errors || result.data?.errors;
      if (errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
      }
      
      throw new Error(`Order #${orderId} not found`);
    }
    
    // Transform fulfillment orders to a simpler format
    let fulfillmentOrders = [];
    if (orderData?.fulfillmentOrders?.edges && Array.isArray(orderData.fulfillmentOrders.edges)) {
      fulfillmentOrders = orderData.fulfillmentOrders.edges.map((edge: any) => {
        const node = edge?.node || {};
        return {
          id: node.id || '',
          status: node.status || 'UNKNOWN'
        };
      });
    }
    
    // Check if no fulfillment orders were found
    if (fulfillmentOrders.length === 0) {
      return { 
        success: false, 
        error: `No fulfillment orders found for Shopify order #${orderId}` 
      };
    }
    
    // Prefer OPEN status fulfillment orders if available
    const openFulfillmentOrders = fulfillmentOrders.filter((fo: any) => fo.status === "OPEN");
    
    // Select the appropriate fulfillment order
    let selectedFulfillmentOrder;
    if (openFulfillmentOrders.length > 0) {
      selectedFulfillmentOrder = openFulfillmentOrders[0];
    } else {
      selectedFulfillmentOrder = fulfillmentOrders[0];
    }
    
    // Extract the numeric ID from the GID format
    const rawId = selectedFulfillmentOrder.id;
    const fulfillmentOrderId = rawId.split('/').pop() || rawId;
    
    // Return just the essential information
    return {
      success: true,
      fulfillmentOrderId: fulfillmentOrderId,
      status: selectedFulfillmentOrder.status
    };
  } catch (error) {
    // Simplified error handling
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

// Function to get Shopify admin URL for an order
const getShopifyOrderAdminUrl = (shop: any, id: string): string => {
  if (!shop || !id) return "#";
  
  // Get the store name from the URL example provided by the user
  const storeName = "08d880-20";
  
  // Clean the ID to ensure it's just the numeric part
  const orderId = id.replace(/\D/g, '');
  
  // Use the exact format provided by the user
  return `https://admin.shopify.com/store/${storeName}/orders/${orderId}`;
};

// Function to get the district ID from Sendit API
const getSenditDistrictId = async (cityName: string, token: string): Promise<string> => {
  try {
    console.log(`Fetching district ID for city: ${cityName}`);
    const encodedCity = encodeURIComponent(cityName);
    const url = `https://app.sendit.ma/api/v1/districts?querystring=${encodedCity}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRF-TOKEN': ''
      }
    });
    
    const responseData = await response.json();
    console.log(`District API response for ${cityName}:`, responseData);
    
    if (responseData.success && responseData.data && responseData.data.length > 0) {
      // If there's only one result, use it
      if (responseData.data.length === 1) {
        const districtId = responseData.data[0].id.toString();
        console.log(`Found single district ID ${districtId} for city ${cityName}`);
        return districtId;
      }
      
      // If there are multiple results, find the closest match
      console.log(`Found ${responseData.data.length} districts for city ${cityName}, finding best match`);
      
      // Calculate similarity score for each result (lower score is better)
      let bestMatch = responseData.data[0];
      let bestMatchScore = Infinity;
      
      responseData.data.forEach((district: {id: number|string, name?: string, ville?: string}) => {
        const districtName = district.name || district.ville || '';
        // Simple case-insensitive similarity check - exact match gets priority
        if (districtName.toLowerCase() === cityName.toLowerCase()) {
          bestMatch = district;
          bestMatchScore = 0; // Perfect match
          console.log(`Perfect match found: ${districtName}`);
        } else if (bestMatchScore > 0) {
          // Calculate Levenshtein distance as a similarity metric
          const score = levenshteinDistance(districtName.toLowerCase(), cityName.toLowerCase());
          console.log(`District "${districtName}" has similarity score ${score}`);
          
          if (score < bestMatchScore) {
            bestMatch = district;
            bestMatchScore = score;
          }
        }
      });
      
      const districtId = bestMatch.id.toString();
      console.log(`Selected best matching district ID ${districtId} for "${bestMatch.name || bestMatch.ville}" (requested: "${cityName}")`);
      return districtId;
    } else {
      // Instead of returning a default district ID, throw an error
      throw new Error(`No district found for city: ${cityName}`);
    }
  } catch (error) {
    console.error(`Error fetching district ID for ${cityName}:`, error);
    // Propagate the error instead of using a fallback
    throw new Error(`Failed to find district ID for city: ${cityName}`);
  }
};

// Helper function to calculate Levenshtein distance between two strings
// This measures how different two strings are (lower is more similar)
const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};
// Format Speedaf city entries to only show area and city (not the codes)
  const formatSpeedafCityForDisplay = (cityEntry: string): string => {
    if (!cityEntry) return '';
    const parts = cityEntry.split(', ');
    if (parts.length < 2) return cityEntry;
    return `${parts[0]}, ${parts[1]}`;
};

// Component to render city with color coding - moved outside main component
const CityDisplay = ({ city, rawCity }: { city: string, rawCity?: string }) => {
  if (!city) {
    // No city - display in red
    return <span style={{ color: '#d82c0d' }}>No city</span>;
  } else if (city.startsWith('Unknown (')) {
    // Unrecognized city format - display in red
    return <span style={{ color: '#d82c0d' }}>{city}</span>;
  } else if (rawCity && city === rawCity) {
    // Original city from order - display in green
    return <span style={{ color: '#108043' }}>{city}</span>;
  } else {
    // Matched/standardized city - display in orange
    return <span style={{ color: '#c05717' }}>{city}</span>;
  }
};

export const IndexPage = () => {
  const { isAuthenticated } = useGadget();
  
  // GROUP 1: All useState hooks grouped together first
  const [selectedCourier, setSelectedCourier] = useState<string>('sendit');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [ordersFetching, setOrdersFetching] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [fulfillLoading, setFulfillLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<Error | null>(null);
  const [loadingSKUOrders, setLoadingSKUOrders] = useState<string[]>([]);
  const [confirmedCurrentPage, setConfirmedCurrentPage] = useState(1);
  const [confirmedPageSize] = useState(10);
  const [preventRefresh, setPreventRefresh] = useState(false);
  const [toastActive, setToastActive] = useState(false);
  const [toastProps, setToastProps] = useState({
    content: '',
    error: false,
  });
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [showDecryptedResponse, setShowDecryptedResponse] = useState(false);
  const [updatedTrackingIds, setUpdatedTrackingIds] = useState<Record<string, string>>({});
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editingCity, setEditingCity] = useState<string>("");
  const [modifiedCities, setModifiedCities] = useState<Record<string, string>>({});
  const [showFulfillDialog, setShowFulfillDialog] = useState(false);
  const [showExchangeFulfillDialog, setShowExchangeFulfillDialog] = useState(false);
  const [autoWriteToSheets, setAutoWriteToSheets] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [removeOrderName, setRemoveOrderName] = useState('');
  const [removeOrderLoading, setRemoveOrderLoading] = useState(false);
  const [exchangeOrders, setExchangeOrders] = useState<any[]>([]);
  const [exchangeOrdersFetching, setExchangeOrdersFetching] = useState(false);
  const [exchangeOrdersError, setExchangeOrdersError] = useState<Error | null>(null);
  const [exchangeCurrentPage, setExchangeCurrentPage] = useState(1);
  const [exchangePageSize] = useState(10);
  const [selectedConfirmedOrders, setSelectedConfirmedOrders] = useState<string[]>([]);
  const [selectedExchangeOrders, setSelectedExchangeOrders] = useState<string[]>([]);
  const [removedOrders, setRemovedOrders] = useState<string[]>([]);
  const [orderToRemove, setOrderToRemove] = useState<string | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [exchangeReferences, setExchangeReferences] = useState<Record<string, any>>({});
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [currentExchangeOrderId, setCurrentExchangeOrderId] = useState<string | null>(null);
  const [referenceOrderNumber, setReferenceOrderNumber] = useState("");
  const [loadingReferenceOrder, setLoadingReferenceOrder] = useState(false);
  const [referenceOrderOptions, setReferenceOrderOptions] = useState<{ label: string; value: string }[]>([]);
  const [referenceOrdersLoading, setReferenceOrdersLoading] = useState(false);
  const [referenceOrderSearchValue, setReferenceOrderSearchValue] = useState('');
  const [selectedReferenceOrder, setSelectedReferenceOrder] = useState<string>('');
  const [referenceOrderError, setReferenceOrderError] = useState<string | null>(null);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [cityInputValue, setCityInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Removed sync state variables - no longer needed
  
  // Add a new state for sheet orders
  const [sheetOrders, setSheetOrders] = useState<any[]>([]);
  const [sheetOrdersFetching, setSheetOrdersFetching] = useState(false);
  const [sheetOrdersError, setSheetOrdersError] = useState<Error | null>(null);
  const [selectedSheetOrders, setSelectedSheetOrders] = useState<string[]>([]);
  const [sheetCurrentPage, setSheetCurrentPage] = useState(1);
  const [sheetPageSize] = useState(10);

  // Speedaf tracking states
  const [speedafTrackingMode, setSpeedafTrackingMode] = useState<'10' | 'custom'>('10');
  const [speedafCustomOrderName, setSpeedafCustomOrderName] = useState<string>('');
  const [speedafTracking, setSpeedafTracking] = useState(false);
  const [speedafTrackingResults, setSpeedafTrackingResults] = useState<any[]>([]);
  const [speedafTrackingError, setSpeedafTrackingError] = useState<string | null>(null);
  const [speedafWritingToSheets, setSpeedafWritingToSheets] = useState(false);
  
  // GROUP 2: useFindFirst hooks
  const [{ data: shop, fetching: shopFetching, error: shopError }] = useFindFirst(api.shopifyShop);
  const [{ data: config, fetching: configFetching, error: configError }] = useFindFirst(api.googleSheetConfig, {
    filter: shop ? { shopId: { equals: shop.id } } : undefined
  });

  // GROUP 3: All useEffect hooks
  // Load saved city modifications and removed orders from localStorage on component mount
  useEffect(() => {
    try {
      const savedCities = localStorage.getItem('modifiedCities');
      if (savedCities) {
        setModifiedCities(JSON.parse(savedCities));
      }
      
      // Load removed orders
      const savedRemovedOrders = localStorage.getItem('removedOrders');
      if (savedRemovedOrders) {
        setRemovedOrders(JSON.parse(savedRemovedOrders));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);
  
  // Clear highlighted tracking IDs after 30 seconds
  useEffect(() => {
    if (Object.keys(updatedTrackingIds).length > 0) {
      const timer = setTimeout(() => {
        setUpdatedTrackingIds({});
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, [updatedTrackingIds]);

  // Load orders when component mounts only if not loading orders already
  useEffect(() => {
    if (isAuthenticated && shop && !ordersFetching && !preventRefresh) {
      fetchOrders();
      // Also fetch exchange orders on initial load
      fetchExchangeOrders();
      fetchSheetOrders(); // Uncommented this line
    }
  }, [isAuthenticated, shop]);
  
  // Reset pagination when tab changes
  useEffect(() => {
    setConfirmedCurrentPage(1);
    setExchangeCurrentPage(1);
    setSheetCurrentPage(1);
  }, [selectedTab]);

  // Fetch sheet orders when sheet tab is selected
  useEffect(() => {
    if (selectedTab === 2 && isAuthenticated && shop && !sheetOrdersFetching && !preventRefresh) {
      fetchSheetOrders();
    }
  }, [selectedTab, isAuthenticated, shop, preventRefresh]);

  // GROUP 4: All memoized functions with useCallback
  const fetchOrders = useCallback(async () => {
    // Skip if already fetching or if refresh is prevented
    if (!isAuthenticated || !shop || ordersFetching || preventRefresh) return;
    
    setOrdersFetching(true);
    setOrdersError(null);
    
    try {
      console.log("🔍 [fetchOrders] Starting to fetch orders...");
      
      // Fetch orders using Gadget's standard API, sorting by most recent
      const response = await api.shopifyOrder.findMany({
        select: {
          id: true,
          tags: true,
          fulfillmentStatus: true, 
          name: true,
          shippingAddress: true,
          financialStatus: true,
          createdAt: true
        },
        first: 250, // Increase to fetch more orders
        sort: [{
          createdAt: "Descending" as any // Using lowercase "desc" for the sort order
        }]
      });
      
      console.log(`🔍 [fetchOrders] Initially fetched ${response.length} orders from Shopify`);
      if (response.length > 0) {
        console.log(`🔍 [fetchOrders] Newest order date: ${response[0]?.createdAt}, Oldest order date in result: ${response[response.length-1]?.createdAt}`);
      }
      
      // Create a list of all fulfillment statuses that indicate an order is fulfilled
      // This includes variations in case and formatting to ensure robust matching
      const FULFILLED_STATUSES = [
        'FULFILLED', 'fulfilled', 
        'PARTIAL', 'partial',
        'SHIPPED', 'shipped',
        'COMPLETE', 'complete',
        'DELIVERED', 'delivered'
      ];
      
      // Create a list of all financial statuses that indicate an order is refunded
      const REFUNDED_STATUSES = [
        'REFUNDED', 'refunded',
        'PARTIALLY_REFUNDED', 'partially_refunded',
        'VOIDED', 'voided'
      ];
      
      // Create a list of all order statuses that indicate an order is cancelled
      const CANCELLED_STATUSES = [
        'CANCELLED', 'cancelled',
        'CANCELED', 'canceled'
      ];
      
      // Get unique statuses for debugging
      const uniqueFulfillmentStatuses = [...new Set(response.map(order => order.fulfillmentStatus))];
      const uniqueFinancialStatuses = [...new Set(response.map(order => order.financialStatus))];
      
      console.log("🔍 [fetchOrders] Unique fulfillment statuses found:", uniqueFulfillmentStatuses);
      console.log("🔍 [fetchOrders] Unique financial statuses found:", uniqueFinancialStatuses);
      
      // First pass: Filter out orders that are fulfilled, refunded, cancelled, or missing address
      const filteredByStatus = response.filter(order => {
        // Check fulfillment status
        const fulfillmentStatus = order.fulfillmentStatus || '';
        const isFulfilled = FULFILLED_STATUSES.some(
          status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
        );
        
        // Check financial status (for refunds and cancellations)
        const financialStatus = order.financialStatus || '';
        const isRefunded = REFUNDED_STATUSES.some(
          status => financialStatus.toUpperCase() === status.toUpperCase()
        );
        
        // Check if order is cancelled
        const isCancelled = CANCELLED_STATUSES.some(
          status => financialStatus.toUpperCase() === status.toUpperCase()
        );
        
        // Check if order has a shipping address
        const hasAddress = order.shippingAddress && 
                         (typeof order.shippingAddress === 'object' && 
                          !Array.isArray(order.shippingAddress) &&
                          ('address1' in order.shippingAddress || 
                           'city' in order.shippingAddress ||
                           'address2' in order.shippingAddress));
        
        // Log orders being excluded with reasons for debugging
        if (isFulfilled || isRefunded || isCancelled || !hasAddress) {
          const reasons = [];
          if (isFulfilled) reasons.push(`fulfillment status: ${fulfillmentStatus}`);
          if (isRefunded) reasons.push(`financial status: ${financialStatus}`);
          if (isCancelled) reasons.push(`cancelled`);
          if (!hasAddress) reasons.push(`missing address`);
          
          console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} - Reasons: ${reasons.join(', ')}`);
          return false;
        }
        
        // Keep only orders that are not fulfilled, not refunded, not cancelled, and have addresses
        return true;
      });
      
      console.log(`🔍 [fetchOrders] After status filtering: ${filteredByStatus.length} orders remain`);
      
      // Second pass: Filter by confirmation tags and exclude removed orders
      const filteredOrders = filteredByStatus.filter(order => {
        // Skip if order has been manually removed
        if (removedOrders.includes(order.id)) {
          console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} - manually removed`);
          return false;
        }
        
        // Check if order has the Echange tag - exclude these orders
        if (order.tags) {
          const tagValue = order.tags;
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          // Output the tags for debugging
          console.log(`🔍 [fetchOrders] Order ${order.name || order.id} has tags: ${JSON.stringify(tagArray)}`);
          
          // Case-insensitive check for 'echange' in any tag
          const hasExchangeTag = tagArray.some(tag => 
            typeof tag === 'string' && tag.toLowerCase().includes('echange')
          );
          
          if (hasExchangeTag) {
            console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} - has Echange tag`);
            return false;
          }
        }
        
        // Check if order has any of the confirmation tags
        let hasConfirmationTag = false;
        
        if (order.tags) {
          // Handle both string and array formats for tags
          const tagValue = order.tags;
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          // Check each confirmation tag in detail
          for (const confirmTag of CONFIRMATION_TAGS) {
            for (const orderTag of tagArray) {
              if (typeof orderTag === 'string' && orderTag.includes(confirmTag)) {
                hasConfirmationTag = true;
                console.log(`🔍 [fetchOrders] Order ${order.name || order.id} has confirmation tag: ${orderTag}`);
                break;
              }
            }
            if (hasConfirmationTag) break;
          }
        }
        
        if (!hasConfirmationTag) {
          console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} - no confirmation tag found`);
        }
        
        return hasConfirmationTag;
      });
      
      console.log(`🔍 [fetchOrders] After tag filtering: ${filteredOrders.length} orders remain`);
      
      if (filteredOrders.length === 0) {
        console.log(`🔍 [fetchOrders] No orders passed the tag filtering - nothing to load`);
        setOrders([]);
        setOrdersFetching(false);
        return;
      }
      
      // Load full order data for all filtered orders
      console.log(`🔍 [fetchOrders] Loading full order data for ${filteredOrders.length} orders...`);
      const fullOrdersData = await Promise.all(
        filteredOrders.map(async (order: any) => {
          try {
            console.log(`🔍 [fetchOrders] Extracting SKUs for order ${order.name || order.id}`);
            // Use extractOrderSKUs action to get complete order data
            const orderResponse = await (api as any).extractOrderSKUs({
              orderId: String(order.id).replace(/\D/g, ''),
              shopId: shop?.id || ''
            });
            
            if (orderResponse?.success && orderResponse?.order) {
              // Double-check fulfillment status with the full order data
              const orderStatus = orderResponse.order.fulfillmentStatus || '';
              const isFulfilledNow = FULFILLED_STATUSES.some(
                status => orderStatus.toUpperCase() === status.toUpperCase()
              );

              // Double-check financial status with the full order data
              const financialStatus = orderResponse.order.financialStatus || '';
              const isRefundedNow = REFUNDED_STATUSES.some(
                status => financialStatus.toUpperCase() === status.toUpperCase()
              );

              // Check if order is cancelled using the new isCancelled flag
              const isCancelledNow = !!orderResponse.order.isCancelled;
              
              // Double-check address information with full order data
              const fullOrder = orderResponse.order;
              const hasValidAddress = (
                // Check for address field directly
                (fullOrder.address && fullOrder.address.trim() !== '') ||
                // Check for shippingAddress object
                (fullOrder.shippingAddress && (
                  fullOrder.shippingAddress.address1 || 
                  fullOrder.shippingAddress.city || 
                  fullOrder.shippingAddress.address2
                )) ||
                // Check for city field directly
                (fullOrder.city && fullOrder.city.trim() !== '')
              );
              
              if (isFulfilledNow || isRefundedNow || isCancelledNow || !hasValidAddress) {
                const reasons = [];
                if (isFulfilledNow) reasons.push(`fulfillment status: ${orderStatus}`);
                if (isRefundedNow) reasons.push(`financial status: ${financialStatus}`);
                if (isCancelledNow) reasons.push(`cancelled`);
                if (!hasValidAddress) reasons.push(`missing address`);
                
                console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} after full data check - Reasons: ${reasons.join(', ')}`);
                return null; // Will be filtered out later
              }
              
              console.log(`🔍 [fetchOrders] Successfully loaded order ${order.name || order.id}`);
              return {
                ...orderResponse.order,
                id: order.id, // Keep the original ID format
                hasLoadedSKUs: true
              };
            } else {
              console.log(`🔍 [fetchOrders] Failed to extract SKUs for order ${order.name || order.id}: ${orderResponse?.error || 'Unknown error'}`);
              // If extraction failed, return minimal data
              return {
                id: order.id,
                name: `Order #${String(order.id).replace(/\D/g, '')}`,
                orderSkus: ['Failed to load SKUs'],
                hasLoadedSKUs: false,
                error: orderResponse?.error || 'Failed to load order data'
              };
            }
          } catch (err) {
            console.log(`🔍 [fetchOrders] Error processing order ${order.name || order.id}: ${err instanceof Error ? err.message : String(err)}`);
            return {
              id: order.id,
              name: `Order #${String(order.id).replace(/\D/g, '')}`,
              orderSkus: ['Error loading SKUs'],
              hasLoadedSKUs: false,
              error: err instanceof Error ? err.message : String(err)
            };
          }
        })
      );
      
      // Filter out any null records (orders that were excluded during double-checking)
      const validOrdersData = fullOrdersData.filter(order => order !== null);
      
      console.log(`🔍 [fetchOrders] Final result: ${validOrdersData.length} orders ready for display`);
      if (validOrdersData.length > 0) {
        console.log(`🔍 [fetchOrders] First few orders:`, validOrdersData.slice(0, 3).map(o => ({ id: o.id, name: o.name })));
      }
      
      setOrders(validOrdersData);
      setOrdersFetching(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrdersError(error instanceof Error ? error : new Error(String(error)));
      setOrdersFetching(false);
    }
  }, [isAuthenticated, shop, preventRefresh]);

  const fetchSheetOrders = useCallback(async () => {
    if (!isAuthenticated || !shop || preventRefresh || sheetOrdersFetching) {
      return;
    }

    setSheetOrdersFetching(true);
    setSheetOrdersError(null);

    try {
      console.log("🔍 [fetchSheetOrders] Starting to fetch orders for Google Sheets...");

      // Fetch orders using Gadget's standard API, sorting by most recent
      const response = await api.shopifyOrder.findMany({
        select: {
          id: true,
          tags: true,
          fulfillmentStatus: true,
          name: true,
          shippingAddress: true,
          financialStatus: true,
          createdAt: true,
          writeOrder: true,
          autoWrite: true
        },
        first: 250, // Increase to fetch more orders
        sort: [{
          createdAt: "Descending" as any
        }]
      });

      console.log(`🔍 [fetchSheetOrders] Initially fetched ${response.length} orders from Shopify`);
      if (response.length > 0) {
        console.log(`🔍 [fetchSheetOrders] Newest order date: ${response[0]?.createdAt}, Oldest order date in result: ${response[response.length-1]?.createdAt}`);
      }

      // Create a list of all fulfillment statuses that indicate an order is fulfilled
      const FULFILLED_STATUSES = [
        'FULFILLED', 'fulfilled',
        'PARTIAL', 'partial',
        'SHIPPED', 'shipped',
        'COMPLETE', 'complete',
        'DELIVERED', 'delivered'
      ];

      // Filter orders that are fulfilled and have writeOrder=true
      const filteredOrders = response.filter(order => {
        // Check if order has been manually removed
        if (removedOrders.includes(order.id)) {
          console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} - manually removed`);
          return false;
        }

        // Check fulfillment status - must be fulfilled
        const fulfillmentStatus = order.fulfillmentStatus || '';
        const isFulfilled = FULFILLED_STATUSES.some(
          status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
        );

        if (!isFulfilled) {
          console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} - not fulfilled: ${fulfillmentStatus}`);
          return false;
        }

        // Check writeOrder field - must be true (treat null as false)
        const writeOrder = order.writeOrder;
        if (!writeOrder) {
          console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} - writeOrder is ${writeOrder}`);
          return false;
        }

        // Check autoWrite field - must be false (exclude orders with autoWrite=true)
        const autoWrite = order.autoWrite;
        if (autoWrite === true) {
          console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} - autoWrite is true`);
          return false;
        }

        console.log(`🔍 [fetchSheetOrders] Order ${order.name || order.id} passed filtering - fulfilled, writeOrder=true, and autoWrite is not true`);
        return true;
      });

      console.log(`🔍 [fetchSheetOrders] After filtering: ${filteredOrders.length} orders remain`);

      if (filteredOrders.length === 0) {
        console.log(`🔍 [fetchSheetOrders] No orders passed the filtering - nothing to load`);
        setSheetOrders([]);
        setSheetOrdersFetching(false);
        return;
      }

      // Load detailed order data for all filtered orders
      console.log(`🔍 [fetchSheetOrders] Loading full order data for ${filteredOrders.length} orders...`);
      const fullOrdersData = await Promise.all(
        filteredOrders.map(async (order: any) => {
          try {
            console.log(`🔍 [fetchSheetOrders] Extracting SKUs for order ${order.name || order.id}`);
            // Use extractOrderSKUs action to get complete order data
            const orderResponse = await (api as any).extractOrderSKUs({
              orderId: String(order.id).replace(/\D/g, ''),
              shopId: shop?.id || ''
            });

            if (orderResponse?.success && orderResponse?.order) {
              // Double-check that the order is still fulfilled
              const orderDetails = orderResponse.order;

              // Check if order is cancelled using the isCancelled flag
              if (orderDetails.isCancelled) {
                console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} after full data check - cancelled`);
                return null;
              }

              // Verify fulfillment status
              const fulfillmentStatus = orderDetails.fulfillmentStatus || '';
              const isFulfilled = FULFILLED_STATUSES.some(
                status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
              );

              if (!isFulfilled) {
                console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} after full data check - no longer fulfilled`);
                return null;
              }

              console.log(`🔍 [fetchSheetOrders] Successfully loaded order ${order.name || order.id}`);
              return {
                ...orderResponse.order,
                id: order.id, // Keep the original ID format
                hasLoadedSKUs: true,
                writeOrder: true
              };
            } else {
              console.log(`🔍 [fetchSheetOrders] Failed to extract SKUs for order ${order.name || order.id}: ${orderResponse?.error || 'Unknown error'}`);
              return null; // Will be filtered out later
            }
          } catch (err) {
            console.log(`🔍 [fetchSheetOrders] Error processing order ${order.name || order.id}: ${err instanceof Error ? err.message : String(err)}`);
            return null; // Will be filtered out later
          }
        })
      );

      // Remove null entries
      const validOrdersData = fullOrdersData.filter(order => order !== null);

      console.log(`🔍 [fetchSheetOrders] Final result: ${validOrdersData.length} orders ready for display`);
      if (validOrdersData.length > 0) {
        console.log(`🔍 [fetchSheetOrders] First few orders:`, validOrdersData.slice(0, 3).map(o => ({ id: o.id, name: o.name })));
      }

      setSheetOrders(validOrdersData);
      setSheetOrdersFetching(false);
    } catch (error) {
      console.error("Error fetching sheet orders:", error);
      setSheetOrdersError(error instanceof Error ? error : new Error(String(error)));
      setSheetOrdersFetching(false);
    }
  }, [isAuthenticated, shop, preventRefresh, removedOrders]);

  const fetchExchangeOrders = useCallback(async () => {
    // Skip if already fetching or if refresh is prevented
    if (!isAuthenticated || !shop || exchangeOrdersFetching) return;
    
    setExchangeOrdersFetching(true);
    setExchangeOrdersError(null);
    
    try {
      console.log("🔍 [fetchExchangeOrders] Starting to fetch exchange orders...");
      
      // Fetch orders using Gadget's standard API, sorting by most recent
      const response = await api.shopifyOrder.findMany({
        select: {
          id: true,
          tags: true,
          fulfillmentStatus: true, 
          name: true,
          shippingAddress: true,
          financialStatus: true,
          createdAt: true
        },
        first: 250, // Increase to fetch more orders
        sort: [{
          createdAt: "Descending" as any // Using lowercase "desc" for the sort order
        }]
      });
      
      console.log(`🔍 [fetchExchangeOrders] Initially fetched ${response.length} orders from Shopify`);
      if (response.length > 0) {
        console.log(`🔍 [fetchExchangeOrders] Newest order date: ${response[0]?.createdAt}, Oldest order date in result: ${response[response.length-1]?.createdAt}`);
      }
      
      // Create list of fulfilled statuses with different capitalizations for robust matching
      const FULFILLED_STATUSES = [
        'FULFILLED', 'fulfilled', 
        'PARTIAL', 'partial',
        'SHIPPED', 'shipped',
        'COMPLETE', 'complete',
        'DELIVERED', 'delivered'
      ];
      
      // Create a list of all order statuses that indicate an order is cancelled
      const CANCELLED_STATUSES = [
        'CANCELLED', 'cancelled',
        'CANCELED', 'canceled'
      ];
      
      // Get unique statuses for debugging
      const uniqueTags = new Set();
      response.forEach(order => {
        if (order.tags) {
          const tagValue = order.tags;
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          tagArray.forEach(tag => {
            if (typeof tag === 'string') {
              uniqueTags.add(tag);
            }
          });
        }
      });
      
      console.log("🔍 [fetchExchangeOrders] Unique tags found:", [...uniqueTags]);
      
      // First filter - get only orders that have Echange tag and are UNFULFILLED, not CANCELLED, and have a confirmation tag
      const filteredOrders = response.filter(order => {
        // Skip if order has been manually removed
        if (removedOrders.includes(order.id)) {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - manually removed`);
          return false;
        }
        
        // Check if order has the Echange tag
        let hasExchangeTag = false;
        
        if (order.tags) {
          // Handle both string and array formats for tags
          const tagValue = order.tags;
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          // Output tags for debugging
          console.log(`🔍 [fetchExchangeOrders] Order ${order.name || order.id} has tags: ${JSON.stringify(tagArray)}`);
          
          // Case-insensitive check for 'echange' in any tag
          hasExchangeTag = tagArray.some(tag => 
            typeof tag === 'string' && tag.toLowerCase().includes('echange')
          );
          
          if (!hasExchangeTag) {
            console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - no Echange tag`);
            return false;
          }
        } else {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - no tags`);
          return false;
        }
        
        // Check for fulfilled status with better case handling
        const fulfillmentStatus = order.fulfillmentStatus || '';
        const isFulfilled = FULFILLED_STATUSES.some(
          status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
        );
        
        if (isFulfilled) {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - already fulfilled: ${fulfillmentStatus}`);
          return false;
        }
        
        // Check if order is cancelled
        const financialStatus = order.financialStatus || '';
        const isCancelled = CANCELLED_STATUSES.some(
          status => financialStatus.toUpperCase() === status.toUpperCase()
        );
        
        if (isCancelled) {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - cancelled: ${financialStatus}`);
          return false;
        }
        
        // Check if order has any of the confirmation tags
        let hasConfirmationTag = false;
        
        if (order.tags) {
          const tagValue = order.tags;
          
          // Handle both string and array formats for tags
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          // Check each confirmation tag in detail
          for (const confirmTag of CONFIRMATION_TAGS) {
            for (const orderTag of tagArray) {
              if (typeof orderTag === 'string' && orderTag.includes(confirmTag)) {
                console.log(`🔍 [fetchExchangeOrders] Order ${order.name || order.id} has confirmation tag: ${orderTag}`);
                hasConfirmationTag = true;
                break;
              }
            }
            if (hasConfirmationTag) break;
          }
        }
        
        if (!hasConfirmationTag) {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - no confirmation tag`);
          return false;
        }
        
        // Order has Echange tag, is not fulfilled, is not cancelled, and has confirmation tag
        console.log(`🔍 [fetchExchangeOrders] Order ${order.name || order.id} passed initial filtering`);
        return true;
      });
      
      console.log(`🔍 [fetchExchangeOrders] After initial filtering: ${filteredOrders.length} orders remain`);
      
      if (filteredOrders.length === 0) {
        console.log(`🔍 [fetchExchangeOrders] No orders passed the initial filtering - nothing to load`);
        setExchangeOrders([]);
        setExchangeOrdersFetching(false);
        return;
      }
      
      // Load detailed order data for all filtered orders
      console.log(`🔍 [fetchExchangeOrders] Loading full order data for ${filteredOrders.length} orders...`);
      const fullOrdersData = await Promise.all(
        filteredOrders.map(async (order: any) => {
          try {
            console.log(`🔍 [fetchExchangeOrders] Extracting SKUs for order ${order.name || order.id}`);
            // Use extractOrderSKUs action to get complete order data
            const orderResponse = await (api as any).extractOrderSKUs({
              orderId: String(order.id).replace(/\D/g, ''),
              shopId: shop?.id || ''
            });
            
            if (orderResponse?.success && orderResponse?.order) {
              // Double-check that the order isn't already fulfilled
              const orderDetails = orderResponse.order;
              
              // Check if order is cancelled using the new isCancelled flag
              if (orderDetails.isCancelled) {
                console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} after full data check - cancelled`);
                return null;
              }
              
              // If order has a tracking number, check if it's already fulfilled
              if (orderDetails.trackingNumber) {
                const fulfillmentStatus = orderDetails.fulfillmentStatus || '';
                const isFulfilled = FULFILLED_STATUSES.some(
                  status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
                );
                
                // If order has tracking number and is marked fulfilled, filter it out
                if (isFulfilled) {
                  console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} after full data check - has tracking and is fulfilled`);
                  return null;
                }
                
                // If order has tracking number but isn't marked fulfilled yet in Shopify, check if it's a tracking number we just created
                if (updatedTrackingIds[order.id] === orderDetails.trackingNumber) {
                  console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - tracking number was just updated`);
                  return null;
                }
              }
              
              console.log(`🔍 [fetchExchangeOrders] Successfully loaded exchange order ${order.name || order.id}`);
              return {
                ...orderResponse.order,
                id: order.id, // Keep the original ID format
                hasLoadedSKUs: true
              };
            } else {
              console.log(`🔍 [fetchExchangeOrders] Failed to extract SKUs for order ${order.name || order.id}: ${orderResponse?.error || 'Unknown error'}`);
              return null; // Will be filtered out later
            }
          } catch (err) {
            console.log(`🔍 [fetchExchangeOrders] Error processing order ${order.name || order.id}: ${err instanceof Error ? err.message : String(err)}`);
            return null; // Will be filtered out later
          }
        })
      );
      
      // Remove null entries
      const validOrdersData = fullOrdersData.filter(order => order !== null);
      
      // No need to filter by DH tracking code for unfulfilled orders as they won't have tracking codes yet
      const exchangeOrders = validOrdersData;
      
      console.log(`🔍 [fetchExchangeOrders] Final result: ${exchangeOrders.length} exchange orders ready for display`);
      if (exchangeOrders.length > 0) {
        console.log(`🔍 [fetchExchangeOrders] First few exchange orders:`, exchangeOrders.slice(0, 3).map(o => ({ id: o.id, name: o.name })));
      }
      
      setExchangeOrders(exchangeOrders);
      setExchangeOrdersFetching(false);
    } catch (error) {
      console.error("Error fetching exchange orders:", error);
      setExchangeOrdersError(error instanceof Error ? error : new Error(String(error)));
      setExchangeOrdersFetching(false);
    }
  }, [isAuthenticated, shop]);

  const handleCourierChange = useCallback((value: string) => {
    setSelectedCourier(value);
  }, []);

  const handleSelectOrder = useCallback((id: string) => {
    if (selectedTab === 0) {
      // Confirmed orders tab
      setSelectedConfirmedOrders(prev => {
        if (prev.includes(id)) {
          return prev.filter(orderId => orderId !== id);
        } else {
          return [...prev, id];
        }
      });
    } else if (selectedTab === 1) {
      // Exchange orders tab
      setSelectedExchangeOrders(prev => {
        if (prev.includes(id)) {
          return prev.filter(orderId => orderId !== id);
        } else {
          return [...prev, id];
        }
      });
    } else if (selectedTab === 2) {
      // Sheet orders tab
      setSelectedSheetOrders(prev => {
        if (prev.includes(id)) {
          return prev.filter(orderId => orderId !== id);
        } else {
          return [...prev, id];
        }
      });
    }
    // Note: selectedTab === 3 (Speedaf Tracking) doesn't need order selection
  }, [selectedTab]);

  const handleSelectAllOrders = useCallback(() => {
    const startIndex = (confirmedCurrentPage - 1) * confirmedPageSize;
    const endIndex = Math.min(startIndex + confirmedPageSize, orders.length);
    const currentPageOrders = orders.slice(startIndex, endIndex);
    const currentPageOrderIds = currentPageOrders.map(order => order.id);
    
    const allCurrentPageSelected = currentPageOrderIds.every(id => 
      selectedConfirmedOrders.includes(id)
    );
    
    if (allCurrentPageSelected) {
      // If all current page orders are selected, deselect them
      setSelectedConfirmedOrders(prev => 
        prev.filter(id => !currentPageOrderIds.includes(id))
      );
    } else {
      // Otherwise, select all current page orders while keeping previously selected orders from other pages
      const otherPageSelections = selectedConfirmedOrders.filter(
        id => !currentPageOrderIds.includes(id)
      );
      setSelectedConfirmedOrders([...otherPageSelections, ...currentPageOrderIds]);
    }
  }, [confirmedCurrentPage, confirmedPageSize, orders, selectedConfirmedOrders]);

  const handleSelectAllExchangeOrders = useCallback(() => {
    const startIndex = (exchangeCurrentPage - 1) * exchangePageSize;
    const endIndex = Math.min(startIndex + exchangePageSize, exchangeOrders.length);
    const currentPageOrders = exchangeOrders.slice(startIndex, endIndex);
    const currentPageOrderIds = currentPageOrders.map(order => order.id);
    
    const allCurrentPageSelected = currentPageOrderIds.every(id => 
      selectedExchangeOrders.includes(id)
    );
    
    if (allCurrentPageSelected) {
      // If all current page orders are selected, deselect them
      setSelectedExchangeOrders(prev => 
        prev.filter(id => !currentPageOrderIds.includes(id))
      );
    } else {
      // Otherwise, select all current page orders while keeping previously selected orders from other pages
      const otherPageSelections = selectedExchangeOrders.filter(
        id => !currentPageOrderIds.includes(id)
      );
      setSelectedExchangeOrders([...otherPageSelections, ...currentPageOrderIds]);
    }
  }, [exchangeCurrentPage, exchangePageSize, exchangeOrders, selectedExchangeOrders]);

  const handleSelectAllSheetOrders = useCallback(() => {
    const startIndex = (sheetCurrentPage - 1) * sheetPageSize;
    const endIndex = Math.min(startIndex + sheetPageSize, sheetOrders.length);
    const currentPageOrders = sheetOrders.slice(startIndex, endIndex);
    const currentPageOrderIds = currentPageOrders.map(order => order.id);

    const allCurrentPageSelected = currentPageOrderIds.every(id =>
      selectedSheetOrders.includes(id)
    );

    if (allCurrentPageSelected) {
      // If all current page orders are selected, deselect them
      setSelectedSheetOrders(prev =>
        prev.filter(id => !currentPageOrderIds.includes(id))
      );
    } else {
      // Otherwise, select all current page orders while keeping previously selected orders from other pages
      const otherPageSelections = selectedSheetOrders.filter(
        id => !currentPageOrderIds.includes(id)
      );
      setSelectedSheetOrders([...otherPageSelections, ...currentPageOrderIds]);
    }
  }, [sheetCurrentPage, sheetPageSize, sheetOrders, selectedSheetOrders]);

  const handleWriteToSheets = async () => {
    if (selectedSheetOrders.length === 0) return;

    // Set prevent refresh flag to avoid auto-refreshes
    setPreventRefresh(true);
    setFulfillLoading(true);
    const results = [];
    const failedOrders = [];

    try {
      console.log(`Starting to write ${selectedSheetOrders.length} orders to Google Sheets`);

      // Collect all order data first, then write in a single batch operation
      console.log(`Collecting data for ${selectedSheetOrders.length} orders for batch write`);

      const allOrdersData = [];

      // First pass: collect all order data
      for (let i = 0; i < selectedSheetOrders.length; i++) {
        const orderId = selectedSheetOrders[i];
        console.log(`Collecting data for order ${i + 1}/${selectedSheetOrders.length}: ${orderId}`);

        try {
          // Find the order in our loaded sheet orders array
          const orderItem = sheetOrders.find(o => o.id === orderId);
          if (!orderItem) {
            throw new Error(`Order ${orderId} not found in loaded sheet orders`);
          }

          // Get full order details if not already loaded
          let orderData = orderItem;
          if (!orderItem.hasLoadedSKUs) {
            const apiAny = api as any;
            const cleanOrderId = String(orderId).replace(/\D/g, '');

            const orderExtractResult = await apiAny.extractOrderSKUs({
              orderId: cleanOrderId,
              shopId: shop?.id || ''
            });

            if (!orderExtractResult?.success || !orderExtractResult?.order) {
              throw new Error(orderExtractResult?.error || "Failed to extract order details");
            }

            orderData = orderExtractResult.order;
          }

          // Check if this is an exchange order by looking for "echange" tag
          const tagArray = Array.isArray(orderData.tags) ? orderData.tags :
                          (typeof orderData.tags === 'string' ? orderData.tags.split(/,\s*/) : []);
          const isExchangeOrder = tagArray.some(tag =>
            typeof tag === 'string' && tag.toLowerCase().includes('echange')
          );

          // For exchange orders, try to get reference tracking number
          let referenceTrackingNumber = '';
          if (isExchangeOrder) {
            console.log(`Order ${orderData.name} is an exchange order, checking for reference tracking...`);

            // First check if we have the reference in our exchangeReferences state
            if (exchangeReferences[orderId] && exchangeReferences[orderId].trackingNumber) {
              referenceTrackingNumber = exchangeReferences[orderId].trackingNumber;
              console.log(`Found reference tracking number from exchangeReferences: ${referenceTrackingNumber}`);
            }
            // If not found in exchangeReferences, try to get it from the order's referenceOrderId
            else if (orderData.referenceOrderId) {
              try {
                const refOrderExtractResult = await (api as any).extractOrderSKUs({
                  orderId: String(orderData.referenceOrderId).replace(/\D/g, ''),
                  shopId: shop?.id || ''
                });

                if (refOrderExtractResult?.success && refOrderExtractResult?.order) {
                  referenceTrackingNumber = refOrderExtractResult.order.trackingNumber || '';
                  console.log(`Found reference tracking number from referenceOrderId: ${referenceTrackingNumber}`);
                }
              } catch (refError) {
                console.error(`Error getting reference order tracking:`, refError);
              }
            }
            else {
              console.log(`No reference tracking found for exchange order ${orderData.name}`);
            }
          }

          // Transform order data
          const transformedOrderData = {
            id: orderData.id,
            name: orderData.name,
            customerName: orderData.customerName,
            phone: orderData.phone,
            originalCity: orderData.originalCity, // Include Original City from noteAttributes
            address: orderData.address,
            city: formatCityForSheets(modifiedCities[orderData.id] || orderData.city || orderData.rawCity || '', selectedCourier), // Use modified city first, then recognized city, then raw city, standardized and formatted for sheets
            rawCity: orderData.rawCity,
            lineItems: orderData.lineItems.map((item: any) => ({
              name: item.name,
              quantity: item.quantity,
              sku: item.sku,
              price: item.price
            })),
            totalPrice: orderData.totalPrice,
            displayFulfillmentStatus: orderData.fulfillmentStatus || orderData.displayFulfillmentStatus,
            createdAt: orderData.createdAt,
            tags: orderData.tags,
            trackingNumber: orderData.trackingNumber || '',
            referenceTrackingNumber: referenceTrackingNumber, // Reference order tracking for column Y
            isExchangeOrder: isExchangeOrder, // Flag to identify exchange orders for checkbox in column AA
            isCancelled: orderData.isCancelled,
            isDeleted: orderData.isDeleted,
            isFulfillmentCancelled: orderData.isFulfillmentCancelled
          };

          allOrdersData.push({
            orderId,
            orderName: orderItem.name,
            orderData: transformedOrderData
          });

        } catch (orderError) {
          console.error(`Error collecting data for order ${orderId}:`, orderError);
          failedOrders.push({
            orderId,
            orderName: sheetOrders.find(o => o.id === orderId)?.name || orderId,
            error: orderError instanceof Error ? orderError.message : String(orderError),
            success: false
          });
        }
      }

      // Second pass: write all orders in a single batch operation
      if (allOrdersData.length > 0) {
        console.log(`Writing ${allOrdersData.length} orders to Google Sheets in a single batch operation`);

        try {
          const batchWriteResult = await (api as any).writeBatchOrdersToSheets({
            ordersData: JSON.stringify(allOrdersData.map(item => item.orderData)),
            shopId: shop?.id || ''
          });

          if (batchWriteResult?.success) {
            console.log(`Successfully wrote ${allOrdersData.length} orders to Google Sheets`, batchWriteResult);

            // Mark all orders as successful
            allOrdersData.forEach(item => {
              results.push({
                orderId: item.orderId,
                orderName: item.orderName,
                success: true
              });
            });
          } else {
            throw new Error(batchWriteResult?.error || "Batch write to sheets failed");
          }

        } catch (batchError) {
          console.error(`Error in batch write:`, batchError);
          // Mark all orders as failed
          allOrdersData.forEach(item => {
            failedOrders.push({
              orderId: item.orderId,
              orderName: item.orderName,
              error: batchError instanceof Error ? batchError.message : String(batchError),
              success: false
            });
          });
        }
      }

      // Show results to user
      if (results.length > 0) {
        const successMessage = `Successfully wrote ${results.length} orders to Google Sheets.`;
        console.log(successMessage, { successfulOrders: results });

        setToastProps({
          content: successMessage,
          error: false
        });
        setToastActive(true);
      }

      if (failedOrders.length > 0) {
        const errorMessages = failedOrders.map(order =>
          `${order.orderName}: ${order.error}`
        );
        const errorMessage = `Failed to write ${failedOrders.length} orders: ${errorMessages.join(', ')}`;
        console.error("Failed sheet orders:", failedOrders);

        setToastProps({
          content: errorMessage,
          error: true
        });
        setToastActive(true);
      }

      // Clear selections and refresh the sheet orders
      setSelectedSheetOrders([]);

      // Refresh the sheet orders to reflect the changes
      setTimeout(() => {
        fetchSheetOrders();
      }, 2000); // Wait 2 seconds for the backend to process

    } catch (error) {
      console.error("Error in handleWriteToSheets:", error);
      setToastProps({
        content: `Error writing orders to sheets: ${error instanceof Error ? error.message : String(error)}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setFulfillLoading(false);
      setPreventRefresh(false);
    }
  };

  const normalizeForSearch = useCallback((text: string): string => {
    if (!text) return '';
    return text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[œ]/g, 'oe')
      .replace(/[æ]/g, 'ae')
      .replace(/[ç]/g, 'c');
  }, []);

  const handleCityInputChange = useCallback((value: string) => {
    setCityInputValue(value);
    setEditingCity(value);
    
    // Get the appropriate cities list based on the selected courier
    const citiesList = selectedCourier === 'speedaf' ? SPEEDAF_CITIES : MOROCCAN_CITIES;
    
    // Filter cities based on input
    if (value.trim() === '') {
      // When input is empty, show all cities
      setFilteredCities(citiesList);
    } else {
      setIsLoading(true);
      // Use normalized search to handle accents and special characters
      const normalizedInput = normalizeForSearch(value);
      const filtered = citiesList.filter(city => 
        normalizeForSearch(city).includes(normalizedInput)
      );
      setFilteredCities(filtered);
      setIsLoading(false);
    }
  }, [selectedCourier, normalizeForSearch]);

  const handleCitySelect = useCallback((selected: string) => {
    setEditingCity(selected);
    setCityInputValue(selected);
  }, []);

  const handleEditCity = useCallback((id: string, currentCity: string) => {
    setEditingOrderId(id);
    // Ensure we have a non-null city value
    const safeCurrentCity = modifiedCities[id] || currentCity || '';
    setEditingCity(safeCurrentCity);
    setCityInputValue(safeCurrentCity);
    
    // Get the appropriate cities list based on the selected courier
    const citiesList = selectedCourier === 'speedaf' ? SPEEDAF_CITIES : MOROCCAN_CITIES;
    
    // Show all cities initially
    setFilteredCities(citiesList);
    setShowCityModal(true);
  }, [modifiedCities, selectedCourier]);

  const handleSaveCity = useCallback(() => {
    if (editingOrderId) {
      const updatedCities = {
        ...modifiedCities,
        [editingOrderId]: editingCity
      };
      
      setModifiedCities(updatedCities);
      
      // Save to localStorage for persistence
      try {
        localStorage.setItem('modifiedCities', JSON.stringify(updatedCities));
      } catch (error) {
        console.error("Error saving modified cities to localStorage:", error);
      }
      
      setShowCityModal(false);
      setEditingOrderId(null);
    }
  }, [editingOrderId, editingCity, modifiedCities]);

  const handleCancelCity = useCallback(() => {
    setShowCityModal(false);
    setEditingOrderId(null);
  }, []);

  const handleRemoveOrder = useCallback((id: string) => {
    setOrderToRemove(id);
    setShowRemoveModal(true);
  }, []);

  const handleConfirmRemove = useCallback(() => {
    if (orderToRemove) {
      // Add to removed orders list
      const updatedRemovedOrders = [...removedOrders, orderToRemove];
      setRemovedOrders(updatedRemovedOrders);
      
      if (selectedTab === 0) {
        // Confirmed Orders tab
        // Remove from selected orders if selected
        if (selectedConfirmedOrders.includes(orderToRemove)) {
          setSelectedConfirmedOrders(prev => prev.filter(id => id !== orderToRemove));
        }
        
        // Remove from orders list
        setOrders(prev => prev.filter(order => order.id !== orderToRemove));
      } else {
        // Exchange Orders tab
        // Remove from selected exchange orders if selected
        if (selectedExchangeOrders.includes(orderToRemove)) {
          setSelectedExchangeOrders(prev => prev.filter(id => id !== orderToRemove));
        }
        
        // Remove from exchange orders list
        setExchangeOrders(prev => prev.filter(order => order.id !== orderToRemove));
      }
      
      // Save to localStorage for persistence
      try {
        localStorage.setItem('removedOrders', JSON.stringify(updatedRemovedOrders));
      } catch (error) {
        console.error("Error saving removed orders to localStorage:", error);
      }
      
      // Show toast notification
      setToastProps({
        content: "Order removed from fulfillment list",
        error: false
      });
      setToastActive(true);
      
      setShowRemoveModal(false);
      setOrderToRemove(null);
    }
  }, [orderToRemove, removedOrders, selectedConfirmedOrders, selectedExchangeOrders, selectedTab]);

  const handleCancelRemove = useCallback(() => {
    setShowRemoveModal(false);
    setOrderToRemove(null);
  }, []);

  const getPaginatedOrders = useCallback(() => {
    const startIndex = (confirmedCurrentPage - 1) * confirmedPageSize;
    const endIndex = Math.min(startIndex + confirmedPageSize, orders.length);
    return orders.slice(startIndex, endIndex);
  }, [orders, confirmedCurrentPage, confirmedPageSize]);

  const getPaginatedExchangeOrders = useCallback(() => {
    const startIndex = (exchangeCurrentPage - 1) * exchangePageSize;
    const endIndex = Math.min(startIndex + exchangePageSize, exchangeOrders.length);
    return exchangeOrders.slice(startIndex, endIndex);
  }, [exchangeOrders, exchangeCurrentPage, exchangePageSize]);

  const handleConfirmedPageChange = useCallback((newPage: number) => {
    setConfirmedCurrentPage(newPage);
  }, []);

  const handleExchangePageChange = useCallback((newPage: number) => {
    setExchangeCurrentPage(newPage);
  }, []);

  // Function to open the exchange reference modal
  const handleExchangeWith = useCallback(async (id: string) => {
    setCurrentExchangeOrderId(id);
    setReferenceOrderNumber("");
    setReferenceOrderError(null);
    setSelectedReferenceOrder('');
    setReferenceOrderSearchValue('');
    setReferenceOrderOptions([]);
    setShowExchangeModal(true);
    setReferenceOrdersLoading(true);
    
    // Find the current order to get its phone number
    const currentOrder = exchangeOrders.find(o => o.id === id);
    
    // Only proceed if we can get the phone number
    if (currentOrder && shop) {
      try {
        // Get the phone number from the order using our safe extraction function
        const phoneNumber = extractPhoneNumber(currentOrder);
        
        // If no phone number, show error
        if (!phoneNumber) {
          setReferenceOrderError("No phone number found for this order");
          setReferenceOrdersLoading(false);
          return;
        }
        
        // Create list of fulfilled statuses with different capitalizations for robust matching
        const FULFILLED_STATUSES = [
          'FULFILLED', 'fulfilled', 
          'PARTIAL', 'partial',
          'SHIPPED', 'shipped',
          'COMPLETE', 'complete',
          'DELIVERED', 'delivered'
        ];
        
        // Fetch orders using the same approach as fetchExchangeOrders - sorting by most recent
        const response = await api.shopifyOrder.findMany({
          select: {
            id: true,
            tags: true,
            fulfillmentStatus: true, 
            name: true,
            shippingAddress: true,
            financialStatus: true,
            createdAt: true
          },
          first: 100,
          sort: [{
            createdAt: "Descending" as any // Same sorting as in fetchExchangeOrders
          }]
        });
        
        console.log("Found", response.length, "total orders");
        
        if (!response || response.length === 0) {
          setReferenceOrderError("No orders found");
          setReferenceOrdersLoading(false);
          return;
        }
        
        // First check for fulfilled status in the initial response
        const potentiallyFulfilledOrders = response.filter(order => {
          // Check if fulfillment status indicates this order is fulfilled
          const status = order.fulfillmentStatus || '';
          const isFulfilled = FULFILLED_STATUSES.some(
            fulfillmentStatus => status.toUpperCase() === fulfillmentStatus.toUpperCase()
          );
          
          // Extract phone number to check if it matches
          const orderPhone = extractPhoneNumber(order);
          const hasSamePhone = orderPhone === phoneNumber;
          
          // Check if this is not the current order
          const isNotCurrentOrder = order.id !== id;
          
          return isFulfilled && hasSamePhone && isNotCurrentOrder;
        });
        
        console.log("Found", potentiallyFulfilledOrders.length, "fulfilled orders with same phone number");
        
        if (potentiallyFulfilledOrders.length === 0) {
          setReferenceOrderError("No fulfilled orders found with the same phone number");
          setReferenceOrdersLoading(false);
          return;
        }
        
        // Sort by created date (newest first)
        const sortedOrders = potentiallyFulfilledOrders.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        
        console.log("Checking these fulfilled orders for DH tracking numbers");
        
        // OPTIMIZATION: Only check a limited number of orders in parallel
        const MAX_ORDERS_TO_CHECK = 10; // Limit to 5 orders initially
        const validOrders = [];
        
        // First batch - check first 5 orders
        const firstBatch = sortedOrders.slice(0, MAX_ORDERS_TO_CHECK);
        setReferenceOrderError("Checking first 5 orders... This should be quick.");
        
        // Check first batch of orders in parallel
        const firstBatchResults = await Promise.all(
          firstBatch.map(async (order) => {
            try {
              const orderExtractResult = await api.extractOrderSKUs({
                orderId: String(order.id).replace(/\D/g, ''),
                shopId: shop?.id || ''
              });
              
              if (!orderExtractResult?.success || !orderExtractResult?.order) {
                return null;
              }
              
              const extractedOrder = orderExtractResult.order;
              const orderName = extractedOrder.name || `#${String(order.id).replace(/\D/g, '')}`;
              
              // Check if tracking number exists and starts with DH
              if (extractedOrder.trackingNumber && 
                  String(extractedOrder.trackingNumber).startsWith("DH")) {
                return {
                  label: orderName,
                  value: String(order.id).replace(/\D/g, '')
                };
              }
              
              return null;
            } catch (error) {
              console.error(`Error checking order ${order.id}:`, error);
              return null;
            }
          })
        );
        
        // Filter out null results and add to valid orders
        const validFirstBatch = firstBatchResults.filter((result): result is {label: string; value: string} => 
          result !== null
        );
        validOrders.push(...validFirstBatch);
        
        // If we found at least one valid order, no need to check more
        if (validOrders.length === 0 && sortedOrders.length > MAX_ORDERS_TO_CHECK) {
          // If no valid orders in first batch, check more if available
          setReferenceOrderError("Checking more orders... This may take a moment.");
          
          // OPTIMIZATION: Process remaining orders in batches of 10
          const MAX_ORDERS_TOTAL = 150; // Check up to 50 orders total
          const remainingOrders = sortedOrders.slice(MAX_ORDERS_TO_CHECK, MAX_ORDERS_TOTAL); 
          
          // Process in batches of 10 to show progress
          const BATCH_SIZE = 10;
          for (let i = 0; i < remainingOrders.length; i += BATCH_SIZE) {
            const currentBatch = remainingOrders.slice(i, i + BATCH_SIZE);
            
            // Update progress message
            const processedCount = MAX_ORDERS_TO_CHECK + i;
            const totalToProcess = Math.min(sortedOrders.length, MAX_ORDERS_TOTAL);
            setReferenceOrderError(`Checking orders ${processedCount+1}-${processedCount+currentBatch.length} of ${totalToProcess}...`);
            
            // Process this batch in parallel
            const batchResults = await Promise.all(
              currentBatch.map(async (order) => {
                try {
                  const orderExtractResult = await api.extractOrderSKUs({
                    orderId: String(order.id).replace(/\D/g, ''),
                    shopId: shop?.id || ''
                  });
                  
                  if (!orderExtractResult?.success || !orderExtractResult?.order) {
                    return null;
                  }
                  
                  const extractedOrder = orderExtractResult.order;
                  const orderName = extractedOrder.name || `#${String(order.id).replace(/\D/g, '')}`;
                  
                  // Check if tracking number exists and starts with DH
                  if (extractedOrder.trackingNumber && 
                      String(extractedOrder.trackingNumber).startsWith("DH")) {
                    return {
                      label: orderName,
                      value: String(order.id).replace(/\D/g, '')
                    };
                  }
                  
                  return null;
                } catch (error) {
                  console.error(`Error checking order ${order.id}:`, error);
                  return null;
                }
              })
            );
            
            // Add valid orders from this batch
            const validBatch = batchResults.filter((result): result is {label: string; value: string} => 
              result !== null
            );
            validOrders.push(...validBatch);
            
            // If we found enough valid orders, stop processing
            if (validOrders.length >= 5) {
              break;
            }
          }
        }
        
        console.log("Found", validOrders.length, "valid orders with DH tracking");
        
        if (validOrders.length === 0) {
          setReferenceOrderError("No fulfilled orders with DH tracking numbers found");
        } else {
          // Set the options for the dropdown
          setReferenceOrderOptions(validOrders);
          setReferenceOrderError(null);
        }
      } catch (error) {
        console.error("Error fetching reference orders:", error);
        setReferenceOrderError(`Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setReferenceOrdersLoading(false);
      }
    }
  }, [exchangeOrders, shop]);

  // Helper function to extract phone number from an order
  const extractPhoneNumber = (order: any): string | null => {
    if (order.shippingAddress && order.shippingAddress.phone) {
          return order.shippingAddress.phone;
    } else if (order.phone) {
      return order.phone;
    } else {
      return null;
    }
  };

  // The rest of your component (render logic) remains the same

  // Show loading state while fetching initial data
  if (shopFetching || configFetching) {
    return (
      <Frame>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner size="large" />
        </div>
      </Frame>
    );
  }

  // Show error state if there are any errors
  if (shopError || configError) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <Banner tone="critical">
                <p>Error loading shop configuration: {shopError?.message || configError?.message}</p>
              </Banner>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  if (!isAuthenticated) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <Text variant="bodyMd" as="p">
                Please authenticate to access this feature.
              </Text>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  const courierOptions = [
    { label: 'Sendit', value: 'sendit' },
    { label: 'Speedaf', value: 'speedaf' },
  ];

  // Helper function to render each order item
  const renderItem = (item: any) => {
    // Safely extract properties with fallbacks
    const {
      id,
      name = '',
      customerName = '',
      city = '',
      rawCity = '',
      originalCity = '', // Extract Original City from noteAttributes
      skus = [],
      totalPrice = '',
      financialStatus = '',
      statusTone = 'info',
      address = '',
      phone = '',
      trackingNumber = '',
      confirmationTag = ''
    } = item || {};
    
    const displayCity = city || (rawCity ? `Unknown (${rawCity})` : 'Unknown');
    const isSelected = selectedTab === 0
      ? selectedConfirmedOrders.includes(id)
      : selectedTab === 1
        ? selectedExchangeOrders.includes(id)
        : selectedTab === 2
          ? selectedSheetOrders.includes(id)
          : false; // Speedaf Tracking tab doesn't have selectable orders
    
    // Determine if tracking number was recently updated for highlighting
    const isTracked = trackingNumber && trackingNumber.trim() !== '';
    const isUpdatedTracking = updatedTrackingIds[id] === trackingNumber;
    
    // Check if this order has a reference order (for exchange tab)
    const hasReferenceOrder = selectedTab === 1 && exchangeReferences[id];
    const referenceOrder = hasReferenceOrder ? exchangeReferences[id] : null;
    
    // Handle checkbox click without propagating to row
    const handleCheckboxClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
    };
    
    // Safely access array methods
    const safeJoin = (arr?: any[]) => {
      return Array.isArray(arr) ? arr.join(', ') : '';
    };
    
    return (
      <ResourceItem 
        id={id} 
        onClick={() => handleOrderSelect(id)}
      >
        <BlockStack gap="400">
          <InlineStack gap="200" align="space-between">
            <InlineStack gap="200">
              <div onClick={handleCheckboxClick}>
                <Checkbox
                  label=""
                  labelHidden={true}
                  checked={isSelected}
                  onChange={() => handleSelectOrder(id)}
                />
              </div>
              <Text as="h3" variant="headingMd">{name}</Text>
              
              <Badge tone={statusTone}>
                {financialStatus}
              </Badge>
              
              {confirmationTag && (
                <Badge tone="info">{confirmationTag}</Badge>
              )}
            </InlineStack>
            
            <InlineStack gap="200">
              <Text as="span" variant="bodyMd">
                <strong>Amount:</strong> {totalPrice}
              </Text>
              
              {selectedTab === 1 && (
                <Button
                  size="micro"
                  onClick={() => {
                    handleExchangeWith(id);
                  }}
                >
                  Exchange With
                </Button>
              )}
            </InlineStack>
          </InlineStack>
          
          <InlineStack gap="200">
            <Text as="span" variant="bodyMd">
              <strong>Customer:</strong> {customerName}
            </Text>
            <Text as="span" variant="bodyMd">
              <strong>Phone:</strong> {phone}
            </Text>
            {originalCity && (
              <Text as="span" variant="bodyMd">
                <strong>Original City - additional info:</strong> {originalCity}
              </Text>
            )}
          </InlineStack>
          
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">
              <strong>Address:</strong> {address}
              {displayCity ? `, ` : ''}
              {modifiedCities[id] ? (
                <span style={{ color: '#bf0711' }}>
                  {modifiedCities[id]} <em>(modified)</em>
                </span>
              ) : (
                <CityDisplay city={displayCity} rawCity={rawCity} />
              )}
            </Text>
            <InlineStack gap="200">
              <Button
                size="micro"
                onClick={() => {
                  window.open(getShopifyOrderAdminUrl(shop, id), '_blank');
                }}
              >
                View in Shopify
              </Button>
              {selectedTab !== 2 && (
                <Button
                  size="micro"
                  onClick={() => {
                    handleEditCity(id, city);
                  }}
                >
                  Edit City
                </Button>
              )}
              <Button
                size="micro"
                tone="critical"
                onClick={() => {
                  handleRemoveOrder(id);
                }}
              >
                Remove
              </Button>
            </InlineStack>
          </InlineStack>
          
          <Text as="p" variant="bodyMd">
            <strong>Products:</strong> {safeJoin(skus)}
          </Text>
          
          {isTracked && (
            <div style={isUpdatedTracking ? { backgroundColor: '#E4F1F9', padding: '4px' } : {}}>
              <Text as="p" variant="bodyMd">
                <strong>Tracking:</strong> {trackingNumber}
              </Text>
            </div>
          )}
          
          {hasReferenceOrder && referenceOrder && (
            <div 
              style={{
                backgroundColor: '#F6F6F7',
                padding: '12px',
                borderRadius: '4px',
                marginTop: '8px'
              }}
            >
              <BlockStack gap="200">
                <Text as="h4" variant="headingSm">
                  Reference Order: {referenceOrder.name || ''}
                </Text>
                
                <InlineStack gap="200">
                  <Text as="span" variant="bodyMd">
                    <strong>Customer:</strong> {referenceOrder.customerName || 'Unknown'}
                  </Text>
                  <Text as="span" variant="bodyMd">
                    <strong>Status:</strong> {referenceOrder.financialStatus || ''}
                  </Text>
                  <Text as="span" variant="bodyMd">
                    <strong>Amount:</strong> {referenceOrder.totalPrice || ''}
                  </Text>
                </InlineStack>
                
                {referenceOrder.trackingNumber && (
                  <Text as="p" variant="bodyMd">
                    <strong>Tracking:</strong> {referenceOrder.trackingNumber}
                  </Text>
                )}
                
                <Text as="p" variant="bodyMd">
                  <strong>Products:</strong> {safeJoin(referenceOrder.skus) || 'No products'}
                </Text>
              </BlockStack>
            </div>
          )}
        </BlockStack>
      </ResourceItem>
    );
  };

  const tabs = [
    {
      id: 'confirmed-orders',
      content: 'Confirmed Orders',
      accessibilityLabel: 'Confirmed Orders',
      panelID: 'confirmed-orders-panel',
      badge: orders.length > 0 ? orders.length.toString() : undefined,
    },
    {
      id: 'exchange-orders',
      content: 'Sendit Exchange',
      accessibilityLabel: 'Exchange Orders',
      panelID: 'exchange-orders-panel',
      badge: exchangeOrders.length > 0 ? exchangeOrders.length.toString() : undefined,
    },
    {
      id: 'sheet-orders',
      content: 'Write to Sheets',
      accessibilityLabel: 'Sheet Orders',
      panelID: 'sheet-orders-panel',
      badge: sheetOrders.length > 0 ? sheetOrders.length.toString() : undefined,
    },
    {
      id: 'speedaf-tracking',
      content: 'Speedaf Tracking',
      accessibilityLabel: 'Speedaf Tracking',
      panelID: 'speedaf-tracking-panel',
      badge: speedafTrackingResults.length > 0 ? speedafTrackingResults.length.toString() : undefined,
    },
  ];

  const handleTabChange = (selectedTabIndex: number) => {
    setSelectedTab(selectedTabIndex);
  };

  // First, add the handleExchangeOrders function
  // Handle exchange orders function
  const handleExchangeOrders = async (writeToSheets: boolean = false) => {
    if (selectedExchangeOrders.length === 0) return;

    // Close the dialog
    setShowExchangeFulfillDialog(false);

    // Set prevent refresh flag to avoid auto-refreshes
    setPreventRefresh(true);
    setFulfillLoading(true);
    const results = [];
    const failedOrders = [];
    
    try {
      // Process each order one by one using the direct API approach
      // Only Sendit is supported for exchanges
      // Step 1: Get shop and config directly - only need to do this once
      console.log("Getting shop and Sendit configuration");
      const shopResponse = await api.shopifyShop.findFirst();
      if (!shopResponse) {
        throw new Error("Shop not found");
      }
      
      const configResponse = await api.senditConfig.findFirst();
      
      if (!configResponse) {
        throw new Error("Sendit configuration not found");
      }
      
      // Step 2: Get auth token directly - only need to do this once
      console.log("Getting auth token for order exchange");
      const authResponse = await fetch('https://app.sendit.ma/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          public_key: configResponse.publicKey,
          secret_key: configResponse.secretKey
        })
      });
      
      const authData = await authResponse.json();
      if (!authData.success || !authData.data?.token) {
        throw new Error("Failed to authenticate with Sendit API");
      }
      
      const token = authData.data.token;
      
      // Initialize Google Sheets client for updating tracking numbers
      console.log("Initializing Google Sheets client for tracking updates");
      let sheets;
      let sheetConfig: any = null;
      
      try {
        // Get Google Sheet configuration
        sheetConfig = await api.googleSheetConfig.findFirst({
          filter: { shopId: { equals: shopResponse.id } }
        });
        
        if (!sheetConfig || !sheetConfig.spreadsheetId) {
          console.warn("Google Sheet configuration not found or invalid, skipping sheet updates");
        }
      } catch (configError) {
        console.error("Error loading Google Sheet configuration:", configError);
      }
      
      // Track results
      const results: { orderId: string; orderName: string; newTrackingCode: string }[] = [];
      
      // Process each order sequentially
      for (const orderId of selectedExchangeOrders) {
        try {
          console.log(`Processing exchange for order ${orderId}`);
          
          // Helper function to format address
          const formatAddress = (address: any) => {
            if (!address) return "";
            return [
              address.address1,
              address.address2,
              address.city,
              address.province,
              address.zip,
              address.country
            ]
              .filter(Boolean)
              .join(", ");
          };
          
          // Find the order in our already loaded orders array
          const orderItem = exchangeOrders.find(o => o.id === orderId);
          if (!orderItem) {
            throw new Error(`Order ${orderId} not found in loaded exchange orders`);
          }
          
          // Get full order details
          console.log(`Getting details for exchange order ${orderId}`);
          const apiAny = api as any;
          const cleanOrderId = String(orderId).replace(/\D/g, '');
          
          // If we don't have full order data yet, fetch it
          let orderData = orderItem;
          if (!orderItem.hasLoadedSKUs) {
            const orderExtractResult = await apiAny.extractOrderSKUs({
              orderId: cleanOrderId,
              shopId: shopResponse.id
            });
            
            if (!orderExtractResult?.success || !orderExtractResult?.order) {
              throw new Error(orderExtractResult?.error || "Failed to extract order details");
            }
            
            orderData = orderExtractResult.order;
          }
          
          // Check if we have a modified city for this order and use it instead
          let cityName;
          if (modifiedCities[orderId]) {
            cityName = modifiedCities[orderId];
            console.log(`Using modified city name for exchange order ${orderId}: ${cityName}`);
          } else {
            cityName = orderData.city || 
                      (orderData.shippingAddress ? orderData.shippingAddress.city : null);
          }
          
          if (!cityName) {
            throw new Error(`City name not found for exchange order ${orderId}`);
          }
          
          // Format the address
          const address = orderData.address || 
                         (orderData.shippingAddress ? formatAddress(orderData.shippingAddress) : "");
          
          if (!address) {
            throw new Error(`Address not found for exchange order ${orderId}`);
          }
          
          // Format products - join SKUs into a comma-separated string
          const productsText = orderData.skus ? orderData.skus.join(", ") : 
                             (orderData.orderSkus ? orderData.orderSkus.join(", ") : "No products");
          
          // Customer name
          const customerName = orderData.customerName || 
                             (orderData.shippingAddress ? 
                              `${orderData.shippingAddress.firstName || ""} ${orderData.shippingAddress.lastName || ""}`.trim() : 
                              "Unknown");
          
          // Phone number
          const phoneNumber = orderData.phone || 
                             (orderData.shippingAddress ? orderData.shippingAddress.phone : "");
          
          // Order reference
          const orderReference = orderData.name || orderData.id?.toString() || "";
          
          // Check for reference order with tracking code
          let referenceTrackingCode = "";
          
          // Check if there's a reference order linked to this order
          if (exchangeReferences[orderId] && exchangeReferences[orderId].trackingNumber) {
            referenceTrackingCode = exchangeReferences[orderId].trackingNumber;
            console.log(`Using reference order tracking code for exchange: ${referenceTrackingCode}`);
          } else {
            throw new Error(`No reference order with tracking number found for exchange order ${orderId}. Please use the "Exchange With" button to link a reference order first.`);
          }
          
          // Get district ID for city
          const districtId = await getSenditDistrictId(cityName, token);
          
          // Count the number of products
            const productCount = orderData.skus?.length || 
                                (orderData.orderSkus?.length || 0);
          //Formatted Products Text                      
          const formattedProductsText = `${orderReference} | ${productCount} | ${productsText}`;
          
          // Prepare the request data for exchange - use Sendit in the same way as confirmed orders
          const requestData = {
            pickup_district_id: "52", // Fixed value as specified in docs
            district_id: districtId, // Use dynamic district ID from API
            name: customerName,
            amount: orderData.totalPrice?.toString() || "0",
            address: address,
            phone: phoneNumber,
            comment: "",
            reference: orderReference,
            allow_open: 1, // Default values for bulk fulfillment
            allow_try: 0, // Changed from 1 to 0 as requested
            products_from_stock: 0,
            products: formattedProductsText,
            packaging_id: 1,
            option_exchange: 1, // Set to 1 for exchange
            delivery_exchange_id: referenceTrackingCode // Use reference order tracking code
          };
          
          // Send order creation request directly
          console.log(`Sending exchange request for order ${orderId}`, requestData);
          const SENDIT_API_URL = "https://app.sendit.ma/api/v1/deliveries";
          
          const response = await fetch(SENDIT_API_URL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`,
              "X-CSRF-TOKEN": ""
            },
            body: JSON.stringify(requestData)
          });
          
          const responseData = await response.json();
          console.log(`Exchange response for order ${orderId}:`, responseData);
          
          // Check if the request was successful
          if (responseData.success) {
            // Helper function to extract tracking code from different response formats
            const extractTrackingCode = (data: any): string => {
              if (!data) return "";
              
              // Check direct code field (primary for exchange orders)
              if (data.code) return data.code;
              
              // Check in delivery object
              if (data.delivery?.tracking_number) return data.delivery.tracking_number;
              if (data.delivery?.code) return data.delivery.code;
              
              // Check for tracking_number directly
              if (data.tracking_number) return data.tracking_number;
              
              // Recursive search in data object
              const searchForCode = (obj: any): string => {
                if (!obj || typeof obj !== 'object') return "";
                
                // Check for common tracking code field names
                const possibleFields = ['code', 'tracking_number', 'trackingNumber', 'tracking_code', 'trackingCode'];
                for (const field of possibleFields) {
                  if (obj[field] && typeof obj[field] === 'string') return obj[field];
                }
                
                // Search in nested objects
                for (const key in obj) {
                  if (typeof obj[key] === 'object') {
                    const found = searchForCode(obj[key]);
                    if (found) return found;
                  }
                }
                
                return "";
              };
              
              return searchForCode(data);
            };
            
            // Extract the new tracking number from the response
            const newTrackingCode = extractTrackingCode(responseData.data);
            
            // Log the tracking code extraction for debugging
            console.log(`Extracted tracking code for exchange order ${orderId}: ${newTrackingCode}`);
            
            if (!newTrackingCode) {
              console.warn(`No tracking number found in response for exchange order ${orderId}`);
              console.warn(`Response data:`, responseData.data);
            }
            
            // Add the result to our results array
            results.push({
              orderId,
              orderName: orderItem.name,
              newTrackingCode
            });
            
            // Update tracking number in Google Sheets
            if (newTrackingCode) {
              try {
                // Skip the update to Google Sheets to keep the reference tracking ID in column Y intact
                console.log(`Skipping Google Sheets update for order ${orderId} to preserve reference tracking in column Y`);
                
                // Create a Shopify fulfillment with the new tracking code
                try {
                  console.log(`Creating Shopify fulfillment for exchange order ${cleanOrderId} with tracking code ${newTrackingCode}`);
                  
                  // Use our existing function for fulfillment
                  const fulfillmentResult = await createOrderFulfillment({
                    shopId: shopResponse.id,
                    orderId: cleanOrderId,
                    trackingNumber: newTrackingCode,
                    trackingCompany: "Sendit",
                    notifyCustomer: false
                  });
                  
                  if (fulfillmentResult.success) {
                    console.log(`Successfully created Shopify fulfillment for exchange order ${orderId}`);
                  } else {
                    console.warn(`Failed to create Shopify fulfillment for exchange order ${orderId}: ${
                      'error' in fulfillmentResult ? fulfillmentResult.error : 'Unknown error'
                    }`);
                  }
                } catch (fulfillmentError) {
                  console.error(`Error creating Shopify fulfillment for exchange order ${orderId}:`, fulfillmentError);
                }
              } catch (sheetError) {
                console.error(`Error handling tracking for order ${orderId}:`, sheetError);
              }
            }
            
            // Store updated tracking ID for highlighting
            setUpdatedTrackingIds(prev => ({
        ...prev,
              [orderId]: newTrackingCode
            }));
            
            // Show toast message for successful exchange
            setToastProps({
              content: `Order ${orderItem.name} exchanged. New tracking ID: ${newTrackingCode}`,
              error: false
            });
            setToastActive(true);
            
            console.log(`Successfully created exchange for order ${orderId} with tracking code: ${newTrackingCode}`);
        } else {
            failedOrders.push({
              orderId,
              orderName: orderItem.name,
              error: responseData.message || "Unknown error from Sendit API"
            });
            
            console.error(`Failed to create exchange for order ${orderId}: ${responseData.message || "Unknown error"}`, 
              { apiResponse: responseData });
          }
        } catch (orderError) {
          console.error(`Error exchanging order ${orderId}:`, orderError);
          
          // Find the order item to get the name
          const orderItem = exchangeOrders.find(o => o.id === orderId);
          const orderName = orderItem ? orderItem.name : `Order ${orderId}`;
          
          failedOrders.push({
            orderId,
            orderName,
            error: orderError instanceof Error ? orderError.message : String(orderError)
          });
        }
        
        // Add a short delay between orders to prevent API rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Show results to the user
      if (results.length > 0) {
        const successMessage = `Successfully created exchanges for ${results.length} orders with Sendit.`;
        console.log(successMessage, { successfulOrders: results });
      }
      
      if (failedOrders.length > 0) {
        const errorMessages = failedOrders.map(order => 
          `${order.orderName}: ${order.error}`
        );
        const errorMessage = `Failed to create exchanges for ${failedOrders.length} orders: ${errorMessages.join(', ')}`;
        console.error("Failed exchange orders:", failedOrders);
        
      setToastProps({
          content: errorMessage,
          error: true
      });
      setToastActive(true);
      }
      
      // If we got updated tracking numbers, add them to the locally cached orders
      if (results.length > 0 && exchangeOrders.length > 0) {
        setExchangeOrders(prev => 
          prev.map(order => {
            // Find if this order was updated
            const updatedResult = results.find(r => r.orderId === order.id);
            if (updatedResult) {
              // Update the tracking number in our local cache
              return {
                ...order,
                trackingNumber: updatedResult.newTrackingCode
              };
            }
            return order;
          })
        );
      }
      
      // Update writeOrder and autoWrite fields for successfully processed exchange orders
      if (results.length > 0) {
        console.log(`Updating writeOrder and autoWrite fields for ${results.length} successfully processed exchange orders`);

        const updatePromises = results.map(async (result) => {
          try {
            const cleanOrderId = String(result.orderId).replace(/\D/g, '');

            // Set writeOrder=true for all processed exchange orders
            // Set autoWrite=true only if user chose to write to sheets automatically
            const updateData = {
              writeOrder: true,
              autoWrite: writeToSheets
            };

            console.log(`Updating exchange order ${cleanOrderId} with:`, updateData);

            await api.shopifyOrder.update(cleanOrderId, updateData);

            console.log(`Successfully updated fields for exchange order ${cleanOrderId}`);
          } catch (updateError) {
            console.error(`Failed to update fields for exchange order ${result.orderId}:`, updateError);
            // Don't fail the whole process if field update fails
          }
        });

        // Wait for all field updates to complete
        await Promise.all(updatePromises);
        console.log(`Completed field updates for ${results.length} exchange orders`);

        // If user chose to write to sheets automatically, do it now
        if (writeToSheets && results.length > 0) {
          console.log(`User chose to write exchange orders to sheets automatically. Writing ${results.length} orders to Google Sheets now.`);

          try {
            // Collect the successfully processed exchange order IDs
            const processedOrderIds = results.map(result => result.orderId);
            console.log(`Processed exchange order IDs to write to sheets:`, processedOrderIds);

            // Wait for fulfillment webhooks to process and update tracking numbers
            console.log("Waiting 2.5 seconds for fulfillment webhooks to process and update tracking numbers...");

            // Show a temporary message to the user about the wait
            setToastProps({
              content: `Exchange orders processed successfully! Waiting for tracking numbers to update before writing to sheets...`,
              error: false
            });
            setToastActive(true);

            await new Promise(resolve => setTimeout(resolve, 2500));

            // Get the order data for these specific exchange orders (fresh data after fulfillment)
            const ordersToWrite = [];

            for (const orderId of processedOrderIds) {
              try {
                const cleanOrderId = String(orderId).replace(/\D/g, '');

                // Always fetch fresh order data after fulfillment to get updated tracking numbers
                console.log(`Fetching fresh data for exchange order ${cleanOrderId} after processing...`);
                const orderExtractResult = await (api as any).extractOrderSKUs({
                  orderId: cleanOrderId,
                  shopId: shop?.id || ''
                });

                if (!orderExtractResult?.success || !orderExtractResult?.order) {
                  console.warn(`Failed to extract fresh data for exchange order ${orderId}:`, orderExtractResult?.error);
                  continue;
                }

                const orderData = orderExtractResult.order;
                console.log(`Fresh exchange order data for ${orderData.name}:`, {
                  fulfillmentStatus: orderData.fulfillmentStatus,
                  trackingNumber: orderData.trackingNumber,
                  hasTracking: !!orderData.trackingNumber
                });

                // For exchange orders, we need to get the reference order's tracking number
                let referenceTrackingNumber = '';

                // Find the exchange order in our loaded exchange orders to get reference order info
                const exchangeOrderItem = exchangeOrders.find(o => o.id === orderId);
                if (exchangeOrderItem && exchangeOrderItem.referenceOrderId) {
                  try {
                    console.log(`Getting reference order tracking for exchange order ${orderId}, reference: ${exchangeOrderItem.referenceOrderId}`);

                    // Extract reference order data to get its tracking number
                    const refOrderExtractResult = await (api as any).extractOrderSKUs({
                      orderId: String(exchangeOrderItem.referenceOrderId).replace(/\D/g, ''),
                      shopId: shop?.id || ''
                    });

                    if (refOrderExtractResult?.success && refOrderExtractResult?.order) {
                      referenceTrackingNumber = refOrderExtractResult.order.trackingNumber || '';
                      console.log(`Reference order tracking number: ${referenceTrackingNumber}`);
                    } else {
                      console.warn(`Failed to get reference order tracking for ${exchangeOrderItem.referenceOrderId}`);
                    }
                  } catch (refError) {
                    console.error(`Error getting reference order tracking:`, refError);
                  }
                }

                // Transform order data for batch write (including reference tracking)
                const transformedOrderData = {
                  id: orderData.id,
                  name: orderData.name,
                  customerName: orderData.customerName,
                  phone: orderData.phone,
                  originalCity: orderData.originalCity, // Include Original City from noteAttributes
                  address: orderData.address,
                  city: formatCityForSheets(modifiedCities[orderData.id] || orderData.city || orderData.rawCity || '', selectedCourier), // Use modified city first, then recognized city, then raw city, standardized and formatted for sheets
                  rawCity: orderData.rawCity,
                  lineItems: orderData.lineItems?.map((item: any) => ({
                    name: item.name,
                    quantity: item.quantity,
                    sku: item.sku,
                    price: item.price
                  })) || [],
                  totalPrice: orderData.totalPrice,
                  displayFulfillmentStatus: orderData.fulfillmentStatus || "FULFILLED", // Use fresh status or fallback to FULFILLED
                  createdAt: orderData.createdAt,
                  tags: orderData.tags || [],
                  trackingNumber: orderData.trackingNumber || '', // Fresh tracking number from fulfillment
                  referenceTrackingNumber: referenceTrackingNumber, // Reference order tracking for column Y
                  isExchangeOrder: true, // Flag to identify exchange orders for checkbox in column AA
                  isCancelled: orderData.isCancelled || false,
                  isDeleted: orderData.isDeleted || false,
                  isFulfillmentCancelled: orderData.isFulfillmentCancelled || false
                };

                ordersToWrite.push(transformedOrderData);
                console.log(`Added exchange order ${orderData.name} to batch write queue with reference tracking: ${referenceTrackingNumber}`);

              } catch (orderError) {
                console.error(`Error processing exchange order ${orderId} for batch write:`, orderError);
              }
            }

            // Write all exchange orders to Google Sheets in one batch
            if (ordersToWrite.length > 0) {
              console.log(`Writing ${ordersToWrite.length} exchange orders to Google Sheets via batch write`);

              const batchWriteResult = await (api as any).writeBatchOrdersToSheets({
                ordersData: JSON.stringify(ordersToWrite),
                shopId: shop?.id || ''
              });

              if (batchWriteResult?.success) {
                console.log(`Successfully wrote ${ordersToWrite.length} exchange orders to Google Sheets automatically`, batchWriteResult);

                setToastProps({
                  content: `Successfully processed ${results.length} exchange orders and wrote them to Google Sheets automatically!`,
                  error: false
                });
                setToastActive(true);
              } else {
                console.error("Failed to write exchange orders to Google Sheets:", batchWriteResult?.error);

                setToastProps({
                  content: `Exchange orders processed successfully, but failed to write to Google Sheets: ${batchWriteResult?.error}`,
                  error: true
                });
                setToastActive(true);
              }
            } else {
              console.warn("No exchange orders could be processed for automatic writing to sheets");
            }

          } catch (autoWriteError) {
            console.error("Error during automatic write of exchange orders to sheets:", autoWriteError);

            setToastProps({
              content: `Exchange orders processed successfully, but automatic write to sheets failed: ${autoWriteError instanceof Error ? autoWriteError.message : String(autoWriteError)}`,
              error: true
            });
            setToastActive(true);
          }
        }
      }

      // Clear selections after processing
      setSelectedExchangeOrders([]);
    } catch (error) {
      console.error("Error processing exchanges:", error);
      setToastProps({
        content: `Error processing exchanges: ${error instanceof Error ? error.message : String(error)}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setFulfillLoading(false);
      
      // Refresh exchange orders once after all processing is complete, with a 2 second delay
      // This prevents multiple refreshes and ensures UI is updated after processing
      console.log("All exchange orders processed, scheduling refresh in 2 seconds");
      setTimeout(() => {
        console.log("Refreshing exchange orders list");
        setPreventRefresh(false); // Allow refreshes again
        fetchExchangeOrders();
        
        // Schedule another refresh after 10 seconds to make sure Shopify has updated the order status
        setTimeout(() => {
          console.log("Performing follow-up refresh of exchange orders");
          fetchExchangeOrders();
        }, 10000);
      }, 2000);
    }
  };

  // Function to show the fulfill confirmation dialog
  const showFulfillConfirmationDialog = () => {
    if (selectedConfirmedOrders.length === 0) return;
    setShowFulfillDialog(true);
  };

  // Function to show the exchange fulfill confirmation dialog
  const showExchangeFulfillConfirmationDialog = () => {
    if (selectedExchangeOrders.length === 0) return;
    setShowExchangeFulfillDialog(true);
  };

  // Function to handle removing order entries from Google Sheets
  const handleRemoveOrderFromSheets = async () => {
    if (!removeOrderName.trim()) {
      setToastProps({
        content: "Please enter one or more order names to remove",
        error: true
      });
      setToastActive(true);
      return;
    }

    if (!shop?.id) {
      setToastProps({
        content: "Shop information not available",
        error: true
      });
      setToastActive(true);
      return;
    }

    setRemoveOrderLoading(true);

    try {
      console.log(`Removing order ${removeOrderName} from Google Sheets...`);

      const result = await (api as any).removeOrderFromSheets({
        orderName: removeOrderName.trim(),
        shopId: shop.id
      });

      if (result?.success) {
        if (result.foundEntries) {
          setToastProps({
            content: result.message || `Successfully removed entries for order ${removeOrderName}`,
            error: false
          });
          setToastActive(true);

          // Clear the input field on success
          setRemoveOrderName('');

          console.log(`Successfully removed order ${removeOrderName} from sheets:`, result);
        } else {
          setToastProps({
            content: result.message || `No entries found for order ${removeOrderName}`,
            error: false
          });
          setToastActive(true);

          console.log(`No entries found for order ${removeOrderName}`);
        }
      } else {
        throw new Error(result?.error || "Failed to remove order from sheets");
      }

    } catch (error) {
      console.error("Error removing order from sheets:", error);

      setToastProps({
        content: `Failed to remove order ${removeOrderName}: ${error instanceof Error ? error.message : String(error)}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setRemoveOrderLoading(false);
    }
  };

  // Function to clear Speedaf tracking results
  const handleClearSpeedafResults = () => {
    setSpeedafTrackingResults([]);
    setSpeedafTrackingError(null);
  };

  // Function to handle writing Speedaf data to sheets
  const handleWriteSpeedafDataToSheets = async () => {
    if (!shop?.id) {
      setSpeedafTrackingError("Shop information not available");
      return;
    }

    if (!speedafTrackingResults || speedafTrackingResults.length === 0) {
      setToastProps({
        content: "No Speedaf tracking data available to write to sheets",
        error: true
      });
      setToastActive(true);
      return;
    }

    setSpeedafWritingToSheets(true);
    setSpeedafTrackingError(null);

    try {
      // Prepare tracking data for the sheets
      const trackingData = speedafTrackingResults.map(order => {
        // Extract the latest status from tracking data
        let latestStatus = '';

        if (order.trackingStatus && order.trackingStatus.tracks && order.trackingStatus.tracks.length > 0) {
          // Get the most recent track (first one, as they're usually sorted by time)
          const latestTrack = order.trackingStatus.tracks[0];
          latestStatus = latestTrack.action || latestTrack.actionDescription || '';
        }

        return {
          trackingNumber: order.trackingNumber,
          latestStatus: latestStatus
        };
      });

      console.log(`Writing ${trackingData.length} Speedaf tracking records to Google Sheets...`);

      const result = await (api as any).writeSpeedafDataToSheets({
        shopId: shop.id,
        trackingData: trackingData
      });

      if (result?.success) {
        setToastProps({
          content: result.message || `Successfully wrote Speedaf data to Google Sheets`,
          error: false
        });
        setToastActive(true);
      } else {
        throw new Error(result?.error || "Failed to write Speedaf data to sheets");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error writing Speedaf data to sheets:", errorMessage);
      setSpeedafTrackingError(errorMessage);

      setToastProps({
        content: `Failed to write Speedaf data to sheets: ${errorMessage}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setSpeedafWritingToSheets(false);
    }
  };

  // Function to handle Speedaf tracking
  const handleSpeedafTracking = async () => {
    if (!shop?.id) {
      setSpeedafTrackingError("Shop information not available");
      return;
    }

    setSpeedafTracking(true);
    setSpeedafTrackingError(null);
    setSpeedafTrackingResults([]);

    try {
      let startingOrderName: string;
      const orderCount = 10; // Fixed to 10 orders as per API limit

      if (speedafTrackingMode === '10') {
        // Get the latest order name to calculate the starting point for last 10 orders
        const latestOrderResult = await api.shopifyOrder.findFirst({
          select: { name: true },
          sort: [{ createdAt: "Descending" }]
        });

        if (!latestOrderResult?.name) {
          throw new Error("Could not find latest order to start tracking from");
        }

        // Extract the latest order number and calculate starting point for last 10 orders
        const latestOrderNumber = parseInt(latestOrderResult.name.replace(/\D/g, ''));
        const startingOrderNumber = Math.max(1, latestOrderNumber - 9); // Ensure we don't go below order #1
        startingOrderName = `#${startingOrderNumber}`;

        console.log(`Latest order: ${latestOrderResult.name} (${latestOrderNumber})`);
        console.log(`Tracking last 10 orders from: ${startingOrderName} to #${latestOrderNumber}`);
      } else {
        // Custom order name mode
        if (!speedafCustomOrderName.trim()) {
          throw new Error("Please enter an order name to start tracking from");
        }

        // Clean and format the order name
        let cleanOrderName = speedafCustomOrderName.trim();

        // Add # prefix if not present
        if (!cleanOrderName.startsWith('#')) {
          cleanOrderName = `#${cleanOrderName}`;
        }

        startingOrderName = cleanOrderName;
        console.log(`Tracking 10 orders starting from custom order: ${startingOrderName}`);
      }

      const result = await (api as any).trackSpeedafOrders({
        latestOrderName: startingOrderName,
        orderCount: orderCount
      });

      if (result?.success) {
        setSpeedafTrackingResults(result.orders || []);

        if (result.orders && result.orders.length > 0) {
          setToastProps({
            content: `Successfully tracked ${result.orders.length} Speedaf orders out of ${result.totalOrders} checked orders`,
            error: false
          });
        } else {
          // Calculate the ending order number for better user feedback
          const startingNumber = parseInt(startingOrderName.replace(/\D/g, ''));
          const endingNumber = startingNumber + orderCount - 1;

          setToastProps({
            content: `No Speedaf orders found in the range ${startingOrderName} - #${endingNumber} (${result.totalOrders} orders checked)`,
            error: false
          });
        }
        setToastActive(true);
      } else {
        throw new Error(result?.error || "Failed to track Speedaf orders");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error tracking Speedaf orders:", errorMessage);
      setSpeedafTrackingError(errorMessage);

      setToastProps({
        content: `Failed to track Speedaf orders: ${errorMessage}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setSpeedafTracking(false);
    }
  };



  // Function to handle the actual fulfillment after user confirms
  const handleFulfillOrders = async (writeToSheets: boolean = false) => {
    if (selectedConfirmedOrders.length === 0) return;

    // Close the dialog
    setShowFulfillDialog(false);

    // Set prevent refresh flag to avoid auto-refreshes
    setPreventRefresh(true);
    setFulfillLoading(true);
    const results = [];
    const failedOrders = [];
    
    try {
      // Process each order one by one using the direct API approach
      if (selectedCourier === 'sendit') {
        // Step 1: Get shop and config directly - only need to do this once
        console.log("Getting shop and Sendit configuration");
        const shopResponse = await api.shopifyShop.findFirst();
        if (!shopResponse) {
          throw new Error("Shop not found");
        }
        
        const configResponse = await api.senditConfig.findFirst();
        
        if (!configResponse) {
          throw new Error("Sendit configuration not found");
        }
        
        // Step 2: Get auth token directly - only need to do this once
        console.log("Getting auth token for order fulfillment");
        const authResponse = await fetch('https://app.sendit.ma/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            public_key: configResponse.publicKey,
            secret_key: configResponse.secretKey
          })
        });
        
        const authData = await authResponse.json();
        if (!authData.success || !authData.data?.token) {
          throw new Error("Failed to authenticate with Sendit API");
        }
        
        const token = authData.data.token;
        
        // Process each order sequentially
        for (const orderId of selectedConfirmedOrders) {
          try {
            console.log(`Processing order ${orderId}`);
            
            // Helper function to format address
            const formatAddress = (address: any) => {
              if (!address) return "";
              return [
                address.address1,
                address.address2,
                address.city,
                address.province,
                address.zip,
                address.country
              ]
                .filter(Boolean)
                .join(", ");
            };
            
            // Find the order in our already loaded orders array
            const orderItem = orders.find(o => o.id === orderId);
            if (!orderItem) {
              throw new Error(`Order ${orderId} not found in loaded orders`);
            }
            
            // Get full order details
            console.log(`Getting details for order ${orderId}`);
            const apiAny = api as any;
            const cleanOrderId = String(orderId).replace(/\D/g, '');
            
            // If we don't have full order data yet, fetch it
            let orderData = orderItem;
            if (!orderItem.hasLoadedSKUs) {
              const orderExtractResult = await apiAny.extractOrderSKUs({
                orderId: cleanOrderId,
                shopId: shopResponse.id
              });
              
              if (!orderExtractResult?.success || !orderExtractResult?.order) {
                throw new Error(orderExtractResult?.error || "Failed to extract order details");
              }
              
              orderData = orderExtractResult.order;
            }
            
            // Check if we have a modified city for this order and use it instead
            let cityName;
            if (modifiedCities[orderId]) {
              cityName = modifiedCities[orderId];
              console.log(`Using modified city name for order ${orderId}: ${cityName}`);
            } else {
              cityName = orderData.city || 
                        (orderData.shippingAddress ? orderData.shippingAddress.city : null);
            }
            
            if (!cityName) {
              throw new Error(`City name not found for order ${orderId}`);
            }
            
            // Log to confirm city name is being used
            console.log(`City name for Speedaf order ${orderId}: ${cityName}`);
            
            // Format the address
            const address = orderData.address || 
                           (orderData.shippingAddress ? formatAddress(orderData.shippingAddress) : "");
            
            if (!address) {
              throw new Error(`Address not found for order ${orderId}`);
            }
            
            // Format products - join SKUs into a comma-separated string
            const productsText = orderData.skus ? orderData.skus.join(", ") : 
                               (orderData.orderSkus ? orderData.orderSkus.join(", ") : "No products");
            
            // Customer name
            const customerName = orderData.customerName || 
                               (orderData.shippingAddress ? 
                                `${orderData.shippingAddress.firstName || ""} ${orderData.shippingAddress.lastName || ""}`.trim() : 
                                "Unknown");
            
            // Phone number
            const phoneNumber = orderData.phone || 
                               (orderData.shippingAddress ? orderData.shippingAddress.phone : "");
            
            // Order reference
            const orderReference = orderData.name || orderData.id?.toString() || "";
            
            // Get district ID for the city
            console.log(`Getting district ID for city: ${cityName}`);
            const districtId = await getSenditDistrictId(cityName, token);
            
            // Count the number of products
            const productCount = orderData.skus?.length || 
                                (orderData.orderSkus?.length || 0);
          //Formatted Products Text                      
          const formattedProductsText = `${orderReference} | ${productCount} | ${productsText}`;
          
            // Prepare the request data
            const requestData = {
              pickup_district_id: "52", // Keep fixed value for pickup district
              district_id: districtId, // Now using dynamic district ID from API
              name: customerName,
              amount: orderData.totalPrice?.toString() || "0",
              address: address,
              phone: phoneNumber,
              comment: "",
              reference: orderReference,
              allow_open: 1, // Default values for bulk fulfillment
              allow_try: 0, // Changed from 1 to 0 as requested
              products_from_stock: 0,
              products: formattedProductsText,
              packaging_id: 1,
              option_exchange: 0,
              delivery_exchange_id: ""
            };
            
            // Send order creation request directly
            console.log(`Sending fulfillment request for order ${orderId}`, requestData);
            const SENDIT_API_URL = "https://app.sendit.ma/api/v1/deliveries";
            
            const response = await fetch(SENDIT_API_URL, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-CSRF-TOKEN": ""
              },
              body: JSON.stringify(requestData)
            });
            
            const responseData = await response.json();
            console.log(`Fulfillment response for order ${orderId}:`, responseData);
            
            if (responseData.success && responseData.data) {
              // Extract tracking code from the response
              const trackingCode = responseData.data?.code;
              
              if (!trackingCode) {
                throw new Error(`Tracking code not found in response for order ${orderId}`);
              }
              
              // Now create a Shopify fulfillment with the tracking code using our new function
              try {
                console.log(`Creating Shopify fulfillment for order ${cleanOrderId} with tracking code ${trackingCode}`);
                
                // Use our new function for fulfillment
                const fulfillmentResult = await createOrderFulfillment({
                  shopId: shopResponse.id,
                  orderId: cleanOrderId,
                  trackingNumber: trackingCode,
                  trackingCompany: "Sendit",
                  notifyCustomer: false
                });
                
                // Check for success first
                if (!fulfillmentResult.success) {
                  // Check if this is an "already fulfilled" error, which we can treat as success
                  const errorMsg = 'error' in fulfillmentResult ? fulfillmentResult.error : 'Fulfillment creation failed';
                  
                  // Common errors that indicate the order is actually fulfilled
                  const falseErrorPatterns = [
                    /already been fulfilled/i,
                    /has already been marked as fulfilled/i,
                    /fulfillment service is not found/i,
                    /no fulfillment for given order id exists/i,
                    /no id was returned/i
                  ];
                  
                  // Check if this is a false error (already fulfilled)
                  const isFalseError = falseErrorPatterns.some(pattern => pattern.test(errorMsg));
                  
                  if (isFalseError) {
                    // This is a false error - the order is already fulfilled or similar
                    console.log(`Detected false error for order ${cleanOrderId}: ${errorMsg}`);
                    
                    // Add to results as success
                    results.push({
                      orderId,
                      orderName: orderItem.name,
                      trackingCode,
                      success: true,
                      note: "Order may have been fulfilled already"
                    });
                    
                    // Show toast message for successful fulfillment
                    setToastProps({
                      content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                      error: false
                    });
                    setToastActive(true);
                    
                    console.log(`Successfully fulfilled order ${orderId} with tracking code: ${trackingCode} (despite error: ${errorMsg})`);
                  } else {
                    // This is a real error
                    throw new Error(errorMsg);
                  }
                } else {
                  // Normal success case
                  const fulfillmentId = (fulfillmentResult as FulfillmentSuccessResult).fulfillmentId;
                  
                  // Add success to results
                  results.push({
                    orderId,
                    orderName: orderItem.name,
                    trackingCode,
                    fulfillmentId,
                    success: true
                  });
                  
                  // Show toast message for successful fulfillment
                  setToastProps({
                    content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                    error: false
                  });
                  setToastActive(true);
                  
                  console.log(`Successfully fulfilled order ${orderId} with tracking code: ${trackingCode}`);
                }
              } catch (fulfillmentError) {
                console.error(`Error creating Shopify fulfillment for order ${cleanOrderId}:`, fulfillmentError);
                
                // Check if we should treat this as a false error
                const errorMsg = fulfillmentError instanceof Error ? fulfillmentError.message : String(fulfillmentError);
                const falseErrorPatterns = [
                  /already been fulfilled/i,
                  /has already been marked as fulfilled/i,
                  /fulfillment service is not found/i,
                  /no fulfillment for given order id exists/i,
                  /no id was returned/i,
                  /fulfillment was created but no id was returned/i
                ];
                
                const isFalseError = falseErrorPatterns.some(pattern => pattern.test(errorMsg));
                
                if (isFalseError) {
                  // Treat this as success since the order is already fulfilled or similar
                  console.log(`Treating error as success for order ${cleanOrderId}: ${errorMsg}`);
                  
                  // Add to results as success
                  results.push({
                    orderId,
                    orderName: orderItem.name,
                    trackingCode,
                    success: true,
                    note: "Order may have been fulfilled already"
                  });
                  
                  // Show toast message for successful fulfillment
                  setToastProps({
                    content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                    error: false
                  });
                  setToastActive(true);
                } else {
                  // It's a genuine error
                  throw new Error(errorMsg);
                }
              }
            } else {
              failedOrders.push({
                orderId,
                orderName: orderItem.name,
                error: responseData.message || "Unknown error from Sendit API"
              });
              
              console.error(`Failed to fulfill order ${orderId}: ${responseData.message || "Unknown error"}`, 
                { apiResponse: responseData });
            }
          } catch (orderError) {
            console.error(`Error fulfilling order ${orderId}:`, orderError);
            
            // Find the order item to get the name
            const orderItem = orders.find(o => o.id === orderId);
            const orderName = orderItem ? orderItem.name : `Order ${orderId}`;
            
            failedOrders.push({
              orderId,
              orderName,
              error: orderError instanceof Error ? orderError.message : String(orderError)
            });
          }
          
          // Add a short delay between orders to prevent API rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Show results to the user
        if (results.length > 0) {
          const successMessage = `Successfully fulfilled ${results.length} orders with Sendit.`;
          console.log(successMessage, { successfulOrders: results });
        }
        
        if (failedOrders.length > 0) {
          const errorMessages = failedOrders.map(order => 
            `${order.orderName}: ${order.error}`
          );
          const errorMessage = `Failed to fulfill ${failedOrders.length} orders: ${errorMessages.join(', ')}`;
          console.error("Failed orders:", failedOrders);
          
          setToastProps({
            content: errorMessage,
            error: true
          });
          setToastActive(true);
        }
        console.log(`Successfully processed ${results.length} orders with Sendit`);
        // After fulfillment, clear selection
        setSelectedConfirmedOrders([]);
      } else if (selectedCourier === 'speedaf') {
        // Step 1: Get shop for Speedaf configuration
        console.log("Getting shop for Speedaf configuration");
        const shopResponse = await api.shopifyShop.findFirst();
        if (!shopResponse) {
          throw new Error("Shop not found");
        }
        
        const shopId = String(shopResponse.id).replace(/\D/g, '');
        
        // Get all Speedaf configs (following pattern from processSpeedafAPI.ts)
        console.log("Getting all Speedaf configs");
        const allConfigs = await api.speedafConfig.findMany();
        
        // Find matching config manually
        const speedafConfig = allConfigs.find((config: any) => 
          String(config.shopId) === String(shopResponse.id) || 
          (config.shop && String(config.shop.id) === String(shopResponse.id))
        );
        
        if (!speedafConfig) {
          throw new Error(`Speedaf configuration for shop ${shopResponse.id} not found`);
        }
        
        console.log("Found Speedaf config:", speedafConfig.id);
      
        // Process each order sequentially
        for (const orderId of selectedConfirmedOrders) {
          try {
            console.log(`Processing order ${orderId} with Speedaf`);
            
            // Helper function to format address (same as in Sendit flow)
            const formatAddress = (address: any) => {
              if (!address) return "";
              return [
                address.address1,
                address.address2,
                address.city,
                address.province,
                address.zip,
                address.country
              ]
                .filter(Boolean)
                .join(", ");
            };
            
            // Find the order in our already loaded orders array
            const orderItem = orders.find(o => o.id === orderId);
            if (!orderItem) {
              throw new Error(`Order ${orderId} not found in loaded orders`);
            }
            
            // Get full order details
            console.log(`Getting details for order ${orderId}`);
            const apiAny = api as any;
            const cleanOrderId = String(orderId).replace(/\D/g, '');
            
            // If we don't have full order data yet, fetch it
            let orderData = orderItem;
            if (!orderItem.hasLoadedSKUs) {
              const orderExtractResult = await apiAny.extractOrderSKUs({
                orderId: cleanOrderId,
                shopId: shopResponse.id
              });
              
              if (!orderExtractResult?.success || !orderExtractResult?.order) {
                throw new Error(orderExtractResult?.error || "Failed to extract order details");
              }
              
              orderData = orderExtractResult.order;
            }
            
            // Check if we have a modified city for this order and use it instead
            let cityName;
            if (modifiedCities[orderId]) {
              cityName = modifiedCities[orderId];
              console.log(`Using modified city name for order ${orderId}: ${cityName}`);
            } else {
              cityName = orderData.city || 
                       (orderData.shippingAddress ? orderData.shippingAddress.city : null);
            }
            
            if (!cityName) {
              throw new Error(`City name not found for order ${orderId}`);
            }
            
            // Log to confirm city name is being used
            console.log(`City name for Speedaf order ${orderId}: ${cityName}`);
            
            // Format the address
            const address = orderData.address || 
                          (orderData.shippingAddress ? formatAddress(orderData.shippingAddress) : "");
      
            if (!address) {
              throw new Error(`Address not found for order ${orderId}`);
            }
            
            // Format products - join SKUs into a comma-separated string
            const productsText = orderData.skus ? orderData.skus.join(", ") : 
                               (orderData.orderSkus ? orderData.orderSkus.join(", ") : "No products");
            
            // Customer name
            const customerName = orderData.customerName || 
                               (orderData.shippingAddress ? 
                                `${orderData.shippingAddress.firstName || ""} ${orderData.shippingAddress.lastName || ""}`.trim() : 
                                "Unknown");
            
            // Phone number
            const phoneNumber = orderData.phone || 
                               (orderData.shippingAddress ? orderData.shippingAddress.phone : "");
      
            // Order reference
            const orderReference = orderData.name || orderData.id?.toString() || "";
            
            // Parse city entry to get area, city and region
            const parsedCity = cityName ? parseSpeedafCityEntry(cityName) : { area: "", city: "", areaCode: "", cityCode: "" };
            
            // Prepare request data with explicit city name handling
      const requestData = {
              acceptAddress: address,
              acceptCityCode: parsedCity.cityCode, // Use the city code component
              acceptCityName: parsedCity.city, // Use the city component
        acceptCountryCode: "MA",
        acceptCountryName: "Morocco",
              acceptDistrictCode: parsedCity.areaCode, // Use the area code component
              acceptDistrictName: parsedCity.area, // Use the area component
              acceptMobile: phoneNumber,
              acceptName: customerName,
              acceptStreetName: "",
              codFee: orderData.totalPrice - 30|| 0,
        currencyType: "MAD",
              customOrderNo: orderReference,
              customerCode: speedafConfig.customerCode,
        changeLable: 0,
        deliveryType: "DE01",
        goodsQTY: 1,
              goodsWeight: 1, // 1 kg default
        insurePrice: 0,
        isAllowOpen: 1,
        itemList: [
          {
            battery: 0,
            blInsure: 0,
            currencyType: "MAD",
                  goodsName: productsText.substring(0, 100), // Limit to 100 chars
                  goodsNameDialect: "",
            goodsQTY: 1,
            goodsType: "IT01",
                  goodsValue: orderData.totalPrice || 0,
                  sku: productsText.substring(0, 50) // Limit to 50 chars
          }
        ],
        parcelCurrencyType: "MAD",
              //parcelHigh: 10,
        parcelLength: 30,
        parcelType: "PT01",
              //parcelVolume: 0.9,
              //parcelWeight: 500, // 0.5 kg default
              //parcelWidth: 20,
              parcelValue: orderData.totalPrice || 0,
              payMethod: "PA03",
              pickupCity: "Luxus", // Updated sender city
              pickupCountry: "Morocco",
              pickupDetailAddress: "Luxus", // Updated sender address
              pickupName: "Bambe.ma", // Updated sender name
              pickupPhone: "0664754433",
        pickupProvince: "Tanger-Tetouan-Al Hoceima",
        pickupType: 0,
        piece: 1,
        platformSource: "Bambe",
              //prePickUpTime: new Date().toISOString().split('T')[0] + " 10:00:00",
              remark: `Order ${orderReference}`,
              sendAddress: "Luxus", // Updated sender address
        sendCityCode: "MAC00036",      
        sendCityName: "Luxus", // Updated sender city
              sendCompanyName: "Bambe.ma", // Updated company name
        sendCountryCode: "MA",
        sendCountryName: "Morocco",
        sendDistrictCode: "MAA00369",
        sendDistrictName: "Luxus",
              //sendMail: "sender@example.ma",
              sendMobile: "0664754433", // Uncommented and updated
              sendName: "Bambe.ma", // Updated sender name
              sendPhone: "0664754433",
              //sendPostCode: "90000",
        sendProvinceCode: "MAR00012",
        sendProvinceName: "Tanger-Tetouan-Al Hoceima",
        shipType: "ST01",
              shippingFee: 30,
        transportType: "TT01",
              //warehouseCode: "TNG01"
      };
      
            // Log the final request data city fields for debugging
            console.log(`Speedaf API request city fields for order ${orderId}:`, {
              acceptCityName: requestData.acceptCityName,
              acceptDistrictName: requestData.acceptDistrictName
            });
            
            // Call the Speedaf API
            console.log(`Calling Speedaf API for order ${orderId}`);
            const speedafResult = await api.processSpeedafAPI({
              shopId: shopId,
              requestData: requestData,
              testMode: false // This is a real order
            });
            
            console.log(`Speedaf API result for order ${orderId}:`, speedafResult);
            
            // Fix the billCode extraction - check all possible paths in the response
            let trackingCode = null;
            
            if (speedafResult.success) {
              // Log more details about the response to help debug
              console.log("Speedaf success response structure:", {
                hasTrackingCode: !!speedafResult.trackingCode,
                hasDecryptedResponse: !!speedafResult.decryptedResponse,
                decryptedResponseType: speedafResult.decryptedResponse ? typeof speedafResult.decryptedResponse : 'undefined',
                decryptedResponseKeys: speedafResult.decryptedResponse ? Object.keys(speedafResult.decryptedResponse) : []
              });
              
              // Try all possible paths to find the tracking code
              if (speedafResult.trackingCode) {
                trackingCode = speedafResult.trackingCode;
                console.log(`Found trackingCode directly: ${trackingCode}`);
              } else if (speedafResult.decryptedResponse) {
                if (speedafResult.decryptedResponse.waybillCode) {
                  trackingCode = speedafResult.decryptedResponse.waybillCode;
                  console.log(`Found waybillCode in decryptedResponse: ${trackingCode}`);
                } else if (speedafResult.decryptedResponse.billCode) {
                  trackingCode = speedafResult.decryptedResponse.billCode;
                  console.log(`Found billCode in decryptedResponse: ${trackingCode}`);
                } else if (speedafResult.decryptedResponse.data && speedafResult.decryptedResponse.data.waybillCode) {
                  trackingCode = speedafResult.decryptedResponse.data.waybillCode;
                  console.log(`Found waybillCode in decryptedResponse.data: ${trackingCode}`);
                } else if (speedafResult.decryptedResponse.data && speedafResult.decryptedResponse.data.billCode) {
                  trackingCode = speedafResult.decryptedResponse.data.billCode;
                  console.log(`Found billCode in decryptedResponse.data: ${trackingCode}`);
                } else {
                  // If we can't find it in the known locations, search the entire object recursively
                  console.log("Searching entire response object for waybillCode or billCode");
                  const findCodeInObject = (obj: any): string | null => {
                    if (!obj || typeof obj !== 'object') return null;
                    
                    if (obj.waybillCode) return obj.waybillCode;
                    if (obj.billCode) return obj.billCode;
                    
                    for (const key in obj) {
                      if (typeof obj[key] === 'object') {
                        const found = findCodeInObject(obj[key]);
                        if (found) return found;
                      }
                    }
                    
                    return null;
                  };
                  
                  trackingCode = findCodeInObject(speedafResult.decryptedResponse);
                  if (trackingCode) {
                    console.log(`Found tracking code by searching object recursively: ${trackingCode}`);
                  }
                }
              }
              
              if (!trackingCode && speedafResult.rawResponse) {
                // Last resort - try to parse the raw response
                console.log("Checking rawResponse for tracking code");
                
                const findCodeInObject = (obj: any): string | null => {
                  if (!obj || typeof obj !== 'object') return null;
        
                  if (obj.waybillCode) return obj.waybillCode;
                  if (obj.billCode) return obj.billCode;
                  
                  for (const key in obj) {
                    if (typeof obj[key] === 'object') {
                      const found = findCodeInObject(obj[key]);
                      if (found) return found;
                    }
                  }
                  
                  return null;
                };
                
                trackingCode = findCodeInObject(speedafResult.rawResponse);
                if (trackingCode) {
                  console.log(`Found tracking code in rawResponse: ${trackingCode}`);
                }
              }
            }
            
            if (speedafResult.success && trackingCode) {
              // Now create a Shopify fulfillment with the tracking code
              try {
                console.log(`Creating Shopify fulfillment for order ${cleanOrderId} with tracking code ${trackingCode}`);
                
                // Use our existing function for fulfillment
                const fulfillmentResult = await createOrderFulfillment({
                  shopId: shopResponse.id,
                  orderId: cleanOrderId,
                  trackingNumber: trackingCode,
                  trackingCompany: "Speedaf",
                  notifyCustomer: false
                });
                
                // Check for success first
                if (!fulfillmentResult.success) {
                  // Check if this is an "already fulfilled" error, which we can treat as success
                  const errorMsg = 'error' in fulfillmentResult ? fulfillmentResult.error : 'Fulfillment creation failed';
                  
                  // Common errors that indicate the order is actually fulfilled
                  const falseErrorPatterns = [
                    /already been fulfilled/i,
                    /has already been marked as fulfilled/i,
                    /fulfillment service is not found/i,
                    /no fulfillment for given order id exists/i,
                    /no id was returned/i
                  ];
                  
                  // Check if this is a false error (already fulfilled)
                  const isFalseError = falseErrorPatterns.some(pattern => pattern.test(errorMsg));
                  
                  if (isFalseError) {
                    // This is a false error - the order is already fulfilled or similar
                    console.log(`Detected false error for order ${cleanOrderId}: ${errorMsg}`);
                    
                    // Add to results as success
                    results.push({
                      orderId,
                      orderName: orderItem.name,
                      trackingCode,
                      success: true,
                      note: "Order may have been fulfilled already"
                    });
                    
                    // Show toast message for successful fulfillment
          setToastProps({
                      content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
            error: false
          });
                    setToastActive(true);
                    
                    console.log(`Successfully fulfilled order ${orderId} with tracking code: ${trackingCode} (despite error: ${errorMsg})`);
        } else {
                    // This is a real error
                    throw new Error(errorMsg);
                  }
                } else {
                  // Normal success case
                  const fulfillmentId = (fulfillmentResult as FulfillmentSuccessResult).fulfillmentId;
                  
                  // Add success to results
                  results.push({
                    orderId,
                    orderName: orderItem.name,
                    trackingCode,
                    fulfillmentId,
                    success: true
                  });
                  
                  // Show toast message for successful fulfillment
          setToastProps({
                    content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                    error: false
                  });
                  setToastActive(true);
                  
                  console.log(`Successfully fulfilled order ${orderId} with tracking code: ${trackingCode}`);
                }
              } catch (fulfillmentError) {
                console.error(`Error creating Shopify fulfillment for order ${cleanOrderId}:`, fulfillmentError);
                
                // Check if we should treat this as a false error
                const errorMsg = fulfillmentError instanceof Error ? fulfillmentError.message : String(fulfillmentError);
                const falseErrorPatterns = [
                  /already been fulfilled/i,
                  /has already been marked as fulfilled/i,
                  /fulfillment service is not found/i,
                  /no fulfillment for given order id exists/i,
                  /no id was returned/i,
                  /fulfillment was created but no id was returned/i
                ];
                
                const isFalseError = falseErrorPatterns.some(pattern => pattern.test(errorMsg));
                
                if (isFalseError) {
                  // Treat this as success since the order is already fulfilled or similar
                  console.log(`Treating error as success for order ${cleanOrderId}: ${errorMsg}`);
                  
                  // Add to results as success
                  results.push({
                    orderId,
                    orderName: orderItem.name,
                    trackingCode,
                    success: true,
                    note: "Order may have been fulfilled already"
                  });
                  
                  // Show toast message for successful fulfillment
                  setToastProps({
                    content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                    error: false
                  });
        setToastActive(true);
                } else {
                  // It's a genuine error
                  throw new Error(errorMsg);
                }
              }
            } else {
              failedOrders.push({
                orderId,
                orderName: orderItem.name,
                error: speedafResult.error || "Unknown error from Speedaf API"
              });
              
              console.error(`Failed to fulfill order ${orderId} with Speedaf: ${speedafResult.error || "Unknown error"}`, 
                { apiResponse: speedafResult });
            }
          } catch (orderError) {
            console.error(`Error fulfilling order ${orderId} with Speedaf:`, orderError);
            
            // Find the order item to get the name
            const orderItem = orders.find(o => o.id === orderId);
            const orderName = orderItem ? orderItem.name : `Order ${orderId}`;
            
            failedOrders.push({
              orderId,
              orderName,
              error: orderError instanceof Error ? orderError.message : String(orderError)
            });
          }
          
          // Add a short delay between orders to prevent API rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Show results to the user
        if (results.length > 0) {
          const successMessage = `Successfully fulfilled ${results.length} orders with Speedaf.`;
          console.log(successMessage, { successfulOrders: results });
        }
        
        if (failedOrders.length > 0) {
          const errorMessages = failedOrders.map(order => 
            `${order.orderName}: ${order.error}`
          );
          const errorMessage = `Failed to fulfill ${failedOrders.length} orders: ${errorMessages.join(', ')}`;
          console.error("Failed orders:", failedOrders);
          
        setToastProps({
            content: errorMessage,
          error: true
        });
        setToastActive(true);
        }
        console.log(`Successfully processed ${results.length} orders with Speedaf`);
        // After fulfillment, clear selection
        setSelectedConfirmedOrders([]);
      } else {
        // Handle other couriers or show message that the selected courier is not implemented
        setToastProps({
          content: `Fulfillment with ${selectedCourier} is not yet implemented.`,
          error: true
        });
        setToastActive(true);
      }
      
      // After fulfillment, clear selection
      setSelectedOrders([]);

      // Update writeOrder and autoWrite fields for successfully fulfilled orders
      if (results.length > 0) {
        console.log(`Updating writeOrder and autoWrite fields for ${results.length} successfully fulfilled orders`);

        const updatePromises = results.map(async (result) => {
          try {
            const cleanOrderId = String(result.orderId).replace(/\D/g, '');

            // Set writeOrder=true for all fulfilled orders
            // Set autoWrite=true only if user chose to write to sheets automatically
            const updateData = {
              writeOrder: true,
              autoWrite: writeToSheets
            };

            console.log(`Updating order ${cleanOrderId} with:`, updateData);

            await api.shopifyOrder.update(cleanOrderId, updateData);

            console.log(`Successfully updated fields for order ${cleanOrderId}`);
          } catch (updateError) {
            console.error(`Failed to update fields for order ${result.orderId}:`, updateError);
            // Don't fail the whole process if field update fails
          }
        });

        // Wait for all field updates to complete
        await Promise.all(updatePromises);
        console.log(`Completed field updates for ${results.length} orders`);

        // If user chose to write to sheets automatically, do it now
        if (writeToSheets && results.length > 0) {
          console.log(`User chose to write to sheets automatically. Writing ${results.length} orders to Google Sheets now.`);

          try {
            // Collect the successfully fulfilled order IDs
            const fulfilledOrderIds = results.map(result => result.orderId);
            console.log(`Fulfilled order IDs to write to sheets:`, fulfilledOrderIds);

            // Wait for fulfillment webhooks to process and update tracking numbers
            console.log("Waiting 2.5 seconds for fulfillment webhooks to process and update tracking numbers...");

            // Show a temporary message to the user about the wait
            setToastProps({
              content: `Waiting for tracking ID to update`,
              error: false
            });
            setToastActive(true);

            await new Promise(resolve => setTimeout(resolve, 2500));

            // Get the order data for these specific orders (fresh data after fulfillment)
            const ordersToWrite = [];

            for (const orderId of fulfilledOrderIds) {
              try {
                const cleanOrderId = String(orderId).replace(/\D/g, '');

                // Always fetch fresh order data after fulfillment to get updated tracking numbers
                console.log(`Fetching fresh data for order ${cleanOrderId} after fulfillment...`);
                const orderExtractResult = await (api as any).extractOrderSKUs({
                  orderId: cleanOrderId,
                  shopId: shop?.id || ''
                });

                if (!orderExtractResult?.success || !orderExtractResult?.order) {
                  console.warn(`Failed to extract fresh data for order ${orderId}:`, orderExtractResult?.error);
                  continue;
                }

                const orderData = orderExtractResult.order;
                console.log(`Fresh order data for ${orderData.name}:`, {
                  fulfillmentStatus: orderData.fulfillmentStatus,
                  trackingNumber: orderData.trackingNumber,
                  hasTracking: !!orderData.trackingNumber
                });

                // Transform order data for batch write
                const transformedOrderData = {
                  id: orderData.id,
                  name: orderData.name,
                  customerName: orderData.customerName,
                  phone: orderData.phone,
                  originalCity: orderData.originalCity, // Include Original City from noteAttributes
                  address: orderData.address,
                  city: formatCityForSheets(modifiedCities[orderData.id] || orderData.city || orderData.rawCity || '', selectedCourier), // Use modified city first, then recognized city, then raw city, standardized and formatted for sheets
                  rawCity: orderData.rawCity,
                  lineItems: orderData.lineItems?.map((item: any) => ({
                    name: item.name,
                    quantity: item.quantity,
                    sku: item.sku,
                    price: item.price
                  })) || [],
                  totalPrice: orderData.totalPrice,
                  displayFulfillmentStatus: orderData.fulfillmentStatus || "FULFILLED", // Use fresh status or fallback to FULFILLED
                  createdAt: orderData.createdAt,
                  tags: orderData.tags || [],
                  trackingNumber: orderData.trackingNumber || '', // Fresh tracking number from fulfillment
                  isCancelled: orderData.isCancelled || false,
                  isDeleted: orderData.isDeleted || false,
                  isFulfillmentCancelled: orderData.isFulfillmentCancelled || false
                };

                ordersToWrite.push(transformedOrderData);
                console.log(`Added order ${orderData.name} to batch write queue`);

              } catch (orderError) {
                console.error(`Error processing order ${orderId} for batch write:`, orderError);
              }
            }

            // Write all orders to Google Sheets in one batch
            if (ordersToWrite.length > 0) {
              console.log(`Writing ${ordersToWrite.length} orders to Google Sheets via batch write`);

              const batchWriteResult = await (api as any).writeBatchOrdersToSheets({
                ordersData: JSON.stringify(ordersToWrite),
                shopId: shop?.id || ''
              });

              if (batchWriteResult?.success) {
                console.log(`Successfully wrote ${ordersToWrite.length} orders to Google Sheets`, batchWriteResult);

                setToastProps({
                  content: `Successfully wrote ${results.length} orders to Google Sheets`,
                  error: false
                });
                setToastActive(true);
              } else {
                console.error("Failed to write orders to Google Sheets:", batchWriteResult?.error);

                setToastProps({
                  content: `Orders fulfilled successfully, but failed to write to Google Sheets: ${batchWriteResult?.error}`,
                  error: true
                });
                setToastActive(true);
              }
            } else {
              console.warn("No orders could be processed for automatic writing to sheets");
            }

          } catch (autoWriteError) {
            console.error("Error during automatic write to sheets:", autoWriteError);

            setToastProps({
              content: `Orders fulfilled successfully, but automatic write to sheets failed: ${autoWriteError instanceof Error ? autoWriteError.message : String(autoWriteError)}`,
              error: true
            });
            setToastActive(true);
          }
        }
      }

    } catch (error) {
      console.error("Error fulfilling orders:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);

      setToastProps({
        content: `Error fulfilling orders: ${errorMessage}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setFulfillLoading(false);
      
      // Refresh orders once after all processing is complete, with a 2 second delay
      console.log("All orders processed, scheduling refresh in 2 seconds");
      setTimeout(() => {
        console.log("Refreshing orders list");
        setPreventRefresh(false); // Allow refreshes again
        fetchOrders();
      }, 2000);
    }
  };

  // Fetch full order details when an order is selected
  const handleOrderSelect = async (id: string) => {
    // Simply select the order - all data is already loaded
    handleSelectOrder(id);
    
    // Debug: Log the order details
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      console.log(`Order ${id} selected:`, orders[orderIndex]);
    }
  };

  // Handle reference order selection
  const handleReferenceOrderSelect = (value: string) => {
    setSelectedReferenceOrder(value);
    setReferenceOrderNumber(value);
  };

  // Filter reference orders based on search input
  const handleReferenceOrderSearch = (value: string) => {
    setReferenceOrderSearchValue(value);
    
    // If it looks like an order number, set it to be validated on submission
    if (value.match(/^#?\d+$/)) {
      setReferenceOrderNumber(value);
    }
  };

  // Handle manually entered order
  const handleFetchReferenceOrder = async () => {
    setReferenceOrderError(null);
    
    if (!currentExchangeOrderId || !shop) {
      setReferenceOrderError("Current exchange order not found");
      return;
    }
    
    // If a reference order is selected from dropdown, use that
    if (selectedReferenceOrder) {
      try {
        setLoadingReferenceOrder(true);
        
        // Get the order details
        const orderResponse = await api.extractOrderSKUs({
          orderId: selectedReferenceOrder,
          shopId: shop?.id || ''
        });
        
        if (!orderResponse?.success || !orderResponse?.order) {
          throw new Error(orderResponse?.error || "Failed to extract order details");
        }
        
        // Verify it has DH tracking
        if (!orderResponse.order.trackingNumber || !String(orderResponse.order.trackingNumber).startsWith("DH")) {
          throw new Error("Reference order must have a tracking code starting with DH");
        }
        
        // Store the reference order info
        setExchangeReferences(prev => ({
          ...prev,
          [currentExchangeOrderId]: orderResponse.order
        }));
        
        // Update in Google Sheets
        try {
          const targetOrderId = String(currentExchangeOrderId).replace(/\D/g, '');
          
          const sheetUpdateResponse = await api.updateReferenceTracking({
            orderId: targetOrderId,
            shopId: shop?.id || '',
            referenceTrackingCode: orderResponse.order.trackingNumber
          });
          
          if (sheetUpdateResponse?.success) {
            console.log(`Successfully updated tracking code in Google Sheets: ${sheetUpdateResponse.message}`);
          } else {
            console.warn(`Warning: Failed to update tracking in sheet: ${sheetUpdateResponse?.error || 'Unknown error'}`);
          }
        } catch (sheetError) {
          console.error(`Error updating tracking in sheet: ${sheetError instanceof Error ? sheetError.message : String(sheetError)}`);
        }
        
        // Close the modal
        setShowExchangeModal(false);
        setReferenceOrderNumber("");
        setSelectedReferenceOrder('');
        
        // Show success message
        setToastProps({
          content: `Successfully linked to reference order ${orderResponse.order.name}`,
          error: false
        });
        setToastActive(true);
      } catch (error) {
        console.error("Error processing selected reference order:", error);
        setReferenceOrderError(`Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoadingReferenceOrder(false);
      }
      return;
    }
    
    // For manually entered order, need more validation
    if (!referenceOrderNumber) {
      setReferenceOrderError("Please enter or select a reference order");
      return;
    }
    
    try {
      setLoadingReferenceOrder(true);
      
      // Clean up the order number
      let orderName = referenceOrderNumber.trim();
      if (orderName.startsWith('#')) {
        orderName = orderName.substring(1);
      }
      
      if (!orderName) {
        throw new Error("Please enter a valid order name/number");
      }
      
      // First, find the current exchange order to get its phone
      const currentOrder = exchangeOrders.find(o => o.id === currentExchangeOrderId);
      if (!currentOrder) {
        throw new Error("Current exchange order not found");
      }
      
      const currentPhone = extractPhoneNumber(currentOrder);
      
      if (!currentPhone) {
        throw new Error("Current order doesn't have a phone number");
      }
      
      // Step 1: Search for the order by name
      const response = await api.shopifyOrder.findMany({
        filter: {
          name: { equals: `#${orderName}` }
        },
        first: 1
      });
      
      if (!response || response.length === 0) {
        throw new Error(`Order #${orderName} not found`);
      }
      
      // Step 2: Verify phone number matches
      const foundOrder = response[0];
      const foundPhone = extractPhoneNumber(foundOrder);
      
      if (!foundPhone || foundPhone !== currentPhone) {
        throw new Error(`Order #${orderName} has a different phone number`);
      }
      
      const orderId = String(foundOrder.id).replace(/\D/g, '');
      
      // Step 3: Get order details and verify tracking code
      const orderResponse = await api.extractOrderSKUs({
        orderId: orderId,
        shopId: shop?.id || ''
      });
      
      if (!orderResponse?.success || !orderResponse?.order) {
        throw new Error(orderResponse?.error || "Failed to extract order details");
      }
      
      // Verify it has DH tracking
      if (!orderResponse.order.trackingNumber || !String(orderResponse.order.trackingNumber).startsWith("DH")) {
        throw new Error("Reference order must have a tracking code starting with DH");
      }
      
      // Store the reference order info
      setExchangeReferences(prev => ({
              ...prev,
        [currentExchangeOrderId]: orderResponse.order
      }));
      
      // Update in Google Sheets
      try {
        const targetOrderId = String(currentExchangeOrderId).replace(/\D/g, '');
        
        const sheetUpdateResponse = await api.updateReferenceTracking({
          orderId: targetOrderId,
          shopId: shop?.id || '',
          referenceTrackingCode: orderResponse.order.trackingNumber
        });
        
        if (sheetUpdateResponse?.success) {
          console.log(`Successfully updated tracking code in Google Sheets: ${sheetUpdateResponse.message}`);
        } else {
          console.warn(`Warning: Failed to update tracking in sheet: ${sheetUpdateResponse?.error || 'Unknown error'}`);
        }
      } catch (sheetError) {
        console.error(`Error updating tracking in sheet: ${sheetError instanceof Error ? sheetError.message : String(sheetError)}`);
      }
      
      // Close the modal
      setShowExchangeModal(false);
      setReferenceOrderNumber("");
      setSelectedReferenceOrder('');
      
      // Show success message
        setToastProps({
        content: `Successfully linked to reference order ${orderResponse.order.name}`,
        error: false
        });
        setToastActive(true);
    } catch (error) {
      console.error("Error fetching reference order:", error);
      setReferenceOrderError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoadingReferenceOrder(false);
    }
  };
  
  // Handle canceling the exchange modal
  const handleCancelExchange = () => {
    setShowExchangeModal(false);
    setReferenceOrderNumber("");
    setCurrentExchangeOrderId(null);
  };

  // Removed handleSyncOrders function - no longer needed

  // Function to parse a Speedaf city entry into area, city and region components
  const parseSpeedafCityEntry = (cityEntry: string): { area: string, city: string, areaCode: string, cityCode: string } => {
    const parts = cityEntry.split(', ');
    return {
      area: parts[0] || '',
      city: parts[1] || '',
      areaCode: parts[2] || '',
      cityCode: parts[3] || ''
    };
  };

  // Function to format city for Google Sheets based on selected courier
  const formatCityForSheets = (cityValue: string, courier: string): string => {
    if (!cityValue) return '';

    // For Speedaf, extract only the city name (second part after first comma)
    if (courier === 'speedaf') {
      const parsed = parseSpeedafCityEntry(cityValue);
      return parsed.city || cityValue; // Fallback to original if parsing fails
    }

    // For Sendit and others, use the city value as-is
    return cityValue;
  };

  return (
    <Frame>
      <Page>
        {/* Toast message */}
        {toastActive && (
          <Toast
            content={toastProps.content}
            error={toastProps.error}
            onDismiss={() => setToastActive(false)}
          />
        )}
        
        {/* Exchange reference order modal */}
        <Modal
          open={showExchangeModal}
          onClose={handleCancelExchange}
          title="Exchange Order With"
          primaryAction={{
            content: 'Use Selected Order',
            onAction: handleFetchReferenceOrder,
            loading: loadingReferenceOrder,
            disabled: referenceOrdersLoading
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleCancelExchange,
            },
          ]}
        >
          <Modal.Section>
            <BlockStack gap="400">
              {referenceOrdersLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spinner />
                  <div style={{ marginTop: '8px' }}>
                    <Text as="p" variant="bodyMd">Loading orders with the same phone number...</Text>
                  </div>
                </div>
              ) : (
                <>
                  {referenceOrderError && (
                    <Banner tone="critical">
                      <p>{referenceOrderError}</p>
                    </Banner>
                  )}
                  
                  <FormLayout>
                    <Select
                      label="Select Reference Order"
                      options={referenceOrderOptions}
                      value={selectedReferenceOrder}
                      onChange={handleReferenceOrderSelect}
                      disabled={referenceOrdersLoading || referenceOrderOptions.length === 0}
                      placeholder="Choose an order..."
                    />
                    
                    <TextField
                      label="Or enter order number manually"
                      value={referenceOrderSearchValue}
                      onChange={handleReferenceOrderSearch}
                      autoComplete="off"
                      placeholder="e.g. #1001 or 1001"
                      helpText="Only orders with the same phone number will be accepted"
                    />
                    
                    <Text variant="bodyMd" as="p">
                      Only orders fulfilled by Sendit from the same phone number are shown.
                    </Text>
                  </FormLayout>
                </>
              )}
            </BlockStack>
          </Modal.Section>
        </Modal>
        
        {/* City editing modal */}
        <Modal
          open={showCityModal}
          onClose={handleCancelCity}
          title="Edit City Name"
          primaryAction={{
            content: 'Save',
            onAction: handleSaveCity,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleCancelCity,
            },
          ]}
        >
          <Modal.Section>
            <div style={{ minHeight: '400px' }}>
              <BlockStack gap="400">
                {editingOrderId && (
                  <Box background="bg-surface-secondary" padding="300" borderRadius="200">
                    <Text variant="bodyMd" as="p">
                      <strong>Original Address:</strong> {orders.find(o => o.id === editingOrderId)?.address || exchangeOrders.find(o => o.id === editingOrderId)?.address || "Address not found"}
                    </Text>
                    <Text variant="bodyMd" as="p">
                      <strong>AI Detected City:</strong> {" "}
                      {(() => {
                        const order = orders.find(o => o.id === editingOrderId) || exchangeOrders.find(o => o.id === editingOrderId);
                        const rawCity = order?.rawCity;
                        const city = order?.city;

                        if (rawCity) {
                          return <span style={{ color: '#108043' }}>{rawCity}</span>;
                        } else if (city) {
                          return <span style={{ color: '#c05717' }}>{city}</span>;
                        } else {
                          return <span style={{ color: '#d82c0d' }}>Unknown</span>;
                        }
                      })()}
                    </Text>
                    {(() => {
                      const order = orders.find(o => o.id === editingOrderId) || exchangeOrders.find(o => o.id === editingOrderId);
                      const originalCity = order?.originalCity;

                      if (originalCity) {
                        return (
                          <Text variant="bodyMd" as="p">
                            <strong>Additional Info - Original City:</strong> {" "}
                            <span style={{ color: '#108043' }}>{originalCity}</span>
                          </Text>
                        );
                      }
                      return null;
                    })()}
                  </Box>
                )}
                
                <FormLayout>
                  <TextField
                    label="City Name"
                    value={cityInputValue}
                    onChange={handleCityInputChange}
                    autoComplete="off"
                    placeholder="Type to search cities..."
                    helpText={`Showing cities for ${selectedCourier === 'speedaf' ? 'Speedaf' : 'Sendit'}. Type to search, scroll to view all cities, or click on a city to select it.`}
                  />
                  
                  <div style={{ marginTop: '20px' }}>
                    <InlineStack align="space-between">
                      <Text variant="headingSm" as="h3">
                        {isLoading ? "Searching..." : 
                          filteredCities.length > 0 ? 
                          `${filteredCities.length} ${filteredCities.length === 1 ? 'City' : 'Cities'} ${cityInputValue.trim() ? 'Matched' : 'Available'}` : 
                          "No cities match your search"}
                      </Text>
                      {cityInputValue.trim() && filteredCities.length > 0 && (
                        <Button 
                          variant="plain" 
                          onClick={() => setCityInputValue('')}
                        >
                          Clear Search
                        </Button>
                      )}
                    </InlineStack>
                    <div style={{ 
                      height: '180px', 
                      overflowY: 'auto', 
                      marginTop: '10px',
                      border: '1px solid #dfe3e8',
                      borderRadius: '4px'
                    }}>
                      {filteredCities.map(city => (
                        <div 
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          style={{ 
                            padding: '10px 12px',
                            borderBottom: '1px solid #f4f6f8',
                            cursor: 'pointer',
                            backgroundColor: city === cityInputValue ? '#f4f6f8' : 'transparent',
                            transition: 'background-color 0.2s',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = city === cityInputValue ? '#f4f6f8' : 'transparent'}
                        >
                          <Text as="span">{selectedCourier === 'speedaf' ? formatSpeedafCityForDisplay(city) : city}</Text>
                          {city === cityInputValue && (
                            <div style={{ marginLeft: 'auto', color: '#008060' }}>✓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </FormLayout>
              </BlockStack>
            </div>
          </Modal.Section>
        </Modal>
        
        {/* Order removal confirmation modal */}
        <Modal
          open={showRemoveModal}
          onClose={handleCancelRemove}
          title="Remove Order"
          size="small"
          primaryAction={{
            content: 'Remove',
            onAction: handleConfirmRemove,
            destructive: true,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleCancelRemove,
            },
          ]}
        >
          <Modal.Section>
            <Text as="p" variant="bodyMd" alignment="center">
              Are you sure you want to remove this order from the list?
            </Text>
          </Modal.Section>
        </Modal>

        {/* Fulfill orders confirmation dialog */}
        <Modal
          open={showFulfillDialog}
          onClose={() => setShowFulfillDialog(false)}
          title="Fulfill Orders"
          size="small"
          primaryAction={{
            content: 'Yes, Write to Sheets',
            onAction: () => handleFulfillOrders(true),
            loading: fulfillLoading,
          }}
          secondaryActions={[
            {
              content: 'No, Just Fulfill',
              onAction: () => handleFulfillOrders(false),
              loading: fulfillLoading,
            },
          ]}
        >
          <Modal.Section>
            <Text as="p" variant="bodyMd" alignment="center">
              Do you want to automatically write fulfilled orders to your Google Sheets right now?
            </Text>
          </Modal.Section>
        </Modal>

        {/* Exchange fulfill orders confirmation dialog */}
        <Modal
          open={showExchangeFulfillDialog}
          onClose={() => setShowExchangeFulfillDialog(false)}
          title="Process Exchange Orders"
          size="small"
          primaryAction={{
            content: 'Yes, Write to Sheets',
            onAction: () => handleExchangeOrders(true),
            loading: fulfillLoading,
          }}
          secondaryActions={[
            {
              content: 'No, Just Fulfill',
              onAction: () => handleExchangeOrders(false),
              loading: fulfillLoading,
            },
          ]}
        >
          <Modal.Section>
            <Text as="p" variant="bodyMd" alignment="center">
              Do you want to automatically write fulfilled exchange orders to your Google Sheets right now?
            </Text>
          </Modal.Section>
        </Modal>
        
        <BlockStack gap="300">
          {/* Tabs */}
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
          {selectedTab === 0 ? (
            <Layout>
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingLg" as="h2">
                        Confirmed Orders Ready for Fulfillment
                      </Text>
                      <Button 
                        onClick={fetchOrders}
                        disabled={ordersFetching}
                        icon={ordersFetching ? undefined : RefreshIcon}
                        variant="primary"
                        tone="success"
                      >
                        {ordersFetching ? "Refreshing..." : "Refresh Orders"}
                      </Button>
                    </InlineStack>
                    
                    <InlineStack align="space-between">
                      <Text variant="bodyMd" as="p">
                        {selectedConfirmedOrders.length ? `${selectedConfirmedOrders.length} orders selected` : 'Select orders to fulfill'}
                      </Text>
                      <InlineStack gap="200">
                        <Button 
                          onClick={handleSelectAllOrders}
                          disabled={orders.length === 0}
                        >
                          {getPaginatedOrders().every(order => selectedConfirmedOrders.includes(order.id)) ? 'Deselect All' : 'Select All'}
                        </Button>
                        <Select
                          label="Courier"
                          options={courierOptions}
                          value={selectedCourier}
                          onChange={handleCourierChange}
                          labelHidden
                        />
                        <Button 
                          disabled={
                            selectedConfirmedOrders.length === 0 || 
                            (selectedCourier === 'speedaf' && 
                             selectedConfirmedOrders.some(orderId => !modifiedCities[orderId]))
                          }
                          onClick={showFulfillConfirmationDialog}
                          loading={fulfillLoading}
                          variant="primary"
                        >
                          Fulfill Orders {selectedConfirmedOrders.length > 0 ? `(${selectedConfirmedOrders.length})` : ''}
                        </Button>
                      </InlineStack>
                    </InlineStack>

                    {/* Add warning message below buttons, center-aligned */}
                    {selectedCourier === 'speedaf' && selectedConfirmedOrders.some(orderId => !modifiedCities[orderId]) && (
                      <div style={{ textAlign: 'center', marginTop: '5px' }}>
                        <Text as="strong" tone="critical" variant="bodySm">
                          Edit cities for all selected orders before fulfilling with Speedaf
                        </Text>
                      </div>
                    )}

                    {/* Order count display */}
                    {orders.length > 0 && (
                      <Text variant="bodyMd" as="p" alignment="center">
                        Showing orders {(confirmedCurrentPage - 1) * confirmedPageSize + 1} - {Math.min(confirmedCurrentPage * confirmedPageSize, orders.length)} of {orders.length}
                      </Text>
                    )}
                    
                    {ordersError && (
                      <Banner tone="critical">
                        <p>Error loading orders: {ordersError.message}</p>
                      </Banner>
                    )}
                    
                    {ordersFetching ? (
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Spinner />
                        <div style={{ marginTop: '10px' }}>
                          <Text as="p" variant="bodyMd">Loading orders...</Text>
                        </div>
                      </div>
                    ) : orders && orders.length > 0 ? (
                      <>
                      <ResourceList
                        resourceName={{ singular: 'order', plural: 'orders' }}
                          items={getPaginatedOrders()}
                        renderItem={renderItem}
                      />
                        
                        {/* Pagination component */}
                        {orders.length > confirmedPageSize && (
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination
                              hasPrevious={confirmedCurrentPage > 1}
                              onPrevious={() => handleConfirmedPageChange(confirmedCurrentPage - 1)}
                              hasNext={confirmedCurrentPage * confirmedPageSize < orders.length}
                              onNext={() => handleConfirmedPageChange(confirmedCurrentPage + 1)}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <EmptyState
                        heading="No orders to fulfill"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <BlockStack gap="200">
                          <Text variant="bodyMd" as="p">
                            No confirmed orders that need fulfillment were found.
                          </Text>
                          <Text variant="bodyMd" as="p">
                            We're looking for orders with these tags:
                          </Text>
                          <ul style={{ listStylePosition: 'inside', textAlign: 'left', margin: 0, padding: 0 }}>
                            {CONFIRMATION_TAGS.map(tag => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                        </BlockStack>
                      </EmptyState>
                    )}
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          ) : selectedTab === 1 ? (
            <Layout>
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingLg" as="h2">
                        Sendit Exchange - Unfulfilled
                      </Text>
                      <Button
                        onClick={fetchExchangeOrders}
                        disabled={exchangeOrdersFetching}
                        icon={exchangeOrdersFetching ? undefined : RefreshIcon}
                        variant="primary"
                        tone="success"
                      >
                        {exchangeOrdersFetching ? "Refreshing..." : "Refresh Exchange Orders"}
                      </Button>
                    </InlineStack>
                    
                    <InlineStack align="space-between">
                      <Text variant="bodyMd" as="p">
                        {selectedExchangeOrders.length ? `${selectedExchangeOrders.length} orders selected` : 'Select orders to exchange'}
                      </Text>
                      <InlineStack gap="200">
                        <Button 
                          onClick={handleSelectAllExchangeOrders}
                          disabled={exchangeOrders.length === 0}
                        >
                          {getPaginatedExchangeOrders().every(order => selectedExchangeOrders.includes(order.id)) ? 'Deselect All' : 'Select All'}
                        </Button>
                        <Button
                          disabled={selectedExchangeOrders.length === 0}
                          onClick={showExchangeFulfillConfirmationDialog}
                          loading={fulfillLoading}
                          variant="primary"
                        >
                          Process Exchanges {selectedExchangeOrders.length > 0 ? `(${selectedExchangeOrders.length})` : ''}
                        </Button>
                      </InlineStack>
                    </InlineStack>
                    
                    {/* Order count display */}
                    {exchangeOrders.length > 0 && (
                      <Text variant="bodyMd" as="p" alignment="center">
                        Showing orders {(exchangeCurrentPage - 1) * exchangePageSize + 1} - {Math.min(exchangeCurrentPage * exchangePageSize, exchangeOrders.length)} of {exchangeOrders.length}
                      </Text>
                    )}
                    
                    {exchangeOrdersError && (
                      <Banner tone="critical">
                        <p>Error loading exchange orders: {exchangeOrdersError.message}</p>
                      </Banner>
                    )}
                    
                    {exchangeOrdersFetching ? (
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Spinner />
                        <div style={{ marginTop: '10px' }}>
                          <Text as="p" variant="bodyMd">Loading exchange orders...</Text>
                        </div>
                      </div>
                    ) : exchangeOrders && exchangeOrders.length > 0 ? (
                      <>
                      <ResourceList
                        resourceName={{ singular: 'order', plural: 'orders' }}
                          items={getPaginatedExchangeOrders()}
                        renderItem={renderItem}
                      />
                        
                        {/* Pagination component */}
                        {exchangeOrders.length > exchangePageSize && (
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination
                              hasPrevious={exchangeCurrentPage > 1}
                              onPrevious={() => handleExchangePageChange(exchangeCurrentPage - 1)}
                              hasNext={exchangeCurrentPage * exchangePageSize < exchangeOrders.length}
                              onNext={() => handleExchangePageChange(exchangeCurrentPage + 1)}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <EmptyState
                        heading="No Sendit exchange orders found"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <BlockStack gap="200">
                          <Text variant="bodyMd" as="p">
                            No Sendit exchange orders were found.
                          </Text>
                          <Text variant="bodyMd" as="p">
                            Orders must have the "Echange" tag, be fulfilled, and have a tracking number starting with "DH".
                          </Text>
                        </BlockStack>
                      </EmptyState>
                    )}
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          ) : selectedTab === 2 ? (
            <Layout>
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingLg" as="h2">
                        Orders to Write to Google Sheets
                      </Text>
                      <Button
                        onClick={fetchSheetOrders}
                        disabled={sheetOrdersFetching}
                        icon={sheetOrdersFetching ? undefined : RefreshIcon}
                        variant="primary"
                        tone="success"
                      >
                        {sheetOrdersFetching ? "Refreshing..." : "Refresh Sheet Orders"}
                      </Button>
                    </InlineStack>

                    <InlineStack align="space-between">
                      <Text variant="bodyMd" as="p">
                        {selectedSheetOrders.length ? `${selectedSheetOrders.length} orders selected` : 'Select orders to write to sheets'}
                      </Text>
                      <InlineStack gap="200">
                        <Button
                          onClick={handleSelectAllSheetOrders}
                          disabled={sheetOrders.length === 0}
                        >
                          {(() => {
                            const paginatedOrders = sheetOrders.slice(
                              (sheetCurrentPage - 1) * sheetPageSize,
                              sheetCurrentPage * sheetPageSize
                            );
                            return paginatedOrders.every(order => selectedSheetOrders.includes(order.id)) ? 'Deselect All' : 'Select All';
                          })()}
                        </Button>
                        <Button
                          disabled={selectedSheetOrders.length === 0}
                          onClick={handleWriteToSheets}
                          loading={fulfillLoading}
                          variant="primary"
                          icon={LogoGoogleIcon}
                        >
                          Write to Sheets {selectedSheetOrders.length > 0 ? `(${selectedSheetOrders.length})` : ''}
                        </Button>
                      </InlineStack>
                    </InlineStack>

                    {/* Order count display */}
                    {sheetOrders.length > 0 && (
                      <Text variant="bodyMd" as="p" alignment="center">
                        Showing orders {(sheetCurrentPage - 1) * sheetPageSize + 1} - {Math.min(sheetCurrentPage * sheetPageSize, sheetOrders.length)} of {sheetOrders.length}
                      </Text>
                    )}

                    {sheetOrdersError && (
                      <Banner tone="critical">
                        <p>Error loading sheet orders: {sheetOrdersError.message}</p>
                      </Banner>
                    )}

                    {sheetOrdersFetching ? (
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Spinner />
                        <div style={{ marginTop: '10px' }}>
                          <Text as="p" variant="bodyMd">Loading sheet orders...</Text>
                        </div>
                      </div>
                    ) : sheetOrders && sheetOrders.length > 0 ? (
                      <>
                      <ResourceList
                        resourceName={{ singular: 'order', plural: 'orders' }}
                        items={sheetOrders.slice(
                          (sheetCurrentPage - 1) * sheetPageSize,
                          sheetCurrentPage * sheetPageSize
                        )}
                        renderItem={renderItem}
                      />

                        {/* Pagination component */}
                        {sheetOrders.length > sheetPageSize && (
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination
                              hasPrevious={sheetCurrentPage > 1}
                              onPrevious={() => setSheetCurrentPage(sheetCurrentPage - 1)}
                              hasNext={sheetCurrentPage * sheetPageSize < sheetOrders.length}
                              onNext={() => setSheetCurrentPage(sheetCurrentPage + 1)}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <EmptyState
                        heading="No orders to write to sheets"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <BlockStack gap="200">
                          <Text variant="bodyMd" as="p">
                            Only fulfilled orders which are not yet written to Google Sheets are displayed here.
                          </Text>
                          <Text variant="bodyMd" as="p">
                            .
                          </Text>
                        </BlockStack>
                      </EmptyState>
                    )}
                  </BlockStack>
                </Card>
              </Layout.Section>

              {/* Remove Order Entries Section */}
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="300">
                    <Text variant="headingMd" as="h3">
                      Remove Orders from Sheets
                    </Text>

                    <Text variant="bodyMd" as="p">
                      Remove one or more orders from your Google Sheets.
                    </Text>

                    <TextField
                      label="Order Names"
                      value={removeOrderName}
                      onChange={setRemoveOrderName}
                      placeholder="#1234, #5678, 9999"
                      helpText="Enter order names separated by commas"
                      disabled={removeOrderLoading}
                      autoComplete="off"
                    />

                    <Button
                      onClick={handleRemoveOrderFromSheets}
                      loading={removeOrderLoading}
                      disabled={!removeOrderName.trim() || removeOrderLoading}
                      variant="primary"
                      tone="critical"
                    >
                      {removeOrderLoading ? "Removing..." : "Remove Orders"}
                    </Button>
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          ) : (
            <Layout>
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="400">
                    <Text variant="headingLg" as="h2">
                      Speedaf Order Tracking
                    </Text>

                    <Text variant="bodyMd" as="p">
                      Track batch Speedaf orders and write them to Sheets
                    </Text>

                    <BlockStack gap="400">
                      <div>
                        <Text variant="headingMd" as="h4">
                          Select Tracking Mode
                        </Text>
                        <div style={{ marginTop: '12px', maxWidth: '300px' }}>
                          <Select
                            label="Tracking mode"
                            options={[
                              { label: 'Last 10 orders (ending at latest)', value: '10' },
                              { label: 'Custom starting order', value: 'custom' }
                            ]}
                            value={speedafTrackingMode}
                            onChange={(value) => {
                              setSpeedafTrackingMode(value as '10' | 'custom');
                            }}
                            disabled={speedafTracking}
                          />
                        </div>
                      </div>

                      {speedafTrackingMode === 'custom' && (
                        <div>
                          <Text variant="headingMd" as="h4">
                            Starting Order
                          </Text>
                          <div style={{ marginTop: '12px', maxWidth: '300px' }}>
                            <TextField
                              label="Order name or number"
                              value={speedafCustomOrderName}
                              onChange={setSpeedafCustomOrderName}
                              placeholder="e.g., 1234 or #1234"
                              helpText="10 orders starting from this order will be checked (e.g., 1234, 1235, 1236...)"
                              disabled={speedafTracking}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <InlineStack gap="200" align="space-between">
                          <InlineStack gap="200">
                            <Button
                              onClick={handleSpeedafTracking}
                              loading={speedafTracking}
                              disabled={speedafTracking || speedafWritingToSheets}
                              variant="primary"
                              tone="success"
                            >
                              {speedafTracking ? "Tracking..." : "Track Speedaf Orders"}
                            </Button>

                            {speedafTrackingResults.length > 0 && (
                              <Button
                                onClick={handleClearSpeedafResults}
                                disabled={speedafTracking || speedafWritingToSheets}
                                variant="secondary"
                              >
                                Clear Results
                              </Button>
                            )}
                          </InlineStack>

                          {speedafTrackingResults.length > 0 && (
                            <Button
                              onClick={handleWriteSpeedafDataToSheets}
                              loading={speedafWritingToSheets}
                              disabled={speedafTracking || speedafWritingToSheets}
                              variant="primary"
                              icon={LogoGoogleIcon}
                            >
                              {speedafWritingToSheets ? "Writing..." : "Write Data to Sheets"}
                            </Button>
                          )}
                        </InlineStack>
                      </div>


                    </BlockStack>

                    {speedafTrackingError && (
                      <Banner tone="critical">
                        <p>Error: {speedafTrackingError}</p>
                      </Banner>
                    )}

                    {speedafTrackingResults.length > 0 && (
                      <div>
                        <Text variant="headingMd" as="h4" alignment="start">
                          Tracking Results ({speedafTrackingResults.length} orders)
                        </Text>

                        <div style={{ marginTop: '16px' }}>
                          <ResourceList
                            resourceName={{ singular: 'order', plural: 'orders' }}
                            items={speedafTrackingResults}
                            renderItem={(order: any) => (
                              <ResourceItem
                                id={order.id}
                                accessibilityLabel={`Order ${order.name}`}
                                onClick={() => {}}
                              >
                                <BlockStack gap="200">
                                  <InlineStack align="space-between">
                                    <Text variant="bodyMd" as="h5" fontWeight="semibold">
                                      {order.name}
                                    </Text>
                                    <Text variant="bodyMd" as="p" tone="subdued">
                                      {order.trackingNumber}
                                    </Text>
                                  </InlineStack>

                                  {order.error ? (
                                    <Text variant="bodyMd" as="p" tone="critical">
                                      {order.error}
                                    </Text>
                                  ) : order.trackingStatus ? (
                                    <BlockStack gap="100">
                                      {order.trackingStatus.tracks && order.trackingStatus.tracks.length > 0 ? (
                                        order.trackingStatus.tracks.slice(0, 3).map((track: any, index: number) => (
                                          <div key={index} style={{
                                            padding: '8px',
                                            backgroundColor: '#f6f6f7',
                                            borderRadius: '4px',
                                            fontSize: '12px'
                                          }}>
                                            <InlineStack align="space-between">
                                              <Text variant="bodyMd" as="p" fontWeight="medium">
                                                {track.actionDescription || track.actionName} {track.action && `(${track.action})`}
                                              </Text>
                                              <Text variant="bodyMd" as="p" tone="subdued">
                                                {track.time}
                                              </Text>
                                            </InlineStack>
                                            <Text variant="bodyMd" as="p" tone={track.action === '-2' ? 'critical' : 'subdued'}>
                                              {track.msgEng || track.message}
                                            </Text>
                                            {track.action === '-2' && (
                                              <Text variant="bodyMd" as="p" tone="critical" fontWeight="medium">
                                                ⚠️ Delivery Exception - Contact customer service
                                              </Text>
                                            )}
                                          </div>
                                        ))
                                      ) : (
                                        <Text variant="bodyMd" as="p" tone="subdued">
                                          No tracking events found
                                        </Text>
                                      )}
                                    </BlockStack>
                                  ) : (
                                    <Text variant="bodyMd" as="p" tone="subdued">
                                      No tracking data available
                                    </Text>
                                  )}
                                </BlockStack>
                              </ResourceItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          )}
        </BlockStack>

        {/* City color legend - only show in Confirmed Orders tab */}
        {selectedTab === 0 && (
          <div style={{ textAlign: 'center', margin: '15px 0', fontSize: '12px', color: '#637381' }}>
            <strong>City Colors:</strong>
            <span style={{ color: '#108043', marginLeft: '6px' }}>■ Original</span>
            <span style={{ color: '#c05717', marginLeft: '6px' }}>■ Matched</span>
            <span style={{ color: '#d82c0d', marginLeft: '6px' }}>■ Missing</span>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', margin: '10px 0', color: '#637381', fontSize: '14px' }}>
          Designed by Scrptble in Pakistan
        </div>
      </Page>
    </Frame>
  );
};

export default IndexPage;
