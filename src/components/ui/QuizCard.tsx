
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizCardProps {
  title: string;
  description: string;
  questions: QuizQuestion[];
  onExit: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  questions,
  onExit,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedOption(optionIndex);
    setHasAnswered(true);
    
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 5);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      {!showResults ? (
        <>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">{questions[currentQuestion].question}</h3>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedOption === index 
                      ? index === questions[currentQuestion].correctAnswer 
                        ? "outline" 
                        : "destructive" 
                      : "outline"}
                    className={`w-full justify-start text-left h-auto py-3 ${
                      hasAnswered && index === questions[currentQuestion].correctAnswer
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={hasAnswered}
                  >
                    <span className="flex-1">{option}</span>
                    {hasAnswered && index === questions[currentQuestion].correctAnswer && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                    {hasAnswered && selectedOption === index && index !== questions[currentQuestion].correctAnswer && (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onExit}>
              Exit
            </Button>
            <Button 
              onClick={handleNextQuestion} 
              disabled={!hasAnswered}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Quiz Completed!</CardTitle>
            <CardDescription>Here are your results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <h3 className="text-3xl font-bold mb-2">Your Score: {score}/{questions.length * 5}</h3>
              <p className="text-muted-foreground">
                {score >= questions.length * 4 
                  ? "Excellent! You're a financial genius!" 
                  : score >= questions.length * 3 
                  ? "Great job! You have good financial knowledge." 
                  : score >= questions.length * 2 
                  ? "Good effort! Keep learning about finance." 
                  : "Keep studying! Financial literacy takes time."}
              </p>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={onExit}>Exit to Games Menu</Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default QuizCard;
