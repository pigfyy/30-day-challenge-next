import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Initialize Google Generative AI with Gemini
export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// Get the Gemini Flash model
export const geminiFlashModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const base64ToBlob = (base64String: string, mimeType: string) => {
  const byteString = atob(base64String.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
};
