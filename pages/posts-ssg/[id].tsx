// pages/posts/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import {fetchPostData, fetchPostIds, Post} from "@/lib/posts/posts";

interface PostProps {
    postData: Post;
}

export default function PostItem({ postData }: PostProps) {
    return (
        <article>
            <h1>{postData.title}</h1>
            <div>{postData.content}</div>
        </article>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await fetchPostIds();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await fetchPostData(params!.id as string);
    return {
        props: {
            postData,
        },
    };
};
