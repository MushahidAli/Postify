//Dependencies
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

//Components
import { domain } from './Util'

//Assets
import './Logon.css'

export default function Logon() {

    const [personalContent, setPersonalContent] = useState();
    useEffect(() => {
        axios.get('https://ipwho.is')
            .then(res => setPersonalContent("IP : " + res.data.ip + " | City : " + res.data.city + " | Region : " + res.data.region + " | Country : " + res.data.country))
    }, []);

    const [message, setMessage] = useState();
    const [messageForLogin, setMessageForLogin] = useState();
    const [emailExists, setEmailExists] = useState();
    var auth;
    const checkRef = useRef();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [dataSignin, setDataSignin] = useState({
        emailAddress: "",
        passwordContent: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleSigninChange = (e) => {
        const value = e.target.value;
        setDataSignin({
            ...dataSignin,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        setMessage(`Registration Was Successful!`)
        e.preventDefault();

        axios.get(domain + `sign_up/${data.name}/${data.email.toLowerCase()}/${data.password}/${personalContent}`)

        setTimeout(() => {
            document.getElementById('container').classList.remove("right-panel-active")
        }, 2000);
    };

    async function checkAvailability() {
        var checkEmail = (checkRef.current.value).toLowerCase();
        if(!checkEmail) {setEmailExists("")}
        var newCheckEmail;

        await axios.get(domain + `checkAvailibity/${checkEmail}`)
            .then(res => newCheckEmail = res.data.email)

        if(newCheckEmail == "No") {
            setEmailExists("Available For SignUp!");
            document.getElementById("mySignupBtn").disabled = false;
        }
        else {
            setEmailExists("Account Already Exists!");
            document.getElementById("mySignupBtn").disabled = true;
        }
    }

    const handleSigninSubmit = async (e) => {
        e.preventDefault();
        await axios.get(domain + `sign_in/${dataSignin.emailAddress.toLowerCase()}/${dataSignin.passwordContent}`)
            .then(res => auth = res.data.auth)

        if (auth == "success") {
            localStorage.removeItem("login");
            localStorage.setItem("login", btoa(dataSignin.emailAddress.toLowerCase()));
            setMessageForLogin("");

            window.location = "./viewmyposts";
        }
        else {
            localStorage.removeItem("login");
            setMessageForLogin("Invalid Email or Password. Please Try again.");
        }

        console.log(localStorage.getItem("login"));

    };

    return (
        <>
            <br /><h2>&lt; Postify /&gt;</h2>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" ref={checkRef} onBlur={checkAvailability} onChange={handleChange} required />
                        <span id="availability">{emailExists}</span>
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        <button id="mySignupBtn" className='btnLogon'>Sign Up</button>
                        <br />
                        <div className='successMessage'>
                            {message}
                        </div>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSigninSubmit}>
                        <h1>Sign in</h1>
                        <input type="email" name="emailAddress" id="emailAddress" placeholder="Email" onChange={handleSigninChange} required />
                        <input type="password" name="passwordContent" id="passwordContent" placeholder="Password" onChange={handleSigninChange} required /><br />
                        <button className='btnLogon'>Sign In</button>
                        <br />
                        <div className='messageForLogin'>
                        {messageForLogin}
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button onClick={() => document.getElementById('container').classList.remove("right-panel-active")} className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button onClick={() => document.getElementById('container').classList.add("right-panel-active")} className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p>
                    &copy; 2023 - Postify | Created By <a href="https://youtube.com/mushahidali">Mushahid Ali</a> - All Rights Reserved
                </p>
            </footer>
        </>
    );
}