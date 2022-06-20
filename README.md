# U06 Recipe App - Frontend

School Assignment @ Chas Academy, spring 2022. This is the front end part of it. The assignment was to create a rudamentary recipe app that fetches recipes from an external API and that is also connected to a Laravel backend API that stores recipes in user lists on a database.

Project needs refinements:
  - Numbers button on frontpage is not working
  - This readMe and documentation
  - Recipies can now be stored multiple times in the same list
  - Changing lists
  - Probably other stuff...

## API

I'm using [Spoonacular's API](https://spoonacular.com/food-api/).

## Languages and tools used:
- Angular
- Bootstrap
- Laravel (REST API)
- Docker
- Netlify (Frontend deploy)
- Heroku (Backend deploy)

## Other fullfilled requirements

- [x] Be able to get a list of recipe suggestions
- [x] Be able to filter the suggestions of recipes by dish type and allergens/preferences:
  - [x] Starter, main course or dessert (minimum, more dish types may be implemented)
  - [x] Allergens/dietary preferences (eg gluten, nuts, vegetarian, etc.), at least three additional filters must be included in addition to starter, main course and dessert
- [x] Be able to click on a recipe to see its information (with its own route)
- [x] Be able to save recipes in a list (in a database throug a backend API)
- [x] Be able to view saved recipes (with its own route)
- [x] Be able to delete saved recipes from the list
- [x] Frontend must be implemented in the Angular framework
- [x] Use an external API to retrieve recipe information which is displayed in the application
- [x] Must work on a mobile device, ie the above goals must also be possible to perform on a mobile device

| URi | Parameter | Type     | Description                |
| :-- | :-------- | :------- | :------------------------- |
| `/recipe` |  |  | Renders home/recipe search page |
| `/login` |  |  | Renders login page |
| `/register` |  |  | Renders sign up page |
| `/recipe-detail/:id` | `id` | `string` | Renders detailed page for a specific recipe |
| `/list` |  |  | Renders the list page for logged in users |
| `/list-detail/:id` | `id` | `string` | Renders login page |

## Getting started

Clone repo and run:
```
Under construction

```

### Design process and other notes

```
Under construction

```


---------------

