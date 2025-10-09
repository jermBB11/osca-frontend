"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, X } from "lucide-react";

interface ModalProps {
  id?: string | number;
  title?: string;
  className?: string;
  buttonLabel?: string;
  children?: React.ReactNode;
  onOpen?: () => void; // ✅ called before modal opens
}

const Modal: React.FC<ModalProps> = ({
  title = "Modal",
  className = "",
  buttonLabel = "Open",
  children,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    if (onOpen) onOpen(); // ✅ trigger record load
    setIsOpen(true);
  }, [onOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className={`btn btn-primary btn-sm rounded text-white ${className}`}
      >
        <Pencil size={15}/>
        {buttonLabel}
      </button>

      {/* Modal Overlay + Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl max-h-[90vh] w-full max-w-5xl overflow-y-auto relative">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4">{children}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
