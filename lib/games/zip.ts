import { dailyIndex, getDailyKey, type DailyScore } from './daily';

export type ZipCell = { row: number; col: number };

export type ZipPuzzle = {
  id: string;
  dayKey: string;
  size: 5;
  path: ZipCell[];
  markers: Record<string, number>;
  walls: string[];
};

export type ZipState = {
  puzzle: ZipPuzzle;
  path: ZipCell[];
  mistakes: number;
  hintsUsed: number;
  lastHint: ZipCell | null;
  complete: boolean;
};

const PATHS: ZipCell[][] = [snakePath(), columnSnakePath()];

export function getDailyZipPuzzle(dayKey = getDailyKey()): ZipPuzzle {
  const index = dailyIndex(dayKey, 'zip', PATHS.length);
  const path = PATHS[index].map(cloneCell);
  const markers: Record<string, number> = {};
  [0, 5, 10, 15, 20].forEach((pathIndex, markerIndex) => { markers[cellKey(path[pathIndex])] = markerIndex + 1; });
  return { id: `zip-${dayKey}-${index + 1}`, dayKey, size: 5, path, markers, walls: [] };
}

export function createZipState(puzzle = getDailyZipPuzzle()): ZipState {
  return { puzzle, path: [], mistakes: 0, hintsUsed: 0, lastHint: null, complete: false };
}

export function isZipCellValid(cell: ZipCell, size = 5): boolean {
  return Number.isInteger(cell.row) && Number.isInteger(cell.col) && cell.row >= 0 && cell.col >= 0 && cell.row < size && cell.col < size;
}

export function areZipCellsAdjacent(left: ZipCell, right: ZipCell): boolean {
  return Math.abs(left.row - right.row) + Math.abs(left.col - right.col) === 1;
}

export function zipWallKey(left: ZipCell, right: ZipCell): string {
  const points = [`${left.row}:${left.col}`, `${right.row}:${right.col}`].sort();
  return points.join('|');
}

export function canZipMove(state: ZipState, cell: ZipCell): boolean {
  if (!isZipCellValid(cell, state.puzzle.size) || state.path.some((used) => cellKey(used) === cellKey(cell))) return false;
  if (state.path.length === 0) return state.puzzle.markers[cellKey(cell)] === 1;
  const previous = state.path[state.path.length - 1];
  if (!areZipCellsAdjacent(previous, cell) || state.puzzle.walls.includes(zipWallKey(previous, cell))) return false;
  const marker = state.puzzle.markers[cellKey(cell)];
  const nextMarker = getNextZipMarker(state);
  return marker === undefined || marker === nextMarker;
}

export function submitZipCell(state: ZipState, cell: ZipCell): ZipState {
  if (state.complete) return state;
  if (!canZipMove(state, cell)) return { ...state, mistakes: state.mistakes + 1, lastHint: null };
  const path = [...state.path, cloneCell(cell)];
  return { ...state, path, lastHint: null, complete: path.length === state.puzzle.path.length };
}

export function undoZip(state: ZipState): ZipState {
  if (state.complete || state.path.length === 0) return state;
  return { ...state, path: state.path.slice(0, -1), lastHint: null };
}

export function clearZip(state: ZipState): ZipState {
  if (state.path.length === 0 && state.mistakes === 0 && state.hintsUsed === 0) return state;
  return { ...state, path: [], mistakes: 0, hintsUsed: 0, lastHint: null, complete: false };
}

export function applyZipHint(state: ZipState): ZipState {
  if (state.complete) return state;
  const nextCell = state.puzzle.path[state.path.length];
  if (!nextCell) return state;
  return { ...state, hintsUsed: state.hintsUsed + 1, lastHint: cloneCell(nextCell) };
}

export function getZipCompletionScore(state: ZipState, timeMs: number): DailyScore | null {
  if (!state.complete) return null;
  return { game: 'zip', dayKey: state.puzzle.dayKey, timeMs: Math.max(0, Math.round(timeMs)), hints: state.hintsUsed, completedAt: new Date().toISOString() };
}

function getNextZipMarker(state: ZipState): number {
  const markerCount = Object.keys(state.puzzle.markers).length;
  const passed = Object.values(state.puzzle.markers).filter((marker) => state.path.some((cell) => state.puzzle.markers[cellKey(cell)] === marker)).length;
  return Math.min(markerCount, passed + 1);
}

function snakePath(): ZipCell[] {
  return Array.from({ length: 5 }, (_, row) => {
    const columns = Array.from({ length: 5 }, (_, col) => ({ row, col }));
    return row % 2 === 0 ? columns : columns.reverse();
  }).flat();
}

function columnSnakePath(): ZipCell[] {
  return Array.from({ length: 5 }, (_, col) => {
    const rows = Array.from({ length: 5 }, (_, row) => ({ row, col }));
    return col % 2 === 0 ? rows : rows.reverse();
  }).flat();
}

function cloneCell(cell: ZipCell): ZipCell { return { row: cell.row, col: cell.col }; }
function cellKey(cell: ZipCell): string { return `${cell.row}:${cell.col}`; }
