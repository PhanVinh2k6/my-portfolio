export type DotsPlayer = 'P1' | 'P2' | 'P3' | 'P4';
export type DotsOwner = DotsPlayer | null;
export type DotsEdge = { axis: 'h' | 'v'; row: number; col: number };
export type DotsState = { size: number; horizontal: boolean[][]; vertical: boolean[][]; horizontalOwner: DotsOwner[][]; verticalOwner: DotsOwner[][]; boxes: DotsOwner[][]; players: DotsPlayer[]; activePlayer: number; scores: Record<DotsPlayer, number>; winner: DotsPlayer | 'draw' | null };

export const createDotsState = (players: DotsPlayer[] = ['P1', 'P2']): DotsState => ({ size: 3, horizontal: Array.from({ length: 4 }, () => Array(3).fill(false)), vertical: Array.from({ length: 3 }, () => Array(4).fill(false)), horizontalOwner: Array.from({ length: 4 }, () => Array<DotsOwner>(3).fill(null)), verticalOwner: Array.from({ length: 3 }, () => Array<DotsOwner>(4).fill(null)), boxes: Array.from({ length: 3 }, () => Array<DotsOwner>(3).fill(null)), players, activePlayer: 0, scores: players.reduce((scores, player) => ({ ...scores, [player]: 0 }), {} as Record<DotsPlayer, number>), winner: null });

export function isDotsBoxComplete(state: DotsState, row: number, col: number, horizontal = state.horizontal, vertical = state.vertical) {
  return horizontal[row][col] && horizontal[row + 1][col] && vertical[row][col] && vertical[row][col + 1];
}

export function playDotsEdge(state: DotsState, edge: DotsEdge, player = state.players[state.activePlayer]): DotsState {
  if (state.winner) return state;
  const horizontal = state.horizontal.map((row) => [...row]); const vertical = state.vertical.map((row) => [...row]); const horizontalOwner = state.horizontalOwner.map((row) => [...row]); const verticalOwner = state.verticalOwner.map((row) => [...row]);
  if (edge.axis === 'h') {
    if (!Number.isInteger(edge.row) || !Number.isInteger(edge.col) || edge.row < 0 || edge.row >= 4 || edge.col < 0 || edge.col >= 3 || horizontal[edge.row][edge.col]) return state;
    horizontal[edge.row][edge.col] = true; horizontalOwner[edge.row][edge.col] = player;
  } else {
    if (!Number.isInteger(edge.row) || !Number.isInteger(edge.col) || edge.row < 0 || edge.row >= 3 || edge.col < 0 || edge.col >= 4 || vertical[edge.row][edge.col]) return state;
    vertical[edge.row][edge.col] = true; verticalOwner[edge.row][edge.col] = player;
  }
  const boxes = state.boxes.map((row) => [...row]); let claimed = 0;
  boxes.forEach((row, boxRow) => row.forEach((owner, boxCol) => { if (!owner && isDotsBoxComplete(state, boxRow, boxCol, horizontal, vertical)) { boxes[boxRow][boxCol] = player; claimed += 1; } }));
  const scores = { ...state.scores, [player]: (state.scores[player] ?? 0) + claimed };
  const filled = boxes.flat().filter(Boolean).length;
  const maxScore = Math.max(...state.players.map((item) => scores[item] ?? 0));
  const leaders = state.players.filter((item) => scores[item] === maxScore);
  const winner = filled === 9 ? leaders.length === 1 ? leaders[0] : 'draw' : null;
  const current = state.players.indexOf(player);
  return { ...state, horizontal, vertical, horizontalOwner, verticalOwner, boxes, scores, winner, activePlayer: winner || claimed ? current : (current + 1) % state.players.length };
}

export function chooseDotsBotEdge(state: DotsState): DotsEdge | null {
  const free: DotsEdge[] = [...state.horizontal.flatMap((row, r) => row.map((taken, c) => taken ? null : ({ axis: 'h' as const, row: r, col: c }))).filter(Boolean) as DotsEdge[], ...state.vertical.flatMap((row, r) => row.map((taken, c) => taken ? null : ({ axis: 'v' as const, row: r, col: c }))).filter(Boolean) as DotsEdge[]];
  const scoresBox = (edge: DotsEdge) => { const current = state.players[state.activePlayer]; const next = playDotsEdge(state, edge, current); return next.scores[current] > state.scores[current]; };
  return free.find(scoresBox) ?? free[Math.floor(free.length / 2)] ?? null;
}
