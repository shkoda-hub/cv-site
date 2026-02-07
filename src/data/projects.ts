export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "E-commerce API",
    description:
      "Масштабируемый REST API для e-commerce платформы с микросервисной архитектурой, очередями сообщений и кэшированием.",
    technologies: ["Node.js", "NestJS", "PostgreSQL", "Redis", "RabbitMQ", "Docker"],
    github: "https://github.com",
  },
  {
    title: "Real-time Chat",
    description:
      "Чат-приложение с поддержкой WebSocket, приватных комнат, отправки файлов и уведомлений.",
    technologies: ["Node.js", "Socket.io", "MongoDB", "React", "TypeScript"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Task Management System",
    description:
      "Система управления задачами с Kanban-досками, отслеживанием времени и интеграцией с Slack.",
    technologies: ["Node.js", "Express", "PostgreSQL", "React", "Docker"],
    github: "https://github.com",
  },
  {
    title: "Payment Gateway",
    description:
      "Интеграция платежных систем с поддержкой нескольких провайдеров, webhooks и отчетности.",
    technologies: ["Node.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
    github: "https://github.com",
  },
];
