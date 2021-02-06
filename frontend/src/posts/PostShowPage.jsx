import Comments from 'comments/Comments';
import NewComment from 'comments/NewComment';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import API from '_helpers/api-helpers';

const PostShowPage = ({ match }) => {
  const [currentPost, setCurrentPost] = useState(null);
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    API.get(`/posts/${id}`).then(({ data }) => {
      setCurrentPost(data);
      setCurrentPostComments(data.comments);
    });
    return () => {};
  }, [id]);

  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter style={dark} language={language} children={value} />
      );
    },
  };

  const updatePostComments = (commentData) => {
    setCurrentPostComments([...currentPostComments, commentData]);
  };

  return (
    currentPost && (
      <>
        <div>
          <ReactMarkdown
            plugins={[gfm]}
            renderers={renderers}
            source={currentPost.content}
            allowDangerousHtml={true}
            skipHtml={true}
          />
        </div>
        <NewComment
          updatePostComments={updatePostComments}
          postID={match.params.id}
        />
        <Comments comments={currentPostComments} />
      </>
    )
  );
};

export default PostShowPage;
