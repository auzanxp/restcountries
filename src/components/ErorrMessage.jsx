const ErrorMessage = ({ message }) => {
  return (
    <div className='shadow-md w-[700px] mt-[10px] rounded-lg'>
      <h1 className='text-[18px] pl-[25px] p-2 text-[#FF0000] font-[400]'>
        {message}
      </h1>
    </div>
  );
};

export default ErrorMessage;
