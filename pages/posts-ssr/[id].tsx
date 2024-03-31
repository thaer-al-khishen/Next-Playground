// pages/posts-ssr/[id].tsx
import { GetServerSideProps } from 'next';
import {fetchPostData, Post} from "@/lib/posts/posts";

interface PostProps {
    postData: Post;
}

export default function PostSSR({ postData }: PostProps) {
    return (
        <article>
            <h1>{postData.title}</h1>
            <div>{postData.content}</div>
        </article>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const postData = await fetchPostData(id as string);

    return {
        props: {
            postData,
        },
    };
};
