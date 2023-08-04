import React from 'react';
import { useRouter } from 'next/router';
import Img from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

import { CourseCardProps } from './props';
import { Button, Indicator } from '@src/components/common';
import { useWeb3Context } from '@src/context';

export const CourseCard: React.FC<CourseCardProps> = ({ course, courseOwner, purchase, onClickHandler }) => {
  const { account, network } = useWeb3Context();
  const router = useRouter();
  const dis = !account.isLoading && network.isSupported;

  return (
    <div className="flex h-full">
      <div className="flex-1 h-full">
        <Img
          className={cn('object-cover h-full', {
            ['filter grayscale']: !dis && purchase,
          })}
          src={course.coverImage ? course.coverImage : '/'}
          alt={course.title ? course.title : ''}
          width={300}
          height={360}
          loading="lazy"
        />
      </div>
      <div className="p-8 flex-2">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.type}</div>
        <Link
          href={`/courses/${course.slug}`}
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          {course.title}
        </Link>
        <p className="mt-2 text-gray-500">{course?.description?.substring(0, 70)}...</p>
        {purchase && (
          <div className="mt-4">
            {dis && (
              <>
                <Button
                  disabled={!dis}
                  variant={courseOwner ? 'green' : 'lightPurple'}
                  onClick={e => {
                    if (!courseOwner) onClickHandler(e, course);
                    else router.push(`/courses/${course.slug}`);
                  }}
                >
                  {courseOwner ? 'Watch the course' : 'Purchase'}
                </Button>
                <Indicator
                  greenIcon={courseOwner?.state === 'activated'}
                  redIcon={courseOwner?.state === 'deactivated'}
                  yellowIcon={courseOwner?.state === 'purchased'}
                ></Indicator>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
