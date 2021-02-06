import axios from 'axios';
import API, { APIHelpers } from './api-helpers';

export const uploadToAWS = async (auth_token, file, directory) => {
  const { data } = await API.get('/upload', {
    params: { filename: file.name, fileType: file.type, directory: directory },
    headers: APIHelpers.authorizationHeaders(auth_token),
  });
  const { post_url, get_url } = data;

  const options = {
    headers: { 'Content-Type': file.type, acl: 'public-read' },
  };
  await axios.put(post_url, file, options);

  return get_url;
};

export const updatePost = async (form, auth_token, fileToUpload) => {
  let image_url;
  try {
    if (fileToUpload) {
      image_url = await uploadToAWS(
        auth_token,
        fileToUpload,
        APIHelpers.projectImagePath()
      );
      form.append(encodeURI(image_url), fileToUpload, fileToUpload.name);
    }

    API('/posts', {
      method: 'POST',
      data: form,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return encodeURI(image_url);
  } catch (error) {
    console.error(error);
  }
};
