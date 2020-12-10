# giphy

[![Build Status](https://travis-ci.com/Dmitry-N-Medvedev/giphy.svg?branch=main)](https://travis-ci.com/Dmitry-N-Medvedev/giphy)
[![codecov](https://codecov.io/gh/Dmitry-N-Medvedev/giphy/branch/main/graph/badge.svg?token=XAUREOB4X3)](https://codecov.io/gh/Dmitry-N-Medvedev/giphy)
[![Repo Status](https://apis.deepjyoti30.dev/repostatus/badge?repo=Dmitry-N-Medvedev/giphy&style=flat)](https://github.com/Dmitry-N-Medvedev/giphy)

The task is to create a single-page web application that leverages data from the [Giphy API](https://github.com/Giphy/GiphyAPI ).

## Requirements

The project will be manually reviewed and scored by the team according to the following requirements:

* Please use ReactJs for this challenge. (If wanted, feel free to use create react app for the initial setup).
* The page should never reload.
* Provide a form for the user to perform a keyword search against the GIF database via the API.
* Display the results as still thumbnails on the page in a layout that makes sense. A large volume of results should load in a performance-minded fashion.
* Clicking on a thumbnail should launch a lightbox-style modal view that allows the user to browse through individual GIFs as a slideshow. The GIFs in this view should be fully animated.
* Create a polished visual design and user experience.
* Code in a clean, readable way following all normal conventions.
* The goal is for you to create your own lightbox and slideshow app - do not use a prebuilt solution.
* Develop and test your work using a desktop Chrome/Chromium browser. Your work will be manually reviewed using desktop Chrome/Chromium, exclusively.
* If you have any notes or instructions about the exercise, please write them in the file README.md.
* Nice to have: Strictly typed solution by using typescript/flow, react hooks.

## Notes

1. Instead of the ReactJs the [Svelte](https://svelte.dev/) will be used.
2. idea what individual GIFs mean in this case. Graphics returned for each item contains URLs of the same item in different formats and geometry.

## How to see it in action

1. you are in the project's root directory
2. install the NodeJs according to the version defined in [package.json](package.json)
3. install the [pnpm](https://pnpm.js.org/en/installation) as a technically better alternative to npm/yarn/whatever
4. navigate to [sources/browser](sources/browser)
5. in the terminal type the following command: `pnpm run dev`
6. watch the terminal for the [Listening on http://localhost:3000](http://localhost:3000) - Command + Click the link to view the app in the default browser

## PS

* I will be more than happy to answer any of your questions regarding this project
