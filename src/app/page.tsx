import BlogForm from '../components/BlogForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold my-8">AI-Powered Blog Generator</h1>
      <BlogForm />
    </div>
  );
}
