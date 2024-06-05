//  generate api key from TMDB
const api="api_key=6c05bf6a67a107f5e77c9d1c3e2001c8";

// base url of the site
const base_url = "https://api.themoviedb.org/3";

// url
// const final_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api;

// img url
const banner_url = "https://image.tmdb.org/t/p/original";

const img_url = "https://image.tmdb.org/t/p/w300"; 

// requests for movies data

const requests = {
    // fetchPopular: `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${api}`,
  fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
  fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
  fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};
// used truncate the string 
// truncate means jo v description h kisi v movie ka usko short krne ka kaam krta h 

// str -> movie description 
//  n -> no. of words
// means n-> 30 words then str-> descpriton 30 words ka hojyega
function truncate(str,n){
    // in retrun we use ternary function
    //  in terney first IF condition then, TRUE condition then , FALSE condition
    return str?.length > n ? str.substr(0, n-1)+"..." : str;
}

// banner

// fetchnetflixorignals wla line data fetch krke dega 
 fetch(requests.fetchNetflixOrignals)
//  niche wale ka mtlb h jo v data aayega usko json format m change krke dena 
 .then((res) => res.json())

 .then((data) => {
    console.log(data.results);
    //  every refresh the movie will be change

    // setmovie me pura data store hoga ki kya kya movie m aaya kya description h all data

    // random isliye lenge kyuki random chize update hogi refresh ke bAD
    const setMovie = data.results[Math.floor(Math.random() * data.results.length -1)];

    // getelementbyid means jo html m banner tha usko get kiya yahn pe
    var banner = document.getElementById("banner");
    var banner_title = document.getElementById("banner__title");
    var banner__desc = document.getElementById("banner__description");

    banner.style.backgroundImage =
    "url("+ banner_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;

});

// movies rows
fetch(requests.fetchNetflixOrignals)
.then((res) => res.json())

.then((data)=> {
    // sbse phle humne ek headrow create kiya 
    // headrow ke andhr divivsion create kiya
    // division ko humne class name row de diya 
    // uske bad humne class list add kr di netflixrow name se 
    // isse yahi hoga ki movies aate jayengii ek loop chlte jyega
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    // class ka naam row de diye
    row.className ="row";

    row.classList.add("netflixrow");
    // append child js ka function m jisme hum insert krte jate h yahan p rows ko insert krte jarhe h
    // movie aate jayengii aur add hote chli jayengii
    headrow.appendChild(row);
        //  jo movie aayega uska title v chiye hoga isliye title banaya uska 
    const title = document.createElement("h2");

    title.className ="row__title";
    // andhr ka jo title hoga usme netflix orginials daal diya jaisa rhta h 
    // HINDI MOVIES & TV 
    title.innerText ="NETFLIX ORIGINALS";
    // next jo v title aane wala h uske liye appendchild use kr liya.
    row.appendChild(title);

        // posters ko append krwaye h 
    const row_posters = document.createElement("div");
    row_posters.className ="row__posters";
    row.appendChild(row_posters);

        // yahan p loop chlega foreach movie ke liye 
    data.results.forEach((movie)=>{
        const poster = document.createElement("img");
        poster.classname ="row__posterLarge";

        // ek variable banye s aur replace(/\s+/g,"")isliye use krte h ki idhr udhr na hojaye koi data
        // ek ke bad ek replcae hota jaye properly
        var s = movie.name.replace(/\s+/g,"");

        poster.id = s;
        poster.src = img_url + movie.poster_path;
        row_posters.appendChild(poster);
    });

});

// top rated
fetch(requests.fetchTrending)
.then((res) => res.json())

.then((data)=>{
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText ="Top Rated";
    row.appendChild(title);


    const row_posters = document.createElement("div");
    row_posters.className ="row__posters";
    row.appendChild(row_posters);

    data.results.forEach((movie)=> {
        const poster = document.createElement("img");
        poster.className = "row__posterLarge";
        var s2 = movie.id;


        poster.id = s2;
        poster.src = img_url + movie.poster_path;
        // append isliye kr rhe kyuki line to line movies chiye
        row_posters.appendChild(poster);
    });
});

// action

fetch(requests.fetchActionMovies)
.then((res) => res.json())

.then((data)=>{
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);


    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "Action Movies";

    row.appendChild(title);


    const row_posters = document.createElement("div");
    row_posters.className ="row__posters";
    row.appendChild(row_posters);


    // loopp chl rha h simliar upper jaise hua h waisa hi sb horha
    data.results.forEach((movie)=> {
        // console.log(movie);
        const poster = document.createElement("img");
        poster.className="row__poster";
        var s2 = movie.id;
        poster.id = s2;
        poster.src = img_url + movie.backdrop_path;
        row_posters.appendChild(poster);
    });
});

// comedyyy...

fetch(requests.fetchComedyMovies)
.then((res)=> res.json())

.then((data)=> {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);

    const title = document.createElement("h2");
    title.className ="row__title";
    title.innerText = "Comedy Movies";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);

    data.results.forEach((movie)=> {
         console.log(movie);
        const poster = document.createElement("img");
        poster.className = "row__poster";
        var s2 = movie.id;
        poster.id = s2;
        poster.src = img_url + movie.backdrop_path;
        row_posters.appendChild(poster);
    });
});

// horror....

fetch(requests.fetchHorrorMovies)
.then((res)=> res.json())
.then((data)=> {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className ="row";
    headrow.appendChild(row);


    const title = document.createElement("h2");
    title.className ="row__title";
    title.innerText = "Horror Movies";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);

    data.results.forEach((movie)=> {
         console.log(movie);
        const poster = document.createElement("img");
        poster.className = "row__poster";
        var s2 = movie.id;
        poster.id = s2;
        poster.src = img_url + movie.backdrop_path;
        row_posters.appendChild(poster);
    });
});

// romanceee

fetch(requests.fetchRomanceMovies)

.then((res)=> res.json())

.then((data)=> {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className ="row";
    headrow.appendChild(row);


    const title = document.createElement("h2");
    title.className ="row__title";
    title.innerText = "Romance Movies";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);

    data.results.forEach((movie)=> {
         console.log(movie);
        const poster = document.createElement("img");
        poster.className = "row__poster";
        var s2 = movie.id;
        poster.id = s2;
        poster.src = img_url + movie.backdrop_path;
        row_posters.appendChild(poster);
    });
});

// documentryy

fetch(requests.fetchDocumentaries)

.then((res)=> res.json())

.then((data)=> {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className ="row";
    headrow.appendChild(row);


    const title = document.createElement("h2");
    title.className ="row__title";
    title.innerText = "Documentaries";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);

    data.results.forEach((movie)=> {
         console.log(movie);
        const poster = document.createElement("img");
        poster.className = "row__poster";
        var s2 = movie.id;
        poster.id = s2;
        poster.src = img_url + movie.backdrop_path;
        row_posters.appendChild(poster);
    });
});

   


    


