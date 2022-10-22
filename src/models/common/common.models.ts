export type CommonReference = {
    id: number
    parentId: number | null
    title: string
    type: {
      code: string
      editable: boolean
      id: number
      title: string
    }
}