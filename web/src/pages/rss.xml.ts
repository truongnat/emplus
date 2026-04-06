import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteDescription, siteName, siteUrl } from '@/lib/site';

export async function GET(context: { site?: URL | string }) {
  const posts = (
    await getCollection('blog', ({ data }) => data.published)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const site = context.site ?? siteUrl().href;

  return rss({
    title: siteName,
    description: siteDescription,
    site,
    items: posts.map((post) => ({
      link: `/blog/${post.id}/`,
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>vi-vn</language>`,
  });
}
