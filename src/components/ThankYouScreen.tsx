
import { ArrowRight } from "lucide-react";

interface ThankYouScreenProps {
  onReset: () => void;
}

export default function ThankYouScreen({ onReset }: ThankYouScreenProps) {
  return (
    <div className="form-step animate-scale-in text-center">
      <svg className="w-20 h-20 mx-auto mb-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      
      <h2 className="form-title">Thank You!</h2>
      <p className="text-muted-foreground mb-8">
        We've received your information and will contact you within 24 hours.
      </p>
      
      <button 
        onClick={onReset} 
        className="form-button"
      >
        <span>Start New Consultation</span>
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  );
}
