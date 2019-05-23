const imgurClientId = '135affaaed6f22d';
const imgurAlbumCreationUri = 'https://api.imgur.com/3/album';
const imgurUploadUri = 'https://api.imgur.com/3/image';

async function uploadImageAsync({ title, description, uri, type }) {
  // let deleteHash = await _createAnonymousAlbumAsync();

  let formData = new FormData();
  formData.append('image', {
    uri,
    name: `quiz.${type}`,
    type: `image/${type}`,
  });
  // formData.append('album', deleteHash);
  formData.append('type', 'file');
  formData.append('title', title);
  formData.append('description', description);

  let response = await fetch(imgurUploadUri, {
    method: 'POST',
    body: formData,
    header: {
      Authorization: `Client-ID ${imgurClientId}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.ok) {
    throw new Error(`Did not successfully upload image (HTTP ${response.status})`);
  }

  let body = await response.json();
  if (!body.success) {
    throw new Error(`Did not successfully upload image (Imgur status ${body.status})`);
  }

  return body.data.link;
}

// async function _createAnonymousAlbumAsync() {
//   let formData = new FormData();
//   let deleteHash = _generateRandomString();
//   formData.append('deletehashes[]', deleteHash);
//   formData.append('')

//   let response = await fetch(imgurAlbumCreationUri, {
//     method: 'POST',
//     body: formData,
//     header: {
//       Authorization: `Client-ID ${imgurClientId}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   if (!response.ok) {
//     console.log(await response.json());
//     throw new Error(`Did not successfully create album (HTTP ${response.status})`);
//   }

//   return deleteHash;
// }

// function _generateRandomString() {
//   let characters = [];
//   for (let ii = 0; ii < 20; ii++) {
//     characters.push(Math.floor(Math.random() * 36).toString(36));
//   }
//   return characters.join('');
// }

export default { uploadImageAsync };
