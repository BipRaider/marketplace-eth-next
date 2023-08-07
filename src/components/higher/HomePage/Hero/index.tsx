import React from 'react';
import cn from 'classnames';

import { HeroProps } from './props';

const text = {
  learn: 'Learn programming and web development the easy way! Get unlimited access to all of our courses.',
  grow: 'Grow your career as a developer',
};

export const Hero: React.FC<HeroProps> = ({ className, ...props }): React.JSX.Element => {
  return (
    <section className={cn('lg:2/6 text-left my-28', className)} {...props}>
      <div className="text-6xl font-semibold text-gray-900 leading-none">{text.grow}</div>
      <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">{text.learn}</div>
    </section>
  );
};
