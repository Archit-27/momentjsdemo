import cn from 'classnames';
import { FC, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../hooks/useOnclickOutside';
import { Button } from '../button';
import ArrowDown from '../../icons/arrow-down.svg';
import styles from './styles.module.css';
import { getCountry } from 'countries-and-timezones';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
interface ILanguageSelectionDropDown {
  items?: string[];
  title?: string;
}

export const LanguageSelectionDropDown: FC<ILanguageSelectionDropDown> = (
  props
) => {
  const [openSubMenu, setOpenSubmenu] = useState(-1);
  const { title, items } = props;
  const dropDownRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParms] = useSearchParams();
  const tz = searchParms.get('tz');
  const navigate = useNavigate();
  const dropdownItems = items?.map((i) => {
    const countryCode = i?.match(/[A-Z]{2}/g)?.toString() ?? 'US';
    const country: any = getCountry(countryCode) ?? {};
    return { label: i, subMenu: country?.timezones, country: country.name };
  });
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropDown = () => {
    setOpenSubmenu(-1);
    setIsOpen(false);
  };

  const handleDropDownItemClick = (index: number) => {
    if (openSubMenu === index) {
      setOpenSubmenu(-1);
    } else {
      setOpenSubmenu(index);
    }
  };

  const handleTimeZoneClick = (
    lang: string,
    timeZone: string,
    country: string
  ) => {
    searchParms.set('lang', lang);
    searchParms.set('tz', timeZone);
    searchParms.set('country', country);
    const searchStr = searchParms.toString();
    navigate(`?${searchStr}`);
    setOpenSubmenu(-1);
    closeDropDown();
  };
  useOnClickOutside(dropDownRef, closeDropDown);

  return (
    <div className={styles.language_Dropdown}>
      <div className={styles.dropdown_contain} ref={dropDownRef}>
        <Button className={styles.dropdown_btn} onClick={toggleDropDown}>
          {title}
          <img
            src={ArrowDown}
            alt='arrow'
            className={cn({ [styles.rotate]: isOpen })}
          />
        </Button>
        <div className={cn(styles.dropdown_Items, { [styles.open]: isOpen })}>
          {!!dropdownItems?.length &&
            dropdownItems.map((i, index) => (
              <div className={styles.dropdownItem_Wrapper} key={i.label}>
                <Button
                  className={styles.dropdown_Item}
                  onClick={() => handleDropDownItemClick(index)}
                >
                  {i.label}
                  {openSubMenu === index ? <RemoveIcon/> : <AddIcon/>}
                </Button>
                {openSubMenu === index &&
                  i.subMenu.length &&
                  i.subMenu.map((t: any) => (
                    <Button
                      key={t}
                      className={cn(styles.dropdowntz_Item, {[styles.selected_Item] : t === tz})}
                      onClick={() => handleTimeZoneClick(i.label, t, i.country)}
                    >
                      {t}
                    </Button>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
