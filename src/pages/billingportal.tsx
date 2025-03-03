"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Check, CreditCard, Loader2, QrCode, Wallet } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const AdvancedBillingPortal = () => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "upi" | "paypal" | "crypto"
  >("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const pricingPlans = {
    Monthly: {
      price: "₹800",
      features: [
        "Access to all courses",
        "Unlimited podcast streaming",
        "AI chatbot assistance (100 queries/month)",
        "Daily financial quizzes",
        "Basic progress tracking",
      ],
    },
    Yearly: {
      price: "₹8,000",
      features: [
        "All features from Monthly plan",
        "Priority AI chatbot assistance (unlimited)",
        "Exclusive advanced courses",
        "Downloadable resources",
        "Advanced progress analytics",
        "1 live Q&A session per quarter",
      ],
    },
    Custom: {
      price: "Contact Us",
      features: [
        "All features from Yearly plan",
        "Custom course creation",
        "Team management dashboard",
        "White-labeled platform option",
        "Dedicated account manager",
        "Quarterly financial strategy sessions",
      ],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Payment successful!",
      description: `You are now subscribed to the ${selectedPlan} plan.`,
    });

    setIsSubmitting(false);
  };

  const totalAmount =
    selectedPlan === "Custom"
      ? "Contact Us"
      : billingCycle === "monthly"
      ? pricingPlans[selectedPlan].price
      : `₹${parseInt(pricingPlans[selectedPlan].price.replace("₹", "")) * 12}`;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-40">
        <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Select your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="payment" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="payment">
                          Payment Method
                        </TabsTrigger>
                        <TabsTrigger value="billing">
                          Billing Details
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="payment" className="space-y-4">
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={(value) =>
                            setPaymentMethod(value as any)
                          }
                          className="grid grid-cols-2 gap-4 pt-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="card"
                              id="card"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="card"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <CreditCard className="mb-3 h-6 w-6" />
                              Card
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="upi"
                              id="upi"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="upi"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <QrCode className="mb-3 h-6 w-6" />
                              UPI
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="paypal"
                              id="paypal"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="paypal"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Wallet className="mb-3 h-6 w-6" />
                              PayPal
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="crypto"
                              id="crypto"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="crypto"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <svg
                                className="mb-3 h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 10.5L12 15.5L17 10.5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Crypto
                            </Label>
                          </div>
                        </RadioGroup>

                        {paymentMethod === "card" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 mt-4"
                          >
                            <div className="grid gap-2">
                              <Label htmlFor="name">Name on Card</Label>
                              <Input
                                id="name"
                                placeholder="John Doe"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="number">Card Number</Label>
                              <Input
                                id="number"
                                placeholder="4242 4242 4242 4242"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="month">Expiry Month</Label>
                                <Input id="month" placeholder="MM" required />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="year">Expiry Year</Label>
                                <Input id="year" placeholder="YY" required />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="CVC" required />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "upi" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center justify-center mt-4 space-y-4"
                          >
                            <div className="border border-dashed border-muted-foreground p-6 rounded-lg">
                              <QrCode size={150} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Scan this QR code with your UPI app to make the
                              payment
                            </p>
                            <div className="grid gap-2 w-full">
                              <Label htmlFor="upi-id">UPI ID (Optional)</Label>
                              <Input id="upi-id" placeholder="username@upi" />
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "paypal" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center justify-center mt-4 space-y-4"
                          >
                            <p className="text-sm text-muted-foreground">
                              You will be redirected to PayPal to complete your
                              payment.
                            </p>
                          </motion.div>
                        )}

                        {paymentMethod === "crypto" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center justify-center mt-4 space-y-4"
                          >
                            <div className="border border-dashed border-muted-foreground p-6 rounded-lg">
                              <p className="font-mono text-sm">
                                bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Send the exact amount to this wallet address
                            </p>
                            <div className="grid gap-2 w-full">
                              <Label htmlFor="tx-id">
                                Transaction ID (After Payment)
                              </Label>
                              <Input id="tx-id" placeholder="Transaction ID" />
                            </div>
                          </motion.div>
                        )}
                      </TabsContent>
                      <TabsContent value="billing" className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            placeholder="123 Main St"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="City" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="zip">ZIP / Postal Code</Label>
                            <Input id="zip" placeholder="ZIP" required />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" placeholder="Country" required />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex items-center space-x-2 mt-6">
                      <Switch
                        id="billing-cycle"
                        checked={billingCycle === "yearly"}
                        onCheckedChange={(checked) =>
                          setBillingCycle(checked ? "yearly" : "monthly")
                        }
                      />
                      <Label htmlFor="billing-cycle">
                        Bill yearly (save 20%)
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing
                        </>
                      ) : (
                        <>Complete Payment</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">
                      <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        {Object.keys(pricingPlans).map((plan) => (
                          <option key={plan} value={plan}>
                            {plan} Plan
                          </option>
                        ))}
                      </select>
                    </span>
                    <span>{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Billing cycle</span>
                    <span>
                      {billingCycle === "monthly" ? "Monthly" : "Yearly"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <div className="flex justify-between text-sm text-green-500">
                      <span>Yearly discount</span>
                      <span>-20%</span>
                    </div>
                  )}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{totalAmount}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {billingCycle === "monthly"
                        ? "Billed monthly"
                        : "Billed annually"}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="w-full border rounded-md p-3 bg-muted/50">
                    <h3 className="text-sm mb-2">What&apos;s included:</h3>
                    <ul className="space-y-2">
                      {pricingPlans[selectedPlan].features.map(
                        (feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedBillingPortal;
