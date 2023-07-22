import React, { useState } from "react";

type ModalProps = {
  isOpen: any;
  onClose: any;
  children: any;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8">
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default Modal;
