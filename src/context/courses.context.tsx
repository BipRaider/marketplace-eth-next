import React, { createContext, PropsWithChildren, useState, useContext, useMemo } from 'react';

import { ICourses } from '@src/types';

export interface ICoursesContext {
  courses: ICourses[];
  selectedCourse: ICourses | null;
  busyCourseId: ICourses['id'] | null;
  isNewPurchase: boolean;
  setCourses: React.Dispatch<React.SetStateAction<ICourses[]>>;
  setSelectedCourse: React.Dispatch<React.SetStateAction<ICourses | null>>;
  setBusyCourseId: React.Dispatch<React.SetStateAction<ICourses['id'] | null>>;
  setIsNewPurchase: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CoursesContext = createContext<ICoursesContext>({
  courses: [],
  selectedCourse: null,
  busyCourseId: null,
  isNewPurchase: false,
  setCourses: (_: React.SetStateAction<ICourses[]>): void => {
    console.error('setCourses: Function not implemented.');
  },
  setSelectedCourse: function (_value: React.SetStateAction<ICourses | null>): void {
    console.error('setSelectedCourse: Function not implemented.');
  },
  setBusyCourseId: function (_value: React.SetStateAction<string | null>): void {
    console.error('setBusyCourseId: Function not implemented.');
  },
  setIsNewPurchase: function (_value: React.SetStateAction<boolean>): void {
    console.error('setIsNewPurchase: Function not implemented.');
  },
});

export const useCoursesContext = (): ICoursesContext => useContext(CoursesContext);

export const CoursesContextProvider = ({ children }: PropsWithChildren<ICoursesContext>): React.JSX.Element => {
  const [courses, setCourses] = useState<ICourses[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourses | null>(null);
  const [busyCourseId, setBusyCourseId] = useState<ICourses['id'] | null>(null);
  const [isNewPurchase, setIsNewPurchase] = useState<boolean>(false);

  const value = useMemo((): ICoursesContext => {
    return {
      courses,
      selectedCourse,
      busyCourseId,
      isNewPurchase,
      setCourses,
      setSelectedCourse,
      setBusyCourseId,
      setIsNewPurchase,
    };
  }, [courses, selectedCourse, busyCourseId, isNewPurchase]);

  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
};

export const CoursesProvider = ({
  children,
  useProvider = true,
  ...props
}: PropsWithChildren<ICoursesContext & { useProvider?: boolean }>): React.JSX.Element => {
  if (!useProvider) return <>{children}</>;
  return <CoursesContextProvider {...props}>{children}</CoursesContextProvider>;
};
