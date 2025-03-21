
import { useState } from "react";
import ZipCodeForm from "@/components/ZipCodeForm";
import ConditionSelector from "@/components/ConditionSelector";
import ContactForm from "@/components/ContactForm";
import ThankYouScreen from "@/components/ThankYouScreen";

type FormStep = "zip" | "condition" | "contact" | "thanks";

export default function Index() {
  const [currentStep, setCurrentStep] = useState<FormStep>("zip");
  const [formData, setFormData] = useState({
    zipCode: "",
    condition: ""
  });

  const handleZipCodeValid = (zipCode: string) => {
    setFormData(prev => ({ ...prev, zipCode }));
    setCurrentStep("condition");
  };

  const handleConditionSelected = (condition: string) => {
    setFormData(prev => ({ ...prev, condition }));
    setCurrentStep("contact");
  };

  const handleFormCompleted = () => {
    setCurrentStep("thanks");
  };

  const resetForm = () => {
    setFormData({
      zipCode: "",
      condition: ""
    });
    setCurrentStep("zip");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "zip":
        return (
          <ZipCodeForm onZipCodeValid={handleZipCodeValid} />
        );
      case "condition":
        return (
          <ConditionSelector 
            zipCode={formData.zipCode}
            onConditionSelected={handleConditionSelected}
            onBack={() => setCurrentStep("zip")}
          />
        );
      case "contact":
        return (
          <ContactForm 
            zipCode={formData.zipCode}
            condition={formData.condition}
            onBack={() => setCurrentStep("condition")}
            onComplete={handleFormCompleted}
          />
        );
      case "thanks":
        return (
          <ThankYouScreen onReset={resetForm} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-secondary/30 p-4">
      <div className="form-container">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
