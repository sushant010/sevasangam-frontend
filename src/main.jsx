import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { AdminTemplesProvider } from './context/AdminTemples.jsx'
import { DonateProvider } from './context/Donate.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AdminTemplesProvider>
      <DonateProvider>
        <App />
      </DonateProvider>
    </AdminTemplesProvider>
  </AuthProvider>
)
