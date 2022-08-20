import fs from 'fs';
import matter from 'gray-matter';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TopNavComponent from '../../components/layout/top-nav';
import { IGrayMatterFile } from '../../interfaces/gray-matter-file';

interface IProps {
  posts: IGrayMatterFile[],
}


export async function getStaticProps() {
  const files = fs.readdirSync('posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data: frontMatter } = matter(readFile);
    return {
      slug,
      frontMatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

const PostsPage: NextPage<IProps> = ({ posts }) => {
  return (
    <TopNavComponent>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0'>
        {posts.map(({ slug, frontMatter }) => (
          <div
            key={slug}
            className='border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col'
          >
            <Link href={`/posts/${slug}`}>
              <a>
                <Image
                  width={650}
                  height={340}
                  alt={frontMatter.title}
                  src={`/${frontMatter.socialImage}`}
                />
                <h1 className='p-4'>{frontMatter.title}</h1>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </TopNavComponent>
  );
}

export default PostsPage;