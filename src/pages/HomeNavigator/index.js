import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import InventoryList from '../InventoryList/'
import AddInventory from '../AddInventory/';
import ListItens from '../ListItens/';
import InventoryDetails from '../InventoryDetails';
import AddItens from '../AddItens';
import InventoryRemessas from '../InventoryRemessas';
import Result from '../Result';


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
            },
            AddItens: {
                screen: AddItens
            },
            InventoryRemessas: {
                screen: InventoryRemessas
            },
            Result: {
                screen: Result
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