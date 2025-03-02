import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = ({ isLoggedIn = false, userName = "" }) => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-accent/10 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-60 w-40 h-40 rounded-full bg-fingenius-300/10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {isLoggedIn && (
            <p className="text-lg font-medium text-primary mb-4 animate-fade-in">
              Welcome back, {userName}!
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Simplify Your Journey to Financial Freedom
          </h1>
          <p
            className="text-xl text-muted-foreground mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Master investing and financial literacy with our expert courses, AI
            assistance, and interactive tools designed to elevate your financial
            intelligence.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Link href="/courses">
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="hover:bg-primary/90"
              variant="outline"
            >
              <Link href="/chatbot">Try AI Assistant</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Abstract wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-accent/10 via-primary/10 to-fingenius-300/10"></div>
    </section>
  );
};

export default Hero;
