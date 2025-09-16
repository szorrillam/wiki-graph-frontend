import React from 'react';

type ToastMessage = { id: number; type: 'success' | 'error' | 'info'; text: string };

let listeners: Array<(toasts: ToastMessage[]) => void> = [];
let data: ToastMessage[] = [];
let idCounter = 1;

export const toast = {
  success(text: string) {
    push({ id: idCounter++, type: 'success', text });
  },
  error(text: string) {
    push({ id: idCounter++, type: 'error', text });
  },
  info(text: string) {
    push({ id: idCounter++, type: 'info', text });
  },
};

function push(t: ToastMessage) {
  data = [...data, t];
  publish();
  setTimeout(() => {
    data = data.filter((x) => x.id !== t.id);
    publish();
  }, 3500);
}

function publish() {
  for (const l of listeners) l(data);
}

export const ToastArea: React.FC = () => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);
  React.useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((x) => x !== setToasts);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-end p-4">
      <div className="flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`pointer-events-auto card ${t.type === 'error' ? 'border-red-500' : t.type === 'success' ? 'border-green-500' : ''}`}>
            <div className="text-sm">{t.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


