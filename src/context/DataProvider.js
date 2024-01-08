// components/DataProvider.js
import React, { createContext, useContext } from "react";

const HomeDataContext = createContext();

export const HomeDataProvider = ({ children, data }) => {
  return (
    <HomeDataContext.Provider value={data}>{children}</HomeDataContext.Provider>
  );
};
export const useSocialLinkData = () => {
  return useContext(HomeDataContext).SocialLinks;
};
export const useHomeData = () => {
  return useContext(HomeDataContext).Home.homeData;
};
export const useAboutData = () => {
  return useContext(HomeDataContext).About.aboutPageData;
};
export const ProjectData = () => {
  return useContext(HomeDataContext).Projects.projectData;
};
export const ArticleData = () => {
  return useContext(HomeDataContext).Articles;
};
