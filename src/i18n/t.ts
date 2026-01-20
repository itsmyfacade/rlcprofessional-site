import en from "./en.json";
import es from "./es.json";

export type Lang = "en" | "es";

export function getT(lang: Lang) {
  return lang === "es" ? (es as any) : (en as any);
}