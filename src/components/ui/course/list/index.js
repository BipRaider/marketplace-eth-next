import { CourseCard } from '@components/ui/course';

export default function List({ courses }) {
  if (!courses) return <></>;
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  );
}