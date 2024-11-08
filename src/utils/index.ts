import { FormikProps } from "formik";
import { array, number, string, object } from "yup";

const Utilities = class {
  getValidationSchema(args: Array<{ type: string; name: string }>) {
    const email_v = string().email().required("Email is required");
    const password_v = string().required("Password is required");
    const number_v = number().required("Number is required");
    const array_v = array().of(string()).required("Array is required");

    function getFieldValidationType(type: string) {
      switch (type) {
        case "email":
          return email_v;
        case "password":
          return password_v;
        case "number":
          return number_v;
        case "array":
          return array_v;
        default:
          return string().required("Field is required");
      }
    }

    const schema = args.reduce<
      Record<string, ReturnType<typeof getFieldValidationType>>
    >((acc, arg) => {
      acc[arg.name] = getFieldValidationType(arg.type);
      return acc;
    }, {});

    return object().shape(schema);
  }

  getFormikFieldProps<Type>(
    formik: FormikProps<Type>,
    field: keyof Type,
    autoCompleteField?: boolean
  ) {
    const { values, errors, touched, getFieldProps, setFieldValue } = formik;

    const error = touched[field] && Boolean(errors[field]);
    const helperText = touched[field] && (errors[field] as any);

    const onChange: any = (__: React.SyntheticEvent, newValue: any) => {
      setFieldValue(field as string, newValue);
    };

    const fieldProps = {
      error,
      helperText,
      ...(autoCompleteField
        ? { onChange, multiple: true, value: values[field] }
        : getFieldProps(field as string)),
    };

    return fieldProps;
  }
};

const utils = new Utilities();

export default utils;
