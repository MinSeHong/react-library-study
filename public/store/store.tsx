'use client';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// 타입스크립트 추론용 제작
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
