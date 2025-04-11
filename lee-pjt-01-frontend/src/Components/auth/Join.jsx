import axios from 'axios';
import { useState } from 'react';

function Join() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();

    const join = (e) => {
        e.preventDefault();
        axios({
            "url": "http://localhost:8443/api/users/join",
            "method": "POST",
            data: {
                username, password, passwordCheck
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            console.log("회원가입 성공:", response.data);
        }).catch(error => {
            console.error("회원가입 실패:", error);
        });
    }

    return (
        <div>
            <h1> Join Page </h1>
            <form action="" method="POST" >
                <label htmlFor="username">아이디</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />  <br />
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <label htmlFor="passwordCheck">비밀번호 확인</label>
                <input type="password" id="passwordCheck" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />  <br />
                <input type="button" value="회원가입" onClick={join} />
            </form>
        </div>
    )
}

export default Join
