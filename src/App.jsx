import { useMemo } from 'react'
import 'hijri-date';
import DateRangePicker from './components/daterangepicker';
import TimeRangePicker from './components/timerangepicker';
import DaysOfWeekPicker from './components/daysofweek';
import { addDays } from 'date-fns';
import querySalaryByDate from './utils/querySalary';
import SalaryList from './components/salaryList';
import { calculateAnnualLeavePay, calculateHolidayPay, calculateSeverancePay, getAnnualLeaveDaysCount } from './utils/annualLeave';
import Ubgt from './components/ubgt';
import useApp from './hooks/useApp';
import SeverancePay from './components/severancePay';
import AnnualLeaveDays from './components/annualLeaveDays';
import useSalary from './hooks/useSalary';

const legalWeeklyWorkingLimit = 45 * 60 * 60;

function App() {
  const {
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
    ubgtDates,
    paidAnnualLeaveDays,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setSelectedDays,
  } = useApp();
  const { salaries } = useSalary();



  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleDayChange = (day, time, isExist) => {
    let sDays = [...selectedDays].filter((d) => d.day.name !== day.name);
    if (isExist) {
      sDays = [...sDays, { day, time }];
    }
    setSelectedDays(sDays);
  };

  const weeklyWorkingTime = useMemo(() => selectedDays.reduce((accumulator, currentValue) => accumulator + currentValue.time, 0), [selectedDays]);

  const weeklyExtraOvertime = useMemo(() => Math.round(Number(((weeklyWorkingTime - legalWeeklyWorkingLimit) / 60 / 60)) * 10) / 10, [weeklyWorkingTime]);

  const totalExtraOvertimeWage = useMemo(() => {
    const dailyOvertime = weeklyExtraOvertime / selectedDays.length;
    let totalOvertimeWage = 0;
    for (let date = startDate; date < endDate; date = addDays(date, 1)) {
      const hasWorkOnDate = selectedDays.findIndex((s) => s.day.dayIndex === date.getDay()) > -1;
      if (hasWorkOnDate) {
        const salary = querySalaryByDate(date);
        if (!salary) {
          console.error(`${date.toLocaleDateString('tr-TR')} tarihi için ücret bulunamadı ve hesaplanmadı`)
          continue;
        }
        const salaryPerHour = salary.gross_salary / 225;
        const overtimeSalaryPerHour = salaryPerHour * 1.5;
        const dailyOvertimeWage = overtimeSalaryPerHour * dailyOvertime;
        totalOvertimeWage += dailyOvertimeWage;
      }
    }
    return totalOvertimeWage;
  }, [weeklyExtraOvertime, selectedDays, startDate, endDate]);

  const totalUbgtWage = useMemo(() => {
    if (ubgtDates.length === 0 || selectedDays.length === 0) {
      return 0;
    }
    const averageDailyWorkingHour = (weeklyWorkingTime / selectedDays.length) / 60 / 60;

    let ubgtWage = 0;
    ubgtDates.forEach((ubgt) => {
      ubgtWage += calculateHolidayPay(ubgt.date, addDays(ubgt.date, 1), salaries, averageDailyWorkingHour);
    });
    return ubgtWage;
  }, [ubgtDates, weeklyWorkingTime, selectedDays, salaries]);

  const totalPaidAnnualLeaveDayWage = useMemo(() => {
    if (paidAnnualLeaveDays < 1) {
      return 0;
    }

    return calculateAnnualLeavePay(endDate, salaries, paidAnnualLeaveDays);

  }, [paidAnnualLeaveDays, endDate, salaries]);

  const severancePayWage = useMemo(() => {
    if (!includedSeverancePay) {
      return 0;
    }
    return calculateSeverancePay(startDate, endDate, querySalaryByDate(endDate, salaries)?.gross_salary);
  }, [includedSeverancePay, startDate, endDate, salaries, querySalaryByDate,])

  return (
    <div className="min-h-screen container mx-auto grid grid-cols-12 md:divide-x md:divide-gray-500">
      <div className="col-span-full md:col-span-9 grid grid-cols-12 max-h-screen overflow-y-auto p-2">
        {/* <h6 className="text-2xl font-bold text-center col-span-full">Ek Mesai Hesaplama</h6> */}
        <div className="col-span-full">
          <div className="flex justify-center items-center">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              disabled={false}
            />
          </div>
          <div className="mt-2 flex justify-center items-center">
            <TimeRangePicker
              startTime={startTime}
              endTime={endTime}
              onStartTimeChange={handleStartTimeChange}
              onEndTimeChange={handleEndTimeChange}
              disabled={false}
            />
          </div>
          <div className="mt-2">
            <DaysOfWeekPicker
              selectedDays={selectedDays}
              onDayChange={handleDayChange}
              defaultWorkingTime={workingTime}
              defaultEndTime={endTime}
              defaultStartTime={startTime}
            />
          </div>
          <div className="mt-2">
            <SalaryList
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
        <div className="col-span-full">
          <div className='flex flex-col justify-start items-start text-left'>
            {selectedDays.length > 0 && (
              <p className="text-sm">Seçilen çalışma günleri: {selectedDays.map(sd => sd.day.name).join(', ')}</p>
            )}
            {startTime && endTime && (
              <>
                <p className="text-sm">Seçilen genel mesai saati aralığı : {startTime} - {endTime}</p>
                {
                  workingTime && selectedDays.length > 0 && (
                    <p className="text-sm">Mesai süresi ortalama günlük : {Math.round(Number(((weeklyWorkingTime / selectedDays.length) / 60 / 60)) * 10) / 10} saat</p>
                  )
                }
                {
                  selectedDays.length > 0 && (
                    <>
                      <p className="text-sm">Mesai süresi haftalık : {Math.round(Number((weeklyWorkingTime / 60 / 60)) * 10) / 10} saat</p>
                      {
                        weeklyWorkingTime > legalWeeklyWorkingLimit && (
                          <p className="text-sm text-red-600">{`Haftalık çalışma süresi yasal limitin ${weeklyExtraOvertime} saat üzerinde`}  </p>
                        )
                      }
                    </>
                  )
                }
              </>
            )}
            {
              startDate && endDate && (
                <p className="text-sm">Seçilen Tarih Aralığı: {startDate.toLocaleDateString('tr-TR', { dateStyle: 'full' })} - {endDate.toLocaleDateString('tr-TR', { dateStyle: 'full' })}</p>
              )
            }
          </div>
        </div>
      </div>
      <div className="col-span-full md:col-span-3 px-2 py-1">
        {startDate && endDate && (
          <div className="">
            <div className="p-1 border border-gray-300" >
              <p className="text-sm mt-2">Toplam gün sayısı: {totalDays} gün</p>
              <p className="text-sm">Toplam hafta sayısı: {totalWeeks} hafta</p>
              <p className="text-sm">Hafta içi gün sayısı: {weekdays.length} gün</p>
              <p className="text-sm">Hafta sonu gün sayısı: {weekends.length} gün</p>
            </div>
            <Ubgt
              holidays={holidays}
              relioginalHolidays={relioginalHolidays}
            />
            <AnnualLeaveDays />
            <SeverancePay />
            {
              ubgtDates.length > 0 ? (
                <div className="text-md underline flex justify-between">
                  UBGT ücreti
                  {' '}
                  <span className='text-md font-bold'>{totalUbgtWage.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'try', style: 'currency' })}</span>
                </div>
              ) : null
            }
            {
              paidAnnualLeaveDays > 0 ? (
                <div className="text-md underline flex justify-between">
                  Yıılık izin alacağı ücreti
                  {' '}
                  <span className='text-md font-bold'>{totalPaidAnnualLeaveDayWage.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'try', style: 'currency' })}</span>
                </div>
              ) : null
            }

            {
              totalExtraOvertimeWage && totalExtraOvertimeWage > 0 ? (
                <p className="text-md underline flex justify-between">
                  Ek mesai ücreti
                  {' '}
                  <span className='text-md font-bold'>{totalExtraOvertimeWage.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'try', style: 'currency' })}</span>
                </p>
              ) : null
            }
            {
              includedSeverancePay ? (
                <p className="text-md underline flex justify-between">
                  Kıdem Tazminatı
                  {' '}
                  <span className='text-md font-bold'>{severancePayWage.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'try', style: 'currency' })}</span>
                </p>
              ) : null
            }
            {
              (includedSeverancePay || totalExtraOvertimeWage > 0 || paidAnnualLeaveDays > 0 || ubgtDates.length > 0) ? (
                <div className="w-full" >
                  <span className="block  text-xl font-medium" >+</span>
                  <span className="block w-full border border-black"></span>
                  <div className="mt-2 flex justify-between  items-center">
                    <span className="text-xl font-medium">Toplam</span>
                    <span className=" text-xl font-medium">
                      {
                        (severancePayWage + totalUbgtWage + totalExtraOvertimeWage + totalPaidAnnualLeaveDayWage).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'try', style: 'currency' })
                      }
                    </span>
                  </div>
                </div>
              ) : null
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default App
