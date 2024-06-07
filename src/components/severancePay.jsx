import { useState } from "react";
import useApp from "../hooks/useApp";
import Modal from "./modal";

function SeverancePay() {
  const { includedSeverancePay, setIncludedSeverancePay } = useApp();

  return (
    <>
      <div className="flex items-center mb-4 mt-1">
        <input
          id="checkbox"
          checked={includedSeverancePay}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={(e) => {
            setIncludedSeverancePay(e.target.checked);
          }}
        />
        <label htmlFor="checkbox" className="select-none ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kıdem tazminatını ekle</label>
      </div>
    </>
  )
}

export default SeverancePay;