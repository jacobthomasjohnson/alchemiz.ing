export function ActionButton({ label, onClick }) {
      return (
        <button
          onClick={onClick}
          className="p-2 -m-2 outline outline-[1px] rounded-sm text-xs flex items-center outline-[#1C1C1C] group-hover:bg-[#1C1C1C]"
        >
          {label}
        </button>
      );
    }
    