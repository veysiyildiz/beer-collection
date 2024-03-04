# Beer Collection App Documentation

## Demo
You can view a live demo of the Beer Collection App at [Demo Link](https://beer-collection-sigma.vercel.app/) But unfortunately the adding functionalities like add beer, add comment, and rate a beer is not working on vercel. It's because of all the files are read-only and the project uses the dB.json file as database. You can check that functionalities on your local development or production environment. 

## Introduction
This is the Beer Collection App. It's built with NextJS ❤️, server-side rendering first . You can add beers to your collection. You can also give beers a rating and leave comments.

## Data Source
The information about the beers is stored in a `db.json` file in the main folder of the project. The reason I have used a JSON file instead of utilizing a pre-existing API is to showcase my backend development skills and also show how I use NextJS API Routes and server actions. The second reason is to be able add comments and ratings to the beers and also showcase my ability to manipulate data and simulate a database environment. I have created db.json from `https://api.punkapi.com/v2/beers` endpoint deleted lots of info there and added a comments and a ratings array also to emulate a flat database structure.

## Loading and Filtering States
I have used `react-loading-skeleton` to show a loading state as a placeholder until the data is ready, and added 500ms delay to APIs to see the loading state. I also added filter states and search term to searchParams as a better practice for user experience. A user can share a search/filter result page url or bookmark it to see the same results in somewhere else.

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
- `.env.local`
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
        - `_error.tsx`
        - `actions`
            - `getBeerDetail.ts`
            - `getBeers.ts`
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
            - `Spinner.tsx`
            - `Text.tsx`
            - `Textarea.tsx`
            - `index.tsx`
        - `molecules`
            - `BeerCard.tsx`
            - `BeerCardSkeleton.tsx`
            - `Comment.tsx`
            - `MenuItem.tsx`
            - `Properties.tsx`
            - `Search.tsx`
            - `index.tsx`
        - `organisms`
            - `BeerDetail.tsx`
            - `BeerForm.tsx`
            - `BeerList.tsx`
            - `BeerListLoading.tsx`
            - `BottomBar.tsx`
            - `CommentForm.tsx`
            - `CommentsWrapper.tsx`
            - `Filters.tsx`
            - `LeftSideBar.tsx`
            - `TopBar.tsx`
            - `index.tsx`
    - `interfaces`
        - `index.ts`
    - `lib`
        - `constants`
            - `index.ts`

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
