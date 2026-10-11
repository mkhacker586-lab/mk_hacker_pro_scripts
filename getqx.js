(function(){
    if(document.getElementById('__mkh_main__')) return;
    const d = document, b = d.body;
    
    // Check License & Device ID
    let deviceId = localStorage.getItem('mkh_device_id');
    if(!deviceId){
        deviceId = 'MK-' + Math.floor(100000000000 + Math.random() * 900000000000);
        localStorage.setItem('mkh_device_id', deviceId);
    }
    
    let licenseExpiry = localStorage.getItem('mkh_expiry');
    let isAuthorized = false;
    let now = new Date().getTime();
    
    if(licenseExpiry && now < parseInt(licenseExpiry)){
        isAuthorized = true;
    }

    const l = d.createElement('div');
    l.id = '__mkh_main__';
    l.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;backdrop-filter:blur(8px);';
    
    if(!isAuthorized){
        // Locked Modal with 1-Month Key System
        l.innerHTML = `
        <div style="background:#120505;border:2px solid #ff1e1e;border-radius:24px;padding:25px;width:90%;max-width:360px;text-align:center;box-shadow:0 0 40px rgba(255,30,30,0.7);color:#fff;position:relative;">
            <div style="width:70px;height:70px;margin:0 auto 12px auto;border-radius:50%;box-shadow:0 0 25px rgba(255,30,30,0.8);overflow:hidden;">
                <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <h4 style="color:#ff1e1e;margin:0 0 4px 0;font-size:15px;font-weight:900;">😈☠️ 𝗠.𝗞 HACKER ☠️😈</h4>
            <h3 style="color:#ff1e1e;margin:0 0 8px 0;font-size:18px;">ACCESS LOCKED 🔒</h3>
            <p style="font-size:12px;color:#bbb;margin-bottom:15px;">Your device requires an active 1-month license key.</p>
            
            <div id="__mkh_copy_box" style="background:#080202;border:1.5px dashed #ff1e1e;border-radius:12px;padding:12px;font-family:monospace;font-size:14px;color:#ff1e1e;font-weight:bold;margin-bottom:15px;cursor:pointer;" title="Click to copy ID">
                ${deviceId}
            </div>

            <div style="margin-bottom:15px;">
                <input type="text" id="__mkh_key_input" placeholder="Enter Activation Key..." style="width:100%;padding:12px;border-radius:12px;border:1px solid #331111;background:#080202;color:#fff;text-align:center;font-size:13px;outline:none;box-sizing:border-box;">
            </div>

            <button id="__mkh_activate_btn" style="background:linear-gradient(45deg,#8b0000,#ff1e1e);color:#fff;border:none;width:100%;padding:13px;border-radius:14px;font-weight:bold;cursor:pointer;text-transform:uppercase;box-shadow:0 5px 20px rgba(255,30,30,0.6);margin-bottom:12px;">ACTIVATE SCRIPT 🚀</button>
            
            <p style="font-size:12px;margin:0 0 15px 0;">Telegram: <a href="https://t.me/MK_HACKER586" target="_blank" style="color:#ff1e1e;text-decoration:none;font-weight:bold;">@MK_HACKER586</a></p>
            
            <button onclick="this.closest('#__mkh_main__').remove()" style="background:transparent;color:#ff1e1e;border:2px solid #ff1e1e;padding:10px;border-radius:12px;font-weight:bold;cursor:pointer;width:100%;">GO BACK ❌</button>
        </div>`;
        b.appendChild(l);

        d.getElementById('__mkh_copy_box').onclick = function(){
            navigator.clipboard.writeText(deviceId);
            alert("✅ Device ID Copied! Send it to @MK_HACKER586 for 1-Month Key.");
        };

        d.getElementById('__mkh_activate_btn').onclick = function(){
            let key = d.getElementById('__mkh_key_input').value.trim();
            if(key.startsWith('MK-PRO') || key === 'MK586'){
                let oneMonth = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 Days Valid
                localStorage.setItem('mkh_expiry', oneMonth);
                alert("🎉 License Activated Successfully for 1 Month!");
                l.remove();
                location.reload();
            } else {
                alert("❌ Invalid Activation Key! Contact @MK_HACKER586");
            }
        };

    } else {
        // Unlocked Pro Trading Suite Panel
        l.innerHTML = `
        <div style="background:#120505;border:2px solid #ff1e1e;border-radius:26px;padding:22px;width:90%;max-width:380px;text-align:center;box-shadow:0 0 50px rgba(255,30,30,0.8);color:#fff;position:relative;">
            <button onclick="this.closest('#__mkh_main__').remove()" style="position:absolute;top:15px;right:18px;background:none;border:none;color:#ff1e1e;font-size:18px;font-weight:bold;cursor:pointer;">✕</button>
            
            <div style="width:65px;height:65px;margin:0 auto 10px auto;border-radius:50%;box-shadow:0 0 25px rgba(255,30,30,0.8);overflow:hidden;">
                <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
            </div>
            
            <h4 style="color:#ff1e1e;margin:0 0 2px 0;font-size:14px;font-weight:900;">😈☠️ 𝗠.𝗞 HACKER ☠️😈</h4>
            <h3 style="margin:0 0 15px 0;font-size:17px;font-weight:900;">PRO TRADING SUITE</h3>
            
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:15px;">
                <button onclick="alert('💰 Live Balance Manager Opened')" style="background:#1a0808;border:1px solid #ff1e1e;color:#fff;padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;">
                    <span>💰 Live / Demo Balance Manager</span> <span>⚙️</span>
                </button>
                <button onclick="alert('🎯 Win/Loss Percentage Controller Opened')" style="background:#1a0808;border:1px solid #ff1e1e;color:#fff;padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;">
                    <span>🎯 Win / Loss % Controller</span> <span>⚙️</span>
                </button>
                <button onclick="alert('💳 Fake Deposit / Withdrawal Generator Opened')" style="background:#1a0808;border:1px solid #ff1e1e;color:#fff;padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;">
                    <span>💳 Fake Deposit / Withdrawal</span> <span>⚙️</span>
                </button>
            </div>

            <div style="background:#080202;border-radius:12px;padding:10px;font-size:11px;color:#aaa;border:1px solid #331111;">
                STATUS: <span style="color:#00ff66;font-weight:bold;">LICENSED (1 MONTH ACTIVE)</span><br>
                Telegram: <a href="https://t.me/MK_HACKER586" target="_blank" style="color:#ff1e1e;text-decoration:none;">@MK_HACKER586</a>
            </div>
        </div>`;
        b.appendChild(l);
    }
})();
