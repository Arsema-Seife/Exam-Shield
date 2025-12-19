import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InputForm, { StudentData } from "@/components/InputForm";
import Dashboard from "@/components/Dashboard";

type Screen = "landing" | "input" | "dashboard";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen("input");
  };

  const handleFormSubmit = (data: StudentData) => {
    setStudentData(data);
    setCurrentScreen("dashboard");
  };

  const handleBackToLanding = () => {
    setCurrentScreen("landing");
  };

  const handleBackToInput = () => {
    setCurrentScreen("input");
  };

  const handleStartOver = () => {
    setStudentData(null);
    setCurrentScreen("input");
  };

  return (
    <main className="min-h-screen">
      {currentScreen === "landing" && (
        <>
          <Navbar onGetStarted={handleGetStarted} />
          <HeroSection onGetStarted={handleGetStarted} />
        </>
      )}

      {currentScreen === "input" && (
        <InputForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />
      )}

      {currentScreen === "dashboard" && studentData && (
        <Dashboard data={studentData} onBack={handleBackToInput} onStartOver={handleStartOver} />
      )}
    </main>
  );
};

export default Index;
