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

export type PageRequestModel = {
  limit: number,
  page: number
}

export type PageSortingModel = {
  sortBy: string,
  sortDirection: string
}

export type PageFilterResponseModel = {
  content: any[],
  numberOfElements: number,
  page: number,
  totalElements: number,
  totalPages: number
}

export type RolesResponseModel = {
  id: number,
  code: string,
  roadmaps: RoadmapsResponseModel[]
}

type RoadmapsResponseModel = {
  id: number,
  actionType: string
}