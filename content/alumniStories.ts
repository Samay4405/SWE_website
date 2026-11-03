export interface AlumniStory {
  id: string;
  name: string;
  tenure: string;
  photograph: string;
  testimonial: string;
}

export const alumniStories: AlumniStory[] = [
  {
    id: "story-1",
    name: "Roshni Iyer",
    tenure: "President | 2022–2023",
    photograph: "/images/team/dia-swami.jpg",
    testimonial:
      "SWE MIT-WPU gave me the confidence to lead before I even stepped into the corporate world. From negotiating corporate sponsorships to mentoring junior engineers through their first 24-hour hackathons, it wasn’t just about engineering—it was about creating an inclusive sisterhood where every ambitious woman engineer found her voice and walked out ready to lead.",
  },
  {
    id: "story-2",
    name: "Priya Mehta",
    tenure: "Technical Head | 2023–2024",
    photograph: "/images/team/aarika-shah.jpg",
    testimonial:
      "The late-night sprint sessions, troubleshooting project architectures, and building hands-on workshops for our collegiate peers shaped how I approach engineering challenges every single day. The friendships I made at SWE didn't end at graduation—they became the sounding board and lifelong support system I turn to in my career.",
  },
  {
    id: "story-3",
    name: "Ananya Deshmukh",
    tenure: "Core Team | 2023–2024",
    photograph: "/images/team/ananya-deshmukh.jpg",
    testimonial:
      "Stepping into engineering school can feel daunting, but SWE created an immediate home for me. It was the place where we celebrated each other's technical breakthroughs, rehearsed interview presentations together, and learned that technical mastery and genuine empathy grow best side by side.",
  },
];
