import { useState } from 'react';
import { useToast, ToastProvider, ToastInitializer } from 'uniq-toast-kit';

import { saveData } from './apis/dataApi';
import { Toast } from './components/toast';

function Demo() {
  return (
    <ToastProvider>
      <ToastInitializer />
      <Toast />
      <DemoComponent />
    </ToastProvider>
  );
}

function DemoComponent() {
  const { showToast } = useToast();

  const [data, setData] = useState('');

  const handleClick = () => {
    showToast({ title: '성공', description: '내부에서 불러오기' });
  };

  const handleClick2 = () => {
    showToast({
      title: '성공2',
      description: '내부에서 불러오기2',
      duration: 5000,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveData({ data });
    if (success) {
      setData('');
    }
  };

  return (
    <article className="flex flex-col gap-6 p-4">
      <button className="p-4 bg-blue-200" onClick={handleClick}>
        컴포넌트 내부 토스트
      </button>
      <button className="p-4 bg-blue-200" onClick={handleClick2}>
        컴포넌트 내부 토스트2
      </button>
      <form className="flex flex-col items-center gap-2 p-4 border border-blue-200" onSubmit={handleSubmit}>
        <input
          className="p-2 border border-gray-600"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="데이터 입력"
        />
        <button className="p-2 bg-blue-700 text-white" type="submit">
          저장
        </button>
      </form>
    </article>
  );
}

export default Demo;
