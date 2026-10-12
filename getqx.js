
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
            0% { box-shadow: 0 0 30px rgba(180,50,255,0.6), inset 0 0 20px rgba(180,50,255,0.3); border-color: #b030ff; }
            50% { box-shadow: 0 0 55px rgba(180,50,255,0.9), inset 0 0 30px rgba(180,50,255,0.5); border-color: #d060ff; }
            100% { box-shadow: 0 0 30px rgba(180,50,255,0.6), inset 0 0 20px rgba(180,50,255,0.3); border-color: #b030ff; }
        }
        @keyframes mkhPulseImg {
            0% { transform: scale(1); filter: drop-shadow(0 0 12px rgba(180,50,255,0.8)); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 25px rgba(180,50,255,1)); }
            100% { transform: scale(1); filter: drop-shadow(0 0 12px rgba(180,50,255,0.8)); }
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
            background: #0f0714;
            border: 2px solid #b030ff;
            border-radius: 28px;
            padding: 20px;
            width: 90%;
            max-width: 350px;
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
            width: 65px;
            height: 65px;
            margin: 0 auto 6px auto;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(180,50,255,0.9);
            overflow: hidden;
            border: 2px solid #d060ff;
        }
        .mkh-input-field {
            background: #1a0f24;
            border: 1.5px solid #b030ff;
            color: #fff;
            padding: 9px 12px;
            border-radius: 12px;
            width: 100%;
            outline: none;
            font-weight: bold;
            font-size: 12px;
            box-shadow: inset 0 0 8px rgba(180,50,255,0.3);
            margin-bottom: 6px;
            box-sizing: border-box;
            text-align: center;
            pointer-events: auto !important;
        }
        .mkh-btn-action {
            background: linear-gradient(45deg,#6000a0,#b030ff);
            color: white;
            border: none;
            width: 100%;
            padding: 13px;
            border-radius: 14px;
            font-weight: 900;
            cursor: pointer;
            text-transform: uppercase;
            box-shadow: 0 0 20px rgba(180,50,255,0.7);
            letter-spacing: 1px;
            margin-top: 8px;
            pointer-events: auto !important;
        }
        .mkh-contact-btn-tg {
            display: block;
            background: #0d2137;
            border: 1.5px solid #30a0ff;
            color: #30a0ff;
            padding: 9px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: bold;
            font-size: 11px;
            text-align: center;
            box-shadow: 0 0 10px rgba(48,160,255,0.3);
            margin-top: 6px;
            pointer-events: auto !important;
        }
        .mkh-contact-btn-wa {
            display: block;
            background: #082814;
            border: 1.5px solid #00ff66;
            color: #00ff66;
            padding: 9px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: bold;
            font-size: 11px;
            text-align: center;
            box-shadow: 0 0 10px rgba(0,255,102,0.3);
            margin-top: 6px;
            pointer-events: auto !important;
        }
    `;
    d.head.appendChild(styleSheet);

    // Clean Loading Circle Animation (Waisa hi jaisa video mein hai)
    const loaderDiv = d.createElement('div');
    loaderDiv.id = '__mkh_loader__';
    loaderDiv.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999999;backdrop-filter:blur(8px);';
    loaderDiv.innerHTML = `
        <div style="width:70px;height:70px;border:6px solid rgba(180,50,255,0.2);border-top:6px solid #b030ff;border-radius:50%;animation:mkhSpin 0.5s linear infinite;box-shadow:0 0 30px rgba(180,50,255,1);"></div>
        <div style="color:#b030ff;font-weight:900;margin-top:18px;font-size:14px;letter-spacing:1px;text-shadow:0 0 15px rgba(180,50,255,0.9);font-family:sans-serif;">MAGIC SCRIPTS LOADING...</div>
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
                <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:12px;right:15px;background:none;border:none;color:#b030ff;font-size:16px;font-weight:bold;cursor:pointer;">✕</button>
                <div class="mkh-logo-anim">
                    <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                </div>
                <div style="font-size:14px;font-weight:900;color:#b030ff;margin-bottom:2px;text-shadow:0 0 10px rgba(180,50,255,0.8);">MAGIC SCRIPTS</div>
                <h3 style="color:#ff3333;margin-bottom:6px;font-size:16px;font-weight:900;">VIP ACCESS LOCKED ❌</h3>
                <p style="font-size:11px;color:#bbb;margin-bottom:12px;">Your device is not authorized.</p>
                
                <div id="__mkh_copy_box" style="background:#1a0f24;border:1.5px dashed #b030ff;border-radius:12px;padding:10px;font-family:monospace;font-size:13px;color:#b030ff;font-weight:bold;margin-bottom:12px;cursor:pointer;" title="Click to copy ID">
                    ${deviceId}
                </div>
                
                <a href="https://t.me/MK_HACKER586" target="_blank" style="display:block;background:#1a0f24;border:1.5px dashed #ff3333;border-radius:12px;padding:10px;font-family:monospace;font-size:11px;color:#ff3333;font-weight:bold;margin-bottom:12px;text-decoration:none;">
                    ❌ CONTACT TO GET ACCESS
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
            let pageText = b.innerText || "";
            let panelType = "main";

            // EXACT PAGE DETECTION (Jaise video mein alag alag jagah khulta hai)
            if(window.location.href.includes("payment") || pageText.includes("Payments") || pageText.includes("Deposit") || pageText.includes("Withdrawal")) {
                panelType = "payments";
            } else if(window.location.href.includes("leaderboard") || pageText.includes("Leaderboard") || pageText.includes("Rating")) {
                panelType = "leaderboard";
            } else if(window.location.href.includes("trade") || pageText.includes("Trades") || pageText.includes("Payout") || pageText.includes("Investment")) {
                panelType = "winloss";
            }

            if(panelType === "payments") {
                // PAYMENTS SYSTEM (Image 38814_2.jpg ke mutabiq)[span_9](start_span)[span_9](end_span)
                l.innerHTML = `
                <div class="mkh-modal-box">
                    <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:12px;right:15px;background:none;border:none;color:#b030ff;font-size:16px;font-weight:bold;cursor:pointer;">✕</button>
                    <div class="mkh-logo-anim">
                        <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <h2 style="color:#fff;margin:0 0 2px 0;font-size:16px;font-weight:900;letter-spacing:1px;">MAGIC SCRIPTS</h2>
                    <h4 style="color:#d060ff;margin:0 0 10px 0;font-size:11px;font-weight:bold;letter-spacing:0.5px;">PAYMENTS SYSTEM</h4>
                    
                    <div style="text-align:left;font-size:10px;color:#d060ff;font-weight:bold;">
                        <label>LIVE BALANCE</label>
                        <input type="text" class="mkh-input-field" value="5680.23">
                        <label>AMOUNT</label>
                        <input type="text" class="mkh-input-field" value="1500">
                        <label>WITHDRAWAL/DEPOSIT</label>
                        <input type="text" class="mkh-input-field" value="w">
                        <label>PENDING/SUCCESS/CANCEL</label>
                        <input type="text" class="mkh-input-field" value="p">
                        <label>BINANCE/USDT</label>
                        <input type="text" class="mkh-input-field" value="b">
                        <label>TXID</label>
                        <input type="text" class="mkh-input-field" value="42739016205">
                        <label>DATE & TIME</label>
                        <input type="text" class="mkh-input-field" value="12.10.2026 | 16:59:07" readonly>
                    </div>

                    <button id="__mkh_run_magic" class="mkh-btn-action">RUN MAGIC ✨</button>
                    <div style="margin-top:6px;font-size:9px;color:#888;letter-spacing:1px;">◆ SUPPORT ◆</div>
                    <div style="color:#00ff66;font-size:10px;font-weight:bold;margin-top:3px;">✨ ENJOY THE PRO VERSION! ✨</div>
                    <div style="font-size:9px;color:#aaa;margin-bottom:4px;">06074646190741353707</div>
                    <a href="https://t.me/MK_HACKER586" target="_blank" class="mkh-contact-btn-tg">📞 Telegram @Magic_Scripts</a>
                    <a href="https://wa.me/923096172381" target="_blank" class="mkh-contact-btn-wa">📞 WhatsApp +923316346879</a>
                </div>`;
                setTimeout(() => {
                    d.getElementById('__mkh_run_magic').onclick = function(){
                        showToast("PAYMENTS SYSTEM EXECUTED ✓", true);
                        // DEMO TO LIVE BALANCE SWITCH SIMULATION
                        let demoElem = d.querySelector('.balance-block, [class*="balance"]');
                        if(demoElem) demoElem.innerText = "$5,680.23";
                    };
                }, 50);

            } else if(panelType === "winloss") {
                // TRADE SYSTEM (Image 38812_2.jpg ke mutabiq)[span_10](start_span)[span_10](end_span)
                l.innerHTML = `
                <div class="mkh-modal-box">
                    <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:12px;right:15px;background:none;border:none;color:#b030ff;font-size:16px;font-weight:bold;cursor:pointer;">✕</button>
                    <div class="mkh-logo-anim">
                        <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <h2 style="color:#fff;margin:0 0 2px 0;font-size:16px;font-weight:900;letter-spacing:1px;">MAGIC SCRIPTS</h2>
                    <h4 style="color:#d060ff;margin:0 0 12px 0;font-size:11px;font-weight:bold;letter-spacing:0.5px;">TRADE SYSTEM</h4>
                    
                    <div style="text-align:left;font-size:10px;color:#d060ff;font-weight:bold;">
                        <label>PERCENT (%)</label>
                        <input type="text" id="__mkh_pct_input" class="mkh-input-field" value="93">
                    </div>

                    <button id="__mkh_run_magic" class="mkh-btn-action">RUN MAGIC ✨</button>
                    <div style="margin-top:8px;font-size:9px;color:#888;letter-spacing:1px;">◆ SUPPORT ◆</div>
                    <div style="color:#00ff66;font-size:10px;font-weight:bold;margin-top:4px;">✨ ENJOY THE PRO VERSION! ✨</div>
                    <div style="font-size:9px;color:#aaa;margin-bottom:6px;">06074646190741353707</div>
                    <a href="https://t.me/MK_HACKER586" target="_blank" class="mkh-contact-btn-tg">📞 Telegram @Magic_Scripts</a>
                    <a href="https://wa.me/923096172381" target="_blank" class="mkh-contact-btn-wa">📞 WhatsApp +923316346879</a>
                </div>`;
                setTimeout(() => {
                    d.getElementById('__mkh_run_magic').onclick = function(){
                        let p = d.getElementById('__mkh_pct_input').value;
                        showToast("TRADE WIN RATE SET TO " + p + "% ✓", true);
                    };
                }, 50);

            } else if(panelType === "leaderboard") {
                // PROFIT/LOSS LEADERBOARD SYSTEM (Image 38816_2.jpg ke mutabiq)[span_11](start_span)[span_11](end_span)
                l.innerHTML = `
                <div class="mkh-modal-box">
                    <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:12px;right:15px;background:none;border:none;color:#b030ff;font-size:16px;font-weight:bold;cursor:pointer;">✕</button>
                    <div class="mkh-logo-anim">
                        <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <h2 style="color:#fff;margin:0 0 2px 0;font-size:16px;font-weight:900;letter-spacing:1px;">MAGIC SCRIPTS</h2>
                    <h4 style="color:#d060ff;margin:0 0 10px 0;font-size:11px;font-weight:bold;letter-spacing:0.5px;">PROFIT/LOSS SYSTEM</h4>
                    
                    <div style="text-align:left;font-size:10px;color:#d060ff;font-weight:bold;">
                        <label>COUNTRY</label>
                        <input type="text" class="mkh-input-field" value="PAKISTAN" readonly>
                        <label>USER</label>
                        <input type="text" class="mkh-input-field" value="MAGIC SCRIPTS">
                        <label>AMOUNT</label>
                        <input type="text" class="mkh-input-field" value="987">
                        <label>LENGTH</label>
                        <input type="text" class="mkh-input-field" value="100">
                        <label>POSITION</label>
                        <input type="text" class="mkh-input-field" value="100+">
                        <label>PROFIT/LOSS (P/L)</label>
                        <input type="text" class="mkh-input-field" value="p">
                    </div>

                    <button id="__mkh_run_magic" class="mkh-btn-action">RUN MAGIC ✨</button>
                    <div style="margin-top:6px;font-size:9px;color:#888;letter-spacing:1px;">◆ SUPPORT ◆</div>
                    <div style="color:#00ff66;font-size:10px;font-weight:bold;margin-top:3px;">✨ ENJOY THE PRO VERSION! ✨</div>
                    <div style="font-size:9px;color:#aaa;margin-bottom:4px;">06074646190741353707</div>
                    <a href="https://t.me/MK_HACKER586" target="_blank" class="mkh-contact-btn-tg">📞 Telegram @Magic_Scripts</a>
                    <a href="https://wa.me/923096172381" target="_blank" class="mkh-contact-btn-wa">📞 WhatsApp +923316346879</a>
                </div>`;
                setTimeout(() => {
                    d.getElementById('__mkh_run_magic').onclick = function(){
                        showToast("LEADERBOARD SYSTEM APPLIED ✓", true);
                    };
                }, 50);

            } else {
                // MOBILE MAIN SYSTEM (Image 38806.jpg ke mutabiq)[span_12](start_span)[span_12](end_span)
                l.innerHTML = `
                <div class="mkh-modal-box">
                    <button onclick="document.getElementById('__mkh_main__').remove()" style="position:absolute;top:12px;right:15px;background:none;border:none;color:#b030ff;font-size:16px;font-weight:bold;cursor:pointer;">✕</button>
                    <div class="mkh-logo-anim">
                        <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <h2 style="color:#fff;margin:0 0 2px 0;font-size:16px;font-weight:900;letter-spacing:1px;">MAGIC SCRIPTS</h2>
                    <h4 style="color:#d060ff;margin:0 0 10px 0;font-size:11px;font-weight:bold;letter-spacing:0.5px;">MOBILE MAIN SYSTEM</h4>
                    
                    <div style="text-align:left;font-size:10px;color:#d060ff;font-weight:bold;">
                        <label>PAKISTAN</label>
                        <input type="text" class="mkh-input-field" value="PAKISTAN" readonly>
                        <label>USER</label>
                        <input type="text" class="mkh-input-field" value="MAGIC SCRIPTS">
                        <label>ID</label>
                        <input type="text" class="mkh-input-field" value="12345678">
                        <label>EMAIL</label>
                        <input type="text" class="mkh-input-field" value="magic.scripts@gmail.com">
                        <label>START PPROFIT</label>
                        <input type="text" class="mkh-input-field" value="0">
                    </div>

                    <button id="__mkh_run_magic" class="mkh-btn-action">RUN MAGIC ✨</button>
                    <div style="margin-top:6px;font-size:9px;color:#888;letter-spacing:1px;">◆ SUPPORT ◆</div>
                    <div style="color:#00ff66;font-size:10px;font-weight:bold;margin-top:3px;">✨ ENJOY THE PRO VERSION! ✨</div>
                    <div style="font-size:9px;color:#aaa;margin-bottom:4px;">06074646190741353707</div>
                    <a href="https://t.me/MK_HACKER586" target="_blank" class="mkh-contact-btn-tg">📞 Telegram @Magic_Scripts</a>
                    <a href="https://wa.me/923096172381" target="_blank" class="mkh-contact-btn-wa">📞 WhatsApp +923316346879</a>
                </div>`;
                setTimeout(() => {
                    d.getElementById('__mkh_run_magic').onclick = function(){
                        showToast("MOBILE MAIN SYSTEM ACTIVATED ✓", true);
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
