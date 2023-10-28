import React from 'react';

import './dropdown.css';

export interface DropdownOption {
  id: string;
  name: string;
  value: string;
}

export function Dropdown(props: any): React.ReactElement {
  return (
    <div className="">
      <div className="">
        <select
          name="dropdown-select"
          data-testid="MoviesSortingSelectDropdown"
          onChange={(e) => props.onClick(e.target.value)}
          defaultValue={props.selected}
        >
          <option
            value=""
          >
            Custom select....
          </option>
          {
                    props.options?.map((option: DropdownOption) => (
                      <option
                        key={option.id}
                        value={option.value}
                      >
                        {option.name}
                      </option>
                    ))
                }
        </select>
      </div>
    </div>
  );
}
