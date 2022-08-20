import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import TopNavComponent from '../../components/layout/top-nav';
import { IGrayMatterFile } from '../../interfaces/gray-matter-file';

interface Props {
}

interface Params extends ParsedUrlQuery {
  slug: string,
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const fileName = fs.readFileSync(`posts/${params!.slug}.md`, 'utf-8');
  const { data: frontMatter, content } = matter(fileName);
  return {
    props: {
      frontMatter,
      content,
    },
  };
}

export default function PostPage({ frontMatter, content }: IGrayMatterFile) {
  return (
    <TopNavComponent>
      <div className='prose mx-auto'>
        <h1>{frontMatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    </TopNavComponent>
  );
}