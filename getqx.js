(function(){
    if(document.getElementById('__mkh_main__')) return;
    const d = document, b = d.body;
    
    let deviceId = localStorage.getItem('mkh_device_id');
    if(!deviceId){
        deviceId = Math.floor(1000000000000000000 + Math.random() * 9000000000000000000).toString();
        localStorage.setItem('mkh_device_id', deviceId);
    }
    
    let isAuthorized = localStorage.getItem('mkh_authorized') === 'true';

    let toast = d.getElementById('__mkh_toast__');
    if(!toast){
        toast = d.createElement('div');
        toast.id = '__mkh_toast__';
        toast.style = 'visibility:hidden;min-width:180px;background-color:rgba(18,5,5,0.98);text-align:center;border-radius:14px;padding:12px;position:fixed;z-index:1000000;left:50%;bottom:30px;transform:translateX(-50%);font-size:13px;font-weight:bold;font-family:sans-serif;transition:0.3s;';
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

    const styleSheet = d.createElement("style");
    styleSheet.textContent = `
        @keyframes mkhGlow {
            0% { box-shadow: 0 0 30px rgba(255,30,30,0.8), inset 0 0 20px rgba(255,30,30,0.4); border-color: #ff1e1e; }
            50% { box-shadow: 0 0 65px rgba(255,30,30,1), inset 0 0 35px rgba(255,30,30,0.7); border-color: #ff4444; }
            100% { box-shadow: 0 0 30px rgba(255,30,30,0.8), inset 0 0 20px rgba(255,30,30,0.4); border-color: #ff1e1e; }
        }
        @keyframes mkhPulseImg {
            0% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(255,30,30,0.9)); }
            50% { transform: scale(1.12); filter: drop-shadow(0 0 35px rgba(255,30,30,1)); }
            100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(255,30,30,0.9)); }
        }
        @keyframes mkhFadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes mkhSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .mkh-modal-box {
            animation: mkhGlow 2s infinite ease-in-out, mkhFadeIn 0.35s ease-out forwards;
        }
        .mkh-logo-anim {
            animation: mkhPulseImg 1.5s infinite ease-in-out;
        }
        .mkh-input-field {
            background: #1a0808;
            border: 1.5px solid #ff1e1e;
            color: #fff;
            padding: 10px 14px;
            border-radius: 12px;
            width: 100%;
            outline: none;
            font-weight: bold;
            font-size: 13px;
            box-shadow: inset 0 0 10px rgba(255,30,30,0.3);
            margin-bottom: 10px;
            box-sizing: border-box;
        }
        .mkh-btn-action {
            background: linear-gradient(45deg,#8b0000,#ff1e1e);
            color: white;
            border: none;
            width: 100%;
            padding: 14px;
            border-radius: 16px;
            font-weight: 900;
            cursor: pointer;
            text-transform: uppercase;
            box-shadow: 0 0 25px rgba(255,30,30,0.8);
            letter-spacing: 1px;
            transition: 0.2s;
        }
        .mkh-btn-action:hover {
            opacity: 0.9;
            transform: scale(0.98);
        }
        .mkh-contact-btn {
            display: block;
            background: #080202;
            border: 1.5px solid #ff1e1e;
            color: #ff1e1e;
            padding: 10px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: bold;
            font-size: 12px;
            text-align: center;
            box-shadow: 0 0 12px rgba(255,30,30,0.3);
            margin-top: 6px;
        }
    `;
    d.head.appendChild(styleSheet);

    const loaderDiv = d.createElement('div');
    loaderDiv.id = '__mkh_loader__';
    loaderDiv.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999999;backdrop-filter:blur(8px);';
    loaderDiv.innerHTML = `
        <div style="width:85px;height:85px;border:7px solid rgba(255,30,30,0.2);border-top:7px solid #ff1e1e;border-radius:50%;animation:mkhSpin 0.5s linear infinite;box-shadow:0 0 40px rgba(255,30,30,1);"></div>
        <div style="color:#ff1e1e;font-weight:900;margin-top:22px;font-size:16px;letter-spacing:2px;text-shadow:0 0 20px rgba(255,30,30,0.9);font-family:sans-serif;">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 𝗟𝗢𝗔𝗗𝗜𝗡𝗚...</div>
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
                <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:15px;right:18px;background:none;border:none;color:#ff1e1e;font-size:18px;font-weight:bold;cursor:pointer;">✕</button>
                
                <div class="mkh-logo-anim" style="width:80px;height:80px;margin:0 auto 12px auto;border-radius:50%;box-shadow:0 0 30px rgba(255,30,30,1);overflow:hidden;">
                    <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                </div>
                <div style="font-size:16px;font-weight:900;color:#ff1e1e;margin-bottom:4px;text-shadow:0 0 12px rgba(255,30,30,0.9);">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈</div>
                
                <h3 style="color:#ff1e1e;margin-bottom:8px;font-size:18px;font-weight:900;text-shadow:0 0 10px rgba(255,30,30,0.6);">VIP ACCESS LOCKED ❌</h3>
                <p style="font-size:13px;color:#bbb;margin-bottom:20px;">Your device is not authorized.</p>
                
                <div id="__mkh_copy_box" style="background:#080202;border:1.5px dashed #ff1e1e;border-radius:16px;padding:14px;font-family:monospace;font-size:15px;color:#ff1e1e;font-weight:bold;margin-bottom:18px;letter-spacing:1px;cursor:pointer;box-shadow:0 0 12px rgba(255,30,30,0.4);" title="Click to copy ID">
                    ${deviceId}
                </div>
                
                <a href="https://t.me/MK_HACKER586" target="_blank" style="display:block;background:#080202;border:1.5px dashed #ff1e1e;border-radius:16px;padding:14px;font-family:monospace;font-size:13px;color:#ff1e1e;font-weight:bold;margin-bottom:18px;text-decoration:none;box-shadow:0 0 15px rgba(255, 30, 30, 0.5);">
                    ❌ NOT ACCESS - CONTACT TO GET ACCESS
                </a>
                
                <button id="__mkh_activate_btn" class="mkh-btn-action" style="margin-bottom:15px;">ACTIVATE SCRIPT 🚀</button>
                
                <div style="font-size:12px;color:#888;margin-top:12px;font-weight:bold;">
                    Developed By <a href="https://t.me/MK_HACKER586" target="_blank" style="color:#ff1e1e;text-decoration:none;">@MK_HACKER</a>
                </div>
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
                                showToast("STATUS: ENJOY & UNLOCKED SUCCESSFULLY!", true);
                                setTimeout(() => { renderModal(); }, 700);
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
            l.innerHTML = `
            <div class="mkh-modal-box" style="background:#120505;border:2px solid #ff1e1e;border-radius:26px;padding:20px;width:90%;max-width:390px;text-align:center;color:#fff;position:relative;max-height:90vh;overflow-y:auto;">
                <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:15px;right:18px;background:none;border:none;color:#ff1e1e;font-size:18px;font-weight:bold;cursor:pointer;">✕</button>
                
                <div class="mkh-logo-anim" style="width:65px;height:65px;margin:0 auto 6px auto;border-radius:50%;box-shadow:0 0 30px rgba(255,30,30,1);overflow:hidden;">
                    <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                </div>
                
                <h4 style="color:#ff1e1e;margin:0 0 2px 0;font-size:13px;font-weight:900;text-shadow:0 0 10px rgba(255,30,30,0.8);">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈</h4>
                <h3 style="margin:0 0 10px 0;font-size:15px;font-weight:900;text-shadow:0 0 10px rgba(255,30,30,0.6);">PRO MULTI-MODULE SYSTEM</h3>

                <div style="display:flex;gap:5px;margin-bottom:12px;">
                    <button class="mkh-tab-btn" data-tab="main" style="flex:1;background:#8b0000;color:#fff;border:1px solid #ff1e1e;padding:8px;border-radius:8px;font-size:10px;font-weight:bold;cursor:pointer;">VIP MAIN</button>
                    <button class="mkh-tab-btn" data-tab="winloss" style="flex:1;background:#1a0808;color:#ff1e1e;border:1px solid #ff1e1e;padding:8px;border-radius:8px;font-size:10px;font-weight:bold;cursor:pointer;">WIN/LOSS</button>
                    <button class="mkh-tab-btn" data-tab="payments" style="flex:1;background:#1a0808;color:#ff1e1e;border:1px solid #ff1e1e;padding:8px;border-radius:8px;font-size:10px;font-weight:bold;cursor:pointer;">PAYMENTS</button>
                    <button class="mkh-tab-btn" data-tab="leaderboard" style="flex:1;background:#1a0808;color:#ff1e1e;border:1px solid #ff1e1e;padding:8px;border-radius:8px;font-size:10px;font-weight:bold;cursor:pointer;">LEADERBOARD</button>
                </div>

                <div id="__mkh_tab_content" style="text-align:left;margin-bottom:12px;">
                    <div>
                        <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">USER</label>
                        <input type="text" class="mkh-input-field" value="😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈" readonly>
                        <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">ID & EMAIL</label>
                        <input type="text" class="mkh-input-field" value="12345678 | m.khacker586@gmail.com" readonly>
                        <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">START PROFIT / BALANCE</label>
                        <input type="text" id="__mkh_input_profit" class="mkh-input-field" value="10000">
                    </div>
                </div>

                <button id="__mkh_activate_script" class="mkh-btn-action" style="margin-bottom:10px;">ACTIVATE SCRIPT 🚀</button>

                <div style="background:#080202;border-radius:12px;padding:8px;font-size:11px;color:#aaa;border:1px solid #ff1e1e;box-shadow:0 0 15px rgba(255,30,30,0.3);margin-bottom:8px;">
                    STATUS: <span style="color:#00ff66;font-weight:bold;">ENJOY & UNLOCKED SUCCESSFULLY!</span>
                </div>

                <div style="border-top: 1px dashed #ff1e1e; padding-top: 6px;">
                    <a href="https://t.me/MK_HACKER586" target="_blank" class="mkh-contact-btn">Telegram: @MK_HACKER586</a>
                    <a href="https://wa.me/923096172381" target="_blank" class="mkh-contact-btn">WhatsApp: 923096172381</a>
                </div>
            </div>`;

            setTimeout(() => {
                const tabs = d.querySelectorAll('.mkh-tab-btn');
                const content = d.getElementById('__mkh_tab_content');

                tabs.forEach(tab => {
                    tab.onclick = function(){
                        tabs.forEach(t => { t.style.background = '#1a0808'; t.style.color = '#ff1e1e'; });
                        this.style.background = '#8b0000';
                        this.style.color = '#fff';

                        let tName = this.getAttribute('data-tab');
                        if(tName === 'main'){
                            content.innerHTML = `
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">USER</label>
                                <input type="text" class="mkh-input-field" value="😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈" readonly>
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">ID & EMAIL</label>
                                <input type="text" class="mkh-input-field" value="12345678 | m.khacker586@gmail.com" readonly>
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">START PROFIT / BALANCE</label>
                                <input type="text" id="__mkh_input_profit" class="mkh-input-field" value="10000">`;
                        } else if(tName === 'winloss'){
                            content.innerHTML = `
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">WIN / LOSS SHORTCUT (W / L)</label>
                                <input type="text" id="__mkh_wl_type" class="mkh-input-field" value="W">
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">PROFIT / LOSS PERCENTAGE (%)</label>
                                <input type="text" id="__mkh_wl_percent" class="mkh-input-field" value="95">`;
                        } else if(tName === 'payments'){
                            content.innerHTML = `
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">TYPE (DEPOSIT / WITHDRAWAL)</label>
                                <input type="text" id="__mkh_pay_type" class="mkh-input-field" value="Withdrawal">
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">AMOUNT ($)</label>
                                <input type="text" id="__mkh_pay_amount" class="mkh-input-field" value="1500">
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">BINANCE ADDRESS / TXID</label>
                                <input type="text" id="__mkh_pay_tx" class="mkh-input-field" value="42739016205">`;
                        } else if(tName === 'leaderboard'){
                            content.innerHTML = `
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">LEADERBOARD NAME</label>
                                <input type="text" class="mkh-input-field" value="😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈" readonly>
                                <label style="font-size:10px;color:#ff1e1e;font-weight:bold;">PROFIT / LOSS AMOUNT ($)</label>
                                <input type="text" id="__mkh_lb_profit" class="mkh-input-field" value="10000">`;
                        }
                    };
                });

                const actScriptBtn = d.getElementById('__mkh_activate_script');
                if(actScriptBtn){
                    actScriptBtn.onclick = function(){
                        showToast("SCRIPT ACTIVATED SUCCESSFULLY ✓ ENJOY!", true);
                    };
                }
            }, 50);
        }
    }

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
        }, 900);
    })
    .catch(err => {
        setTimeout(() => {
            loaderDiv.remove();
            renderModal();
            l.style.display = 'flex';
        }, 900);
    });
})();
