export const renderImages = (blockToInsertedHtml, imagesArr = []) => {
    const markup = imagesArr
      .map(
        ({
          tags,
          likes,
          views,
          comments,
          downloads,
          webformatURL,
          largeImageURL,
        }) => {
          return `
          <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}" >
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
              <ul class="stats-block">
                <li>
                  <span>Likes</span>
                  <span>${likes}</span>
                </li>
                <li>
                  <span>Views</span>
                  <span>${views}</span>
                </li>
                <li>
                  <span>Comments</span>
                  <span>${comments}</span>
                </li>
                <li>
                  <span>Downloads</span>
                  <span>${downloads}</span>
                </li>
              </ul>
            </a>
          </li>
          `;
        }
      )
      .join('');
  
    blockToInsertedHtml.insertAdjacentHTML('beforeend', markup);
  };
