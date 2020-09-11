import React from 'react';
import { render } from '@testing-library/react';
import ViewGroup from './ViewGroup';

test('renders learn react link', () => {
  const { getByText } = render(<ViewGroup />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
