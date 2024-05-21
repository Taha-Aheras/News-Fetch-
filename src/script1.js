const btn = document.querySelector("#btn")

btn.addEventListener("click",()=>{
    getNews();
})

const getNews=()=>{
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F')
    .then(response => response.json())
    .then(data => {
        const newsList = document.getElementById('news-list');
        data.items.forEach(item => {
            const li = document.createElement('li');
            const h2 = document.createElement('h1');
            const content = document.createElement('p');
            const author = document.createElement('h4');
            const a = document.createElement('a');

            li.classList.add('news-wale');

            if(item.image){
                const img = document.createElement('img');
                img.src=item.image;
                img.alt=item.title;

                li.appendChild(img);
            }


            author.textContent = `Author : ${item.author}`
            h2.textContent = item.title;
            content.textContent = getDescriptionText(item.description);
            a.textContent = 'Read more';
            a.href = item.link;
            a.target = '_blank';

            
            li.appendChild(h2);
            li.appendChild(content);
            // li.appendChild(content);
            li.appendChild(a);
            li.appendChild(author);
            newsList.appendChild(li);
        });
    });

}

function getDescriptionText(description) {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(description, "text/html");
    let descriptionText = parsedHtml.body.textContent;

    const unwantedTextStartIndex = descriptionText.indexOf("©");
    if (unwantedTextStartIndex !== -1) {
        descriptionText = descriptionText.slice(0, unwantedTextStartIndex).trim();
    }

    return descriptionText;
}

