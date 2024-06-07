import querySalaryByDate from "./querySalary";

function calculateAnnualLeavePay(endDate, salaryData, remainingLeaveDays) {
  const salary =  querySalaryByDate(endDate, salaryData);
  const dailyRate = salary.gross_salary / 30;
  const totalAnnualLeavePay = dailyRate * remainingLeaveDays;
  return totalAnnualLeavePay;
}


function getAnnualLeaveDaysCount(startDate, endDate){
  const employmentDurationInYears = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);

  let totalLeaveDays = 0;
  for (let index = 0; index < employmentDurationInYears; index++) {
    if(index ===0 ){
      continue;
    }
    if (index < 5) {
      totalLeaveDays += 14;
  } else if (index < 15) {
      totalLeaveDays += 20;
  } else {
      totalLeaveDays += 26;
  }  
  }
  return totalLeaveDays;  
}

function calculateSeverancePay(startDate, endDate, lastGrossSalary) {
  const employmentDurationInYears = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
  console.log({employmentDurationInYears, lastGrossSalary})
  return  employmentDurationInYears * lastGrossSalary;
}

function calculateHolidayPay(startDate, endDate, salaryData, holidayHours) {
  let totalHolidayPay = 0;

  salaryData.forEach(period => {
      const periodStartDate = new Date(period.start_date);
      const periodEndDate = new Date(period.end_date);

      if (startDate <= periodEndDate && endDate >= periodStartDate) {
          const grossSalary = period.gross_salary;
          const hourlyRate = grossSalary / 225;
          const holidayRate = hourlyRate * 2;
          totalHolidayPay += holidayRate * holidayHours;
      }
  });

  return totalHolidayPay;
}



export {calculateAnnualLeavePay, getAnnualLeaveDaysCount, calculateSeverancePay, calculateHolidayPay}