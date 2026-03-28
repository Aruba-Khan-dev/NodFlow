export type DeliverableStatus = "pending" | "approved" | "revision-requested";
export type ProjectStatus = "in-progress" | "pending-approval" | "approved" | "revision-requested";

export interface Version {
  id: string;
  versionNumber: number;
  name: string;
  uploadedAt: string;
  uploadedBy: string;
  size: string;
  notes: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  replies?: Comment[];
}

export interface ActivityItem {
  id: string;
  type: "upload" | "approval" | "revision" | "comment" | "status-change";
  message: string;
  user: string;
  time: string;
}

export interface Deliverable {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: DeliverableStatus;
  size: string;
  previewType: "image" | "pdf" | "doc" | "other";
  versions: Version[];
  comments: Comment[];
  activity: ActivityItem[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  freelancer: string;
  status: ProjectStatus;
  lastActivity: string;
  description: string;
  deliverables: Deliverable[];
  activity: ActivityItem[];
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

// ── Helpers ──

const makeVersions = (baseName: string, count: number, type: string): Version[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `v${Date.now()}-${i}`,
    versionNumber: i + 1,
    name: `${baseName.replace(/\.[^.]+$/, "")}_v${i + 1}.${type.toLowerCase()}`,
    uploadedAt: `Mar ${Math.max(1, 5 - count + i + 1)}, 2026`,
    uploadedBy: i === 0 ? "Alex Rivera" : "Alex Rivera",
    size: `${(Math.random() * 15 + 2).toFixed(1)} MB`,
    notes: i === 0 ? "Initial upload" : i === count - 1 ? "Latest revision with feedback addressed" : "Updated based on client feedback",
  }));

const makeComments = (): Comment[] => [
  {
    id: "c1",
    author: "Sarah Chen",
    avatar: "SC",
    text: "Great progress on this! The color palette works really well. Could we explore a slightly warmer tone for the accent?",
    time: "Mar 5, 2026 · 2:30 PM",
    replies: [
      {
        id: "c1r1",
        author: "Alex Rivera",
        avatar: "AR",
        text: "Thanks Sarah! I'll prepare a couple of warm accent variations for you to compare.",
        time: "Mar 5, 2026 · 3:15 PM",
      },
    ],
  },
  {
    id: "c2",
    author: "Sarah Chen",
    avatar: "SC",
    text: "The typography choices are excellent. Let's move forward with this direction.",
    time: "Mar 4, 2026 · 11:00 AM",
  },
];

const makeActivity = (delivName: string): ActivityItem[] => [
  { id: "a1", type: "upload", message: `New version of ${delivName} uploaded`, user: "Alex Rivera", time: "Mar 5, 2026 · 4:00 PM" },
  { id: "a2", type: "comment", message: `Sarah Chen commented on ${delivName}`, user: "Sarah Chen", time: "Mar 5, 2026 · 2:30 PM" },
  { id: "a3", type: "revision", message: `Revision requested on ${delivName}`, user: "Sarah Chen", time: "Mar 4, 2026 · 5:00 PM" },
  { id: "a4", type: "upload", message: `${delivName} uploaded (v1)`, user: "Alex Rivera", time: "Mar 3, 2026 · 10:00 AM" },
];

// ── Projects ──

export const freelancerProjects: Project[] = [
  {
    id: "p1",
    name: "Brand Identity Redesign",
    client: "Apex Ventures",
    freelancer: "Alex Rivera",
    status: "in-progress",
    lastActivity: "2 hours ago",
    description: "Complete brand overhaul including logo, color palette, typography, and brand guidelines document.",
    deliverables: [
      {
        id: "d1", name: "Logo_Final_v3.ai", type: "AI", uploadedAt: "Mar 4, 2026", status: "approved", size: "4.2 MB",
        previewType: "image",
        versions: makeVersions("Logo_Final.ai", 3, "ai"),
        comments: [
          { id: "c10", author: "James Park", avatar: "JP", text: "Logo approved! The simplified mark works beautifully at small sizes.", time: "Mar 4, 2026 · 3:00 PM" },
        ],
        activity: makeActivity("Logo_Final.ai"),
      },
      {
        id: "d2", name: "Brand_Guidelines.pdf", type: "PDF", uploadedAt: "Mar 5, 2026", status: "pending", size: "12.8 MB",
        previewType: "pdf",
        versions: makeVersions("Brand_Guidelines.pdf", 2, "pdf"),
        comments: makeComments(),
        activity: makeActivity("Brand_Guidelines.pdf"),
      },
    ],
    activity: [
      { id: "pa1", type: "upload", message: "Brand_Guidelines.pdf v2 uploaded", user: "Alex Rivera", time: "Mar 5, 2026 · 4:00 PM" },
      { id: "pa2", type: "approval", message: "Logo_Final.ai approved by James Park", user: "James Park", time: "Mar 4, 2026 · 3:00 PM" },
      { id: "pa3", type: "comment", message: "Sarah Chen commented on Brand_Guidelines.pdf", user: "Sarah Chen", time: "Mar 4, 2026 · 11:00 AM" },
      { id: "pa4", type: "status-change", message: "Project status changed to In Progress", user: "System", time: "Mar 1, 2026 · 9:00 AM" },
    ],
  },
  {
    id: "p2",
    name: "E-Commerce Website",
    client: "Luna Retail",
    freelancer: "Alex Rivera",
    status: "pending-approval",
    lastActivity: "5 hours ago",
    description: "Full responsive e-commerce site with product catalog, cart, checkout, and admin panel.",
    deliverables: [
      {
        id: "d3", name: "Homepage_Mockup.fig", type: "FIG", uploadedAt: "Mar 3, 2026", status: "pending", size: "8.1 MB",
        previewType: "image",
        versions: makeVersions("Homepage_Mockup.fig", 2, "fig"),
        comments: [
          { id: "c20", author: "Maria Lopez", avatar: "ML", text: "The hero section is stunning. Can we add a seasonal banner option?", time: "Mar 4, 2026 · 1:00 PM",
            replies: [{ id: "c20r", author: "Alex Rivera", avatar: "AR", text: "Absolutely, I'll add a configurable banner component in the next version.", time: "Mar 4, 2026 · 2:00 PM" }] },
        ],
        activity: makeActivity("Homepage_Mockup.fig"),
      },
      {
        id: "d4", name: "Product_Page.fig", type: "FIG", uploadedAt: "Mar 3, 2026", status: "revision-requested", size: "6.4 MB",
        previewType: "image",
        versions: makeVersions("Product_Page.fig", 3, "fig"),
        comments: [
          { id: "c21", author: "Maria Lopez", avatar: "ML", text: "The gallery view needs zoom functionality. Also, the 'Add to Cart' button should be more prominent.", time: "Mar 5, 2026 · 10:00 AM" },
        ],
        activity: makeActivity("Product_Page.fig"),
      },
      {
        id: "d5", name: "Mobile_Designs.fig", type: "FIG", uploadedAt: "Mar 5, 2026", status: "pending", size: "5.7 MB",
        previewType: "image",
        versions: makeVersions("Mobile_Designs.fig", 1, "fig"),
        comments: [],
        activity: [
          { id: "a50", type: "upload", message: "Mobile_Designs.fig uploaded", user: "Alex Rivera", time: "Mar 5, 2026 · 9:00 AM" },
        ],
      },
    ],
    activity: [
      { id: "pa10", type: "upload", message: "Mobile_Designs.fig uploaded", user: "Alex Rivera", time: "Mar 5, 2026 · 9:00 AM" },
      { id: "pa11", type: "revision", message: "Revision requested on Product_Page.fig", user: "Maria Lopez", time: "Mar 5, 2026 · 10:00 AM" },
      { id: "pa12", type: "comment", message: "Maria Lopez commented on Homepage_Mockup.fig", user: "Maria Lopez", time: "Mar 4, 2026 · 1:00 PM" },
      { id: "pa13", type: "status-change", message: "Project submitted for approval", user: "Alex Rivera", time: "Mar 3, 2026 · 5:00 PM" },
    ],
  },
  {
    id: "p3",
    name: "Marketing Campaign Assets",
    client: "Bright Health Co.",
    freelancer: "Alex Rivera",
    status: "approved",
    lastActivity: "1 day ago",
    description: "Social media graphics, email templates, and landing page design for Q1 campaign.",
    deliverables: [
      {
        id: "d6", name: "Social_Pack.zip", type: "ZIP", uploadedAt: "Mar 1, 2026", status: "approved", size: "24.5 MB",
        previewType: "other",
        versions: makeVersions("Social_Pack.zip", 2, "zip"),
        comments: [{ id: "c30", author: "Tom Wright", avatar: "TW", text: "All assets look great. Approved!", time: "Mar 2, 2026 · 4:00 PM" }],
        activity: makeActivity("Social_Pack.zip"),
      },
      {
        id: "d7", name: "Email_Template.html", type: "HTML", uploadedAt: "Mar 2, 2026", status: "approved", size: "340 KB",
        previewType: "doc",
        versions: makeVersions("Email_Template.html", 1, "html"),
        comments: [],
        activity: [{ id: "a70", type: "approval", message: "Email_Template.html approved", user: "Tom Wright", time: "Mar 2, 2026 · 5:00 PM" }],
      },
    ],
    activity: [
      { id: "pa20", type: "approval", message: "All deliverables approved", user: "Tom Wright", time: "Mar 2, 2026 · 5:00 PM" },
      { id: "pa21", type: "status-change", message: "Project marked as Approved", user: "System", time: "Mar 2, 2026 · 5:01 PM" },
    ],
  },
  {
    id: "p4",
    name: "Mobile App UI Design",
    client: "Apex Ventures",
    freelancer: "Alex Rivera",
    status: "in-progress",
    lastActivity: "3 hours ago",
    description: "iOS and Android UI kit with 40+ screens for a fintech application.",
    deliverables: [
      {
        id: "d8", name: "Onboarding_Screens.fig", type: "FIG", uploadedAt: "Mar 5, 2026", status: "pending", size: "9.3 MB",
        previewType: "image",
        versions: makeVersions("Onboarding_Screens.fig", 1, "fig"),
        comments: makeComments(),
        activity: makeActivity("Onboarding_Screens.fig"),
      },
    ],
    activity: [
      { id: "pa30", type: "upload", message: "Onboarding_Screens.fig uploaded", user: "Alex Rivera", time: "Mar 5, 2026 · 1:00 PM" },
    ],
  },
  {
    id: "p5",
    name: "Corporate Presentation",
    client: "Sterling Partners",
    freelancer: "Alex Rivera",
    status: "revision-requested",
    lastActivity: "6 hours ago",
    description: "Investor pitch deck with 25 slides, data visualizations, and speaker notes.",
    deliverables: [
      {
        id: "d9", name: "Pitch_Deck_v2.pptx", type: "PPTX", uploadedAt: "Mar 4, 2026", status: "revision-requested", size: "18.2 MB",
        previewType: "doc",
        versions: makeVersions("Pitch_Deck.pptx", 2, "pptx"),
        comments: [
          { id: "c40", author: "David Kim", avatar: "DK", text: "Slides 8-12 need updated financial projections. The chart on slide 15 should use Q4 data instead of Q3.", time: "Mar 5, 2026 · 11:00 AM",
            replies: [{ id: "c40r", author: "Alex Rivera", avatar: "AR", text: "Got it. I'll update the financials and re-export by end of day.", time: "Mar 5, 2026 · 11:30 AM" }] },
        ],
        activity: [
          { id: "a90", type: "revision", message: "Revision requested by David Kim", user: "David Kim", time: "Mar 5, 2026 · 11:00 AM" },
          { id: "a91", type: "upload", message: "Pitch_Deck v2 uploaded", user: "Alex Rivera", time: "Mar 4, 2026 · 3:00 PM" },
          { id: "a92", type: "comment", message: "David Kim commented", user: "David Kim", time: "Mar 3, 2026 · 4:00 PM" },
          { id: "a93", type: "upload", message: "Pitch_Deck v1 uploaded", user: "Alex Rivera", time: "Mar 2, 2026 · 10:00 AM" },
        ],
      },
    ],
    activity: [
      { id: "pa40", type: "revision", message: "Revision requested on Pitch_Deck", user: "David Kim", time: "Mar 5, 2026 · 11:00 AM" },
      { id: "pa41", type: "upload", message: "Pitch_Deck v2 uploaded", user: "Alex Rivera", time: "Mar 4, 2026 · 3:00 PM" },
    ],
  },
];

export const clientProjects: Project[] = [
  freelancerProjects[1],
  freelancerProjects[4],
  {
    id: "p6",
    name: "Annual Report Design",
    client: "You",
    freelancer: "Alex Rivera",
    status: "pending-approval",
    lastActivity: "4 hours ago",
    description: "40-page annual report with infographics, financial charts, and photography.",
    deliverables: [
      {
        id: "d10", name: "AnnualReport_Draft.pdf", type: "PDF", uploadedAt: "Mar 5, 2026", status: "pending", size: "32.1 MB",
        previewType: "pdf",
        versions: makeVersions("AnnualReport_Draft.pdf", 2, "pdf"),
        comments: [
          { id: "c50", author: "You", avatar: "YO", text: "Page 12 infographic needs the updated quarterly numbers.", time: "Mar 5, 2026 · 3:00 PM" },
        ],
        activity: makeActivity("AnnualReport_Draft.pdf"),
      },
      {
        id: "d11", name: "Infographics.ai", type: "AI", uploadedAt: "Mar 5, 2026", status: "pending", size: "7.6 MB",
        previewType: "image",
        versions: makeVersions("Infographics.ai", 1, "ai"),
        comments: [],
        activity: [{ id: "a110", type: "upload", message: "Infographics.ai uploaded", user: "Alex Rivera", time: "Mar 5, 2026 · 2:00 PM" }],
      },
    ],
    activity: [
      { id: "pa50", type: "upload", message: "AnnualReport_Draft.pdf v2 uploaded", user: "Alex Rivera", time: "Mar 5, 2026 · 4:00 PM" },
      { id: "pa51", type: "upload", message: "Infographics.ai uploaded", user: "Alex Rivera", time: "Mar 5, 2026 · 2:00 PM" },
    ],
  },
];

export const notifications: Notification[] = [
  { id: "n1", message: "New deliverable uploaded for Brand Identity Redesign", time: "2 hours ago", read: false },
  { id: "n2", message: "Apex Ventures approved Logo_Final_v3.ai", time: "5 hours ago", read: false },
  { id: "n3", message: "Revision requested on Pitch_Deck_v2.pptx", time: "6 hours ago", read: true },
  { id: "n4", message: "New comment on E-Commerce Website project", time: "1 day ago", read: true },
];