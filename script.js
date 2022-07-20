let headers = new Headers({
    "Accept"       : "application/json",
    "Content-Type" : "application/json",
    "User-Agent"   : "DiscgosBlock/1.0",
    "Authorization" : api_key
});

async function discogsFetch () {

    let discogsBlockContainer = document.createElement('div');
    discogsBlockContainer.setAttribute('id', `#discogs-container`);
    discogsBlockContainer.classList.add('discogs-container'); 
    document.body.appendChild(discogsBlockContainer);

    const response = await fetch("https://api.discogs.com/users/tonewheelz/collection/folders/0/releases?page=1&per_page=12", {
        method: 'GET',
        headers: headers
    })

    const responseJSON = await response.json();
    console.log(responseJSON);




    responseJSON.releases.forEach ( release => {

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

discogsFetch();



/*.catch(error => {
    console.log('error!');
    console.error(error);

});

*/