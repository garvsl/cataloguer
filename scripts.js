/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  window.books.map((book) => {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, book); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  });
}

function editCardContent(card, book) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = book.title;

  const cardImage = card.querySelector("img");
  cardImage.src = book.coverURL;
  cardImage.alt = book.title + " Poster";

  const infoWrapper = card.querySelector("ul");
  const allInfo = infoWrapper.querySelectorAll("li");
  allInfo[0].textContent = book.author; //author
  allInfo[1].textContent = book.genre; //genre
  allInfo[2].textContent = book.year; //year
  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  //   console.log("new card:", book.title, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function shuffle() {
  //shuffle the array

  for (let i = window.books.length - 1; i > 0; i--) {
    //start from the end
    const j = Math.floor(Math.random() * (i + 1)); //get random number and round down
    [window.books[i], window.books[j]] = [window.books[j], window.books[i]]; //swap adjacent books
  }
  showCards();
}

function removeFirstCard() {
  window.books.shift(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}

let genreAscending = true;

function sortByGenre() {
  genreAscending = !genreAscending; //toggle between ascending and descend
  //go through array and compare adjacent elements to determine if in correct order, sorta similar to shuffle
  for (let i = 0; i < window.books.length; i++) {
    for (let j = 0; j < window.books.length - i - 1; j++) {
      const comparison = window.books[j].genre.localeCompare(
        window.books[j + 1].genre
      );
      if (
        (genreAscending && comparison < 0) ||
        (!genreAscending && comparison > 0)
      ) {
        let temp = window.books[j];
        window.books[j] = window.books[j + 1];
        window.books[j + 1] = temp;
      }
    }
  }
  showCards();
}

let yearAscending = true;

function sortByYear() {
  yearAscending = !yearAscending;

  //same, but without locale compare since not a string
  for (let i = 0; i < window.books.length; i++) {
    for (let j = 0; j < window.books.length - i - 1; j++) {
      if (yearAscending) {
        if (window.books[j].year > window.books[j + 1].year) {
          let temp = window.books[j];
          window.books[j] = window.books[j + 1];
          window.books[j + 1] = temp;
        }
      } else {
        if (window.books[j].year < window.books[j + 1].year) {
          let temp = window.books[j];
          window.books[j] = window.books[j + 1];
          window.books[j + 1] = temp;
        }
      }
    }
  }
  showCards();
}

let titleAscending = true;

function sortByTitle() {
  titleAscending = !titleAscending;

  //application for title
  for (let i = 0; i < window.books.length; i++) {
    for (let j = 0; j < window.books.length - i - 1; j++) {
      const compareResult = window.books[j].title.localeCompare(
        window.books[j + 1].title
      );
      if (
        (titleAscending && compareResult < 0) ||
        (!titleAscending && compareResult > 0)
      ) {
        let temp = window.books[j];
        window.books[j] = window.books[j + 1];
        window.books[j + 1] = temp;
      }
    }
  }
  showCards();
}

const tempBooks = [...window.books]; //store original to make sure no perma changes

let debounceTimer;

function debounce(func, delay) {
  //custom deboucne function
  clearTimeout(debounceTimer); //reset timer
  debounceTimer = setTimeout(() => {
    func(); //set timer for the function passed
  }, delay);
}

function searchBook() {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value.toLowerCase();

  window.books = tempBooks; //reset to original
  showCards();

  const searchResult = window.books.filter((book) => {
    //filter based on input
    return book.title.toLowerCase().includes(searchValue);
  });
  window.books = searchResult;

  showCards();
}

function lessBouncySearch() {
  debounce(searchBook, 200); //200ms delay
}
