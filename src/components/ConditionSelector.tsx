
import { useState } from "react";
import { conditions } from "@/lib/validZipCodes";

interface ConditionSelectorProps {
  zipCode: string;
  onConditionSelected: (condition: string) => void;
  onBack: () => void;
}

export default function ConditionSelector({ zipCode, onConditionSelected, onBack }: ConditionSelectorProps) {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  
  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition);
    
    // Small delay to show the selection before proceeding
    setTimeout(() => {
      onConditionSelected(condition);
    }, 300);
  };

  return (
    <div className="form-step animate-scale-in">
      <button 
        onClick={onBack} 
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <h2 className="form-title">We Need Some Information</h2>
      <p className="form-subtitle">
        Have you or a loved one been diagnosed with:
      </p>
      
      <div className="space-y-3 mt-4">
        {conditions.map((condition) => (
          <button
            key={condition}
            type="button"
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
              selectedCondition === condition
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/30 hover:bg-secondary/50"
            }`}
            onClick={() => handleConditionSelect(condition)}
          >
            {condition}
          </button>
        ))}
      </div>
    </div>
  );
}
