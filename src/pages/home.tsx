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
  const dropdownTitle = dropdownItems.find((d) => d === lang);
  const filteredDropDownItems = dropdownItems.filter((i) => i !== dropdownTitle)
  return (
    <div className={styles.container}>
      <h2 className={styles.dropdown_label}>Select Language to get Current Time</h2>
        <div className={styles.dropdown_Section}>
          <LanguageSelectionDropDown
            label='Select Language to get Current Time'
            title={dropdownTitle || 'select Language'}
            items={filteredDropDownItems}
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