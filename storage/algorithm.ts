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

export interface AlgorithmResult {
  accuracy?: number
  algorithm?: string
  individual?: number[]
}

interface AlgorithmStoreProps {
  name: AlgorithmName
  data?: Partial<AlgorithmData>
  result?: AlgorithmResult
}

interface AlgorithmStoreActions {
  clearState: () => void
  setName: (name: AlgorithmName) => void
  setData: (data: Partial<AlgorithmData>) => void
  setResult: (result: AlgorithmResult) => void
}

type AlgorithmStore = AlgorithmStoreProps & {
  actions: AlgorithmStoreActions
}

const initialState: AlgorithmStoreProps = {
  name: "knn",
  data: undefined,
  result: undefined,
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
    setResult: (result) => {
      if (result === get().result) return
      set({ result })
    },
  },
}))

export default useAlgorithmStore
