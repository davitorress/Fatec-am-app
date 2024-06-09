import { useState } from "react"
import { useRouter } from "expo-router"
import { Picker } from "@react-native-picker/picker"
import { SafeAreaView } from "react-native-safe-area-context"
import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker"
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"

import useAlgorithmStore, { AlgorithmData, AlgorithmName } from "@/storage/algorithm"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 36,
    padding: 26,
  },
  form: {
    rowGap: 16,
  },
  fieldsRow: {
    columnGap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  picker: {
    backgroundColor: "#fafafa",
  },
  input: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 4,
    backgroundColor: "#fafafa",
  },
  fieldRow: {
    width: "45%",
  },
})

type MutationRate = 1 | 3 | 5
type AlgorithmDataType = Partial<Omit<AlgorithmData, "document">> | undefined

export default function HomeScreen() {
  const router = useRouter()
  const { setName, setData } = useAlgorithmStore().actions

  const [algorithm, setAlgorithm] = useState<AlgorithmName>("knn")
  const [mutationRate, setMutationRate] = useState<MutationRate>(1)
  const [dataset, setDataset] = useState<DocumentPickerAsset | null>(null)
  const [algorithmData, setAlgorithmData] = useState<AlgorithmDataType>(undefined)

  const handleAlgorithmChange = (value: AlgorithmName) => {
    setAlgorithm(value)
  }

  const handleMutationRateChange = (value: MutationRate) => {
    setMutationRate(value)
    setAlgorithmData({ ...algorithmData, mutationRate: value })
  }

  const chooseDataset = async () => {
    const document = await getDocumentAsync({
      multiple: false,
      type: ["text/csv", "text/data", "text/comma-separated-values"],
    })

    if (!document.canceled) {
      console.log("dataset", document.assets[0])
      setDataset(document.assets[0])
    }
  }

  const handleStartAlgorithm = () => {
    if (algorithm === "genetic_algorithm") {
      if (!algorithmData) {
        throw new Error("Preencha as informações do algoritmo genético")
      }

      setData({
        ...algorithmData,
      })
    } else {
      if (!dataset) {
        throw new Error("Escolha uma base de dados válida")
      }

      setData({
        document: dataset,
      })
    }

    setName(algorithm)
    router.push("result")
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>FATEC - App de Aprendizagem de Máquina</Text>
            <Text style={styles.subtitle}>Aluno: Davi Torres</Text>
          </View>

          <View>
            <Text style={styles.label}>Escolha um algoritmo:</Text>
            <Picker
              style={styles.picker}
              selectedValue={algorithm}
              onValueChange={handleAlgorithmChange}
            >
              <Picker.Item label="KNN" value="knn" />
              <Picker.Item label="Árvore de Decisão" value="decision_tree" />
              <Picker.Item label="Algoritmo Genético" value="genetic_algorithm" />
            </Picker>
          </View>

          {algorithm === "genetic_algorithm" ? (
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Número de gerações:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) =>
                    setAlgorithmData({ ...algorithmData, generations: Number(text) })
                  }
                />
              </View>

              <View>
                <Text style={styles.label}>Tamanho da população:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={(text) =>
                    setAlgorithmData({ ...algorithmData, populationSize: Number(text) })
                  }
                />
              </View>

              <View>
                <Text style={styles.label}>Número de filhos por geração:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) =>
                    setAlgorithmData({ ...algorithmData, childrenSize: Number(text) })
                  }
                />
              </View>

              <View>
                <Text style={styles.label}>Taxa de Mutação:</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={mutationRate}
                  onValueChange={handleMutationRateChange}
                >
                  <Picker.Item label="1%" value={1} />
                  <Picker.Item label="3%" value={3} />
                  <Picker.Item label="5%" value={5} />
                </Picker>
              </View>

              <View style={styles.fieldsRow}>
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Menor valor:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={(text) =>
                      setAlgorithmData({ ...algorithmData, rangeMin: Number(text) })
                    }
                  />
                </View>

                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Maior valor:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={(text) =>
                      setAlgorithmData({ ...algorithmData, rangeMax: Number(text) })
                    }
                  />
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.label}>Escolha um banco de dados:</Text>
              <Button title="Escolher banco de dados" onPress={chooseDataset} />
            </View>
          )}

          <View>
            <Button title="Iniciar" onPress={handleStartAlgorithm} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
