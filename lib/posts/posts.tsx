// Simulated database fetch functions

export interface Post {
    id: string;
    title: string;
    content: string;
}

// Mock data
const posts: Post[] = [
    { id: '1', title: 'Next.js with TypeScript', content: 'Content of post 1...' },
    { id: '2', title: 'Static Generation vs SSR', content: 'Content of post 2...' },
];

export const fetchPostIds = async (): Promise<{ params: { id: string } }[]> => {
    return posts.map(post => ({
        params: { id: post.id },
    }));
};

export const fetchPostData = async (id: string): Promise<Post> => {
    const post = posts.find(post => post.id === id);
    return post!;
};
