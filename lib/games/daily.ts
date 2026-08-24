export type DailyGameId = 'wend' | 'zip';

export type DailyScore = {
  game: DailyGameId;
  dayKey: string;
  timeMs: number;
  hints: number;
  completedAt: string;
};

const STORAGE_KEY = 'signal-room-daily-scores-v1';
const MAX_SCORES = 50;

export function getDailyKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function formatDailyDate(dayKey: string): string {
  const date = new Date(`${dayKey}T00:00:00.000Z`);
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

export function formatDuration(timeMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(timeMs / 1000));
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const tenths = Math.floor((Math.max(0, timeMs) % 1000) / 100);
  return `${minutes}:${seconds}.${tenths}`;
}

export function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function dailyIndex(dayKey: string, game: DailyGameId, length: number): number {
  if (length <= 0) return 0;
  return hashSeed(`${game}:${dayKey}`) % length;
}

export function loadDailyScores(game: DailyGameId, dayKey: string): DailyScore[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is DailyScore => isDailyScore(item) && item.game === game && item.dayKey === dayKey)
      .sort(compareScores)
      .slice(0, 5);
  } catch {
    return [];
  }
}

export function saveDailyScore(score: DailyScore): DailyScore[] {
  if (typeof window === 'undefined') return [score];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const scores = Array.isArray(parsed) ? parsed.filter(isDailyScore) : [];
    const samePuzzle = scores.filter((item) => item.game === score.game && item.dayKey === score.dayKey);
    const best = [...samePuzzle, score].sort(compareScores)[0];
    const next = [...scores.filter((item) => !(item.game === score.game && item.dayKey === score.dayKey)), best]
      .sort(compareScores)
      .slice(0, MAX_SCORES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next.filter((item) => item.game === score.game && item.dayKey === score.dayKey).sort(compareScores).slice(0, 5);
  } catch {
    return [score];
  }
}

export function compareScores(left: DailyScore, right: DailyScore): number {
  return left.timeMs - right.timeMs || left.hints - right.hints || left.completedAt.localeCompare(right.completedAt);
}

function isDailyScore(value: unknown): value is DailyScore {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (item.game === 'wend' || item.game === 'zip') && typeof item.dayKey === 'string' && typeof item.timeMs === 'number' && Number.isFinite(item.timeMs) && typeof item.hints === 'number' && Number.isFinite(item.hints) && typeof item.completedAt === 'string';
}
