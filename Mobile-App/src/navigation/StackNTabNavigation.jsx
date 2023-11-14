import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LandingPage } from "../screens/LandingPage";
import { MenuScreen } from "../screens/MenuScreen";
import { MenuDetail } from "../screens/MenuDetail";


export const StackNTabNavigation = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    return(
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name == "Home") {
                      iconName = focused ? "home" : "home-outline";
                    } else if (route.name == "Menu & Order") {
                      iconName = focused ? "restaurant" : "restaurant-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: "rgb(121, 220, 121)",
                  tabBarInactiveTintColor: "gray",
                })}>
                <Tab.Screen name="Home" component={LandingPage} options={{ headerShown: false }} />
                <Tab.Screen name="Menu & Order" component={MenuScreen} options={{ headerShown: false }} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="Item details" component={MenuDetail} />
        </Stack.Navigator>
        <StatusBar style="auto" hidden={true} />
      </NavigationContainer>
    )
}