// react-navigation@2.18.3 
import { createStackNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack'; # react-navigation@4x (current) 

import Main from "./pages/main";
import Product from "./pages/product";

export default createStackNavigator(
  {
    Main,
    Product
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#da552F"
      },
      headerTintColor: "#FFF"
    }
  }
);

