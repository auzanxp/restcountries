import React from 'react';
import CountryLink from './CountryLink';

const SuggestedCountries = ({ collection }) => {
  return (
    <div className='shadow-md w-[700px] mt-[10px] rounded-lg'>
      {collection.map((data, i) => (
        <CountryLink key={i} data={data} />
      ))}
    </div>
  );
};

export default SuggestedCountries;
