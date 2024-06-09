import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import useAlgorithmStore from "@/storage/algorithm"

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
  const { result } = useAlgorithmStore()

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Resultados do Algoritmo</Text>
          <Text>Acurácia: {result?.accuracy}</Text>
          <Text>Melhor indivíduo</Text>
          <Text>x1: {result?.individual?.[0]}</Text>
          <Text>x2: {result?.individual?.[1]}</Text>
          <Text>fitness: {result?.individual?.[2]}</Text>
          <Text>Função custo: {result?.algorithm}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
