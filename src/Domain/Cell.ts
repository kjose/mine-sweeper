export type CellStatus = 'untouched' | 'flagged' | 'dug' | 'detonated';
export type CellAction = {
    name: 'dig' | 'flag';
    adjacentBombsCellsNumber?: number;
};

export class Cell {
    private _bomb: boolean;
    private _flagged: boolean;
    private _dug: boolean;
    public _adjacentBombsCellsNumber?: number;

    static withBomb(): Cell {
        return new Cell(true, false, false);
    }

    static withoutBomb(): Cell {
        return new Cell(false, false, false);
    }

    constructor(withBomb: boolean, flagged: boolean, dug: boolean,
                adjacentBombsCellsNumber?: number) {
        this._bomb = withBomb;
        this._flagged = flagged;
        this._dug = dug;
        this._adjacentBombsCellsNumber = adjacentBombsCellsNumber;
    }

    flag(): Cell {
        if (this._dug === true) {
            throw new Error('This cell has already been dug');
        }
        return new Cell(this._bomb, !this._flagged, this._dug);
    }

    dig(adjacentCellsWithBombsCount?: number): Cell {
        return new Cell(this._bomb, false, true, adjacentCellsWithBombsCount);
    }

    get detonated(): boolean {
        return this._bomb && this.dug;
    }

    get flagged(): boolean {
        return this._flagged;
    }

    get dug(): boolean {
        return this._dug;
    }

    get bomb(): boolean {
        return this._bomb;
    }

    get status(): CellStatus {
        if (this.detonated) {
            return 'detonated';
        }
        if (this.dug) {
            return 'dug';
        }
        if (this.flagged) {
            return 'flagged';
        }
        return 'untouched';
    }
}
