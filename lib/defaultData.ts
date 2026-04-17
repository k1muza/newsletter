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

export interface NewsletterImageAsset {
  url: string | null;
  storagePath: string | null;
}

export interface NewsletterData {
  meta: {
    quarter: string;
    year: string;
    organizationName: string;
    logo: NewsletterImageAsset;
    coverEyebrow: string;
    contentsNote: string;
    newsletterTitleLead: string;
    newsletterTitleAccent: string;
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
    image: NewsletterImageAsset;
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
    learningSupport: {
      eyebrow: string;
      headline: string;
      body: string;
    };
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
    image: NewsletterImageAsset;
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
    image: NewsletterImageAsset;
  }>;
}

export function createEmptyImageAsset(): NewsletterImageAsset {
  return {
    url: null,
    storagePath: null,
  };
}

export const defaultData: NewsletterData = {
  meta: {
    quarter: "Q1",
    year: "2026",
    organizationName: "Tererai Trent International Foundation",
    logo: createEmptyImageAsset(),
    coverEyebrow: "Quarterly Report",
    contentsNote:
      "This contents page tracks the numbered interior sequence after the decorative cover.",
    newsletterTitleLead: "Quarterly",
    newsletterTitleAccent: "Newsletter",
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
    image: createEmptyImageAsset(),
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
    learningSupport: {
      eyebrow: "Learning Support",
      headline: "1,000 learners",
      body:
        "Notebooks, pens, and backpacks were distributed to help students move through the 2026 academic year with essential learning materials already in hand.",
    },
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
    image: createEmptyImageAsset(),
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
      image: createEmptyImageAsset(),
    },
    {
      caption: "Musukwi Primary School sponsored desks and chairs through the partnership of OSU and Awakened Woman",
      placeholder: "desks-chairs",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Matau Primary School garden, maize project",
      placeholder: "maize-garden",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Matau Primary School Paw Paw plant project — 200 plants, aiming to add 300 more",
      placeholder: "pawpaw-plants",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Drilling of a water well for irrigation gardens and safe drinking water",
      placeholder: "water-well-drilling",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Chivakanenyama Secondary School classroom block, sponsored by the irrigation garden",
      placeholder: "classroom-block",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Chiroti Secondary School Science laboratory sponsored by Peace Mitchel",
      placeholder: "science-lab",
      image: createEmptyImageAsset(),
    },
  ],
};

export const resilienceDefaultData: NewsletterData = {
  meta: {
    quarter: "Quarterly",
    year: "2026",
    organizationName: "Tererai Trent International (TTI)",
    logo: createEmptyImageAsset(),
    coverEyebrow: "Quarterly Report",
    contentsNote:
      "This contents page tracks the numbered interior sequence after the decorative cover.",
    newsletterTitleLead: "Rural Impact",
    newsletterTitleAccent: "Quarterly Report",
    preparedBy: "TTI Team",
    tagline: "Education, resilience, and self-sustaining schools",
  },
  hero: {
    intro:
      "Through targeted educational initiatives, TTI has fostered lasting, multigenerational change by creating a comprehensive platform to empower rural communities, especially girls and women.",
    body1:
      "Our goal is to break cycles of poverty through scholarships, mentorship, and capacity-building programs, support rural students with financial aid and educational resources, and promote community-led solutions that uplift families, improve local livelihoods, and unlock human potential.",
    body2:
      "This quarterly report highlights key achievements in advancing education, enhancing school infrastructure, and implementing sustainable income-generating initiatives within partner schools in rural regions.",
  },
  directorMessage: {
    name: "Tererai Trent International",
    title: "Quarterly Impact Update",
    subtitle: "Empowering rural communities through education and sustainability",
    paragraphs: [
      "TTI continues to invest in education, infrastructure, and regenerative livelihoods that strengthen rural schools and the communities around them.",
      "By combining scholarships with school-led income generation, partner schools are improving learning environments while building long-term resilience.",
      "This edition focuses on purpose, progress, and the schools and students whose stories show what sustained support can make possible.",
    ],
    image: createEmptyImageAsset(),
  },
  about: {
    vision:
      "Our vision is to build empowered rural communities where every child has access to high-quality, inclusive education, regardless of gender, socio-economic background, or location. We strive to lead the development of a better education system through innovative, socially responsible business models that support sustainable local economies and enhance community livelihoods and resilience.",
    goal:
      "We aim to support rural students with scholarships, educational resources, and community-led solutions that strengthen livelihoods and unlock human potential.",
    whatWeDoIntro:
      "We provide financial aid specifically aimed at supporting rural students' higher education, while helping rural schools become self-sustaining innovation hubs through renewable energy and regenerative enterprise support.",
    whatWeDoItems: [
      "We cover tuition fees, accommodation, food, and transportation for rural students pursuing higher education.",
      "We establish solar-powered irrigation systems in schools in drought-prone regions, incorporating advanced solar panel technology and water management features.",
      "We offer regenerative business coaching tailored to sustainable agriculture, renewable energy integration, and income diversification strategies.",
      "This comprehensive approach transforms rural schools into self-sustaining innovation hubs by integrating renewable energy solutions and sustainable practices.",
      "Profits generated from irrigation schemes are reinvested into science laboratories, digital library resources, and safer, stronger school facilities that improve learning environments.",
    ],
    purpose:
      "Through targeted educational initiatives, TTI has fostered lasting, multigenerational change by creating a comprehensive platform to empower rural communities, especially girls and women. Our goal is to break cycles of poverty through scholarships, mentorship, and capacity-building programs, support rural students with financial aid and educational resources, and promote community-led solutions that uplift families, improve local livelihoods, and unlock human potential.",
  },
  executiveSummary: {
    body1:
      "This quarterly report highlights key achievements by Tererai Trent International (TTI) in advancing education, enhancing school infrastructure, and implementing sustainable income-generating initiatives within partner schools in rural regions. By providing scholarships and establishing school-led, solar-powered irrigation systems, many schools have upgraded their facilities, adding new classrooms, libraries, and water systems while significantly increasing access to quality education for underserved rural students.",
    body2:
      "During this quarter, six new students were recruited into the TTI scholarship program, bringing the total number of supported students to 37xx since its inception in 20xx. Of the new enrollees, four are currently pursuing their studies at local technical colleges, while two are enrolled at nearby universities. Additionally, one thousand learners received school stationery supplies, including notebooks, pens, and backpacks designed to last through the 2026 academic year.",
    points: [
      "Scholarships continue to support academically talented learners from economically disadvantaged backgrounds across the region.",
      "School-led solar-powered irrigation systems are helping schools finance classrooms, libraries, water systems, and other infrastructure improvements.",
      "Stationery support is helping 1,000 learners continue the 2026 academic year with the materials they need.",
    ],
  },
  scholarship: {
    stats: [
      { value: "6", label: "new students recruited this quarter", color: "dark" },
      { value: "37xx", label: "students supported since inception in 20xx", color: "orange" },
      { value: "4 + 2", label: "students in technical colleges and universities", color: "teal" },
      { value: "1,000", label: "learners equipped with stationery for 2026", color: "dark" },
    ],
    description:
      "The scholarship program continues to support academically talented learners from economically disadvantaged backgrounds by covering the costs that make higher education possible.",
    learningSupport: {
      eyebrow: "Learning Support",
      headline: "1,000 learners",
      body:
        "Notebooks, pens, and backpacks were distributed to help students move through the 2026 academic year with essential learning materials already in hand.",
    },
  },
  selfSustaining: {
    description:
      "Using solar-powered agricultural irrigation schemes, TTI has worked with and inspired local rural schools in drought-prone areas to transform into self-sustaining innovation hubs that promote agricultural development and renewable energy. TTI strongly believes schools must support themselves financially and operationally without relying solely on donor funding by implementing income-generating activities, such as small-scale solar-powered farming.",
    focusAreas: [
      "This approach supports long-term sustainability and enables schools to maintain high-quality education.",
      "Income-generating activities help schools upgrade classrooms with modern amenities.",
      "Financial stability allows schools to expand extracurricular and vocational programs so quality education is not limited by economic background.",
    ],
    progress: [
      "This quarter, three schools are making rapid progress in completing their new classroom blocks.",
      "Community participation, local supervision, and school-led enterprise remain central to the model.",
    ],
  },
  schoolImpact: {
    schools: [
      {
        name: "Chivakanenyama Secondary School",
        accent: "dark",
        points: [
          "The school is expanding its facilities with a new classroom building funded through proceeds from the solar-powered agricultural irrigation program.",
          "The community has actively supported the project by volunteering labor and providing food for construction workers.",
          "Retired teachers, pastors, and agricultural extension workers have taken on supervisory roles to ensure quality and safety.",
          "The school is also in the process of establishing A-level classes to broaden educational opportunities for students.",
        ],
      },
      {
        name: "Zvimhonja Secondary School",
        accent: "orange",
        points: [
          "The solar-powered irrigation scheme generated USD 700 from the sale of green mealies.",
          "Profit from the irrigation scheme directly contributed to the completion of a new classroom block.",
          "USD 1,200 earned from the broiler project financed the painting of two classroom blocks and teachers' houses.",
          "Students who previously learned under tree shades will soon have safe, dedicated classrooms to use.",
        ],
      },
      {
        name: "Matau Primary School",
        accent: "teal",
        points: [
          "After two years of inactivity, the school revived its solar-powered agricultural irrigation project using infrastructure previously supported by TTI.",
          "Half a hectare of maize was dedicated to green mealies for sale to the community, while vegetables generated additional income locally.",
          "The project raised funds to purchase 200 pawpaw trees as part of a longer-term sustainability plan.",
          "Half of the harvested maize was directed to the school feeding program, improving student nutrition while advancing sustainability.",
        ],
        footnote:
          "Encouraged by these gains, Matau Primary is planning to complete a six-room teachers' house to address the shortage of teacher accommodation and strengthen the school's long-term resilience.",
      },
    ],
  },
  innovationProgress: {
    stats: [
      { value: "3", label: "rural schools with fully equipped science laboratories", color: "dark" },
      { value: "$25,000", label: "raised for Musukwi by Heather MC and her community", color: "orange" },
      { value: "40", label: "desks and chairs delivered this quarter", color: "teal" },
    ],
    description:
      "TTI recognizes the significant challenges faced by learners in rural schools, which are often much greater than those in urban areas with better facilities and resources. Libraries and laboratories help narrow this gap by providing access to broader knowledge, practical learning, and pathways to higher education, vocational training, and meaningful careers.",
  },
  keyDevelopments: {
    schools: [
      {
        name: "Chiroti Laboratory",
        accent: "dark",
        points: [
          "Construction of the Chiroti laboratory has been completed.",
          "The school is actively mobilizing resources to equip the laboratory.",
        ],
      },
      {
        name: "Musukwi Primary School",
        accent: "orange",
        points: [
          "Musukwi has established a well-equipped library and is working on a digital catalog to better serve students and the community.",
          "The library and computer laboratory building are in the final stages of completion, and efforts to gather reading materials are underway.",
          "A donation of books has already been received from Riveryard Company, with more sponsors expected to support the library.",
          "The Musukwi Primary classroom block sponsored by OSU, Josh Taylor, and Dr. Trent has been completed.",
          "The upgraded school now qualifies to serve as an examination center under the Provincial Education Office.",
        ],
      },
    ],
    impact: [
      "Previously, Musukwi students had to travel about 10 km to another school to sit for national examinations.",
      "A modern school building, better furniture, and stronger infrastructure are creating a sense of achievement and hope within the community.",
      "Approving the examination center application would greatly reduce the burden on students and families while expanding opportunity locally.",
    ],
  },
  beneficiaryStory: {
    name: "Learnmore Marandu",
    paragraphs: [
      "Learnmore Marandu's journey serves as a heartfelt tribute to TTI's compassionate leadership. Her resilience and transformative life path would not have been possible without the unwavering support of Tererai Trent International (TTI).",
      "At only 17 years old, Learnmore faced the daunting crisis of pregnancy without any family or community support. Despite her hardships, she fought valiantly to care for her newborn while fiercely pursuing her education, despite limited resources and overwhelming responsibilities.",
      "Thanks to TTI's dedicated intervention, which provided emotional encouragement, financial assistance, and material support, Learnmore was given a vital second chance. TTI helped her re-enroll in school, sponsored her through her Advanced Level examinations, and extended ongoing support.",
      "Dr. Trent personally helped care for Learnmore's child by providing infant milk, diapers, soap, and nourishing food, ensuring both mother and baby were supported while Learnmore continued her studies.",
      "Learnmore completed her secondary education, passed her final exams, and has now been awarded a university scholarship. She is currently pursuing a Bachelor's degree in Peace and Governance at Bindura University, building a hopeful and sustainable future for herself and her child.",
      "\"TTI believed in me when I almost lost hope. Because of their support, I am now pursuing a university degree and building a brighter future for my child and myself.\"",
    ],
    image: createEmptyImageAsset(),
  },
  quarterlyHighlights: [
    "6 new students recruited into the TTI scholarship program this quarter",
    "37xx students supported since the program's inception in 20xx",
    "1,000 learners received notebooks, pens, and backpacks for the 2026 academic year",
    "3 schools are progressing with new classroom block construction",
    "USD 700 generated from Zvimhonja's green mealies sales",
    "USD 1,200 generated from the Zvimhonja broiler project",
    "3 rural schools now have fully equipped science laboratories",
    "40 desks and chairs were delivered to Musukwi Primary School this quarter",
  ],
  conclusion: {
    body:
      "This quarter's newsletter highlights the increasing impact of Tererai Trent International's innovative business model, which combines solar-powered agricultural irrigation systems, comprehensive educational support, and sustainable, community-led development initiatives.",
    points: [
      "The 14 rural schools under the TTI flagship are increasingly able to fund their own infrastructure upgrades and resource needs.",
      "Schools are building science laboratories, school libraries, and stronger learning environments for students.",
      "Community-led solutions are creating more engaging, supportive, and resilient educational ecosystems.",
    ],
    closing:
      "TTI remains committed to building strategic partnerships with local organizations, government agencies, and international donors to expand opportunities and access for rural students in underserved areas.",
  },
  thankYou: {
    paragraphs: [
      "TTI's integrated model continues to show that educational support, renewable energy, and local enterprise can work together to transform rural schools and communities.",
      "Across the TTI flagship schools, income from school-led projects is being reinvested into classrooms, laboratories, libraries, and better student support systems.",
      "The organization remains committed to deepening partnerships that expand opportunity, strengthen resilience, and make quality education accessible to rural learners.",
    ],
  },
  contacts: {
    phone: "+263 773 798 263",
    address: "55 Beeston Avenue, Mandara",
    website: "www.tererai.org",
  },
  photos: [
    {
      caption: "Scholarship support continues to open higher education opportunities for rural students.",
      placeholder: "scholarship-support",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Solar-powered irrigation systems are helping schools generate reliable income and improve food security.",
      placeholder: "solar-irrigation",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Community-led construction is expanding safe classroom space in partner schools.",
      placeholder: "classroom-construction",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Garden projects are strengthening nutrition programs and long-term school sustainability.",
      placeholder: "school-garden",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Libraries and laboratories are helping rural learners access stronger practical and academic resources.",
      placeholder: "libraries-labs",
      image: createEmptyImageAsset(),
    },
    {
      caption: "Musukwi Primary's upgraded facilities are creating new possibilities for learners and families.",
      placeholder: "musukwi-upgrade",
      image: createEmptyImageAsset(),
    },
  ],
};

const newsletterDefaultsByDocumentId: Record<string, NewsletterData> = {
  resilience: resilienceDefaultData,
};

export function getDefaultNewsletterData(documentId?: string) {
  return newsletterDefaultsByDocumentId[documentId ?? ""] ?? defaultData;
}
