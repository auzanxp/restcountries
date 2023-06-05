import React from 'react';
import { Link, createSearchParams } from 'react-router-dom';

const CountryLink = ({ data }) => {
  const handleClick = () => {
    window.location.href = `results?${createSearchParams({
      search: data.name.common,
    })}`;
  };
  return (
    <ul className='gap-[18px]'>
      <li
        key={data.name.common}
        onClick={handleClick}
        className='text-[18px] pl-[25px] p-2 font-[400] hover:cursor-pointer hover:bg-[#F4F4F4]'
      >
        <Link
          to={`results?${createSearchParams({
            search: data.name.common,
          })}`}
        >
          {data.name.common}
        </Link>
      </li>
    </ul>
  );
};

export default CountryLink;
