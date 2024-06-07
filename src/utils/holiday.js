// src/utils/holidays.js
import { eachDayOfInterval } from 'date-fns';
import { isWeekend } from 'date-fns';
import { addDays } from 'date-fns';
import HijriDate from 'hijri-date/lib/safe';

// Fixed holidays in Gregorian calendar
const fixedHolidays = [
  '01-01', // New Year's Day
  '04-23', // National Sovereignty and Children's Day
  '05-01', // İşçi bayramı
  '05-19', // Commemoration of Atatürk, Youth and Sports Day
  '08-30', // Victory Day
  '10-29', // Republic Day
];

const hijriToGregorian = (hijriYear, hijriMonth, hijriDay) => {
  const hijriDate = new HijriDate(hijriYear, hijriMonth, hijriDay);
  return hijriDate.toGregorian();
};

const calculateRamadanFeast = (year) => {
  const ramadanStart = hijriToGregorian(year , 9, 1); // 1st Ramadan of the year
  const ramadanEnd = hijriToGregorian(year, 10, 1); // End of Ramadan
  return [
    ramadanEnd, // Ramadan Feast 1st day
    addDays(ramadanEnd, 1), // Ramadan Feast 2nd day
    addDays(ramadanEnd, 2), // Ramadan Feast 3rd day
  ];
};

const calculateSacrificeFeast = (year) => {
  const sacrificeStart = hijriToGregorian(year, 12, 10); // 10th Dhu al-Hijjah
  return [
    sacrificeStart, // Eid al-Adha 1st day
    addDays(sacrificeStart, 1), // Eid al-Adha 2nd day
    addDays(sacrificeStart, 2), // Eid al-Adha 3rd day
    addDays(sacrificeStart, 3), // Eid al-Adha 4th day
  ];
};

const getHolidays = (startDate, endDate) => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  let holidays = [];

  for (let year = startYear; year <= endYear; year++) {
    // Fixed holidays
    fixedHolidays.forEach((date) => {
      holidays.push(new Date(`${year}-${date}`));
    });
    if(year>= 2016){
      holidays.push(new Date(`${year}-07-15`));

    }
  }

  return holidays.filter((holiday) => holiday >= startDate && holiday <= endDate);
};

const getRelioginalHoliday =(startDate, endDate)=>{
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  let holidays = [];

  for (let year = startYear; year <= endYear; year++) {
    const newYearGreg = new Date(`${year}-01-01`)
    const nowHijri = newYearGreg.toHijri();
    // Movable holidays
    holidays = holidays.concat(calculateRamadanFeast(nowHijri._year));
    holidays = holidays.concat(calculateSacrificeFeast(nowHijri._year));
  }
  return holidays.filter((holiday) => holiday >= startDate && holiday <= endDate);
}

const getWeekdaysAndWeekends = (startDate, endDate) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekdays = days.filter((day) => !isWeekend(day));
  const weekends = days.filter((day) => isWeekend(day));
  return { weekdays, weekends };
};

export { getHolidays, getWeekdaysAndWeekends , calculateSacrificeFeast, calculateRamadanFeast, getRelioginalHoliday};
