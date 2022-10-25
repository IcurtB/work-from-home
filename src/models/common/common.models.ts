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
  limit: number
  page: number
}

export type PageSortingModel = {
  sortBy: string
  sortDirection: string
}
export type FilterModel = {
  parentId?: number
  title?: string
  typeCode?: string
  typeId?: number
}
export type FilterCommonReferenceModel = SearchModel<FilterModel>

export type SearchModel<Shape extends AnyShape> = {
  filter: Shape
  pageRequest: PageRequestModel
  sorting: PageSortingModel
}
export type SearchResponseModel<Shape extends AnyShape> = {
  content: Shape[]
  numberOfElements: number
  page: number
  totalElements: number
  totalPages: number
}
export type PageFilterResponseModel = SearchResponseModel<CommonReference>

export type RolesResponseModel = {
  id: number
  code: string
  roadmaps: RoadmapsResponseModel[]
}

type RoadmapsResponseModel = {
  id: number
  actionType: string
}
