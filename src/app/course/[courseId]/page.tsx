'use client';

import React from 'react';
import CourseDetail from '@/pages/CourseDetail';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const params = useParams(); // Now params is a promise, so we unwrap it
  const courseId = params?.courseId as string; // Ensure it's a string

  if (!courseId) {
    return <p>Loading...</p>;
  }

  return <CourseDetail courseId={courseId} />;
}
