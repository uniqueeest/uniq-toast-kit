// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

interface User {
  id: number;
  name: string;
}

export const handlers = [
  // GET 요청 처리
  http.get('/api/users', () => {
    return HttpResponse.json<User[]>(
      [
        { id: 1, name: '김철수' },
        { id: 2, name: '이영희' },
      ],
      { status: 200 }
    );
  }),

  // POST 요청 처리
  http.post('/api/data', async () => {
    // 50% 확률로 성공 또는 실패 응답을 반환
    if (Math.random() > 0.5) {
      return HttpResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
    } else {
      return HttpResponse.json({ message: '데이터 저장 중 문제가 발생했습니다.' }, { status: 500 });
    }
  }),
];
