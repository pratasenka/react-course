import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Counter } from './counter';

describe(Counter, () => {
  const initValue = 0;

  it('should display correct initial count', () => {
    const { getByTestId } = render(<Counter initValue={initValue} />);
    const counterValue: number = Number(getByTestId('counterLabel').textContent);
    expect(counterValue).toEqual(initValue);
  });

  it('should decrement value by 1 if decrement button clicked', () => {
    const { getByRole, getByTestId } = render(<Counter initValue={initValue} />);
    const decrementButton = getByRole('button', { name: '-' });
    fireEvent.click(decrementButton);
    const counterValue: number = Number(getByTestId('counterLabel').textContent);
    expect(counterValue).toEqual(initValue - 1);
  });

  it('should increment value by 1 if increment button clicked', () => {
    const { getByRole, getByTestId } = render(<Counter initValue={initValue} />);
    const incrementButton = getByRole('button', { name: '+' });
    fireEvent.click(incrementButton);
    const counterValue: number = Number(getByTestId('counterLabel').textContent);
    expect(counterValue).toEqual(initValue + 1);
  });
});
