import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { AdminTemplesProvider } from './context/AdminTemples.jsx'
import { DonateProvider } from './context/Donate.jsx'
import { SearchProvider } from './context/SearchContect.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AdminTemplesProvider>
      <DonateProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </DonateProvider>
    </AdminTemplesProvider>
  </AuthProvider>
)
