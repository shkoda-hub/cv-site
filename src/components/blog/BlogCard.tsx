"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PostMeta } from "@/lib/mdx";

interface BlogCardProps {
  post: PostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="p-6 bg-[#171717] rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all">
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#a1a1aa] mb-3">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h2 className="text-xl font-bold text-white group-hover:text-[#6366f1] transition-colors mb-3">
            {post.title}
          </h2>

          <p className="text-[#a1a1aa] leading-relaxed mb-4">{post.description}</p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-[#0a0a0a] text-[#6366f1] rounded-full border border-[#6366f1]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
