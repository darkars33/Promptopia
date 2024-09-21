'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@/components/Profile';

const MyProfile = () => {

          const {data: session, status} = useSession();
          const [posts, setPosts] = useState([]);
          const router = useRouter();


          useEffect(() => {
                    // Only fetch the user posts if the session is loaded and user ID exists
                    if (status === 'authenticated' && session?.user?.id) {
                      const fetchUser = async () => {
                        try {
                          const res = await fetch(`/api/users/${session.user.id}/posts`);
                          if (res.ok) {
                            const data = await res.json();
                            setPosts(data);
                          } else {
                            console.error("Failed to fetch posts");
                          }
                        } catch (error) {
                          console.error("Error fetching posts:", error);
                        }
                      };
                      fetchUser();
                    }
                  }, [status, session?.user?.id]);

          const handleEdit = async (post) => {
                   router.push(`/update-prompt?id=${post._id}`) 
          }

          const handleDelete = async (post) => {
                    const hasConfirmed = confirm("Are you sure you want to delete this post?");

                    if(hasConfirmed){
                              try {
                                   await fetch(`/api/prompt/${post._id.toString()}`, {
                                             method: 'DELETE',
                                   });
                              
                                   const filteredPosts = posts.filter((p) => p._id !== post._id);
                                        setPosts(filteredPosts);

                              } catch (error) {
                                      console.log(error); 
                              }
                    }
          }

          console.log(posts)

          return (
                    <Profile
                              name="My"
                              desc="Welcome to your personalized profile page"
                              data={posts}
                              handleEdit={handleEdit}
                              handleDelete={handleDelete}
                    />
          )
}

export default MyProfile
