const Button = ({ onClick, children }) => {
  return (
    <button
      className='bg-primary flex items-center justify-center gap-6 w-[229px] h-[50px] mt-[70px] rounded-[10px]'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
