import type { Event } from "./types";

export const events: Event[] = [
  {
    id: "1",
    slug: "technovate-hackathon-2026",
    title: "Technovate 2026: AI & Sustainability Hackathon",
    category: "hackathon",
    date: "2026-04-18T09:00:00+05:30",
    location: "Chanakya Auditorium & Labs, MIT-WPU Pune",
    coverImage: "/images/events/technovate-hackathon.svg",
    shortDescription:
      "A flagship 36-hour national collegiate hackathon challenging 250+ student developers to architect AI solutions addressing renewable energy, smart mobility, and healthcare access.",
    body: `### Welcome to Technovate 2026

Technovate is the signature annual hackathon hosted by the Society of Women Engineers (SWE) MIT-WPU Student Chapter. Now in its fourth edition, the hackathon brings together visionary collegiate engineers, developers, UI/UX designers, and problem solvers from all over India.

#### Key Themes
1. **AI for Clean Energy:** Smart grid balancing, solar output forecasting, and low-power IoT algorithms.
2. **Accessible Healthcare:** Assistive tech, diagnostic screening support, and rural clinic workflows.
3. **Circular Urban Systems:** Waste tracking analytics, smart water distribution, and multimodal transit optimization.

#### Mentorship & Judging
Participants will receive 1-on-1 technical guidance from senior software architects, ML researchers, and product leaders from prominent global tech firms. Projects are evaluated on technical complexity, product usability, market feasibility, and real-world impact.`,
    schedule: [
      {
        time: "08:30 AM",
        title: "Registration & Check-in",
        description: "Badge collection, team onboarding, and breakfast.",
      },
      {
        time: "10:00 AM",
        title: "Keynote & Problem Statements Released",
        description: "Official kickoff, track briefings, and API credentials distribution.",
      },
      {
        time: "11:30 AM",
        title: "Hacking Begins",
        description: "36-hour sprint starts across all technical labs.",
      },
      {
        time: "06:00 PM",
        title: "Round 1 Mentor Reviews",
        description: "Architecture critique and cloud credits assistance.",
      },
      {
        time: "02:00 AM (Day 2)",
        title: "Midnight Pitch Rehearsals",
        description: "Informal dry runs with SWE leadership.",
      },
      {
        time: "02:00 PM (Day 2)",
        title: "Code Freeze & Submissions",
        description: "GitHub repository submission and prototype demonstrations.",
      },
      {
        time: "04:30 PM (Day 2)",
        title: "Grand Finale & Awards",
        description: "Top 8 live pitches, winner felicitations, and closing address.",
      },
    ],
    speakers: [
      {
        name: "Dr. Ananya Sen",
        title: "Principal Research Scientist, DeepMind / Visiting Fellow",
      },
      {
        name: "Roshni Kulkarni",
        title: "VP of Engineering, Apex Cloud Systems",
      },
      {
        name: "Prof. S. N. Deshmukh",
        title: "Dean of Faculty of Engineering, MIT-WPU",
      },
    ],
    partners: ["NVIDIA Inception", "AWS Educate", "GitHub Campus", "Persistent Systems"],
    gallery: [],
  },
  {
    id: "2",
    slug: "women-in-stem-leadership-summit",
    title: "Women in STEM: Leadership & Deep Tech Horizons",
    category: "talk",
    date: "2026-03-24T14:30:00+05:30",
    location: "Swami Vivekananda Hall, MIT-WPU",
    coverImage: "/images/events/leadership-summit.svg",
    shortDescription:
      "A high-impact symposium featuring senior engineering executives and SWE alumnae sharing insights on leading large-scale technical teams and breaking the glass ceiling.",
    body: `### About the Summit

Join SWE MIT-WPU for an inspiring afternoon of candid discourse, leadership frameworks, and technical insights. As emerging technologies like generative models, quantum computing, and autonomous systems transform the engineering landscape, diverse leadership is more critical than ever.

#### Highlights
- Keynote address on navigating corporate ladders in global enterprise technology.
- Interactive fireside chat tackling imposter syndrome, negotiation, and patent creation.
- Open Q&A session where students can directly ask questions to engineering vice presidents and founders.`,
    schedule: [
      {
        time: "02:30 PM",
        title: "Welcome Address by Chapter President",
        description: "Opening reflections on SWE MIT-WPU's leadership initiatives.",
      },
      {
        time: "03:00 PM",
        title: "Keynote: Leading Through Disruption",
        description: "Strategies for technical depth and empathetic leadership.",
      },
      {
        time: "04:15 PM",
        title: "Executive Panel & Fireside Chat",
        description: "Navigating early career inflection points in engineering.",
      },
      {
        time: "05:30 PM",
        title: "Networking Tea & Student Introductions",
        description: "Informal networking with invited dignitaries.",
      },
    ],
    speakers: [
      {
        name: "Pooja Hegde",
        title: "Director of Software Engineering, Microsoft IDC",
      },
      {
        name: "Kavita Rao",
        title: "Founding Partner, Venturer Labs (SWE Alumna)",
      },
    ],
    partners: ["SWE Western India Section", "IEEE Women in Engineering"],
    gallery: [],
  },
  {
    id: "3",
    slug: "cloud-native-kubernetes-masterclass",
    title: "Cloud-Native Architecture & Kubernetes Intensive",
    category: "workshop",
    date: "2026-02-28T10:00:00+05:30",
    location: "Computing Lab 4, Chanakya Building, MIT-WPU",
    coverImage: "/images/events/cloud-workshop.svg",
    shortDescription:
      "A hands-on, terminal-driven technical workshop covering Docker containerization, Kubernetes orchestration, Helm charts, and continuous deployment pipelines.",
    body: `### Masterclass Overview

Modern backend and platform engineering relies heavily on containerization and automated cluster management. This 6-hour hands-on masterclass takes students from basic container files to deploying a distributed microservice cluster on cloud infrastructure.

#### Prerequisites
- Basic familiarity with Linux terminal commands.
- Laptop with Docker Desktop installed (lab workstations will also be configured).

#### Topics Covered
1. **Container Fundamentals:** Writing clean Dockerfiles and multi-stage builds.
2. **Kubernetes Primitives:** Pods, Deployments, Services, ConfigMaps, and Secrets.
3. **Ingress & Observability:** Routing traffic and reading cluster metrics.
4. **GitOps:** Continuous deployment with GitHub Actions.`,
    schedule: [
      { time: "10:00 AM", title: "Containers 101: Docker Demystified", description: "Architecture and basic CLI operations." },
      { time: "11:30 AM", title: "Microservices Containerization Lab", description: "Hands-on containerization of a Node.js + Redis service." },
      { time: "01:00 PM", title: "Lunch & Networking", description: "Catered lunch at student commons." },
      { time: "02:00 PM", title: "Kubernetes Cluster Architecture", description: "Control plane vs worker nodes, YAML manifest authoring." },
      { time: "03:30 PM", title: "Live Cluster Deployment & Helm", description: "Deploying multi-tier apps with health checks." },
      { time: "05:00 PM", title: "Q&A, Git Badges & Certifications", description: "Certificate distribution and open lab time." },
    ],
    speakers: [
      {
        name: "Tanvi Joshi",
        title: "Staff Cloud Engineer, Red Hat Pune",
      },
    ],
    partners: ["Cloud Native Pune", "Red Hat"],
    gallery: [],
  },
  {
    id: "4",
    slug: "swe-industry-connect-mixer",
    title: "Annual SWE Industry Mixer & Mentor Connect",
    category: "networking",
    date: "2026-05-10T17:30:00+05:30",
    location: "Student Innovation Center, MIT-WPU Campus",
    coverImage: "/images/events/networking-mixer.svg",
    shortDescription:
      "An exclusive speed-mentoring and networking evening connecting collegiate members with engineers from Google, Barclays, Tata Technologies, and Veritas.",
    body: `### Building Meaningful Professional Ties

Navigating tech recruitment is easier with a trusted mentor by your side. The SWE MIT-WPU Annual Industry Mixer brings together 30+ working professionals from top engineering hubs across Pune and Mumbai to meet our student chapter members.

#### Format: Speed Mentoring
Each participant rotates through three 20-minute small-group discussions covering:
- Technical interview strategies and coding rounds
- Transitioning from collegiate projects to enterprise codebases
- Higher education (MS/PhD in CS/ECE/Mech) vs Industry paths`,
    schedule: [
      { time: "05:30 PM", title: "Registrations & Refreshments" },
      { time: "06:00 PM", title: "Opening Remarks & Mentor Introduction" },
      { time: "06:30 PM", title: "Structured Mentoring Rotations" },
      { time: "08:00 PM", title: "Open Networking & Dinner Reception" },
    ],
    speakers: [
      { name: "Priyanka Nair", title: "Software Engineer III, Google" },
      { name: "Sneha Patil", title: "Senior Security Analyst, Barclays" },
    ],
    partners: ["Barclays", "Veritas Technologies", "Tata Technologies"],
    gallery: [],
  },
  {
    id: "5",
    slug: "stem-empowerment-pune-outreach",
    title: "Project Spark: High School STEM Outreach Drive",
    category: "outreach",
    date: "2026-01-24T09:30:00+05:30",
    location: "Kothrud Community High School & MIT-WPU FabLab",
    coverImage: "/images/events/stem-outreach.svg",
    shortDescription:
      "A community outreach initiative where SWE student mentors taught fundamental robotics, Scratch coding, and circuit design to 120+ young female students.",
    body: `### Inspiring the Next Generation of Engineers

Project Spark is SWE MIT-WPU's flagship social impact program. We believe early exposure to engineering wonder plants the seed for lifelong STEM careers.

Our collegiate volunteers spent a full day working with secondary school girls, guiding them through hands-on breadboard circuits, building solar-powered buggies, and writing their first interactive computer games.`,
    schedule: [
      { time: "09:30 AM", title: "Volunteer Briefing & Lab Setup" },
      { time: "10:30 AM", title: "Interactive Electronics Demo: LEDs & Sensors" },
      { time: "12:30 PM", title: "Robo-Racer Assembly Challenge" },
      { time: "02:30 PM", title: "Scratch Programming Lab" },
      { time: "04:00 PM", title: "Showcase & Mentorship Kits Distribution" },
    ],
    speakers: [],
    partners: ["Pune Rotary Club Youth Wing", "MIT-WPU Social Welfare Council"],
    gallery: [],
  },
  {
    id: "6",
    slug: "algorithmic-arena-coding-battle",
    title: "Algorithmic Arena 2026: Collegiate Coding Challenge",
    category: "competition",
    date: "2026-03-08T18:00:00+05:30",
    location: "Online / MIT-WPU Central Computing Center",
    coverImage: "/images/events/coding-battle.svg",
    shortDescription:
      "An intense 3-hour competitive programming showdown celebrating International Women's Day with algorithmic problem-solving and cash prizes.",
    body: `### Test Your Algorithmic Prowess

To commemorate International Women's Day, SWE MIT-WPU hosts Algorithmic Arena — an ICPC-style individual competitive programming contest.

Featuring 6 graded algorithmic challenges ranging from graph theory and dynamic programming to string hashing and combinatorics, participants test their problem-solving under time pressure.`,
    schedule: [
      { time: "06:00 PM", title: "Contest Platform Onboarding" },
      { time: "06:30 PM", title: "Contest Starts (3 Hours)" },
      { time: "09:30 PM", title: "Contest Freeze & Scoreboard Reveal" },
      { time: "10:00 PM", title: "Live Editorial & Solution Walkthroughs" },
    ],
    speakers: [
      { name: "Arpita Sen", title: "Candidate Master (Codeforces), SWE Tech Lead" },
    ],
    partners: ["CodeChef MIT-WPU Chapter"],
    gallery: [],
  },
];
