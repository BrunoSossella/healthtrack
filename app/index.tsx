import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao HealthTrack! 🩺</Text>

      <Button title="REGISTRO DE ÁGUA" onPress={() => router.push("/agua")} />
      <View style={styles.spacer} />

      <Button
        title="ATIVIDADES FÍSICAS"
        onPress={() => router.push("/atividade")}
      />
      <View style={styles.spacer} />

      <Button
        title="MONITORAMENTO DO SONO"
        onPress={() => router.push("/sono")}
      />
      <View style={styles.spacer} />

      <Button
        title="HISTÓRICO GERAL"
        onPress={() => router.push("/historico")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 40 },
  spacer: { height: 20 },
});
