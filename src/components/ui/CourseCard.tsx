
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isEnrolled?: boolean;
  onEnroll: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  thumbnailUrl,
  duration,
  level,
  isEnrolled = false,
  onEnroll,
}) => {
  const handleEnrollClick = () => {
    onEnroll(id);
  };

  const levelColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
  }[level];

  return (
    <Card className="card-hover overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className={`absolute top-2 right-2 ${levelColor}`}>
          {level}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
        <CardDescription className="flex items-center">
          <span>{duration}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleEnrollClick}
          className={`w-full ${
            isEnrolled ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
          }`}
        >
          {isEnrolled ? 'Start Now' : 'Enroll Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
