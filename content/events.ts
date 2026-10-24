import type { Event } from "./types";

export const events: Event[] = [
  {
    id: "0",
    slug: "building-with-javascript",
    title: "Building with JavaScript",
    category: "workshop",
    displayCategory: "WORKSHOP",
    displayDate: "Date TBA",
    displayLocation: "MIT-WPU",
    date: "2026-05-12T10:00:00+05:30",
    location: "Computing Labs, MIT-WPU Pune",
    coverImage: "/images/events/javascript-workshop.jpg",
    shortDescription:
      "A hands-on session to strengthen your JavaScript skills, build real-world projects, and gain confidence in web development.",
    body: `### Building with JavaScript Masterclass

Join SWE MIT-WPU for an immersive, practical coding workshop designed to take you from core JavaScript fundamentals to modern full-stack development patterns.

#### What We'll Cover
1. **ES6+ Modern Syntax:** Destructuring, promises, async/await, and functional programming concepts.
2. **Interactive DOM & State:** Building dynamic user interfaces and asynchronous API integrations.
3. **Real-World Project Sprint:** Writing modular code, debugging like a pro, and deploying your web project.

#### Who Should Attend
Collegiate engineers, student developers, and aspiring frontend/fullstack builders looking to strengthen their technical depth and portfolio.`,
    schedule: [
      {
        time: "10:00 AM",
        title: "Welcome & Setup",
        description: "Environment check, Node.js tooling, and starter repo cloning.",
      },
      {
        time: "10:30 AM",
        title: "Part 1: Asynchronous JavaScript",
        description: "Event loop, fetch API, and async/await deep dive.",
      },
      {
        time: "12:30 PM",
        title: "Hands-on Project Sprint",
        description: "Building a functional real-time dashboard application.",
      },
      {
        time: "02:00 PM",
        title: "Showcase & Q&A",
        description: "Code reviews, debugging tips, and next steps.",
      },
    ],
    speakers: [
      {
        name: "Neha Sharma",
        title: "Senior Frontend Engineer & SWE Mentor",
      },
    ],
    partners: ["GitHub Campus", "SWE Pune Section"],
    gallery: [],
  },
  {
    id: "1",
    slug: "technovate-hackathon-2026",
    title: "Technovate 2026: AI & Sustainability Hackathon",
    category: "hackathon",
    displayCategory: "HACKATHON",
    displayDate: "Apr 18, 2026",
    displayLocation: "MIT-WPU",
    date: "2026-04-18T09:00:00+05:30",
    location: "Chanakya Auditorium & Labs, MIT-WPU Pune",
    coverImage: "/images/events/hackathon-collab.jpg",
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
    displayCategory: "KEYNOTE & SUMMIT",
    displayDate: "Mar 24, 2026",
    displayLocation: "MIT-WPU",
    date: "2026-03-24T14:30:00+05:30",
    location: "Swami Vivekananda Hall, MIT-WPU",
    coverImage: "/images/events/stem-summit.jpg",
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
    displayCategory: "WORKSHOP",
    displayDate: "May 08, 2026",
    displayLocation: "MIT-WPU",
    date: "2026-05-08T10:00:00+05:30",
    location: "Computing Lab 4, MIT-WPU",
    coverImage: "/images/events/cloud-masterclass.jpg",
    shortDescription:
      "A hands-on terminal masterclass teaching microservices deployment, container orchestration with Kubernetes, and production CI/CD workflows on AWS.",
    body: `### Hands-on Cloud-Native Engineering

Master modern containerized workflows in this full-day technical workshop led by AWS certified architects and SWE technical leads.

#### Workshop Syllabus
1. **Container Fundamentals:** Dockerizing Node.js and Python microservices from scratch.
2. **Kubernetes Primitives:** Pods, Deployments, Services, ConfigMaps, and Ingress routing.
3. **Observability & Health Checks:** Setting up Prometheus metrics and Grafana dashboards.`,
    schedule: [
      {
        time: "10:00 AM",
        title: "Docker Essentials & Image Optimization",
        description: "Multi-stage Dockerfiles and image security scanning.",
      },
      {
        time: "12:00 PM",
        title: "Kubernetes Local Cluster Setup",
        description: "Deploying pods and services with Minikube and Kind.",
      },
      {
        time: "02:30 PM",
        title: "Production Ingress & Autoscaling",
        description: "Horizontal Pod Autoscaler (HPA) and traffic management.",
      },
      {
        time: "04:30 PM",
        title: "CI/CD Deployment to Cloud",
        description: "GitHub Actions pipeline deploying to EKS cluster.",
      },
    ],
    speakers: [
      {
        name: "Isha Patel",
        title: "Cloud Infrastructure Architect, Red Hat",
      },
    ],
    partners: ["AWS Cloud Club", "CNCF Community Group Pune"],
    gallery: [],
  },
  {
    id: "4",
    slug: "swe-industry-connect-mixer",
    title: "Annual SWE Industry Mixer & Mentor Connect",
    category: "networking",
    displayCategory: "NETWORKING",
    displayDate: "Jun 14, 2026",
    displayLocation: "MIT-WPU",
    date: "2026-06-14T17:00:00+05:30",
    location: "Student Activity Center, MIT-WPU",
    coverImage: "/images/about/workshop-audience.jpg",
    shortDescription:
      "Speed mentoring rounds connecting chapter members with technical managers, talent leads, and engineering alumni across premier Pune tech hubs.",
    body: `### Building Professional Bridges

The Annual SWE Industry Mixer is our premier networking evening designed to connect undergraduate women in engineering with accomplished technical leaders and recruiters.`,
    schedule: [
      {
        time: "05:00 PM",
        title: "Registration & Icebreakers",
        description: "Badges and speed-mentoring table allocation.",
      },
      {
        time: "05:30 PM",
        title: "Rotational Speed Mentoring",
        description: "15-minute focused mentoring cycles across diverse domains.",
      },
      {
        time: "07:00 PM",
        title: "Open Mixer & Refreshments",
        description: "Informal conversations and resume drop-offs.",
      },
    ],
    speakers: [
      {
        name: "Meera Joshi",
        title: "Staff Systems Engineer, Cisco Systems",
      },
    ],
    partners: ["Barclays Pune", "Eaton India Innovation Center"],
    gallery: [],
  },
  {
    id: "5",
    slug: "stem-empowerment-pune-outreach",
    title: "Project Spark: High School STEM Outreach Drive",
    category: "outreach",
    displayCategory: "OUTREACH",
    displayDate: "Jul 20, 2026",
    displayLocation: "Pune Schools",
    date: "2026-07-20T09:30:00+05:30",
    location: "Government Secondary School, Kothrud, Pune",
    coverImage: "/images/about/presentation-audience.jpg",
    shortDescription:
      "Chapter volunteers conducting interactive robotics demonstrations, Scratch programming labs, and inspiring 120+ young female students in Kothrud schools.",
    body: `### Inspiring Tomorrow's Engineers Today

Project Spark is SWE MIT-WPU's flagship community engagement initiative, bringing science and engineering directly into local municipal classrooms.`,
    schedule: [
      {
        time: "09:30 AM",
        title: "Interactive Physics & Robotics Demo",
        description: "Hands-on demonstration of sensors and basic robotics.",
      },
      {
        time: "11:00 AM",
        title: "Scratch Programming Workshop",
        description: "Guiding 120 students through visual animation projects.",
      },
      {
        time: "01:00 PM",
        title: "Scholarship & Career Guidance",
        description: "Encouraging girls to pursue technical streams after high school.",
      },
    ],
    speakers: [
      {
        name: "Tanvi Deshpande",
        title: "Outreach Lead & 3rd Year B.Tech CSE",
      },
    ],
    partners: ["Rotary Club of Pune", "Pune Municipal Corporation Education Board"],
    gallery: [],
  },
];
