import { View, Text, FlatList, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { C } from '../../theme';
import { conversations, threadFor, avaBg, avaFg, Msg } from '../../mock';

export default function ChatDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conv = conversations.find((c) => c.id === id) ?? conversations[0];
  const msgs = threadFor(String(id));

  const renderMsg = ({ item: m }: { item: Msg }) => {
    if (m.kind === 'sys') return <Text style={st.sys}>{m.text}</Text>;
    if (m.kind === 'out') {
      return (
        <View style={st.rowOut}>
          <View style={[st.bub, st.bubOut]}><Text style={st.bubOutTxt}>{m.text}</Text></View>
          <Text style={st.stamp}>{m.time} · Đã xem</Text>
        </View>
      );
    }
    return (
      <View style={st.rowIn}>
        <View style={st.mini}><Text style={st.miniTxt}>{m.avatar}</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={st.sender}>{m.sender}</Text>
          <View style={[st.bub, st.bubIn]}><Text style={st.bubInTxt}>{m.text}</Text></View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={st.wrap} edges={['top']}>
      <View style={st.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Text style={st.back}>‹</Text></Pressable>
        <View style={[st.ava, { backgroundColor: avaBg(conv.avaKind), borderRadius: conv.round ? 16 : 10 }]}>
          <Text style={[st.avaTxt, { color: avaFg(conv.avaKind) }]}>{conv.avatar}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={st.name}>{conv.name}</Text>
          <Text style={st.sub}>{conv.type === 'department' ? `${conv.memberCount} thành viên · Đồng bộ 1Office` : 'Đang hoạt động'}</Text>
        </View>
      </View>

      <FlatList
        data={msgs}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderMsg}
        contentContainerStyle={{ padding: 14, gap: 8 }}
        style={{ backgroundColor: '#FAFAFB' }}
      />

      <View style={st.composer}>
        <TextInput style={st.input} placeholder="Nhập tin nhắn..." placeholderTextColor={C.faint} />
        <Pressable style={st.send}><Text style={st.sendTxt}>➤</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.surface },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border },
  back: { fontSize: 30, color: C.indigo, marginRight: 2, marginTop: -4 },
  ava: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  avaTxt: { fontWeight: '700', fontSize: 11 },
  name: { fontSize: 14, fontWeight: '700', color: C.text },
  sub: { fontSize: 11, color: C.faint },
  sys: { textAlign: 'center', fontSize: 11, color: C.faint, marginVertical: 4 },
  rowIn: { flexDirection: 'row', gap: 8, maxWidth: '82%' },
  rowOut: { alignSelf: 'flex-end', alignItems: 'flex-end', maxWidth: '82%' },
  mini: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.tint2, alignItems: 'center', justifyContent: 'center' },
  miniTxt: { color: C.indigoD, fontWeight: '700', fontSize: 11 },
  sender: { fontSize: 11, fontWeight: '600', color: C.muted, marginBottom: 3 },
  bub: { paddingVertical: 9, paddingHorizontal: 12 },
  bubIn: { backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 14, borderBottomLeftRadius: 4, alignSelf: 'flex-start' },
  bubInTxt: { fontSize: 13, color: C.text },
  bubOut: { backgroundColor: C.indigo, borderRadius: 14, borderBottomRightRadius: 4 },
  bubOutTxt: { fontSize: 13, color: '#fff' },
  stamp: { fontSize: 10, color: C.faint, marginTop: 3 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderTopWidth: 1, borderTopColor: C.border },
  input: { flex: 1, backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: C.border, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10, fontSize: 13 },
  send: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.indigo, alignItems: 'center', justifyContent: 'center' },
  sendTxt: { color: '#fff', fontSize: 15 },
});
