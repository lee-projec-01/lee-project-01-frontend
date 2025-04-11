import Home from './Components/Home'
import Join from './Components/auth/Join'
import Login from './Components/auth/Login'
import PostList from './Components/post/PostList'
import CreatePost from './Components/post/CreatePost'
import ChatRooms from './Components/chat/ChatRooms';
import ChatRoomDetail from  './Components/chat/ChatRoomDetails';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

import WebSocketTest from './Components/test/webSocketTest';


function App() {

  return (
    <div>
      <BrowserRouter>
      <header>
        <nav>
          <Link to="/">홈</Link> | 
          <Link to="/users/join">회원가입</Link> | 
          <Link to="/users/login">로그인</Link> |
          <Link to="/posts">게시판</Link> |
          <Link to="/posts/form">게시글 작성</Link> |
          <Link to="/chats/chat-rooms">채팅방 목록</Link>
          <Link to="/websockettest">websockettest</Link>
        </nav>
      
        </header>
      <main>
        <Outlet />
      </main>
      <footer>푸터 내용</footer>
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users/join' element={<Join />} />
          <Route path='/users/login' element={<Login />} />
          <Route path='/posts' element={<PostList />} />
          <Route path='/posts/form' element={<CreatePost />} />
          <Route path='/chats/chat-rooms' element={<ChatRooms />} />
          <Route path='/chats/:chatRoomId' element={<ChatRoomDetail />} />
          <Route path='/websockettest' element={<WebSocketTest />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
