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
