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
          }));
        } else {
          setErrors((prev) => {
            const { [name]: removedError, ...rest } = prev;
            return rest;
          });
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
      const newErrors: Errors = {};
      let isValid = true;

      // Validate all fields on form submission
      for (const name in formState) {
        if (formState[name] === "") {
          newErrors[name] = `${name} field is required`;
          isValid = false;
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
