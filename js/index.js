const loadCategory=async()=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/news/categories`)
    const data= await res.json()
    const news= data.data.news_category
    // console.log(news)

    displayCategory(news)

}
const displayCategory=news=>{
    // console.log(news)
    news=news.slice(0,3)
    const tabContainer= document.getElementById('tab-container')
    news.forEach(data=>{
        const div=document.createElement('div')
        div.innerHTML=`
        <a onclick= handleLoadNews('${data.category_id}') class="tab text-base lg:text-2xl">${data.category_name}</a>
        `
        tabContainer.appendChild(div)
    })
    
}

const handleLoadNews=async(category)=>{
   const res= await fetch(`https://openapi.programming-hero.com/api/news/category/${category}`)
   const data= await res.json()
   const datas= data.data
   handleDisplayNews(datas)
}
const handleDisplayNews=(datas)=>{
    // console.log(datas)
    const cardContainer=document.getElementById('card-container')
    cardContainer.textContent=''
    datas.forEach(catagories=>{
        // console.log(catagories)
        const cardDiv=document.createElement('div')
        cardDiv.classList=`card flex justify-center px-4 lg:px-0 lg:justify-start bg-base-100 shadow-xl`
        cardDiv.innerHTML=`
        <figure><img class="h-auto lg:h-[400px] w-auto lg:w-[800px]" src="${catagories.image_url}" /></figure>
                    <div class="card-body">
                      <h2 class="card-title text-3xl">${catagories.title.slice(0,40)}</h2>
                      <div class='flex items-center'>
                      <p class='text-xl font-medium'>${catagories.details.slice(0,42)}</p>
                      <div class="text-2xl text-white badge badge-secondary p-6">${catagories.rating.badge}</div>
                    </div>
                    <h3 class="text-lg font-medium">Total view: ${catagories.total_view ? catagories.total_view:'No views' }</h3>
                    <div class="flex justify-between items-center mt-4">
                <div class="flex gap-2 items-center">
                <div class="w-14">
                <img class="rounded-full" src="${catagories.author.img}" />
            </div>

                <div>
                <p class="text-xl">${catagories.author.name}</p>
                <p class="text-lg">${catagories.author.published_date}</p></div>
                </div>
                <div><button onclick=" handleModal('${catagories._id}')" class="rounded-lg bg-black px-7 py-3 text-lg text-white">Details</button></div>
                </div>
                      </div>
        `
        cardContainer.appendChild(cardDiv)
    })
}
const handleModal=async(newsId)=>{
   
    const res= await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data= await res.json()
    const newses= data.data[0]
    // console.log(newses)
    handleModalDisplay(newses)
  
}
const handleModalDisplay=(newses)=>{
    console.log(newses)
    const modalCardContainer=document.getElementById('modal-class-container')
    modalCardContainer.innerHTML=`
    <h3 class="text-xl font-bold"><span>Author:</span>${newses.author.name}</h3>
    <p class="text-lg medium"><span>Title:</span>${newses.title}</p>
    <p class="text-base"><span>Details:</span>${newses.details.slice(0,90)}</p>
    `
    my_modal_5.showModal()
}

loadCategory()
handleLoadNews("01")
