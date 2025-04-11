import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function ChatRooms() {
  
  const navigate = useNavigate();

  // 게시글 리스트를 저장할 상태
  const [chatRooms, setChatRooms] = useState([]);
  // 로딩 상태와 에러 상태도 관리할 수 있습니다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트될 때 axios로 게시글 리스트를 가져옵니다.
  useEffect(() => {
    axios.get('http://localhost:8443/api/chats/chat-rooms', {
      withCredentials : true ,
      headers : {
      Authorization : "Bearer " + sessionStorage.getItem("accessToken")
      }
    }) 
      .then(response => {
        // 응답 데이터가 배열 형태라고 가정합니다.
        setChatRooms(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || '채팅방을 가져오는데 실패했습니다.');
        setLoading(false);
      });
    }, []);
    
    // 채팅방 생성
    const createChatRoom = () => {
      axios({
        url : 'http://localhost:8080/api/chats' ,
      method : 'POST' ,
      data : {},
      headers : {
          'Content-Type' : 'application/json'
        }
      }).then((res) => {
        console.log(res)
    }).catch((err)=> {
      console.error(err)
    })
  }
  
    const linkToChatRoom = (chatRoomId) => {
      navigate(`/chats/${chatRoomId}` , { state : {chatRoomId} })
    }
  
  if (chatRooms.length === 0) {
  return <div> 
  <button onClick={createChatRoom} >채팅방 생성</button>
  <h1>채팅방이 없습니다.</h1> </div> }

  if (loading) return <h1>로딩중...</h1>;
  if (error) return <h1>에러: {error}</h1>;

  return (
    <div>
      <h1>채팅방 목록</h1>
      <button onClick={createChatRoom} >채팅방 생성</button>
      <ul>  
        {chatRooms.map( chatRoom => (
          console.log(chatRoom.id),
           <li key={chatRoom.id} onClick={linkToChatRoom(chatRoom.id)} >{chatRoom.id}번방</li> 
        ))}
      </ul>
    </div>
  );

}

export default ChatRooms;

// onClick={linkToChatRoom(chatRoom.id)}