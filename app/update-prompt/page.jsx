'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Form from '@/components/Form';

const Loading = () => {
  return <div>Loading...</div>;
};

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;
      try {
        const res = await fetch(`/api/prompt/${promptId}`);
        const data = await res.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error('Error fetching prompt details:', error);
      } finally {
        setLoading(false);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID is missing");

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />; // Show loading state while fetching
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleUpdate}
    />
  );
};

export default EditPrompt;
