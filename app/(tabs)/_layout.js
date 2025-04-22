import { Tabs } from "expo-router";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarLabelStyle: {
          fontSize: 12, // Reduced font size
          fontFamily: "Inter, sans-serif",
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 60,
          paddingHorizontal: 5, // Added padding
        },
      }}
    >
      <Tabs.Screen
        name="myProfile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? COLORS.orange : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myCliques"
        options={{
          title: "myCliques",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="git-branch-outline"
              size={24}
              color={focused ? COLORS.orange : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="loyalty"
        options={{
          title: "eRewards",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="bulb-outline"
              size={24}
              color={focused ? COLORS.orange : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="globe-outline"
              size={24}
              color={focused ? COLORS.orange : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="mail-unread-outline"
              size={24}
              color={focused ? COLORS.orange : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={24}
              color={focused ? COLORS.orange : COLORS.grey}
            />
          ),
        }}
      />
    </Tabs>
  );
}
