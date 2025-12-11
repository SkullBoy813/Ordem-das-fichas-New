export default function Modal({children, open, onClose}){
    if(!open) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
        <div className="bg-[#0b0b0b] p-6 rounded-lg border border-red-800 z-10 w-96">
          {children}
        </div>
      </div>
    )
  }