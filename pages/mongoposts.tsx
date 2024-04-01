import React, { useState, useEffect } from 'react';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState('');
    const [postData, setPostData] = useState({ name: '', description: '' });
    const [actionResult, setActionResult] = useState('');

    const fetchPosts = async () => {
        const response = await fetch('/api/mongoposts');
        const data = await response.json();
        setPosts(data.data);
        setActionResult(JSON.stringify(data.data, null, 2));
    };

    const fetchPostById = async () => {
        const response = await fetch(`/api/mongoposts/${postId}`);
        const data = await response.json();
        setActionResult(JSON.stringify(data.data, null, 2));
    };

    const createPost = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/mongoposts/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        const data = await response.json();
        setActionResult(JSON.stringify(data, null, 2));
    };

    const updatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/mongoposts/${postId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        const data = await response.json();
        setActionResult(JSON.stringify(data, null, 2));
    };

    // Assuming 'updatePost' performs a full update (PUT), reuse 'updatePost' for PATCH if it only partially updates.
    // For DELETE, ensure the method is 'DELETE' and body is not required.
    const deletePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/mongoposts/${postId}`, {
            method: 'DELETE',
        });
        const data = await response.ok ? 'Post deleted successfully' : 'Failed to delete post';
        setActionResult(data);
    };

    const fetchPostsWithoutId = async () => {
        const response = await fetch('/api/mongoposts/getallandproject');
        const data = await response.json();
        setActionResult(JSON.stringify(data.data, null, 2));
    };

    return (
        <div>
            <button onClick={fetchPosts}>Get All Posts</button>
            <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} placeholder="Post ID for Get, Patch, Delete" />
            <button onClick={fetchPostById}>Get Post by ID</button>
            <form onSubmit={createPost}>
                <input type="text" value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} placeholder="Name" />
                <input type="text" value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} placeholder="Description" />
                <button type="submit">Create Post</button>
            </form>
            <form onSubmit={updatePost}>
                <button type="submit">Update Post</button>
            </form>
            <form onSubmit={deletePost}>
                <button type="submit">Delete Post</button>
            </form>
            <button onClick={fetchPostsWithoutId}>Get All Posts Without ID</button>
            <pre>{actionResult}</pre>
        </div>
    );
};

export default PostsPage;
