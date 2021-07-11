import React from 'react';
import { GameContext } from '../GameContext';
import { Cell } from './Cell';
import { Game } from './Game';

export const getCoordinatesByIndex = (
    index: number,
    columnsCount: number
): { x: number; y: number } => {
    if (index < 0 || index > Math.pow(columnsCount, 2) - 1) {
        throw new Error('This cell is not in the grid');
    }
    const y = Math.floor(index / columnsCount);
    const x = index % columnsCount;
    return { x, y };
};

export const Grid: React.FunctionComponent = () => {
    const { grid, updateGridCellStatus } = React.useContext(GameContext);
    const columnsNumber = grid._column;

    const handleClick = (index: number, button: number) => {
        updateGridCellStatus(index,
            button === 0
                ? {
                    name: 'dig',
                    adjacentBombsCellsNumber: getAdjacentBombsCellsNumber(
                        index,
                        columnsNumber
                    )
                }
                : { name: 'flag', adjacentBombsCellsNumber: undefined }
        );
    };

    const getAdjacentBombsCellsNumber = (
        index: number,
        columnsNumber: number
    ): number => {
        const { x, y } = getCoordinatesByIndex(index, columnsNumber);
        console.log(index+' '+x+ ' ' + y);
        const adjacentCells = getAdjacentCells(x, y);
        console.log(adjacentCells);
        return adjacentCells.length;
    };

    const getAdjacentCells = (x: number, y: number) => {
        let adjacentCells = [];
        debugger;
        // Cell on the left
        if ((x - 1) >= 0) {
            const cell = grid.cellByCoordinates((x - 1), y);
            if (cell && cell?.dug === false && cell?.bomb === true) {
                adjacentCells.push(cell);
            }
        }
        // Cell on the right
        if ((x + 1) >= 0) {
            const cell = grid.cellByCoordinates((x + 1), y);
            if (cell && cell?.dug === false && cell?.bomb === true) {
                adjacentCells.push(cell);
            }
        }
        // Cell on the top
        if((y - 1) >= 0) {
            const cell = grid.cellByCoordinates(x, (y - 1));
            if (cell && cell?.dug === false && cell?.bomb === true) {
                adjacentCells.push(cell);
            }
        }
        // Cell on the left top diagonally
        if((x - 1) >= 0 && (y - 1) >= 0) {
            const cell = grid.cellByCoordinates((x - 1), (y - 1));
            if (cell && cell?.dug === false && cell?.bomb === true) {
                adjacentCells.push(cell);
            }
        }
        // Cell on the right top diagonally
        if((x + 1) >= 0 && (y - 1) >= 0) {
            const cell = grid.cellByCoordinates((x + 1), (y - 1));
            if (cell && cell?.dug === false && cell?.bomb === true) {
                adjacentCells.push(cell);
            }
        }
        // Cell on the bottom
        if((y + 1) >= 0) {
            const cell = grid.cellByCoordinates(x, (y + 1));
            if (cell && cell?.dug === false && cell?.bomb === true) {
                adjacentCells.push(cell);
            }
        }
        // Cell on the left bottom diagonally
        if((x - 1) >= 0 && (y + 1) >= 0) {
            const cell = grid.cellByCoordinates((x - 1), (y + 1));
            if (cell && cell?.dug === false && cell?.bomb === true) {
                adjacentCells.push(cell);
            }
        }
        // Cell on the right bottom diagonally
        if((x + 1) >= 0 && (y + 1) >= 0) {
            const cell = grid.cellByCoordinates((x + 1), (y + 1));
            if (cell && cell?.dug === false && cell?.bomb === true) {
                adjacentCells.push(cell);
            }
        }
        return adjacentCells;
    }

    const gameOver =
        (grid.isDefeated() && 'defeat') ||
        (grid.isVictorious() && 'victory') ||
        false;

    return (
        <React.Fragment>
            <Game gameOver={gameOver} />
            <div
                style={{
                    display: 'flex',
                    border: '1px solid black',
                    boxSizing: 'content-box',
                    flexWrap: 'wrap',
                    width: `calc(40px * ${grid.column})`,
                }}
            >
                {grid.map((cell, index) => (
                    <Cell
                        key={index}
                        status={cell.status}
                        adjacentBombsCellsNumber={
                            cell._adjacentBombsCellsNumber
                        }
                        onclick={(ev: MouseEvent) =>
                            handleClick(index, ev.button)
                        }
                    />
                ))}
            </div>
        </React.Fragment>
    );
};
