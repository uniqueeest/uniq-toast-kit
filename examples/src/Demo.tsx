import { useState } from 'react';
import { useToast, ToastProvider, ToastInitializer } from 'uniq-toast-kit';
import { OverlayContext, overlay, type OverlayProps } from 'uniq-overlay-kit';

import { saveData } from './apis/dataApi';
import { Toast } from './components/toast';

function Demo() {
  return (
    <ToastProvider>
      <OverlayContext>
        <ToastInitializer />
        <Toast />
        <section className="flex flex-col gap-10 h-screen">
          <ToastDemoComponent />
          <div className="w-full h-3 bg-black" />
          <OverlayDemoComponent />
        </section>
      </OverlayContext>
    </ToastProvider>
  );
}

function ToastDemoComponent() {
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

function OverlayDemoComponent() {
  return (
    <article className="flex flex-col gap-6 p-4">
      <button
        className="p-4 bg-blue-200"
        onClick={async () => {
          const result = await overlay.open(<BasicOverlay overlayKey="overlay-data" />);

          if (result === '확인') {
            console.log('확인 되었습니다.');
          } else {
            console.log('취소 되었습니다.');
          }
        }}
      >
        오버레이 열기
      </button>
      <button
        className="p-4 bg-blue-200"
        onClick={() => {
          overlay.open(<BasicOverlay overlayKey="overlay-data2" />);
        }}
      >
        오버레이2 열기
      </button>
    </article>
  );
}

const BasicOverlay = ({ resolve }: OverlayProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center justify-center p-5 w-40 h-40 bg-white">
        <h1>오버레이</h1>
        <div className="flex gap-3">
          <button className="text-blue-500" onClick={() => resolve?.('확인')}>
            확인
          </button>
          <button className="text-red-500" onClick={() => resolve?.('취소')}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
