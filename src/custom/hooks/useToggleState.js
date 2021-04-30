import {useState} from 'react';

export function useToggleState(initialState = false) {
  const [checked, setChecked] = useState(initialState);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return {checked, onChange: onCheckedChange};
}
