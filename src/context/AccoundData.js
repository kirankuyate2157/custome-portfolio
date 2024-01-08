import React, { createContext, useContext } from "react";


const AccountContext = createContext();

export const AccountDataProvider = ({ children, data }) => {
    return (
        <AccountContext.Provider value={data}>{children}</AccountContext.Provider>
    );
};
export const useAccount = () => {
    return useContext(AccountContext);
};