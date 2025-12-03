import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [LoggedInId, setLoggedInId] = useState('');

    function handleLogin() {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            alert("저장된 회원 정보가 없습니다. 회원가입 화면으로 이동합니다.");
            navigate('/join');
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.userId === id && user.userPw === pw) {
            alert(`환영합니다. ${id}님`);
           // setIsLoggedIn(true);
            //setLoggedInId(id);
            localStorage.setItem('loggedInId', id);
            navigate('/');
            
        } else {
            alert("회원이 아닙니다. 회원가입화면으로 이동합니다.");
            navigate('/join');
        }
        
    }

    

    //if (isLoggedIn) {
        //return (
            //<div style={{border: '2px solid green', padding: '20px'}}>
               // <h1>로그인 성공</h1>
               // <p style = {{ fontSize: '24px', fontWeight: 'bold'}}>환영합니다.{loggedInId}님</p>
           // </div>
      //  )
   //}

    return (
        <>
        <h2>Login</h2>
        <input
            placeholder="ID입력"
            onChange={(e) => setId(e.target.value)}/>

     
        <input
            style = {{marginLeft: '5px'}}
            type="password"
            placeholder="PW 입력"
            onChange = {(e) =>setPw(e.target.value)}/>

         <button onClick={handleLogin}>Login</button>
            <div style = {{marginTop: '10px'}}>
                <Link to = '/Join'>회원가입</Link>
            </div>
        </>
    )

}


export default Login;