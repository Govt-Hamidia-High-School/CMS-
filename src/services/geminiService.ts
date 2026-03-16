import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateLessonPlan = async (topic: string, grade: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a detailed lesson plan for the topic: "${topic}" for Grade ${grade}. 
    Include:
    1. Learning Objectives
    2. Materials Needed
    3. Introduction (5 mins)
    4. Main Activity (20 mins)
    5. Conclusion (5 mins)
    6. Assessment/Homework.
    Keep it simple and practical for a school in rural Pakistan.`,
  });
  return response.text;
};

export const generateReportComment = async (studentName: string, performance: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a personalized, encouraging report card comment for a student named ${studentName}. 
    Their performance is described as: "${performance}". 
    Keep it professional yet warm. Maximum 3 sentences.`,
  });
  return response.text;
};

export const generateHomework = async (topic: string, grade: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a homework assignment for Grade ${grade} on the topic: "${topic}". 
    Include 5 multiple choice questions and 2 short answer questions.`,
  });
  return response.text;
};

export const detectAttendanceRisk = async (attendanceData: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this attendance data: "${attendanceData}". 
    Identify students at risk of dropping out and provide a brief reasoning for each.`,
  });
  return response.text;
};
