## `SCR` folder structure

```
src/
├── api/
│   ├── apiClient.ts
│   ├── index.ts
│   ├── type.ts
│   ├── urls.ts
│   └── ...
│
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   └── ...
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
│
├── components/
│   ├── DataGrids/
│   ├── Inputs/
│   │   ├── AutocompleteField.tsx
│   │   ├── CheckboxInputField.tsx
│   │   ├── FileUpload.tsx
│   │   ├── GroupedCheckboxInputField.tsx
│   │   ├── OTPField.tsx
│   │   ├── PaymentCardInput.tsx
│   │   ├── PhoneNumberInput.tsx
│   │   ├── SelectFieldInput.tsx
│   │   ├── TextFieldInput.tsx
│   │   ├── index.ts
│   │   └── ...
│   ├── Popover/
│   │   ├── DefaultMenu.tsx
│   │   ├── ProfileMenu.tsx
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── ...
│   ├── Snackbar/
│   └── ...
│
├── constants/
│   ├── branding.tsx
│   ├── index.ts
│   ├── routes.tsx
│   ├── theme.tsx
│   └── ...
│
├── context/
│   ├── CountriesProvider.tsx
│   ├── QueryClientProviderWrapper.tsx
│   ├── index.ts
│   ├── type.ts
│   └── ...
│
├── hooks/
│   ├── useFetchCountries.ts
│   ├── useResponsiveness.tsx
│   ├── index.ts
│   ├── type.ts
│   └── ...
│
├── layouts/
│   ├── AuthLayout.tsx
│   ├── DashboardLayout.tsx
│   ├── index.ts
│   └── ...
│
└── utils/
    ├── index.ts
    ├── type.ts
    ├── middleware.ts
    └── ...
```
### Structure walkthrough


1. `api/`
This folder contains files related to API communication and configuration. Here, you define the API client setup, handle base URLs, and manage request configurations. Any utilities or constants related to API interaction are also placed here.

2. `app/`
The main application directory, containing individual page components and routing logic. Each subfolder here represents a module or a feature of the application, like dashboard, orders, settings, or authentication. This folder structures the overall flow of the application and organizes components based on the routes they serve.

3. `components/`
This directory houses all reusable UI components. Components are organized by type or functionality (e.g., Inputs, DataGrids, Popovers) to ensure that each component is accessible and reusable throughout the app. By centralizing these components, we promote code reusability and reduce redundancy.

4. `constants/`
This folder stores application-wide constants and configurations. Here, you can define routes, branding details, themes, or any values that remain constant across the application, making it easy to adjust configurations from a single location.

5. `context/`
Holds global state management providers using React context. This folder is used to manage global states (such as user authentication or theme settings) that need to be accessible across multiple components or routes.

6. `hooks/`
Contains custom React hooks that encapsulate reusable logic. This folder is ideal for organizing code that handles specific behaviors, like fetching data or managing responsive design, making the main components cleaner and more focused on their primary responsibilities.

7. `layouts/`
This directory includes layout components used to wrap pages, providing a consistent structure (e.g., navigation) across different sections of the application. Common layouts include the authentication layout for login/signup pages and the dashboard layout for the main app views.

8. `utils/`
Stores utility functions, helpers, and middleware that can be used across the application. This folder is intended for any generic logic or helper functions, keeping business logic organized and separated from UI components.