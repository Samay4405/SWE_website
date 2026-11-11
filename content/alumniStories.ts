export interface AlumniStory {
  id: string;
  name: string;
  tenure: string;
  photograph?: string;
  testimonial: string | string[];
}

export const alumniStories: AlumniStory[] = [
  {
    id: "story-4",
    name: "Saniya Jethani",
    tenure:
      "Technical Team Member · Affiliate Manager · Vice President · Advisory Board",
    testimonial: [
      "My journey with the Society of Women Engineers (SWE) at MIT-WPU has been one of the most meaningful experiences of my college life. From being a Technical Team Member to serving as Affiliate Manager, Vice President, and eventually joining the Advisory Board, SWE has played a significant role in shaping my personal and professional growth.",
      "SWE provided me with a platform to develop leadership, communication, teamwork, and organisational skills while encouraging me to step beyond my comfort zone. Through events, workshops, collaborations, and initiatives promoting women in STEM, I gained valuable exposure, built meaningful connections, and learned the importance of mentorship and community.",
      "One of my biggest takeaways has been understanding that engineering goes beyond technical knowledge—it is about creating impact, empowering others, and working together towards meaningful change.",
      "As I transition into the professional world, the confidence, experiences, and relationships I gained through SWE continue to guide me. SWE has been more than a student organisation; it has been a community that helped me discover my potential and continues to inspire me to give back.",
    ],
  },
  {
    id: "story-2",
    name: "Tanaya Borkar",
    tenure: "SWE Chapter Member",
    photograph: "/images/team/tanaya-borkar.jpeg",
    testimonial: [
      "Looking back, being a part of SWE has been one of the best parts of my college journey. What makes this community special is the people – the friends, seniors, alumni, and mentors who are always approachable and willing to help. Whether I had a small doubt, needed career advice, or wanted to explore something new, there was always someone I could reach out to.",
      "From attending WE Local, networking with inspiring people, presenting posters, and interacting with companies at career fairs to taking up leadership roles within the chapter, SWE has given me so many opportunities to step out of my comfort zone and build confidence. The year-round events, skill-development sessions, scholarship opportunities, industry interactions, and social outreach initiatives make it an experience that goes well beyond technical learning.",
      "For me, SWE has been about finding my people, discovering my potential, and growing along the way. I would genuinely encourage anyone thinking of joining to take that step and become a part of this wonderful community. You never know how many opportunities, friendships, and experiences might come your way!",
    ],
  },
];
