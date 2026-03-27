import coursesEn from "./courses-en.json";
import coursesRu from "./courses-ru.json";
import type { Course } from "./types";

export function getCourses(lang: string): Course[] {
  return (lang === "ru" ? coursesRu : coursesEn) as Course[];
}
