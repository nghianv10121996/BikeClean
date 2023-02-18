/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { navigationRef } from '../helper/navigation';
import useColorScheme from '../hooks/useColorScheme';
import Calendar from "../screens/main/calendar/calendar";
import Home from "../screens/main/home/home";
import Profile from "../screens/main/profile/profile";
import Login from '../screens/user/login/login';
import Register from "../screens/user/register/register";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { UserContext } from '../utils/Provider/UserProvider';
import LinkingConfiguration from './LinkingConfiguration';
import * as styles from "./index.styles";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [user] = React.useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Stack.Navigator>
        {user === "guest" ?
          (
            <>
              <Stack.Screen
                name={"login"}
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={"register"}
                component={Register}
                options={{ headerShown: false }}
              />
            </>
          )
          :
          (
            <Stack.Screen
              name={"main"}
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          )
        }
      </Stack.Navigator>
    </SafeAreaView>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => null,
        })}
      />
      <BottomTab.Screen
        name="Booking"
        component={Calendar}
        options={{
          title: 'Đặt lịch',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyProfile"
        component={Profile}
        options={{
          title: 'Thông tin cá nhân',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
