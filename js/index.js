const loadCategory=async()=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/news/categories`)
    const data= await res.json()
    const news= data.data.news_category
    // console.log(news)

    displayCategory(news)

}
const displayCategory=news=>{
    console.log(news)
    news=news.slice(0,3)
    const tabContainer= document.getElementById('tab-container')
    news.forEach(data=>{
        const div=document.createElement('div')
        div.innerHTML=`
        <a class="tab text-2xl">${data.category_name}</a>
        `
        tabContainer.appendChild(div)
    })
    
}
loadCategory()