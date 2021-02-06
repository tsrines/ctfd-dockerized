import React, { useState } from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import '../index.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
import gfm from 'remark-gfm';
import API from '_helpers/api-helpers';
import { updatePost } from '_helpers/s3helpers';
import { accountService, baseUrl } from '_services';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@material-ui/core';

const NewPost = ({ history, match }) => {
  const [value, setValue] = useState('');
  const [selectedTab, setSelectedTab] = useState('write');

  const account = accountService.accountValue;
  const save = async function* (data) {
    var fileInput = document.getElementsByClassName('image-input')[0];
    const file = fileInput.files[0];
    var filename = file.name;
    const formData = new FormData();
    formData.append('images', file, filename);
    const url = await updatePost(formData, account.token, file);
    yield url;
  };

  // button to submit form
  // autosaving features

  const savePost = async () => {
    await API.put(
      `${baseUrl}/posts/${match.params.id}`,
      { content: value, is_published: true },
      { headers: { contentType: 'text' } }
    );
    alert(`You're post has been published!`);
    history.push('/');
  };

  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter style={dark} language={language} children={value} />
      );
    },
  };

  return (
    <div className='container'>
      <ReactMde
        minEditorHeight={350}
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(
            <ReactMarkdown
              plugins={[gfm]}
              renderers={renderers}
              source={markdown}
            />
          )
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
        paste={{
          saveImage: save,
        }}
      />
      <Button onClick={savePost}>Publish</Button>
    </div>
  );
};

export default NewPost;
