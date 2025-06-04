import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { db } from "@/config/firebaseConfig"; // Certifique-se que o caminho está correto
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";

export default function AguaScreen() {
  const [quantidade, setQuantidade] = useState("");
  const [registros, setRegistros] = useState<any[]>([]); // Armazena os registros do Firebase

  // Listener em tempo real para registros no Firestore
  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, "registrosAgua")), (snapshot) => {
      const lista: any[] = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setRegistros(lista);
    });

    return () => subscriber(); // Cleanup do listener
  }, []);

  // Função para adicionar registro no Firestore
  const adicionarRegistro = async () => {
    if (!quantidade || isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
      Alert.alert("Erro", "Por favor, insira uma quantidade válida.");
      return;
    }

    try {
      await addDoc(collection(db, "registrosAgua"), {
        quantidade: Number(quantidade),
        data: new Date(),
      });
      Alert.alert("Sucesso", "Registro salvo com sucesso!");
      setQuantidade("");
    } catch (error) {
      console.error("Erro ao salvar no Firebase:", error);
      Alert.alert("Erro", "Não foi possível salvar o registro.");
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
        data={registros.sort((a, b) => b.data.seconds - a.data.seconds)} // Ordena do mais recente ao mais antigo
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.quantidade} ml</Text>
            <Text style={styles.data}>
              {new Date(item.data.seconds * 1000).toLocaleString()}
            </Text>
          </View>
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
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  item: { fontSize: 16 },
  data: { fontSize: 12, color: "#777" },
});