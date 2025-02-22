import { create } from 'zustand';

// Definimos la estructura de los datos en tiempo real
interface DatabaseState {
  data: Record<string, any>; // Almacena la información por colección
  setData: (newData: Record<string, any>) => void; // Función para actualizar los datos
}

// Creamos el store con Zustand
const useDatabaseStore = create<DatabaseState>((set) => ({
  data: {}, // Inicialmente vacío
  setData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
}));

export default useDatabaseStore;
