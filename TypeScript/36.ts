function isValidSudoku(board: string[][]): boolean {
    const rows = new Set<string>();
    const columns = new Set<string>();  
    const boxes = new Set<string>();

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = board[i][j];
            if (cell !== '.') {
                const rowKey = `${i}-${cell}`;
                const colKey = `${j}-${cell}`;
                const boxKey = `${Math.floor(i / 3)}-${Math.floor(j / 3)}-${cell}`;

                if (rows.has(rowKey) || columns.has(colKey) || boxes.has(boxKey)) {
                    return false;
                }

                rows.add(rowKey);
                columns.add(colKey);
                boxes.add(boxKey);
            }
        }
    }

    return true;
};
