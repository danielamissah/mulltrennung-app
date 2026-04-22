export type Language = 'en' | 'de';

export const translations = {
  en: {
    // App general
    appTitle: '♻️ Waste Sorting',
    appSubtitle: 'Scan a barcode to find the right bin',

    // City picker
    cityLabel: 'YOUR CITY',

    // Scanner
    scanHint: 'Hold barcode inside the frame',
    scanLoading: 'Looking up product…',
    scanError: 'Could not find product. Please try again.',
    cameraPermTitle: 'Camera access needed.',
    cameraPermBtn: 'Allow Camera Access',
    nextScan: 'Scan Next Item',
    unknownProduct: 'Unknown Product',
    ruleNote: 'Rule applies to',

    // Result
    binGelberSack: 'Yellow Bag / Recycling Bin',
    binBlaueTonne: 'Blue Bin (Paper & Cardboard)',
    binBrauneTonne: 'Brown Bin (Organic Waste)',
    binRestmuell: 'General Waste (Grey Bin)',
    binGlas: 'Glass Container',
    binSondermuell: 'Hazardous Waste',
    binWertstoffhof: 'Recycling Centre',
    glasWeiss: 'White Glass Container',
    glasBraun: 'Brown Glass Container',
    glasGruen: 'Green Glass Container (also mixed colours)',

    // History
    historyTitle: 'History',
    historyClear: 'Clear',
    historyEmpty: 'No scans yet.',
    historyEmptyHint: 'Scan a product to see it here.',

    // Tabs
    tabScanner: 'Scanner',
    tabHistory: 'History',
    tabGuide: 'Guide',

    // Guide screen
    guideTitle: 'Bin Guide',
    guideSubtitle: 'What goes where in Germany',
    guideItems: [
      {
        bin: 'Yellow Bag / Recycling Bin',
        emoji: '🟡',
        color: '#F5C518',
        examples: 'Plastic bottles, cans, foil, tetrapaks, packaging',
        rule: 'Anything with the Green Dot (Grüner Punkt) symbol',
      },
      {
        bin: 'Blue Bin',
        emoji: '🔵',
        color: '#1A73E8',
        examples: 'Newspapers, magazines, cardboard, paper bags',
        rule: 'Flatten cardboard boxes before putting in',
      },
      {
        bin: 'Brown Bin',
        emoji: '🟤',
        color: '#795548',
        examples: 'Food scraps, fruit peels, coffee grounds, eggshells',
        rule: 'No plastic bags — wrap in newspaper if needed',
      },
      {
        bin: 'Grey Bin (General Waste)',
        emoji: '⚫',
        color: '#757575',
        examples: 'Nappies, cigarettes, ceramics, broken glass, cat litter',
        rule: 'Anything that does not fit the other bins',
      },
      {
        bin: 'Glass Container',
        emoji: '🟢',
        color: '#43A047',
        examples: 'Wine bottles, jam jars, sauce bottles',
        rule: 'Sort by colour: white, brown, green. Remove lids first.',
      },
      {
        bin: 'Hazardous Waste',
        emoji: '🔴',
        color: '#E53935',
        examples: 'Batteries, paint, chemicals, medication',
        rule: 'Drop off at supermarket collection boxes or pharmacy',
      },
      {
        bin: 'Recycling Centre',
        emoji: '🟣',
        color: '#8E24AA',
        examples: 'Electronics, large appliances, furniture, tyres',
        rule: 'Take to your local Wertstoffhof (recycling centre)',
      },
    ],

    // Tips (override in rules engine)
    tips: {
      plastic_bottle: 'Empty and lightly crush the bottle.',
      metal_can: 'Rinse the can before disposing.',
      cardboard: 'Flatten boxes to save space.',
      glass_white: 'Remove the lid first. White glass container only.',
      glass_brown: 'Brown glass container only.',
      glass_green: 'Green container also accepts mixed colours.',
      organic: 'No plastic bags, even compostable ones.',
      battery: 'Drop off at collection boxes in supermarkets.',
      electronics: 'Take to a Wertstoffhof or in-store collection point.',
      styrofoam_berlin: 'In Berlin, styrofoam goes in general waste.',
      styrofoam_hamburg: 'In Hamburg, styrofoam goes in the yellow bag.',
      composite: 'Tetrapaks go in the yellow bag.',
      organic_munich: 'Wrap in newspaper or paper bags.',
    },
  },

  de: {
    appTitle: '♻️ Mülltrennung',
    appSubtitle: 'Barcode scannen um die richtige Tonne zu finden',

    cityLabel: 'STADT',

    scanHint: 'Barcode in den Rahmen halten',
    scanLoading: 'Produkt wird gesucht…',
    scanError: 'Produkt konnte nicht abgerufen werden. Bitte versuche es erneut.',
    cameraPermTitle: 'Kamera-Zugriff wird benötigt.',
    cameraPermBtn: 'Zugriff erlauben',
    nextScan: 'Nächstes Produkt scannen',
    unknownProduct: 'Unbekanntes Produkt',
    ruleNote: 'Regel für',

    binGelberSack: 'Gelber Sack / Wertstofftonne',
    binBlaueTonne: 'Blaue Tonne (Papier)',
    binBrauneTonne: 'Braune Tonne (Bio)',
    binRestmuell: 'Restmüll (Graue Tonne)',
    binGlas: 'Glascontainer',
    binSondermuell: 'Sondermüll',
    binWertstoffhof: 'Wertstoffhof',
    glasWeiss: 'Weißglas-Container',
    glasBraun: 'Braunglas-Container',
    glasGruen: 'Grünglas-Container (nimmt auch Buntglas)',

    historyTitle: 'Verlauf',
    historyClear: 'Löschen',
    historyEmpty: 'Noch keine Scans.',
    historyEmptyHint: 'Scanne ein Produkt, um es hier zu sehen.',

    tabScanner: 'Scanner',
    tabHistory: 'Verlauf',
    tabGuide: 'Guide',

    guideTitle: 'Müll-Guide',
    guideSubtitle: 'Was kommt wohin?',
    guideItems: [
      {
        bin: 'Gelber Sack / Wertstofftonne',
        emoji: '🟡',
        color: '#F5C518',
        examples: 'Plastikflaschen, Dosen, Folie, Tetrapaks, Verpackungen',
        rule: 'Alles mit dem Grüner-Punkt-Symbol',
      },
      {
        bin: 'Blaue Tonne',
        emoji: '🔵',
        color: '#1A73E8',
        examples: 'Zeitungen, Zeitschriften, Karton, Papiertüten',
        rule: 'Kartons flach falten',
      },
      {
        bin: 'Braune Tonne',
        emoji: '🟤',
        color: '#795548',
        examples: 'Essensreste, Schalen, Kaffeesatz, Eierschalen',
        rule: 'Keine Plastiktüten – in Zeitungspapier einwickeln',
      },
      {
        bin: 'Restmüll (Graue Tonne)',
        emoji: '⚫',
        color: '#757575',
        examples: 'Windeln, Zigaretten, Keramik, Splitterglas, Katzenstreu',
        rule: 'Alles, was nicht in andere Tonnen passt',
      },
      {
        bin: 'Glascontainer',
        emoji: '🟢',
        color: '#43A047',
        examples: 'Weinflaschen, Marmeladengläser, Soßenflaschen',
        rule: 'Nach Farbe sortieren: Weiß, Braun, Grün. Deckel abnehmen.',
      },
      {
        bin: 'Sondermüll',
        emoji: '🔴',
        color: '#E53935',
        examples: 'Batterien, Farbe, Chemikalien, Medikamente',
        rule: 'Sammelboxen im Supermarkt oder in der Apotheke',
      },
      {
        bin: 'Wertstoffhof',
        emoji: '🟣',
        color: '#8E24AA',
        examples: 'Elektrogeräte, große Geräte, Möbel, Reifen',
        rule: 'Zum lokalen Wertstoffhof bringen',
      },
    ],

    tips: {
      plastic_bottle: 'Flasche leeren und leicht zusammendrücken.',
      metal_can: 'Dose ausspülen.',
      cardboard: 'Karton flach falten.',
      glass_white: 'Deckel abnehmen. Nur in Weißglas-Container.',
      glass_brown: 'Nur in Braunglas-Container.',
      glass_green: 'Grünglas nimmt auch Buntglas an.',
      organic: 'Keine Plastikbeutel, auch keine kompostierbaren.',
      battery: 'Batterien an der Sammelbox im Supermarkt abgeben.',
      electronics: 'Zum Wertstoffhof oder Elektro-Rücknahme im Handel.',
      styrofoam_berlin: 'Styropor kommt in den Restmüll in Berlin.',
      styrofoam_hamburg: 'In Hamburg kommt Styropor in den Gelben Sack.',
      composite: 'Tetrapaks in den Gelben Sack.',
      organic_munich: 'Bioabfall in Papiertüten einwickeln.',
    },
  },
} as const;

export type Translations = typeof translations.en;