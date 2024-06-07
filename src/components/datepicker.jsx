const DatePicker = ({ label, value, onChange, minDate, maxDate, disabled }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={onChange}
        min={minDate}
        max={maxDate}
        disabled={disabled}
        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DatePicker;