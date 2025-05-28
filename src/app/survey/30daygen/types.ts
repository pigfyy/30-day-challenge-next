import { z } from "zod";
import { Control, FieldErrors } from "react-hook-form";

// Page 1 Form Data Schema - Contact Information
export const Page1Schema = z.object({
  age: z.string().min(1, "Please select an age range"),
});

// Page 2 has no form fields (just search demo)

// Page 3 Form Data Schema (formerly Page 2)
export const Page3Schema = z.object({
  q1: z.string().min(1, "This field is required"),
  q2a: z.string().min(1, "This field is required"),
  q2b: z.string().min(1, "This field is required"),
  q2c: z.string().min(1, "This field is required"),
  q2d: z.string().min(1, "This field is required"),
  q2e: z.string().min(1, "This field is required"),
  q3: z.string().min(1, "This field is required"),
  q4: z.string().optional(),
});

// Page 4 Form Data Schema (formerly Page 3) - matching exact requirements
export const Page4Schema = z.object({
  seeYourselfUsing: z.string().min(1, "This field is required"),
  whyNotUsing: z.string().optional(), // Conditional field when seeYourselfUsing is "No"
  dailyTracking: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  dailyTrackingOthersSpecify: z.string().optional(), // Conditional field when "Others" is selected in dailyTracking
  engagementFeatures: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  othersSpecify: z.string().optional(), // Conditional field when "Others" is selected
  habitChange: z.string().min(1, "This field is required"),
  appStoreEngagement: z.string().min(1, "This field is required"),
  additionalComments: z.string().optional(),
});

export type Page1FormData = z.infer<typeof Page1Schema>;
export type Page3FormData = z.infer<typeof Page3Schema>;
export type Page4FormData = z.infer<typeof Page4Schema>;

// Overall Survey Form Schema
export const SurveyFormSchema = z.object({
  page1: Page1Schema,
  page3: Page3Schema,
  page4: Page4Schema,
  searchQueries: z.array(z.string()).default([]),
});

export type SurveyFormData = z.infer<typeof SurveyFormSchema>;

// Page component props interfaces
export interface Page1Props {
  control: Control<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
}

export interface Page2Props {
  onSearchQuery?: (query: string) => void;
  isTurk?: boolean;
}

export interface Page3Props {
  control: Control<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
  isTurk?: boolean;
}

export interface Page4Props {
  control: Control<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
}
