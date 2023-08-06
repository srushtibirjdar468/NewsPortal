const API_KEY= "f255b5c0f0814b9ab3f7dc906ed5a939";
const url= "https://newsapi.org/v2/everything?q=";


window.addEventListener("load",() => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query)
{
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    console.log(res);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles)
{
    const cardsContainer=document.getElementById('cards-container');
    const newsCardtemplate=document.getElementById('template-news-card');
    cardsContainer.innerHTML="";
    articles.forEach((article) => {
        if(!article.urlToImage)return;
        const cardClone=newsCardtemplate.content.cloneNode(true);
        fillDataInCard(article,cardClone);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(article,cardClone){
    const img = cardClone.querySelector("#news-img");
    const title = cardClone.querySelector("#news-title");
    const source = cardClone.querySelector("#news-source");
    const desc = cardClone.querySelector("#news-desc");

    img.src = article.urlToImage;
    title.innerHTML = article.title;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    source.innerHTML = `${article.source.name} · ${date}`;

    desc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavClick(query)
{
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

function onClickSearchBtn()
{
    const query = document.getElementById("ip").value;
    if(!query) return;

    fetchNews(query);

    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
    document.getElementById("ip").innerHTML = "";
}

