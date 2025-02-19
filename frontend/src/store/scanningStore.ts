import { create } from 'zustand';

interface ScanningState {
    scanning: boolean;
    scannedCodesStore: string[];
    enableScanning: () => void;
    disableScanning: () => void;
    disableScanningAndClearStore: () => void;
    setScannedCode: (code: string) => void;
}

const useScanningStore = create<ScanningState>((set) => ({
    scanning: false,
    scannedCodesStore: [],
    enableScanning: () => set({ scanning: true }),
    disableScanning: () => set({ scanning: false }),
    disableScanningAndClearStore: () => set({ scanning: false, scannedCodesStore: [] }),
    setScannedCode: (code: string) => set((state) => ({
        scannedCodesStore: [...state.scannedCodesStore, code]
    })),
}));

export default useScanningStore;
