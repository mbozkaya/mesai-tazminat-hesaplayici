import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SalaryProvider } from './contexts/salaryContext.jsx'
import { AppProvider } from './contexts/appContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <SalaryProvider>
        <App />
      </SalaryProvider>
    </AppProvider>
  </React.StrictMode>,
)
