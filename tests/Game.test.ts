import { Cell } from '../src/Domain/Cell';
import { Grid } from '../src/Domain/Grid';

describe('Rules', () => {
    test('a new game is neither lost or won', () => {
        const grid = Grid.generate(1, 1, 0);
        expect(grid.isDefeated()).toBe(false);
        expect(grid.isVictorious()).toBe(false);
    });

    test('a game is lost if a cell with a bomb has been dug', () => {
        const cellWithBomb = Cell.withBomb();
        const grid = new Grid(1, [cellWithBomb], 1);
        expect(grid.isDefeated()).toBe(false);
        expect(grid.isVictorious()).toBe(false);

        const gridDetonated = grid.sendActionToCell(0, {
            name: 'dig',
            adjacentBombsCellsNumber: 0
        });

        expect(gridDetonated.isDefeated()).toBe(true);
        expect(gridDetonated.isVictorious()).toBe(false);
    });

    test('a game is won if every cell without bomb has been dug and number of flags is less than bombs', () => {
        const cellWithoutBomb = Cell.withoutBomb();
        const grid = new Grid(1, [cellWithoutBomb], 0);
        expect(grid.isDefeated()).toBe(false);
        expect(grid.isVictorious()).toBe(false);

        const gridFlagged = grid.sendActionToCell(0, {
            name: 'flag',
            adjacentBombsCellsNumber: undefined
        });

        expect(gridFlagged.isDefeated()).toBe(false);
        expect(gridFlagged.isVictorious()).toBe(false);

        const gridDug = grid.sendActionToCell(0, {
            name: 'dig',
            adjacentBombsCellsNumber: 0
        });

        expect(gridDug.isDefeated()).toBe(false);
        expect(gridDug.isVictorious()).toBe(true);
    });
});
