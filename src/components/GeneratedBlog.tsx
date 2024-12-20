import React from 'react';

interface GeneratedBlogProps {
  blog: string;
}

const GeneratedBlog: React.FC<GeneratedBlogProps> = ({ blog }) => {
  return (
    <div>
      <h2>Generated Blog</h2>
      <p>{blog}</p>
    </div>
  );
};

export default GeneratedBlog;
