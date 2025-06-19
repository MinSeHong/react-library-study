'use client';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/public/store/store';
import type { AppDispatch } from '@/public/store/store';
import { increment, decrement,incrementByAmount } from '@/public/features/counter/counterSlice';
import Header from '@/app/_components/header';


export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
    <Header/>
    

    <div style={{textAlign:"center", paddingTop:"40px"}}>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(7))}>7</button>
    </div>
    </>
  );
}
