import { useState } from "react";

interface ValidationRules {
  required?: boolean;
}

interface Errors {
  [key: string]: string;
}

interface FormState {
  [key: string]: string;
}

const useCustomForm = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const register = (name: string, validationRules: ValidationRules) => {
    return {
      name,
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const value = event.target.value;
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));

        if (validationRules.required && !value) {
          setErrors((prev) => ({
            ...prev,
            [name]: `${name} field is required`,
          }));
        } else {
          if (errors[name]) {
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
            });
          }
        }
      },
      onBlur: () => {
        if (validationRules.required && !formState[name]) {
          setErrors((prev) => ({
            ...prev,
            [name]: `${name} field is required`,
          }));
        }
      },
    };
  };

  const handleSubmit = (onSubmit: (data: FormState) => void) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let isValid = true;
      const newErrors: Errors = {};

      // Validate all fields on form submission
      for (const name in formState) {
        if (formState.hasOwnProperty(name)) {
          const value = formState[name];
          if (value === "") {
            newErrors[name] = `${name} field is required`;
            isValid = false;
          }
        }
      }

      setErrors(newErrors);

      if (isValid) {
        onSubmit(formState);
      }
    };
  };

  return {
    register,
    handleSubmit,
    formState,
    errors,
  };
};

export default useCustomForm;
