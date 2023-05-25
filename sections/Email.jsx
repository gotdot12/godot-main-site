'use client';

import { useEffect, useState } from 'react';
import styles from '../styles';
import { TitleText } from '../components';
import { useRouter } from 'next/router'


const Email = () => {
    const router = useRouter()
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState();
    const [showResendBtn, setShowResendBtn] = useState(0);
    const email = router.query.email;
    const referred = router.query.referredBy;

    useEffect(() => {
        countIt()
        return () => { };
    }, []);

    const countIt = () => {
        let time = 1;
        const countDown = setInterval(() => {
            setShowResendBtn(time)
            time++;
            if (time > 32) {
                clearInterval(countDown)
            }
        }, 1000);
    }

    const resendIt = async () => {
        setIsLoading(true);
        const res = await fetch("https://godot-main-server.vercel.app/resend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })
        const statusCode = res.status;

        if (statusCode == 200) {
            setIsLoading(false);
            countIt();
        } else {
            alert("Fail to send again!!!")
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const res = await fetch("https://godot-main-server.vercel.app/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, code, referred
            })
        })
        const statusCode = res.status;

        if (statusCode == 200) {
            setIsLoading(false);
            push(`/purchase?email=${email}&referredBy=${router.query.referredBy}&name=${router.query.name}`);
        } else {
            alert("Wrong OTP!!!")
        }
    }

    return (
        <section className={`${styles.paddings}`} id="explore">
            <div className="loader" style={isLoading ? { visibility: "visible" } : { visibility: "hidden" }}>
                <span class="spinner spinner--quarter"></span>
            </div>

            <TitleText
                title={<>Email Verification</>}
                textStyles="text-center"
            />
            <h2 style={{ color: "#fff", fontSize: "1.2rem", margin: "2rem auto", marginBottom: "-3rem", textAlign: "center" }}>Please enter the verification code you recieved on your email. </h2>

            <div className="form" style={{ margin: "0 auto", marginTop: "3rem" }}>
                <input type="number" placeholder='Verification Code' style={{ marginBottom: "0" }} onChange={(e) => { setCode(e.target.value) }} />
                {showResendBtn > 30 ? <p className="register_btn"><span onClick={() => {resendIt()}}>Resend Code</span></p> : <p className="register_btn">Resend Code in {30 - showResendBtn} seconds</p>}
                <button onClick={handleSubmit}>Verify</button>
            </div>
        </section>
    );
};

export default Email;
