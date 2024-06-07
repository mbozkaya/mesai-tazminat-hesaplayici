// src/components/DateRangePicker.jsx
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { tr } from 'date-fns/locale'; // Import the locales you need

// Register the locale
registerLocale('tr', tr);

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate,
  disabled,
}) => {

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          locale="tr"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          dateFormat="dd-MM-yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={endDate}
          minDate={minDate}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Bitiş Tarihi</label>
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          locale="tr"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          dateFormat="dd-MM-yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={maxDate}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
