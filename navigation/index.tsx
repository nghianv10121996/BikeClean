/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
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
import { colors } from '../utils/theme/colors';
import * as styles from "./index.styles";
import LinkingConfiguration from './LinkingConfiguration';

const Drawer = createDrawerNavigator();

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

const LoginStack = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  )
}


const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

const CustomDrawerContent = ({ navigation }: any) => {
  const [user, setUser] = React.useContext(UserContext);
  return (
    <>
      <DrawerItem
        pressColor={colors.grey}
        labelStyle={{
          color: colors.blue
        }}
        label={'Quản lí tài khoản'}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
        }}
      />
      <DrawerItem
        pressColor={colors.grey}
        labelStyle={{
          color: colors.blue
        }}
        label={'Thoát'}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          setUser("guest");
        }}
      />
    </>
  )
}

function RootNavigator() {
  const [user] = React.useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {
        user === "guest" ? (
          <LoginStack />
        ) : (
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="Main"
              options={{
                drawerLabel: 'Home',
                title: '',
                headerTitleAlign: "center",
                headerShown: false
              }}
              component={MainStack}
            />
          </Drawer.Navigator>
        )
      }
    </SafeAreaView>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const HeaderLeft = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{
        marginHorizontal: 8
      }}
    >
      <Icon size={24} name="menu-outline" color={colors.blue} />
    </TouchableOpacity>
  )
}

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
        options={(props: RootTabScreenProps<'Home'>) => ({
          title: 'Trang chủ',
          headerTitleAlign: "center",
          headerTitleStyle: {color: colors.blue},
          headerLeft: () => {
            return <HeaderLeft {...props} />
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => null,
        })}
      />
      <BottomTab.Screen
        name="Booking"
        component={Calendar}
        options={(props: RootTabScreenProps<'Booking'>) => ({
          title: 'Đặt lịch',
          headerTitleAlign: "center",
          headerTitleStyle: {color: colors.blue},
          headerLeft: () => {
            return <HeaderLeft {...props} />
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="MyProfile"
        component={Profile}
        options={(props: RootTabScreenProps<'MyProfile'>) => ({
          title: 'Thông tin tài khoản',
          headerTitleAlign: "center",
          headerTitleStyle: {color: colors.blue},
          headerLeft: () => {
            return <HeaderLeft {...props} />
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        })}
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