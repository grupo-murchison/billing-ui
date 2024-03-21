import clsx from 'clsx';

import type { ClassValue } from '@libs/classNameHandler/_types';

export const merge = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};
