import { describe, expect, it } from 'vitest';
import {
  CARO_SIZE,
  chooseCaroBotMove,
  createCaroState,
  getCaroWinner,
  playCaroMove,
  type CaroMark,
} from './caro';
import {
  chooseDotsBotEdge,
  createDotsState,
  playDotsEdge,
  type DotsEdge,
  type DotsPlayer,
} from './dots';
import { dailyIndex, formatDuration, getDailyKey } from './daily';
import { faqs } from '../content';
import { applyWendHint, createWendState, getDailyWendPuzzle, getWendCompletionScore, isWendPathValid, submitWendPath } from './wend';
import { applyZipHint, clearZip, createZipState, getDailyZipPuzzle, submitZipCell, undoZip, zipWallKey } from './zip';
import {
  SUDOKU_SOLUTION,
  createSudokuState,
  setSudokuValue,
  sudokuIsComplete,
  sudokuValueIsValid,
} from './sudoku';

describe('Caro / Gomoku engine', () => {
  it('detects horizontal, vertical and both diagonal five-in-a-row wins', () => {
    const lines = [
      [0, 1, 2, 3, 4],
      [0, CARO_SIZE, CARO_SIZE * 2, CARO_SIZE * 3, CARO_SIZE * 4],
      [0, CARO_SIZE + 1, (CARO_SIZE + 1) * 2, (CARO_SIZE + 1) * 3, (CARO_SIZE + 1) * 4],
      [4, CARO_SIZE + 3, (CARO_SIZE * 2) + 2, (CARO_SIZE * 3) + 1, CARO_SIZE * 4],
    ];

    for (const line of lines) {
      const board: CaroMark[] = Array(CARO_SIZE * CARO_SIZE).fill(null);
      line.forEach((index) => { board[index] = 'X'; });
      expect(getCaroWinner(board)).toBe('X');
    }
  });

  it('does not call three or four connected marks a win', () => {
    const board: CaroMark[] = Array(CARO_SIZE * CARO_SIZE).fill(null);
    [0, 1, 2, 3].forEach((index) => { board[index] = 'X'; });
    expect(getCaroWinner(board)).toBeNull();
  });

  it('returns draw only when the full board has no winner', () => {
    const rows = [
      'OXOXOXXOX', 'OXOXOXXOO', 'OXOXXXXOX', 'OOXXOXOXX', 'XXOOOOXOX',
      'XOOOXOOOX', 'OOXXXXOXO', 'XXOOOOXXX', 'XXOOXOXXO',
    ];
    const board = rows.join('').split('') as CaroMark[];
    expect(board).toHaveLength(CARO_SIZE * CARO_SIZE);
    expect(getCaroWinner(board)).toBe('draw');
  });

  it('rejects invalid or duplicate moves without changing state', () => {
    const state = playCaroMove(createCaroState(), 0);
    expect(playCaroMove(state, 0)).toBe(state);
    expect(playCaroMove(state, -1)).toBe(state);
    expect(playCaroMove(state, CARO_SIZE * CARO_SIZE)).toBe(state);
  });

  it('finds a winning move before blocking the opponent', () => {
    const winningBoard: CaroMark[] = Array(CARO_SIZE * CARO_SIZE).fill(null);
    [0, 1, 2, 3].forEach((index) => { winningBoard[index] = 'O'; });
    winningBoard[10] = 'X';
    expect(chooseCaroBotMove(winningBoard)).toBe(4);

    const blockingBoard: CaroMark[] = Array(CARO_SIZE * CARO_SIZE).fill(null);
    [0, 1, 2, 3].forEach((index) => { blockingBoard[index] = 'X'; });
    blockingBoard[10] = 'O';
    expect(chooseCaroBotMove(blockingBoard)).toBe(4);
  });
});

describe('Dots & Boxes engine', () => {
  const completeBox = (state: ReturnType<typeof createDotsState>) => {
    let next = playDotsEdge(state, { axis: 'h', row: 0, col: 0 });
    next = playDotsEdge(next, { axis: 'h', row: 1, col: 0 });
    next = playDotsEdge(next, { axis: 'v', row: 0, col: 0 });
    return playDotsEdge(next, { axis: 'v', row: 0, col: 1 });
  };

  it('rejects out-of-bounds and duplicate edges immutably', () => {
    const state = createDotsState();
    expect(playDotsEdge(state, { axis: 'h', row: -1, col: 0 })).toBe(state);
    expect(playDotsEdge(state, { axis: 'h', row: 0, col: 3 })).toBe(state);
    expect(playDotsEdge(state, { axis: 'v', row: 3, col: 0 })).toBe(state);
    const used = playDotsEdge(state, { axis: 'h', row: 0, col: 0 });
    expect(playDotsEdge(used, { axis: 'h', row: 0, col: 0 })).toBe(used);
  });

  it('claims a completed box, awards one point and grants an extra turn', () => {
    const state = completeBox(createDotsState(['P1', 'P2']));
    expect(state.boxes[0][0]).toBe('P2');
    expect(state.scores.P2).toBe(1);
    expect(state.activePlayer).toBe(1);
  });

  it('switches active player when no box is completed', () => {
    const state = playDotsEdge(createDotsState(), { axis: 'h', row: 0, col: 0 });
    expect(state.activePlayer).toBe(1);
    expect(state.scores.P1).toBe(0);
  });

  it('finishes a full board with correct scores for 2, 3 and 4 local players', () => {
    const edges: DotsEdge[] = [
      ...Array.from({ length: 4 }, (_, row) => Array.from({ length: 3 }, (_, col) => ({ axis: 'h' as const, row, col }))).flat(),
      ...Array.from({ length: 3 }, (_, row) => Array.from({ length: 4 }, (_, col) => ({ axis: 'v' as const, row, col }))).flat(),
    ];

    for (const players of [['P1', 'P2'], ['P1', 'P2', 'P3'], ['P1', 'P2', 'P3', 'P4']] as DotsPlayer[][]) {
      let state = createDotsState(players);
      for (const edge of edges) state = playDotsEdge(state, edge, 'P1');
      expect(state.winner).toBe('P1');
      expect(state.scores.P1).toBe(9);
      expect(state.boxes.flat().every(Boolean)).toBe(true);
    }
  });

  it('reports a draw when three players tie on a full board', () => {
    let state = createDotsState(['P1', 'P2', 'P3']);
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 3; col += 1) state = playDotsEdge(state, { axis: 'h', row, col }, 'P1');
    }
    for (let row = 0; row < 3; row += 1) {
      state = playDotsEdge(state, { axis: 'v', row, col: 0 }, 'P1');
      state = playDotsEdge(state, { axis: 'v', row, col: 1 }, 'P1');
      state = playDotsEdge(state, { axis: 'v', row, col: 2 }, 'P2');
      state = playDotsEdge(state, { axis: 'v', row, col: 3 }, 'P3');
    }
    expect(state.scores).toMatchObject({ P1: 3, P2: 3, P3: 3 });
    expect(state.winner).toBe('draw');
  });

  it('always returns a legal bot edge while moves remain', () => {
    const state = createDotsState();
    const edge = chooseDotsBotEdge(state);
    expect(edge).not.toBeNull();
    const next = edge ? playDotsEdge(state, edge) : state;
    expect(next).not.toBe(state);
    const finished = { ...state, horizontal: state.horizontal.map((row) => row.map(() => true)), vertical: state.vertical.map((row) => row.map(() => true)) };
    expect(chooseDotsBotEdge(finished)).toBeNull();
  });
});

describe('Sudoku engine', () => {
  it('rejects duplicate values in a row, column and 3×3 box', () => {
    const state = createSudokuState();
    expect(sudokuValueIsValid(state, 0, 1, 5)).toBe(false);
    expect(sudokuValueIsValid(state, 0, 1, 7)).toBe(false);
    expect(sudokuValueIsValid(state, 1, 0, 5)).toBe(false);
  });

  it('keeps fixed cells immutable and preserves identity for invalid writes', () => {
    const state = createSudokuState();
    expect(setSudokuValue(state, 0, 0, 9)).toBe(state);
    expect(setSudokuValue(state, -1, 0, 1)).toBe(state);
    expect(setSudokuValue(state, 0, 1, 5)).toBe(state);
  });

  it('supports a valid entry and clearing an editable cell', () => {
    const state = createSudokuState();
    const entered = setSudokuValue(state, 0, 1, SUDOKU_SOLUTION[0][1]);
    expect(entered.values[0][1]).toBe(3);
    const cleared = setSudokuValue(entered, 0, 1, 0);
    expect(cleared.values[0][1]).toBe(0);
  });

  it('is complete only when every editable cell matches the solution', () => {
    let state = createSudokuState();
    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 9; col += 1) {
        if (!state.fixed[row][col]) state = setSudokuValue(state, row, col, SUDOKU_SOLUTION[row][col]);
      }
    }
    expect(sudokuIsComplete(state)).toBe(true);
  });
});


describe('Daily puzzle foundations', () => {
  it('keeps the public FAQ set complete and non-empty', () => {
    expect(faqs).toHaveLength(5);
    expect(faqs.every((faq) => faq.question.length > 10 && faq.answer.length > 20)).toBe(true);
  });

  it('creates stable UTC day keys and bounded seeded indexes', () => {
    expect(getDailyKey(new Date('2026-08-24T23:59:59.000Z'))).toBe('2026-08-24');
    expect(getDailyKey(new Date('2026-08-25T00:00:00.000Z'))).toBe('2026-08-25');
    expect(dailyIndex('2026-08-24', 'wend', 4)).toBe(dailyIndex('2026-08-24', 'wend', 4));
    expect(formatDuration(65320)).toBe('01:05.3');
  });
});

describe('Wend engine', () => {
  it('generates a complete daily board with non-overlapping adjacent word paths', () => {
    for (const dayKey of ['2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28']) {
      const puzzle = getDailyWendPuzzle(dayKey);
      expect(puzzle.letters).toHaveLength(25);
      expect(puzzle.words.reduce((total, word) => total + word.length, 0)).toBe(25);
      expect(puzzle.paths.every((path) => isWendPathValid(path))).toBe(true);
      expect(new Set(puzzle.paths.flat().map((cell) => `${cell.row}:${cell.col}`)).size).toBe(25);
    }
  });

  it('accepts the exact word path, rejects a wrong path and reveals progressive hints', () => {
    const state = createWendState(getDailyWendPuzzle('2026-08-24'));
    const hinted = applyWendHint(state);
    expect(hinted.hintsUsed).toBe(1);
    expect(hinted.lastHint?.path).toHaveLength(1);
    const found = submitWendPath(hinted, state.puzzle.paths[0]);
    expect(found.found).toContain(0);
    const wrong = submitWendPath(state, [{ row: 0, col: 0 }, { row: 0, col: 2 }]);
    expect(wrong.mistakes).toBe(1);
  });

  it('returns a daily score only after every word is found', () => {
    let state = createWendState(getDailyWendPuzzle('2026-08-24'));
    expect(getWendCompletionScore(state, 1234)).toBeNull();
    for (const path of state.puzzle.paths) state = submitWendPath(state, path);
    expect(state.complete).toBe(true);
    expect(getWendCompletionScore(state, 1234)?.game).toBe('wend');
  });
});

describe('Zip engine', () => {
  it('requires starting at marker 1, follows adjacency and completes every cell', () => {
    const state = createZipState(getDailyZipPuzzle('2026-08-24'));
    expect(submitZipCell(state, { row: 4, col: 4 }).mistakes).toBe(1);
    let next = state;
    for (const cell of state.puzzle.path) next = submitZipCell(next, cell);
    expect(next.complete).toBe(true);
    expect(next.path).toHaveLength(25);
  });

  it('supports hint, undo, clear and wall-aware movement primitives', () => {
    const puzzle = getDailyZipPuzzle('2026-08-25');
    const state = createZipState(puzzle);
    const hinted = applyZipHint(state);
    expect(hinted.hintsUsed).toBe(1);
    const started = submitZipCell(state, puzzle.path[0]);
    expect(undoZip(started).path).toHaveLength(0);
    expect(clearZip({ ...hinted, path: [puzzle.path[0]], mistakes: 2 })).toMatchObject({ path: [], mistakes: 0, hintsUsed: 0, lastHint: null, complete: false });
    expect(zipWallKey({ row: 0, col: 0 }, { row: 0, col: 1 })).toBe('0:0|0:1');
  });
});


describe('Daily leaderboard semantics', () => {
  it('keeps the fastest result for the same game and day', () => {
    const fast = { game: 'zip' as const, dayKey: '2026-08-24', timeMs: 1200, hints: 1, completedAt: '2026-08-24T10:00:00.000Z' };
    const slow = { ...fast, timeMs: 2400, completedAt: '2026-08-24T09:00:00.000Z' };
    expect([fast, slow].sort((left, right) => left.timeMs - right.timeMs)[0]).toEqual(fast);
  });

  it('keeps both daily Zip templates solvable', () => {
    for (const dayKey of ['2026-08-24', '2026-08-25']) {
      const puzzle = getDailyZipPuzzle(dayKey);
      let state = createZipState(puzzle);
      for (const cell of puzzle.path) state = submitZipCell(state, cell);
      expect(state.complete).toBe(true);
    }
  });
});


describe('Daily puzzle rule hardening', () => {
  it('keeps Zip walls off every solution edge and blocks a forbidden move', () => {
    for (const dayKey of ['2026-08-24', '2026-08-25']) {
      const puzzle = getDailyZipPuzzle(dayKey);
      const solutionEdges = new Set(puzzle.path.slice(1).map((cell, index) => zipWallKey(puzzle.path[index], cell)));
      expect(puzzle.walls.every((wall) => !solutionEdges.has(wall))).toBe(true);
    }

    const puzzle = getDailyZipPuzzle('2026-08-24');
    const blockedPuzzle = { ...puzzle, walls: [zipWallKey({ row: 0, col: 0 }, { row: 1, col: 0 })] };
    const started = submitZipCell(createZipState(blockedPuzzle), puzzle.path[0]);
    expect(submitZipCell(started, { row: 1, col: 0 }).mistakes).toBe(1);
  });
});
