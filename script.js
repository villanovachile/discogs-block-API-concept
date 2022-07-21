let headers = new Headers({
    "Accept"       : "application/json",
    "Content-Type" : "application/json",
    "User-Agent"   : "DiscgosBlock/1.0",
    "Authorization" : api_key
});

    let discogsBlockParent = document.createElement('div');
    discogsBlockParent.setAttribute('id', `#discogs-block-parent`);
    discogsBlockParent.classList.add('discogs-block-parent'); 
    document.body.appendChild(discogsBlockParent);

    let discogsBlockContainer = document.createElement('div');
    discogsBlockContainer.setAttribute('id', `#discogs-container`);
    discogsBlockContainer.classList.add('discogs-container'); 
    discogsBlockParent.appendChild(discogsBlockContainer);
    
    let loader = document.createElement('div');
    loader.setAttribute('id', `#loader`);
    loader.classList.add('loader'); 
    discogsBlockParent.appendChild(loader);



    //async function discogsFetch () {

const getReleases = async (username, page, limit) => {
    const response = await fetch(`https://api.discogs.com/users/${username}/collection/folders/0/releases?page=${page}&per_page=${limit}`, {
        method: 'GET',
        headers: headers
    })

    const responseJSON = await response.json();
    //console.log(responseJSON);
    
    return await responseJSON;
}



const displayReleases = (discogsReleases) => {

    discogsReleases.releases.forEach ( release => {

        let artistName = release.basic_information.artists[0].name;
        let albumName = release.basic_information.title;
        let releaseYear = release.basic_information.year;
        let format = release.basic_information.formats[0].name;
        let albumCover = release.basic_information.thumb;
        //let gridNumber = `gridNumber${i}`;

        if (releaseYear == 0 | releaseYear == null) {
            releaseYear = 'Unknown';
        }
        
        if (albumCover == '') {
            albumCover = 'noimage.png';
        }

        // Parent container
        gridNumber = document.createElement('div');
        //gridNumber.setAttribute('id', `discogs-release${i}`);
        gridNumber.classList.add('discogs-card');  

        // album title container
        albumTitleDiv = document.createElement('div');
        //albumTitleDiv.classList.add('album-title-div');
        gridNumber.appendChild(albumTitleDiv)

        // album cover container
        albumCoverDiv = document.createElement('div');
        //albumCoverDiv.classList.add('album-cover-div');
        gridNumber.appendChild(albumCoverDiv)

        // Album title H4
        albumNameCard = document.createElement('h4');
        albumNameCard.appendChild(document.createTextNode(albumName));
        albumTitleDiv.appendChild(albumNameCard)

        //Album cover image
        albumCoverCard = document.createElement('img');
        albumCoverCard.setAttribute('src', albumCover);
        albumCoverDiv.appendChild(albumCoverCard)

        //Album title H5
        artistNameCard = document.createElement('h5');
        artistNameCard.appendChild(document.createTextNode(artistName));
        gridNumber.appendChild(artistNameCard)

        //format P tag
        formatCard = document.createElement('p');
        formatCard.appendChild(document.createTextNode('Format: ' + format));
        gridNumber.appendChild(formatCard)
            
        //format P tag
        releaseYearCard = document.createElement('p');
        releaseYearCard.appendChild(document.createTextNode('Release Year: ' + releaseYear));
        gridNumber.appendChild(releaseYearCard)
        discogsBlockContainer.appendChild(gridNumber);
    });
}

const showLoader = () => {
    loader.classList.add('show');
};

const hideLoader = () => {
    loader.classList.remove('show');
};


let currentPage = 1;
let username = user;
const limit = 12;
let total = 0;


const moreReleases = (page, limit, total) => {
    const indexStart = (page - 1) * limit + 1;
    return total === 0 || indexStart < total;
};




const loadReleases = async (page, limit) => {
    
    showLoader();

    setTimeout(async () => {
        try {
            if (moreReleases(page, limit, total)){
                const discogsResponse = await getReleases(username,currentPage,limit);
                
                displayReleases(discogsResponse);
                total = discogsResponse.pagination.items
            }  
        } catch (error) {
        console.log(error.message);
        } finally {
            hideLoader();
        }
    }, 500);

};

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 &&
        moreReleases(currentPage, limit, total)) {
        currentPage++;
        loadReleases(currentPage, limit);
    
    }
    

}, {
    passive: true
});



loadReleases (currentPage, limit);

/*.catch(error => {
    console.log('error!');
    console.error(error);

});

*/