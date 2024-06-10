import { useMutation } from "@tanstack/react-query"

import { request } from "../shared/request"
import useAlgorithmStore, { AlgorithmData, AlgorithmName } from "@/storage/algorithm"

export const useAlgorithm = () => {
  const {
    actions: { setName, setData, setResult },
  } = useAlgorithmStore()

  const mutation = async ({
    name,
    data,
  }: {
    name: AlgorithmName
    data: Partial<AlgorithmData>
  }) => {
    setName(name)
    setData(data)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("dataset", {
      type: "text/csv",
      uri: data.document?.uri,
      name: data.document?.name,
      lastModified: new Date().getTime(),
    } as any)

    switch (name) {
      case "genetic_algorithm":
        return await request({
          url: "/genetic",
          method: "POST",
          body: data,
        })

      case "knn":
        return await request({
          url: "/knn",
          method: "POST",
          body: formData,
          xml: true,
          formDataBody: true,
          stringifyBody: false,
        })

      case "decision_tree":
        return await request({
          url: "/decision_tree",
          method: "POST",
          body: formData,
          xml: true,
          formDataBody: true,
          stringifyBody: false,
        })

      default:
        throw new Error("Algoritmo não encontrado")
    }
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      setResult(data)
    },
  })
}
