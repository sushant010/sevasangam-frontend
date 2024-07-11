import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from 'prop-types';
import { getItemWithExpiry } from "../components/LocalStorageSet";

const TrendingTemplesContext = createContext();

const TrendingTemplesProvider = ({ children }) => {
    const [trendingTemples, setTrendingTemples] = useState([]);


    useEffect(() => {
        const data = getItemWithExpiry('trendingTemples');

        if (data) {

            setTrendingTemples({ data })
        }
    }, []);




    return (
        <TrendingTemplesContext.Provider value={[trendingTemples, setTrendingTemples]}>
            {children}
        </TrendingTemplesContext.Provider>
    );
};

TrendingTemplesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useTrendingTemples = () => useContext(TrendingTemplesContext);

export { useTrendingTemples, TrendingTemplesProvider };
