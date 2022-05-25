const Api_Key = '2d6b3291586411f85a61201ca446cbb8';
const Api_Img= 'https://image.tmdb.org/t/p/w500';
let favList= [];


JSON.parse(localStorage.getItem("favList")).forEach(element => {
    axios.get(`https://api.themoviedb.org/3/movie/${element}?api_key=${Api_Key}&append_to_response=videos,similar,credits`)
    .then((res) => {
        favList.push(res.data)
        document.getElementById("favorite").innerHTML = favList.map(item => 
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
    favList = JSON.parse(localStorage.getItem("favList"))
    favList.splice(favList.indexOf(movie_id),1);
    localStorage.setItem('favList',JSON.stringify(favList))
    location.reload();
}

const clear = document.getElementById("clear1");
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();

})