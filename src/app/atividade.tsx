import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Atividade {
  nome: string;
  duracao: string;
  data: string;
}

export default function AtividadeScreen() {
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [data, setData] = useState("");
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  const STORAGE_KEY = "@atividades";

  useEffect(() => {
    const carregar = async () => {
      const salvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (salvos) setAtividades(JSON.parse(salvos));
    };
    carregar();
  }, []);

  const salvar = async (novas: Atividade[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novas));
  };

  const adicionar = () => {
    if (nome && duracao && data) {
      const nova = { nome, duracao, data };
      const atualizadas = [...atividades, nova];
      setAtividades(atualizadas);
      salvar(atualizadas);
      setNome("");
      setDuracao("");
      setData("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Atividades 🏃‍♀️</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da atividade"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Duração (minutos)"
        keyboardType="numeric"
        value={duracao}
        onChangeText={setDuracao}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (ex: 20/05/2025)"
        value={data}
        onChangeText={setData}
      />

      <Button title="Adicionar" onPress={adicionar} />

      <Text style={styles.subtitulo}>Atividades cadastradas:</Text>
      <FlatList
        data={atividades}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.data} - {item.nome} ({item.duracao} min)
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitulo: { fontSize: 18, marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: { padding: 8, fontSize: 16, borderBottomWidth: 1, borderColor: "#eee" },
});
