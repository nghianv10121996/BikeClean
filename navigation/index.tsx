/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, StatusBar, View } from 'react-native';
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
      screenOptions={{
        headerShown: true
      }}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{
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

const CustomDrawerContent = ({ navigation }: any) => {
  const [focusField, setFocusField] = React.useState({
    home: true,
    calendar: false,
    profile: false,
  });


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
    });

    setFocusField(newData);
  }
  const { user, setUser } = React.useContext(UserContext);
  return (
    <DrawerContentScrollView>
      <View style={{
        backgroundColor: colors.main,
        height: 160,
        marginBottom: 12,
        justifyContent: "center",
        alignItems: "center"
      }}>
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
          handleFocusField("home");
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
          handleFocusField("calendar");
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
          handleFocusField("profile");
          navigation.navigate("profile")
        }}
      />
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

function RootNavigator() {
  const { user } = React.useContext(UserContext);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {
        !user.userID ? (
          <LoginStack />
        ) : (
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
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