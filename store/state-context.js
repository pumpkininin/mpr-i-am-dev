import { createContext } from 'react';

export const StateContext = createContext({
        playedTime: 0,
        lastAccess: new Date(),
        playerInfo: {}
    }
)