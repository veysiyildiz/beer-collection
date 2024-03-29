# Beer Collection App Documentation

## Demo
You can view a live demo of the Beer Collection App at [Demo Link](https://beer-collection-sigma.vercel.app/).

## Introduction
This is the Beer Collection App. It's built with NextJS ❤️, server-side rendering first. You can add beers to your collection. You can also give beers a rating and leave comments.

## Data Source
The beer details are now stored in a MongoDB database. I chose to use MongoDB to demonstrate fullstack Next.js features. I also added the ability to leave comments and ratings for the beers, to demonstrate how I work with data in a database setup. The initial data for the database was taken from the `https://api.punkapi.com/v2/beers` website and modified to fit the application's needs. I added delays to simulate real-world loading times, and I used both `Suspense` and `loading.tsx` to demonstrate different loading methods, even though it's not always the best practice. Similarly, I included both API routes and server actions to show different approaches, but in a real-world project, it might be better to consider project needs and/or stick with just one method for consistency.

It's important to note that `disabling JavaScript` will prevent the application from transitioning out of the loading state, as `Suspense` relies on JavaScript to detect when the condition is met and render the actual content. To observe how the application behaves with JavaScript disabled on your local, you can comment out the Suspense component in the homepage and delete the loading.tsx file in the beer folder. Or see this deployment link [Disable JavaScript Link](https://beer-collection-fn92-9flckoc3j-veysiyildizs-projects.vercel.app/).

## Loading and Filtering States
I have used `react-loading-skeleton` to show a loading state as a placeholder until the data is ready, and added delay to APIs to see the loading state. I also added filter states and search term to searchParams and validation via `zod` as a better practice for user experience. A user can share a search/filter result page url or bookmark it to see the same results in somewhere else.

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
- [mongoose](https://mongoosejs.com/)

## App Structure
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
            - `useSearch.ts`
        - `models`
            - `beer.model.ts`
            - `comment.model.ts`
            - `rating.model.ts`
        - `validations`
            - `beer.ts`
            - `comment.ts`
            - `index.ts`
            - `rating.ts`
            - `searchParams.ts`
        - `constants.ts`
        - `mongoose.ts`
        - `utils.ts`

## Installation
To install and run the Beer Collection App you will need `.env.local` file I will send it via e-mail, please follow these steps and after cloning project add .env file into project:

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
