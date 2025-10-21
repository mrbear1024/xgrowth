export interface ProductOffer {
  id: string;
  name: string;
  headline: string;
  description: string;
  highlights: string[];
  bullets: string[];
  cta: {
    label: string;
    href: string;
  };
  support: string;
  tone: "light" | "dark" | "mesh";
}
