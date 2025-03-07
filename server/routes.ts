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
    unlockTime: null, // Always unlocked
  },
  {
    id: 2,
    title: "Dear Heart",
    content:
      "Your smile brightens my darkest days. When I'm with you, everything else fades away. You are the melody to my song, the rhythm to my dance. Every moment spent with you feels like a beautiful dream I never want to wake up from...",
    position: 1,
    unlockTime: "8811", // Unlock after 1 hour
  },
  {
    id: 3,
    title: "Sweetheart",
    content:
      "I cherish every second we spend together. You're not just my love, but my best friend. The way you understand me, support me, and believe in me makes me fall in love with you more each day...",
    position: 2,
    unlockTime: "311", // Unlock after 3 hours
  },
  {
    id: 4,
    title: "My Angel",
    content:
      "You came into my life like an angel, bringing so much joy and happiness. Your love is the greatest gift I could ever receive. Every day with you is a new adventure, a new reason to smile...",
    position: 3,
    unlockTime: "622", // Unlock after 6 hours
  },
  {
    id: 5,
    title: "Forever Yours",
    content:
      "I promise to always be there for you, through thick and thin. Your happiness is my happiness, your dreams are my dreams. Together, we can conquer anything life throws our way...",
    position: 4,
    unlockTime: "1221", // Unlock after 12 hours
  },
  {
    id: 6,
    title: "My Sunshine",
    content:
      "You are the sunshine that brightens my every morning. Your love warms my heart like the first rays of dawn. When you're around, even the cloudiest days feel bright and beautiful...",
    position: 5,
    unlockTime: "2411", // Unlock after 24 hours
  },
  {
    id: 7,
    title: "My World",
    content:
      "You mean the world to me. Every day with you is a new adventure. Your love makes everything better, brighter, and more meaningful. You are the missing piece that makes my life complete...",
    position: 6,
    unlockTime: "3623", // Unlock after 36 hours
  },
  {
    id: 8,
    title: "Our End",
    content:
      "When I think about my future, all I see is you. You are my present, my future, and my forever. Every step I take forward, I want to take with you by my side. Our love story is just beginning...",
    position: 7,
    unlockTime:null, // Unlock after 55 hours
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
