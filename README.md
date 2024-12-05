# Table of Contents

-   [Introduction](#introduction)
-   [Overview](#overview)
-   [Inspiration](#inspiration)
-   [Dependancies](#dependancies)
-   [/api](#api)
-   [/app](#app)
-   [/components](#components)
    -   [Inputs](#inputs)
    -   [Data Grid](#datagrid)
    -   [Charts](#charts)
    -   [Containers](#containers)
    -   [Dialogs](#dialogs)
    -   [Popover](#popover)
    -   [Snackbar](#snackbar)
    -   [Tabs](#tabs)
-   [/constants](#constants)
    -   [Branding](#branding)
    -   [routes](#routes)
    -   [theme](#theme)
-   [/context](#context)
    -   [CountriesProvided](#countriesProvided)
    -   [QueryClientProviderWrapper](#queryClientProviderWrapper)
-   [/hooks](#hooks)
    -   [api-hooks](#api-hooks)
        -   [useQueryGet](#useQueryGet)
        -   [useQueryPost](#useQueryPost)
    -   [useResponsiveness](#useResponsiveness)
-   [/layouts](#layouts)
    -   [AuthLayout](#authLayouts)
    -   [DashboardLayout](#dashboardLayout)
-   [/utils](#utils)
    -   [utils](#utils)
-   [middleware](#middleware)

## Introduction

### Overview

This template is designed to streamline your dashboard development process, allowing you
to kickstart your projects without starting from scratch every time. It comes
pre-configured with the essential components and utilities that are commonly used in
modern dashboards. With this template, you'll have most of the foundational setup done
for you, including `hooks`, `input components`, `data grids`, `snackbars`, `Dialogs`, `popovers` e.t.c.

### Inspiration

I built this MUI dashboard template because I was tired of setting up the same things
every time I started a new project. Instead of spending time on repetitive
configurations, I wanted a solid starting point that let me dive straight into building
the actual features. This template is designed to simplify the process, save time, and
provide a consistent foundation for any dashboard project.

#### Dependencies

This project uses the following dependencies.
| Dependency | Version | Description |
| ---------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------- |
| **[@emotion/react](https://mui.com/)** | ^11.13.3 | Library for writing CSS styles with JavaScript. |
| **[@emotion/styled](https://mui.com/)** | ^11.13.0 | Styled component library for Emotion. |
| **[@mui/icons-material](https://mui.com/)** | ^6.1.6 | Material UI icons for React. |
| **[@mui/material](https://mui.com/)** | ^6.1.6 | Material UI React components. |
| **[@mui/styles](https://mui.com/)** | ^6.1.6 | Material UI styling solutions (legacy version). |
| **[@mui/x-charts](https://mui.com/)** | ^7.22.2 | Charts library from Material UI. |
| **[@mui/x-data-grid](https://mui.com/)** | ^7.22.1 | Data grid component from Material UI. |
| **[@mui/x-date-pickers](https://mui.com/)** | ^7.22.1 | Date pickers from Material UI. |
| **[@tanstack/react-query](https://tanstack.com/query)** | ^5.59.20 | Data-fetching and state management library for React. |
| **[@toolpad/core](https://github.com/mui/toolpad)** | 0.10.0 | Toolpad Core for building apps. |
| **[axios](https://axios-http.com/)** | ^1.7.7 | Promise-based HTTP client for making requests. |
| **[cookies-next](https://github.com/marcusgold/next-cookies)** | ^4.3.0 | A library for handling cookies in Next.js. |
| **[formik](https://formik.org/)** | ^2.4.6 | Form management library for React. |
| **[libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)** | ^1.11.14 | A library for parsing, formatting, and validating phone numbers. |
| **[react-icons](https://react-icons.github.io/react-icons/)** | ^5.3.0 | A set of popular icons for React. |

## Components

### Inputs

1.  AutocompleteField

    A wrapper around MUI’s `Autocomplete` that adds support for `label`, `error`, `helperText`, and `placeholder`, which are passed to the TextField rendered inside the `Autocomplete`.

    **Props**

    - `label?: string`

        The label for the autocomplete field.

        _Use case_: Describes the purpose of the field (e.g., "Select an Option").

    - `error?: boolean`

        If true, the input field will display an error state (red border).

        _Use case_: Use when validation fails to highlight the input field with an error.

    - `helperText?: string`

        Text displayed below the input field, typically used for error messages or additional information.

        _Use case_: Provides context or error messages under the input field.

    **Usage**

    ```javascript
    <AutocompleteField
        label="Select an option"
        options={['Option 1', 'Option 2', 'Option 3']}
        error={hasError}
        helperText={errorText}
        placeholder="Search..."
    />
    ```

2.  CheckboxInputField

    A wrapper around MUI’s `Checkbox`.

    **Props**

    - `label: string`

        The label displayed next to the checkbox.

        _Use case_: Describes the purpose of the checkbox (e.g., "Accept Terms and Conditions").

    **Usage**

    ```javascript
    <CheckboxInputField label="Agree to terms" checked={isChecked} onChange={handleChange} />
    ```

3.  DataGridSearchInputField

    A search input field that updates the `DataGrid`'s quick filter values, allowing for dynamic filtering of rows based on the search term. It uses the `useGridApiContext` hook to access the `apiRef` of the `DataGrid` and updates the quick filter whenever the search term changes.

    **Usage**

    ```javascript
    <DataGridSearchInput />
    ```

4.  GroupedCheckboxInputField

    A wrapper around MUI's `FormControl`, `FormLabel`, and `FormGroup` that renders a group of checkboxes. The component handles both single and multiple selection scenarios based on the `multiple` prop. It passes the selected values back through the `onChange` callback, updating the value for multiple selections or single selection accordingly.

    **Props**

    - `options: { name: string; value: any }[]`

        List of checkbox options where each item has a `name` (label) and `value` (checkbox value).

        _Use case_: Provides the set of options available for the user to select.

    - `label?: string`

        The label for the group of checkboxes.

        _Use case_: Describes the purpose of the checkbox group (e.g., "Select Interests").

    - `error?: boolean`

        Whether the checkbox group should display an error state (red text).

        _Use case_: Use when validation fails to highlight the group with an error message.

    - `helperText?: string`

        Text displayed below the checkbox group, typically used for error or additional information.

        _Use case_: Provides context or error message under the checkbox options.

    - `onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: new checkbox values) => void`

        Callback function triggered when a checkbox is checked or unchecked. Receives the event and the updated value as arguments.

        _Use case_: Handles the changes in selected checkbox options.

    - `value?: any`

        The current selected value(s) of the checkbox group. For multiple checkboxes, it can be an array of selected values.

        _Use case_: Keeps track of the currently selected checkboxes.

    - `multiple?: boolean`

        If true, the user can select multiple checkboxes. If false, only one checkbox can be selected at a time.

        _Use case_: Defines whether the checkbox group allows single or multiple selections.

    **Usage**

    ```javascript
    <GroupedCheckboxInputField
        label="Select options"
        options={[
            { name: 'Option 1', value: '1' },
            { name: 'Option 2', value: '2' },
        ]}
        value={selectedValues}
        onChange={handleChange}
        multiple={true}
    />
    ```

5.  OTPField

    A custom OTP input field that renders a series of individual input fields for each OTP digit. The component takes a `length` prop to define how many digits are in the OTP. It automatically shifts focus between input fields as the user types and handles arrow key navigation. The `onChange` callback receives the concatenated OTP value whenever it is updated.

    **Props**

    - `length?: number`

        The number of OTP fields. Defaults to `4`.

        _Use case_: Allows customization of the number of digits for OTP input.

    - `error?: boolean`

        Whether the OTP fields should display an error state (red border).

        _Use case_: Use when validation fails to highlight the input fields.

    - `onChange?: (otp: string) => void`

        Callback function triggered when the OTP value changes. Receives the concatenated OTP string as an argument.

        _Use case_: Handles the OTP input value as it’s being typed.

    **Usage**

    ```javascript
    <OTPField length={6} label="Enter OTP" onChange={handleOTPChange} />
    ```

6.  PaymentCardInput

    A customizable payment card input component that allows users to input card details (card number, expiry date, and CVV). The component supports real-time validation, auto-formatting, and dynamic card type display based on the card number.

    - _Card Number_

        **Input Format**: Card number is auto-formatted with spaces for readability `(0000 0000 0000 0000)`.

        **Card Type Detection**: Automatically detects the card type (`visa`, `mastercard`, `america express`) based on the number input.

    - _Expiry Date_

        **Input Format**: Expiry date is auto-formatted as `MM / YY`.

    - _CVV_

        **Input Format**: A 3-4 digit CVV code.

    **Props**

    -   `onChange?: (arg: {cardNumber, expiryDate, cvv}) => void`

        Callback triggered when any field value changes (card number, expiry date, or CVV).

        _Use case_: To collect the payment card details in a parent component.

    -   `errorMessages?: { cardNumber?: string; expiryDate?: string; cvv?: string }`

            Error messages to display for each individual field (card number, expiry date, or CVV).

            _Use case_: To display custom error messages for each of the fields when validation fails.

        **Usage**

    ```javascript
    <PaymentCardInput onChange={handleCardChange} errorMessages={{ cardNumber: 'Invalid card number' }} />
    ```

7.  PhoneNumberInput

    A customizable phone number input field that allows users to select their country and input a phone number. The component supports dynamic country selection, flag display, country code input, and real-time phone number formatting.

    **Props**

    - `label?: string`

        The label for the input field.

        _Use case_: Describes the purpose of the input (e.g., "Phone Number").

    - `poperWidth?: number`:

        Width of the country selection dropdown (menu). Defaults to `400`.

    - `colorIndex?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900`

        Defines the color shade of the country flag dropdown. Defaults to `200` for light mode and `800` for dark mode.

        _Use case_: Customizes the background color of the country flag dropdown.

    - `onChange?: (arg: PhoneNumberInputOnChangeArgs) => void`

        Callback triggered when the input value changes. It provides an object with `phone` (the country’s calling code), `code` (the country’s code), and `value` (the input value).

        _Use case_: Used to handle and process the phone number input.

    **Usage**

    ```javascript
    <PhoneNumberInput label="Phone Number" size="small" onChange={handlePhoneNumberChange} />
    ```

    ```javascript
        handlePhoneNumberChange

        const handlePhoneNumberChange = ({ event, phone, code, value }: PhoneNumberInputOnChangeArgs) => {
            console.log(phone,code, value);
        };
    ```

8.  PlacesSelectInput

    A customizable input field that integrates with Google’s Places API, allowing users to search and select locations. Make sure to provide your own Google Maps API key via the `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable.

    **Props**

    - `onChange?: (value: string) => void`

        Callback function triggered whenever the input value changes.

        _Use case_: Use to track or handle the selected place value.

    - `label?: string`

        The label for the input field, displayed above the `TextField`.

        _Use case_: Describes the purpose of the input field (e.g., "Search for a place").

    - `placeholder?: string`

        Placeholder text to be displayed when the input is empty.

        _Use case_: Guides the user on what to input (e.g., "Enter a location").

    - `helperText?: string`

        Helper text displayed below the input field.

        _Use case_: Used to provide additional information or validation feedback.

    - `error?: boolean`

        If `true`, displays the input field with an error style.
        _Use case_: Used for form validation to indicate when the user input is invalid.

    - `defaultValue?: string`

        The initial value for the input when the component is first rendered.
        _Use case_: Provides a default place when necessary, like a previously selected location.

9.  SelectFieldInput

    The `SelectFieldInput` component is a customizable dropdown input field that wraps MUI’s `Select` component. It allows the user to choose from a list of options or custom children. This component handles error states, helper text, and a placeholder when no selection is made.

    **Props**

    - `options?: { value: string | number; label: string }[]`

        Array of options to be displayed in the dropdown. Each option is an object containing a `value` (either a string or number) and a `label` (string) to be displayed in the dropdown list.
        _Use case_: When you want to pass predefined options to the select field.

    - `children?: React.ReactNode`

        Any custom elements or additional `MenuItem` components to be included in the dropdown (overrides `options` if provided).
        _Use case_: Allows developers to inject custom menu items if `options` is not used.

    - `helperText?: string | boolean`

        Text to be displayed below the `Select` field, typically used for error or additional information. If true, it will show the default error text.
        _Use case_: Helpful for providing feedback or instructions beneath the input field.

    - `label?: string`

        The label text for the `Select` field.
        _Use case_: Describes the purpose of the select field (e.g., "Select a Country").

    - `error?: boolean`

        If `true`, applies an error style to the `Select` input and triggers the display of helper text with an error state.
        Use case: Useful for form validation when input is invalid.

    - `placeholder?: string`

        Text to be shown when no value is selected.
        Use case: Indicates what the user should select from the dropdown (e.g., "Choose an option").

    **Usage**

    ```javascript
    <SelectFieldInput
        label="Select a city"
        options={[
            { value: 'ny', label: 'New York' },
            { value: 'la', label: 'Los Angeles' },
        ]}
        onChange={handleChange}
        placeholder="Select a city"
        helperText="Please choose a city from the list"
    />
    ```

10. TextFieldInput

    The `TextFieldInput` component is a simple wrapper around MUI’s `TextField`, allowing customization of the `label`. It supports all standard MUI `TextField props`.

    **Usage**

    ```javascript
    <TextFieldInput
        label="Enter your name"
        size="medium"
        onChange={handleChange}
        helperText="Please enter your full name"
    />
    ```
