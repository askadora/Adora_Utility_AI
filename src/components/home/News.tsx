"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface NewsArticle {
  image?: string;
  title: string;
  description?: string;
  url: string;
}

export default function News() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsData(data.news || []);
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!newsData.length) return <div>No news available.</div>;

  const featured = newsData[0];
  const highlights = newsData.slice(1, 6);

  return (
    <div className="news-section">
      {/* Featured Story */}
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <Image
            src={featured.image || '/placeholder-news.jpg'}
            alt={featured.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            priority
          />
        </div>
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 leading-tight">{featured.title}</h2>
          <p className="text-gray-700 mb-4 text-lg line-clamp-3">{featured.description}</p>
          <a href={featured.url} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-800 hover:underline">Read More »</a>
        </div>
      </div>

      {/* Grid of Smaller Stories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {highlights.map((story, idx) => (
          <a
            key={idx}
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow p-3 flex flex-col hover:bg-blue-50 transition-colors"
          >
            <div className="h-24 w-full relative mb-2 rounded overflow-hidden">
              <Image
                src={story.image || '/placeholder-news.jpg'}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 20vw"
              />
            </div>
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{story.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-2">{story.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
} 