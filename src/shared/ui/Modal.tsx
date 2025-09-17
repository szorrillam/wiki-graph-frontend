import React from 'react';

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose(): void;
  footer?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ open, title, children, onClose, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/20 p-4">
      <div className="w-full max-w-lg rounded-lg border border-brand-100 bg-white shadow-xl">
        <div className="flex items-center justify-between rounded-t-lg border-b border-brand-100 bg-brand-50 px-4 py-3">
          <div className="text-sm font-semibold text-brand-700">{title}</div>
          <button className="btn btn-outline" onClick={onClose}>Cerrar</button>
        </div>
        <div className="p-4">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-brand-100 p-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};


