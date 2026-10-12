import type { ResourceGroup } from "./types";

export const resourceGroups: ResourceGroup[] = [
  {
    category: "Learn",
    icon: "BookOpen",
    links: [
      {
        title: "SWE Global Learning Hub",
        url: "https://swe.org/learning",
        description: "Access webinars, technical certifications, and white papers",
      },
      {
        title: "Technical Workshop Archive",
        url: "https://youtube.com/@swemitwpu",
        description: "Revisit recorded sessions in AI, Cloud, and Systems",
      },
    ],
  },
  {
    category: "Build",
    icon: "Code",
    links: [
      {
        title: "SWE MIT-WPU GitHub",
        url: "https://github.com/swe-mitwpu",
        description: "Contribute to chapter open-source repositories and hackathon toolkits",
      },
      {
        title: "Hackathon Squad Matcher",
        url: "/contact",
        description: "Find interdisciplinary teammates for upcoming competitions",
      },
    ],
  },
  {
    category: "Lead",
    icon: "Trophy",
    links: [
      {
        title: "Collegiate Leadership Program",
        url: "https://swe.org/membership/collegiate",
        description: "Leadership development curriculum and SWE annual conference tracks",
      },
      {
        title: "1-on-1 Alumni Mentorship",
        url: "/contact",
        description: "Connect with SWE working alumnae across Fortune 500 tech firms",
      },
    ],
  },
  {
    category: "Launch",
    icon: "Rocket",
    links: [
      {
        title: "Resume & Algorithmic Interview Kits",
        url: "/contact",
        description: "Curated technical interview prep and algorithmic problem sets",
      },
      {
        title: "Global SWE Career Center",
        url: "https://careers.swe.org",
        description: "Exclusive recruitment pipelines and scholarship applications",
      },
    ],
  },
];

export const showResources = true;
