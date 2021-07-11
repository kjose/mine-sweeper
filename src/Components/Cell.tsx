import React from 'react';
import { CellStatus } from '../Domain/Cell';

type CellProps = {
    status: CellStatus;
    onclick: Function;
    adjacentBombsCellsNumber?: number;
};

export const getEmojis = (status: CellStatus, adjacentBombsCellsNumber?: number) => {
    const emojis = {
        untouched: '',
        dug: '',
        flagged: '🚩',
        detonated: '💥'
    };
    if (status === 'dug' && adjacentBombsCellsNumber !== 0) {
        return adjacentBombsCellsNumber;
    }
    return emojis[status];
};

const getBackgroundColor = (status: CellStatus): string => {
    switch (status) {
        case 'dug':
            return '#DEB887';
        case 'detonated':
            return '#000000';
        default:
            return '#90ee90';
    }
};

const cellStyle = (status: CellStatus): React.CSSProperties => ({
    width: '40px',
    height: '40px',
    textAlign: 'center',
    lineHeight: '40px',
    border: '1px solid black',
    boxSizing: 'border-box',
    cursor: 'pointer',
    backgroundColor: getBackgroundColor(status),
});

export const Cell: React.FunctionComponent<CellProps> = props => {
    const { status, adjacentBombsCellsNumber, onclick } = props;
    return (
        <div
            onClick={ev => {
                ev.preventDefault();
                onclick(ev);
            }}
            onContextMenu={ev => {
                ev.preventDefault();
                onclick(ev);
            }}
            style={cellStyle(status)}
        >
            {getEmojis(status, adjacentBombsCellsNumber)}
        </div>
    );
};
