"use client"; // Required in Next.js for useEffect and useState

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

// Define TypeScript Interfaces
interface Module {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  level: string;
  modules: Module[];
}

interface CourseDetailProps {
  courseId: string;
}

// Mock Data (Replace with API Call Later)
const coursesData: Course[] = [
  {
    id: "1",
    title: "Investment Fundamentals",
    description: "Learn the basics of investment and build a solid foundation for your financial journey.",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    duration: "4 hours",
    level: "Beginner",
    modules: [
      { id: "module-1-1", title: "Understanding Investment Basics", videoUrl: "https://www.youtube.com/embed/Pb9MZoIKVhg", description: "Introduction to investment." },
      { id: "module-1-2", title: "Risk Management", videoUrl: "https://www.youtube.com/embed/dCWWdO4JnqQ", description: "Understanding risk in investment." },
    ],
  },
  {
    id: "2",
    title: "Stock Market Essentials",
    description: "Understand how the stock market works.",
    thumbnailUrl: "https://images.unsplash.com/photo-1611974789855",
    duration: "6 hours",
    level: "Intermediate",
    modules: [
      { id: "module-2-1", title: "Introduction to Stock Markets", videoUrl: "https://www.youtube.com/embed/p7HKvqRI_Bo", description: "Overview of stock markets." },
      { id: "module-2-2", title: "Fundamental Analysis", videoUrl: "https://www.youtube.com/embed/7CMGmdKZ7-8", description: "Analyze company financials." },
    ],
  },
];

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId }) => {
  const router = useRouter();
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    // Find course from mock data
    const course = coursesData.find((c) => c.id === courseId);
    if (!course) {
      toast.error("Course not found");
      router.push("/courses");
      return;
    }

    setCurrentCourse(course);

    // Load saved progress
    const savedProgress = localStorage.getItem(`course-${courseId}-progress`);
    if (savedProgress) {
      setCompletedModules(JSON.parse(savedProgress));
    }

    setIsLoading(false);
  }, [courseId, router]);

  if (isLoading || !currentCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentModuleIndex < currentCourse.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const markAsCompleted = () => {
    const moduleId = currentCourse.modules[currentModuleIndex].id;

    if (!completedModules.includes(moduleId)) {
      const updatedModules = [...completedModules, moduleId];
      setCompletedModules(updatedModules);
      localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(updatedModules));
      toast.success("Module marked as completed!");
    }
  };

  const isModuleCompleted = (moduleId: string) => completedModules.includes(moduleId);
  const currentModule = currentCourse.modules[currentModuleIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="container px-4 mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-2">{currentCourse.title}</h1>
          <p className="text-muted-foreground">{currentCourse.description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="col-span-1 border rounded-lg p-4 h-fit">
              <h3 className="font-medium text-lg mb-4">Course Modules</h3>
              <div className="space-y-2">
                {currentCourse.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`p-3 rounded-md cursor-pointer flex items-center gap-2 ${
                      index === currentModuleIndex ? "bg-primary text-primary-foreground" : isModuleCompleted(module.id) ? "bg-accent/70" : "hover:bg-accent"
                    }`}
                    onClick={() => setCurrentModuleIndex(index)}
                  >
                    {isModuleCompleted(module.id) && <Check className="h-4 w-4 flex-shrink-0" />}
                    <span className="text-sm">{module.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-3">
              <Card>
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <iframe
                    src={currentModule.videoUrl}
                    title={currentModule.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
                  <p className="text-muted-foreground mb-6">{currentModule.description}</p>

                  <div className="flex justify-between mt-6">
                    <Button onClick={handlePrevious} disabled={currentModuleIndex === 0}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>
                    <Button onClick={markAsCompleted} variant="default">
                      <Check className="w-4 h-4 mr-2" /> Mark as Completed
                    </Button>
                    <Button onClick={handleNext} disabled={currentModuleIndex === currentCourse.modules.length - 1}>
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
