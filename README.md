# Mini E-Commerce Application

This is a React frontend assignment demonstrating component design, state management, and clean code practices without the use of external UI libraries.

## Project Overview

The application fetches product data from a mock API and allows users to browse, search, filter, and add items to a persistent shopping cart. It is built to be responsive and handles edge cases like stock limits and empty states.

## Tech Stack

* **Framework:** React (Create React App)
* **Styling:** Pure CSS (No frameworks like Bootstrap or Tailwind)
* **State Management:** React Hooks (useState, useEffect, useReducer pattern via callbacks)
* **Persistence:** LocalStorage

## Setup and Installation

1.  Clone the repository or extract the project folder.
2.  Navigate to the project directory:
    ```bash
    cd Shop-Assesment
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the application:
    ```bash
    npm start
    ```
    The app will run at http://localhost:3000.

## Key Features

* **Product Listing:** Fetches a limited set of 20 products.
* **Filtering System:** * Search by product title (case-insensitive).
    * Filter by category.
    * Sort by price (Low-to-High and High-to-Low).
    * Filters can be combined.
* **Shopping Cart:**
    * Add/Remove items.
    * Quantity adjustments with stock limit checks (cannot add more than available inventory).
    * Cart state persists on page reload via LocalStorage.

## Engineering Decisions & Trade-offs

During development, I made a few specific architectural choices to keep the codebase maintainable within the scope of the assignment:

**1. Component Structure**
I separated the UI into `ProductCard` and `CartItem` components and placed them in a `src/components` directory. This keeps the main `App.js` focused purely on data fetching and state orchestration, rather than rendering logic.

**2. State Management**
For an application of this size, Redux or the Context API would be over-engineering. I utilized straightforward prop drilling and state lifting. The `cart` state is managed in the parent `App` component to ensure truth across the product list (for stock checks) and the cart sidebar.

**3. Performance Optimizations**
* **useMemo:** Used for the filtering logic. This ensures the product list isn't re-calculated on every render, only when the search term, category, or sort order changes.
* **useCallback:** Wrapped the `addToCart` function to maintain referential equality and prevent unnecessary re-renders of child components.

**4. CSS Approach**
Per the requirements, I did not use any UI libraries. I used standard CSS with a responsive grid layout (`grid-template-columns`) to ensure the app looks good on both mobile and desktop without complex media queries.

## Future Improvements

If this were a production app, I would add:
* Unit tests for the filtering logic (currently only basic rendering tests are included).
* Pagination for the product feed if the dataset grows larger than 20 items.
* A "Toast" notification system to give better user feedback when an item is added to the cart.


<img width="1469" height="800" alt="Screenshot 2026-01-04 at 13 40 56" src="https://github.com/user-attachments/assets/9615a143-52c5-4df8-80ab-f1f6f1c9b58a" />




