'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { TitleText } from '../components';
import Router, { useRouter } from 'next/router'


const Withdraw = () => {
    const router = useRouter()
    const { push } = useRouter();
    const [active, setActive] = useState(false);
    const [isOpen, setisOpen] = useState();
    const [userDetails, setUserDetails] = useState([]);
    const [userPlans, setUserPlans] = useState([]);
    const [wAmt, setWAmt] = useState(0);
    const [referralDetails, setReferralDetails] = useState([]);
    const [totalAMT, setTotalAMT] = useState(0);
    const [loader, setLoader] = useState(true);
    const [wallet, setWallet] = useState("");
    const [pendingWithdraw, setPendingWithdraw] = useState([]);
    const [confirmWithdraw, setConfirmWithdraw] = useState([]);
    const [planWiseCount, setPlanWiseCount] = useState({
        Basic: 0,
        Bronze: 0,
        Silver: 0,
        Gold: 0,
        Platinum: 0
    });
    const [totalCoinReceivable, setTotalCoinReceivable] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [displayPlan, setdisplayPlan] = useState();
    let finalAmt = 0;

    useEffect(() => {
        if (localStorage.getItem("status") == "false") {
            push("/")
        }
        const data = localStorage.getItem("email");
        getUser(data);
        return () => { };
    }, []);

    const getUser = async (email) => {
        setIsLoading(true);
        const getUser = await fetch("https://godot-main-server.vercel.app/getUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })

        const result = await getUser.json();
        const data = result.user.commissionDetail;
        setdisplayPlan(result.plans[result.plans.length - 1])
        setUserPlans(result.plans)
        setUserDetails(result.user)
        console.log(result.user);
        setReferralDetails(result.user.commissionDetail);

        const getPendingWithdraw = await fetch("https://godot-main-server.vercel.app/getWithdrawalList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result1 = await getPendingWithdraw.json();
        setPendingWithdraw(result1.user);

        const getConfirmWithdraw = await fetch("https://godot-main-server.vercel.app/getWithdrawalListOfPerson", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })

        const result2 = await getConfirmWithdraw.json();
        console.log(result2.user);

        setConfirmWithdraw(result2.user)

        var temp = 0;
        data.map((elem2) => {
            temp = temp + elem2.commission;
            switch (elem2.plan) {
                case "Basic":
                    setPlanWiseCount({ ...planWiseCount, ["Basic"]: planWiseCount.Basic += 1 })
                    break;
                case "Bronze":
                    setPlanWiseCount({ ...planWiseCount, ["Bronze"]: planWiseCount.Bronze += 1 })
                    break;
                case "Silver":
                    setPlanWiseCount({ ...planWiseCount, ["Silver"]: planWiseCount.Silver += 1 })
                    break;
                case "Gold":
                    setPlanWiseCount({ ...planWiseCount, ["Gold"]: planWiseCount.Gold += 1 })
                    break;
                case "Platinum":
                    setPlanWiseCount({ ...planWiseCount, ["Platinum"]: planWiseCount.Platinum += 1 })
                    break;
            }
        })
        setTotalAMT(temp);
        setTimeout(() => {
            setLoader(false);
        }, 1000);

        setIsLoading(false);
    }
    //filter array

    const result = referralDetails.filter((elem, index) => {
        if (displayPlan == "Basic") {
            return elem.plan == "Basic"
        } else if (displayPlan == "Bronze") {
            return elem.plan == "Basic" || elem.plan == "Bronze"
        } else if (displayPlan == "Silver") {
            return elem.plan == "Basic" || elem.plan == "Bronze" || elem.plan == "Silver"
        } else if (displayPlan == "Gold") {
            return elem.plan == "Basic" || elem.plan == "Bronze" || elem.plan == "Silver" || elem.plan == "Gold"
        } else if (displayPlan == "Platinum") {
            return elem
        }
    });

    //calculating lock commision

    var lockTotalTempAMT = 0;
    var filterTotal = 0;

    result.map((elem) => {
        filterTotal += elem.commission;
    })

    lockTotalTempAMT = totalAMT.toFixed(2) - filterTotal.toFixed(2);

    finalAmt = Math.abs(totalAMT - lockTotalTempAMT - userDetails.paidBalance - userDetails.pendingBalance).toFixed(2);

    const handleLogout = () => {
        localStorage.setItem("status", false)
        localStorage.removeItem("email")
        localStorage.removeItem("refer")
        push("/")
    }

    const handleSubmit = async () => {
        if (finalAmt >= 10 && finalAmt <= 20) {
            setIsLoading(true);
            const getUser = await fetch("https://godot-main-server.vercel.app/withdrawalRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userDetails.email, amount: finalAmt, plan: displayPlan, name: userDetails.name, wallet
                })
            })

            const result = await getUser.json();
            if (result.status == 200) {
                setisOpen(2)
                setIsLoading(false)
            }
        } else {
            setIsLoading(true);
            const getUser = await fetch("https://godot-main-server.vercel.app/withdrawalRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userDetails.email, amount: 20, plan: displayPlan, name: userDetails.name, wallet
                })
            })

            const result = await getUser.json();
            if (result.status == 200) {
                setisOpen(2)
                setIsLoading(false)
            }
        }
    }

    const openBox = async () => {
        var date = new Date();
        var today = JSON.stringify(date).split("T");
        var realToday = today[0].replace('"', "");
        // var realToday = "2023-06-13"

        if (userDetails.holdingDate == "") {
            if (finalAmt < 10) {
                alert("You can't withdraw amount!!!")
            } else if (userDetails.holdTransaction != 0) {
                alert("You have a pending withdrawal in process please wait.")
            } else {
                setisOpen(1)
            }
        } else if (userDetails.holdingDate == realToday) {
            setIsLoading(true)
            const getUser = await fetch("https://godot-main-server.vercel.app/removeHolding", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userDetails.email
                })
            })

            const result = await getUser.json();
            if (result.status == 200) {
                setisOpen(1)
                setIsLoading(false)
            }
        } else {
            alert(`You can request again for withdrawal after ${userDetails.holdingDate}`)
        }

    }

    // console.log(typeof(confirmWithdraw));

    return (
        <div style={{ minHeight: "100vh" }}>
            <section style={{ padding: "2rem 2rem 0 2rem" }} id="explore">
                <motion.nav
                    initial="hidden"
                    whileInView="show"
                    className={`${styles.xPaddings} relative`}
                >
                    <div className={active ? "navbar-slider showw" : "navbar-slider"}>
                        <div className={active ? "slider show" : "slider"}>
                            <div className="close" onClick={() => { setActive(!active) }} style={{ marginBottom: "3rem" }}>
                                <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 5L5 19M5.00001 5L19 19" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <ul>
                                {/* <li>More Information</li> */}
                                <li style={{ marginBottom: "2rem" }} onClick={() => { push(`/dashboard`) }}>Dashboard</li>
                                <li onClick={() => { handleLogout() }}>Log Out</li>
                            </ul>
                        </div>
                    </div>
                    <div className="absolute w-[50%] inset-0 gradient-01" />
                    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
                        <img
                            src="/1.png"
                            alt="logo"
                            className="w-[3rem] h-[3rem] object-contain"
                            style={{ cursor: "pointer" }}
                        />
                        <div></div>
                        <img
                            src="/menu.svg"
                            alt="menu"
                            className="w-[24px] h-[24px] object-contain"
                            style={{ cursor: "pointer" }}
                            onClick={() => { setActive(!active) }}
                        />
                    </div>
                </motion.nav>
                <div className="loader" style={isLoading ? { visibility: "visible" } : { visibility: "hidden" }}>
                    <span class="spinner spinner--quarter"></span>
                </div>

                <div className="navbar-slider showw" style={isOpen == 1 ? { visibility: 'visible' } : { visibility: 'hidden' }} >
                    <div className="purchase_card">
                        <div className="nav flex w-[85%] flex-row justify-between">
                            <div className="close grow-0" onClick={() => { setisOpen() }}>
                                <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 5L5 19M5.00001 5L19 19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="heading grow" style={{ textAlign: 'center', fontSize: "2rem", marginTop: "1rem" }}>Withdrawal Amount: {finalAmt < 20 ? finalAmt : 20} $</div>


                        <input type="text" placeholder='Enter your wallet address here' onChange={(e) => { setWallet(e.target.value) }} />


                        <p className="btn-grad" onClick={() => { handleSubmit() }} >Submit</p>
                    </div>
                </div>

                <div className="navbar-slider showw" style={isOpen == 2 ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                    <div className="purchase_card">
                        <p className="heading">Congratulations 🎉</p>

                        <p className="disclaimer">Note: Please wait for 24 hour untill we verify your transaction till then sit back and relax.</p>

                        <p className="btn-grad" onClick={() => { setisOpen(), router.reload() }}>Continue</p>
                    </div>
                </div>

                <TitleText
                    title={<>WALLET</>}
                    textStyles="text-center"
                />
                <div className="stats_card" style={{ marginTop: '3rem' }}>
                    <div className="card-1 common wallet" style={{ height: '25vh' }}>
                        <p className="count">$ {(Math.abs(totalAMT - lockTotalTempAMT - userDetails.paidBalance - userDetails.pendingBalance)).toFixed(2)}</p>
                        <p className='coin' style={{ color: "lightgreen" }}>{(Math.abs(totalAMT - lockTotalTempAMT - userDetails.paidBalance - userDetails.pendingBalance)).toFixed(2) / 0.000004} $GDOT</p>
                        <p className="card_title">Profit Earned</p>
                    </div>
                    <div className="card-4 common wallet" style={{ height: '25vh' }}>
                        <p className="count">$ {userDetails.paidBalance}</p>
                        <p className='coin' style={{ color: "lightgreen" }}>{userDetails.paidBalance} $GDOT</p>
                        <p className="card_title">Total Profit Paid</p>
                    </div>
                    <div className="card-0 common wallet" style={{ height: '25vh' }}>
                        <p className="count">$ {userDetails.pendingBalance}</p>
                        <p className='coin' style={{ color: "lightgreen" }}>{userDetails.pendingBalance} $GDOT</p>
                        <p className="card_title">Pending Amount</p>
                    </div>
                </div>
                <div className="withdraw_btn_form">
                    <button className="withdraw_btn" onClick={openBox}>Withdraw Amount</button>
                </div>

            </section>
            <div class="container">
                <ul class="responsive-table">
                    <li class="table-header">
                        <div class="col col-3">Date and Time</div>
                        <div class="col col-1">Amount</div>
                        <div class="col col-4">Status</div>
                    </li>
                    {pendingWithdraw != undefined ? pendingWithdraw.map((elem, index) => {
                        let dateAndTime = elem.createdAt;
                        let date = dateAndTime.split("T");
                        let time = date[1].split(".");
                        return (
                            <li class="table-row" key={index} style={{ color: "black" }}>
                                <div class="col col-3" data-label="Job Id">{date[0]} {time[0]}</div>
                                <div class="col col-1" data-label="Amount">$ {elem.amount}</div>
                                <div class="col col-4" data-label="Payment Status">PENDING</div>
                            </li>
                        )
                    }) : ""}
                    {confirmWithdraw != undefined ? confirmWithdraw.map((elem, index) => {
                        let dateAndTime = elem.createdAt;
                        let date = dateAndTime.split("T");
                        let time = date[1].split(".");
                        return (
                            <li class="table-row" key={index} style={{ color: "black" }}>
                                <div class="col col-3" data-label="Job Id">{date[0]} {time[0]}</div>
                                <div class="col col-1" data-label="Amount">$ {elem.amount}</div>
                                <div class="col col-4" data-label="Payment Status">RECEIVED</div>
                            </li>
                        )
                    }) : ""}
                </ul>
            </div>
        </div >
    );
};

export default Withdraw;
