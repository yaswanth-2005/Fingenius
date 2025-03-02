"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ClipboardList } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Form validation schema
const registrationDetailsSchema = z.object({
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  income: z.string().min(1, { message: "Income is required" }),
  bankBalance: z.string().min(1, { message: "Bank balance is required" }),
  propertiesWorth: z.string().min(1, { message: "Property worth is required" }),
  debt: z.string().min(1, { message: "Debt information is required" }),
  insurance: z
    .string()
    .min(1, { message: "Insurance information is required" }),
  medicalCondition: z
    .string()
    .min(1, { message: "Medical condition is required" }),
  lifestyle: z
    .string()
    .min(1, { message: "Lifestyle information is required" }),
  overallDescription: z
    .string()
    .min(10, { message: "Please provide a more detailed description" }),
});

type RegistrationDetailsValues = z.infer<typeof registrationDetailsSchema>;

const RegistrationDetails = () => {
  const router = useRouter();

  // Check if user has started registration
  useEffect(() => {
    const tempUser =
      typeof window !== "undefined" ? localStorage.getItem("tempUser") : null;
    if (!tempUser) {
      toast.error("Please create an account first");
      router.push("/signup");
    }
  }, [router]);

  const form = useForm<RegistrationDetailsValues>({
    resolver: zodResolver(registrationDetailsSchema),
    defaultValues: {
      age: "",
      gender: "",
      income: "",
      bankBalance: "",
      propertiesWorth: "",
      debt: "",
      insurance: "",
      medicalCondition: "",
      lifestyle: "",
      overallDescription: "",
    },
  });

  const onSubmit = async (data: RegistrationDetailsValues) => {
    try {
      const tempUser = JSON.parse(localStorage.getItem("tempUser") || "{}");

      if (!tempUser?.id) {
        toast.error("User not found. Please sign up again.");
        router.push("/signup");
        return;
      }

      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: tempUser.id, ...data }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to save registration details");
        return;
      }

      toast.success("Registration details saved successfully!");
      router.push("/"); // Redirect to user dashboard
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-10"></div>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Complete Your Profile</h1>
              <p className="text-muted-foreground mt-2">
                Help us personalize your financial experience
              </p>
            </div>

            <div className="bg-card rounded-lg border shadow-sm p-6 md:p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="30" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">
                                Prefer not to say
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="income"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Income (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="50000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bankBalance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Balance (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="200000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="propertiesWorth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Properties Worth (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="5000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="debt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Debt (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="100000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="insurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Details</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Life insurance policy details"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medicalCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Condition</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Any ongoing medical conditions"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lifestyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lifestyle</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select lifestyle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="frugal">Frugal</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="lavish">Lavish</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="overallDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overall Financial Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your financial goals and current situation"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Complete Registration
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistrationDetails;
