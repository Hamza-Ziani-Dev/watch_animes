// https://docs.api.jikan.moe/#tag/users/operation/getUserClubs

const api_url = "https://api.jikan.moe/v4/";

const searchText = document.querySelector("#searchText");
const searchResults = document.querySelector("#searchResults");

searchText.addEventListener("keyup", function () {
    if (this.value.length > 3) {
        getAnimes(this.value);
    }
});

// Function get Animies:
async function getAnimes(query) {
    const res = await fetch(`${api_url}anime?q=${query}`);
    const animes = await res.json();
    if (animes.data.length > 0) {
        searchResults.style.display = "block";
        searchResults.innerHTML = "";
        animes.data.map((anime) => {
            searchResults.innerHTML += `<li class="signleAnime" data-image="${anime.images.jpg.image_url}">
               <a href='${anime.url}'target="_blank">${anime.title}</a>
            </li>`;
        });

        const singleamines = Array.from(document.querySelectorAll(".singleAnime"));
        const displayImage = document.querySelector("#displayImage");

        singleamines.map((singleamine) => {
            singleamine.addEventListener("mouseenter", function () {
                displayImage.style.display = "block";
                displayImage.innerHTML = ` <img src="${this.dataset.image}"`;
            });
            singleamine.addEventListener("mouseout", function () {
                displayImage.style.display = "none";
            });
            singleamine.addEventListener("click", function () {
                displayImage.style.display = "none";
            });
        });
    }
}


// Get Top Animes
const topTvAnime = document.querySelector("#topTvAnime");
async function getTopAnime() {
    const res = await fetch(`${api_url}top/anime`);
    const topAnimes = await res.json();

    topAnimes.data.map(topAnime => {
        topTvAnime.innerHTML +=`
        <div class="col-lg-3 col-md-6">
<div class="item">
<div class="thumb">
  <a href="${topAnime.url}"><img src="${topAnime.images.jpg.image_url}" alt=""></a>
  <span class="price">${topAnime.score}</span>
</div>
<div class="down-content">
  <span class="category">${topAnime.source}</span>
  <h4>${topAnime.title.substring(0,20)}</h4>
  <a href="${topAnime.url}"><i class="fa fa-shopping-bag"></i></a>
</div>
</div>
</div>
        `;
    });
}
getTopAnime();


// Get Coming Serieses:
const upComingSeries = document.querySelector("#upComingSeries");
async function getupComingSeries() {
    const res = await fetch(`${api_url}seasons/upcoming`);
    const upComingSerieses = await res.json();

    upComingSerieses.data.map(itenmComingSeries => {
        upComingSeries.innerHTML +=`
        <div class="col-lg-2 col-md-6 col-sm-6">
        <div class="item">
          <div class="thumb">
            <a href="${itenmComingSeries.url}"><img src="${itenmComingSeries.images.jpg.image_url}"></a>
          </div>
          <div class="down-content">
              <span class="category">${itenmComingSeries.source}</span>
              <h4>${itenmComingSeries.title.substring(0,10)}</h4>
          </div>
        </div>
        </div>
        `;
    });
}
getupComingSeries();



// Get Image Random
const randomImage = document.querySelector("#randomImage");
async function getRandomImage() {
    const res = await fetch(`${api_url}random/characters`);
    const randomImageUrl = await res.json();
    console.log(randomImageUrl.data);
        randomImage.innerHTML +=`
        <img src="${randomImageUrl.data.images.jpg.image_url}">
         <span class="price">${randomImageUrl.data.name}</span>
        <span class="offer">${randomImageUrl.data.mal_id}</span>
        `;
}
getRandomImage();
