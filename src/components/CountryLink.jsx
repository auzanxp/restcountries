import React from 'react';
import { Link, createSearchParams } from 'react-router-dom';

const CountryLink = ({ data }) => {
  return (
    <ul className='gap-[18px]'>
      <li
        key={data.name.common}
        className='text-[18px] pl-[25px] p-2 font-[400] hover:bg-[#F4F4F4]'
      >
        <Link
          to={{
            pathname: '/results',
            search: `?${createSearchParams({
              value: data.name.common,
            })}`,
          }}
        >
          {data.name.common}
        </Link>
      </li>
    </ul>
  );
};

export default CountryLink;
