'use client';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/public/store/store';
import type { AppDispatch } from '@/public/store/store';
import { increment, decrement } from '@/public/features/counter/counterSlice';


export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}
