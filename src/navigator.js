//region References
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
// import GetStarted from './screens/GetStarted';
// import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import SideBar from './screens/Sidebar';
import SubCategory from './screens/SubCategories';
import Products from './screens/Products';
import Product from './screens/Product';
import Profile from './screens/Profile';
import Wish from './screens/WishList';
import Contact from './screens/Contact';
import NoData from './screens/NoData';
import Cart from './screens/Cart';
import AddToCart from './screens/Cart/Add';
import Verification from './screens/Verification'
import Forget from './screens/Forget'

// import Chat from './screens/Chat';
// import Register from './screens/Register';
// import Verification from './screens/Verification';
// import WelcomeTour from './screens/WelcomeTour';
// import Agreement from './screens/Agreement';
// import AssitantScreen1 from './screens/Assistant/Screen1';
// import AssitantScreen2 from './screens/Assistant/Screen2';
// import CreateProfile from './screens/Profile/index';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';

const AppNavigation = {
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null,
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      header: null,
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  Product: {
    screen: Product,
    navigationOptions: {
      header: null,
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  SubCategory: {
    screen: SubCategory,
    navigationOptions: {
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  Products: {
    screen: Products,
    navigationOptions: {
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  Product: {
    screen: Product,
    navigationOptions: {
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  AddToCart: {
    screen: AddToCart,
    navigationOptions: {
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
  Wish: {
    screen: Wish,
    navigationOptions: {
      headerMode: 'none',
    },
  },
  SideBar: {
    screen: SideBar,
    navigationOptions: {
      headerMode: 'none',
      gesturesEnabled: false,
    },
  },
};
//endregion

export const AppStack = createStackNavigator(AppNavigation, {
  headerMode: 'none',
  gesturesEnabled: false,
});

const Drawer = createDrawerNavigator(
  //AppNavigation,
  {
    AppStack :{screen:AppStack}
  },

  {
    overlayColor: '#0000002e',
    contentComponent: props => <SideBar {...props} />,
  },
);
Drawer.navigationOptions = {
  header: null,
};


// AppStack.navigationOptions = {
//   header: null,
// };

// export const GetStartedStack = createStackNavigator({
//   Welcome: {
//     screen: WelcomeTour,
//     navigationOptions: {
//       header: null,
//       gesturesEnabled: false,
//     },
//   },
//   GetStarted: {
//     screen: GetStarted,
//     navigationOptions: {
//       header: null,
//       gesturesEnabled: false,
//     },
//   },
//   AssitantScreen1: {
//     screen: AssitantScreen1,
//     navigationOptions: {
//       header: null,
//       gesturesEnabled: false,
//     },
//   },
//   AssitantScreen2: {
//     screen: AssitantScreen2,
//     navigationOptions: {
//       header: null,
//       gesturesEnabled: false,
//     },
//   },
// });

export const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerMode: 'none',
        gesturesEnabled: false,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerMode: 'none',
        gesturesEnabled: false,
      },
    },
    Forget: {
      screen: Forget,
      navigationOptions: {
        headerMode: 'none',
        gesturesEnabled: false,
      },
    },
    Verification: {
      screen: Verification,
      navigationOptions: {
        headerMode: 'none',
        gesturesEnabled: false,
      },
    },
    // Agreement: {
    //   screen: Agreement,
    //   navigationOptions: {
    //     headerMode: 'none',
    //     gesturesEnabled: false,
    //   },
    // },
  },
  {
    headerMode: 'none',
    gesturesEnabled: false,
  },
);

export const AppNavigator = createSwitchNavigator(
  {
    //Started: GetStartedStack,
    
    Drawer: Drawer,
    App: AppStack,
    Auth: AuthStack,
    NoData: NoData,
  },
  {
    initialRouteName: 'Auth',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export const AppContainer = createAppContainer(AppNavigator);
