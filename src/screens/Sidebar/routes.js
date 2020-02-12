import React, { Component } from "react";
import Home from "../home/index";
import { DrawerNavigator } from "react-navigation";
import SideBar from "../Sidebar";

const AppRoutes = DrawerNavigator(
  {
    Home: { screen: Home }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default AppRoutes;