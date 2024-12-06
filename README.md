# Introduction

## Overview

This template is designed to streamline your dashboard development process, allowing you
to kickstart your projects without starting from scratch every time. It comes
pre-configured with the essential components and utilities that are commonly used in
modern dashboards. With this template, you'll have most of the foundational setup done
for you, including `hooks`, `input components`, `data grids`, `snackbars`, `Dialogs`, `popovers` e.t.c.

## Inspiration

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


# hooks walkthrough

The `hooks` folder contains custom React hooks that abstract reusable logic to make the components more readable and easier to maintain.

This folder generally contains utility hooks related to application state management, performance optimizations, and specific functionalities that are reused across the app.

Here are the list of pre-built hooks

1. **useSetSearchParams**

    The `useSetSearchParams` hook provides a convenient way to manage query parameters in the URL.
    It encapsulates logic for setting and getting URL search parameters using the Next.js `useSearchParams` and `useRouter` hooks.

    This is useful for situations where you need to manipulate or retrieve URL query parameters, such as for `filtering`, `pagination`, or other use cases that require URL state management.

    **Returns**

    `setParams`: A function that sets query parameters in the URL.

    _example_

    ```javascript
    const { setParams } = useSearchParams();

    setParams({
        page: 2,
        sort: 'asc',
        filter: 'active',
    });
    ```

    `getParam`: A function to retrieve the value of a specific query parameter from the URL.

    _example_

    ```javascript
    const { getParam } = useSearchParams();

    const page = getParam('page'); // e.g., "2"
    const sort = getParam('sort'); // e.g., "asc"
    ```

2. **useQueryPost** (_under `hooks > api-hooks`_)

    This hook leverages React Query's `useMutation` to make a `POST` request to a provided API endpoint. It abstracts away the logic of making an API request, handling parameters, and managing state, making it easier to use across components. The hook is generic, allowing for flexibility in data types for both the request payload and query parameters.

    **Generic Types**

    - `TData`: Type for the request payload (data) being sent in the POST request.

    - `TParams`: Type for the query parameters (params) being passed with the request.

    **Parameters**

    - `url` (`keyof typeof urls`): The API endpoint to send the `POST` request to. This corresponds to a key in the `urls` object from the API client configuration.

    - `data` (`TData`): The data to be sent in the `POST` body (optional).

    - `params` (`TParams`): The URL query parameters (optional).

    **Return Value**

    The hook returns the result of the mutation from React Query's `useMutation`, including state such as loading, success, and error states.

    **Usage**

    ```javascript
    const { mutate, isLoading, isError, data } = useQueryPost<any, { id: number }>('updateUser');
    ```

3. **useQueryGet**

    It leverages React Query's `useQuery` to make a `GET` request to a provided API endpoint. It abstracts the logic for handling `GET` requests, caching, and error handling, making it easier to use across the application. This hook supports optional query parameters and custom query options, providing flexibility for fetching data.

    **Generic Types**

    - `TData`: Type for the response data returned from the API.

    - `TParams`: Type for the query parameters (params) passed in the request.

    **Parameters**

    - `url` (`keyof typeof urls`): The API endpoint to send the `GET` request to. This corresponds to a key in the `urls` object from the API client configuration.

    - `params` (`TParams`, optional): Query parameters to be sent with the `GET` request.

    - `options` (`Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>, optional`): Additional configuration options for the query, such as refetch settings, cache time, etc. This excludes `queryKey` and `queryFn`, which are managed internally by the hook.

    **Return Value**

    The hook returns the result of the query from React Query's `useQuery`, which includes various states like loading, error, and the fetched data.

    **Usage**

    ```javascript
    const { data, isLoading, isError, error } = useQueryGet<any, { userId: number }>('getUserProfile', { userId: 123 });
    ```

4. **useResponsiveness**

    The `useResponsiveness` hook provides a simple way to detect the screen size or device type based on predefined breakpoints. It uses the `useMediaQuery` hook from Material UI to return boolean values for different device categories, such as mobile, tablet, laptop, and desktop.

    **Returned Values**

    - `isMobile` `(boolean)`: `true` if the screen width is 600px or less (mobile devices).
    - `isMiniTablet` `(boolean)`: `true` if the screen width is 768px or less (small tablets).
    - `isTablet` `(boolean)`: `true` if the screen width is 1024px or less (tablets).
    - `isLaptop` `(boolean)`: `true` if the screen width is 1439px or less (laptops).
    - `isDesktop` `(boolean)`: `true` if the screen width is 1824px or more (desktop screens).

# utils walkthrough

The `utils` folder contains utility functions that serve various purposes throughout the application. These functions are designed to simplify and abstract commonly used operations, such as data manipulation, validations, and other reusable logic that doesn't directly fit into components, hooks, or context. These utility functions help improve code reusability, maintainability, and clarity.

The following functions are available in the utils file:

1. **getValidationSchema**

    Generates a dynamic Yup validation schema based on the provided field types and names. It supports common validation types like email, password, phone number, and credit card information, with optional country-specific phone number validation.

    **Parameters**

    - `args`: An array of objects containing `type` (validation type) and `nam`e (field name).
    - `countryCode` (optional): Country code for validating phone numbers.

    **Returns**

    A Yup object schema with validation rules for each field.

    _usage example_

    ```javascript
    const validationSchema = getValidationSchema(
        [
            { type: 'email', name: 'email' },
            { type: 'password', name: 'password' },
            { type: 'phone_number', name: 'phone' },
        ],
        'US',
    );
    ```

2. **getFormikFieldProps**

    Generates form field properties required by Formik to handle various input types like phone numbers, autocomplete, OTP, card information, and grouped checkboxes.

    **Parameters**

    - `formik`: Formik object containing values, errors, touched, and helper functions.
    - `field`: The specific field name to retrieve Formik props for.
    - `isAutoComplete` (optional): If true, the field is treated as an autocomplete.
    - `isPhoneNumber` (optional): If true, the field is treated as a phone number input.
    - `isCardInformation` (optional): If true, the field is treated as a card information input.
    - `isOTP` (optional): If true, the field is treated as an OTP input.
    - `isGroupedCheckbox` (optional): If true, the field is treated as a grouped checkbox input.
    - `isLocation` (optional): If true, the field is treated as a location input.

    **Returns**

    Returns an object with the necessary props for the specified field type, such as `onChange`, `error`, `helperText`, and `value`.

    **usage example**

    ```javascript
    <TextFieldInput
        name="email"
        placeholder="Email"
        label="Email"
        {...utils.getFormikFieldProps({ formik, field: 'email' })}
    />
    ```

3. **validateCardNumber**

    Validates a credit card number using the `Luhn algorithm`, which is commonly used to validate credit card numbers.

    **Parameters**

    - `cardNumber`: A string representing the credit card number to be validated.

    **Returns**

    `boolean`: Returns `true` if the card number is valid according to the Luhn algorithm, otherwise returns `false`.

    _usage example_

    ```javascript
    const isValid = validateCardNumber('4539578763621486');
    console.log(isValid); // true or false
    ```

4. **formatCardNumber**

    Formats a credit card number into groups of four digits separated by spaces for better readability.

    **Parameters**

    - `cardNumber`: A string representing the raw credit card number (without spaces or dashes).

    **Returns**

    - `string`: A formatted credit card number where every 4 digits are separated by a space.

    _example usage_

    ```javascript
    const formattedCardNumber = formatCardNumber('4539578763621486');
    console.log(formattedCardNumber); // "4539 5787 6362 1486"
    ```

5. **getCardType**

    Determines the type of credit card (e.g., Visa, Mastercard, American Express) based on the provided card number.

    **Parameters**

    - `cardNumber`: A string representing the raw credit card number (without spaces or dashes).

    **Returns**

    - `CardType`: A string representing the card type (`'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'`).

    _example usage_

    ```javascript
    const cardType = getCardType('4539578763621486');
    console.log(cardType); // "visa"

    const unknownCardType = getCardType('1234567890123456');
    console.log(unknownCardType); // "unknown"
    ```

6. **formatCardExpiryDate**

    Formats a credit card's expiry date in MM/YY format.

    **Parameters**

    `expiryDate`: A string representing the raw expiry date (typically in MMYY format).

    **Returns**

    - A string representing the formatted expiry date in MM/YY format. If the input is invalid or of length 1, the raw input is returned without formatting.

    _example usage_

    ```javascript
    const formattedDate = formatCardExpiryDate('1225');
    console.log(formattedDate); // "12/25"

    const invalidFormat = formatCardExpiryDate('5');
    console.log(invalidFormat); // "5"

    const emptyDate = formatCardExpiryDate('');
    console.log(emptyDate); // ""
    ```

7. **isDefaultPagination**

    Checks whether the provided parameters (param and value) match the default pagination settings.

    **Parameters**

    - `param`: A string representing the parameter to check (e.g., 'start' or 'limit').
    - `value`: The value associated with the parameter.

    **Returns**

    - A boolean value:

        - `true` if the parameter and value match the default pagination settings:

            - `'start'` with a value of `1`

        - `'limit'` with a value of `10`

        - `false` otherwise.

    _example usage_

    ```javascript
    isDefaultPagination('start', 1); // true
    isDefaultPagination('limit', 10); // true
    isDefaultPagination('start', 5); // false
    isDefaultPagination('limit', 20); // false
    ```

8. **customizeGridColumns**

    Customizes grid column definitions based on the responsiveness of the device and optional settings such as adding a "No." column for numbering.

    **Parameters**

    - `columns`: An array of grid column definitions (`GridColDef`), with an optional `mobileWidth` for each column to set different widths on mobile devices.

    - `numbered` (optional): A boolean flag that determines whether to include a "No." column for numbering the rows. Defaults to `false`.

    **Returns**

    - An array of modified `GridColDef` objects, each representing a column with the appropriate width or flex values based on the current screen size.

    _example usage_

    ```javascript
    // Usage with numbered columns:
    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'age', headerName: 'Age', mobileWidth: 100 },
    ];

    const customizedColumns = customizeGridColumns(columns, true);
    // This would include a "No." column before the "Name" and "Age" columns

    // Usage without numbered columns:
    const columnsWithoutNumbering = customizeGridColumns(columns);
    ```

9. **getIndexedRows**

    Adds an indexed "No." column to each row in the provided list of grid rows.

    **Parameters**

    - `rows`: An array of `GridRowModel` objects, where each object represents a row of data in a grid.

    **Returns**

    - A new array of rows, where each row includes an additional `no` property representing a 2-digit index (e.g., "01.", "02.", "03.", etc.) at the beginning of the row data. If no rows are provided (`rows` is `undefined`), the function returns `undefined`.

    _example usage_

    ```javascript
    // Example with rows
    const rows = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
    ];

    const indexedRows = getIndexedRows(rows);

    // Result:
    // [
    //     { no: '01.', name: 'John', age: 30 },
    //     { no: '02.', name: 'Jane', age: 25 },
    // ]

    // Example with no rows
    const indexedRowsEmpty = getIndexedRows(); // Returns undefined
    ```

10. **mutateOptions**

    This function provides a customizable way to handle API mutation responses, specifically the success and error cases. It allows you to define callbacks for handling the response, success, and error scenarios.

    **Parameters**

    - `MutateOptionsProps<TData>`: A set of options for customizing how the mutation is handled. `TData` refers to the expected response data type from the API.

        - `successAsyncCallback` (optional): A callback function to execute asynchronously on a successful API response.

        - `successCallback` (optional): A callback function to execute on a successful API response.
        - `errorCallback` (optional): A callback function to execute on an error response.

        - `setLoading` (optional): A state setter function to control the loading state (e.g., setLoading(false) when mutation completes).

    **Returns**

    - An object with two properties ():

        - `onSuccess`: A function to handle the success scenario. It will either call `successCallback` or `successAsyncCallback`, depending on whether the callback is asynchronous.

        - `onError`: A function to handle errors. It shows a generic error toast message and calls the provided `errorCallback`, if available.

    _example usage_

    The return object from the `mutateOptions` function is used as mutation options in React Query's `useMutation` hook.

    ```javascript
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            const response = await apiClient.post('/some-endpoint', data);
            return response.data;
        },
        ...mutateOptions({
            // Use this to perform some synchronous task with the response.
            successCallback: (response) => {
                console.log('Success:', response);
            },
            // Use this to perform some asynchronous task with the response.
            successAsyncCallback: async (response) => {
                await someAsyncFunction(response);
            },
            errorCallback: (response) => {
                console.error('Error:', response);
            },
            setLoading: setLoadingState,
        }),
    });
    ```

    > **Note**
    >
    > 1. You can't use both `successCallback` and `successAsyncCallback` at the same time.
    > 2. This function is fully customizable, and fuly depends on the structure of your `API` response structure.
    > 3. Make sure to edit it to meet your API response structure.

# middleware file walkthrough

This `middleware` function in Next.js is an important part of handling request interception and server-side logic before rendering pages. It allows us to apply custom logic to all incoming HTTP requests, and can be particularly useful for authentication, route protection, and other custom server-side operations.

In my case, the middleware I specifically used to handle:

-   **Authentication & Protected Routing**: Redirecting users based on their authentication status.
-   **Routing Logic**: Redirecting users to a different page depending on conditions (_e.g., redirecting from the home page to the dashboard if the user is already logged in_).

# functions folder walkthrough

The `functions` folder contains client-side and server-side actions that centralize the application's business logic.

1. `serverActions`

    In my case, I have `handleSetSessions` and `handleRemoveSession` functions, which are going to handle user sessions. This enables me to access `cookies` from `next/headers`.

2. `clientActions`

    In my case, I have `handleLogout` and `handleUserIdentityUpdate` functions.

# api folder walkthrough

This folder houses all the logic related to interacting with external `api` services.

1. `urls file`

    This file contains a centralized list of API endpoints, which serves as a single source of truth for all the URLs used in the application.

    _example_

    ```javascript
    export const urls = {
        login: '/login',
        getuser: '/get-user',
    };
    ```

2. `apiClient file`

    This file sets up the `apiClient` using `Axios` to handle API requests with authentication and a custom configuration. It creates a central place for making HTTP requests to the backend, along with interceptors for handling requests and responses.

    It also initializes `queryClient`.

# layouts folder walkthrough

This folder abstracts the application layouts into two, `AuthLayouts` and `DashboardLayout`. These layouts will be used respectively for each layout.

1. `AuthLayouts`

    Sets up the authentication layout for the application.

2. `DashboardLayout`

    The dashboard layout provides a customizable out-of-the-box layout for a typical dashboard page, using [MUI Toolpad core dashboard layout](https://mui.com/toolpad/core/introduction/).

# Components walkthrough

## Inputs

1.  AutocompleteField

    A wrapper around MUI’s `Autocomplete` that adds support for `label`, `error`, `helperText`, and `placeholder`, which are passed to the TextField rendered inside the `Autocomplete`.

    **Custom Props**

    -   `label?: string`

        The label for the autocomplete field.

        _Use case_: Describes the purpose of the field (e.g., "Select an Option").

    -   `error?: boolean`

        If true, the input field will display an error state (red border).

        _Use case_: Use when validation fails to highlight the input field with an error.

    -   `helperText?: string`

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

    **Custom Props**

    -   `label: string`

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

    **Custom Props**

    -   `options: { name: string; value: any }[]`

        List of checkbox options where each item has a `name` (label) and `value` (checkbox value).

        _Use case_: Provides the set of options available for the user to select.

    -   `label?: string`

        The label for the group of checkboxes.

        _Use case_: Describes the purpose of the checkbox group (e.g., "Select Interests").

    -   `error?: boolean`

        Whether the checkbox group should display an error state (red text).

        _Use case_: Use when validation fails to highlight the group with an error message.

    -   `helperText?: string`

        Text displayed below the checkbox group, typically used for error or additional information.

        _Use case_: Provides context or error message under the checkbox options.

    -   `onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: new checkbox values) => void`

        Callback function triggered when a checkbox is checked or unchecked. Receives the event and the updated value as arguments.

        _Use case_: Handles the changes in selected checkbox options.

    -   `value?: any`

        The current selected value(s) of the checkbox group. For multiple checkboxes, it can be an array of selected values.

        _Use case_: Keeps track of the currently selected checkboxes.

    -   `multiple?: boolean`

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

    **Custom Props**

    -   `length?: number`

        The number of OTP fields. Defaults to `4`.

        _Use case_: Allows customization of the number of digits for OTP input.

    -   `error?: boolean`

        Whether the OTP fields should display an error state (red border).

        _Use case_: Use when validation fails to highlight the input fields.

    -   `onChange?: (otp: string) => void`

        Callback function triggered when the OTP value changes. Receives the concatenated OTP string as an argument.

        _Use case_: Handles the OTP input value as it’s being typed.

    **Usage**

    ```javascript
    <OTPField length={6} label="Enter OTP" onChange={handleOTPChange} />
    ```

6.  PaymentCardInput

    A customizable payment card input component that allows users to input card details (card number, expiry date, and CVV). The component supports real-time validation, auto-formatting, and dynamic card type display based on the card number.

    -   _Card Number_

        **Input Format**: Card number is auto-formatted with spaces for readability `(0000 0000 0000 0000)`.

        **Card Type Detection**: Automatically detects the card type (`visa`, `mastercard`, `america express`) based on the number input.

    -   _Expiry Date_

        **Input Format**: Expiry date is auto-formatted as `MM / YY`.

    -   _CVV_

        **Input Format**: A 3-4 digit CVV code.

    **Custom Props**

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

    **Custom Props**

    -   `label?: string`

        The label for the input field.

        _Use case_: Describes the purpose of the input (e.g., "Phone Number").

    -   `poperWidth?: number`:

        Width of the country selection dropdown (menu). Defaults to `400`.

    -   `colorIndex?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900`

        Defines the color shade of the country flag dropdown. Defaults to `200` for light mode and `800` for dark mode.

        _Use case_: Customizes the background color of the country flag dropdown.

    -   `onChange?: (arg: PhoneNumberInputOnChangeArgs) => void`

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

    **Custom Props**

    -   `onChange?: (value: string) => void`

        Callback function triggered whenever the input value changes.

        _Use case_: Use to track or handle the selected place value.

    -   `label?: string`

        The label for the input field, displayed above the `TextField`.

        _Use case_: Describes the purpose of the input field (e.g., "Search for a place").

    -   `placeholder?: string`

        Placeholder text to be displayed when the input is empty.

        _Use case_: Guides the user on what to input (e.g., "Enter a location").

    -   `helperText?: string`

        Helper text displayed below the input field.

        _Use case_: Used to provide additional information or validation feedback.

    -   `error?: boolean`

        If `true`, displays the input field with an error style.
        _Use case_: Used for form validation to indicate when the user input is invalid.

    -   `defaultValue?: string`

        The initial value for the input when the component is first rendered.
        _Use case_: Provides a default place when necessary, like a previously selected location.

9.  SelectFieldInput

    The `SelectFieldInput` component is a customizable dropdown input field that wraps MUI’s `Select` component. It allows the user to choose from a list of options or custom children. This component handles error states, helper text, and a placeholder when no selection is made.

    **Custom Props**

    -   `options?: { value: string | number; label: string }[]`

        Array of options to be displayed in the dropdown. Each option is an object containing a `value` (either a string or number) and a `label` (string) to be displayed in the dropdown list.
        _Use case_: When you want to pass predefined options to the select field.

    -   `children?: React.ReactNode`

        Any custom elements or additional `MenuItem` components to be included in the dropdown (overrides `options` if provided).
        _Use case_: Allows developers to inject custom menu items if `options` is not used.

    -   `helperText?: string | boolean`

        Text to be displayed below the `Select` field, typically used for error or additional information. If true, it will show the default error text.
        _Use case_: Helpful for providing feedback or instructions beneath the input field.

    -   `label?: string`

        The label text for the `Select` field.
        _Use case_: Describes the purpose of the select field (e.g., "Select a Country").

    -   `error?: boolean`

        If `true`, applies an error style to the `Select` input and triggers the display of helper text with an error state.
        Use case: Useful for form validation when input is invalid.

    -   `placeholder?: string`

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

## Datagrid

These components will help you in buiding an intuitive datagrid interface for your application.

1. DatagridToolbar

    A custom toolbar for a data grid, providing functionalities such as search input, filter button, export button ( e.t. c, other mui GridToolbar components), and an "Add" button to trigger an action (e.g., opening a form to add a new entry). It also includes a search bar to filter or search within the grid (using [`DataGridSearchInput`](#inputs)).

    **Custom Props**

    - `onAdd?: () => void`

        A callback function triggered when the "New" button is clicked. This is typically used to handle actions such as opening a form or modal to add new data.
        Use case: Provides functionality for adding new rows or entries to the data grid.

    **Usage**

    ```javascript
    <DataGridToolbar onAdd={() => console.log('Add new item')} />
    ```

2. DataGridFooter

    The DataGridFooter component provides a customizable footer for data grids. It includes pagination controls, a dropdown for selecting rows per page, and responsiveness handling for mobile and desktop views.

    The `setParams` and `getParam` functions are part of the custom hook [`useSetSearchParams`](#hooks) (presumably used to manage URL query parameters). It allows you to synchronize the state of the data grid with the URL, making the data grid's current state persistent across page reloads.

    **Custom Props**

    - `loading: boolean | undefined`

        A flag indicating whether the data is currently loading. When `true`, pagination and row selection are disabled.

        _Use case_: Provides a loading state for the data grid, preventing user interaction with the pagination controls while the data is being fetched.

    - `count: number`

        The total number of records/items in the dataset.

        _Use case_: Used to calculate the total number of pages for pagination and determine if the `start` page value exceeds the total number of records.

    **Usage**

    ```javascript
    <DataGridFooter loading={true} count={100} />
    ```

3. DataGridActions

    This component renders action buttons (Edit, Delete, Options) for each row in the data grid. It provides an easy way to add row-specific actions to a data grid by passing in the required callbacks (`onEdit`, `onDelete`, `onOptions`). The actions prop allows you to control which actions are displayed.

    **Custom Props**

    - `actions?: Array<'edit' | 'delete' | 'options'>`

    An optional array that specifies which action buttons should be shown. Available options are:

    1. `edit`: Shows the "Edit" action button.
    2. `delete`: Shows the "Delete" action button.
    3. `options`: Shows the "More Options" action button.

    _Use case_: Allows customization of the actions available in the grid's action column. By default, all actions are shown unless explicitly specified in the actions array.

    _example_

    ```javascript
    actions={['edit', 'delete']}  // Only edit and delete actions will be shown.
    ```

    - `onEdit?: () => void`

        A callback function that is triggered when the "Edit" action button is clicked.

        _Use case_: Used to handle the "Edit" action, typically opening a modal or navigating to an edit page.

    _example_

    ```javascript
    onEdit={() => { console.log("Edit clicked"); }}  // Logs when "Edit" is clicked.
    ```

    - `onDelete?: () => void`

        A callback function that is triggered when the "Delete" action button is clicked.

        _Use case_: Used to handle the "Delete" action, typically opening a confirmation dialog and deleting the row.

    _example_

    ```javascript
    onDelete={() => { console.log("Delete clicked"); }}  // Logs when "Delete" is clicked.
    ```

    - `onOptions?: (args: any) => void`

        A callback function that is triggered when the "Options" action button is clicked. `arguments` can be any value, eg: `row`.

        _Use case_: Used to handle the "More Options" action, such as opening a dropdown or options menu.

    _example_

    ```javascript
    onOptions={(row) => { console.log("Options clicked on row", row); }}  // Logs when "Options" is clicked.
    ```

    **Usage**

    ```javascript
    const columns = [
        ...columnsDef,
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <DataGridActions
                    actions={['edit', 'delete', 'options']}
                    onEdit={() => {
                        console.log('Edit clicked for row', params.row);
                    }}
                    onDelete={() => {
                        console.log('Delete clicked for row', params.row);
                    }}
                    onOptions={(args) => {
                        console.log('Options clicked for row', args);
                    }}
                />
            ),
        },
    ];
    ```

4. AppGrid

    The `AppGrid` component is a wrapper for the `DataGrid` component from MUI that integrates several customized subcomponents like the toolbar (`DataGridToolbar`) and footer (`DataGridFooter`). It provides a fully functional grid with actions like adding rows, pagination, and custom row styling.

    The `GridProps` type combines `DataGridProps` from MUI (DataGrid configuration props) and `DataGridToolbarProps` (`onAdd` callback). This allows you to pass all the standard MUI `DataGrid` props along with the additional toolbar props for customizing the "Add" action.

    **Custom Props**

    - `onAdd?: () => void`

        An optional callback function that is triggered when the "Add" button in the toolbar is clicked.

        _Use case_: This callback can be used to open a form or modal to add a new row to the data grid.

    **Usage**

    ```javascript
    <AppGrid
        loading={false}
        getRowId={(row) => row.id} // Customize the row ID
        columns={columns} // Your column definitions
        rows={rows} // Your row data
        onAdd={() => {
            console.log('Add new row');
        }}
    />
    ```

## Dialogs

These dialogs components will help you in displaying user feedback effectively.

1. DeleteDialog

    The `DeleteDialog` component is a customizable confirmation dialog designed to prompt users before performing irreversible delete actions. It provides a user-friendly interface with customizable titles, content text, and button labels, ensuring that users are certain about their actions before proceeding.

    **Custom Props**

    - `open: boolean`

        Controls the visibility of the dialog.

        _Use case_: Determines whether the delete confirmation dialog is displayed to the user.

    - `loading: boolean`

        Indicates whether a delete operation is in progress.

        _Use case_: Disables buttons and shows a loading indicator to prevent multiple submissions while the delete action is being processed.

    - `dialogTitle?: string`

        Customizes the title of the dialog.

        _Use case_: Allows setting a specific title for different delete scenarios (e.g., "Remove User", "Delete File").

    - `contentText?: string`

        Customizes the content text within the dialog.

        _Use case_: Provides specific details or warnings related to the delete action.

    - `onOkayButtonText?: string defautl ( cancel )`

        Customizes the label of the confirmation button.

        _Use case_: Allows changing the confirmation button text to better fit the context (e.g., "Delete", "Remove", "Confirm").

    - `onCancelButtonText?: string default ( Delete )`

        Customizes the label of the cancellation button.

        _Use case_: Allows changing the cancellation button text to better fit the context (e.g., "Cancel", "Dismiss").

    - `onCancel: () => void`

        Callback function triggered when the cancellation button is clicked or the dialog is closed.

        _Use case_: Handles the action to be taken when the user decides not to proceed with the delete operation (e.g., closing the dialog, reverting state).

    - `onOkay: () => void`

        Callback function triggered when the confirmation button is clicked.

        _Use case_: Initiates the delete operation or any related action upon user confirmation.

    **Usage**

    ```js
    <DeleteDialog
        open={isDialogOpen}
        loading={isDeleting}
        onCancel={() => setDialogOpen(false)}
        onOkay={handleDelete}
    />
    ```

2. WithHeaderDialog

    The `WithHeaderDialog` component is designed to provide a modal dialog with a customizable header and content area. A best usecase for this component is form dialogs or other feedback dialogs.

    **Custom Props**

    - `dialogTitle: string`

        The title displayed in the dialog header.

        _Use case_: Sets the primary heading of the dialog to indicate the purpose or action of the dialog.

    - `children: React.ReactNode`

        The content to be rendered inside the dialog.

        _Use case_: Allows for dynamic content to be passed into the dialog, which will be displayed in the body of the dialog.

    - `onCancel: () => void`

        Callback function triggered when the close button is clicked or the dialog is closed.

        _Use case_: Handles the action to be taken when the user dismisses the dialog (e.g., closing the dialog, reverting state).

## Snackbar

The `Snackbar` and `SnackbarContainer` components provide a reusable toast notification system to display feedback messages to users. These notifications can display messages of different severities (e.g., success, error, warning, info) and can be triggered globally using the `snackbarToast` object.

1. SnackbarContainer

    A container component that listens for global toast events and renders the `Snackbar` dynamically. It should be placed once in the app layout (e.g., at the root level) to ensure it captures all events.

2. Snackbar

    A single notification component that displays a message with a specific severity and auto-hide behavior.

    **Custom Props**

    - `message: string`

        The message to display in the notification.

    - `severity: 'error' | 'warning' | 'success' | 'info'`

        Defines the type of notification, affecting the color and icon of the snackbar.

    - `open: boolean`

        Controls the visibility of the snackbar.

    - `onClose: () => void`

        Callback function triggered when the snackbar is closed.

    - `position?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' }`

        The position of the snackbar on the screen. Defaults to { vertical: 'top', horizontal: 'center' }.

    - `autoHideDuration?: number`

        Duration in milliseconds before the snackbar automatically hides. Defaults to 6000.

    **Usage**

    ```javascript
    snackbarToast.success('Data saved successfully!');
    ```

## Popovers

The customized `popover` components will help provide a way to display UI popups for your application.

1. DefaultMenu.

    The `DefaultMenu` component is a simple wrapper around the MUI `Menu` component that handles the opening and closing of the menu based on the `anchorEl` prop. It renders its children inside the menu and provides a clean way to manage the anchor position and appearance.

    **Custom props**

    - `anchorEl: null | HTMLElement`

        The DOM element that the menu will be anchored to. If null, the menu is closed.

    - `setAnchorEl: (anchorEl: null | HTMLElement) => void`

        A function that sets the anchor element (null to close the menu).

    - `children: React.ReactNode`

        The menu items or content that should be rendered inside the Menu.

2. DefaultMenu

    This component will be used in the DashboardLayout to display user account. It is built on top of MUI `AccountPreview` component.

## Tabs

1. ChipsTabs

    The `ChipTabs` component renders a series of `Chip` elements that act as tabs. The component allows customization of the tab labels, colors, styles, and click behavior. It is designed to handle responsive behavior, showing scrollable tabs on mobile devices. This component is useful when you want to display a set of options or categories that users can select, with each tab represented by a clickable `Chip`.

    **Props**

    - `tabsList (string[])`

        An array of strings that define the labels for the tabs.

        _example_

        ```javascript
        tabsList={['Tab 1', 'Tab 2', 'Tab 3']}
        ```

    - `onClick ((tab: string) => void)`

        A callback function that gets triggered when a tab is clicked, passing the tab label as an argument.

        _example_

        ```javascript
        onClick={(tab) => console.log(tab)}
        ```

    - `getChipColor ((tab: string) => 'primary' | 'secondary' | 'error' | 'success' | 'default' | undefined):`

        An optional function that returns the color for each Chip based on the tab name. Defaults to 'default'.

        _example_

        ```javascript
        getChipColor={(tab) => tab === 'Tab 1' ? 'primary' : 'secondary'}
        ```

    - `getChipVariant ((tab: string) => 'filled' | 'outlined' | undefined)`

        An optional function that determines the variant ('filled' or 'outlined') for each Chip. Defaults to 'outlined'.

        _example_

        ```javascript
        getChipVariant={(tab) => tab === 'Tab 1' ? 'filled' : 'outlined'}
        ```

    - `getChipStyles ((tab: string) => SxProps | undefined)`

        An optional function that allows custom styles for each Chip based on the tab name. Uses SxProps for flexible styling.

        _example_

        ```javascript
        getChipStyles={(tab) => tab === 'Tab 1' ? { backgroundColor: 'lightblue' } : {}}
        ```

# Constants

The `constants` folder is where all the static values, configurations, and reusable constant data are defined and stored.

1. `branding file`

    This file stores branding options for the app, based on [mui toolpad core branding options](https://mui.com/toolpad/core/api/app-provider/#app-provider-prop-branding).

2. `routes file`

    This file stores navigation definition for the app, based on [mui toolpad core navigation options](https://mui.com/toolpad/core/api/app-provider/#app-provider-prop-navigation)

3. `theme file`

    This file contains theme configuration for the application. The theme is then passed to the [MUI Toolpad code AppProvider](https://mui.com/toolpad/core/api/app-provider/#app-provider-prop-theme)

# context

The `context` folder is responsible for defining and managing global state, settings, and data that need to be shared across different components in your application. This folder uses React Context API to provide and consume shared values throughout the component tree without needing to pass props manually at each level.

1. `QueryClientProviderWrapper file`

    This context is a wrapper for providing the React Query Client globally across the application. It allows components to use React Query to fetch, cache, and synchronize data across different parts of the application.

2. `CountriesContext`

    A context object that holds the country-related data, including:

    - The list of available countries (`countries`).

    - The currently selected country code (`countryCode`).

    - A function to update the country code (`setCountryCode`).

    This context allows any component in the component tree to access country-related information by consuming this context.
