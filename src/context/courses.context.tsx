import React, { createContext, PropsWithChildren, useState, useContext } from 'react';

import { ICourses } from '@src/types';

export interface ICoursesContext {
  courses: ICourses[];
  setCourses: React.Dispatch<React.SetStateAction<ICourses[]>>;
}

export const CoursesContext = createContext<ICoursesContext>({
  courses: [],
  setCourses: (_: React.SetStateAction<ICourses[]>): void => {
    throw new Error('Function not implemented.');
  },
});

export const useCoursesContext = (): ICoursesContext => useContext(CoursesContext);

export const CoursesContextProvider = ({ children }: PropsWithChildren<ICoursesContext>): React.JSX.Element => {
  const [courses, setCourses] = useState<ICourses[]>([]);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        setCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const CoursesProvider = ({
  children,
  useProvider = true,
  ...props
}: PropsWithChildren<ICoursesContext & { useProvider?: boolean }>): React.JSX.Element => {
  if (!useProvider) return <>{children}</>;
  return <CoursesContextProvider {...props}>{children}</CoursesContextProvider>;
};
