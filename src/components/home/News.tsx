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
<<<<<<< HEAD

      {/* Main News Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Trending Sidebar */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">Trending</h4>
          </div>
          <div className="space-y-4">
            {trendingStories.map((story, index) => (
              <div key={story.id} className="flex gap-3 group cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-1 transition-colors">
                    {story.title}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{story.source}</span>
                    <span>•</span>
                    <span>{story.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Story */}
        <div className="lg:col-span-3">
          {featuredStory && (
            <div className="relative group cursor-pointer overflow-hidden rounded-xl">
              <div className="aspect-[16/9] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                {featuredStory.image ? (
                  <img 
                    src={featuredStory.image} 
                    alt={featuredStory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(featuredStory.category)}`}>
                      {featuredStory.category}
                    </span>
                    <span className="text-white/80 text-xs">{featuredStory.source}</span>
                    <span className="text-white/60 text-xs">•</span>
                    <span className="text-white/80 text-xs">{featuredStory.timeAgo}</span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {featuredStory.title}
                  </h2>
                  <p className="text-white/90 text-sm line-clamp-2">
                    {featuredStory.excerpt}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Stories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {secondaryStories.slice(0, 3).map((story) => (
          <div key={story.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-3">
              <div className="aspect-[4/3] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                {story.image ? (
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(story.category)}`}>
                {story.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{story.timeAgo}</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-2 transition-colors">
              {story.title}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {story.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {story.source}
              </span>
              <ChevronRightIcon className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Trending:</span>
              <div className="flex gap-1">
                {currentNews.filter(item => item.trending).map((_, index) => (
                  <div key={index} className="w-1 h-1 bg-red-500 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            View all news →
          </button>
        </div>
      </div>
=======
>>>>>>> feature/news-integration
    </div>
  );
} 