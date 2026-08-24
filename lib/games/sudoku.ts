export const SUDOKU_SOLUTION = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9],
];
export const SUDOKU_PUZZLE = SUDOKU_SOLUTION.map((row, rowIndex) => row.map((value, colIndex) => ((rowIndex + colIndex * 2) % 3 === 0 || rowIndex === colIndex) ? value : 0));
export type SudokuState = { values: number[][]; fixed: boolean[][] };
export const createSudokuState = (): SudokuState => ({ values: SUDOKU_PUZZLE.map((row) => [...row]), fixed: SUDOKU_PUZZLE.map((row) => row.map(Boolean)) });
export const sudokuIsComplete = (state: SudokuState) => state.values.every((row, rowIndex) => row.every((value, colIndex) => value === SUDOKU_SOLUTION[rowIndex][colIndex]));
export function sudokuValueIsValid(state: SudokuState, row: number, col: number, value: number) {
  if (!Number.isInteger(row) || !Number.isInteger(col) || row < 0 || row >= 9 || col < 0 || col >= 9 || !Number.isInteger(value) || value < 0 || value > 9 || state.fixed[row][col]) return false;
  if (value === 0) return true;
  return state.values[row].every((item, index) => index === col || item !== value) && state.values.every((line, index) => index === row || line[col] !== value) && Array.from({ length: 3 }, (_, boxRow) => Array.from({ length: 3 }, (_, boxCol) => state.values[Math.floor(row / 3) * 3 + boxRow][Math.floor(col / 3) * 3 + boxCol])).flat().every((item, index) => item !== value || (Math.floor(index / 3) === row % 3 && index % 3 === col % 3));
}
export function setSudokuValue(state: SudokuState, row: number, col: number, value: number): SudokuState { if (!sudokuValueIsValid(state, row, col, value)) return state; const values = state.values.map((line) => [...line]); values[row][col] = value; return { ...state, values }; }
