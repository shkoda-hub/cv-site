export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experience: Experience[] = [
  {
    company: "Tech Company",
    position: "Senior Backend Developer",
    period: "2022 - Present",
    description:
      "Разработка и поддержка микросервисной архитектуры. Оптимизация производительности API, интеграция с внешними сервисами.",
    technologies: ["Node.js", "NestJS", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
  },
  {
    company: "Startup Inc",
    position: "Backend Developer",
    period: "2020 - 2022",
    description:
      "Создание REST API с нуля. Проектирование базы данных, реализация авторизации и системы уведомлений.",
    technologies: ["Node.js", "Express", "MongoDB", "TypeScript", "AWS"],
  },
  {
    company: "Digital Agency",
    position: "Junior Developer",
    period: "2018 - 2020",
    description:
      "Разработка веб-приложений для клиентов. Участие в code review, написание unit-тестов.",
    technologies: ["JavaScript", "Node.js", "MySQL", "React"],
  },
];
