import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { C } from '../../theme';

const icon = (emoji: string) => ({ color }: { color: string }) => (
  <Text style={{ fontSize: 18, color }}>{emoji}</Text>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.indigo,
        tabBarInactiveTintColor: C.faint,
        tabBarStyle: { height: 58, paddingBottom: 6, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Đoạn chat', tabBarIcon: icon('💬') }} />
      <Tabs.Screen name="contacts" options={{ title: 'Danh bạ', tabBarIcon: icon('👥') }} />
      <Tabs.Screen name="settings" options={{ title: 'Cài đặt', tabBarIcon: icon('⚙️') }} />
    </Tabs>
  );
}
