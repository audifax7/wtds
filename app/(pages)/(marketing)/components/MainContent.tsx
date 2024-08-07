import Link from "next/link";

const MainContent = () => {
    return (
      <main
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/wasac.jpg')" }}
      >
        {/* <div className="h-96 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl font-bold mb-4 animate-fade-in">Clean Water for a Better Future</h2>
          <p className="text-xl mb-8 animate-fade-in">Providing top-notch water treatment solutions.</p>
          <Link href="/login" className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700 animate-bounce">Start now</Link>
        </div> */}
         <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h2 className="text-3xl font-bold mb-4">Welcome to Our Website</h2>
        <p className="text-lg text-center mb-4">
          Providing the best water treatment solutions for your home and business.
        </p>
        <a href="/about" className="text-blue-500 underline">
          Learn more about us
        </a>
      </main>
      </main>
    );
  };
  
  export default MainContent;