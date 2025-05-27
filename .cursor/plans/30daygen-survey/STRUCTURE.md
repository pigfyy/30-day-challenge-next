# 30DayGen Survey Structure

## Overview

The 30DayGen survey is a comprehensive 4-page survey system designed to collect user feedback about the 30day.me app and its AI-powered challenge search functionality. The survey is built with a centralized React Hook Form architecture where all form state is managed in the main Survey component.

## File Structure

```
src/app/survey/30daygen/
├── page.tsx                           # Main survey page component with centralized form state
├── types.ts                           # TypeScript interfaces and Zod schemas
└── (components)/                      # Survey-specific components
    ├── ChallengeSearchBasic.tsx      # Simplified search component for survey
    ├── hooks/                        # Custom React hooks
    │   └── useFormPersistence.ts     # Form state persistence in localStorage
    ├── ui/                           # Reusable UI components
    │   ├── custom-radio-item.tsx     # Custom radio button component with multiple variants
    │   └── custom-checkbox-item.tsx  # Custom checkbox component with card-style design
    └── pages/                        # Individual page components (pure presentation)
        ├── Page1.tsx                 # Email collection and survey introduction
        ├── Page2.tsx                 # AI search system demo (no form fields)
        ├── Page3.tsx                 # GenAI search system questions (presentation only)
        └── Page4.tsx                 # General app feedback and usage intentions
```

## Component Architecture

### Main Components

#### `Survey30DayGenPage` (`page.tsx`)

- **Purpose**: Main page component for data fetching and survey initialization
- **Current State**: Simple wrapper that renders the Survey component

#### `Survey` (`page.tsx`)

- **Purpose**: Core survey orchestration and **centralized form state management**
- **Responsibilities**:
  - Page state management (`currentPage`)
  - **Centralized React Hook Form state** (`useForm` with `SurveyFormSchema`)
  - Form validation and error handling for all pages
  - Page rendering logic via `renderCurrentPage()`
  - Navigation component integration
  - Form submission logic with `handleSubmit`
- **Form Management**:
  - Single `useForm` instance for entire 4-page survey
  - Zod schema validation with `SurveyFormSchema`
  - Real-time validation with `mode: 'onChange'`
  - Centralized error state management
  - Complete form submission handling

#### `Navigation` (`page.tsx`)

- **Purpose**: Standardized navigation controls for all survey pages
- **Responsibilities**:
  - Navigation between pages (`handleNext`, `handleBack`)
  - Conditional button rendering based on current page
  - Next/Submit button validation (`isNextButtonDisabled`)
  - Form submission trigger
- **Props**: `currentPage`, `setCurrentPage`, `isNextButtonDisabled`, `onSubmit`

### Page Components

#### `Page1` (`(components)/pages/Page1.tsx`)

- **Purpose**: Email collection and survey introduction
- **Architecture**: **Form-based component** - receives `control` and `errors` from parent
- **Content**:
  - Welcome header
  - App introduction paragraph
  - Email input field (required)
- **Form Integration**:
  - Uses `Controller` component with parent's `control`
  - Field name: `page1.email`
  - Email validation with Zod schema
  - Error display from parent's error state

#### `Page2` (`(components)/pages/Page2.tsx`)

- **Purpose**: AI search system demonstration
- **Architecture**: Pure presentation component (no form state)
- **Content**:
  - Demo instructions
  - Embedded ChallengeSearchBasic component
- **Navigation**: No validation required (demo only)

#### `Page3` (`(components)/pages/Page3.tsx`)

- **Purpose**: Questions about GenAI search system
- **Architecture**: **Pure presentation component** - receives `control` and `errors` from parent
- **Content**:
  - 6 survey questions about AI search experience
- **Form Integration**:
  - Uses `Controller` components with parent's `control`
  - Field names use nested paths (`page3.q1`, `page3.q2`, etc.)
  - Error display from parent's error state
  - No local form state or validation logic
- **Question Types**:
  - Q1: Single choice radio buttons (prompt count)
  - Q2-Q5: Likert scale (1-5) in table format
  - Q6: Single choice radio buttons (challenge preference)

#### `Page4` (`(components)/pages/Page4.tsx`)

- **Purpose**: General app feedback and usage intentions
- **Architecture**: **Pure presentation component** - receives `control` and `errors` from parent
- **Content**:
  - 6 comprehensive feedback questions about the app
- **Form Integration**:
  - Uses `Controller` components with parent's `control`
  - Field names use nested paths (`page4.seeYourselfUsing`, `page4.dailyTracking`, etc.)
  - Error display from parent's error state
  - No local form state or validation logic
- **Question Types**:
  - Q1: Yes/No with conditional text area
  - Q2: Multiple choice checkboxes (daily tracking)
  - Q3: Multiple choice checkboxes with conditional text field (engagement features)
  - Q4: Single choice radio buttons (habit change)
  - Q5: Single choice radio buttons (app store engagement)
  - Q6: Optional text area (additional comments)

### Utility Components

#### `ChallengeSearchBasic` (`(components)/ChallengeSearchBasic.tsx`)

- **Purpose**: Survey-specific version of the challenge search functionality
- **Functionality**: Pure search and display (no challenge creation/editing)
- **Props**: `leftCardHeight`

### UI Components

#### `CustomRadioItem` (`(components)/ui/custom-radio-item.tsx`)

- **Purpose**: Reusable radio button component with multiple display variants
- **Architecture**: Pure presentation component with flexible styling
- **Variants**:
  - `card`: Card-style radio buttons with custom visual indicator and full-width clickable area
  - `simple`: Centered radio buttons with labels below (for Likert scales)
  - `inline`: Standard radio buttons with labels to the right (for basic yes/no questions)
- **Props**:
  - `value`: Radio button value
  - `id`: Unique identifier for the radio button
  - `label`: Display text for the radio button
  - `isSelected`: Boolean indicating if this option is selected
  - `variant`: Display variant ("card" | "simple" | "inline")
  - `className`: Optional additional CSS classes
  - `labelClassName`: Optional CSS classes for the label
- **Usage**:
  - Page3: Uses "card" variant for Q1 and Q6, "simple" variant for Q2-Q5 Likert scales
  - Page4: Uses "card" variant for all radio button groups
- **Benefits**:
  - Consistent styling across all radio button implementations
  - Flexible variants for different use cases
  - Centralized component for easier maintenance
  - Proper accessibility with label associations

#### `CustomCheckboxItem` (`(components)/ui/custom-checkbox-item.tsx`)

- **Purpose**: Reusable checkbox component with card-style design
- **Architecture**: Pure presentation component with flexible styling
- **Variants**:
  - `card`: Card-style checkbox with custom visual indicator and full-width clickable area
- **Props**:
  - `value`: Checkbox value
  - `id`: Unique identifier for the checkbox
  - `label`: Display text for the checkbox
  - `isSelected`: Boolean indicating if this option is selected
  - `variant`: Display variant ("card")
  - `className`: Optional additional CSS classes
  - `labelClassName`: Optional CSS classes for the label
- **Usage**:
  - Page4: Uses "card" variant for Q2 and Q3 checkboxes
- **Benefits**:
  - Consistent styling across all checkbox implementations
  - Flexible variants for different use cases
  - Centralized component for easier maintenance
  - Proper accessibility with label associations

### Custom Hooks

#### `useFormPersistence` (`(components)/hooks/useFormPersistence.ts`)

- **Purpose**: Automatically persist form state and current page to localStorage
- **Architecture**: Custom React hook with automatic save/load functionality
- **Features**:
  - **Auto-save**: Automatically saves form data to localStorage on every change
  - **Auto-load**: Restores form data and current page on component mount
  - **Error handling**: Gracefully handles localStorage errors and corrupted data
  - **Data cleanup**: Provides function to clear saved data on successful submission
- **Storage Keys**:
  - `30daygen-survey-form-data`: Stores complete form data as JSON
  - `30daygen-survey-current-page`: Stores current page number
- **Parameters**:
  - `form`: React Hook Form instance
  - `currentPage`: Current page number
  - `setCurrentPage`: Function to update current page
- **Returns**:
  - `clearSavedData`: Function to clear localStorage data after successful submission
- **Benefits**:
  - **User Experience**: Prevents data loss on accidental page refresh
  - **Seamless Recovery**: Users can continue exactly where they left off
  - **Automatic**: No manual save/load actions required
  - **Robust**: Handles edge cases and storage errors gracefully

## Type System

### `types.ts`

- **Page1Schema**: Zod schema for Page 1 email validation (required email field)
- **Page3Schema**: Zod schema for Page 3 form validation (6 required string fields)
- **Page4Schema**: Zod schema for Page 4 form validation (mixed field types with optional fields)
- **SurveyFormSchema**: Complete survey schema (contains `page1: Page1Schema`, `page3: Page3Schema`, `page4: Page4Schema`)
- **SurveyFormData**: TypeScript type inferred from complete survey schema
- **Page1Props**: Props interface for Page1 component (`control` and `errors`)
- **Page3Props**: Props interface for Page3 component (`control` and `errors`)
- **Page4Props**: Props interface for Page4 component (`control` and `errors`)

## Survey Flow

### Page 1: Email Collection and Introduction

- **Content**: Welcome message, app introduction, email input field
- **Requirements**: Valid email address required to proceed
- **Form Validation**: Real-time email validation with error messages
- **Navigation**: Back button (disabled), Next button (disabled until valid email)
- **Form State**: Managed by parent Survey component
- **Purpose**: Collect user email and introduce the survey

### Page 2: AI Search System Demo

- **Content**: Demo instructions and functional search UI
- **User Action**: Explore the search functionality (recommended 3+ searches)
- **Navigation**: Back and Next buttons (both always enabled)
- **Form State**: No form fields
- **Purpose**: Familiarize users with the AI search system before questions

### Page 3: Questions about GenAI Search System

- **Content**: 6 questions about search experience and satisfaction
- **Requirements**: All 6 questions must be answered to proceed
- **Form Validation**: Real-time validation with error messages
- **Navigation**: Back and Next buttons (Next disabled until all fields valid)
- **Form State**: Managed by parent Survey component
- **Purpose**: Gather feedback on AI search functionality

### Page 4: Questions about the App

- **Content**: 6 comprehensive questions about overall app experience
- **Requirements**: 5 required fields + 1 optional (additional comments)
- **Form Validation**: Real-time validation with error messages
- **Navigation**: Back and Submit buttons (Submit disabled until required fields valid)
- **Form State**: Managed by parent Survey component
- **Purpose**: Collect general app feedback and usage intentions

## Navigation System

### Navigation Rules

- Page 1: Back button (disabled) and Next button (disabled until valid email)
- Page 2: Back and Next buttons (both always enabled - demo only)
- Page 3: Back and Next buttons (Next disabled until all page3 fields valid)
- Page 4: Back and Submit buttons (Submit disabled until required page4 fields valid)

### Validation Integration

- **Centralized validation**: All validation handled in Survey component
- **Button state**: Next/Submit button disabled based on form state and current page
- **Error display**: Field-level error messages passed to page components
- **Form submission**: Complete form validation before submission

### Layout

- **Position**: Below page content
- **Styling**: `justify-between` layout with consistent button styling
- **Container**: Uses same width constraints as page content
- **Section Indicator**: Shows "Section X/4" between Back and Next buttons

## Form Management Architecture

### Centralized React Hook Form

- **Single Form Instance**: One `useForm` in Survey component for entire 4-page survey
- **Schema Validation**: `SurveyFormSchema` with nested page schemas
- **Real-time Updates**: `watch()` for immediate data access
- **Validation Status**: Centralized error handling and validation logic
- **Form Submission**: `handleSubmit` with complete data validation
- **Persistence**: Automatic localStorage persistence with `useFormPersistence` hook

### Data Flow

1. **Survey Component**: Manages all form state with React Hook Form
2. **Page Components**: Receive `control` and `errors` as props (except Page2)
3. **Controller Integration**: Page components use Controller with parent's control
4. **Navigation**: Validation status controls button availability directly
5. **Submission**: Form data validated and submitted from Survey component

### State Management

- **Form State**: Single React Hook Form instance in Survey component
- **Page State**: Simple `currentPage` state for navigation
- **No Duplication**: No local form state in page components
- **Data Persistence**: Form data automatically preserved across navigation and page reloads
- **Submission State**: Handled through React Hook Form's handleSubmit
- **localStorage Integration**: Automatic save/restore functionality with error handling

### Field Naming Convention

- **Nested Structure**: `page1.email`, `page3.q1`, `page4.seeYourselfUsing`, etc.
- **Type Safety**: Full TypeScript support with nested schema validation

## Benefits of Centralized Architecture

### Performance

- **No State Duplication**: Single source of truth for all form data
- **Efficient Re-renders**: Only necessary components re-render on form changes
- **Optimized Validation**: Validation occurs only when needed

### Developer Experience

- **Simplified Data Flow**: Clear, unidirectional data flow from parent to children
- **Easy Testing**: Form logic centralized in one component
- **Type Safety**: Complete TypeScript coverage with schema validation
- **Maintainability**: Changes to form logic only require updates in one place

### User Experience

- **Consistent Validation**: Uniform validation behavior across all pages
- **Data Persistence**: Form data preserved when navigating between pages
- **Real-time Feedback**: Immediate validation feedback on form changes
- **Smart Navigation**: Buttons intelligently disabled based on form state

## Design Patterns

### Component Organization

- **Page Components**: Located in `(components)/pages/` - pure presentation
- **Utility Components**: Located in `(components)/`
- **Type Definitions**: Centralized in `types.ts`
- **Form Logic**: Centralized in Survey component

### Form Patterns

- **Centralized State**: Single source of truth for all form data
- **Controller Pattern**: All form inputs use Controller with parent control
- **Schema-First**: Zod schemas define validation rules
- **Nested Validation**: Page-specific schemas composed into survey schema
- **Pure Components**: Page components have no side effects or local state
- **Mixed Input Types**: Radio buttons, checkboxes, text areas, Likert scales

### Styling Approach

- **Background**: Consistent `bg-gray-50` across all pages
- **Container**: `max-w-4xl mx-auto px-4` for content width
- **Cards**: Used for content sections with proper spacing
- **Tables**: Responsive design for Likert scale questions
- **Form Elements**: Consistent spacing and error styling

## Dependencies

### UI Components

- `@/components/ui/button`
- `@/components/ui/card`
- `@/components/ui/checkbox`
- `@/components/ui/input`
- `@/components/ui/label`
- `@/components/ui/radio-group`
- `@/components/ui/scroll-area`
- `@/components/ui/skeleton`
- `@/components/ui/textarea`

### Form Management

- `react-hook-form` (centralized form state management)
- `@hookform/resolvers` (Zod integration)
- `zod` (schema validation)

### External Libraries

- `react-responsive` (for mobile detection)
- `trpc` (for API calls)

### Internal Dependencies

- `@/lib/db/challengeIdeas` (for search functionality)
- `@/components/ui/expandable-text` (for challenge descriptions)

## Notes

### Recent Changes

- **Added Page4**: Complete implementation with diverse question types
- **Enhanced Form Submission**: Added proper handleSubmit integration
- **Extended Validation**: Added Page 4 validation logic
- **Mixed Input Types**: Implemented checkboxes, text areas, NPS scale
- **Complete Survey Flow**: Full 4-page survey with submission

### Design Decisions

- **Single Form Instance**: Chosen for simplicity and data consistency
- **Nested Field Names**: Enables scalable multi-page form structure
- **Pure Components**: Page components are easier to test and maintain
- **Centralized Validation**: All validation logic in one place
- **Type Safety**: Full TypeScript support with nested schema inference
- **Mixed Question Types**: Comprehensive feedback collection with varied input methods

### Architecture Benefits

- **No State Duplication**: Single source of truth for all form data
- **Simplified Data Flow**: No callbacks or data synchronization needed
- **Better Performance**: No unnecessary re-renders from local state
- **Easier Testing**: Pure components are easier to unit test
- **Maintainable**: Clear separation of concerns between form logic and presentation
- **Scalable**: Easy to add new pages or questions without changing existing architecture
- **Complete Validation**: Comprehensive form validation with user-friendly error messages
- **Professional UX**: Smooth navigation with proper button states and feedback
