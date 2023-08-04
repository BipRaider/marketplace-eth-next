import React from 'react';
import cn from 'classnames';

import { Loader } from '@src/components/common';
import { IndicatorProps } from './props';

// https://emojipedia.org/search/?q=Circle
export const Indicator: React.FC<IndicatorProps> = ({
  className,
  children,
  text,
  color,
  greenIcon,
  redIcon,
  loading,
  yellowIcon,
  size,
}): React.JSX.Element => {
  if (text) {
    return (
      <span
        className={cn(className, {
          ['text-lime-600']: color === 'green',
          ['text-red-600']: color === 'red',
        })}
      >
        {children}
      </span>
    );
  }
  if (greenIcon) return <span className={cn(className)}>{'🟢'}</span>;
  if (redIcon) return <span className={cn(className)}>{'🔴'}</span>;
  if (yellowIcon) return <span className={cn(className)}>{'🟡'}</span>;
  if (loading) return <Loader size={size ? size : 'sm'} />;
  return <>{children}</>;
};
