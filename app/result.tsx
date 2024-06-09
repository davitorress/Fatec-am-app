import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 36,
    padding: 26,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 10,
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
  },
})

export default function ResultScreen() {
  const router = useRouter()

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Resultados do Algoritmo</Text>
          <Text>Resultado: {}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
