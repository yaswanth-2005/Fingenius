import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PricingSection = () => {
  const router = useRouter();
  const pricingPlans = [
    {
      name: "Monthly",
      price: "₹800",
      description: "Perfect for individuals starting their financial journey",
      features: [
        "Access to all courses",
        "Unlimited podcast streaming",
        "AI chatbot assistance (100 queries/month)",
        "Daily financial quizzes",
        "Basic progress tracking",
      ],
      popular: false,
      buttonText: "Get Started",
    },
    {
      name: "Yearly",
      price: "₹8,000",
      description: "Our most popular plan for serious learners",
      features: [
        "All features from Monthly plan",
        "Priority AI chatbot assistance (unlimited)",
        "Exclusive advanced courses",
        "Downloadable resources",
        "Advanced progress analytics",
        "1 live Q&A session per quarter",
      ],
      popular: true,
      buttonText: "Get Started",
      savings: "Save ₹1,600 yearly",
    },
    {
      name: "Custom",
      price: "Contact Us",
      description: "Tailored solutions for businesses and groups",
      features: [
        "All features from Yearly plan",
        "Custom course creation",
        "Team management dashboard",
        "White-labeled platform option",
        "Dedicated account manager",
        "Quarterly financial strategy sessions",
      ],
      popular: false,
      buttonText: "Contact Sales",
    },
  ];

  const handleGetStarted = () => {
    router.push("/billing-portal");
  };

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Invest in your financial education with our flexible pricing plans
            designed to fit your needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col h-full ${
                plan.popular ? "border-primary shadow-lg relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.name !== "Custom" && plan.name === "Monthly" ? (
                    <span className="text-muted-foreground">/month</span>
                  ) : (
                    <span className="text-muted-foreground">/yearly</span>
                  )}
                </div>
                {plan.savings && (
                  <p className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-md inline-block mb-4">
                    {plan.savings}
                  </p>
                )}
                <ul className="space-y-3 mt-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "bg-primary" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={handleGetStarted}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center max-w-lg mx-auto">
          <p className="text-sm text-muted-foreground">
            All plans include a 7-day free trial. No credit card required.
            Cancel anytime. Need help choosing the right plan?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact our team
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
