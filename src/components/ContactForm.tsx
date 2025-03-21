
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  zipCode: string;
  condition: string;
  onBack: () => void;
  onComplete: () => void;
}

export default function ContactForm({ zipCode, condition, onBack, onComplete }: ContactFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Apply phone format: (XXX) XXX-XXXX
    let formattedPhone = "";
    if (digits.length <= 3) {
      formattedPhone = digits;
    } else if (digits.length <= 6) {
      formattedPhone = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formattedPhone = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    
    return formattedPhone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formattedPhone }));
    
    if (errors.phone) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with a short delay
    setTimeout(() => {
      console.log("Form submitted:", {
        ...formData,
        zipCode,
        condition
      });
      
      toast({
        title: "Form Submitted",
        description: "We'll contact you within 24 hours.",
        duration: 5000,
      });
      
      setIsSubmitting(false);
      onComplete();
    }, 1500);
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
      
      <h2 className="form-title">Complete Your Free Review</h2>
      <p className="form-subtitle">
        Please provide your contact information
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            autoFocus
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="form-input"
            value={formData.phone}
            onChange={handlePhoneChange}
            maxLength={14} // (XXX) XXX-XXXX
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        
        <button 
          type="submit" 
          className="form-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Submit for Free Review'
          )}
        </button>
        
        <p className="form-disclaimer">
          100% confidential. We'll contact you within 24 hours.
        </p>
      </form>
    </div>
  );
}
