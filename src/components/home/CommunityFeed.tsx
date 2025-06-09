import React from "react";

export const CommunityFeed: React.FC = () => {
  const communityPosts = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "SC",
      role: "Product Manager",
      content: "Just finished implementing the new AI workflow automation. The productivity gains are incredible! Our team is saving 3+ hours daily on routine tasks.",
      likes: 24,
      comments: 8,
      timeAgo: "2 hours ago",
      tags: ["Productivity", "AI Automation"],
    },
    {
      id: 2,
      author: "Marcus Johnson",
      avatar: "MJ",
      role: "Data Scientist",
      content: "Sharing my latest insights on prompt engineering best practices. Key takeaway: Context window optimization can improve response quality by 40%.",
      likes: 31,
      comments: 12,
      timeAgo: "4 hours ago",
      tags: ["Prompt Engineering", "Best Practices"],
    },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTagColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
      "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
      "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Community Feed
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {communityPosts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                {getInitials(post.author)}
              </div>
              
              {/* Post Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white/90">
                    {post.author}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.role}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    •
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.timeAgo}
                  </span>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {post.content}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getTagColor(index)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Engagement */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <button className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          Join the conversation →
        </button>
      </div>
    </div>
  );
}; 