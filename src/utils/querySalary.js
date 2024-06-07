import { isAfter, isEqual } from "date-fns";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { isBefore } from "date-fns";

const salaries = [
    {
      "start_date": "1996-08-01",
      "end_date": "1997-07-31",
      "net_salary": 11339802,
      "gross_salary": 17010000,
      "employer_cost": 27570750
    },
    {
      "start_date": "1997-08-01",
      "end_date": "1998-07-31",
      "net_salary": 23474588,
      "gross_salary": 35437500,
      "employer_cost": 50144438
    },
    {
      "start_date": "1998-08-01",
      "end_date": "1998-09-30",
      "net_salary": 33808514,
      "gross_salary": 47839500,
      "employer_cost": 63718446
    },
    {
      "start_date": "1998-10-01",
      "end_date": "1998-12-31",
      "net_salary": 34573946,
      "gross_salary": 47839500,
      "employer_cost": 66060236
    },
    {
      "start_date": "1999-01-01",
      "end_date": "1999-06-30",
      "net_salary": 58948065,
      "gross_salary": 78075000,
      "employer_cost": 100764360
    },
    {
      "start_date": "1999-07-01",
      "end_date": "1999-08-15",
      "net_salary": 70222320,
      "gross_salary": 93600000,
      "employer_cost": 121393500
    },
    {
      "start_date": "1999-08-16",
      "end_date": "1999-12-31",
      "net_salary": 70110000,
      "gross_salary": 93600000,
      "employer_cost": 121393500
    },
    {
      "start_date": "2000-01-01",
      "end_date": "2000-03-31",
      "net_salary": 82417500,
      "gross_salary": 109800000,
      "employer_cost": 137922000
    },
    {
      "start_date": "2000-04-01",
      "end_date": "2000-05-31",
      "net_salary": 80550900,
      "gross_salary": 109800000,
      "employer_cost": 147972000
    },
    {
      "start_date": "2000-06-01",
      "end_date": "2000-06-30",
      "net_salary": 80550900,
      "gross_salary": 109800000,
      "employer_cost": 149982000
    },
    {
      "start_date": "2000-07-01",
      "end_date": "2000-12-31",
      "net_salary": 86922900,
      "gross_salary": 118800000,
      "employer_cost": 157542000
    },
    {
      "start_date": "2001-01-01",
      "end_date": "2001-03-31",
      "net_salary": 102369600,
      "gross_salary": 139950000,
      "employer_cost": 175308000
    },
    {
      "start_date": "2001-04-01",
      "end_date": "2001-06-30",
      "net_salary": 102369600,
      "gross_salary": 139950000,
      "employer_cost": 198408000
    },
    {
      "start_date": "2001-07-01",
      "end_date": "2001-07-31",
      "net_salary": 107323830,
      "gross_salary": 146947500,
      "employer_cost": 204285900
    },
    {
      "start_date": "2001-08-01",
      "end_date": "2001-12-31",
      "net_salary": 122186520,
      "gross_salary": 167940000,
      "employer_cost": 221919600
    },
    {
      "start_date": "2002-01-01",
      "end_date": "2002-03-31",
      "net_salary": 163563536,
      "gross_salary": 222000750,
      "employer_cost": 269760911
    },
    {
      "start_date": "2002-04-01",
      "end_date": "2002-06-30",
      "net_salary": 163563536,
      "gross_salary": 222000750,
      "employer_cost": 290123918
    },
    {
      "start_date": "2002-07-01",
      "end_date": "2002-12-31",
      "net_salary": 184251937,
      "gross_salary": 250875000,
      "employer_cost": 332881651
    },
    {
      "start_date": "2003-01-01",
      "end_date": "2003-03-31",
      "net_salary": 225999000,
      "gross_salary": 306000000,
      "employer_cost": 379667901
    },
    {
      "start_date": "2003-04-01",
      "end_date": "2003-06-30",
      "net_salary": 225999000,
      "gross_salary": 306000000,
      "employer_cost": 403581485
    },
    {
      "start_date": "2003-07-01",
      "end_date": "2003-12-31",
      "net_salary": 225999000,
      "gross_salary": 306000000,
      "employer_cost": 427275774
    },
    {
      "start_date": "2004-01-01",
      "end_date": "2004-06-30",
      "net_salary": 303079500,
      "gross_salary": 423000000,
      "employer_cost": 560164950
    },
    {
      "start_date": "2004-07-01",
      "end_date": "2004-12-31",
      "net_salary": 318233475,
      "gross_salary": 444150000,
      "employer_cost": 539642250
    },
    {
      "start_date": "2005-01-01",
      "end_date": "2005-12-31",
      "net_salary": 350.15,
      "gross_salary": 488.70,
      "employer_cost": 593.77
    },
    {
      "start_date": "2006-01-01",
      "end_date": "2006-12-31",
      "net_salary": 380.46,
      "gross_salary": 531.00,
      "employer_cost": 645.17
    },
    {
      "start_date": "2007-01-01",
      "end_date": "2007-06-30",
      "net_salary": 403.03,
      "gross_salary": 562.50,
      "employer_cost": 683.44
    },
    {
      "start_date": "2007-07-01",
      "end_date": "2007-12-31",
      "net_salary": 419.15,
      "gross_salary": 585.00,
      "employer_cost": 710.78
    },
    {
      "start_date": "2008-01-01",
      "end_date": "2008-06-30",
      "net_salary": 481.55,
      "gross_salary": 608.40,
      "employer_cost": 739.21
    },
    {
      "start_date": "2008-07-01",
      "end_date": "2008-12-31",
      "net_salary": 503.26,
      "gross_salary": 638.70,
      "employer_cost": 776.02
    },
    {
      "start_date": "2009-01-01",
      "end_date": "2009-06-30",
      "net_salary": 527.13,
      "gross_salary": 666.00,
      "employer_cost": 809.19
    },
    {
      "start_date": "2009-07-01",
      "end_date": "2009-12-31",
      "net_salary": 546.48,
      "gross_salary": 693.00,
      "employer_cost": 841.99
    },
    {
      "start_date": "2010-01-01",
      "end_date": "2010-06-30",
      "net_salary": 576.57,
      "gross_salary": 729.00,
      "employer_cost": 885.74
    },
    {
      "start_date": "2010-07-01",
      "end_date": "2010-12-31",
      "net_salary": 599.12,
      "gross_salary": 760.50,
      "employer_cost": 924.01
    },
    {
      "start_date": "2011-01-01",
      "end_date": "2011-02-28",
      "net_salary": 629.96,
      "gross_salary": 796.50,
      "employer_cost": 967.75
    },
    {
      "start_date": "2011-03-01",
      "end_date": "2011-06-30",
      "net_salary": 629.96,
      "gross_salary": 796.50,
      "employer_cost": 967.75
    },
    {
      "start_date": "2011-07-01",
      "end_date": "2011-12-31",
      "net_salary": 658.95,
      "gross_salary": 837.00,
      "employer_cost": 1016.95
    },
    {
      "start_date": "2012-01-01",
      "end_date": "2012-06-30",
      "net_salary": 701.13,
      "gross_salary": 886.50,
      "employer_cost": 1032.77
    },
    {
      "start_date": "2012-07-01",
      "end_date": "2012-12-31",
      "net_salary": 739.79,
      "gross_salary": 940.50,
      "employer_cost": 1095.68
    },
    {
      "start_date": "2013-01-01",
      "end_date": "2013-06-30",
      "net_salary": 773.01,
      "gross_salary": 978.60,
      "employer_cost": 1140.07
    },
    {
      "start_date": "2013-07-01",
      "end_date": "2013-12-31",
      "net_salary": 803.68,
      "gross_salary": 1021.50,
      "employer_cost": 1190.05
    },
    {
      "start_date": "2014-01-01",
      "end_date": "2014-06-30",
      "net_salary": 846.00,
      "gross_salary": 1071.00,
      "employer_cost": 1247.72
    },
    {
      "start_date": "2014-07-01",
      "end_date": "2014-12-31",
      "net_salary": 891.03,
      "gross_salary": 1134.00,
      "employer_cost": 1332.45
    },
    {
      "start_date": "2015-01-01",
      "end_date": "2015-06-30",
      "net_salary": 949.07,
      "gross_salary": 1201.50,
      "employer_cost": 1411.76
    },
    {
      "start_date": "2015-07-01",
      "end_date": "2015-12-31",
      "net_salary": 1000.54,
      "gross_salary": 1273.50,
      "employer_cost": 1496.36
    },
    {
      "start_date": "2016-01-01",
      "end_date": "2016-12-31",
      "net_salary": 1300.99,
      "gross_salary": 1647.00,
      "employer_cost": 1935.23
    },
    {
      "start_date": "2017-01-01",
      "end_date": "2017-12-31",
      "net_salary": 1404.06,
      "gross_salary": 1777.50,
      "employer_cost": 2088.56
    },
    {
      "start_date": "2018-01-01",
      "end_date": "2018-12-31",
      "net_salary": 1603.12,
      "gross_salary": 2029.50,
      "employer_cost": 2384.66
    },
    {
      "start_date": "2019-01-01",
      "end_date": "2019-12-31",
      "net_salary": 2020.90,
      "gross_salary": 2558.40,
      "employer_cost": 3006.12
    },
    {
      "start_date": "2020-01-01",
      "end_date": "2020-12-31",
      "net_salary": 2324.71,
      "gross_salary": 2943.00,
      "employer_cost": 3458.03
    },
    {
      "start_date": "2021-01-01",
      "end_date": "2021-12-31",
      "net_salary": 2825.90,
      "gross_salary": 3577.50,
      "employer_cost": 4203.56
    },
    {
      "start_date": "2022-01-01",
      "end_date": "2022-06-30",
      "net_salary": 4253.40,
      "gross_salary": 5004.00,
      "employer_cost": 5879.70
    },
    {
      "start_date": "2022-07-01",
      "end_date": "2022-12-31",
      "net_salary": 5500.35,
      "gross_salary": 6471.00,
      "employer_cost": 7603.43
    },
    {
      "start_date": "2023-01-01",
      "end_date": "2023-12-31",
      "net_salary": 8506.80,
      "gross_salary": 10008.00,
      "employer_cost": 11759.40
    },
    {
      "start_date": "2024-01-01",
      "end_date": "2024-06-30",
      "net_salary": 17002,
      "gross_salary": 20002.50,
      "employer_cost": 23502.94
    }
  ];

  const toUTCDate = (date) => {
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return utcDate;
  };

  const moneyDevalueDate = toUTCDate(new Date('2005-01-01'));


  const querySalaryByDate = (date, salaryModel= salaries) => {
    const targetDate = toUTCDate(new Date(date));
    for (const salary of salaryModel) {
      const startDate = toUTCDate(new Date(salary.start_date));
      const endDate = toUTCDate(new Date(salary.end_date));
      if (targetDate >= startDate && targetDate <= endDate) {
        let sal = {...salary};
        if(targetDate<moneyDevalueDate){
          sal.net_salary=sal.net_salary/1_000_000;
          sal.employer_cost=sal.employer_cost/1_000_000;
          sal.gross_salary=sal.gross_salary/1_000_000;
        }
        return sal;
      }
    }
    return null; // Return null if no salary data is found for the given date
  };

const arrangeSalaries = (salaries, newSalary) => {
  const updatedSalaries = [...salaries];

  const newStartDate = toUTCDate(new Date(newSalary.start_date));
  const newEndDate = toUTCDate(new Date(newSalary.end_date));

  for (let i = 0; i < updatedSalaries.length; i++) {
    const salary = updatedSalaries[i];
    const startDate = toUTCDate(new Date(salary.start_date));
    const endDate = toUTCDate(new Date(salary.end_date));

    // // Check for conflicts and adjust dates
    // if (isBefore(newStartDate, endDate) && isAfter(newEndDate, startDate)) {
    //   // Adjust existing salary's end date
    //   if (isBefore(newStartDate, endDate)) {
    //     updatedSalaries[i].end_date = format(addDays(newStartDate, -1), 'yyyy-MM-dd');
    //   }

    //   // Adjust next salary's start date if overlapping
    //   if (i < updatedSalaries.length - 1) {
    //     const nextSalary = updatedSalaries[i + 1];
    //     const nextStartDate = toUTCDate(new Date(nextSalary.start_date));
    //     if (isAfter(newEndDate, nextStartDate) || isAfter(newEndDate, startDate)) {
    //       updatedSalaries[i + 1].start_date = format(addDays(newEndDate, 1), 'yyyy-MM-dd');
    //     }
    //   }
    // }

     // Check for overlap and adjust dates
     if (isBefore(newStartDate, endDate) && isAfter(newEndDate, startDate)) {
      // Adjust existing salary's end date if the new salary overlaps at the start
      if (isBefore(newStartDate, endDate) && isAfter(newStartDate, startDate)) {
        salary.end_date = format(addDays(newStartDate, -1), 'yyyy-MM-dd');
      }

      // Adjust existing salary's start date if the new salary overlaps at the end
      if (isAfter(newEndDate, startDate) && isBefore(newEndDate, endDate)) {
        const remainingSalary = {
          ...salary,
          start_date: format(addDays(newEndDate, 1), 'yyyy-MM-dd')
        };
        updatedSalaries.push(remainingSalary);
      }

      // Remove fully overlapping salary range
      if (isEqual(startDate, newStartDate) && isEqual(endDate, newEndDate)) {
        updatedSalaries.splice(i, 1);
      } else if (isBefore(newStartDate, startDate) && isAfter(newEndDate, endDate)) {
        updatedSalaries.splice(i, 1);
      }
    }
  }

  // Add the new salary object
  updatedSalaries.push(newSalary);

  // Sort salaries by start date
  updatedSalaries.sort((a, b) => toUTCDate(new Date(a.start_date)) - toUTCDate(new Date(b.start_date)));

  return updatedSalaries;
};

  
  export default querySalaryByDate;

  export {salaries, toUTCDate, arrangeSalaries};