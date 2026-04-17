export interface StatCard {
  value: string;
  label: string;
  color: "dark" | "orange" | "teal";
}

export interface School {
  name: string;
  accent: "dark" | "orange" | "teal";
  points: string[];
  footnote?: string;
}

export interface NewsletterData {
  meta: {
    quarter: string;
    year: string;
    preparedBy: string;
    tagline: string;
  };
  hero: {
    intro: string;
    body1: string;
    body2: string;
  };
  directorMessage: {
    name: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
  about: {
    vision: string;
    goal: string;
    whatWeDoIntro: string;
    whatWeDoItems: string[];
    purpose: string;
  };
  executiveSummary: {
    body1: string;
    body2: string;
    points: string[];
  };
  scholarship: {
    stats: StatCard[];
    description: string;
  };
  selfSustaining: {
    description: string;
    focusAreas: string[];
    progress: string[];
  };
  schoolImpact: {
    schools: School[];
  };
  innovationProgress: {
    stats: StatCard[];
    description: string;
  };
  keyDevelopments: {
    schools: School[];
    impact: string[];
  };
  beneficiaryStory: {
    name: string;
    paragraphs: string[];
  };
  quarterlyHighlights: string[];
  conclusion: {
    body: string;
    points: string[];
    closing: string;
  };
  thankYou: {
    paragraphs: string[];
  };
  contacts: {
    phone: string;
    address: string;
    website: string;
  };
  photos: Array<{
    caption: string;
    placeholder: string;
  }>;
}

export const defaultData: NewsletterData = {
  meta: {
    quarter: "Q1",
    year: "2026",
    preparedBy: "Nothando Muza",
    tagline: "Providing universal access to quality education",
  },
  hero: {
    intro:
      "The first quarter of 2026 reflects continued progress for TTI Foundation in advancing education and sustainable development in rural communities.",
    body1:
      "Through scholarships, infrastructure development, and self-sustaining school initiatives, we have strengthened access to quality learning and improved livelihoods.",
    body2:
      "This report highlights key achievements and impact from January to March 2026.",
  },
  directorMessage: {
    name: "Nothando M",
    title: "Country Director: Zimbabwe",
    subtitle: "Turning Commitment into Measurable Impact",
    paragraphs: [
      "Welcome to our first quarterly newsletter of 2026.",
      "This quarter reflects our continued commitment to expanding access to quality education while strengthening sustainable, community-driven solutions across our partner schools. Through scholarships, infrastructure development, and income-generating initiatives, we are seeing encouraging progress in both learning environments and community empowerment.",
      "We remain grateful to our partners, donors, and communities whose support makes this work possible, and we look forward to building on this momentum in the months ahead.",
    ],
  },
  about: {
    vision:
      "We envision empowered rural communities where all children have access to quality education, regardless of gender or socio-economic background.",
    goal: "To lead the development of an improved education system supported by sustainable, community-driven business models that strengthen local economies and livelihoods.",
    whatWeDoIntro:
      "Through solar energy, irrigation systems, and regenerative business coaching, TTI supports rural schools to become community hubs and self-sustaining innovation centres that do not rely on donor aid. Income generated from school-based projects—particularly irrigation gardens—has funded:",
    whatWeDoItems: [
      "Construction and renovation of classrooms",
      "Development of science laboratories and libraries",
      "Procurement of essential learning materials",
    ],
    purpose:
      "Our purpose is to empower rural communities—especially girls and women—through education, sustainable development, and opportunities that create lasting, generational change. We exist to break cycles of poverty, strengthen schools, and support community-driven solutions that uplift families and unlock human potential.",
  },
  executiveSummary: {
    body1:
      "This quarter highlights significant progress in advancing education, improving school infrastructure, and strengthening sustainable income-generating initiatives across partner schools.",
    body2:
      "Through scholarships, solar powered irrigation projects, and strategic partnerships, schools are increasingly able to:",
    points: [
      "Improve infrastructure independently",
      "Expand access to quality education",
      "Strengthen long-term sustainability",
    ],
  },
  scholarship: {
    stats: [
      { value: "6 new students recruited", label: "(Total now: 37 new beneficiaries)", color: "dark" },
      { value: "4 Students", label: "Placed In Colleges", color: "dark" },
      { value: "2 Students", label: "Placed In Universities", color: "teal" },
      { value: "1,000 learners", label: "supported with stationery for the 2026 academic year", color: "orange" },
    ],
    description:
      "The programme continues to support academically promising students from disadvantaged backgrounds, enabling access to higher education and long-term opportunities.",
  },
  selfSustaining: {
    description:
      "TTI continues to promote a model where schools generate their own income and reduce dependency on donor funding.",
    focusAreas: [
      "Solar powered irrigation gardens and other income generating projects",
      "Infrastructure development",
      "Community participation",
    ],
    progress: [
      "3 schools progressing with classroom block construction",
      "Increased community involvement in school development projects",
    ],
  },
  schoolImpact: {
    schools: [
      {
        name: "Chivakanenyama Secondary School",
        accent: "dark",
        points: [
          "Classroom block nearing completion (funded through garden project)",
          "Strong community participation in construction",
          "Progress toward stabilizing A-Level classes",
        ],
      },
      {
        name: "Zvimhonja Secondary School",
        accent: "orange",
        points: [
          "USD 700 generated from garden produce (green mealies)",
          "USD 1,200 from broiler project",
          "Funds used to complete classroom block and paint 2 classroom blocks and teachers' houses",
          "Reduced overcrowding and improved learning conditions",
        ],
      },
      {
        name: "Matau Primary School – Transformation Story",
        accent: "dark",
        points: [
          "Half a hectare of maize planted (green mealies sold)",
          "Vegetable sales generated additional income",
          "Purchase of 200 pawpaw trees for long-term sustainability",
          "Contribution to school feeding programme (improved student nutrition)",
        ],
        footnote:
          "The next step is the construction of a six-roomed teachers' house. This case demonstrates how existing resources can be leveraged to create sustainable, community-driven impact.",
      },
    ],
  },
  innovationProgress: {
    stats: [
      { value: "3", label: "Science Laboratories established", color: "dark" },
      { value: "1", label: "Computer Laboratory established", color: "orange" },
      { value: "1", label: "Library established", color: "teal" },
    ],
    description:
      "The programme continues to support academically promising students from disadvantaged backgrounds, enabling access to higher education and long-term opportunities.",
  },
  keyDevelopments: {
    schools: [
      {
        name: "Chiroti School",
        accent: "dark",
        points: [
          "Science laboratory construction completed",
          "Resource mobilization underway for equipment",
        ],
      },
      {
        name: "Musukwi Primary School",
        accent: "orange",
        points: [
          "Library and computer lab nearing completion",
          "Book donation received (Riveryard)",
          "Additional sponsorship opportunities being pursued",
          "Classroom block completed (OSU in partnership with Awakened Woman)",
          "40 desks and chairs delivered",
        ],
      },
    ],
    impact: [
      "Application submitted to become an examination centre",
      "Potential to eliminate 10km travel distance for exam writing students",
    ],
  },
  beneficiaryStory: {
    name: "Learnmore Murandu",
    paragraphs: [
      "Learnmore's journey reflects the transformative impact of access to education. After falling pregnant at 18 (with no educational certification) and facing severe socio-economic challenges, her future appeared uncertain. Through TTI's intervention, she returned to school and completed her Advanced Level education.",
      "Today, she is pursuing a Bachelor's Degree in Peace and Governance at Bindura University. \"TTI believed in me when I had almost lost hope. Because of their support, I am now pursuing my dream at university and building a better future for my child and myself.\"",
      "Her story is a powerful example of resilience, second chances, and the long-term impact of educational support.",
    ],
  },
  quarterlyHighlights: [
    "37 students supported through scholarships",
    "6 new scholarship beneficiaries",
    "3 classroom blocks nearing completion",
    "1 classroom block renovated",
    "1 science laboratory completed",
    "1 library nearing completion",
    "1 computer lab nearing completion",
    "1,000 students supported with stationery",
  ],
  conclusion: {
    body: "This quarter reflects the growing success of TTI's integrated model of education support and sustainable development.",
    points: [
      "Financing their own infrastructure",
      "Improving learning environments",
      "Building long-term resilience",
    ],
    closing:
      "TTI remains committed to strengthening partnerships and expanding opportunities for rural learners across Zimbabwe.",
  },
  thankYou: {
    paragraphs: [
      "TTI Foundation extends its sincere gratitude to all our partners, donors, and community members for their continued support and commitment.",
      "Your contributions play a vital role in transforming lives, strengthening schools, and creating sustainable opportunities within the communities we serve. The progress highlighted in this report would not have been possible without your dedication and collaboration.",
      "We look forward to continuing this journey together as we work towards lasting impact and improved access to quality education for all.",
    ],
  },
  contacts: {
    phone: "+263 773 798 263",
    address: "55 Beeston Avenue, Mandara",
    website: "www.tererai.org",
  },
  photos: [
    {
      caption: "Irrigation water 10 000l storage tanks connected to a solar powered borehole/water well",
      placeholder: "irrigation-tank",
    },
    {
      caption: "Musukwi Primary School sponsored desks and chairs through the partnership of OSU and Awakened Woman",
      placeholder: "desks-chairs",
    },
    {
      caption: "Matau Primary School garden, maize project",
      placeholder: "maize-garden",
    },
    {
      caption: "Matau Primary School Paw Paw plant project — 200 plants, aiming to add 300 more",
      placeholder: "pawpaw-plants",
    },
    {
      caption: "Drilling of a water well for irrigation gardens and safe drinking water",
      placeholder: "water-well-drilling",
    },
    {
      caption: "Chivakanenyama Secondary School classroom block, sponsored by the irrigation garden",
      placeholder: "classroom-block",
    },
    {
      caption: "Chiroti Secondary School Science laboratory sponsored by Peace Mitchel",
      placeholder: "science-lab",
    },
  ],
};
