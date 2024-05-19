import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from 'prop-types';

const AdminTemplesContext = createContext();

const AdminTemplesProvider = ({ children }) => {
    const [adminTemples, setAdminTemples] = useState([])



    useEffect(() => {
        const data = localStorage.getItem('adminTemples');
        if (data) {
            const parsedData = JSON.parse(data)
            setAdminTemples({ parsedData })
        }
    }, [])

    return (
        <AdminTemplesContext.Provider value={[adminTemples, setAdminTemples]}>
            {children}
        </AdminTemplesContext.Provider>
    )
}

AdminTemplesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
const useAdminTemples = () => useContext(AdminTemplesContext)

export { useAdminTemples, AdminTemplesProvider };