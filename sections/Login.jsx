'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { TitleText } from '../components';
import { useRouter } from 'next/router'


const Login = () => {
    const router = useRouter()
    const { push } = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        const res = await fetch("https://godot-main-server.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const result = await res.json();
        const statusCode = res.status;
        console.log(result.status)

        if (statusCode == 421) {
            alert("You are not registered!!!")
            push(`/register`);
        } else if (statusCode == 200) {
            localStorage.setItem("status", true);
            localStorage.setItem("email", email);
            const refferdBy = result.user.referredBy
            localStorage.setItem("refer", refferdBy[refferdBy.length - 1])
            // console.log(refferdBy[refferdBy.length - 1]);
            setIsLoading(false);
            push(`/dashboard`)
        } else if (statusCode == undefined) {
            setIsLoading(false);
            alert("Wrong Email or Password!!!");
        } else {
            setIsLoading(false);
            alert("Wrong Email or Password!!!");
        }
    }

    return (
        <section className={`${styles.paddings}`} id="explore">
            <div className="loader" style={isLoading ? { visibility: "visible" } : { visibility: "hidden" }} >
                <span class="spinner spinner--quarter"></span>
            </div>
            <TitleText
                title={<>Login</>}
                textStyles="text-center"
            />
            <div className="form">
                <input type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} style={{ marginBottom: "0rem" }} />
                <p className="register_btn">Not a existing user? <span onClick={() => { push("/register"); }}>Register Now!!!</span></p>
                <button onClick={handleSubmit}>Login</button>
            </div>
        </section>
    );
};

export default Login;
