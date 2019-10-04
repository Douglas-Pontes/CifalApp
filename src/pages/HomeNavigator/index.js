import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import InventoryList from '../InventoryList/'
import AddInventory from '../AddInventory/';

const HomeNavigator = createAppContainer(
    createStackNavigator(
        {
            InventoryList: {
                screen: InventoryList
            },
            AddInventory: {
                screen: AddInventory
            }
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