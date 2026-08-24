# Daily puzzle research

## Source: LinkedIn Help — Zip
URL: https://www.linkedin.com/help/linkedin/answer/a7445030

LinkedIn describes Zip as a logic game where the player draws one path through the grid, connects numbered cells in ascending order and fills every cell. Walls between cells block movement. The official assistance model includes Hint, Undo and Clear. LinkedIn states that each game receives a new puzzle daily at midnight Pacific Time and the previous puzzle expires at that time.

## Source: LinkedIn Help — Wend
URL: https://www.linkedin.com/help/linkedin/answer/a6565995

LinkedIn describes Wend as a word-finding game where adjacent letters are connected horizontally or vertically to form hidden words. Every letter must be used exactly once, and words cannot overlap. The official assistance model includes Hint, Undo and Reset. The game presents rows showing how many words remain and the letter length of each word. LinkedIn states that each game receives a new puzzle daily at midnight Pacific Time and the previous puzzle expires at that time.

## Product adaptation decision

Signal Room will use a deterministic local date key rather than a server-generated random puzzle, so the same calendar day produces the same puzzle offline for every visitor using the same timezone policy. The first implementation will use UTC day boundaries for predictable static/PWA behavior and will label the experience as a daily local puzzle. The leaderboard will be clearly labeled as local-device best times until an authenticated backend is intentionally added; no fake global ranking will be shown.
