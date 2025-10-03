interface SideBarProps {
    open: boolean;
    onClose: () => void;
  }
  
  export default function SideBar({ open, onClose }: SideBarProps) {
    return (
      <>
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={onClose}
          />
        )}
  
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="p-2 m-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Fechar
          </button>
  
          <ul className="p-4 space-y-4">
            <li><a href="#">🏠 Home</a></li>
            <li><a href="#">📄 Sobre</a></li>
            <li><a href="#">📞 Contato</a></li>
          </ul>
        </div>
      </>
    );
  }
  