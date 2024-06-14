import { useContext, useEffect, useRef, useState } from "react"
import { SalaryContext } from "../contexts/salaryContext"
import { addDays } from "date-fns";
import querySalaryByDate, { arrangeSalaries, toUTCDate } from "../utils/querySalary";
import Modal from "./modal";
import DateRangePicker from "./daterangepicker";

function SalaryForm({ onSubmit, values, setValues, buttonRef }) {

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <DateRangePicker
        startDate={values.start_date}
        endDate={values.end_date}
        onStartDateChange={(date) => {
          setValues({
            ...values,
            start_date: date,
          })
        }}
        onEndDateChange={(date) => {
          setValues({
            ...values,
            end_date: date,
          })
        }}
        disabled={false}
      />
      <label className="font-medium text-gray-800 text-sm">Net Maaş</label>
      <input
        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        required
        type="number"
        value={values.net_salary}
        onChange={(e) => {
          setValues({
            ...values,
            net_salary: e.target.value,
          });
        }}
      />
      <label className="font-medium text-gray-800 text-sm">Brüt Maaş</label>
      <input
        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        type="number"
        value={values.gross_salary}
        onChange={(e) => {
          setValues({
            ...values,
            gross_salary: e.target.value,
          });
        }}
      />
      <label className="font-medium text-gray-800 text-sm">İşverene Maliyet</label>
      <input
        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        type="number"
        value={values.employer_cost}
        onChange={(e) => {
          setValues({
            ...values,
            employer_cost: e.target.value,
          });
        }}
      />
      <input type="submit" className="hidden" ref={buttonRef} />
    </form>
  )
};

function SalaryItem({ salary, onClickUpdate }) {

  return (
    <div className={`col-span-full md:col-span-6 lg:col-span-4 mb-2 p-2 border rounded-md odd:bg-gray-50 even:bg-white shadow-sm ${!salary.net_salary ? 'border-red-600' : ''}`}>
      <strong className="text-sm">{new Date(salary.start_date).toLocaleString('tr-TR', { dateStyle: 'full' })} to {new Date(salary.end_date).toLocaleString('tr-TR', { dateStyle: 'full' })}</strong>:
      <span className="block text-xs">Net Maaş: {salary.net_salary ? salary.net_salary.toLocaleString('tr-TR') : '-'}</span>
      <span className="block text-xs">Brüt Maaş: {salary.gross_salary ? salary.gross_salary.toLocaleString('tr-TR') : '-'}</span>
      <span className="block text-xs">İşveren Maliyeti: {salary.employer_cost ? salary.employer_cost.toLocaleString('tr-TR') : '-'}</span>
      <div className="flex justify-end items-center w-full">
        <button
          className="text-xs bg-gray-200 p-1 rounded-md text-black"
          onClick={onClickUpdate}
        >
          güncelle
        </button>
      </div>
    </div>
  );
}

function SalaryList({ startDate, endDate }) {
  const { salaries, setSalaries } = useContext(SalaryContext);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    start_date: null,
    end_date: null,
    net_salary: '',
    gross_salary: '',
    employer_cost: '',
  });
  const buttonRef = useRef();

  useEffect(() => {

    const searchSalaries = () => {
      const defaultSalaries = [];
      for (let date = startDate; date < endDate; date = addDays(date, 1)) {
        const salary = querySalaryByDate(date);

        const dateUtc = toUTCDate(date);
        const hasSalaryRange = defaultSalaries.some((ds) => {
          const salaryStartDate = toUTCDate(new Date(ds.start_date));
          const salaryEndDate = toUTCDate(new Date(ds.end_date));

          if (salary && dateUtc >= salaryStartDate && dateUtc <= salaryEndDate && salary.employer_cost === ds.employer_cost && salary.gross_salary === ds.gross_salary && salary.net_salary === ds.net_salary) {
            return true;
          }
          return false;
        });

        if (!hasSalaryRange) {
          if (salary) {
            defaultSalaries.push(salary);
          } else {

            const existingDefaultSalary = querySalaryByDate(date, defaultSalaries);
            if (existingDefaultSalary) {
              const existingSalaryStartDate = toUTCDate(new Date(existingDefaultSalary.start_date));
              const existingSalaryEndDate = toUTCDate(new Date(existingDefaultSalary.end_date));
              const defaultSalaryIndex = defaultSalaries.findIndex((ds) => {
                const salaryStartDate = toUTCDate(new Date(ds.start_date));
                const salaryEndDate = toUTCDate(new Date(ds.end_date));

                if (salaryStartDate >= existingSalaryStartDate && existingSalaryEndDate <= salaryEndDate) {
                  return true;
                }
                return false;
              });

              defaultSalaries[defaultSalaryIndex].end_date = addDays(date, 1).toISOString().split('T')[0];
            } else {
              defaultSalaries.push(
                {
                  "start_date": date.toISOString().split('T')[0],
                  "end_date": addDays(date, 1).toISOString().split('T')[0],
                  "net_salary": 0,
                  "gross_salary": 0,
                  "employer_cost": 0
                },
              )
            }
          }
        }
      }
      setSalaries(defaultSalaries);
    };
    if (startDate && endDate) {
      searchSalaries();
    }

  }, [startDate, endDate]);

  return (
    <div>
      <div className="flex justify-start items-center mb-2 gap-2" >
        <label className="text-sm font-medium text-gray-700">Dönemsel Maaş Bilgisi</label>
        <button
          className="text-sm px-1 py-0.5 rounded-md text-black bg-gray-200"
          onClick={() => { setShow(!show) }}
        >
          {
            show ? 'gizle' : 'göster'
          }
        </button>
      </div>
      {
        show && (

          <div className="grid grid-cols-12 gap-1">
            {
              salaries.map((salary, index) => (
                <SalaryItem
                  key={salary.start_date}
                  salary={salary}
                  onClickUpdate={() => {
                    setFormValues({
                      ...salary,
                      index,
                    });
                    setOpen(true);
                  }}
                />
              ))
            }
            <div className="flex justify-center items-center col-span-full md:col-span-6 lg:col-span-4 mb-2 border rounded-md odd:bg-gray-50 even:bg-white shadow-sm min-h-24">
              <button className="text-xs bg-gray-200 p-1 rounded-md text-black" onClick={() => { setOpen(true); }}>Yeni Maaş Ekle</button>
            </div>
          </div>
        )
      }
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSuccess={() => {
          buttonRef.current.click();
        }}
      >
        <SalaryForm
          values={formValues}
          setValues={setFormValues}
          buttonRef={buttonRef}
          onSubmit={(e) => {

            e.preventDefault();
            // if (formValues.index || formValues.index === 0) {

            //   const sal = [...salaries];
            //   sal[formValues.index] = { ...formValues };
            //   setSalaries(sal);
            //   setOpen(false);
            //   return;
            // }
            const newSalaries = arrangeSalaries([...salaries], {
              ...formValues,
              start_date: (typeof formValues.start_date === "string" ? new Date(formValues.start_date) : formValues.start_date).toISOString().split('T')[0],
              end_date: (typeof formValues.end_date === "string" ? new Date(formValues.end_date) : formValues.end_date).toISOString().split('T')[0],
            });
            setSalaries(newSalaries);
            setFormValues({
              employer_cost: '',
              start_date: '',
              end_date: '',
              gross_salary: '',
              net_salary: '',
            });
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );

}

export default SalaryList;