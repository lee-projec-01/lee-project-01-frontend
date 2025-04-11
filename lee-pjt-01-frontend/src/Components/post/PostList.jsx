import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

function PostsList() {
  // 게시글 리스트를 저장할 상태
  const [posts, setPosts] = useState([]);
  // 로딩 상태와 에러 상태도 관리할 수 있습니다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트될 때 axios로 게시글 리스트를 가져옵니다.
  useEffect(() => {
    axios.get('http://localhost:8443/api/posts', {
      withCredentials : true ,
      headers : {
      // Authorization : "Bearer " + sessionStorage.getItem("accessToken"),
      'Content-Type' : 'application/json'
      }
    }) 
      .then(response => {
        // 응답 데이터가 배열 형태라고 가정합니다.
        setPosts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || '게시글을 가져오는데 실패했습니다.');
        setLoading(false);
      });
  }, []);

  if (posts.length === 0) return <h1>게시글이 없습니다.</h1>;
  if (loading) return <h1>로딩중...</h1>;
  if (error) return <h1>에러: {error}</h1>;

  return (
    <div>
      <h1>게시글 리스트</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}}`} >방 번호 : {post.id}</Link> 
            {/* <h2>{post.title}</h2> */}
            {/* <p>{post.content}</p> */}
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
