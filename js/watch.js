const Api_Key = '2d6b3291586411f85a61201ca446cbb8';
const Api_Img= 'https://image.tmdb.org/t/p/w500';
let watch= [];


JSON.parse(localStorage.getItem("watchList")).forEach(element => {
    axios.get(`https://api.themoviedb.org/3/movie/${element}?api_key=${Api_Key}&append_to_response=videos,similar,credits`)
    .then((res) => {
        watch.push(res.data)
        document.getElementById("watch").innerHTML = watch.map(item => 
            `
            <div class ="col-4 ms-3">
            <div class= "card">
            <img src="${Api_Img+ item.poster_path}" alt="${item.title}">
            <a class= "btn-remove" onclick="remove(${item.id})"><i class="fa fa-xmark pe-2 pt-2 fa-xl"></i></a>
            </div>
            </div>    
          `
        ).join('');
    })
});

function remove(movie_id){
    watchList = JSON.parse(localStorage.getItem("watchList"))
    watchList.splice(watchList.indexOf(movie_id),1);
    localStorage.setItem('watchList',JSON.stringify(watchList))
    location.reload();
}

const clearbtn = document.getElementById("btn2");
clearbtn.addEventListener("click", function(){
    localStorage.removeItem("watchList");
    localStorage.clear("watchList");
    location.reload();

})

