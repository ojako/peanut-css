# peanut-css

Building on normalize.css and making use of modern CSS techniques.
The grid is based on flexbox and the `rem` unit is used for sizing.

Theming is handled by CSS vars.

You can visit the demo page here: https://ojako.github.io/peanut-css/

## Getting Started

You can download the zip containing all the compiled files you need and include them in your project directly, or install via NPM using:

`npm install peanut-css --save-dev git+https://github.com/ojako/peanut-css.git`

## Tools

Peanut is built using SCSS for the purposes of brevity and maintainability. CSS vars are used to theme and structure the framework.

If you make changes you can run `gulp` from within the project to regenerate all the compiled files.

## Testing

CSS Regression testing is performed by gemini
See the quickstart guide here: https://github.com/gemini-testing/gemini
Gemini scripts and screens are located under the `gemini` folder

Basics:
 - start the server: `yarn serve`
 - run phantomjs: `yarn phantomjs -- --webdriver=4444`
 - run gemini: `yarn gemini -- test`

## Things for me to do in the future, maybe

```
- create an alternative CSS file that uses smurf typing for the components and doesn't include the basic form resets
- fix the btn-groups
```
