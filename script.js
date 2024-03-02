const apiKey = '17d2a01bb7a0452bb3272759658956dd';

const blogContainer = document.getElementById("blog-container");



async function fetchRandomNews(){
  try{

    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;


  } catch(error){
    console.error("error fetching random news" , error);
    return[];
  }
}

function displayBlogs(articles){
  blogContainer.innerHTML = ""
  articles.forEach((article) => {

    const blogcard = document.createElement("div")
    blogcard.classList.add("blog-card")
    const img = document.createElement("img")
    img.src = article.urlToImage
    img.alt = article.title
    const title = document.createElement("h2")
    const truncatedTitle = article.title.length > 30? article.title.slice(0,30) + "..." : article.title
    title.textContent = truncatedTitle;
    const description = document.createElement("p")
    const truncatedDes = article.description.length > 120? article.description.slice(0,120) + "..." : article.description
    description.textContent = truncatedDes;

    blogcard.appendChild(img)
    blogcard.appendChild(title)
    blogcard.appendChild(description)
    blogcard.addEventListener("click" ,  ()=> {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogcard)
  });
}


(async ()=>{
  try{
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch(error){
    console.error("error fetching random news" , error);
  }
})();