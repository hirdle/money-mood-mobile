
import React from "react";

type Props = {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  onNext?: () => void;
  isLast?: boolean;
};

const OnboardingScreen: React.FC<Props> = ({ image, title, description, buttonText = "Дальше", onNext, isLast }) => (
  <div className="flex flex-col h-full items-center justify-between px-6 pt-10 pb-8 animate-fade-in">
    <div />
    <div className="max-w-xs w-full flex flex-col items-center">
      <div className="rounded-2xl overflow-hidden shadow-lg w-[270px] h-[470px] mb-4 bg-gray-50 border">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <h2 className="text-2xl font-bold text-black mt-4 mb-2 text-center">{title}</h2>
      <p className="text-base text-neutral-600 text-center">{description}</p>
    </div>
    <button
      className="w-full max-w-xs mt-4 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-orange-400 to-yellow-300 text-white hover:scale-105 transition"
      onClick={onNext}
    >
      {isLast ? "Начать!" : buttonText}
    </button>
  </div>
);

export default OnboardingScreen;
