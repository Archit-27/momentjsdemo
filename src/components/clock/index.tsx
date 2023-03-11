import { FC } from 'react';
import styles from './styles.module.css';

interface IClock {
  clockDegs: {
    secondDegrees: number;
    minutesDegrees: number;
    hoursDegrees: number;
  }
}

export const Clock: FC<IClock> = ({ clockDegs }) => {

  return (
    <div className={styles.clock_Wrapper}>
      <div className={styles.clock}>
        <div style={{ transform: `rotate(${clockDegs.secondDegrees}deg)` }} className={styles.second} />
        <div style={{ transform: `rotate(${clockDegs.minutesDegrees}deg)` }} className={styles.minute} />
        <div style={{ transform: `rotate(${clockDegs.hoursDegrees}deg)` }} className={styles.hour} />
      </div>
    </div>
  )
}