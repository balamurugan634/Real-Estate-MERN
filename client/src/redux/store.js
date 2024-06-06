import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
const rootreducers=combineReducers({user:userReducer})
const persistconfig={
    key:'root',
    storage,
    version:1
}
const persistreducer=persistReducer(persistconfig,rootreducers)
export const store=configureStore({
    reducer:persistreducer,
    middleware:(getDefaultMiddleware)=>(getDefaultMiddleware)({
        serializableCheck:false,
    }),
}
)
export const persistor=persistStore(store)