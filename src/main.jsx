import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { AdminTemplesProvider } from './context/AdminTemples.jsx'
import { DonateProvider } from './context/Donate.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { PopularTemplesProvider } from './context/PopularTemples.jsx'
import { RecentlyCreatedTemplesProvider } from './context/RecentlyCreatedTemples.jsx'
import { TrendingTemplesProvider } from './context/TrendingTemples.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AdminTemplesProvider>
      <DonateProvider>
        <SearchProvider>
          <PopularTemplesProvider>
            <TrendingTemplesProvider>
              <RecentlyCreatedTemplesProvider>
                <App />
              </RecentlyCreatedTemplesProvider>
            </TrendingTemplesProvider>
          </PopularTemplesProvider>

        </SearchProvider>
      </DonateProvider>
    </AdminTemplesProvider>
  </AuthProvider>
)
