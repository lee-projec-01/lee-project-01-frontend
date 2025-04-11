import axios from 'axios';
import { useState } from 'react';

function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const createPost = (e) => {
        e.preventDefault();
        axios({
            "url": "http://localhost:8443/api/posts",
            "method": "POST",
            data: {
                title, content
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            console.log("게시글 작성 성공:", response.data);
        }).catch(error => {
            console.error("게시글 작성 실패:", error);
        });
    }

    return (
        <div>
            <h1> Create Post Page </h1>
            <form action="" method="POST" >
                <label htmlFor="category">카테고리</label>
                <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} /> <br />
                <label htmlFor="title">제목</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
                <label htmlFor="content">내용</label>
                <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)}
                    style={{
                        width: '200px',
                        height: '200px',
                        resize: 'vertical',
                        padding: '10px',
                        fontSize: '16px'
                    }}
                /> <br />
                <input type="submit" value="게시글 작성" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost
