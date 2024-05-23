import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from 'prop-types';

const DonateContext = createContext();

const DonateProvider = ({ children }) => {
    const [donate, setDonate] = useState({
        amount: '',
        templeId: ''
    })

    useEffect(() => {
        const data = localStorage.getItem('donate');
        if (data) {
            const parsedData = JSON.parse(data)
            setDonate({ ...donate, templeId: parsedData.templeId, amount: parsedData.amount })
        }
    }, [])

    return (
        <DonateContext.Provider value={[donate, setDonate]}>
            {children}
        </DonateContext.Provider>
    )
}

DonateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
const useDonate = () => useContext(DonateContext)

export { useDonate, DonateProvider };