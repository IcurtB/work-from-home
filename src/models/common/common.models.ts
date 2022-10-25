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
export type FilterModel = {
  parentId?: number,
  title?: string,
  typeCode?: string,
  typeId?: number,
}
export type FilterCommonReferenceModel = {
  filter: FilterModel,
  pageRequest:PageRequestModel,
  sorting: PageSortingModel

}
export type PageFilterResponseModel = {
  content: CommonReference[],
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
