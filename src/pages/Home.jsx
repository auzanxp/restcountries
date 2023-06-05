import { useEffect, useState } from 'react';
import Input from '../components/Input';
import ErrorMessage from '../components/ErorrMessage';
import SuggestedCountries from '../components/SuggestedCountries';

const Home = () => {
  const [collection, setCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (searchQuery) {
            const api = `https://restcountries.com/v3.1/name/${searchQuery}`;
          const response = await fetch(api);
          const results = await response.json();

          if (results.status === 404) {
            setIsNotFound(true);
          } else {
            setIsNotFound(false);
            setCollection(results.slice(0, 5));
          }
        } else {
          setIsNotFound(false);
          setCollection([]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    clearTimeout(typingTimeout);
    if (searchQuery !== '') {
      const timeout = setTimeout(fetchApi, 800);
      setTypingTimeout(timeout);
    } else {
      setIsNotFound(false);
      setCollection([]);
    }
  }, [searchQuery]);

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
      <h1 className='text-[72px] font-[700] mb-[41px]'>Country</h1>

      <div className='flex items-center group rounded-lg justify-center w-[700px] h-[60px] relative border-[0.5px] border-[#C8C8C8]'>
        <Input
          placeholder='Type any country name'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          width='23'
          height='23'
          fill='#C8C8C8'
          viewBox='0 0 23 23'
          className='w-[21.88px] absolute right-[18.75px] top-5 group-focus:fill-[#8362F2]'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M8.875 0.75C11.0299 0.75 13.0965 1.60602 14.6202 3.12976C16.144 4.65349 17 6.72012 17 8.875C17 10.8875 16.2625 12.7375 15.05 14.1625L15.3875 14.5H16.375L22.625 20.75L20.75 22.625L14.5 16.375V15.3875L14.1625 15.05C12.6882 16.3085 10.8134 16.9999 8.875 17C6.72012 17 4.65349 16.144 3.12976 14.6202C1.60602 13.0965 0.75 11.0299 0.75 8.875C0.75 6.72012 1.60602 4.65349 3.12976 3.12976C4.65349 1.60602 6.72012 0.75 8.875 0.75ZM8.875 3.25C5.75 3.25 3.25 5.75 3.25 8.875C3.25 12 5.75 14.5 8.875 14.5C12 14.5 14.5 12 14.5 8.875C14.5 5.75 12 3.25 8.875 3.25Z' />
        </svg>
      </div>

      {isNotFound && searchQuery !== '' ? (
        <ErrorMessage message='Data not found!' />
      ) : (
        <SuggestedCountries collection={collection} />
      )}
    </div>
  );
};

export default Home;
