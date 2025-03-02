
'use client';

import CourseDetail from '@/pages/CourseDetail';
import { useParams } from 'next/navigation';

interface CourseDetailPageProps {
  params: { courseId: string };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  return <CourseDetail courseId={params.courseId} />;
}

