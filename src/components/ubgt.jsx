import { useEffect, useState } from "react";
import Modal from "./modal";
import { compareAsc } from "date-fns";
import useApp from "../hooks/useApp";

function DateSelection({ date, explanation, onSelected, isSelected, isPublicHoliday }) {
  return (
    <div className={`col-span-full mb-2 p-2 border rounded-md ${isSelected ? 'bg-blue-300' : (isPublicHoliday ? 'bg-white' : 'bg-neutral-100')} shadow-sm`}>
      <strong className="text-sm">{new Date(date).toLocaleString('tr-TR', { dateStyle: 'full' })} </strong>
      <span className="block text-xs">{explanation}</span>
      <div className="flex justify-end items-center w-full">
        <button
          className="text-xs bg-gray-200 p-1 rounded-md text-black"
          onClick={onSelected}
        >
          {isSelected ? 'Seçimi kaldır' : 'Seç'}
        </button>
      </div>
    </div>
  )
}

function Ubgt(props) {
  const { holidays, relioginalHolidays } = props;
  const { ubgtDates, setUbgtDates } = useApp();
  const [selectedUbgt, setSelectedUbgt] = useState([]);
  const [open, setOpen] = useState(false);

  let mergedModel = [...holidays, ...relioginalHolidays].sort(compareAsc);
  mergedModel = mergedModel.map((d) => ({
    date: d,
    type: holidays.includes(d) ? 'public-holiday' : 'relioginal-holiday',
  }));

  const onSubmit = () => {
    setUbgtDates([...selectedUbgt]);
    setOpen(false);
  }

  useEffect(() => {
    setSelectedUbgt([...ubgtDates]);
  }, [open])

  return (
    <>
      <div className={`${holidays.length > 0 || relioginalHolidays.length > 0 ? 'p-1 border border-dashed border-gray-400' : ''} mt-1`}>
        <p className="text-sm">Resmi tatiller gün sayısı: {holidays.length} gün</p>
        <p className="text-sm">Dini tatiller gün sayısı: {relioginalHolidays.length} gün</p>
        {
          (holidays.length > 0 || relioginalHolidays.length > 0) && (
            <span
              className="text-xs hover:underline text-blue-600 cursor-pointer"
              onClick={() => { setOpen(true); }}
            >
              {ubgtDates.length > 0 ? 'UBGT alacaklarını düzenle' : 'UBGT alacağı ekle'}
            </span>
          )
        }
        {
          ubgtDates.length > 0 ? (
            <p className="text-xs font-bold">Toplam: {ubgtDates.length} gün UBGT olarak seçildi</p>
          ) : null
        }
      </div>
      <Modal
        open={open}
        onClose={() => { setOpen(false); }}
        successLabel="Kaydet"
        onSuccess={onSubmit}
      >
        <div className="grid grid-cols-12 gap-1 ">
          {
            mergedModel.map((model) => {
              const isExist = selectedUbgt.some((spd) => spd.date.getTime() === model.date.getTime());
              return (
                <DateSelection
                  key={model.date.getTime()}
                  date={model.date}
                  explanation={model.type === 'public-holiday' ? 'Resmi Tatil' : 'Bayram Tatili'}
                  isPublicHoliday={model.type === 'public-holiday'}
                  isSelected={isExist}
                  onSelected={() => {
                    let spd = [...selectedUbgt];
                    if (isExist) {
                      spd = spd.filter((sp) => sp.date.getTime() !== model.date.getTime());
                    } else {
                      spd.push(model);
                    }
                    setSelectedUbgt(spd);
                  }}
                />
              );
            })
          }
        </div>
      </Modal>
    </>
  )
}

export default Ubgt;
