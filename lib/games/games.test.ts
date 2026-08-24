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
