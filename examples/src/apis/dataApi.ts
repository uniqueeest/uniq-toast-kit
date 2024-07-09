import { toastApi } from 'uniq-toast-kit';

export const saveData = async (data: any) => {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      toastApi.create({ title: '성공', description: result.message });
      return true;
    } else {
      toastApi.create({ title: '오류', description: result.message });
      return false;
    }
  } catch (error) {
    toastApi.create({
      title: '오류',
      description: '네트워크 오류가 발생했습니다.',
    });
    return false;
  }
};
