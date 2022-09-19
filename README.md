### Discogs Block API Concept

This is a working proof of concept for my WordPress Guternberg block using JavaScript. This script makes an API call to the Discogs.com API, and displays the collection of Discogs.com user in a grid.

Prominently featured is infinite scroll pagination, which will dynamically generate new divs for each page in the collection.

### How to use

The HTML file requires a .JS file named `api_key.js`, which must include the following variables:

```
const user = 'YOUR_USERNAME'
const api_key = 'Discogs token=YOUR_API_TOKEN';
```

This `api_key.js` is not included in this repo, and will need to be created locally in your dev environment. 

You will need to replace `YOUR_USERNAME` with your discogs.com username. If you don't already have an account, you can create one [here](https://www.discogs.com/users/create)

You then need to replace `YOUR_API_TOKEN` in the variable with your Discogs.com token, which can be generated [here](https://www.discogs.com/settings/developers)

The pagination style infinite scroll can be configured to display a certain number of releases per page by modifying the `limit` variable to a number of your choosing.


![Screenshot](/assets/screenshot-1.jpg)
