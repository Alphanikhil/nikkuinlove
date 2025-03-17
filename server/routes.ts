import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

const mockQuestions = [
  // Physics
  {
    id: 1,
    question: "What is Newton’s third law of motion?",
    options: [
      "Every action has an equal and opposite reaction.",
      "An object in motion will stay in motion.",
      "The acceleration of an object is directly proportional to the force.",
      "The force acting on an object is equal to the product of mass and acceleration.",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "What does Coulomb’s law describe?",
    options: [
      "The force between two point charges.",
      "The magnetic field around a moving charge.",
      "The force between two parallel conductors.",
      "The relationship between pressure and volume in a gas.",
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question:
      "The focal length of a concave mirror is 10 cm. What is the image distance when the object is at 30 cm from the mirror?",
    options: ["15 cm", "7.5 cm", "20 cm", "30 cm"],
    correctAnswer: 0,
  },

  // Chemistry
  {
    id: 4,
    question:
      "According to Bohr’s model, the energy of an electron in the nth orbit is:",
    options: ["−13.6/n^2 eV", "+13.6/n^2 eV", "−13.6/n eV", "+13.6/n eV"],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: "Which of the following compounds contains a covalent bond?",
    options: ["NaCl", "CO2", "Na2O", "MgCl2"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "The first law of thermodynamics states that energy:",
    options: [
      "Can be created but not destroyed.",
      "Can neither be created nor destroyed, only transferred or converted.",
      "Is lost as heat in all reactions.",
      "Is constant in all chemical processes.",
    ],
    correctAnswer: 1,
  },

  // Biology
  {
    id: 7,
    question: "Which organelle is responsible for energy production in a cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question:
      "According to Mendel’s law of segregation, during gamete formation:",
    options: [
      "The alleles of a gene pair separate.",
      "The dominant allele is expressed.",
      "Both alleles remain together.",
      "Only recessive alleles are inherited.",
    ],
    correctAnswer: 0,
  },
  {
    id: 9,
    question:
      "Which of the following is responsible for the filtration of blood in the kidneys?",
    options: [
      "Glomerulus",
      "Loop of Henle",
      "Proximal convoluted tubule",
      "Distal convoluted tubule",
    ],
    correctAnswer: 0,
  },
];

const mockLetters = [
  {
    id: 1,
    title: "My Bubu",
    content:
      "hey dont wtch thsi , i have not updated it yed ",
    position: 0,
    unlockTime: "1100", // Always unlocked
  },
  {
    id: 2,
    title: "My Secret",
    content:
      "Your smile brightens my darkest days. When I'm with you, everything else fades away. You are the melody to my song, the rhythm to my dance. Every moment spent with you feels like a beautiful dream I never want to wake up from...",
    position: 1,
    unlockTime: "1150", // Unlock after 1 hour
  },
  {
    id: 3,
    title: "The Lie I Told You",
    content:
      "I cherish every second we spend together. You're not just my love, but my best friend. The way you understand me, support me, and believe in me makes me fall in love with you more each day...",
    position: 2,
    unlockTime: "1311", // Unlock after 3 hours
  },
  {
    id: 4,
    title: "About US",
    content:
      "You came into my life like an angel, bringing so much joy and happiness. Your love is the greatest gift I could ever receive. Every day with you is a new adventure, a new reason to smile...",
    position: 3,
    unlockTime: "1230", // Unlock after 6 hours
  },
  {
    id: 5,
    title: "The Letter I Never Sent",
    content:
      "I promise to always be there for you, through thick and thin. Your happiness is my happiness, your dreams are my dreams. Together, we can conquer anything life throws our way...",
    position: 4,
    unlockTime: "1320", // Unlock after 12 hours
  },
  {
    id: 6,
    title: "About bubu",
    content:
      "You are the sunshine that brightens my every morning. Your love warms my heart like the first rays of dawn. When you're around, even the cloudiest days feel bright and beautiful...",
    position: 5,
    unlockTime: "1116", // Unlock after 24 hours
  },
  {
    "id": 7,
    "title": "OUR END",
    "content": "This is the only think I never want in my lyf but I know every relationship have a end point and ill try to keep it as long as I can  ...but jane se pehle I want to give all the love I have inside me for you ... I want to give you everything you deserve from my side...❤️❤️ Parrr  Ik even that won’t be enough to make you stay...Still...I don’t want regrettt...I want you to remember the vcery last moment...I love you ❤️ with everything I have..\n\nNo matter where life takes us..a part of me will always belong to you..You were my happiest place..my safest feeling...my love for you will never really die ...I'll never forget everything you Teach and give mee...\n\nIf we not be in close ...I just hope...someday, when you look back.. remember me with ur big faty cheek smile 🤭...for now just enjoy the time 💕..I don't think this time will come back....🐉...",
    "position": 6,
    "unlockTime": null,
  },
  {
    "id": 8,
    "title": "NOTE",
    "content": " \n I'm extremely sorry for my recent behaviour like i only think about myself..pr aisa nhi hai m yr pata nhi mujhe aisa lgta hai...ap mujhe bhool rhe ho ...dar lgta rehta hai yrr 🤧idk isiliye i always try aisa kya bolu jise ..you get excited to talk with me and isiliye pata nhi me kya kya bol raha tha ..and i don't Even care about ur thoughts...I'm sorry for this 🤧...I was just scared...ik ur stuglling exam...the exam pressure, late night study ( NIGHT OWL) ..you are my strong babes just take deep breath you are more than these exam ,,, result kaisa bhi ho exam never defined how amazaing u r ,,,, i see ur hardwork ( late night study , one time dinner ) .... i beleive in u , u can easily do thsi ,,, , tu kr legi tu tension nh ik ...just stay focued im  with you and alway ill be , if you need any kind of help just text me ...you dont have to score 720/720   just give ur 100% ..dont forget to take care of urself..i always be here loving u,,, i believe in you .\n\n...GOOD LUCK for ur exam , love you\n",
    "position": 7,
    "unlockTime": null,
  },
];

export async function registerRoutes(app: Express) {
  app.get("/api/quiz", (_req, res) => {
    // Return a random question each time
    const randomQuestion =
      mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
    res.json(randomQuestion);
  });

  app.get("/api/letters", (_req, res) => {
    res.json(mockLetters);
  });

  app.get("/api/letters/:id", (req, res) => {
    const letter = mockLetters.find((l) => l.id === parseInt(req.params.id));
    if (!letter) {
      res.status(404).json({ message: "Letter not found" });
      return;
    }
    res.json(letter);
  });

  const httpServer = createServer(app);
  return httpServer;
}
