import {combineReducers} from '@reduxjs/toolkit'

import {reducer as UserReduser} from './auth'

// eslint-disable-next-line import/no-default-export
export default combineReducers({user: UserReduser})