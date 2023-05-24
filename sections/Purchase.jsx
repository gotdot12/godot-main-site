'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { TitleText } from '../components';
import { useRouter } from 'next/router'


const Purchase = () => {
    const router = useRouter()
    const { push } = useRouter();
    const [index, setindex] = useState(0);
    const [isOpen, setisOpen] = useState();
    const [plan, setPlan] = useState("Basic");
    const [wallet, setWallet] = useState("");
    const [rate, setRate] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const email = router.query.email;
    const refer = router.query.referredBy;
    const name = router.query.name;

    const handleSignInAsGeust = async () => {
        push(`/dashboard?email=${email}`)
        localStorage.setItem("refer", refer)
        localStorage.setItem("status", true)
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const res = await fetch("https://godot-main-server.vercel.app/beforePurchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                plan, email, name, refer, wallet
            })
        })
        const statusCode = res.status;

        if (statusCode == 200) {
            setIsLoading(false);
            setisOpen(2);
        } else {
            alert("User Not Found!!!")
        }
    }

    return (
        <section className={`${styles.paddings}`} id="explore">
            <div className="loader" style={isLoading ? { visibility: "visible" } : { visibility: "hidden" }}>
                <span class="spinner spinner--quarter"></span>
            </div>
            <div className="navbar-slider showw" style={isOpen == 0 ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                <div className="purchase_card">
                    <div className="nav flex w-[85%] flex-row justify-between">
                        <div className="heading grow" style={{ textAlign: 'center' }}>Step 1 of 2</div>
                        <div className="close grow-0" onClick={() => { setisOpen() }}>
                            <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24" fill="none">
                                <path d="M19 5L5 19M5.00001 5L19 19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="qr_code">
                        <img
                            src="/qr.jpeg"
                            alt="menu"
                            className="w-[18rem] h-[18rem] object-contain"
                        />
                    </div>

                    <div className="plan">
                        <p className="card_title">{plan}</p>
                        <p className="count">{rate} BUSD</p>
                    </div>

                    <div className="wallet_address mb-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Wallert Address: 0x5E3F....3131</p> <span className='ml-3' style={{ cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText('0x5E3Fb17f18aA280A7be977b55c8da8b127b23131') }}><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none">
                        <g id="Edit / Copy">
                            <path id="Vector" d="M9 9V6.2002C9 5.08009 9 4.51962 9.21799 4.0918C9.40973 3.71547 9.71547 3.40973 10.0918 3.21799C10.5196 3 11.0801 3 12.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07967 21.0002 6.19978V11.7998C21.0002 12.9199 21.0002 13.48 20.7822 13.9078C20.5905 14.2841 20.2839 14.5905 19.9076 14.7822C19.4802 15 18.921 15 17.8031 15H15M9 9H6.2002C5.08009 9 4.51962 9 4.0918 9.21799C3.71547 9.40973 3.40973 9.71547 3.21799 10.0918C3 10.5196 3 11.0801 3 12.2002V17.8002C3 18.9203 3 19.4801 3.21799 19.9079C3.40973 20.2842 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H11.8036C12.9215 21 13.4805 21 13.9079 20.7822C14.2842 20.5905 14.5905 20.2839 14.7822 19.9076C15 19.4802 15 18.921 15 17.8031V15M9 9H11.8002C12.9203 9 13.4801 9 13.9079 9.21799C14.2842 9.40973 14.5905 9.71547 14.7822 10.0918C15 10.5192 15 11.079 15 12.1969L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                    </svg></span></div>
                    <p className="disclaimer">Note: Please send only BUSD to this wallet.</p>
                    <p className="btn-grad" onClick={() => { setisOpen(1) }}>Continue</p>
                </div>
            </div>

            <div className="navbar-slider showw" style={isOpen == 1 ? { visibility: 'visible' } : { visibility: 'hidden' }} >
                <div className="purchase_card">
                    <div className="nav flex w-[85%] flex-row justify-between">
                        <div className="close grow-0" onClick={() => { setisOpen(0) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="#000000" />
                            </svg>
                        </div>
                        <div className="heading grow" style={{ textAlign: 'center' }}>Step 2 of 2</div>
                    </div>


                    <input type="text" placeholder='Enter your wallet address here' onChange={(e) => { setWallet(e.target.value) }} />


                    <p className="btn-grad" onClick={() => { handleSubmit() }} >Submit</p>
                </div>
            </div>

            <div className="navbar-slider showw" style={isOpen == 2 ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                <div className="purchase_card">
                    <p className="heading">Congratulations 🎉</p>

                    <p className="disclaimer">Note: Please wait for 24 hour untill we verify your transaction till then sit back and relax.</p>

                    <p className="btn-grad" onClick={() => { localStorage.setItem("status", true), push(`/dashboard?email=${email}`) }}>Continue</p>
                </div>
            </div>


            <TitleText
                title={<>SEED ROUND ALLOCATION</>}
                textStyles="text-center"
            />
            <div className="stats_card" style={{ marginTop: '8rem' }}>
                <div className="card-1 common" onClick={() => { setindex(0); setPlan("Basic"); setRate(20); }} style={index == 0 ? { height: '25vh' } : { height: '25vh', opacity: '0.2' }}>
                    <p className="card_title">Basic</p>
                    <p className="count">20 BUSD</p>
                </div>
                <div className="card-4 common" onClick={() => { setindex(1); setPlan("Bronze"); setRate(50); }} style={index == 1 ? { height: '25vh' } : { height: '25vh', opacity: '0.2' }}>
                    <p className="card_title">Bronze</p>
                    <p className="count">50 BUSD</p>
                </div>
                <div className="card-0 common" onClick={() => { setindex(2); setPlan("Silver"); setRate(100); }} style={index == 2 ? { height: '25vh' } : { height: '25vh', opacity: '0.2' }}>
                    <p className="card_title">Silver</p>
                    <p className="count">100 BUSD</p>
                </div>
                <div className="card-4 common" onClick={() => { setindex(3); setPlan("Gold"); setRate(200); }} style={index == 3 ? { height: '25vh' } : { height: '25vh', opacity: '0.2' }}>
                    <p className="card_title">Gold</p>
                    <p className="count">200 BUSD</p>
                </div>
                <div className="card-2 common" onClick={() => { setindex(4); setPlan("Platinum"); setRate(500); }} style={index == 4 ? { height: '25vh' } : { height: '25vh', opacity: '0.2' }}>
                    <p className="card_title">Platinum</p>
                    <p className="count">500 BUSD</p>
                </div>
            </div>

            <p className="btn-grad purchase" style={{ width: "20rem", height: "5rem", fontSize: "1.2rem" }} onClick={() => { index > -1 ? setisOpen(0) : alert("Please select a plan...") }}>Purchase</p>

            {router.query.id == "guest" ? <></> : <p className="btn-grad purchase" style={{ marginTop: "2rem", backgroundImage: "linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%)" }} onClick={() => { handleSignInAsGeust() }}>Enter For FREE</p>}
        </section>
    );
};

export default Purchase;
