export interface StemFact {
  id: string;
  name: string;
  role: string;
  fact: string;
  tag: string;
}

/** Notable women in STEM facts for hero constellation nodes. */
export const stemFacts: StemFact[] = [
  {
    id: "ada-lovelace",
    name: "Ada Lovelace",
    role: "Computing Pioneer",
    fact: "Wrote the first published computer algorithm in 1843 for Babbage's Analytical Engine, becoming the world's very first computer programmer.",
    tag: "Computing",
  },
  {
    id: "grace-hopper",
    name: "Grace Hopper",
    role: "Computer Scientist & US Navy Rear Admiral",
    fact: "Developed the first computer compiler (A-0) and popularized hardware-independent programming languages, laying the groundwork for COBOL.",
    tag: "Software Engineering",
  },
  {
    id: "dr-a-lalitha",
    name: "Dr. A. Lalitha",
    role: "First Indian Woman Engineer",
    fact: "Graduated with an electrical engineering degree from CEG Guindy in 1943, breaking barriers and representing India at the 1964 International Conference of Women Engineers.",
    tag: "Electrical Engineering",
  },
  {
    id: "janaki-ammal",
    name: "Dr. Janaki Ammal",
    role: "Cytogeneticist & Botanist",
    fact: "Pioneered sugarcane cytogenetics and co-authored the seminal Chromosome Atlas of Cultivated Plants, advancing indigenous botanical genetics.",
    tag: "Cytogenetics",
  },
  {
    id: "katherine-johnson",
    name: "Katherine Johnson",
    role: "NASA Mathematician",
    fact: "Calculated trajectory paths for Alan Shepard's flight and the Apollo 11 moon mission, proving critical mathematical accuracy for human spaceflight.",
    tag: "Orbital Mechanics",
  },
  {
    id: "radia-perlman",
    name: "Radia Perlman",
    role: "Network Architect & Protocol Designer",
    fact: "Invented the Spanning Tree Protocol (STP), the foundational algorithm enabling reliable, loop-free network communication across the modern internet.",
    tag: "Computer Networks",
  },
  {
    id: "kalpana-chawla",
    name: "Kalpana Chawla",
    role: "Aerospace Engineer & Astronaut",
    fact: "The first woman of Indian origin in space, holding degrees in aeronautical engineering and operating scientific missions aboard the Space Shuttle Columbia.",
    tag: "Aerospace Engineering",
  },
  {
    id: "fei-fei-li",
    name: "Fei-Fei Li",
    role: "AI Scientist & Stanford Professor",
    fact: "Created ImageNet, the dataset benchmark that catalyzed the modern deep learning revolution, and co-founded AI4ALL to expand STEM access.",
    tag: "Artificial Intelligence",
  },
];
