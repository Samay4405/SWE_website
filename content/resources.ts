import type { ResourceGroup } from "./types";

export const resourceGroups: ResourceGroup[] = [
  {
    category: "Learn",
    icon: "BookOpen",
    links: [
      {
        title: "__PLACEHOLDER__ SWE Global Resources",
        url: "https://swe.org",
        description: "Access SWE's global learning materials and webinars",
      },
      {
        title: "__PLACEHOLDER__ Technical Workshop Recordings",
        url: "#",
        description: "Watch past workshop recordings on YouTube",
      },
    ],
  },
  {
    category: "Build",
    icon: "Code",
    links: [
      {
        title: "__PLACEHOLDER__ GitHub Organization",
        url: "https://github.com/__PLACEHOLDER__",
        description: "Contribute to chapter open-source projects",
      },
      {
        title: "__PLACEHOLDER__ Project Ideas Board",
        url: "#",
        description: "Find project partners and ideas",
      },
    ],
  },
  {
    category: "Lead",
    icon: "Trophy",
    links: [
      {
        title: "__PLACEHOLDER__ Leadership Program",
        url: "#",
        description: "Apply for SWE leadership development programs",
      },
      {
        title: "__PLACEHOLDER__ Mentorship Portal",
        url: "#",
        description: "Connect with industry mentors",
      },
    ],
  },
  {
    category: "Launch",
    icon: "Rocket",
    links: [
      {
        title: "__PLACEHOLDER__ Career Resources",
        url: "#",
        description: "Resume reviews, interview prep, and job boards",
      },
      {
        title: "__PLACEHOLDER__ SWE Career Center",
        url: "https://careers.swe.org",
        description: "Explore engineering careers and opportunities",
      },
    ],
  },
];

/** Set to false to hide the Resources section until real content is available */
export const showResources = true;
