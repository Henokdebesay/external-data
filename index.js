import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

const carousel = document.getElementById("carouselExampleControls");
// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_76RQ2VaUsIvaru76HtSSrLzoqgHVemYvLHHpRW7G8WVaIs9PtlOsQuQ7D4seb3mq";

// (async function initialLoad() {
//   fetch(`https://api.thecatapi.com/v1/images/search?limit=50&api_key=${API_KEY}`)
//     .then(response => response.json())
//     .then(data => {
//       data.forEach((array) => {
//         if (array.breeds.length <= 0){
//           return ''
//         }else if (array.breeds.length > 0){

//           let option = document.createElement("option")
//           option.id = array.id;
//           option.innerText = array.breeds[0].name
//           breedSelect.appendChild(option)
//           console.log(data)
//         }
       
//       })
//     })
//     .catch(error => {
//       console.error("Error fetching data:", error);
//     });
// })();


// breedSelect.addEventListener("change", (e) => {
//   // Clear carousel
//   carousel.innerHTML = '';

//   // Clear infoDump
//   infoDump.innerHTML = '';

//   const selectedBreed = e.target.value; // Get the value of the selected breed

//   // Fetch images for the selected breed
//   fetch(`https://api.thecatapi.com/v1/images/search?limit=50&api_key=${API_KEY}`)
//     .then(response => response.json())
//     .then(data => {

//       data.forEach(imageData => {
//         let img = document.createElement('img');
//         img.src = imageData.url;
//         img.style.width = "6vh"; 
//         img.style.width = "12vh";

//         carousel.appendChild(img);
//       });
//     })
//     .catch(error => {
//       console.error("Error fetching image data:", error);
//     });

//   // Fetch breed information for the selected breed
//   fetch(`https://api.thecatapi.com/v1/breeds/search?q=${selectedBreed}&api_key=${API_KEY}`)
//     .then(response => response.json())
//     .then(breedData => {
//       if (breedData.length > 0) {
//         const breed = breedData[0]; // Assuming there's only one breed returned

//         // Create heading for breed info
//         let heading = document.createElement('h2');
//         heading.textContent = "Breed Information";

//         // Append heading to infoDump
//         infoDump.appendChild(heading);

//         // Create paragraph for each piece of breed information
//         let paragraph1 = document.createElement('p');
//         paragraph1.innerHTML = `<strong>Name:</strong> ${breed.name}`;

//         let paragraph2 = document.createElement('p');
//         paragraph2.innerHTML = `<strong>Origin:</strong> ${breed.origin}`;

//         let paragraph3 = document.createElement('p');
//         paragraph3.innerHTML = `<strong>Description:</strong> ${breed.description}`;

//         // Append paragraphs to infoDump
//         infoDump.appendChild(paragraph1);
//         infoDump.appendChild(paragraph2);
//         infoDump.appendChild(paragraph3);
//       } else {
//         let errorMessage = document.createElement('p');
//         errorMessage.textContent = "Breed information not found.";

//         infoDump.appendChild(errorMessage);
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching breed data:", error);
//     });
// });


// export async function favourite(imgId) {
//   try {
    
//     const response = await fetch(`https://api.example.com/favorite/${imgId}`, {
//       method: 'POST', 
//       headers: {
//         'Content-Type': 'application/json',
        
//         'Authorization': 'Bearer YOUR_AUTH_TOKEN'
//       },
//       body: JSON.stringify({}) // Empty body as an example
//     });

//     if (!response.ok) {
//       throw new Error('Failed to favorite image');
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error('Error favoriting image:', error);
//     throw error; 
//   }
// }


(async function initialLoad() {
 try{

  const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=50&api_key=${API_KEY}`)

  const data = response.data

      data.forEach((array) => {
        if (array.breeds.length <= 0){
          return ''
        }else if (array.breeds.length > 0){

          let option = document.createElement("option")
          option.id = array.id;
          option.innerText = array.breeds[0].name
          breedSelect.appendChild(option)
          console.log(data)
        }
       
    })
 } catch (error) {
  console.error("Error fetching data:", error);
}
})();




breedSelect.addEventListener("change", async (e) => {
  carousel.innerHTML = '';

  infoDump.innerHTML = '';

  const selectedBreed = e.target.value; 

  try {
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=50&api_key=${API_KEY}`);

    const data = response.data;

    data.forEach(imageData => {
      let img = document.createElement('img');
      img.src = imageData.url;
      img.style.width = "6vh";
      img.style.width = "12vh";

      carousel.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching image data:", error);
  }


  // Fetch breed information for the selected breed

  try {
   const breedResponse = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${selectedBreed}&api_key=${API_KEY}`);

    const breedData = breedResponse.data;

    if (breedData.length > 0) {
      const breed = breedData[0]; 

        let heading = document.createElement('h2');
        heading.textContent = "Breed Information";

        // Append heading to infoDump
        infoDump.appendChild(heading);

        // Create paragraph for each piece of breed information
        let paragraph1 = document.createElement('p');
        paragraph1.innerHTML = `<strong>Name:</strong> ${breed.name}`;

        let paragraph2 = document.createElement('p');
        paragraph2.innerHTML = `<strong>Origin:</strong> ${breed.origin}`;

        let paragraph3 = document.createElement('p');
        paragraph3.innerHTML = `<strong>Description:</strong> ${breed.description}`;

        // Append paragraphs to infoDump
        infoDump.appendChild(paragraph1);
        infoDump.appendChild(paragraph2);
        infoDump.appendChild(paragraph3);
      } else {
        let errorMessage = document.createElement('p');
        errorMessage.textContent = "Breed information not found.";

        infoDump.appendChild(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching breed data:", error);
    }
  });
   


export async function favourite(imgId) {
  try {
    
    const response = await axios.post(`https://api.example.com/favorite/${imgId}`, {}, {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_AUTH_TOKEN'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to favorite image');
  }

  const data = response.data;

  return data;
} catch (error) {
  console.error('Error favoriting image:', error);
  throw error;
}
}



/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
