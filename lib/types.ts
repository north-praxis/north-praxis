// Page content shapes. These are the source of truth for what lives in
// the page_content.content jsonb column. Keep in sync with lib/defaults.ts.

export type SectionVariant =
  | 'hero'
  | 'intro'
  | 'cards'
  | 'split'
  | 'list'
  | 'cta'
  | 'contact';

export interface HeroSection {
  variant: 'hero';
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface IntroSection {
  variant: 'intro';
  eyebrow?: string;
  heading: string;
  body: string; // may contain simple HTML (strong, em, a, br)
}

export interface CardItem {
  title: string;
  body: string;
  accent?: 'slate' | 'mid' | 'star';
  href?: string;
}

export interface CardsSection {
  variant: 'cards';
  eyebrow?: string;
  heading?: string;
  cards: CardItem[];
}

export interface SplitSection {
  variant: 'split';
  eyebrow?: string;
  heading: string;
  body: string; // simple HTML allowed
  imageUrl?: string;
  imageAlt?: string;
  flip?: boolean;
}

export interface ListItem {
  title: string;
  body: string;
}

export interface ListSection {
  variant: 'list';
  eyebrow?: string;
  heading: string;
  items: ListItem[];
}

export interface CtaSection {
  variant: 'cta';
  heading: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ContactSection {
  variant: 'contact';
  heading: string;
  body: string;
}

export type Section =
  | HeroSection
  | IntroSection
  | CardsSection
  | SplitSection
  | ListSection
  | CtaSection
  | ContactSection;

export interface PageContent {
  title: string; // browser/tab + og title
  metaDescription: string;
  sections: Section[];
}

export interface PageRow {
  slug: string;
  content: PageContent;
  status: 'active' | 'draft';
  updated_at: string;
  updated_by: string;
}
