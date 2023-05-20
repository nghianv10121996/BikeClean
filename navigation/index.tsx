/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, DrawerActions, NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, StatusBar, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../elements/text-field/textField';
import { ETextField, ETextType } from '../elements/text-field/textField.props';
import { navigationRef } from '../helper/navigation';
import Calendar from "../screens/main/calendar/calendar";
import Account from '../screens/main/drawer/account/Account';
import Home from "../screens/main/home/home";
import Profile from "../screens/main/profile/profile";
import Login from '../screens/user/login/login';
import Register from "../screens/user/register/register";
import { RootStackParamList } from '../types';
import { save } from "../utils/LocalStorage/LocalStorage";
import { UserContext } from '../utils/Provider/UserProvider';
import { CONSTANTS } from "../utils/constants/constants";
import { colors } from '../utils/theme/colors';
import LinkingConfiguration from './LinkingConfiguration';
import * as styles from "./index.styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { ManagerMember } from '../screens/main/drawer/manager-member/ManagerMember';
const Drawer = createDrawerNavigator();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [routesName, setRoutesName] = React.useState<string>("")
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      onStateChange={(state) => {
        const routes = state?.routes[0]?.state?.routes;
        const length = routes?.length || 0;
        const name= routes[length - 1].name;
        setRoutesName(name)
      }}
    >
      <RootNavigator routesName={routesName}/>
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


const MainStack = ({ navigation }: any) => {
  const { user } = React.useContext(UserContext);
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        headerShown: true
      }}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerLeft(props) {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.dispatch(DrawerActions.openDrawer())
                }}>
                  <Icon
                    color={colors.blue}
                    size={30}
                    name={"menu"}
                  />
                </TouchableOpacity>
              )
          },
          headerTitle: "Trang chủ",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="calendar"
        component={Calendar}
        options={{
          headerTitle: "Lịch",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerTitle: "Quản lí tài khoản",
          headerTitleAlign: "center",
        }}
      />
      {
        user.roles === "admin" && (
          <Stack.Screen
            name="managerMember"
            component={ManagerMember}
            options={{
              headerTitle: "Quản lí tài khoản",
              headerTitleAlign: "center",
            }}
          />
        )
      }
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          headerTitle: "Tài khoản",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

const CustomDrawerContent = ({ navigation, routesName }: any) => {
  const [focusField, setFocusField] = React.useState({
    home: true,
    calendar: false,
    profile: false,
    managerMember: false
  });

  React.useEffect(() => {
    handleFocusField(routesName)
  }, [routesName])

  const handleFocusField = (fieldName: string) => {
    const newData = Object.keys(focusField).reduce((allField: any, field) => {
      return {
        ...allField,
        [field]: field === fieldName
      }
    }, {
      home: false,
      calendar: false,
      profile: false,
      managerMember: false
    });

    setFocusField(newData);
  }
  const { user, setUser } = React.useContext(UserContext);
  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.iconMenu}
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer())
            }}
          >
            <Icon
              color={colors.blue}
              size={30}
              name={"close"}
            />
          </TouchableOpacity>
        </View>
        {
          !!user?.image ? (
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: user.image,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ) : (
            <Icon
              color={colors.white}
              size={100}
              name={"person-circle"}
            />
          )
        }
        {
          !!user.userName && (
            <TextField
              containerStyle={{
                marginTop: 12
              }}
              type={ETextType.BLUE}
              typo={ETextField.smaller}
              text={user.userName}
            />
          )
        }
      </View>
      <DrawerItem
        icon={({ focused, color, size }) => {
          return <Icon color={colors.blue} size={size} name={"home"} />
        }}
        focused={focusField.home}
        pressColor={colors.grey}
        labelStyle={{
          color: colors.blue
        }}
        label={'Trang chủ'}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate("home");
        }}
      />
      <DrawerItem
        icon={({ focused, color, size }) => <Icon color={colors.blue} size={size} name={"calendar"} />}
        focused={focusField.calendar}
        pressColor={colors.grey}
        labelStyle={{
          color: colors.blue
        }}
        label={'Lịch'}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate("calendar")
        }}
      />
      <DrawerItem
        icon={({ focused, color, size }) => <Icon color={colors.blue} size={size} name={"person-circle"} />}
        focused={focusField.profile}
        pressColor={colors.grey}
        labelStyle={{
          color: colors.blue
        }}
        label={'Quản lí tài khoản'}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate("profile")
        }}
      />
      {
        user.roles === "admin" && (
          <DrawerItem
            icon={({ focused, color, size }) => <Icon color={colors.blue} size={size} name={"people-circle"} />}
            focused={focusField.managerMember}
            pressColor={colors.grey}
            labelStyle={{
              color: colors.blue
            }}
            label={'Quản lí nhân viên'}
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              navigation.navigate("managerMember")
            }}
          />
        )
      }
      <DrawerItem
        icon={({ focused, color, size }) => <Icon color={colors.blue} size={size} name={"exit"} />}
        pressColor={colors.grey}
        labelStyle={{
          color: colors.blue
        }}
        label={'Thoát'}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          save(CONSTANTS.STORAGE.KEY.TOKEN, "");
          setUser({});
        }}
      />
    </DrawerContentScrollView>
  )
}

function RootNavigator({ routesName }: { routesName: string }) {
  const { user } = React.useContext(UserContext);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {
        !user.userID ? (
          <LoginStack />
        ) : (
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent routesName={routesName} {...props} />}
          >
            <Drawer.Screen
              name="main"
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
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// const HeaderLeft = ({ navigation }: any) => {
//   return (
//     <TouchableOpacity
//       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//       style={{
//         marginHorizontal: 8
//       }}
//     >
//       <Icon size={24} name="menu-outline" color={colors.blue} />
//     </TouchableOpacity>
//   )
// }

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//       }}>
//       <BottomTab.Screen
//         name="Home"
//         component={Home}
//         options={(props: RootTabScreenProps<'Home'>) => ({
//           title: 'Trang chủ',
//           headerTitleAlign: "center",
//           headerTitleStyle: { color: colors.blue },
//           headerLeft: () => {
//             return <HeaderLeft {...props} />
//           },
//           tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
//           headerRight: () => null,
//         })}
//       />
//       <BottomTab.Screen
//         name="Booking"
//         component={Calendar}
//         options={(props: RootTabScreenProps<'Booking'>) => ({
//           title: 'Đặt lịch',
//           headerTitleAlign: "center",
//           headerTitleStyle: { color: colors.blue },
//           headerLeft: () => {
//             return <HeaderLeft {...props} />
//           },
//           tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
//         })}
//       />
//       <BottomTab.Screen
//         name="MyProfile"
//         component={Profile}
//         options={(props: RootTabScreenProps<'MyProfile'>) => ({
//           title: 'Thông tin tài khoản',
//           headerTitleAlign: "center",
//           headerTitleStyle: { color: colors.blue },
//           headerLeft: () => {
//             return <HeaderLeft {...props} />
//           },
//           tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
//         })}
//       />
//     </BottomTab.Navigator>
//   );
// }


// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }