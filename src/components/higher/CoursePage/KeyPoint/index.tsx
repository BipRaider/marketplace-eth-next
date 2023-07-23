import React from 'react';
import cn from 'classnames';

import { KeyPointProps } from './props';
import { KeyPointItem } from './KeyPointItem';

export const KeyPoint: React.FC<KeyPointProps> = ({ className, points, ...props }): React.JSX.Element => {
  return (
    <section className={cn(className)} {...props}>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {points.map((point, i) => {
                return <KeyPointItem key={i} step={i} point={point} />;
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
