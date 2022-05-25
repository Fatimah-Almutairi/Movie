const Api_Key = '2d6b3291586411f85a61201ca446cbb8';
const API_Trn = `https://api.themoviedb.org/3/trending/all/day?api_key=${Api_Key}`;
const Api_Img= 'https://image.tmdb.org/t/p/w500';


// Start Trending
axios.get(API_Trn)
  .then((res) => {
      console.log(res.data.results)
      document.getElementById("trending").innerHTML = res.data.results.map(trending =>
        `
        
      <div class="card m-2 rounded-2 shadow justify-content-start" style="width: 16rem;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="ShowDetails(${trending.id})">
      <img src="${Api_Img+ trending.poster_path}" alt="${trending.title}">
      </div>
      
       
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    </div>
    </div> 
   
      `
        ).join('')
    })

 // End Trending

 // Start Category


function category(id,card){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${Api_Key}&with_genres=${id}`)
    .then(res => {
        console.log(res.data.results)
        card.innerHTML = res.data.results.map(item =>
          `
          <div class="card m-2 rounded-2 shadow text-center p-0" style="width: 14rem;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="ShowDetails(${item.id})">
            <img src="${Api_Img+ item.poster_path}" alt="${item.title}">
          </div>
         
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
    </div>
    </div> 
         `
          ).join('')
      })
  }
  
  let Action = document.getElementById('action');
    category(28,Action);
  
  let Adventure = document.getElementById('adventure');
    category(12,Adventure);
  
  let Animation = document.getElementById('animation');
    category(16,Animation);
  
  let Comedy = document.getElementById('comedy');
    category(35,Comedy);
  
  let Drama = document.getElementById('drama');
    category(18,Drama);
  
  let Family = document.getElementById('family');
    category(10751,Family);
  
  let Fantasy = document.getElementById('fantasy');
    category(14,Fantasy);
  
  let Horror = document.getElementById('horror');
    category(27,Horror);
  
  let Romance = document.getElementById('romance');
    category(10749,Romance);
  
  let Music = document.getElementById('music');
    category(10402,Music);
  
  let Thriller = document.getElementById('thriller');
    category(53,Thriller);


function ShowDetails(movie_id){
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_Key}&append_to_response=videos,similar,credits`)
    .then((res) => {
      console.log(res.data)
      let item = res.data;
      let char = item.credits.cast;
      var charNames = [];
      for (var i = 0; i < 4; i++ ){
        charNames.push(char[i].name);
      }
  
      let genre = res.data.genres;
      var genreList = genre.map((genre) =>{
        return genre.name;
      });
  
      let video = res.data.videos.results;
      console.log(video);
      let similarMovies = res.data.similar.results;
      var similarList = similarMovies.map( (element) => {
        return element;
      })
      document.getElementById("exampleModal").innerHTML = 
      `
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
   
  </div>
  
      <div class="modal-dialog  modal-xl modal-dialog-centered">
      <div class="modal-content p-3 text-center">
      <div type="button" class="float-end text-end" data-bs-dismiss="modal" aria-label="Close">
      <i class= "fas fa-times white-text" aria-hidden= "true"></i>
      </div>
      <div class="movie-info p-1 d-flex justify-content-end">
  
       <a><i class="far fa-solid fa-heart btn p-2 fa-2xl" onclick="Favorite(${item.id})"></i></a> 
       <a><i class="far fa-bookmark btn fa-2xl p-2" onclick="watch(${item.id})"></i></a>
       </div>
      <p calss="fs-1">${item.title}</p>
          <p>${item.release_data} | ${genreList} </p>
          <p> ${item.overview} </p>
          <p class="mb-5"> Cast: ${charNames}</p>
          <iframe height ="400" width ="100%" src= "https://www.youtube.com/embed/${video[0].key}"</iframe>   
      
        </div>
        </div> `;
  
    })
  }
  
  
let favList= [];
let watchList= [];

function watch(movie_id){
  if (!watchList.includes(movie_id)){
    watchList.push(movie_id)
    console.log(watchList);
    localStorage.setItem("watchList", JSON.stringify(watchList))
    console.log(localStorage.watchList);
  }
}

watchList =[...JSON.parse(localStorage.getItem("watchList"))];


function Favorite(movie_id){
  if (!favList.includes(movie_id)){
    favList.push(movie_id);
    console.log(favList);
    localStorage.setItem("favList",JSON.stringify(favList));
    console.log(localStorage.favList);
  }
}
favList =[...JSON.parse(localStorage.getItem("favList"))];



const form = document.getElementById("form");
const search = document.getElementById("search");

form.addEventListener("submit", (event) =>{
  event.preventDefault();
  const searchTerm = search.value;
  // document.getElementById("search-title").innerHTML = `${searchTerm}`
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2d6b3291586411f85a61201ca446cbb8&query=${searchTerm}`)
  .then( (res) => {
    console.log(res.data.results,"results")
    document.getElementById("results").innerHTML = res.data.results.map(item =>
      `
      <div class="card m-2 rounded-2 shadow text-center p-0" style="width: 14rem;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="ShowDetails(${item.id})">
        <img src="${Api_Img+ item.poster_path}" alt="${item.title}">
      </div>
     
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog ">
</div>
</div> 
      `).join('')
  })
})