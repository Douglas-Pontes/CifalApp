import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import InventoryList from '../InventoryList/'

const HomeNavigator = createAppContainer(
    createStackNavigator(
        {
            InventoryList: {
                screen: InventoryList
            },
        },
        {
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#333333',
                },
                headerTintColor: "white"
            }
        }
    )
);

export default HomeNavigator;