import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '@/components/Card';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { apiClient } from '@/lib/api';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
}

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space.lg};
  
  ${({ theme }) => theme.mq.lg} {
    grid-template-columns: 1fr 2fr;
  }
`;

const DashboardTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const PostItem = styled.div<{ selected?: boolean }>`
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, selected }) => 
    selected ? theme.colors.secondaryDark : theme.colors.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const PostTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const PostAuthor = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const PostPreview = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostDetailContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  height: 100%;
`;

const PostDetailTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const PostDetailAuthor = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const PostDetailContent = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.errorLight};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const DashboardPage: React.FC = () => {
  useProtectedRoute();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await apiClient.get<Post[]>('/posts');
        // Limit to 10 posts for the demo
        setPosts(data.slice(0, 10));
        
        // Fetch users for those posts
        const userIds = [...new Set(data.slice(0, 10).map(post => post.userId))];
        userIds.forEach(fetchUser);
        
      } catch (err) {
        setError('Failed to load posts. Please try again.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Fetch user data
  const fetchUser = async (userId: number) => {
    try {
      const user = await apiClient.get<User>(`/users/${userId}`);
      setUsers(prev => ({
        ...prev,
        [userId]: user
      }));
    } catch (error) {
      console.error(`Failed to fetch user ${userId}:`, error);
    }
  };
  
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };
  
  const renderPostsList = () => {
    if (posts.length === 0) {
      return <p>No posts available.</p>;
    }
    
    return (
      <PostsList>
        {posts.map(post => (
          <PostItem 
            key={post.id}
            selected={selectedPost?.id === post.id}
            onClick={() => handlePostClick(post)}
          >
            <PostTitle>{post.title}</PostTitle>
            <PostAuthor>
              By: {users[post.userId]?.name || 'Loading...'}
            </PostAuthor>
            <PostPreview>{post.body}</PostPreview>
          </PostItem>
        ))}
      </PostsList>
    );
  };
  
  const renderPostDetail = () => {
    if (!selectedPost) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          color: '#5f6368'
        }}>
          <p>Select a post to view details</p>
        </div>
      );
    }
    
    const author = users[selectedPost.userId];
    
    return (
      <>
        <PostDetailTitle>{selectedPost.title}</PostDetailTitle>
        
        <PostDetailAuthor>
          <p><strong>Author:</strong> {author?.name || 'Unknown'}</p>
          <p><strong>Email:</strong> {author?.email || 'Unknown'}</p>
        </PostDetailAuthor>
        
        <PostDetailContent>
          <p>{selectedPost.body}</p>
        </PostDetailContent>
      </>
    );
  };
  
  return (
    <div>
      <DashboardTitle>Dashboard</DashboardTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {loading ? (
        <LoadingSpinner>Loading posts...</LoadingSpinner>
      ) : (
        <DashboardContainer>
          <Card>
            <h2 style={{ marginBottom: '1rem' }}>Recent Posts</h2>
            {renderPostsList()}
          </Card>
          
          <PostDetailContainer>
            {renderPostDetail()}
          </PostDetailContainer>
        </DashboardContainer>
      )}
    </div>
  );
};