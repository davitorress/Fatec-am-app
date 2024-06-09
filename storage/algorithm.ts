import { create } from "zustand"
import { DocumentPickerAsset } from "expo-document-picker"

export type AlgorithmName = "knn" | "decision_tree" | "genetic_algorithm"

export interface AlgorithmData {
  document: DocumentPickerAsset
  rangeMin: number
  rangeMax: number
  generations: number
  childrenSize: number
  mutationRate: number
  populationSize: number
}

interface AlgorithmStoreProps {
  name: AlgorithmName
  data?: Partial<AlgorithmData>
}

interface AlgorithmStoreActions {
  clearState: () => void
  setName: (name: AlgorithmName) => void
  setData: (data: Partial<AlgorithmData>) => void
}

type AlgorithmStore = AlgorithmStoreProps & {
  actions: AlgorithmStoreActions
}

const initialState: AlgorithmStoreProps = {
  name: "knn",
  data: undefined,
}

const useAlgorithmStore = create<AlgorithmStore>((set, get) => ({
  ...initialState,
  actions: {
    clearState: () => set(initialState),

    setName: (name) => {
      if (name === get().name) return
      set({ name })
    },
    setData: (data) => {
      if (data === get().data) return
      set({ data })
    },
  },
}))

export default useAlgorithmStore
