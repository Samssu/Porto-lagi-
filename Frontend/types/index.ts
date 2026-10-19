export interface Profile {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
  };
}

export interface Skill {
  id: number;
  name: string;
  level: number; // 0-100
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
