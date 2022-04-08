## frontend-next.js-task

The main goal is to have a **Next.js** application, which is able to **authenticate** a user, and perform CRUD operations using your previously developed backend provider.

## Task 1 - Login page

Create a page which contains a form that the users can use to log in.

The login form should be a separate component and have two fields:

- email - should be a valid email format

- password - should not be visible by default (for extra finesse, add a button to toggle password visibility)

Any occurring errors regarding the inputs should be displayed below the respected fields.

If the credentials entered are invalid (wrong username / password), the response from the server should be displayed in the form of a **toast** or any other feedback type component. For toasts use the react-toastify library, otherwise a material ui component for this purpose will do just fine.

- https://www.npmjs.com/package/react-toastify

Upon successful authentication the token returned from the backend should be stored in localStorage and the user should be redirected to the _Home_ page.

## Task 2 - Home page

This page should only be accessible once the user has been authenticated.

Otherwise if the user wanted to navigate to this page by being clever and replacing the route in the url, this cleverness should be countered by redirecting the user to the Login page.

Add a logout button somewhere on the page, which gets rid of the token, and redirects the user to the login screen.

## Task 3 - CRUD

This task consists of 5 smaller subtasks:

1. On the home page list all the food entries that can be found on your server. If there are no foods to show, signal this to the user instead of just showing a blank page.

2. Add a button somewhere on the page which opens a modal or a dialog where the user is be able to enter details for a new food entry (name is enough) to be added to the list.

3. The list items should have a button which allows the user to navigate to a separate page to see a selected food's details. Here you should query all the info regarding the food and display it on the screen.

4. Add an option to remove a selected food entry from the list, possibly in the form of a button somewhere on the food list item. (_OPTIONAL_ - for extra sweetness add a confirmation modal, where the user is asked whether the entry should really be removed - _"Are you sure you want to delete this item?"_)

5. Add the option to update a selected food entry's name. Here the modal / dialog used for the creation of a food entry should be reused and the fields should be prepopulated (the data is "fed" into it) with the details (name) of the selected food entry.

## Task 4 - Custom 404 page

If the user happens to wander off to a route that is non-existent (not defined inside the _pages_ folder), a custom error page should be shown. Here you can live out your artistic fantasies. Surprise us with something.

More info on this can be found in the Next.js docs:

- https://nextjs.org/docs

## Task 5 - Styling

Use the React Material UI library for certain components if you find it necessary (highly recommended):

- https://mui.com/getting-started/installation/

If you need to style things on your own - look for inspiration on the web, find something that fits the current design trends (clean, minimalistic, a bit rounded, basically _simple and elegant_) and the look of your website as well,. Make sure to use .scss files respectively for each component you would like to style.

Global styles should be added to the _global.scss_

## Task 6 (_OPTIONAL_) - Deploy to Vercel

If all other tasks are completed, you can try to deploy your wonderful application for the whole world to see.

Use [Vercel](https://www.vercel.com/), a free and easy to use service to reach this goal:

- https://nextjs.org/docs/deployment

---

```



gl hf



```

_Make sure to reach out to us trough Slack if you have any questions!_
