import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from 'prop-types';
import { getItemWithExpiry } from "../components/LocalStorageSet";

const RecentlyCreatedTemplesContext = createContext();

const RecentlyCreatedTemplesProvider = ({ children }) => {
    const [recentlyCreatedTemples, setRecentlyCreatedTemples] = useState([]);


    useEffect(() => {
        const data = getItemWithExpiry('recentlyCreatedTemples');

        if (data) {

            setRecentlyCreatedTemples({ data })
        }
    }, []);




    return (
        <RecentlyCreatedTemplesContext.Provider value={[recentlyCreatedTemples, setRecentlyCreatedTemples]}>
            {children}
        </RecentlyCreatedTemplesContext.Provider>
    );
};

RecentlyCreatedTemplesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useRecentlyCreatedTemples = () => useContext(RecentlyCreatedTemplesContext);

export { useRecentlyCreatedTemples, RecentlyCreatedTemplesProvider };
