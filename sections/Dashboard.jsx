'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { navVariants } from '../utils/motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { push } = useRouter();

  const [active, setActive] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [userPlans, setUserPlans] = useState([]);
  const [referralDetails, setReferralDetails] = useState([]);
  const [totalAMT, setTotalAMT] = useState(0);
  const [loader, setLoader] = useState(true);
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

  useEffect(() => {
    if (localStorage.getItem("status") == "false") {
      push("/")
    }
    const data = localStorage.getItem("email");
    getUser(data);
    return () => { };
  }, []);

  useEffect(() => {
    // get Total Coin Receivable Value

    let totalCoin = 0;
    userPlans.map((elem) => {
      switch (elem) {
        case "Basic":
          totalCoin = totalCoinReceivable + (20 / 0.000004);
          setTotalCoinReceivable(totalCoin)
          break;
        case "Bronze":
          totalCoin = totalCoinReceivable + (50 / 0.000004);
          setTotalCoinReceivable(totalCoin)
          break;
        case "Silver":
          totalCoin = totalCoinReceivable + (100 / 0.000004);
          setTotalCoinReceivable(totalCoin)
          break;
        case "Gold":
          totalCoin = totalCoinReceivable + (200 / 0.000004);
          setTotalCoinReceivable(totalCoin)
          break;
        case "Platinum":
          totalCoin = totalCoinReceivable + (500 / 0.000004);
          setTotalCoinReceivable(totalCoin)
          break;
      }
    })
    return () => { };
  }, [userDetails]);

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
    setReferralDetails(result.user.commissionDetail);

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

  const handleLogout = () => {
    localStorage.setItem("status", false)
    localStorage.removeItem("email")
    localStorage.removeItem("refer")
    push("/")
  }

  return (
    <>
      <div className="bg-primary-black" style={{ width: '100%', height: 'auto' }}>
        {isLoading ? <><div className="loader">
          <span class="spinner spinner--quarter"></span>
        </div></> : <>
          <div className="relative">
            <div className="gradient-02 z-0" />
            <div className="navbar">
              <motion.nav
                initial="hidden"
                whileInView="show"
                style={{ paddingTop: "2rem" }}
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
                      <li style={userDetails.currentPlans != 0 ? { marginBottom: "2rem" } : { display: 'none' }} onClick={() => { push(`/multipurchase`) }}>SEED ROUND</li>
                      <li style={userDetails.currentPlans == 0 ? { marginBottom: "2rem" } : { display: 'none' }} onClick={() => { push(`/purchase?email=${userDetails.email}&referredBy=${localStorage.getItem("refer")}&name=${userDetails.name}&id=guest`) }}>SEED ROUND</li>
                      <li style={{ marginBottom: "2rem" }} onClick={() => { push(`/withdraw`) }}>Wallet</li>
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

              <motion.nav
                variants={navVariants}
                initial="hidden"
                whileInView="show"
                className={`${styles.xPaddings} py-8 relative`}
              >
                <div className="dashboard_title margin_bottom">
                  <div class="nft" style={{ backgroundColor: "rgb(149, 236, 149)", padding: "0" }}>
                    <div class='creator'>
                      <div className='first'>
                        <p className='subtitle'>GDOT Price</p>
                        <p className='coin'>$ 0.000004</p>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className="dashboard_title">
                  <div>
                    <h1>Welcome</h1>
                    <h2>{userDetails.name} <p className='subtitle' style={{ marginTop: "0", color: "#71ff92" }}>[{displayPlan}]</p></h2>
                  </div>

                  <div class="nft">
                    <div class='creator'>
                      <div className='first'>
                        <p className='subtitle'>Max Receivable GODOT</p>
                        <p className='coin'>{(totalCoinReceivable + userDetails.currentBalance + ((Math.abs(totalAMT - lockTotalTempAMT - userDetails.paidBalance)).toFixed(2) / 0.000004))}</p>
                        <p className='coin' style={{color: "lightgreen"}}>({((totalCoinReceivable + userDetails.currentBalance + ((Math.abs(totalAMT - lockTotalTempAMT - userDetails.paidBalance)).toFixed(2) / 0.000004)) * 0.000004).toFixed(2)} $)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="nft">
                  <div class='creator'>
                    <div className='first'>
                      <p className='subtitle'>Share your referral link and start earning GODOT.</p>
                    </div>
                    <div className='second flex flex-row justify-between'>
                      <p className="code">{userDetails.referCode}</p>
                      <p className="btn-grad" onClick={() => { navigator.clipboard.writeText(`www.godotnetwork.com/register?id=${userDetails.referCode}`) }} >Copy Invite Link</p>
                    </div>
                  </div>
                </div>
              </motion.nav>

              <motion.nav
                variants={navVariants}
                initial="hidden"
                whileInView="show"
                className={`${styles.xPaddings} py-8 relative`}
              >
                <div className="dashboard_title mt-1 mb-7">
                  <h2 style={{ fontSize: "2rem" }}>Your stats</h2>
                </div>
                <div className="stats_card">
                  <div className="card-0 common">
                    <p className="count">{userDetails.currentBalance}</p>
                    <p className="card_title">GDOTS</p>
                  </div>
                  <div className="card-1 common">
                    <p className="count">{(userDetails.currentBalance - 10000) / 1000}</p>
                    <p className="card_title">Team</p>
                  </div>
                  <div className="card-2 common">
                    <p className="count">$ {userDetails.paidBalance}</p>
                    <p className="card_title">GDOT Withdrawal</p>
                  </div>
                  <div className="card-3 common">
                    <p className="count">$ {(Math.abs(totalAMT - lockTotalTempAMT - userDetails.paidBalance - userDetails.pendingBalance)).toFixed(2)}</p>
                    <p className="card_title">Profits</p>
                  </div>
                  <div className="card-4 common">
                    <svg className='i-btn' onClick={() => { push("/faq") }} xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
                      <title />
                      <g id="Complete">
                        <g id="info-circle">
                          <g>
                            <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="12" y2="16" />
                            <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="8" />
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p className="count">$ {lockTotalTempAMT}</p>
                    <p className="card_title">Locked Profits</p>
                  </div>
                </div>
              </motion.nav>
            </div>
          </div>
        </>}
      </div>
    </>
  )
}

export default Dashboard

