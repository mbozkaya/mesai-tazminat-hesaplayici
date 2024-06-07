// src/components/DaysOfWeekPicker.jsx
import { useEffect, useRef, useState } from 'react';
import Modal from './modal';
import TimeRangePicker from './timerangepicker';

const daysOfWeek = [
  { name: 'Pazartesi', shortName: 'Pzt', dayIndex: 1, },
  { name: 'Salı', shortName: 'Sa', dayIndex: 2, },
  { name: 'Çarşamba', shortName: 'Çar', dayIndex: 3 },
  { name: 'Perşembe', shortName: 'Per', dayIndex: 4 },
  { name: 'Cuma', shortName: 'Cu', dayIndex: 5 },
  { name: 'Cumartesi', shortName: 'Cmt', dayIndex: 6 },
  { name: 'Pazar', shortName: 'Pz', dayIndex: 7 },
];

const WorkingTimeForm = ({ onSubmit, values, setValues, buttonRef }) => {

  const handleStartTimeChange = (event) => {
    setValues('startTime', event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setValues('endTime', event.target.value);
  };

  useEffect(() => {
    if (values.startTime && values.endTime) {
      const [startHour, startMinutes] = values.startTime.split(':');
      const [endHour, endMinutes] = values.endTime.split(':');
      const totalSeconds = (60 * (endHour - startHour) + (endMinutes - startMinutes)) * 60;
      setValues('workingTime', totalSeconds <= 0 ? (24 * 60 * 60) + totalSeconds : totalSeconds);
    }
  }, [values.startTime, values.endTime]);

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <input type="submit" ref={buttonRef} className='hidden' />
      <TimeRangePicker
        startTime={values.startTime}
        endTime={values.endTime}
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange}
        disabled={false}
      />
      {
        values.workingTime && (
          <p className="text-sm">Mesai süresi bugün için : {Math.round(Number((values.workingTime / 60 / 60)) * 10) / 10} saat</p>
        )
      }
    </form>
  )

};

const DaysOfWeek = ({ handleDayChange, day, isSelected, defaultWorkingTime, onDateChangeClick }) => {
  return (
    <div
      key={day.name}
      className={` select-none cursor-default flex flex-col items-center justify-between w-24 h-20 border border-gray-300 ${isSelected ? 'bg-blue-300' : ''}`}
      onClick={() => handleDayChange(day, defaultWorkingTime, !isSelected)}
    >
      <span className="text-gray-700 text-start">{day.name}</span>
      <span className="text-gray-700 text-xs">{`${Math.round(Number((defaultWorkingTime / 60 / 60)) * 10) / 10} saat`}</span>
      {
        isSelected && (
          <>
            <span
              className="hover:underline text-xs text-blue-600 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDateChangeClick();
              }}
            >
              Bugün için mesai süresini değiştir
            </span>
          </>
        )
      }
    </div>
  )
}

const DaysOfWeekPicker = ({ selectedDays, onDayChange, defaultWorkingTime, defaultStartTime, defaultEndTime }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();
  const [values, setValues] = useState({
    startTime: defaultStartTime,
    endTime: defaultEndTime,
    selectedDay: null,
    workingTime: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onDayChange(values.selectedDay, values.workingTime, true)
    setOpen(false);
  }


  return (
    <div>
      <label className="mb-2 text-sm font-medium text-gray-700">Haftanın Çalışılan Günleri</label>
      <div className="flex pt-2 flex-wrap">
        {daysOfWeek.map((day, index) => {
          const selectedDay = selectedDays.find((sd) => sd.day.dayIndex === index + 1);

          return (
            <DaysOfWeek
              key={day.name}
              handleDayChange={onDayChange}
              isSelected={!!selectedDay}
              defaultWorkingTime={selectedDay?.time ?? defaultWorkingTime}
              day={day}
              onDateChangeClick={() => {
                setOpen(true);
                setValues((prev) => ({
                  ...prev,
                  selectedDay: {
                    ...day,
                    dayIndex: index + 1,
                  }
                }));
              }}
            />
          );
        })}
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSuccess={() => {
          buttonRef.current.click();
        }}
      >
        <WorkingTimeForm
          onSubmit={handleSubmit}
          values={values}
          buttonRef={buttonRef}
          setValues={(key, value) => {
            setValues((prev) => ({
              ...prev,
              [key]: value,
            }));
          }}
        />
      </Modal>
    </div>
  );
};

export default DaysOfWeekPicker;
