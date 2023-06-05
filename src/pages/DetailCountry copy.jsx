import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import globeImage from './../assets/globe.svg';
import Button from '../components/Button';
import Flag from '../components/Flag';
import { getFormattedCountryData } from '../services/Api';

const DetailCountry = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('search');

  const [collection, setCollection] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currencies, setCurrencies] = useState('');
  const [resultsByPhoneNumber, setResultsByPhoneNumber] = useState([]);
  const [resultsByCurrencies, setResultsByCurrencies] = useState([]);
  const [isHoverCallingCode, setIsHoverCallingCode] = useState(false);
  const [isHoverCurrencies, setIsHoverCurrencies] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${keyword}?fullText=true`
        );
        setCollection(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
      const getGet = async () => {
          const data = await getFormattedCountryData(keyword)
          console.log(data)
      }
      fetchData();
      getGet()
      
  }, [keyword]);

  const getApiByPhoneNumber = async (number) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/callingcode/${number}`
      );
      setResultsByPhoneNumber(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getApiByCurrency = async (currencies) => {
    setCurrencies(currencies);
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/currency/${currencies}`
      );
      setResultsByCurrencies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    collection.forEach((data) => {
      if (data.currencies) {
        const currenciesCountry = data.currencies;
        const currency = Object.keys(currenciesCountry)[0];
        getApiByCurrency(currency);
      }

      const callingCodeFromApi = data.idd;
      const callingCodeRoot = callingCodeFromApi.root;
      const callingCodeSuffixes = callingCodeFromApi.suffixes;
      const callingCode = callingCodeRoot + callingCodeSuffixes;
      const callingCodeWithoutPlus = callingCode.split('+').join('');
      setPhoneNumber(callingCodeWithoutPlus);
      getApiByPhoneNumber(callingCodeWithoutPlus);
    });
  }, [collection]);

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <>
      {collection.map((data) => (
        <div key={data.name.common} className='pl-[90px]'>
          <Button
            onClick={handleNavigate}
            className='bg-[#8362F2] flex items-center justify-center gap-6 w-[229px] h-[50px] mt-[70px] rounded-[10px]'
          >
            <svg
              width='18'
              height='16'
              viewBox='0 0 18 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 1L1 8L8 15'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1 8H17'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-[#FFFFFF] font-[500] text-[18px] leading-[21px]'>
              Back to Homepage
            </span>
          </Button>

          {/* Section 1 */}
          <div className='mt-[50px]'>
            <div className='flex items-center gap-[10px]'>
              <h1 className='text-[#000000] font-[700] text-[48px]'>
                {data.name.common}
              </h1>
              <div className='mt-3'>
                <Flag
                  src={data.flags.svg}
                  alt='flags'
                  width='46px'
                  height='30px'
                />
              </div>
            </div>
            <div>
              <ul className='flex gap-[5px]'>
                {data.altSpellings.map((spelling) => (
                  <li
                    key={spelling}
                    className='p-1 px-[15px] bg-[#8DD4CC] rounded-[50px] grid place-items-center text-white font-[700] text-[12px]'
                  >
                    {spelling}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className='flex gap-[25px] mt-[31px]'>
            <div className='w-[540px] h-[143px] relative flex overflow-hidden rounded-[5px] shadow-md'>
              <div className='pt-[25px] pl-[25px]'>
                <h1 className='font-[500] text-[18px]'>LatLong</h1>
                <div className='text-[#8362F2] text-[48px] font-[700]'>
                  <div className='flex gap-3'>
                    <span className='font-[500]'>
                      {data.latlng[0]}, {data.latlng[1]}
                    </span>
                  </div>
                </div>
              </div>
              <div className='absolute top-[20px] right-0'>
                <img src={globeImage} alt='globe' className='w-[204px]' />
              </div>
            </div>

            {/* Additional info */}
            <div className='w-[540px] h-[143px] pt-[25px] pl-[25px] rounded-[5px] shadow-md'>
              <ul>
                <li className='font-[400] text-[18px]'>
                  Capital :{' '}
                  <span className='font-[500]'>{data.capital[0]}</span>
                </li>
                <li className='font-[400] text-[18px]'>
                  Region : <span className='font-[500]'>{data.region}</span>
                </li>
                <li className='font-[400] text-[18px]'>
                  Subregion :{' '}
                  <span className='font-[500]'>{data.subregion}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* Section 3 */}
      <div className='pl-[90px]'>
        <div className='flex gap-[25px] mt-[31px]'>
          {/* Calling code */}
          <div className='w-[540px] h-[143px] pt-[25px] pl-[25px]'>
            <h1 className='font-[500] text-[18px]'>Calling Code</h1>
            <p className='text-[#8362F2] font-[700] text-[48px]'>
              +{phoneNumber}
            </p>
            <p className='font-[500]'>
              <span
                className='text-[#8362F2] underline cursor-pointer'
                onMouseEnter={() => setIsHoverCallingCode(true)}
              >
                {resultsByPhoneNumber.length} country
              </span>{' '}
              with this calling code
            </p>
            <div
              className={
                isHoverCallingCode
                  ? 'max-w-[300px] bg-[#525252] p-2 '
                  : 'hidden'
              }
              onMouseLeave={() => setIsHoverCallingCode(false)}
            >
              <ul className='pl-5 pt-2 space-y-1'>
                {resultsByPhoneNumber.map((data) => (
                  <li
                    key={data.name}
                    className='text-white font-[500] text-[14px]'
                  >
                    {data.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Currencies */}
          <div className='w-[540px] h-[143px] pt-[25px] pl-[25px]'>
            <h1 className='font-[500] text-[18px]'>Currency</h1>
            <p className='text-[#8362F2] font-[700] text-[48px]'>
              {currencies}
            </p>
            <p className='font-[500]'>
              <span
                className='text-[#8362F2] underline cursor-pointer'
                onMouseEnter={() => setIsHoverCurrencies(true)}
              >
                {resultsByCurrencies.length} country{' '}
              </span>
              with this currency
            </p>
            <div
              className={
                isHoverCurrencies ? 'max-w-[300px] bg-[#525252] p-2 ' : 'hidden'
              }
              onMouseLeave={() => setIsHoverCurrencies(false)}
            >
              <ul className='pl-5 pt-2 space-y-1'>
                {resultsByCurrencies.map((data) => (
                  <li
                    key={data.name}
                    className='text-white font-[500] text-[14px]'
                  >
                    {data.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCountry;
