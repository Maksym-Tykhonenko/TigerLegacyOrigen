export const TigerEncyclopedia = {
  bengalTiger: {
    scientificName: 'Panthera tigris tigris',
    commonName: 'Bengal Tiger',
    habitat: {
      regions: ['India', 'Nepal', 'Bhutan', 'Bangladesh'],
      terrainTypes: ['Dense forests', 'Mangroves', 'Grasslands'],
      famousLocation: 'Sundarbans',
    },
    physicalCharacteristics: {
      weight: {
        male: {
          min: 180,
          max: 260,
          unit: 'kg',
        },
      },
      length: {
        max: 3,
        unit: 'meters',
        note: 'including tail',
      },
      appearance: 'Orange coat with black stripes',
      distinguishingFeatures: 'Most numerous subspecies',
    },
    behavioralTraits: [
      'Territorial behavior',
      'Uses scent marking',
      'Uses vocalizations for communication',
      'Exceptional swimmers in Sundarbans',
      'Generally avoids humans unless threatened',
    ],
    conservationStatus: 'Endangered',
    image: require('../assets/image/bengaltiger.png'),
  },

  siberianTiger: {
    scientificName: 'Panthera tigris altaica',
    commonName: 'Siberian Tiger',
    alternateNames: ['Amur Tiger'],
    habitat: {
      regions: ['Russian Far East', 'Northeastern China', 'North Korea'],
      terrainTypes: ['Boreal forests', 'Mountainous regions'],
    },
    physicalCharacteristics: {
      weight: {
        male: {
          max: 320,
          unit: 'kg',
        },
      },
      appearance: 'Paler fur with fewer and lighter stripes',
      distinguishingFeatures: [
        'Largest tiger subspecies',
        'Thick fur for cold climate',
        'Stockier build',
        'Fat layer for winter survival',
      ],
    },
    behavioralTraits: [
      'Solitary nature',
      'Nocturnal hunters',
      'Cover territories up to 1,000 square kilometers',
      'Can go days without meals due to low prey density',
    ],
    conservationStatus: 'Endangered',
    image: require('../assets/image/Syberia.png'),
  },

  sumatranTiger: {
    scientificName: 'Panthera tigris sumatrae',
    commonName: 'Sumatran Tiger',
    habitat: {
      regions: ['Sumatra', 'Indonesia'],
      terrainTypes: ['Tropical rainforests', 'Lowland swamps'],
    },
    physicalCharacteristics: {
      weight: {
        male: {
          max: 120,
          unit: 'kg',
        },
      },
      appearance: 'Darker orange coat with closely spaced stripes',
      distinguishingFeatures: [
        'Smallest tiger subspecies',
        'Excellent camouflage',
      ],
    },
    behavioralTraits: [
      'Excellent swimming ability',
      'Highly territorial',
      'Versatile hunters',
      'Able to navigate challenging terrain',
    ],
    conservationStatus: 'Critically Endangered',
    populationStatus: 'Fewer than 400 in wild',
    image: require('../assets/image/Sumatran.png'),
  },

  indochineseTiger: {
    scientificName: 'Panthera tigris corbetti',
    commonName: 'Indochinese Tiger',
    habitat: {
      regions: ['Cambodia', 'Laos', 'Vietnam', 'Thailand', 'Myanmar'],
      terrainTypes: ['Tropical forests', 'Mountainous regions'],
    },
    physicalCharacteristics: {
      weight: {
        male: {
          min: 150,
          max: 195,
          unit: 'kg',
        },
      },
      appearance: 'Narrow, closely spaced stripes, darker than Bengal tigers',
    },
    behavioralTraits: [
      'Highly elusive',
      'Avoids human contact',
      'Prefers hunting in dense forests',
      'Adapts well to mountainous terrain',
    ],
    conservationStatus: 'Critically Endangered',
    populationStatus: 'Fewer than 350 in wild',
    image: require('../assets/image/Indochina.png'),
  },

  malayanTiger: {
    scientificName: 'Panthera tigris jacksoni',
    commonName: 'Malayan Tiger',
    habitat: {
      regions: ['Peninsular Malaysia'],
      terrainTypes: ['Tropical rainforests', 'Lowland forests'],
    },
    physicalCharacteristics: {
      weight: {
        male: {
          min: 120,
          max: 150,
          unit: 'kg',
        },
      },
      appearance: 'Bright orange coat with prominent black stripes',
    },
    culturalSignificance: 'National symbol of Malaysia',
    behavioralTraits: [
      'Silent stalking in dense vegetation',
      'Adept swimmers',
      'Solitary and territorial',
      'Uses scent marking and claw marks',
    ],
    conservationStatus: 'Critically Endangered',
    populationStatus: 'Fewer than 200 in wild',
    image: require('../assets/image/Malayan.png'),
  },

  southChinaTiger: {
    scientificName: 'Panthera tigris amoyensis',
    commonName: 'South China Tiger',
    habitat: {
      // historical: {
      regions: ['Central China', 'Southern China'],
      terrainTypes: ['Mountainous regions', 'Forested regions'],
      // },
    },
    physicalCharacteristics: {
      appearance: 'Bright orange coat with distinct black stripes',
      size: 'Smaller than Siberian tigers but larger than Sumatran tigers',
    },
    behavioralTraits: [
      'Adaptive hunting techniques',
      'Tree climbing ability',
      'Skilled at navigating hilly terrain',
    ],
    conservationStatus: 'Functionally Extinct in Wild',
    currentStatus: 'Only exists in captivity',
    conservationEfforts: 'Ongoing rewilding programs',
    image: 
    // [
      // require('../assets/image/SouthChina.png'),
      require('../assets/image/SouthChina2.png'),
    // ],
  },
};
