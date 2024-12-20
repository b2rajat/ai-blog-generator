"use client"
import React, { useState } from 'react';
import axios from 'axios';
import GeneratedBlog from './GeneratedBlog';

const BlogForm: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [blog, setBlog] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateBlog = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/generate', { topic });
      if (response.data.blog) {
        setBlog(response.data.blog);
      } else {
        setError('Failed to generate blog');
      }
    } catch (err) {
      setError('Error generating blog');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">AI Blog Generator</h1>
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic for your blog"
        rows={6}
        className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button
        onClick={generateBlog}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-all duration-300 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'}`}
      >
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
            <span>Generating...</span>
          </div>
        ) : (
          'Generate Blog'
        )}
      </button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {blog && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md w-full">
          <GeneratedBlog blog={blog} />
        </div>
      )}
    </div>
  );
};

export default BlogForm;
