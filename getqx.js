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
        toast.style = 'visibility:hidden;min-width:150px;background-color:rgba(18,5,5,0.95);color:#00ff66;text-align:center;border-radius:12px;padding:12px;position:fixed;z-index:1000000;left:50%;bottom:30px;transform:translateX(-50%);font-size:13px;font-weight:bold;border:1.5px solid #ff1e1e;box-shadow:0 0 25px rgba(255,30,30,0.7);font-family:sans-serif;transition:0.3s;';
        b.appendChild(toast);
    }
    function showToast(text) {
        toast.innerText = text;
        toast.style.visibility = 'visible';
        toast.style.bottom = '40px';
        setTimeout(() => {
            toast.style.visibility = 'hidden';
            toast.style.bottom = '30px';
        }, 1800);
    }

    const l = d.createElement('div');
    l.id = '__mkh_main__';
    l.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;backdrop-filter:blur(10px);';
    
    function renderModal() {
        if(!isAuthorized){
            l.innerHTML = `
            <div style="background:#120505;color:#fff;border-radius:30px;padding:30px 20px;width:100%;max-width:420px;text-align:center;box-shadow:0 0 50px rgba(255, 30, 30, 0.7);position:relative;border:2px solid #ff1e1e;">
                <div style="width:75px;height:75px;margin:0 auto 12px auto;border-radius:50%;box-shadow:0 0 25px rgba(255,30,30,0.7);overflow:hidden;">
                    <img src="https://i.postimg.cc/t4NvM0jw/file-00000000fac08211ae44783af21c9e4f.png" style="width:100%;height:100%;object-fit:cover;">
                </div>
                <div style="font-size:15px;font-weight:900;color:#ff1e1e;margin-bottom:4px;text-shadow:0 0 10px rgba(255,30,30,0.6);">😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥 ☠️😈</div>
                
                <h3 style="color:#ff1e1e;margin-bottom:8px;font-size:18px;font-weight:900;">ACCESS LOCKED ❌</h3>
                <p style="font-size:13px;color:#bbb;margin-bottom:20px;">Your device is not authorized.</p>
                
                <div id="__mkh_copy_box" style="background:#080202;border:1.5px dashed #ff1e1e;border-radius:16px;padding:14px;font-family:monospace;font-size:15px;color:#ff1e1e;font-weight:bold;margin-bottom:18px;letter-spacing:1px;cursor:pointer;" title="Click to copy ID">
                    ${deviceId}
                </div>
                
                <a href="https://t.me/MK_HACKER586" target="_blank" style="display:block;background:#080202;border:1.5px dashed #ff1e1e;border-radius:16px;padding:14px;font-family:monospace;font-size:13px;color:#ff1e1e;font-weight:bold;margin-bottom:18px;text-decoration:none;box-shadow:0 0 15px rgba(255, 30, 30, 0.3);">
                    ❌ NOT ACCESS - CONTACT TO GET ACCESS
                </a>
                
                <button id="__mkh_activate_btn" style="background:linear-gradient(45deg,#8b0000,#ff1e1e);color:white;border:none;width:100%;padding:15px;border-radius:18px;font-weight:bold;cursor:pointer;text-transform:uppercase;box-shadow:0 5px 20px rgba(255,30,30,0.7);margin-bottom:15px;letter-spacing:0.5px;">ACTIVATE SCRIPT 🚀</button>
                
                <div style="font-size:12px;color:#888;margin-top:12px;font-weight:bold;">
                    Developed By <a href="https://t.me/MK_HACKER586" target="_blank" style="color:#ff1e1e;text-decoration:none;">@MK_HACKER</a>
                </div>
                
                <button onclick="this.closest('#__mkh_main__').remove()" style="background:transparent;color:#ff1e1e;border:2px solid #ff1e1e;padding:15px;border-radius:18px;font-weight:bold;cursor:pointer;width:100%;margin-top:15px;text-transform:uppercase;">GO BACK ❌</button>
            </div>`;
            
            // Re-bind events after innerHTML update
            setTimeout(() => {
                const copyBox = d.getElementById('__mkh_copy_box');
                if(copyBox){
                    copyBox.onclick = function(){
                        navigator.clipboard.writeText(deviceId);
                        showToast("DEVICE ID COPIED ✓");
                    };
                }
                const actBtn = d.getElementById('__mkh_activate_btn');
                if(actBtn){
                    actBtn.onclick = function(){
                        let btn = this;
                        btn.innerText = "PLEASE WAIT...";
                        setTimeout(() => {
                            btn.innerText = "𝗔𝗖𝗧𝗜𝗩𝗔𝗧𝗘 𝗦𝗖𝗥𝗜𝗣𝗧 🚀";
                            showToast("DEVICE NOT AUTHORIZED ❌");
                        }, 1200);
                    };
                }
            }, 50);
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
                    STATUS: <span style="color:#00ff66;font-weight:bold;">UNLOCKED SUCCESSFULLY ✓</span><br>
                    Telegram: <a href="https://t.me/MK_HACKER586" target="_blank" style="color:#ff1e1e;text-decoration:none;">@MK_HACKER586</a>
                </div>
            </div>`;
        }
    }

    renderModal();
    b.appendChild(l);
})();
