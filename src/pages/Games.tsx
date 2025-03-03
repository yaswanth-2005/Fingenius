import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  GamepadIcon,
  Trophy,
  Clock,
  Award,
  FastForward,
  RotateCcw,
  X,
  Zap,
} from "lucide-react";
import Cookies from "js-cookie";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  category: "daily" | "monthly";
}

const quizzesData: Quiz[] = [
  {
    id: "daily-1",
    title: "Daily Financial Literacy Quiz",
    description:
      "Test your basic financial knowledge with our daily quiz challenge!",
    category: "daily",
    questions: [
      {
        id: 1,
        text: "What is the primary purpose of a 401(k) account?",
        options: [
          "Short-term savings",
          "Retirement savings",
          "Education funding",
          "Emergency fund",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: "Which of these is generally considered the most liquid asset?",
        options: ["Real estate", "Stocks", "Cash", "Bonds"],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What does "diversification" mean in investing?',
        options: [
          "Buying only tech stocks",
          "Spreading investments across various assets",
          "Investing all money at once",
          "Focusing on a single industry",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: "What is compound interest?",
        options: [
          "Interest paid only on the principal amount",
          "Interest paid on both principal and accumulated interest",
          "A fixed interest rate that never changes",
          "Interest that decreases over time",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        text: "Which type of insurance protects against financial loss from lawsuits?",
        options: [
          "Health insurance",
          "Life insurance",
          "Liability insurance",
          "Property insurance",
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: "What is the rule of 72 used to calculate?",
        options: [
          "Tax rate",
          "Retirement age",
          "Time to double an investment",
          "Inflation rate",
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: "Which of these is typically the most expensive form of borrowing?",
        options: ["Mortgage", "Auto loan", "Credit card", "Personal loan"],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: "What is a bond?",
        options: [
          "Ownership share in a company",
          "Loan to a company or government",
          "Real estate investment",
          "Insurance policy",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        text: "What does a high debt-to-income ratio suggest?",
        options: [
          "Financial stability",
          "High investment returns",
          "Potential financial stress",
          "Tax advantages",
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        text: "Which investment typically has the highest long-term returns?",
        options: [
          "Savings accounts",
          "Stocks",
          "Bonds",
          "Certificates of deposit (CDs)",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "monthly-1",
    title: "Monthly Investment Challenge",
    description:
      "A more advanced quiz covering investment strategies and market concepts.",
    category: "monthly",
    questions: [
      {
        id: 1,
        text: 'What is "market capitalization"?',
        options: [
          "The total dollar value of a company's outstanding shares",
          "The total number of shares a company issues",
          "The price of a single share",
          "The company's annual profit",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        text: "What is a bear market?",
        options: [
          "A market with rising prices",
          "A market with falling prices",
          "A market with low volatility",
          "A market that trades 24/7",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: "What is the price-to-earnings (P/E) ratio used for?",
        options: [
          "Calculating dividend yield",
          "Measuring a company's debt",
          "Valuing a company's stock",
          "Determining market volatility",
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: "What is an ETF?",
        options: [
          "Electronic Trading Fund",
          "Exchange-Traded Fund",
          "Equity Trust Finance",
          "Early Termination Fee",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        text: "What is dollar-cost averaging?",
        options: [
          "Converting foreign currency to dollars",
          "Investing a fixed amount at regular intervals",
          "Buying stocks when prices drop",
          "Selling investments to avoid losses",
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        text: 'What does "shorting" a stock mean?',
        options: [
          "Buying a stock expecting its price to rise",
          "Selling a stock you don't own expecting its price to fall",
          "Holding a stock for a short time period",
          "Investing a small amount in a stock",
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        text: "What is a dividend?",
        options: [
          "Company profit distributed to shareholders",
          "The fee paid to a broker for trading stocks",
          "The difference between buying and selling price",
          "A type of government bond",
        ],
        correctAnswer: 0,
      },
      {
        id: 8,
        text: "What is a defensive stock?",
        options: [
          "A stock with high volatility",
          "A stock that performs well in economic downturns",
          "A stock from the defense industry",
          "A new stock offering",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        text: "What is asset allocation?",
        options: [
          "The process of buying assets at their lowest price",
          "Distributing investments among different asset classes",
          "Selling assets to avoid market losses",
          "Calculating the total value of assets",
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        text: 'What does "blue-chip stock" refer to?',
        options: [
          "New technology stocks",
          "Stocks with the highest daily gains",
          "Stocks of well-established, financially sound companies",
          "Stocks that pay monthly dividends",
        ],
        correctAnswer: 2,
      },
    ],
  },
];

const Games = () => {
  const navigate = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("daily");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizInProgress, setQuizInProgress] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Fetch score from cookie and store it in a variable
  const [cookieScore, setCookieScore] = useState(0);

  useEffect(() => {
    const fetchScoreFromCookie = () => {
      const score = Cookies.get("quizScore");
      if (score) {
        setCookieScore(parseInt(score));
        setScore(parseInt(score));
      }
    };

    fetchScoreFromCookie();
  }, []);

  useEffect(() => {
    const fetchScoreFromDB = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          console.error("User not found in localStorage");
          return;
        }

        const response = await fetch("/api/games", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch score");
        }

        const data = await response.json();
        setScore(data.score);
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };

    fetchScoreFromDB();
  }, []);

  const user = localStorage.getItem('user');

  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      const userId = parsedUser.id;
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  } else {
    console.log("No user found in localStorage");
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (quizInProgress && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizInProgress && !showResults) {
      endQuiz();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, quizInProgress, showResults]);

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizInProgress(true);
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quiz.questions.length).fill(-1));
    setScore(cookieScore);
    setShowResults(false);
    setTimeLeft(quiz.questions.length * 30);

    toast({
      title: `Starting: ${quiz.title}`,
      description: "Good luck! Answer all questions to complete the quiz.",
    });
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    // Move to next question
    if (currentQuestion < (selectedQuiz?.questions.length || 0) - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const endQuiz = async () => {
    if (!selectedQuiz) return;

    // Calculate score
    let totalScore = cookieScore;
    selectedAnswers.forEach((answer, index) => {
      if (answer === selectedQuiz.questions[index].correctAnswer) {
        totalScore += 5;
      }
    });

    setScore(totalScore);
    setShowResults(true);
    setQuizInProgress(false);

    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      console.error("User not found in localStorage");
      return;
    }

    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          selectedQuiz: selectedQuiz.category,
          score: totalScore,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update score in DB");
      }

      console.log("Score updated successfully in DB!");
    } catch (error) {
      console.error("Error updating score:", error);
    }

    // Store score in cookie
    Cookies.set("quizScore", totalScore, { expires: 7 });

    toast({
      title: "Quiz completed!",
      description: `Your score: ${totalScore} out of ${selectedQuiz.questions.length * 5}`,
    });
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setQuizInProgress(false);
    setShowResults(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          {!quizInProgress && !showResults ? (
            <>
              {/* Quiz Selection */}
              <section className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Financial Quizzes</h1>
                <div className="absolute top-20 right-10 flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {cookieScore}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  Test your financial knowledge with our interactive quizzes.
                  Earn points and track your progress!
                </p>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="daily">Daily Quizzes</TabsTrigger>
                    <TabsTrigger value="monthly">
                      Monthly Challenges
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="daily">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {quizzesData
                        .filter((quiz) => quiz.category === "daily")
                        .map((quiz) => (
                          <Card
                            key={quiz.id}
                            className="overflow-hidden card-hover"
                          >
                            <CardHeader className="bg-accent/10 pb-2">
                              <div className="flex justify-between items-start">
                                <GamepadIcon className="h-6 w-6 text-primary mb-2" />
                                <div className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md">
                                  Daily
                                </div>
                              </div>
                              <CardTitle>{quiz.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <CardDescription className="text-muted-foreground mb-4">
                                {quiz.description}
                              </CardDescription>
                              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                <div className="flex items-center">
                                  <Trophy className="h-4 w-4 mr-1" />
                                  <span>5 points per question</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>
                                    {quiz.questions.length * 30}s time limit
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                className="w-full"
                                onClick={() => startQuiz(quiz)}
                              >
                                Start Quiz
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="monthly">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {quizzesData
                        .filter((quiz) => quiz.category === "monthly")
                        .map((quiz) => (
                          <Card
                            key={quiz.id}
                            className="overflow-hidden card-hover"
                          >
                            <CardHeader className="bg-primary/10 pb-2">
                              <div className="flex justify-between items-start">
                                <Award className="h-6 w-6 text-primary mb-2" />
                                <div className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-md">
                                  Monthly
                                </div>
                              </div>
                              <CardTitle>{quiz.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <CardDescription className="text-muted-foreground mb-4">
                                {quiz.description}
                              </CardDescription>
                              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                <div className="flex items-center">
                                  <Trophy className="h-4 w-4 mr-1" />
                                  <span>5 points per question</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>
                                    {quiz.questions.length * 30}s time limit
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                className="w-full"
                                onClick={() => startQuiz(quiz)}
                              >
                                Start Quiz
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </section>
            </>
          ) : (
            <>
              {/* Quiz in Progress or Results */}
              {selectedQuiz && (
                <div className="max-w-3xl mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{selectedQuiz.title}</h2>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={resetQuiz}
                      title="Exit quiz"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {!showResults ? (
                    <>
                      {/* Quiz In Progress */}
                      <div className="bg-card rounded-lg border p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-sm text-muted-foreground">
                            Question {currentQuestion + 1} of{" "}
                            {selectedQuiz.questions.length}
                          </div>
                          <div className="text-sm font-medium flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTime(timeLeft)}
                          </div>
                        </div>

                        <Progress
                          value={
                            ((currentQuestion + 1) / selectedQuiz.questions.length) *
                            100
                          }
                          className="h-2 mb-6"
                        />

                        <h3 className="text-xl font-medium mb-6">
                          {selectedQuiz.questions[currentQuestion].text}
                        </h3>

                        <div className="space-y-3">
                          {selectedQuiz.questions[currentQuestion].options.map(
                            (option, index) => (
                              <Button
                                key={index}
                                variant={
                                  selectedAnswers[currentQuestion] === index
                                    ? "default"
                                    : "outline"
                                }
                                className="w-full justify-start text-left h-auto py-4 px-4"
                                onClick={() =>
                                  handleAnswer(currentQuestion, index)
                                }
                              >
                                <span className="mr-2">
                                  {String.fromCharCode(65 + index)}.
                                </span>
                                {option}
                              </Button>
                            )
                          )}
                        </div>

                        <div className="flex justify-between mt-8">
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (currentQuestion > 0) {
                                setCurrentQuestion(currentQuestion - 1);
                              }
                            }}
                            disabled={currentQuestion === 0}
                          >
                            Previous
                          </Button>

                          <Button
                            onClick={() => {
                              if (
                                currentQuestion <
                                selectedQuiz.questions.length - 1
                              ) {
                                setCurrentQuestion(currentQuestion + 1);
                              } else {
                                endQuiz();
                              }
                            }}
                          >
                            {currentQuestion < selectedQuiz.questions.length - 1
                              ? "Next"
                              : "Finish Quiz"}
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Quiz Results */}
                      <div className="bg-card rounded-lg border p-6">
                        <div className="text-center mb-6">
                          <Trophy className="h-16 w-16 text-primary mx-auto mb-2" />
                          <h3 className="text-2xl font-bold mb-1">
                            Quiz Completed!
                          </h3>
                          <p className="text-muted-foreground">
                            You scored {score} out of{" "}
                            {selectedQuiz.questions.length * 5} points
                          </p>
                        </div>

                        <div className="mb-8">
                          <div className="h-6 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${
                                  (score /
                                    (selectedQuiz.questions.length * 5)) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                            <span>0 points</span>
                            <span>
                              {selectedQuiz.questions.length * 5} points
                            </span>
                          </div>
                        </div>

                        <div className="space-y-6 mb-8">
                          {selectedQuiz.questions.map((question, index) => (
                            <div
                              key={index}
                              className="border-b pb-4 last:border-0"
                            >
                              <p className="font-medium mb-2">
                                {index + 1}. {question.text}
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`p-2 rounded text-sm ${
                                      question.correctAnswer === optIndex
                                        ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                                        : selectedAnswers[index] === optIndex
                                        ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                                        : "bg-muted/50"
                                    }`}
                                  >
                                    <span className="mr-1">
                                      {String.fromCharCode(65 + optIndex)}.
                                    </span>
                                    {option}
                                    {question.correctAnswer === optIndex && (
                                      <span className="ml-1 text-xs">
                                        (Correct)
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                          <Button
                            variant="outline"
                            onClick={resetQuiz}
                            className="flex items-center"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Try Different Quiz
                          </Button>
                          <Button
                            onClick={() => {
                              startQuiz(selectedQuiz);
                            }}
                            className="flex items-center"
                          >
                            <FastForward className="h-4 w-4 mr-2" />
                            Retry This Quiz
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Games;
