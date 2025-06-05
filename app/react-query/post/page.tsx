'use client'

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

//게시글 생성 시 보낼 데이터 타입스크립트
interface NewPost {
  title: string;
  body: string;
  userId: number;
}

//서버 응답 타입
interface CreatedPost extends NewPost {
  id: number;
}

async function createPost(newPost: NewPost): Promise<CreatedPost> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) throw new Error('게시글 생성 실패');

  return res.json();
}



export default function PostCreator() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { mutate, data, isPending, isSuccess, isError, error } = useMutation<CreatedPost, Error, NewPost>({
    mutationFn: createPost,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      title,
      body,
      userId: 1,
    });
  };
  
  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <br />
        <textarea placeholder="내용" value={body} onChange={(e) => setBody(e.target.value)}/>
        <br />
        <button type="submit" disabled={isPending}>
          {isPending ? '작성 중...' : '작성하기'}
        </button>
      </form>

      {isError && <p style={{ color: 'red' }}>에러: {error.message}</p>}
      {isSuccess && data && (
        <div>
          <h3>게시 성공!</h3>
          <p>ID: {data.id}</p>
          <p>제목: {data.title}</p>
          <p>내용: {data.body}</p>
        </div>
      )}
    </div>
  );
}