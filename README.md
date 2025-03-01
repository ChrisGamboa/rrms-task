# rrms-task
Take home task for RRMS interview. Designed to be responsive and mobile friendly.

## Overview
Project created with **NextJS**. Hosted and deployed on **Vercel** for ease of use.

I leveraged **React function components**, **Tailwind CSS**, and the **Fetch API**.


### Features
It's a home page with two buttons: **Products** and **Carts**

#### Products
- Fetches products from public API and displays in a table
- Each row displays basic product info, with the ability to **click into each row to display additional details in a modal**.
- When the table is displayed, at the bottom, an **Add Product** button to open a modal with a form to add a product (no backend, so does not make POST call). Has a submit and close button.
- Basic form validation (required fields).
- Mocked happy path user experience for successful form submission.
- Can close table by clicking **Products** button again or **Close** at the bottom of table.

#### Carts
- Fetches cart data, and user data by making async calls to public API and displays in table.
- Each row displays basic cart data, with ability to **click into each row to display additional details in a modal**.
- Can close table by clicking **Carts** button again or **Close** at the bottom of table.
- Error handling for orphaned carts, where user data does not exist.

### Data Models
- I created classes/data models for reusability and standardization.

### To run locally
- Install Node version 20 or above. I used `v20.18.0`, I recommend [nvm](https://github.com/nvm-sh/nvm) for managing node versions)
- Run `npm install` to install dependencies
- Run `npm run dev` to run locally (with **turbopack** enabled for hot reloading).
- Access the application launched by default [locally](localhost:3000) (directs to `localhost:3000`).


### Future Improvements
- Accessibility!
- Unit tests
- Integration tests
- E2E tests
- Refactor components into separate files
- Modularize repeated styles with CSS variables
- Change ISO date to display in human readable form
- Suggestions you might make!