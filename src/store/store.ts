import { configureStore } from "@reduxjs/toolkit";

import reducer from './root-reducer'

export const store = configureStore({reducer})