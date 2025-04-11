import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    // 필드
    const navigate = useNavigate()
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    // 함수
    const login = async (e) => {
        e.preventDefault();
        await axios({
            withCredentials : true ,
            "url": "http://localhost:8443/api/users/login",
            "method": "POST",
            data: {
                username, password
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            console.log("로그인 성공:", response.data);

            navigate(`/`, { state : {} })    
        }).catch(error => {
            console.error("로그인 실패:", error);
            navigate(`/users/login`, { state : {} })
        });
    }

    return (
        <div>
            <h1> Login Page </h1>
            <form action="" method="POST" >
                <label htmlFor="username">아이디</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <input type="button" value="로그인" onClick={login} />
            </form>
        </div>
    )
}

export default Login
