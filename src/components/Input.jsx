const Input = ({ placeholder, onChange }) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      className='w-full h-full pl-[28px] font-[500] rounded-lg text-[18px] focus:outline-primary'
      onChange={onChange}
    />
  );
};

export default Input;