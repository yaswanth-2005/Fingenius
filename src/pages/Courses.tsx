'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, BookOpen, Check } from 'lucide-react';
import { toast } from 'sonner';

const coursesData = [
  {
    id: '1',
    title: 'Investment Fundamentals',
    description: 'Learn the basics of investment and build a solid foundation for your financial journey. This course covers key investment types, risk management, and strategic planning.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '4 hours',
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Stock Market Essentials',
    description: 'Understand how the stock market works and develop effective trading strategies. Learn about stock analysis, market trends, and building a balanced portfolio.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '6 hours',
    level: 'Intermediate',
  },
  {
    id: '3',
    title: 'Personal Finance Mastery',
    description: 'Master budgeting, saving, and long-term financial planning for a secure future. Develop skills to manage debt, build credit, and create a sustainable financial plan.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '5 hours',
    level: 'Beginner',
  },
  {
    id: '4',
    title: 'Advanced Trading Techniques',
    description: 'Take your trading skills to the next level with advanced analysis methods and sophisticated strategies for maximizing returns in various market conditions.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '8 hours',
    level: 'Advanced',
  },
  {
    id: '5',
    title: 'Retirement Planning',
    description: 'Comprehensive guide to planning for retirement, including pension strategies, investment vehicles, and calculating your retirement needs based on lifestyle goals.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '4 hours',
    level: 'Intermediate',
  },
  {
    id: '6',
    title: 'Tax Optimization Strategies',
    description: 'Learn legal and effective tax optimization strategies to minimize your tax burden and maximize your wealth accumulation over time.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21ed6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '3 hours',
    level: 'Advanced',
  },
];

const Courses = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    const savedEnrolled = localStorage.getItem('enrolledCourses');
    if (savedEnrolled) {
      setEnrolledCourses(JSON.parse(savedEnrolled));
    }
  }, []);

  const handleEnroll = (courseId) => {
    if (enrolledCourses.includes(courseId)) {
      router.push(`/course/${courseId}`);
    } else {
      const newEnrolledCourses = [...enrolledCourses, courseId];
      setEnrolledCourses(newEnrolledCourses);
      localStorage.setItem('enrolledCourses', JSON.stringify(newEnrolledCourses));
      toast.success('Successfully enrolled in the course!');
      router.push(`/course/${courseId}`);
    }
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="py-8 border-b">
          <div className="container px-4 mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col h-full">
                <div className="aspect-video w-full overflow-hidden">
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{course.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleEnroll(course.id)}>
                    {enrolledCourses.includes(course.id) ? 'Start Now' : 'Enroll Now'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
