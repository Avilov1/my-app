import {Warehouses} from "../shared/Warehouses";
import {WarehouseId} from "../shared/WarehouseId";
import {MainPage, StartingPage} from "../shared";
import {Account} from "../shared/Account";
import {Cards} from "../shared/Cards";
import {Contacts} from "../shared/Contacts";
import {Chat} from "../shared/Chat";
import {Home} from "../shared/Home";

export const privateRoutes = [
    {path: "/", component: MainPage},
    {path: "home", component: Home, exact: true},
    {path: "warehouses", component: Warehouses, exact: true},
    {path: "warehouses/:id", component: WarehouseId, exact: true},
    {path: "account", component: Account, exact: true},
    {path: "cards", component: Cards, exact: true},
    {path: "contacts", component: Contacts, exact: true},
    {path: "chat", component: Chat, exact: true},
]

export const publicRoutes =  [
    {path: "/login", component: StartingPage, exact: true}
]
