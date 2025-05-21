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

export default function AguaScreen() {
  const [quantidade, setQuantidade] = useState("");
  const [registros, setRegistros] = useState<string[]>([]);

  const STORAGE_KEY = "@registros_agua";

  // Carregar registros ao abrir a tela
  useEffect(() => {
    const carregarRegistros = async () => {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (dadosSalvos) {
        setRegistros(JSON.parse(dadosSalvos));
      }
    };
    carregarRegistros();
  }, []);

  // Salvar registros no AsyncStorage
  const salvarRegistros = async (novosRegistros: string[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosRegistros));
  };

  const adicionarRegistro = () => {
    if (quantidade) {
      const novos = [...registros, `${quantidade} ml`];
      setRegistros(novos);
      salvarRegistros(novos);
      setQuantidade("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Água 💧</Text>

      <TextInput
        style={styles.input}
        placeholder="Quantidade (ml)"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Button title="Adicionar" onPress={adicionarRegistro} />

      <Text style={styles.subtitulo}>Registros:</Text>
      <FlatList
        data={registros}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
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
