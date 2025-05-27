"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { SurveyFormData } from "../../types";

export const STORAGE_KEY = "30daygen-survey-form-data";
export const STORAGE_PAGE_KEY = "30daygen-survey-current-page";

export const useFormPersistence = (
  form: UseFormReturn<SurveyFormData>,
  currentPage: number,
  setCurrentPage: (page: number) => void,
) => {
  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedPage = localStorage.getItem(STORAGE_PAGE_KEY);

      if (savedData) {
        const parsedData = JSON.parse(savedData) as SurveyFormData;
        // Reset form with saved data
        form.reset(parsedData);
      }

      if (savedPage) {
        const parsedPage = parseInt(savedPage, 10);
        if (parsedPage >= 1 && parsedPage <= 4) {
          setCurrentPage(parsedPage);
        }
      }
    } catch (error) {
      console.error("Error loading form data from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_PAGE_KEY);
    }
  }, [form, setCurrentPage]);

  useEffect(() => {
    const subscription = form.watch((data) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Error saving form data to localStorage:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PAGE_KEY, currentPage.toString());
    } catch (error) {
      console.error("Error saving current page to localStorage:", error);
    }
  }, [currentPage]);

  // Function to clear saved data (call on successful submission)
  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_PAGE_KEY);
    } catch (error) {
      console.error("Error clearing saved data from localStorage:", error);
    }
  };

  return { clearSavedData };
};

export const clearLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_PAGE_KEY);
};
