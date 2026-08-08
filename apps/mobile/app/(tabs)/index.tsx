import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { C } from '../../theme';
import { conversations, avaBg, avaFg } from '../../mock';

export default function Chats() {
  return (
    <SafeAreaView style={st.wrap} edges={['top']}>
      <View style={st.header}>
        <Text style={st.h1}>Đoạn chat</Text>
        <Text style={st.find}>Tìm</Text>
      </View>
      <FlatList
        data={conversations}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item: c }) => (
          <Pressable style={[st.row, c.archived ? { opacity: 0.55 } : null]} onPress={() => router.push(`/chat/${c.id}`)}>
            <View style={[st.ava, { backgroundColor: avaBg(c.avaKind), borderRadius: c.round ? 22 : 12 }]}>
              <Text style={[st.avaTxt, { color: avaFg(c.avaKind) }]}>{c.avatar}</Text>
              {c.presence ? <View style={st.dot} /> : null}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={st.name}>{c.name}</Text>
              <Text style={st.prev} numberOfLines={1}>{c.preview}</Text>
            </View>
            {c.unread ? (
              <View style={st.badge}><Text style={st.badgeTxt}>{c.unread}</Text></View>
            ) : null}
          </Pressable>
        )}
      />
      <Pressable style={st.fab}><Text style={st.fabTxt}>+</Text></Pressable>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.surface },
  header: { paddingHorizontal: 18, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  h1: { fontSize: 22, fontWeight: '800', color: C.text },
  find: { color: C.indigo, fontWeight: '600', fontSize: 13 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 9, borderRadius: 12 },
  ava: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  avaTxt: { fontWeight: '700', fontSize: 12 },
  dot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: C.green, borderWidth: 2, borderColor: '#fff' },
  name: { fontSize: 14, fontWeight: '600', color: C.text },
  prev: { fontSize: 12, color: C.muted, marginTop: 2 },
  badge: { backgroundColor: C.indigo, borderRadius: 999, paddingHorizontal: 7, paddingVertical: 2 },
  badgeTxt: { color: '#fff', fontSize: 10, fontWeight: '700' },
  fab: { position: 'absolute', right: 18, bottom: 18, width: 52, height: 52, borderRadius: 26, backgroundColor: C.indigo, alignItems: 'center', justifyContent: 'center', shadowColor: '#4F46E5', shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 6 },
  fabTxt: { color: '#fff', fontSize: 26, marginTop: -2 },
});
