import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides (replace URLs with your food images later)
  const slides = [
    { id: 1, title: "Fruits", img: "/images/Fruits.jpeg" },
    { id: 2, title: "Quick Snacks", img: "/images/snacks.jpeg" },
    { id: 3, title: "Delicious Desserts", img: "/images/cake1.jpeg" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recipesearch?query=${query}`);
    }
  };

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/40" /> {/* dark overlay */}
          <h2 className="absolute bottom-10 left-10 text-white text-4xl font-bold">
            {slide.title}
          </h2>
        </div>
      ))}

      {/* Search bar in the center */}
      <form
        onSubmit={handleSearch}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   flex items-center w-3/4 max-w-2xl bg-white rounded-full shadow-lg px-4 py-3"
      >
        <input
          type="text"
          placeholder="Search recipes by ingredient or name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 rounded-l-full focus:outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
        >
          Search
        </button>
      </form>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
      >
        ▶
      </button>
    </div>
  );
}

export default Home;
