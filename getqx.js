(function(){
    if(document.getElementById('__mkh_main__')) return;
    const d = document, b = d.body;
    
    let deviceId = localStorage.getItem('mkh_device_id');
    if(!deviceId){
        deviceId = Math.floor(100000000 + Math.random() * 900000000).toString();
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
            0% { box-shadow: 0 0 35px rgba(255,30,30,0.9), inset 0 0 20px rgba(255,30,30,0.4); border-color: #ff1e1e; }
            50% { box-shadow: 0 0 70px rgba(255,30,30,1), inset 0 0 35px rgba(255,30,30,0.7); border-color: #ff4444; }
            100% { box-shadow: 0 0 35px rgba(255,30,30,0.9), inset 0 0 20px rgba(255,30,30,0.4); border-color: #ff1e1e; }
        }
        @keyframes mkhPulseImg {
            0% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(255,30,30,0.9)); }
            50% { transform: scale(1.12); filter: drop-shadow(0 0 35px rgba(255,30,30,1)); }
            100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(255,30,30,0.9)); }
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
            background: #120505;
            border: 2.5px solid #ff1e1e;
            border-radius: 28px;
            padding: 22px;
            width: 90%;
            max-width: 360px;
            max-height: 85vh;
            overflow-y: auto;
            text-align: center;
            color: #fff;
            position: relative;
            box-sizing: border-box;
            pointer-events: auto !important;
        }
        .mkh-logo-anim {
            animation: mkhPulseImg 1.5s infinite ease-in-out;
            width: 70px;
            height: 70px;
            margin: 0 auto 8px auto;
            border-radius: 50%;
            box-shadow: 0 0 25px rgba(255,30,30,0.9);
            overflow: hidden;
            border: 2px solid #ff1e1e;
        }
        .mkh-input-field {
            background: #1a0808;
            border: 1.5px solid #ff1e1e;
            color: #fff;
            padding: 10px 14px;
            border-radius: 14px;
            width: 100%;
            outline: none;
            font-weight: bold;
            font-size: 13px;
            box-shadow: inset 0 0 10px rgba(255,30,30,0.3);
            margin-bottom: 8px;
            box-sizing: border-box;
            text-align: center;
            pointer-events: auto !important;
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
            margin-top: 5px;
            pointer-events: auto !important;
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
            pointer-events: auto !important;
        }
    `;
    d.head.appendChild(styleSheet);

    const loaderDiv = d.createElement('div');
    loaderDiv.id = '__mkh_loader__';
    loaderDiv.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999999;backdrop-filter:blur(8px);';
    loaderDiv.innerHTML = `
        <div style="width:75px;height:75px;border:6px solid rgba(255,30,30,0.2);border-top:6px solid #ff1e1e;border-radius:50%;animation:mkhSpin 0.5s linear infinite;box-shadow:0 0 35px rgba(255,30,30,1);"></div>
        <div style="color:#ff1e1e;font-weight:900;margin-top:20px;font-size:15px;letter-spacing:1.5px;text-shadow:0 0 15px rgba(255,30,30,0.9);font-family:sans-serif;">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 𝗟𝗢𝗔𝗗𝗜𝗡𝗚...</div>
    `;
    b.appendChild(loaderDiv);

    const l = d.createElement('div');
    l.id = '__mkh_main__';
    l.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:999998;display:none;align-items:center;justify-content:center;font-family:sans-serif;backdrop-filter:blur(10px);pointer-events:auto;';
    b.appendChild(l);

    function renderModal() {
        if(!isAuthorized){
            l.innerHTML = `
            <div class="mkh-modal-box">
                <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:15px;right:18px;background:none;border:none;color:#ff1e1e;font-size:18px;font-weight:bold;cursor:pointer;">✕</button>
                <div class="mkh-logo-anim">
                    <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                </div>
                <div style="font-size:15px;font-weight:900;color:#ff1e1e;margin-bottom:4px;text-shadow:0 0 10px rgba(255,30,30,0.8);">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈</div>
                <h3 style="color:#ff1e1e;margin-bottom:8px;font-size:17px;font-weight:900;">VIP ACCESS LOCKED ❌</h3>
                <p style="font-size:12px;color:#bbb;margin-bottom:15px;">Your device is not authorized.</p>
                
                <div id="__mkh_copy_box" style="background:#080202;border:1.5px dashed #ff1e1e;border-radius:14px;padding:12px;font-family:monospace;font-size:14px;color:#ff1e1e;font-weight:bold;margin-bottom:15px;cursor:pointer;" title="Click to copy ID">
                    ${deviceId}
                </div>
                
                <a href="https://t.me/MK_HACKER586" target="_blank" style="display:block;background:#080202;border:1.5px dashed #ff1e1e;border-radius:14px;padding:12px;font-family:monospace;font-size:12px;color:#ff1e1e;font-weight:bold;margin-bottom:15px;text-decoration:none;">
                    ❌ NOT ACCESS - CONTACT TO GET ACCESS
                </a>
                
                <button id="__mkh_activate_btn" class="mkh-btn-action">ACTIVATE SCRIPT 🚀</button>
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
                        .catch(() => {
                            btn.innerText = "ACTIVATE SCRIPT 🚀";
                            showToast("CONNECTION ERROR ❌", false);
                        });
                    };
                }
            }, 50);
        } else {
            let pagePath = window.location.pathname + window.location.search;
            let pageText = b.innerText || "";
            let panelType = "main";

            // Sahi tareeqay se check karega ke user kis page par hai
            if(pagePath.includes("payment") || pagePath.includes("deposit") || pagePath.includes("withdrawal") || pageText.includes("Payments")) {
                panelType = "payments";
            } else if(pagePath.includes("leaderboard") || pageText.includes("Leaderboard") || pageText.includes("Rating")) {
                panelType = "leaderboard";
            } else if(pagePath.includes("trade") || pageText.includes("cabinet") || pageText.includes("demo")) {
                panelType = "main";
            }

            if(panelType === "payments") {
                l.innerHTML = `
                <div class="mkh-modal-box">
                    <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:15px;right:18px;background:none;border:none;color:#ff1e1e;font-size:18px;font-weight:bold;cursor:pointer;">✕</button>
                    <div class="mkh-logo-anim">
                        <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <div style="font-size:15px;font-weight:900;color:#ff1e1e;margin-bottom:2px;text-shadow:0 0 10px rgba(255,30,30,0.8);">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈</div>
                    <h3 style="color:#ff1e1e;margin:0 0 12px 0;font-size:14px;font-weight:900;">PAYMENTS SYSTEM</h3>
                    
                    <div style="text-align:left;font-size:11px;color:#ff1e1e;font-weight:bold;">
                        <label>LIVE BALANCE</label>
                        <input type="text" class="mkh-input-field" value="5680.23">
                        <label>AMOUNT</label>
                        <input type="text" class="mkh-input-field" value="1500">
                        <label>WITHDRAWAL/DEPOSIT (W/D)</label>
                        <input type="text" class="mkh-input-field" value="w">
                        <label>PENDING/SUCCESS/CANCEL (P/S/C)</label>
                        <input type="text" class="mkh-input-field" value="p">
                        <label>BINANCE/USDT (B)</label>
                        <input type="text" class="mkh-input-field" value="b">
                        <label>TXID</label>
                        <input type="text" class="mkh-input-field" value="42739016205">
                    </div>

                    <button id="__mkh_activate_btn" class="mkh-btn-action">ACTIVATE SCRIPT 🚀</button>
                    <div style="margin-top:6px;font-size:10px;color:#aaa;">◆ SUPPORT ◆</div>
                    <div style="color:#00ff66;font-size:11px;font-weight:bold;margin-top:4px;">STATUS: ENJOY & UNLOCKED SUCCESSFULLY!</div>
                    <a href="https://t.me/MK_HACKER586" target="_blank" class="mkh-contact-btn">Telegram: @MK_HACKER586</a>
                    <a href="https://wa.me/923096172381" target="_blank" class="mkh-contact-btn">WhatsApp: 923096172381</a>
                </div>`;
                setTimeout(() => {
                    d.getElementById('__mkh_activate_btn').onclick = function(){
                        showToast("PAYMENTS SYSTEM ACTIVATED ✓", true);
                    };
                }, 50);

            } else if(panelType === "leaderboard") {
                l.innerHTML = `
                <div class="mkh-modal-box">
                    <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:15px;right:18px;background:none;border:none;color:#ff1e1e;font-size:18px;font-weight:bold;cursor:pointer;">✕</button>
                    <div class="mkh-logo-anim">
                        <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <div style="font-size:15px;font-weight:900;color:#ff1e1e;margin-bottom:2px;text-shadow:0 0 10px rgba(255,30,30,0.8);">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈</div>
                    <h3 style="color:#ff1e1e;margin:0 0 12px 0;font-size:14px;font-weight:900;">PROFIT/LOSS SYSTEM</h3>
                    
                    <div style="text-align:left;font-size:11px;color:#ff1e1e;font-weight:bold;">
                        <label>PAKISTAN</label>
                        <input type="text" class="mkh-input-field" value="PAKISTAN" readonly>
                        <label>USER</label>
                        <input type="text" class="mkh-input-field" value="😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈">
                        <label>AMOUNT</label>
                        <input type="text" class="mkh-input-field" value="987">
                        <label>LENGTH</label>
                        <input type="text" class="mkh-input-field" value="100">
                        <label>POSITION</label>
                        <input type="text" class="mkh-input-field" value="100+">
                        <label>PROFIT/LOSS (P/L)</label>
                        <input type="text" class="mkh-input-field" value="p">
                    </div>

                    <button id="__mkh_activate_btn" class="mkh-btn-action">ACTIVATE SCRIPT 🚀</button>
                    <div style="margin-top:6px;font-size:10px;color:#aaa;">◆ SUPPORT ◆</div>
                    <div style="color:#00ff66;font-size:11px;font-weight:bold;margin-top:4px;">STATUS: ENJOY & UNLOCKED SUCCESSFULLY!</div>
                    <a href="https://t.me/MK_HACKER586" target="_blank" class="mkh-contact-btn">Telegram: @MK_HACKER586</a>
                    <a href="https://wa.me/923096172381" target="_blank" class="mkh-contact-btn">WhatsApp: 923096172381</a>
                </div>`;
                setTimeout(() => {
                    d.getElementById('__mkh_activate_btn').onclick = function(){
                        showToast("LEADERBOARD SCRIPT ACTIVATED ✓", true);
                    };
                }, 50);

            } else {
                l.innerHTML = `
                <div class="mkh-modal-box">
                    <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:15px;right:18px;background:none;border:none;color:#ff1e1e;font-size:18px;font-weight:bold;cursor:pointer;">✕</button>
                    <div class="mkh-logo-anim">
                        <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <div style="font-size:15px;font-weight:900;color:#ff1e1e;margin-bottom:2px;text-shadow:0 0 10px rgba(255,30,30,0.8);">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈</div>
                    <h3 style="color:#ff1e1e;margin:0 0 12px 0;font-size:14px;font-weight:900;">MOBILE MAIN SYSTEM</h3>
                    
                    <div style="text-align:left;font-size:11px;color:#ff1e1e;font-weight:bold;">
                        <label>PAKISTAN</label>
                        <input type="text" class="mkh-input-field" value="PAKISTAN" readonly>
                        <label>USER</label>
                        <input type="text" class="mkh-input-field" value="😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈">
                        <label>ID</label>
                        <input type="text" class="mkh-input-field" value="12345678">
                        <label>EMAIL</label>
                        <input type="text" class="mkh-input-field" value="m.khacker586@gmail.com">
                        <label>START PROFIT</label>
                        <input type="text" class="mkh-input-field" value="0">
                    </div>

                    <button id="__mkh_activate_btn" class="mkh-btn-action">ACTIVATE SCRIPT 🚀</button>
                    <div style="margin-top:6px;font-size:10px;color:#aaa;">◆ SUPPORT ◆</div>
                    <div style="color:#00ff66;font-size:11px;font-weight:bold;margin-top:4px;">STATUS: ENJOY & UNLOCKED SUCCESSFULLY!</div>
                    <a href="https://t.me/MK_HACKER586" target="_blank" class="mkh-contact-btn">Telegram: @MK_HACKER586</a>
                    <a href="https://wa.me/923096172381" target="_blank" class="mkh-contact-btn">WhatsApp: 923096172381</a>
                </div>`;
                setTimeout(() => {
                    d.getElementById('__mkh_activate_btn').onclick = function(){
                        showToast("MOBILE SYSTEM ACTIVATED ✓ ENJOY!", true);
                    };
                }, 50);
            }
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
        }, 800);
    })
    .catch(() => {
        setTimeout(() => {
            loaderDiv.remove();
            renderModal();
            l.style.display = 'flex';
        }, 800);
    });
})();
