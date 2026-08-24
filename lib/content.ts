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
    slug: 'atlas-knowledge',
    number: '03',
    title: 'Atlas Knowledge',
    eyebrow: 'Web product',
    category: 'Product systems',
    visual: 'crm',
    shortDescription: 'A calm knowledge workspace for turning scattered research into connected decisions.',
    description: 'Atlas Knowledge is a concept for a personal research workspace that makes notes, references and decisions easier to revisit.',
    year: '2026',
    role: 'Product direction, UX system, frontend prototype',
    stack: ['Next.js', 'TypeScript', 'Local-first', 'Search'],
    challenge: 'Research tends to disappear into tabs, bookmarks and half-finished documents. Atlas asks how a knowledge tool can preserve context instead of only collecting content.',
    approach: ['Capture a thought without interrupting the work.', 'Connect notes through decisions, not just tags.', 'Keep the interface useful when the network is unavailable.'],
    outcome: 'A product direction for a resilient research workspace with quick capture, connected context and an intentionally quiet reading surface.',
    accent: 'blue',
  },
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
    slug: 'shipping-small-products-in-public',
    number: '04',
    title: 'Shipping small products in public',
    excerpt: 'What changes when you let a real release teach you more than a perfect plan.',
    date: '14.03.2026',
    readTime: '4 min read',
    category: 'Building in public',
    body: [
      { heading: 'A release is a question', paragraphs: ['I used to think shipping was the final step of building. Now I see it as the first useful question: does this help someone enough to come back?', 'A small release creates a tighter loop between an idea and the people who have to live with it.'] },
      { heading: 'Keep the surface small', paragraphs: ['The best early version is not the one with the fewest ideas. It is the one that makes one promise clearly and gives you enough signal to improve the next version.', 'That usually means choosing a narrow workflow, writing down the assumptions and resisting the urge to hide uncertainty behind polish.'] },
      { heading: 'Build a rhythm', paragraphs: ['Small products become stronger when they have a rhythm: observe, decide, ship, listen. The loop is more important than any single launch.'] },
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


export type Capability = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const capabilities: Capability[] = [
  {
    number: '01',
    title: 'Product direction',
    description: 'Từ một bài toán mơ hồ đến một hướng sản phẩm có thể giải thích, thử nghiệm và xây dựng.',
    bullets: ['Problem framing', 'User flows', 'Information architecture'],
  },
  {
    number: '02',
    title: 'Frontend systems',
    description: 'Những giao diện có cấu trúc rõ, phản hồi tốt và đủ bền để không sụp đổ sau màn hình đầu tiên.',
    bullets: ['React / Next.js', 'Design systems', 'Responsive craft'],
  },
  {
    number: '03',
    title: 'AI & experiments',
    description: 'Thử nghiệm công nghệ mới với một câu hỏi con người cụ thể, thay vì chạy theo hiệu ứng trình diễn.',
    bullets: ['Human-centred AI', 'Prototypes', 'Local-first thinking'],
  },
];

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Frame the real question', description: 'Làm rõ bối cảnh, người dùng và điều cần trở nên đúng trước khi nói về màn hình.' },
  { number: '02', title: 'Make the system visible', description: 'Chuyển những quyết định, trạng thái và ưu tiên ẩn thành một cấu trúc có thể cùng nhìn thấy.' },
  { number: '03', title: 'Prototype the useful part', description: 'Xây một lát cắt đủ thật để kiểm tra hành vi, nội dung và cảm giác sử dụng sớm.' },
  { number: '04', title: 'Ship with room to grow', description: 'Giữ nền tảng nhẹ, dễ hiểu và có khoảng trống để sản phẩm tiếp tục học sau khi phát hành.' },
];
