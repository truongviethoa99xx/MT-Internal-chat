import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { C } from '../theme';

export default function Login() {
  const enter = () => router.replace('/(tabs)');
  return (
    <SafeAreaView style={st.wrap}>
      <View style={st.center}>
        <View style={st.logo}><Text style={st.logoTxt}>MT</Text></View>
        <Text style={st.title}>MTM Chat</Text>
        <Text style={st.sub}>Chat nội bộ Minh Tuấn Mobile</Text>
        <Pressable style={st.primary} onPress={enter}>
          <Text style={st.primaryTxt}>Đăng nhập bằng 1Office</Text>
        </Pressable>
        <Pressable style={st.ghost} onPress={enter}>
          <Text style={st.ghostTxt}>Đăng nhập tài khoản nội bộ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.surface },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  logo: { width: 54, height: 54, borderRadius: 16, backgroundColor: C.indigo, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  logoTxt: { color: '#fff', fontWeight: '800', fontSize: 20 },
  title: { fontSize: 18, fontWeight: '800', color: C.text },
  sub: { fontSize: 13, color: C.muted, marginBottom: 26 },
  primary: { width: '100%', backgroundColor: C.indigo, borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 10 },
  primaryTxt: { color: '#fff', fontWeight: '600', fontSize: 14 },
  ghost: { width: '100%', backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 14, alignItems: 'center' },
  ghostTxt: { color: C.text, fontWeight: '600', fontSize: 14 },
});
