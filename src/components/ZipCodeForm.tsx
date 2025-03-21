
import { useState } from "react";
import { isValidZipCode } from "@/lib/validZipCodes";

interface ZipCodeFormProps {
  onZipCodeValid: (zipCode: string) => void;
}

export default function ZipCodeForm({ onZipCodeValid }: ZipCodeFormProps) {
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!zipCode) {
      setError("Please enter a zip code");
      return;
    }
    
    if (!/^\d{5}$/.test(zipCode)) {
      setError("Zip code must be 5 digits");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    // Simulate API call with a short delay
    setTimeout(() => {
      if (isValidZipCode(zipCode)) {
        onZipCodeValid(zipCode);
      } else {
        setError("Sorry, we don't service this area yet");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="form-step animate-scale-in">
      <h2 className="form-title">Free Consultation</h2>
      <p className="form-subtitle">
        Enter your zip code to see if you qualify
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Enter Zip Code"
            className="form-input"
            value={zipCode}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, '').slice(0, 5);
              setZipCode(input);
              if (error) setError("");
            }}
            maxLength={5}
            autoFocus
          />
          {error && <p className="form-error">{error}</p>}
        </div>
        
        <button 
          type="submit" 
          className="form-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Checking...
            </div>
          ) : (
            'Free Consultation'
          )}
        </button>
      </form>
    </div>
  );
}
