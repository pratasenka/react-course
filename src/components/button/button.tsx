import React from 'react';

export function Button(props: any): React.ReactElement {
  return (
    <button
      {...props}
    >
      {props.children}
    </button>
  );
}
