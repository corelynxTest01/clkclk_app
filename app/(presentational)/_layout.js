import { Stack } from "expo-router";

export default function PresentationalLayout() {
  return (
    <Stack>
      <Stack.Screen name="faq" options={{ title: "FAQ", headerShown: false }} />
      <Stack.Screen
        name="eula"
        options={{ title: "EULA", headerShown: false }}
      />
      <Stack.Screen
        name="contact"
        options={{ title: "Contact", headerShown: false }}
      />
      <Stack.Screen
        name="pricing"
        options={{ title: "Pricing", headerShown: false }}
      />
      <Stack.Screen
        name="company"
        options={{ title: "Company", headerShown: false }}
      />
      <Stack.Screen
        name="terms"
        options={{ title: "Terms of Service", headerShown: false }}
      />
      <Stack.Screen
        name="privacy"
        options={{ title: "Privacy Policy", headerShown: false }}
      />
    </Stack>
  );
}
