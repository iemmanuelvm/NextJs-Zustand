import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface Bear {
    id: number;
    name: string;
}

interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;
    bears: Bear[];
    totalBears: () => number;
    increaseBlackBears: (by: number) => void;
    increasePolarBears: (by: number) => void;
    increasePandaBears: (by: number) => void;
    doNothing: () => void;
    addBear: () => void;
    clearBear: () => void;
}

const storeApi: StateCreator<BearState, [["zustand/immer", never]]> = (set, get) => ({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,
    bears: [{ id: 1, name: 'Oso #1' }],
    totalBears: () => {
        return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
    },
    increaseBlackBears: (by: number) => set(state => ({ blackBears: state.blackBears + by })),
    increasePolarBears: (by: number) => set(state => ({ polarBears: state.polarBears + by })),
    increasePandaBears: (by: number) => set(state => ({ pandaBears: state.pandaBears + by })),
    doNothing: () => set(state => ({ bears: [...state.bears] })),
    addBear: () => set(state => ({
        bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }]
    })),
    clearBear: () => set({ bears: [] }),
});

export const useBearStore = create<BearState>()(
    devtools(
        persist(
            immer(
                storeApi
            ),
            { name: 'bears-store' }
        )
    )
);
