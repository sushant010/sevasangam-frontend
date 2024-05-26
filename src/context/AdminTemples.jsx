import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from 'prop-types';

const AdminTemplesContext = createContext();

const AdminTemplesProvider = ({ children }) => {
    const [adminTemples, setAdminTemples] = useState([]);


    useEffect(() => {
        const data = localStorage.getItem('adminTemples');
        if (data) {
            const parsedData = JSON.parse(data)
            setAdminTemples({ parsedData })
        }
    }, []);



    const removeTempleFromLocalStorage = (id) => {
        const updatedTemples = adminTemples.filter((temple) => temple._id !== id);
        setAdminTemples(updatedTemples);
        localStorage.setItem('adminTemples', JSON.stringify(updatedTemples));
    };

    return (
        <AdminTemplesContext.Provider value={[adminTemples, setAdminTemples, removeTempleFromLocalStorage]}>
            {children}
        </AdminTemplesContext.Provider>
    );
};

AdminTemplesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useAdminTemples = () => useContext(AdminTemplesContext);

export { useAdminTemples, AdminTemplesProvider };
