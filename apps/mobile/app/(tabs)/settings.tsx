import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C } from '../../theme';

export default function Settings() {
  return (
    <SafeAreaView style={st.wrap} edges={['top']}>
      <View style={st.header}><Text style={st.h1}>Cài đặt</Text></View>
      <View style={st.center}>
        <Text style={st.hint}>Thông báo · Giao diện · Đăng xuất</Text>
      </View>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.surface },
  header: { paddingHorizontal: 18, paddingVertical: 12 },
  h1: { fontSize: 22, fontWeight: '800', color: C.text },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hint: { color: C.faint, fontSize: 13 },
});
