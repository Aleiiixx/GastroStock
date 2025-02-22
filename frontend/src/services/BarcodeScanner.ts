import { useEffect, useState } from "react";
import useScanningStore from "../store/scanningStore";
import { toast } from "react-toastify";

const BarcodeScanner = () => {
  const { scanning, setScannedCode } = useScanningStore();
  const [buffer, setBuffer] = useState<string>("");

  useEffect(() => {
    if (!scanning) return;

    let timer: any;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && buffer.length > 3) {
        toast.success('scanner')
        setScannedCode(buffer);
        setBuffer("");
      } else if (event.key.length === 1) {
        setBuffer((prev) => prev + event.key);
        clearTimeout(timer);
        timer = setTimeout(() => setBuffer(""), 100); // Reinicia si no se escribe rápido
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [scanning, buffer, setScannedCode]);

  return null; // Sin parte visual, solo lógica
};

export default BarcodeScanner;
