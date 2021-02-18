import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logout from "pages/Logout/Logout";
import ToDo from "pages/ToDo/ToDo";
import ClientList from "pages/ClientList/ClientList";
import UserView from "pages/User/UserView";
import UserEdit from "pages/User/UserEdit";
import AdminView from "pages/Admin/AdminView";
import AdminEdit from "pages/Admin/AdminEdit";
import ClientForm from "pages/Client/ClientForm";
import NotFound from "pages/NotFound/NotFound";
import AdminNew from "pages/Admin/AdminNew";

export interface IPage {
    path: string;
    exact?: boolean;
    name: string;
    Component: React.ComponentType<any>;
    showInNav: boolean;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export const pages: IPage[] = [
    {
        path: "/dashboard",
        name: "Dashboard",
        Component: ToDo,
        showInNav: true,
        Icon: HomeIcon,
    },
    {
        path: "/clients/new",
        name: "New Client",
        showInNav: true,
        Component: ClientForm,
        Icon: AddCircleIcon,
    },
    {
        path: "/clients",
        name: "Client List",
        Component: ClientList,
        showInNav: true,
        Icon: FormatListBulletedIcon,
    },
    {
        path: "/user",
        name: "Profile",
        Component: UserView,
        showInNav: true,
        Icon: PersonIcon,
    },
    {
        path: "/user/edit",
        name: "Edit Profile",
        Component: UserEdit,
        showInNav: false,
    },
    {
        path: "/admin",
        name: "Admin",
        Component: ToDo,
        showInNav: true,
        Icon: SettingsIcon,
    },
    {
        path: "/admin/new",
        name: "New User",
        Component: AdminNew,
        showInNav: false,
    },
    {
        path: "/admin/view",
        name: "View User",
        Component: AdminView,
        showInNav: false,
    },
    {
        path: "/admin/edit",
        name: "Edit User",
        Component: AdminEdit,
        showInNav: false,
    },
    {
        path: "/logout",
        name: "Log out",
        Component: Logout,
        showInNav: true,
        Icon: ExitToAppIcon,
    },
    // must be at the bottom
    {
        path: "/",
        exact: false,
        name: "Not Found",
        Component: NotFound,
        showInNav: false,
    },
];

export const defaultPage = pages[0];
