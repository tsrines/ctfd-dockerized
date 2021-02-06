import { Input, TextareaAutosize, Button } from '@material-ui/core';
import React, { useState } from 'react';
import API from '_helpers/api-helpers';
import { accountService, baseUrl } from '_services';

const NewComment = ({ postID, updatePostComments }) => {
  const [commenting, setCommenting] = useState(false);
  const [content, setContent] = useState('');
  const clickHandler = () => {
    setCommenting((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await API.post(`${baseUrl}/comments`, {
        content: content,
        user_id: accountService.accountValue.id,
        post_id: postID,
      });
      updatePostComments(data);
      setCommenting((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <>
      {!commenting && <Button onClick={clickHandler}>Leave comment</Button>}
      {commenting && (
        <div style={{ minWidth: `45px` }}>
          <form onSubmit={onSubmit}>
            <TextareaAutosize
              onChange={onChange}
              value={content}
              rowsMin={10}
            />
            <Input type='submit'></Input>
          </form>
        </div>
      )}
    </>
  );
};

export default NewComment;
