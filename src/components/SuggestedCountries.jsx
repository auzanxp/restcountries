import React from 'react';
import CountryLink from './CountryLink';


const SuggestedCountries = ({ collection }) => {
  return (
    <div className='shadow-md w-[700px] mt-[10px] rounded-lg '>
      {collection.map((data) => (
        <CountryLink key={data.name.common} data={data} />
      ))}
    </div>
  );
};

export default SuggestedCountries;
