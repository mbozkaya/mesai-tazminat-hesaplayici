import { useEffect, useRef } from "react";

function Modal({
  open,
  onClose,
  children,
  onSuccess,
  successLabel = "Kaydet",
}) {

  const modalRef = useRef();

  useEffect(() => {
    const handleClick = e => {
      if (!modalRef.current.contains(e.target) && !([...e.target.classList].some(s=>s.includes('react-datepicker')))) {
        onClose();
      }
    };
    if (open) {
      setTimeout(() => {
        document.addEventListener('click', handleClick);
      }, 50)
    } else {
      document.removeEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [open]);

  return (
    <div className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${open ? '' : 'hidden'}`} >
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div ref={open ? modalRef : null} className="inline-block align-center bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full overflow-visible" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[60vh] overflow-y-auto">
            {children}
          </div>
          <div className="px-4 py-3 text-right">
            <button
              type="button"
              className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-700 mr-2"
              onClick={onClose}
            >
              Kapat
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-blue-400 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
              onClick={onSuccess}
            >
              {successLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;