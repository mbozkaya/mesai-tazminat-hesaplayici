import { createContext, useState } from "react";

const SalaryContext = createContext({
  salaries: [],
  setSalaries: () => { },
});

const SalaryProvider = ({ children }) => {

  const [salaries, setSalaries] = useState([]);

  return (
    <SalaryContext.Provider
      value={{
        salaries,
        setSalaries,
      }}
    >
      {children}
    </SalaryContext.Provider>
  )
};

export { SalaryContext, SalaryProvider }