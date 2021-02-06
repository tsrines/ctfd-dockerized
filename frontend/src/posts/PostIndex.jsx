import { makeStyles } from '@material-ui/core';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { NavLink } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import API from '_helpers/api-helpers';

const useStyles = makeStyles({
  postOnIndex: {},
});
const PostIndex = () => {
  const [allPosts, setAllPosts] = useState([]);
  const classes = useStyles();

  const getAllPosts = useCallback(() => {
    try {
      API.get(`/posts`).then((res) => {
        if (res.data.error) console.error(res.data.error);
        else setAllPosts(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
    return () => {};
  }, [getAllPosts]);

  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter style={dark} language={language} children={value} />
      );
    },
  };

  return (
    <section>
      <div>
        <h1>WELCOME TO FACEBLOGGER</h1>
      </div>

      {allPosts.length > 0 ? (
        allPosts.map(
          (post) =>
            post.is_published && (
              <Fragment key={post.id}>
                <div className={classes.postOnIndex}>
                  <ReactMarkdown
                    allowDangerousHtml={true}
                    skipHtml={true}
                    plugins={[remarkGfm]}
                    renderers={renderers}
                    source={post.content}
                  />
                  <NavLink to={`/posts/${post.id}`}>...see more</NavLink>
                  <hr />
                </div>
              </Fragment>
            )
        )
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

export default PostIndex;
