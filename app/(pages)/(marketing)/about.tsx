import Head from 'next/head';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <Head>
        <title>About Us - Water Treatment Solutions</title>
      </Head>

      <header className="w-full bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold text-center">About Us</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-center mb-4">
          At Water Treatment Solutions, our mission is to provide high-quality water treatment services and customer support.
        </p>
        <a href="/" className="text-blue-500 underline">
          Back to Home
        </a>
      </main>

      <footer className="w-full bg-blue-500 text-white p-4 text-center">
        &copy; 2024 Water Treatment Solutions
      </footer>
    </div>
  );
}
