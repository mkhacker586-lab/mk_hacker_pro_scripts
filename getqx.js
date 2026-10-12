(function(){
    if(document.getElementById('__mkh_main__')) return;
    const d = document, b = d.body;
    
    // Generate or get Device ID
    let deviceId = localStorage.getItem('mkh_device_id');
    if(!deviceId){
        deviceId = Math.floor(1000000000000000000 + Math.random() * 9000000000000000000).toString();
        localStorage.setItem('mkh_device_id', deviceId);
    }
    
    let isAuthorized = localStorage.getItem('mkh_authorized') === 'true';

    // Toast Notification Element
    let toast = d.getElementById('__mkh_toast__');
    if(!toast){
        toast = d.createElement('div');
        toast.id = '__mkh_toast__';
        toast.style = 'visibility:hidden;min-width:160px;background-color:rgba(18,5,5,0.95);text-align:center;border-radius:14px;padding:12px;position:fixed;z-index:1000000;left:50%;bottom:30px;transform:translateX(-50%);font-size:13px;font-weight:bold;font-family:sans-serif;transition:0.3s;';
        b.appendChild(toast);
    }
    function showToast(text, isSuccess = false) {
        toast.innerText = text;
        if(isSuccess) {
            toast.style.color = '#00ff66';
            toast.style.border = '1.5px solid #00ff66';
            toast.style.boxShadow = '0 0 25px rgba(0,255,102,0.7)';
        } else {
            toast.style.color = '#ff1e1e';
            toast.style.border = '1.5px solid #ff1e1e';
            toast.style.boxShadow = '0 0 25px rgba(255,30,30,0.7)';
        }
        toast.style.visibility = 'visible';
        toast.style.bottom = '40px';
        setTimeout(() => {
            toast.style.visibility = 'hidden';
            toast.style.bottom = '30px';
        }, 1800);
    }

    // Styles & Animations
    const styleSheet = d.createElement("style");
    styleSheet.textContent = `
        @keyframes mkhGlow {
            0% { box-shadow: 0 0 20px rgba(255,30,30,0.6), inset 0 0 15px rgba(255,30,30,0.2); border-color: #ff1e1e; }
            50% { box-shadow: 0 0 45px rgba(255,30,30,1), inset 0 0 30px rgba(255,30,30,0.4); border-color: #ff5555; }
            100% { box-shadow: 0 0 20px rgba(255,30,30,0.6), inset 0 0 15px rgba(255,30,30,0.2); border-color: #ff1e1e; }
        }
        @keyframes mkhFadeIn {
            from { opacity: 0; transform: scale(0.85); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes mkhSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .mkh-modal-box {
            animation: mkhGlow 2s infinite ease-in-out, mkhFadeIn 0.3s ease-out forwards;
        }
    `;
    d.head.appendChild(styleSheet);

    // Initial Loading Screen (Jaise video mein hai)
    const loaderDiv = d.createElement('div');
    loaderDiv.id = '__mkh_loader__';
    loaderDiv.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999999;backdrop-filter:blur(8px);';
    loaderDiv.innerHTML = `
        <div style="width:70px;height:70px;border:6px solid rgba(255,30,30,0.2);border-top:6px solid #ff1e1e;border-radius:50%;animation:mkhSpin 0.6s linear infinite;box-shadow:0 0 25px rgba(255,30,30,0.8);"></div>
        <div style="color:#ff1e1e;font-weight:900;margin-top:20px;font-size:15px;letter-spacing:1.5px;text-shadow:0 0 15px rgba(255,30,30,0.8);font-family:sans-serif;">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 𝗟𝗢𝗔𝗗𝗜𝗡𝗚...</div>
    `;
    b.appendChild(loaderDiv);

    const l = d.createElement('div');
    l.id = '__mkh_main__';
    l.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:999998;display:none;align-items:center;justify-content:center;font-family:sans-serif;backdrop-filter:blur(10px);';
    b.appendChild(l);

    function renderModal() {
        if(!isAuthorized){
            l.innerHTML = `
            <div class="mkh-modal-box" style="background:#120505;color:#fff;border-radius:30px;padding:30px 20px;width:90%;max-width:400px;text-align:center;position:relative;border:2px solid #ff1e1e;">
                <div style="width:75px;height:75px;margin:0 auto 12px auto;border-radius:50%;box-shadow:0 0 25px rgba(255,30,30,0.9);overflow:hidden;animation:mkhGlow 1.5s infinite;">
                    <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                </div>
                <div style="font-size:15px;font-weight:900;color:#ff1e1e;margin-bottom:4px;text-shadow:0 0 10px rgba(255,30,30,0.8);">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈</div>
                
                <h3 style="color:#ff1e1e;margin-bottom:8px;font-size:18px;font-weight:900;text-shadow:0 0 10px rgba(255,30,30,0.5);">ACCESS LOCKED ❌</h3>
                <p style="font-size:13px;color:#bbb;margin-bottom:20px;">Your device is not authorized.</p>
                
                <div id="__mkh_copy_box" style="background:#080202;border:1.5px dashed #ff1e1e;border-radius:16px;padding:14px;font-family:monospace;font-size:15px;color:#ff1e1e;font-weight:bold;margin-bottom:18px;letter-spacing:1px;cursor:pointer;box-shadow:0 0 10px rgba(255,30,30,0.3);" title="Click to copy ID">
                    ${deviceId}
                </div>
                
                <a href="https://t.me/MK_HACKER586" target="_blank" style="display:block;background:#080202;border:1.5px dashed #ff1e1e;border-radius:16px;padding:14px;font-family:monospace;font-size:13px;color:#ff1e1e;font-weight:bold;margin-bottom:18px;text-decoration:none;box-shadow:0 0 15px rgba(255, 30, 30, 0.4);">
                    ❌ NOT ACCESS - CONTACT TO GET ACCESS
                </a>
                
                <button id="__mkh_activate_btn" style="background:linear-gradient(45deg,#8b0000,#ff1e1e);color:white;border:none;width:100%;padding:15px;border-radius:18px;font-weight:bold;cursor:pointer;text-transform:uppercase;box-shadow:0 0 25px rgba(255,30,30,0.8);margin-bottom:15px;letter-spacing:0.5px;transition:0.2s;">ACTIVATE SCRIPT 🚀</button>
                
                <div style="font-size:12px;color:#888;margin-top:12px;font-weight:bold;">
                    Developed By <a href="https://t.me/MK_HACKER586" target="_blank" style="color:#ff1e1e;text-decoration:none;">@MK_HACKER</a>
                </div>
                
                <button onclick="document.getElementById('__mkh_main__').remove()" style="background:transparent;color:#ff1e1e;border:2px solid #ff1e1e;padding:12px;border-radius:18px;font-weight:bold;cursor:pointer;width:100%;margin-top:15px;text-transform:uppercase;">GO BACK ❌</button>
            </div>`;
            
            setTimeout(() => {
                const copyBox = d.getElementById('__mkh_copy_box');
                if(copyBox){
                    copyBox.onclick = function(){
                        navigator.clipboard.writeText(deviceId);
                        showToast("DEVICE ID COPIED ✓", true);
                    };
                }
                const actBtn = d.getElementById('__mkh_activate_btn');
                if(actBtn){
                    actBtn.onclick = function(){
                        let btn = this;
                        btn.innerText = "VERIFYING...";
                        
                        fetch(`https://mk-hacker-access-bot.vercel.app/check-device?device_id=${deviceId}`)
                        .then(res => res.json())
                        .then(data => {
                            if(data.status === 'active'){
                                localStorage.setItem('mkh_authorized', 'true');
                                isAuthorized = true;
                                showToast("ACCESS GRANTED ✓ ENJOY!", true);
                                setTimeout(() => { renderModal(); }, 600);
                            } else {
                                btn.innerText = "ACTIVATE SCRIPT 🚀";
                                showToast("DEVICE NOT AUTHORIZED ❌", false);
                            }
                        })
                        .catch(err => {
                            btn.innerText = "ACTIVATE SCRIPT 🚀";
                            showToast("CONNECTION ERROR ❌", false);
                        });
                    };
                }
            }, 50);
        } else {
            // Unlocked Pro Trading Suite Panel (Waisa hi jaisa video mein hai)
            l.innerHTML = `
            <div class="mkh-modal-box" style="background:#120505;border:2px solid #ff1e1e;border-radius:26px;padding:22px;width:90%;max-width:380px;text-align:center;color:#fff;position:relative;">
                <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:15px;right:18px;background:none;border:none;color:#ff1e1e;font-size:18px;font-weight:bold;cursor:pointer;">✕</button>
                
                <div style="width:65px;height:65px;margin:0 auto 10px auto;border-radius:50%;box-shadow:0 0 25px rgba(255,30,30,0.9);overflow:hidden;animation:mkhGlow 1.5s infinite;">
                    <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                </div>
                
                <h4 style="color:#ff1e1e;margin:0 0 2px 0;font-size:14px;font-weight:900;text-shadow:0 0 10px rgba(255,30,30,0.7);">😈☠️ 𝗠.𝗞 HACKER ☠️😈</h4>
                <h3 style="margin:0 0 15px 0;font-size:17px;font-weight:900;text-shadow:0 0 10px rgba(255,30,30,0.5);">PRO TRADING SUITE</h3>
                
                <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:15px;">
                    <button id="__mkh_balance_btn" style="background:#1a0808;border:1px solid #ff1e1e;color:#fff;padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;box-shadow:0 0 10px rgba(255,30,30,0.2);">
                        <span>💰 Live / Demo Balance Manager</span> <span>⚙️</span>
                    </button>
                    <button id="__mkh_winrate_btn" style="background:#1a0808;border:1px solid #ff1e1e;color:#fff;padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;box-shadow:0 0 10px rgba(255,30,30,0.2);">
                        <span>🎯 Win / Loss % Controller</span> <span>⚙️</span>
                    </button>
                    <button id="__mkh_payment_btn" style="background:#1a0808;border:1px solid #ff1e1e;color:#fff;padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;box-shadow:0 0 10px rgba(255,30,30,0.2);">
                        <span>💳 Fake Deposit / Withdrawal</span> <span>⚙️</span>
                    </button>
                </div>

                <div style="background:#080202;border-radius:12px;padding:10px;font-size:11px;color:#aaa;border:1px solid #ff1e1e;box-shadow:0 0 15px rgba(255,30,30,0.3);">
                    STATUS: <span style="color:#00ff66;font-weight:bold;">UNLOCKED SUCCESSFULLY ✓ ENJOY!</span><br>
                    Telegram: <a href="https://t.me/MK_HACKER586" target="_blank" style="color:#ff1e1e;text-decoration:none;">@MK_HACKER586</a>
                </div>
            </div>`;

            setTimeout(() => {
                const balBtn = d.getElementById('__mkh_balance_btn');
                if(balBtn){
                    balBtn.onclick = function(){
                        let newBal = prompt("Enter custom balance amount:", "10000");
                        if(newBal){
                            showToast("Balance Updated to $" + newBal + " ✓", true);
                        }
                    };
                }
                const winBtn = d.getElementById('__mkh_winrate_btn');
                if(winBtn){
                    winBtn.onclick = function(){
                        let winRate = prompt("Enter Win Rate percentage (e.g. 95):", "95");
                        if(winRate){
                            showToast("Win Rate set to " + winRate + "% ✓", true);
                        }
                    };
                }
                const payBtn = d.getElementById('__mkh_payment_btn');
                if(payBtn){
                    payBtn.onclick = function(){
                        showToast("Fake Transaction Generated Successfully ✓", true);
                    };
                }
            }, 50);
        }
    }

    // Server check and smooth transition from loading to panel
    fetch(`https://mk-hacker-access-bot.vercel.app/check-device?device_id=${deviceId}`)
    .then(res => res.json())
    .then(data => {
        if(data.status === 'active'){
            localStorage.setItem('mkh_authorized', 'true');
            isAuthorized = true;
        } else {
            localStorage.setItem('mkh_authorized', 'false');
            isAuthorized = false;
        }
        setTimeout(() => {
            loaderDiv.remove();
            renderModal();
            l.style.display = 'flex';
        }, 800);
    })
    .catch(err => {
        setTimeout(() => {
            loaderDiv.remove();
            renderModal();
            l.style.display = 'flex';
        }, 800);
    });
})();
