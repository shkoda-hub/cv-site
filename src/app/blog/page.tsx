import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Блог | Artem Shkonda",
  description: "Статьи о backend-разработке, Node.js, TypeScript и архитектуре приложений",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <Link
            href="/"
            className="text-[#a1a1aa] hover:text-[#6366f1] transition-colors inline-flex items-center gap-2 mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            На главную
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#6366f1]">&lt;</span>
            Блог
            <span className="text-[#22d3ee]">/&gt;</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366f1] to-[#22d3ee] mb-6" />
          <p className="text-[#a1a1aa] text-lg">
            Заметки о разработке, технологиях и лучших практиках
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#a1a1aa] text-lg">Статьи скоро появятся...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
