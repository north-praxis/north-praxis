import type { PageContent } from './types';

// Fallback content, used only when the database row is missing or Supabase
// is unreachable. The database (page_content table) is the source of truth.
// supabase/schema.sql seeds these same shapes.

export const DEFAULT_CONTENT: Record<string, PageContent> = {
  home: {
    title: 'North Praxis | Strategy for mission-driven work',
    metaDescription:
      'North Praxis helps nonprofits, foundations, DAFs, and impact investors turn values into clear plans and working systems.',
    sections: [
      {
        variant: 'hero',
        headline: 'Strategy that helps mission-driven work find its bearings',
        subhead:
          'Organizational design for nonprofits. Investment theses and systems for foundations, DAFs, and impact investors.',
        ctaLabel: 'Start a conversation',
        ctaHref: '/contact',
      },
      {
        variant: 'cards',
        eyebrow: 'What we do',
        heading: 'Three ways North Praxis helps',
        cards: [
          {
            title: 'Nonprofits',
            body: 'Strategic planning, development planning, and organizational design. Processes that help teams work together toward grounded goals.',
            accent: 'slate',
            href: '/services#nonprofits',
          },
          {
            title: 'Foundations and DAFs',
            body: 'Helping family foundations and small to midsized funders define an investment thesis and build the systems to act on it.',
            accent: 'mid',
            href: '/services#foundations',
          },
          {
            title: 'Impact investors',
            body: 'Thesis definition and decision systems for impact investors and social entrepreneurs who want their capital working with intent.',
            accent: 'star',
            href: '/services#investors',
          },
        ],
      },
      {
        variant: 'intro',
        eyebrow: 'The approach',
        heading: 'Figuring out how things fit together',
        body: 'Good strategy is less about grand plans and more about alignment: people, purpose, resources, and process all pointed the same way. North Praxis works alongside your team to map what exists, name what matters, and build the connections between them.',
      },
      {
        variant: 'cta',
        heading: 'Not sure where to start?',
        body: 'A short conversation is usually the fastest way to find out whether this is a fit.',
        ctaLabel: 'Get in touch',
        ctaHref: '/contact',
      },
    ],
  },
  about: {
    title: 'About | North Praxis',
    metaDescription:
      'Chelsea Miller founded North Praxis to help mission-driven organizations and funders do their best work.',
    sections: [
      {
        variant: 'intro',
        eyebrow: 'About',
        heading: 'Chelsea Miller',
        body: 'Chelsea Miller is the founder of North Praxis. She works with nonprofits on strategic and development planning, and with foundations, DAFs, and impact investors on defining an investment thesis and building the systems around it. This bio is placeholder text and will be replaced with your real story.',
      },
      {
        variant: 'list',
        eyebrow: 'How we work',
        heading: 'Principles',
        items: [
          {
            title: 'Grounded goals',
            body: 'Plans only matter if the people carrying them out believe in them. We build strategy from the ground up, with the whole team.',
          },
          {
            title: 'Systems over one-offs',
            body: 'The deliverable is rarely a document. It is a way of working that keeps producing good decisions after the engagement ends.',
          },
          {
            title: 'Clarity first',
            body: 'Most organizations do not need more ideas. They need help seeing how the pieces they already have fit together.',
          },
        ],
      },
      {
        variant: 'cta',
        heading: 'Work with North Praxis',
        ctaLabel: 'Get in touch',
        ctaHref: '/contact',
      },
    ],
  },
  services: {
    title: 'Services | North Praxis',
    metaDescription:
      'Strategic planning and organizational design for nonprofits. Investment thesis and systems work for foundations, DAFs, and impact investors.',
    sections: [
      {
        variant: 'intro',
        eyebrow: 'Services',
        heading: 'What an engagement looks like',
        body: 'Every engagement starts with listening: where you are, what you have, and where you are trying to go. From there, North Praxis designs the process that fits, whether that is a full strategic plan or a focused sprint on one system.',
      },
      {
        variant: 'list',
        eyebrow: 'For nonprofits',
        heading: 'Strategic planning and organizational design',
        items: [
          {
            title: 'Strategic planning',
            body: 'A collaborative process that produces a plan your board and staff actually use, with goals grounded in your real capacity.',
          },
          {
            title: 'Development planning',
            body: 'Fundraising strategy built on your strengths: the right mix of sources, realistic targets, and the systems to sustain them.',
          },
          {
            title: 'Organizational design',
            body: 'Structures, roles, and processes that let your people collectively work toward shared goals instead of around each other.',
          },
        ],
      },
      {
        variant: 'list',
        eyebrow: 'For funders',
        heading: 'Foundations, DAFs, and family philanthropy',
        items: [
          {
            title: 'Investment thesis',
            body: 'Define what you fund, why, and how you will know it is working. A clear thesis turns giving from reactive to intentional.',
          },
          {
            title: 'Systems and process',
            body: 'Grantmaking pipelines, evaluation rhythms, and governance that fit the size of your team, not a large institution template.',
          },
        ],
      },
      {
        variant: 'list',
        eyebrow: 'For investors and entrepreneurs',
        heading: 'Impact investors and social entrepreneurs',
        items: [
          {
            title: 'Thesis and criteria',
            body: 'Sharpen the thesis behind your capital or venture, and the criteria that keep decisions consistent with it.',
          },
          {
            title: 'Decision systems',
            body: 'Lightweight structures for sourcing, diligence, and learning that hold up as you grow.',
          },
        ],
      },
      {
        variant: 'cta',
        heading: 'Tell us where you are trying to go',
        ctaLabel: 'Start a conversation',
        ctaHref: '/contact',
      },
    ],
  },
  contact: {
    title: 'Contact | North Praxis',
    metaDescription:
      'Get in touch with North Praxis about strategic planning, organizational design, or investment thesis work.',
    sections: [
      {
        variant: 'contact',
        heading: 'Start a conversation',
        body: 'Tell us a little about your organization and what you are working toward. We read every message and reply within a few business days.',
      },
    ],
  },
};

export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export const SITE = {
  name: 'North Praxis',
  domain: 'https://praxisnorth.com',
  owner: 'Chelsea Miller',
};
