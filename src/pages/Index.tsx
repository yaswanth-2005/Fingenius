"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import PricingSection from "@/components/sections/Pricing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in when component mounts
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setIsLoggedIn(user && user.isAuthenticated);
          setUserName(user.fullName?.split(" ")[0] || "User");
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <Hero isLoggedIn={isLoggedIn} userName={userName} />

        {/* Features Section */}
        <Features />

        {/* Courses Preview Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Featured Courses
                </h2>
                <p className="text-muted-foreground">
                  Start your learning journey with our most popular financial
                  courses
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link href="/courses">
                  View All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Course previews - simplified versions of full course cards */}
              {[1, 2, 3].map((item) => (
                <Card key={item} className="card-hover overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={
                          item === 1
                            ? "https://images.unsplash.com/photo-1559067096-49ebca3406aa?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Investment image
                            : item === 2
                            ? "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=81" // Stock market image
                            : "https://plus.unsplash.com/premium_photo-1663100794696-6b7afa02016c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Personal finance image
                        }
                        alt={`Course ${item}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {item === 1 && "Investment Fundamentals"}
                      {item === 2 && "Stock Market Essentials"}
                      {item === 3 && "Personal Finance Mastery"}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {item === 1 &&
                        "Learn the core principles of successful investing and build a solid foundation."}
                      {item === 2 &&
                        "Understand how the stock market works and develop effective trading strategies."}
                      {item === 3 &&
                        "Master budgeting, saving, and long-term financial planning for a secure future."}
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/courses">Enroll Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Chatbot & Podcast Preview */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* AI Chatbot Preview */}
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-3">
                    AI Financial Assistant
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Get instant answers to your financial questions from our
                    intelligent AI assistant. Available 24/7 to help you make
                    informed decisions.
                  </p>
                  <Button asChild>
                    <Link href="/chatbot">
                      Try It Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-background rounded-lg shadow-lg p-4 border border-border">
                  <div className="py-4 px-2">
                    <div className="flex items-start mb-4">
                      <div className="ml-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          Hello! I'm your Fingenius AI assistant. How can I help
                          with your financial questions today?
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mb-4">
                      <div className="mr-4 p-3 bg-primary text-primary-foreground rounded-lg">
                        <p className="text-sm">
                          What's the best way to start investing with a small
                          budget?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="ml-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          For small budgets, I recommend starting with index
                          funds or ETFs which provide diversification at a low
                          cost. Many platforms now offer fractional shares, so
                          you can invest with as little as $5. Consider setting
                          up automatic contributions to build your portfolio
                          consistently over time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/10 rounded-full -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Games Preview Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Learn While You Play
              </h2>
              <p className="text-lg text-muted-foreground">
                Test your financial knowledge with our interactive games and
                quizzes designed to make learning fun and engaging.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="card-hover">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 mx-auto w-16 h-16 bg-fingenius-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-fingenius-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Daily Market Quiz
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Test your knowledge with daily quizzes covering current
                    market trends and financial news.
                  </p>
                  <Button asChild>
                    <Link href="/games">Take Today's Quiz</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 mx-auto w-16 h-16 bg-fingenius-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-fingenius-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Investment Simulator
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Practice investing with virtual money in a realistic market
                    environment without any real risk.
                  </p>
                  <Button asChild>
                    <Link href="/games">Start Simulation</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-fingenius-600 to-accent">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Begin Your Financial Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of users who are transforming their financial
                future with Fingenius.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link href={"/courses"}>Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
