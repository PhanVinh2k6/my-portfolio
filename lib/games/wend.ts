import { dailyIndex, getDailyKey, type DailyScore } from './daily';

export type WendCell = { row: number; col: number };

export type WendPuzzle = {
  id: string;
  dayKey: string;
  size: 5;
  letters: string[];
  words: string[];
  paths: WendCell[][];
};

export type WendState = {
  puzzle: WendPuzzle;
  found: number[];
  hintsUsed: number;
  mistakes: number;
  lastHint: { wordIndex: number; path: WendCell[] } | null;
  complete: boolean;
};

const WORD_SETS = [
  ['CAT', 'TONE', 'SHELF', 'BRIDGE', 'PATTERN'],
  ['MAP', 'ECHO', 'QUIET', 'SYSTEM', 'PROCESS'],
  ['SUN', 'MINT', 'LOGIC', 'DESIGN', 'SIGNALS'],
  ['RAY', 'WAVE', 'NORTH', 'STUDIO', 'CONTEXT'],
  ['OWL', 'MIND', 'BRAVE', 'CIRCLE', 'INSIGHT'],
  ['JOY', 'CALM', 'CRAFT', 'NOTICE', 'MOMENTS'],
  ['AIR', 'GLOW', 'TRUST', 'CREATE', 'BALANCE'],
  ['INK', 'SOFT', 'BUILD', 'SIMPLE', 'CURATED'],
];

const SNAKE_PATH: WendCell[] = Array.from({ length: 5 }, (_, row) => {
  const columns = Array.from({ length: 5 }, (_, col) => ({ row, col }));
  return row % 2 === 0 ? columns : columns.reverse();
}).flat();

export function getDailyWendPuzzle(dayKey = getDailyKey()): WendPuzzle {
  const words = WORD_SETS[dailyIndex(dayKey, 'wend', WORD_SETS.length)];
  let offset = 0;
  const paths = words.map((word) => {
    const path = SNAKE_PATH.slice(offset, offset + word.length).map(cloneCell);
    offset += word.length;
    return path;
  });
  const letters = Array(25).fill('');
  words.forEach((word, wordIndex) => paths[wordIndex].forEach((cell, cellIndex) => { letters[cell.row * 5 + cell.col] = word[cellIndex]; }));
  return { id: `wend-${dayKey}-${dailyIndex(dayKey, 'wend', WORD_SETS.length) + 1}`, dayKey, size: 5, letters, words, paths };
}

export function createWendState(puzzle = getDailyWendPuzzle()): WendState {
  return { puzzle, found: [], hintsUsed: 0, mistakes: 0, lastHint: null, complete: false };
}

export function isWendCellValid(cell: WendCell, size = 5): boolean {
  return Number.isInteger(cell.row) && Number.isInteger(cell.col) && cell.row >= 0 && cell.col >= 0 && cell.row < size && cell.col < size;
}

export function isWendPathValid(path: WendCell[], size = 5): boolean {
  if (path.length === 0 || path.some((cell) => !isWendCellValid(cell, size))) return false;
  const seen = new Set<string>();
  return path.every((cell, index) => {
    const key = cellKey(cell);
    if (seen.has(key)) return false;
    seen.add(key);
    if (index === 0) return true;
    const previous = path[index - 1];
    return Math.abs(previous.row - cell.row) + Math.abs(previous.col - cell.col) === 1;
  });
}

export function getWendWord(puzzle: WendPuzzle, path: WendCell[]): string | null {
  if (!isWendPathValid(path, puzzle.size)) return null;
  const key = pathKey(path);
  const wordIndex = puzzle.paths.findIndex((solution) => pathKey(solution) === key);
  return wordIndex >= 0 ? puzzle.words[wordIndex] : null;
}

export function submitWendPath(state: WendState, path: WendCell[]): WendState {
  if (state.complete || !isWendPathValid(path, state.puzzle.size)) return state.mistakes === state.mistakes + 1 ? state : { ...state, mistakes: state.mistakes + 1, lastHint: null };
  const wordIndex = state.puzzle.paths.findIndex((solution) => pathKey(solution) === pathKey(path));
  if (wordIndex < 0 || state.found.includes(wordIndex)) return { ...state, mistakes: state.mistakes + 1, lastHint: null };
  const found = [...state.found, wordIndex].sort((left, right) => left - right);
  return { ...state, found, lastHint: null, complete: found.length === state.puzzle.words.length };
}

export function applyWendHint(state: WendState): WendState {
  if (state.complete) return state;
  const wordIndex = state.puzzle.paths.findIndex((_, index) => !state.found.includes(index));
  if (wordIndex < 0) return state;
  const path = state.puzzle.paths[wordIndex];
  const previousLength = state.lastHint?.wordIndex === wordIndex ? state.lastHint.path.length : 0;
  return { ...state, hintsUsed: state.hintsUsed + 1, lastHint: { wordIndex, path: path.slice(0, Math.min(path.length, previousLength + 1)).map(cloneCell) } };
}

export function isWendCellUsed(state: WendState, cell: WendCell): boolean {
  return state.found.some((wordIndex) => state.puzzle.paths[wordIndex].some((pathCell) => cellKey(pathCell) === cellKey(cell)));
}

export function getWendCompletionScore(state: WendState, timeMs: number): DailyScore | null {
  if (!state.complete) return null;
  return { game: 'wend', dayKey: state.puzzle.dayKey, timeMs: Math.max(0, Math.round(timeMs)), hints: state.hintsUsed, completedAt: new Date().toISOString() };
}

function cloneCell(cell: WendCell): WendCell { return { row: cell.row, col: cell.col }; }
function cellKey(cell: WendCell): string { return `${cell.row}:${cell.col}`; }
function pathKey(path: WendCell[]): string { return path.map(cellKey).join('|'); }
