export interface Skill {
  name: string;
  level: number; // 1-10
  category: "backend" | "frontend" | "devops" | "tools";
  color: string;
}

export const skills: Skill[] = [
  // Backend
  { name: "Node.js", level: 9, category: "backend", color: "#68a063" },
  { name: "Express.js", level: 9, category: "backend", color: "#000000" },
  { name: "NestJS", level: 8, category: "backend", color: "#e0234e" },
  { name: "TypeScript", level: 9, category: "backend", color: "#3178c6" },
  { name: "PostgreSQL", level: 8, category: "backend", color: "#336791" },
  { name: "MongoDB", level: 7, category: "backend", color: "#47a248" },
  { name: "Redis", level: 7, category: "backend", color: "#dc382d" },
  { name: "GraphQL", level: 6, category: "backend", color: "#e535ab" },

  // Frontend
  { name: "React", level: 7, category: "frontend", color: "#61dafb" },
  { name: "Next.js", level: 7, category: "frontend", color: "#ffffff" },
  { name: "HTML/CSS", level: 8, category: "frontend", color: "#e34f26" },

  // DevOps
  { name: "Docker", level: 8, category: "devops", color: "#2496ed" },
  { name: "Kubernetes", level: 5, category: "devops", color: "#326ce5" },
  { name: "CI/CD", level: 7, category: "devops", color: "#fc6d26" },
  { name: "AWS", level: 6, category: "devops", color: "#ff9900" },

  // Tools
  { name: "Git", level: 9, category: "tools", color: "#f05032" },
  { name: "Linux", level: 7, category: "tools", color: "#fcc624" },
  { name: "Jest", level: 8, category: "tools", color: "#c21325" },
];

export const categoryColors = {
  backend: "#6366f1",
  frontend: "#22d3ee",
  devops: "#f59e0b",
  tools: "#10b981",
};
