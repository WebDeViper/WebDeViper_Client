interface ButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
}

export function Button({ children, handleClick }: ButtonProps) {
  return (
    <button
      className="align-middle text-center rounded-lg bg-primary-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md shadow-primary-500/20 transition-all hover:shadow-lg hover:shadow-primary-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
