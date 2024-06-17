import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from 'prop-types';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useState(new URLSearchParams());

    const resetFilters = () => {
        setSearchParams(new URLSearchParams());
    }


    return (
        <SearchContext.Provider value={{ searchParams, setSearchParams, resetFilters }}>
            {children}
        </SearchContext.Provider>
    )
}

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider };