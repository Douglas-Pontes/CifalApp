import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import InventoryList from '../InventoryList/'
import AddInventory from '../AddInventory/';
import ListItens from '../ListItens/';
import InventoryDetails from '../InventoryDetails';

const HomeNavigator = createAppContainer(
    createStackNavigator(
        {
            InventoryList: {
                screen: InventoryList
            },
            AddInventory: {
                screen: AddInventory
            },
            ListItens: {
                screen: ListItens
            },
            InventoryDetails: {
                screen: InventoryDetails
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