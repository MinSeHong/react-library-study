'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import { useQuery } from '@tanstack/react-query';
import Header from "@/app/_components/header";

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
    
  if (isLoading) return (
    <>
      <Header/>
      <h1 style={{textAlign:"center", paddingTop:"40px"}}>Loading</h1>
    </>
);

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <>
    <Header/>

    <div style={{textAlign:"center", paddingTop:"40px"}}>
    <h1>게시글 목록 가져오기</h1>
      <ul>
        {data.map((post: any) => (
          <div key={post.id} style={{border:"1px solid black"}}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </div>
        ))}
      </ul>
    </div>
    </>
  );
}
