export interface PioneerNodeData {
  id: string;
  name: string;
  initials: string;
  field: string;
  contribution: string;
  nx: number;
  ny: number;
}

export const PIONEER_NODES: PioneerNodeData[] = [
  {
    id: "ada-lovelace",
    name: "Ada Lovelace",
    initials: "AL",
    field: "Algorithms & Computing",
    contribution: "Authored the first published machine algorithm for Babbage's Analytical Engine.",
    nx: 0.12,
    ny: 0.22,
  },
  {
    id: "marie-curie",
    name: "Marie Curie",
    initials: "MC",
    field: "Physics & Radioactivity",
    contribution: "First two-time Nobel laureate; isolated radium and founded radioactivity science.",
    nx: 0.28,
    ny: 0.15,
  },
  {
    id: "grace-hopper",
    name: "Grace Hopper",
    initials: "GH",
    field: "Compilers & Systems",
    contribution: "Pioneered the first compiler and standardized machine-independent programming languages.",
    nx: 0.08,
    ny: 0.54,
  },
  {
    id: "katherine-johnson",
    name: "Katherine Johnson",
    initials: "KJ",
    field: "Orbital Mechanics",
    contribution: "Calculated mission-critical orbital trajectories for Project Mercury and Apollo 11.",
    nx: 0.22,
    ny: 0.78,
  },
  {
    id: "hedy-lamarr",
    name: "Hedy Lamarr",
    initials: "HL",
    field: "Wireless Communications",
    contribution: "Co-patented frequency-hopping spread spectrum, founding modern Wi-Fi and Bluetooth.",
    nx: 0.38,
    ny: 0.86,
  },
  {
    id: "margaret-hamilton",
    name: "Margaret Hamilton",
    initials: "MH",
    field: "Flight Software",
    contribution: "Directed Apollo flight software engineering at MIT; coined 'software engineering'.",
    nx: 0.88,
    ny: 0.24,
  },
  {
    id: "radia-perlman",
    name: "Radia Perlman",
    initials: "RP",
    field: "Network Architecture",
    contribution: "Invented the Spanning Tree Protocol (STP), the algorithmic foundation of Ethernet.",
    nx: 0.74,
    ny: 0.12,
  },
  {
    id: "kalpana-chawla",
    name: "Kalpana Chawla",
    initials: "KC",
    field: "Aeronautical Engineering",
    contribution: "First Indian-born woman in space aboard Space Shuttle Columbia missions STS-87 & STS-107.",
    nx: 0.92,
    ny: 0.56,
  },
  {
    id: "tessy-thomas",
    name: "Tessy Thomas",
    initials: "TT",
    field: "Missile & Guidance Systems",
    contribution: "'Missile Woman of India'; Project Director for the Agni-IV and Agni-V ballistic systems.",
    nx: 0.78,
    ny: 0.80,
  },
  {
    id: "anandi-gopal-joshi",
    name: "Anandi Gopal Joshi",
    initials: "AJ",
    field: "Medicine & Healthcare",
    contribution: "One of the first Indian female physicians to graduate with a medical doctorate.",
    nx: 0.62,
    ny: 0.88,
  },
];
