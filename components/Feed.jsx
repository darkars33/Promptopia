'use client'

import { useState, useEffect } from 'react'
import Prompts from './Prompts'



const PromptCardList = ({data, handleTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout">
        {data.map((post) =>(
          <Prompts key={post._id} post={post} handleTagClick={handleTagClick} />
        ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
 
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if(searchValue === ''){
      setPosts(allPosts);
    }else{
      const filterPost = allPosts.filter((post) =>{
        return (post.tag.includes(e.target.value) || post.creator.username.includes(e.target.value))
      })
      setPosts(filterPost);
    } 
  }

  useEffect(() =>{
    const fetchPosts = async () =>{
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
      setAllPosts(data);
    }

    fetchPosts();
  },[])

  console.log(posts)

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or username" value={searchText} onChange={handleSearchChange} 
         className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() =>{}} />

    </section>
  )
}

export default Feed
