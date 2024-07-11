import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from 'prop-types';
import { getItemWithExpiry } from "../components/LocalStorageSet";

const PopularTemplesContext = createContext();

const PopularTemplesProvider = ({ children }) => {
    const [popularTemples, setPopularTemples] = useState([]);


    useEffect(() => {
        const data = getItemWithExpiry('popularTemples');

        if (data) {
            setPopularTemples({ data })
        }
    }, []);




    return (
        <PopularTemplesContext.Provider value={[popularTemples, setPopularTemples]}>
            {children}
        </PopularTemplesContext.Provider>
    );
};

PopularTemplesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const usePopularTemples = () => useContext(PopularTemplesContext);

export { usePopularTemples, PopularTemplesProvider };
