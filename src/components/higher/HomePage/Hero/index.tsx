import React from 'react';
import cn from 'classnames';

import { HeroProps } from './props';

const text = {
  start: 'Get started',
  learn: 'Learn programming and web development the easy way! Get unlimited access to all of our courses.',
  grow: 'Grow your career as a developer',
};

export const Hero: React.FC<HeroProps> = ({ className, ...props }): React.JSX.Element => {
  return (
    <section className={cn('lg:2/6 text-left my-28', className)} {...props}>
      <div className="text-6xl font-semibold text-gray-900 leading-none">{text.grow}</div>
      <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">{text.learn}</div>
      <div className="mt-5 sm:mt-8 flex lg:justify-start">
        <div className="rounded-md shadow">
          <a
            href="#"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            {text.start}
          </a>
        </div>
      </div>
    </section>
  );
};
