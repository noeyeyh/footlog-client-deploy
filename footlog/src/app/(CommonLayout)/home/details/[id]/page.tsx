'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import DetailsHeader from '@components/home/details/DetailsHeader';
import ImageContainer from '@components/home/details/ImageContainer';
import InfoContainer from '@components/home/details/InfoContainer';
import BlogContainer from '@components/home/details/BlogContainer';
import FinishBtn from '@components/home/details/FinishBtn';
import useGetCourseDetails from '@hooks/details/useGetCourseDetails';
import usePostSave from '@hooks/details/usePostSave';
import usePostComplete from '@hooks/details/usePostComplete';

export default function page() {
  const pathname = usePathname(); // 현재 경로 가져오기
  const course_id = pathname.split('/').pop(); // 경로의 마지막 세그먼트를 course_id로 사용
  const [courseIdNumber, setCourseIdNumber] = useState<number>(0);
  const { mutate: postCompleteMutate } = usePostComplete();
  const { mutate: postSaveMutate } = usePostSave();

  // course_id가 있을 때만 상태 업데이트
  useEffect(() => {
    if (course_id) {
      setCourseIdNumber(Number(course_id)); // course_id를 숫자로 변환하여 상태 업데이트
    }
  }, [course_id]);

  const { data: courseResponse } = useGetCourseDetails(courseIdNumber);

  if (!courseResponse) {
    return <div>Loading...</div>;
  }

  const course = courseResponse.result;

  const handleSaveClick = () => {
    postSaveMutate({ course_id: course.course_id });
  };

  const handleFinishClick = () => {
    postCompleteMutate({ course_id: course.course_id });
  };

  return (
    <main className="relative flex h-full w-full flex-col">
      <DetailsHeader title={course.name} isSaved={course.isSave} onClick={handleSaveClick} />
      <section className="mt-68pxr flex flex-col pb-68pxr">
        <ImageContainer title={course.name} imgSrc={course.image} />
        <InfoContainer
          description={course.summary}
          address={course.address}
          price="각 프로그램별로 이용요금 상이"
          time="09:00 ~ 18:00"
          call={course.tel}
          site="홈페이지 / 웹사이트 URL"
        />
        <div className="h-8pxr w-full bg-gray-1" />
        <BlogContainer title={course.name} />
      </section>
      <FinishBtn isComplete={course.isComplete} onClick={handleFinishClick} />
    </main>
  );
}
