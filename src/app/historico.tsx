import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoricoScreen() {
  const [agua, setAgua] = useState<string[]>([]);
  const [sono, setSono] = useState<{ data: string; horas: string }[]>([]);
  const [atividade, setAtividade] = useState<
    { nome: string; duracao: string; data: string }[]
  >([]);

  useEffect(() => {
    const carregar = async () => {
      const aguaSalva = await AsyncStorage.getItem("@registros_agua");
      const sonoSalvo = await AsyncStorage.getItem("@registros_sono");
      const atividadesSalvas = await AsyncStorage.getItem("@atividades");

      if (aguaSalva) setAgua(JSON.parse(aguaSalva));
      if (sonoSalvo) setSono(JSON.parse(sonoSalvo));
      if (atividadesSalvas) setAtividade(JSON.parse(atividadesSalvas));
    };

    carregar();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>📋 Histórico Geral</Text>

      <Text style={styles.subtitulo}>💧 Água</Text>
      {agua.length > 0 ? (
        agua.map((item, i) => (
          <Text key={i} style={styles.item}>
            • {item}
          </Text>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}

      <Text style={styles.subtitulo}>😴 Sono</Text>
      {sono.length > 0 ? (
        sono.map((item, i) => (
          <Text key={i} style={styles.item}>
            • {item.data} — {item.horas} horas
          </Text>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}

      <Text style={styles.subtitulo}>🏋️ Atividades</Text>
      {atividade.length > 0 ? (
        atividade.map((item, i) => (
          <Text key={i} style={styles.item}>
            • {item.data} — {item.nome} ({item.duracao} min)
          </Text>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 5,
  },
  item: { fontSize: 16, paddingVertical: 2 },
  vazio: { fontSize: 14, color: "#888" },
});
