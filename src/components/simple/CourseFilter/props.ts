import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CourseFilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onSearchSubmit: (_searchText: string) => void;
  onFilterSelect: (_value: string) => void;
}
