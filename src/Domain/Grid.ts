import { Cell, CellAction } from './Cell';

export type Cells = Array<Cell>;

export class Grid {
    [key: number]: number;
    public _column: number;
    public _cells: Cells;
    private _minesCount: number;

    static generate(row: number, column: number, minesCount: number): Grid {
        const length = row * column;
        let cells: Cells = [];
        for (let i = 0; i < length; i++) {
            const cell = minesCount > i ? Cell.withBomb() : Cell.withoutBomb();
            cells.push(cell);
        }

        let index = -1;
        while (++index < length) {
            const rand = index + Math.floor(Math.random() * (length - index));
            const cell = cells[rand];

            cells[rand] = cells[index];
            cells[index] = cell;
        }
console.log(cells);
        return new Grid(column, cells, minesCount);
    }

    constructor(column: number, cells: Cells, minesCount: number) {
        if (!Number.isInteger(column)) {
            throw new TypeError('column count must be an integer');
        }

        if (cells.length % column !== 0 || cells.length === 0) {
            throw new RangeError(
                'cell count must be dividable by column count'
            );
        }

        this._column = column;
        this._cells = cells;
        this._minesCount = minesCount;
    }

    [Symbol.iterator]() {
        return this._cells[Symbol.iterator]();
    }

    map(
        callbackfn: (value: Cell, index: number, array: Cell[]) => {},
        thisArg?: any
    ) {
        return this._cells.map(callbackfn);
    }

    cellByIndex(index: number): Cell | undefined {
        return this._cells[index];
    }

    cellByCoordinates(x: number, y: number): Cell | undefined {
        return this._cells[this._column * y + x];
    }

    sendActionToCell(cellIndex: number, action: CellAction): Grid {
        const cells = [...this._cells];
        const cell = cells[cellIndex];

        const { name, adjacentBombsCellsNumber } = action;
        cells[cellIndex] = cell[name](adjacentBombsCellsNumber);
        return new Grid(this._column, cells, this._minesCount);
    }

    isDefeated = () => {
        for (let cell of this) {
            if (cell.detonated === true) return true;
        }
        return false;
    };

    isVictorious = () => {
        // Number of dig cells and flagged
        const flagsNumber = this._cells.filter((cell) => cell.dug === false && cell.flagged === true).length;
        // Number of dig cells and unflagged
        let digNumber = this._cells.filter((cell) => cell.dug === false && cell.flagged === false).length;

        for (let cell of this) {
            if (cell.detonated === true || flagsNumber > this._minesCount ||
                ((digNumber + flagsNumber) > this._minesCount)) {
                return false;
            }
        }
        return true;
    };

    get column() {
        return this._column;
    }
}
