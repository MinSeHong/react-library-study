'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import { useQuery } from '@tanstack/react-query';

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('네트워크 응답 에러');
  return res.json();
}


export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
    
  if (isLoading) return <p>로딩중...</p>;

  if (isError) return <p>에러 발생: {(error as Error).message}</p>;

  return (
    <div className={styles.page}>
    <h1>게시글 목록</h1>
      <ul>
        {data.map((post: any) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
