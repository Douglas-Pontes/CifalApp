import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import TabMaster from './pages/TabMaster'
import Login from './pages/Login'

const Routes = createAppContainer(
    createStackNavigator(
        {
            Login: {
                screen: Login
            },
            TabMaster: {
                screen: TabMaster,
                backBehavior: "none"
            },
        },
        {
            defaultNavigationOptions: {
                header: null
            }
        }
    )
);

export default Routes;