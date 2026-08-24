export type CaroMark = 'X' | 'O' | null;
export type CaroResult = 'X' | 'O' | 'draw' | null;
export const CARO_SIZE = 9;
export const CARO_TARGET = 5;

export type CaroState = {
  board: CaroMark[];
  turn: Exclude<CaroMark, null>;
  result: CaroResult;
  moves: number;
};

export const createCaroState = (): CaroState => ({ board: Array(CARO_SIZE * CARO_SIZE).fill(null), turn: 'X', result: null, moves: 0 });

export function getCaroWinner(board: CaroMark[], lastIndex?: number): CaroResult {
  const indexes = lastIndex === undefined ? board.map((mark, index) => mark ? index : -1).filter((index) => index >= 0) : [lastIndex];
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
  for (const index of indexes) {
    const mark = board[index]; if (!mark) continue;
    const row = Math.floor(index / CARO_SIZE); const col = index % CARO_SIZE;
    for (const [dr, dc] of directions) {
      let count = 1;
      for (const sign of [-1, 1]) { let r = row + dr * sign; let c = col + dc * sign; while (r >= 0 && r < CARO_SIZE && c >= 0 && c < CARO_SIZE && board[r * CARO_SIZE + c] === mark) { count += 1; r += dr * sign; c += dc * sign; } }
      if (count >= CARO_TARGET) return mark;
    }
  }
  return board.every(Boolean) ? 'draw' : null;
}

export function playCaroMove(state: CaroState, index: number, mark = state.turn): CaroState {
  if (state.result || !Number.isInteger(index) || index < 0 || index >= state.board.length || state.board[index]) return state;
  const board = [...state.board]; board[index] = mark;
  const result = getCaroWinner(board, index);
  return { board, result, moves: state.moves + 1, turn: mark === 'X' ? 'O' : 'X' };
}

export function chooseCaroBotMove(board: CaroMark[], bot: Exclude<CaroMark, null> = 'O') {
  const human = bot === 'O' ? 'X' : 'O';
  const free = board.map((mark, index) => mark ? -1 : index).filter((index) => index >= 0);
  const winningMove = (mark: Exclude<CaroMark, null>) => free.find((index) => { const next = [...board]; next[index] = mark; return getCaroWinner(next, index) === mark; });
  const nearCenter = [...free].sort((a, b) => Math.abs(40 - a) - Math.abs(40 - b));
  return winningMove(bot) ?? winningMove(human) ?? nearCenter.find((index) => board[index - 1] || board[index + 1]) ?? nearCenter[0];
}
