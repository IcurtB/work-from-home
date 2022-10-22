import {useMemo} from 'react'
import { useDispatch } from 'react-redux'
import {ActionCreator, bindActionCreators} from '@reduxjs/toolkit'

// eslint-disable-next-line
type AC = ActionCreator<any>
type Bound<A extends AC> = (...args: Parameters<A>) => void

type UseActions = {
  <Fn extends AC>(actions: Fn): Bound<Fn>
  // TODO: prevent passing non-const/non-tuple arrays
  <List extends readonly AC[]>(actions: List): {
    [Index in keyof List]: Bound<List[Index]>
  }
  <Map extends Record<string, AC>>(actions: Map): {
    [Key in keyof Map]: Bound<Map[Key]>
  }
}

// eslint-disable-next-line
export const useActions: UseActions = (actions: any) => {
    const dispath = useDispatch()

    return useMemo(() => {
        if(Array.isArray(actions)) {
            return actions.map((val) => bindActionCreators(val, dispath))
        }
        return bindActionCreators(actions, dispath)
    }, [actions, dispath])
}