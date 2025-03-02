
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Headphones, Bot, GamepadIcon, Trophy, TrendingUp } from 'lucide-react';

const featureItems = [
  {
    icon: BookOpen,
    title: 'Expert Courses',
    description: 'Learn from industry professionals with our comprehensive financial courses designed for all skill levels.',
  },
  {
    icon: Headphones,
    title: 'Financial Podcasts',
    description: 'Stay informed with our curated financial podcasts covering market trends, investment strategies, and economic insights.',
  },
  {
    icon: Bot,
    title: 'AI Financial Assistant',
    description: 'Get instant answers to your financial questions with our advanced AI chatbot, available 24/7.',
  },
  {
    icon: GamepadIcon,
    title: 'Educational Games',
    description: 'Make learning fun with interactive financial games and quizzes that test and expand your knowledge.',
  },
  {
    icon: Trophy,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed progress tracking and achievement rewards.',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Access real-time market data and expert analysis to inform your investment decisions.',
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Complete Financial Learning Hub</h2>
          <p className="text-lg text-muted-foreground">
            Discover the comprehensive set of tools and resources we offer to enhance your financial literacy journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureItems.map((feature, index) => (
            <Card key={index} className="card-hover border border-border/50 bg-background">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
