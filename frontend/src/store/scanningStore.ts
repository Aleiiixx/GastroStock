import { create } from 'zustand';
import useDatabaseStore from './databaseStore';
import { toast } from 'react-toastify';

interface ScanningState {
    scanning: boolean;
    scannedCodesStore: string[];
    enableScanning: () => void;
    disableScanning: () => void;
    disableScanningAndClearStore: () => void;
    setScannedCode: (code: string) => void;
}

const useScanningStore = create<ScanningState>((set, get) => ({
    scanning: false,
    scannedCodesStore: [],

    enableScanning: () => set({ scanning: true }),
    disableScanning: () => set({ scanning: false }),
    disableScanningAndClearStore: () => set({ scanning: false, scannedCodesStore: [] }),

    setScannedCode: (code: string) => {
        const { scannedCodesStore } = get();
        const products = useDatabaseStore((state: any) => state.data.Product);

        const product = products.find((element: any) => element.barcode === code);

        if (product) {
            set({ scannedCodesStore: [...scannedCodesStore, code] });
            toast.success("Producto encontrado en la base de datos")
        } else {
            toast.error("Producto no encontrado en la base de datos")
        }

        console.log("✅ Código escaneado:", code);
    },
}));

export default useScanningStore;
