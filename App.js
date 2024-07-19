import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect, Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

//** routs  */
import { routesHandler } from './src/routes';

// ** store ** //
import store from './src/redux/store';

// ** components ** //
import { CustomHeader } from './src/components';

//** icons */
import { FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';

//** utils */
import { commonColors } from './src/utils/colors';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarScreenOptions = {
  tabBarLabelStyle: {
    fontSize: 12,
    textTransform: 'none', paddingBottom: 8, paddingTop: 3
  },
  tabBarIndicatorStyle: {
    backgroundColor: commonColors?.commonWhite,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tabBarStyle: { backgroundColor: commonColors?.teal?.[600], height: 60, paddingVertical: 3 },
  tabBarActiveTintColor: commonColors?.commonWhite,
  tabBarInactiveTintColor: '#a3a3a3',
}

const App = (props) => {
  const { loggedIn } = props;

  useEffect(() => {
    SplashScreen?.hide();
  }, [])

  function BottomTabs() {
    return (
      <Tab.Navigator screenOptions={tabBarScreenOptions}>
        {
          routesHandler?.map((route, index) => (
            route?.isTabView && (
              <Tab.Screen key={index} name={route?.name} component={route?.component} options={customTabBarConfig} />
            )
          ))
        }
      </Tab.Navigator>
    );
  }

  const customTabBarConfig = ({ route }) => {
    let iconName = route.name === 'Chats' ? "android-messages" : route.name === 'Calls' ? "phone-outline" : 'thermostat';
    return {
      tabBarIcon: ({ focused }) => (
        route.name === 'Communities' ? <FontAwesome5 name="users" size={18} color={focused ? commonColors?.commonWhite : '#a3a3a3'} />
          : <MaterialCommunityIcons name={iconName} size={18} color={focused ? commonColors?.commonWhite : '#a3a3a3'} />
      ),
      headerShown: false
    }
  }

  const headerConfig = () => {
    return {
      header: props => {
        return <CustomHeader {...props} />
      },
    }
  }

  const initialRouteName = loggedIn ? 'Chats' : 'LandingScreen';

  return (
    <Provider store={store}>
      <NavigationContainer >
        <StatusBar barStyle={'light-content'} backgroundColor={commonColors?.teal?.[600]} />
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={headerConfig}>
          {
            routesHandler?.map((route, index) => (
              route?.isTabView ?
                <Stack.Screen key={index} name={route?.name} component={BottomTabs} />
                : <Stack.Screen key={index} name={route?.name} component={route?.component} options={{ headerShown: route?.headerShown }} />
            ))
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const mapStateToProps = (state) => {
  const { getLoggedUser, loggedIn } = state?.global;
  return {
    getLoggedUser,
    loggedIn
  }
}

export default connect(mapStateToProps)(App);