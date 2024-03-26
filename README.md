# Beer Collection App Documentation

## Demo
You can view a live demo of the Beer Collection App at [Demo Link](https://beer-collection-sigma.vercel.app/) But unfortunately the adding functionalities like add beer, add comment, and rate a beer is not working on vercel. It's because of all the files are read-only and the project uses the dB.json file as database. You can check that functionalities on your local development or production environment. 

## Introduction
This is the Beer Collection App. It's built with NextJS ❤️, server-side rendering first . You can add beers to your collection. You can also give beers a rating and leave comments.

## Data Source
The beer details are kept in a file called `db.json` in the project's main folder. Instead of using an existing API, I chose to use this file to show how I handle backend tasks and use Next.js features like API Routes. I also added the ability to leave comments and ratings for the beers, to demonstrate how I work with data and create a database-like setup. I filled the db.json file by taking some information from the `https://api.punkapi.com/v2/beers` website and modifying it. I added delays to make it look like the app is loading, and I used both Suspense and `loading.tsx` to demonstrate different loading methods, even though it's not the best practice. Similarly, I included both API routes and actions to show different approaches, but in a real project, it might be better to stick with just one method for consistency.

## Loading and Filtering States
I have used `react-loading-skeleton` to show a loading state as a placeholder until the data is ready, and added 500ms delay to APIs to see the loading state. I also added filter states and search term to searchParams and validation via `zod` as a better practice for user experience. A user can share a search/filter result page url or bookmark it to see the same results in somewhere else.

## Forms
The forms in the app using `react-hook-form` and `zod`. It's awesome for managing the form data and validation.

## Components
I have created the components following atomic design principles which is great for reusability and maintainability also used tailwind for styling. All components were created by me with love. ☺️

## Documents for usage
I used the following documents during coding:

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/)
- [React Hook Form](https://react-hook-form.com/get-started)
- [Zod](https://zod.dev/)
- [react-loading-skeleton on npm](https://www.npmjs.com/package/react-loading-skeleton)

## App Structure
- `db.json`
- `public`
    - `default_beer.png`
    - `favicon.ico`
    - `impact-logo.png`
    - `icon512_maskable.png`
    - `icon512_rounded.png`
    - `manifest.json`
- `src`
    - `app`
        - `actions`
            - `addBeer.ts`
            - `addComment.ts`
            - `getAllBeers.ts`
            - `getBeerById.ts`
            - `getBeers.ts`
            - `getCommentsByBeerId.ts`
            - `index.ts`
            - `rateBeer.ts`
        - `add-beer`
            - `page.tsx`
        - `api`
            - `beers`
                - `[[id]]`
                    - `route.ts`
                - `add`
                    - `route.ts`
                - `route.ts`
            - `comments`
                - `[[id]]`
                    - `route.ts`
            - `rating`
                - `[[id]]`
                    - `route.ts`
        - `beer`
            - `[[id]]`
                - `loading.tsx`
                - `page.tsx`
        - `favicon.ico`
        - `globals.css`
        - `layout.tsx`
        - `page.tsx`
    - `components`
        - `atoms`
            - `Button.tsx`
            - `ErrorMessage.tsx`
            - `Input.tsx`
            - `Label.tsx`
            - `Logo.tsx`
            - `Rating.tsx`
            - `Select.tsx`
            - `SortButtons.tsx`
            - `Text.tsx`
            - `Textarea.tsx`
            - `index.tsx`
        - `molecules`
            - `BeerCard.tsx`
            - `BeerCardSkeleton.tsx`
            - `Comment.tsx`
            - `CommentSkeleton.tsx`
            - `MenuItem.tsx`
            - `Properties.tsx`
            - `Search.tsx`
            - `SubmitButton.tsx`
            - `index.tsx`
        - `organisms`
            - `BeerDetail.tsx`
            - `BeerDetailSkeleton.tsx`
            - `BeerForm.tsx`
            - `BeerList.tsx`
            - `BeerListLoading.tsx`
            - `BottomBar.tsx`
            - `CommentForm.tsx`
            - `CommentsWrapper.tsx`
            - `Filters.tsx`
            - `FormField.tsx`
            - `LeftSideBar.tsx`
            - `LoadMoreButton.tsx`
            - `TopBar.tsx`
            - `index.tsx`
    - `types`
        - `index.ts`
    - `lib`
        - `hooks`
            - `useSearchAndSelect.ts`
        - `constants.ts`
        - `utils.ts`

## Installation
To install and run the Beer Collection App, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/veysiyildiz/beer-collection.git
    ```

2. Install the dependencies:
    ```bash
    cd beer-collection
    yarn
    ```

3. Start the application.
    ```bash
    yarn dev
    ```

## Production Build
Follow these steps to install and run the Beer Collection App in production mode:

1. Clone the repository:
    ```bash
    git clone https://github.com/veysiyildiz/beer-collection.git
    ```

2. Install the dependencies:
    ```bash
    cd beer-collection
    yarn
    ```

3. Build the application.
    ```bash
    yarn build
    ```

4. Start the application.
    ```bash
    yarn start
    ```

## Usage
Once the application is running, you can access it in your web browser at `http://localhost:3000`.
