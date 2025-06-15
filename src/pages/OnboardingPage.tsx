
import { useState } from "react";
import OnboardingScreen from "@/components/OnboardingScreen";

const screens = [
  {
    image: "/lovable-uploads/4ed3aef1-c6ca-43c3-987e-698b054f5d9f.png",
    title: "Добро пожаловать в анализ финансов!",
    description: "Бюджет под настроение: отслеживай доходы и расходы, получай советы и вдохновляйся на финансовые успехи🙌",
  },
  {
    image: "/lovable-uploads/21a87da6-1338-41a3-8662-8128e74a4244.png",
    title: "Копи с удовольствием 🐾",
    description: "Поставь цель, выращивай денежного питомца и визуально следи за прогрессом. Достижения — в игровой форме!",
  },
];

const STORAGE_KEY = "onboarding_passed";

const OnboardingPage = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem(STORAGE_KEY, "1");
      window.location.reload(); // Переходим в приложение
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <OnboardingScreen
        {...screens[step]}
        isLast={step === screens.length - 1}
        onNext={handleNext}
      />
    </div>
  );
};

export default OnboardingPage;
