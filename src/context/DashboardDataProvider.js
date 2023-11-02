// components/DataProvider.js
import React, { createContext, useContext } from "react";

const DashboardContext = createContext();

export const DashboardDataProvider = ({ children, data }) => {
    return (
        <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
    );
};

export const useData = () => {
    return useContext(DashboardContext);
};
export const useSocialLinkData = () => {
    return useContext(DashboardContext).SocialLinks;
};
export const useHomeData = () => {
    return useContext(DashboardContext).Home.homeData;
};
export const useAboutData = () => {
    return useContext(DashboardContext).About.aboutPageData;
};
export const useProjectData = () => {
    return useContext(DashboardContext).Projects.projectData;
};
export const useArticleData = () => {
    return useContext(DashboardContext).Articles;
};
