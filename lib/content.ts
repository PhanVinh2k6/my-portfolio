export type Project = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  category: string;
  visual: 'football' | 'crm';
  shortDescription: string;
  description: string;
  year: string;
  role: string;
  stack: string[];
  challenge: string;
  approach: string[];
  outcome: string;
  accent: 'blue' | 'navy';
};

export type Post = {
  slug: string;
  number: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const projects: Project[] = [
  {
    slug: 'victory-football',
    number: '01',
    title: 'Victory Football',
    eyebrow: 'Product system',
    category: 'Product systems',
    visual: 'football',
    shortDescription: 'A pitch and matchday management system designed to keep teams moving together.',
    description: 'Victory Football brings fixtures, pitch availability and team communication into one calm operating surface.',
    year: '2025—26',
    role: 'Product thinking, system analysis, frontend',
    stack: ['Next.js', 'TypeScript', 'SQL', 'Tailwind'],
    challenge: 'Football teams often coordinate through scattered chats, spreadsheets and memory. The real problem was not a lack of information; it was a lack of a shared, trustworthy view of the day.',
    approach: ['Map the matchday from first booking to final whistle.', 'Separate urgent actions from background information.', 'Design a system that helps a small team make decisions quickly.'],
    outcome: 'A focused management concept with a matchday overview, session timeline and a visual hierarchy built for fast scanning.',
    accent: 'blue',
  },
  {
    slug: 'crm-intelligence',
    number: '02',
    title: 'CRM Intelligence',
    eyebrow: 'AI / Research',
    category: 'AI & research',
    visual: 'crm',
    shortDescription: 'Exploring smarter customer operations with data, automation and a human point of view.',
    description: 'CRM Intelligence is an ongoing research project around useful automation for customer operations and Vietnamese business workflows.',
    year: '2025—26',
    role: 'Research, data thinking, interface direction',
    stack: ['Python', 'AI research', 'CRM', 'Data visualisation'],
    challenge: 'Automation can easily become another layer of noise. The opportunity was to make intelligence visible only when it helps a person understand what to do next.',
    approach: ['Start with the decisions a CRM user needs to make.', 'Turn model output into signals instead of dashboards full of noise.', 'Keep a clear human handoff for every automated recommendation.'],
    outcome: 'A visual direction for a CRM layer that communicates momentum, response quality and next-best actions without hiding the context.',
    accent: 'navy',
  },
];

export const posts: Post[] = [
  {
    slug: 'designing-with-restraint',
    number: '01',
    title: 'Designing with restraint',
    excerpt: 'Why a quieter interface can make the important parts feel louder.',
    date: '18.02.2026',
    readTime: '4 min read',
    category: 'Notes on design',
    body: [
      { heading: 'The temptation to add', paragraphs: ['When a project feels unfinished, the easiest response is to add something: another gradient, another animation, another card. I have made that choice more than once.', 'But visual energy is not the same as clarity. A product can be expressive without asking every element to perform at the same time.'] },
      { heading: 'A useful kind of quiet', paragraphs: ['Restraint is not minimalism for its own sake. It is deciding what deserves attention and giving that thing enough room to be understood.', 'In practice, this means fewer competing colors, a reliable spacing system and motion that explains a change instead of decorating it.'] },
      { heading: 'What I am practising', paragraphs: ['I now try to remove one layer before adding a new one. The result is usually more honest: the content has to carry its own weight, and the interface becomes easier to trust.'] },
    ],
  },
  {
    slug: 'from-messy-problem-to-clear-system',
    number: '02',
    title: 'From messy problem to clear system',
    excerpt: 'A small framework for understanding products before building their screens.',
    date: '06.01.2026',
    readTime: '5 min read',
    category: 'Product thinking',
    body: [
      { heading: 'Start with the day, not the feature list', paragraphs: ['A feature list tells you what a product contains. A day-in-the-life story tells you what the product needs to make possible.', 'For Victory Football, the useful starting point was the matchday itself: what has to be known, when it has to be known, and who needs to act.'] },
      { heading: 'Make the invisible visible', paragraphs: ['Good systems expose the state of a process. They show what is happening, what is blocked and what needs attention next. This is often more valuable than adding more functionality.'] },
      { heading: 'Build the smallest honest model', paragraphs: ['Before reaching for a complex architecture, I try to model the smallest version that explains the problem. If the model is clear, the interface usually has a better chance of being clear too.'] },
    ],
  },
  {
    slug: 'learning-ai-with-a-human-centre',
    number: '03',
    title: 'Learning AI with a human centre',
    excerpt: 'Notes from exploring how intelligent tools can support judgement without replacing it.',
    date: '22.11.2025',
    readTime: '4 min read',
    category: 'AI experiments',
    body: [
      { heading: 'The output is not the experience', paragraphs: ['An AI model can return a good answer and still create a poor product. The person using it needs context, confidence and a clear way to disagree.'] },
      { heading: 'Design the handoff', paragraphs: ['The most interesting part of an AI workflow is often the handoff between machine suggestion and human decision. That is where transparency, editing and responsibility need to live.'] },
      { heading: 'Keep asking what is useful', paragraphs: ['I am learning to judge an experiment less by how impressive the model feels and more by whether it gives someone a better next step.'] },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
