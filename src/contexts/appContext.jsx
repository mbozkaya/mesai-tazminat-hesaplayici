import { createContext, useEffect, useMemo, useState } from "react";
import 'hijri-date';
import { getHolidays, getRelioginalHoliday, getWeekdaysAndWeekends } from "../utils/holiday";
import { differenceInDays, differenceInWeeks } from "date-fns";
import { getAnnualLeaveDaysCount } from "../utils/annualLeave";

const AppContext = createContext({
  startDate: null,
  endDate: null,
  holidays: [],
  relioginalHolidays: [],
  weekdays: [],
  weekends: [],
  totalDays: 0,
  totalWeeks: 0,
  startTime: '8:30',
  endTime: '17:30',
  workingTime: null,
  selectedDays: [],
  includedSeverancePay: false,
  annualLeaveDays: 0,
  paidAnnualLeaveDays: [],
  ubgtDates: [],
  setStartDate: () => { },
  setEndDate: () => { },
  setHolidays: () => { },
  setRelioginalHolidays: () => { },
  setWeekdays: () => { },
  setWeekends: () => { },
  setTotalDays: () => { },
  setTotalWeeks: () => { },
  setStartTime: () => { },
  setEndTime: () => { },
  setWorkingTime: () => { },
  setSelectedDays: () => { },
  setIncludedSeverancePay: () => { },
  setPaidAnnualLeaveDays: () => { },
  setUbgtDates: () => { },
});

const AppProvider = ({ children }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [relioginalHolidays, setRelioginalHolidays] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const [weekends, setWeekends] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [totalWeeks, setTotalWeeks] = useState(0);

  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('17:30');
  const [workingTime, setWorkingTime] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [includedSeverancePay, setIncludedSeverancePay] = useState(false);
  const [paidAnnualLeaveDays, setPaidAnnualLeaveDays] = useState([]);
  const [ubgtDates, setUbgtDates] = useState([]);


  useEffect(() => {
    if (startDate && endDate) {
      const calculatedHolidays = getHolidays(startDate, endDate);
      const calculatedRelioginalHolidays = getRelioginalHoliday(startDate, endDate);
      const { weekdays: calculatedWeekdays, weekends: calculatedWeekends } = getWeekdaysAndWeekends(startDate, endDate);

      const daysDifference = differenceInDays(endDate, startDate) + 1;
      const weeksDifference = differenceInWeeks(endDate, startDate) + 1;

      setHolidays(calculatedHolidays);
      setWeekdays(calculatedWeekdays);
      setWeekends(calculatedWeekends);
      setTotalDays(daysDifference);
      setTotalWeeks(weeksDifference);
      setRelioginalHolidays(calculatedRelioginalHolidays);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startTime && endTime) {
      const [startHour, startMinutes] = startTime.split(':');
      const [endHour, endMinutes] = endTime.split(':');
      const totalSeconds = (60 * (endHour - startHour) + (endMinutes - startMinutes)) * 60;
      setWorkingTime(totalSeconds <= 0 ? (24 * 60 * 60) + totalSeconds : totalSeconds);
    }
  }, [startTime, endTime]);


  useEffect(() => {
    setSelectedDays((prev) =>
      prev.map((d) => ({
        ...d,
        time: workingTime
      })))
  }, [workingTime]);

  const annualLeaveDays = useMemo(() => {
    if (startDate && endDate) {
      return getAnnualLeaveDaysCount(startDate, endDate);
    }
    return 0;
  }, [startDate, endDate]);

  return (
    <AppContext.Provider
      value={{
        startDate,
        endDate,
        holidays,
        relioginalHolidays,
        weekdays,
        weekends,
        totalDays,
        totalWeeks,
        startTime,
        endTime,
        workingTime,
        selectedDays,
        includedSeverancePay,
        annualLeaveDays,
        paidAnnualLeaveDays, 
        ubgtDates,
        setStartDate,
        setEndDate,
        setHolidays,
        setRelioginalHolidays,
        setWeekdays,
        setWeekends,
        setTotalDays,
        setTotalWeeks,
        setStartTime,
        setEndTime,
        setWorkingTime,
        setSelectedDays,
        setIncludedSeverancePay,
        setPaidAnnualLeaveDays,
        setUbgtDates,
      }}
    >
      {children}
    </AppContext.Provider>
  )
};

export { AppContext, AppProvider }