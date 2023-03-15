import { LanguageSelectionDropDown } from "../components/custom-dropdown";
import { useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';
import { DisplayTime } from "../components/time";
import '../App.css';

const HomePage = () => {
  const [searchParms] = useSearchParams();
  const dropdownItems = [
    'en-US',
    'en-GB',
    'pt-BR',
  ];
  const lang = searchParms.get('lang');
  const timezone = searchParms.get('tz');
  return (
    <div className={styles.container}>
      <h2 className={styles.dropdown_label}>Select timezone to get Current Time</h2>
        <div className={styles.dropdown_Section}>
          <LanguageSelectionDropDown
            title={lang ? `${lang} (${timezone})` : 'select TimeZone'}
            items={dropdownItems}
          />
        </div>
        {lang &&
          <div className={styles.time_Section}>
            <DisplayTime />
          </div>
        }
    </div>
  )
}
export default HomePage;