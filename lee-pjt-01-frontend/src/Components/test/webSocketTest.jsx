import { useEffect, useState } from 'react';
import SockJs from 'sockjs-client'
import { Client } from '@stomp/stompjs';
import axios from 'axios';
// import { Link } from 'react-router-dom';

function WebSocketTest() {

    console.log("1")  
    
    // 게시글 리스트를 저장할 상태
    const [chatRoom, setChatRoom] = useState({
        id : null 
    });
    const [message, setMessage] = useState("");

  // 로딩 상태와 에러 상태도 관리할 수 있습니다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 채팅방 메시지 조회
  const fetchMessages = () => {

    axios({
        withCredentials : true ,
        url : `http://localhost:8080/api/chats/${chatRoom.id}` ,
        method : 'GET' ,
        data : {},
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(response => {
        // 응답 데이터가 배열 형태라고 가정합니다.
        setChatRoom(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || '채팅방을 가져오는데 실패했습니다.');
        setLoading(false);
      });
  }

  // setMessage
  const inputMessage = (e) => {
    setMessage(e.target.value);
  }

   const sendMessage = async (event) => {
      // event.preventDefault();

      // await axios({
      //   withCredentials : true,
      //   'url' : '',
      //   'method' : 'POST',
      //   data : { 'message' : message },
      //   headers : {'Content-Type' : 'application/json'}
      // })

      client.
  }

  // 컴포넌트가 마운트될 때 axios로 게시글 리스트를 가져옵니다.
  useEffect(() => {
        
        // 채팅 기록 조회
        if(chatRoom.id){
          fetchMessages();
        }

    const socket = new SockJs('wss://day6.duckdns.org/api/v1/ws')

    const client = new Client({
        webSocketFactory : socket ,
        debug : (str) => console.log(`debug str :  ${str}`) ,
        reconnectDelay : 5000,
        onConnect : () => {
            console.log("STOMP Connected");
            if(chatRoom.id){
            client.subscribe(`wss://day6.duckdns.org/api/v1/pub/test` , (msg) => {
                    const body = msg.body();
                    setMessage(JSON.parse(body));
            })
            }6
        }
    })

    return client.deactivate();
}, []);

  // 채팅방 생성
  const createChatRoom = () => {
    axios({
      url : 'http://localhost:8080/api/v1/ws' ,
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

//  <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1.5.1/dist/sockjs.min.js"></script> 
//  <script src="https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js"></script> 
  

  if (!chatRoom) {
  return <div> 

  <button onClick={createChatRoom} >채팅방 생성</button>
  <h1>채팅방이 없습니다.</h1> </div> }

  if (loading) return <h1>로딩중...</h1>;
  if (error) return <h1>에러: {error}</h1>;

  return (
    <div>
      <h1>채팅방 : {chatRoom.id} </h1> 
      <button onClick={createChatRoom} >채팅방 생성</button>

      <div>
        <input type="text" value={message} onChange={inputMessage}  />
        <input type="submit"  value={'전송'} onClick={sendMessage} />
      </div>
      <h1>WebSocketTestPage</h1>
    </div>
  );
}

export default WebSocketTest;
