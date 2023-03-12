import cn from 'classnames';
import { FC, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../hooks/useOnclickOutside';
import { Button } from '../button';
import ArrowDown from '../../icons/arrow-down.svg';
import styles from './styles.module.css';

interface ILanguageSelectionDropDown {
  items?: string[]
  label?: string
  title?: string
}

export const LanguageSelectionDropDown: FC<ILanguageSelectionDropDown> = (
  props
) => {
  const { label, title, items } = props;
  const dropDownRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParms] = useSearchParams();
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  }

  const closeDropDown = () => {
    setIsOpen(false);
  }

  const handleDropDownItemClick = (lang: string) => {
    searchParms.set('lang', lang);
    const searchStr = searchParms.toString();
    navigate(`?${searchStr}`);
    closeDropDown();
  }

  useOnClickOutside(dropDownRef, closeDropDown);

  return (
    <div className={styles.language_Dropdown}>
      <div className={styles.dropdown_contain} ref={dropDownRef}>
        <Button className={styles.dropdown_btn} onClick={toggleDropDown}>
          {title}
          <img src={ArrowDown} alt='arrow' className={cn({ [styles.rotate]: isOpen })} />
        </Button>
        <div className={cn(styles.dropdown_Items, { [styles.open]: isOpen })}>
          {!!items?.length &&
            items.map((i) => (
              <Button
                key={i}
                className={styles.dropdown_Item}
                onClick={() => handleDropDownItemClick(i)}
              >
                {i}
              </Button>
            ))}
        </div>
      </div>
    </div>
  )
}
