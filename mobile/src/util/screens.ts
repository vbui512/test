import React from "react";
import { UserRole } from "@cbr/common";
import Stats from "../screens/Stats/Stats";
import ClientList from "../screens/ClientList/ClientList";
import Profile from "../screens/Profile/Profile";
import UserList from "../screens/UserList/UserList";
import Dashboard from "../screens/DashBoard/Dashboard";
import NewClient from "../screens/NewClient/NewClient";

export interface IScreen {
    name: string;
    roles?: UserRole[];
    Component: React.ComponentType<any>;
    iconName?: string;
}

export const screens: IScreen[] = [
    {
        name: "Dashboard",
        Component: Dashboard,
        iconName: "home",
    },
    {
        name: "New Client",
        Component: NewClient,
        iconName: "plus-circle",
    },
    {
        name: "Client List",
        Component: ClientList,
        iconName: "format-list-bulleted",
    },
    {
        name: "Profile",
        Component: Profile,
        iconName: "account",
    },
    {
        name: "Stats",
        roles: [UserRole.ADMIN],
        Component: Stats,
        iconName: "chart-bar",
    },
    {
        name: "Admin",
        roles: [UserRole.ADMIN],
        Component: UserList,
        iconName: "account-cog",
    },
];

export const defaultPage = screens[0];
