const TimeRangePicker = ({ startTime, endTime, onStartTimeChange, onEndTimeChange, disabled }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Mesai Başlangıç</label>
        <input
          type="time"
          value={startTime}
          onChange={onStartTimeChange}
          disabled={disabled}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Mesai Bitiş</label>
        <input
          type="time"
          value={endTime}
          onChange={onEndTimeChange}
          disabled={disabled}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
};

export default TimeRangePicker;