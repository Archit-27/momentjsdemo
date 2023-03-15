import { useSearchParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Clock } from '../clock';

export const DisplayTime = () => {
  const [searchParms] = useSearchParams();
  const [currentDateTime, setCurrentDateTime] = useState({
    currentDate: '',
    currentTime: ''
  });
  const [clockDegs, setClockDegs] = useState({
    secondDegrees: 0,
    minutesDegrees: 0,
    hoursDegrees: 0,
  });
  const timeZone = searchParms.get('tz');
  const country = searchParms.get('country');
  // const countryCode: any = lang?.match(/[A-Z]{2}/g)?.toString() ?? 'US';
  // const country = getCountry(countryCode) ?? {};
  // const timeZone = country?.timezones?.[0] ?? '';
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const currentTimeZone = moment().tz(timeZone ?? '')
      const currentDate = currentTimeZone.format('dddd, MMMM DD YYYY');
      const currentTime = currentTimeZone.format('h:mm:ss A');
      setCurrentDateTime({ currentDate, currentTime });
      const seconds = moment(currentTimeZone).get('seconds');
      const secondDegrees = (seconds / 60) * 360 + 90;
      const minutes = moment(currentTimeZone).get('minutes');
      const minutesDegrees = (minutes / 60) * 360 + 90;
      const hours = moment(currentTimeZone).get('hours');
      const hoursDegrees = (hours / 12) * 360 + 90;
      setClockDegs({ secondDegrees, minutesDegrees, hoursDegrees });
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [timeZone]);

  return (
    <>
      <h2>Country: {country}</h2>
      <h2>Timezone: {timeZone}</h2>
      <Clock clockDegs={clockDegs} />
      <span className={styles.time_Text}>{currentDateTime.currentTime}</span>
      <h2 className={styles.date_Text}>{currentDateTime.currentDate}</h2>
    </>
  )
}
