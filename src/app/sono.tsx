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

interface Sono {
  data: string;
  horas: string;
}

export default function SonoScreen() {
  const [data, setData] = useState("");
  const [horas, setHoras] = useState("");
  const [registros, setRegistros] = useState<Sono[]>([]);

  const STORAGE_KEY = "@registros_sono";

  useEffect(() => {
    const carregar = async () => {
      const salvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (salvos) setRegistros(JSON.parse(salvos));
    };
    carregar();
  }, []);

  const salvar = async (novos: Sono[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novos));
  };

  const adicionar = () => {
    if (data && horas) {
      const novo = { data, horas };
      const atualizados = [...registros, novo];
      setRegistros(atualizados);
      salvar(atualizados);
      setData("");
      setHoras("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Monitoramento do Sono 🛌</Text>

      <TextInput
        style={styles.input}
        placeholder="Data (ex: 20/05/2025)"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Horas de sono (ex: 7.5)"
        keyboardType="numeric"
        value={horas}
        onChangeText={setHoras}
      />

      <Button title="Adicionar" onPress={adicionar} />

      <Text style={styles.subtitulo}>Registros:</Text>
      <FlatList
        data={registros}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.data} - {item.horas} horas
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
