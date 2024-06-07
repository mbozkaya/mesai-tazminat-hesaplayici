import { useEffect, useState } from "react";
import useApp from "../hooks/useApp"
import Modal from "./modal";

function AnnualLeaveDays() {
  const { annualLeaveDays, paidAnnualLeaveDays, setPaidAnnualLeaveDays } = useApp();
  const [open, setOpen] = useState(false);
  const [selectedAnnualLeaveDay, setSelectedAnnualLeaveDay] = useState(1);

  const onSubmit = () => {
    if (selectedAnnualLeaveDay > 0 && selectedAnnualLeaveDay <= annualLeaveDays) {
      setPaidAnnualLeaveDays(selectedAnnualLeaveDay);
      setOpen(false);
    }
  };

  useEffect(() => {
    setSelectedAnnualLeaveDay(paidAnnualLeaveDays);
   }, [open])
  return (
    <>
      <div className={`mt-1 ${annualLeaveDays > 0 ? 'p-1 w-full border border-dashed border-gray-500' : ''}`}>
        <p className={`text-sm`}>Hak edilen toplam yıllık izin gün sayısı: {annualLeaveDays} gün</p>
        {
          annualLeaveDays > 0 ? <span
            className="text-xs hover:underline text-blue-600 cursor-pointer"
            onClick={() => { setOpen(true); }}
          >
            {paidAnnualLeaveDays > 0 ? 'Yıllık izin alacağını düzenle' : 'Yıllık izin alacağı ekle'}
          </span> : null
        }
      </div>
      <Modal
        open={open}
        onClose={() => { setOpen(false); }}
        successLabel="Kaydet"
        onSuccess={onSubmit}
      >
        <div className="">
          <span className="text-sm">{`Toplam kullanılabilir izin hakkınız:`} <b>{annualLeaveDays}</b> Gün </span>
          <div>
            <label htmlFor="Number" className="select-none text-sm font-medium text-gray-900 dark:text-gray-300">Alacaklı olduğunuz izin sayısı </label>
            <input
              id="number"
              type="number"
              className={`block w-full p-2 text-gray-900 border rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${selectedAnnualLeaveDay <= 0 || selectedAnnualLeaveDay > annualLeaveDays ? 'border-red-500' : 'border-gray-300'}`}
              onChange={(e) => {
                setSelectedAnnualLeaveDay(e.target.value);
              }}
              placeholder={`en az 1 en fazla ${annualLeaveDays} gün olabilir`}
              step={1}
              min={1}
              max={annualLeaveDays}
              value={selectedAnnualLeaveDay}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AnnualLeaveDays;