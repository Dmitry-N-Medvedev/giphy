<svelte:head>
	<title>About</title>
</svelte:head>

<style>
  article {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    justify-content: center;
    align-items: stretch;
    width: 75%;
    height: 75%;
    justify-self: center;
    align-self: center;
    font-size: 1.25rem;
  }

  article > h1,
  article > h2,
  article > p {
    display: inline;
  }

  article > h1,
  article > h2 {
    text-transform: capitalize;
  }

  article > ul,
  article > ol {
    display: flex;
    flex-direction: column;
  }

  article li {
    padding: 0.5vh 0;
  }

  article li:not(:first-of-type) {
    margin-top: 0.5vh;
  }
</style>

<article>
  <h1>giphy</h1>
  
  <p>
    The task is to create a single-page web application that leverages data from the <a href='https://github.com/Giphy/GiphyAPI' target='_blank'>Giphy API</a>.
  </p>
  
  <h2>Requirements</h2>

  <p>
    The project will be manually reviewed and scored by the team according to the following requirements:
  </p>
  
  <ul>
    <li>Please use ReactJs for this challenge. (If wanted, feel free to use create react app for the initial setup).</li>
    <li>The page should never reload.</li>
    <li>Provide a form for the user to perform a keyword search against the GIF database via the API.</li>
    <li>Display the results as still thumbnails on the page in a layout that makes sense. A large volume of results should load in a performance-minded fashion.</li>
    <li>Clicking on a thumbnail should launch a lightbox-style modal view that allows the user to browse through individual GIFs as a slideshow. The GIFs in this view should be fully animated.</li>
    <li>Create a polished visual design and user experience.</li>
    <li>Code in a clean, readable way following all normal conventions.</li>
    <li>The goal is for you to create your own lightbox and slideshow app - do not use a prebuilt solution.</li>
    <li>Develop and test your work using a desktop Chrome/Chromium browser. Your work will be manually reviewed using desktop Chrome/Chromium, exclusively.</li>
    <li>If you have any notes or instructions about the exercise, please write them in the file README.md.</li>
    <li>Nice to have: Strictly typed solution by using typescript/flow, react hooks.</li>
  </ul>
  
  <h2>Notes</h2>
  
  <ol>
    <li>Instead of the ReactJs the <a href='https://svelte.dev/' target='_blank'>Svelte</a> will be used.</li>
  </ol>
</article>
