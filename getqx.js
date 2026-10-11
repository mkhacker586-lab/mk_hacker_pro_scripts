(async function() {
    if(document.getElementById('__mkh_loader__')) return;
    
    let deviceId = localStorage.getItem('__mkh_device_id');
    if (!deviceId) {
        deviceId = 'MK-' + Math.floor(100000000 + Math.random() * 900000000);
        localStorage.setItem('__mkh_device_id', deviceId);
    }

    try {
        let res = await fetch('https://mk-hacker-access-bot-murex.vercel.app/check-device?device_id=' + deviceId);
        let data = await res.json();
        
        if (data.status === 'active') {
            // Yahan aapki asli trading script ka code ya aage ki file load ho jayegi
            alert('😈☠️ 𝗠.𝗞 𝗛𝗔𝗖𝗞𝗘𝗥: Script Access Authorized Successfully! ✅');
            return;
        }
    } catch(e) {}

    // Agar device authorized nahi hai, toh lock panel dikhaye ga
    if(document.getElementById('__mkh_lock_panel__')) return;
    const d = document, b = d.body;
    const pl = d.createElement('div');
    pl.id = '__mkh_lock_panel__';
    pl.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;z-index:999999;font-family:sans-serif;backdrop-filter:blur(8px);';
    
    pl.innerHTML = `
        <div style="background:#0a0a0a;border:2px solid #ff1e1e;box-shadow:0 0 35px rgba(255,30,30,0.7);border-radius:20px;padding:30px;width:340px;text-align:center;color:#fff;">
            <h2 style="color:#ff1e1e;margin:0 0 10px 0;font-size:20px;">😈☠️ M.K HACKER ☠️😈</h2>
            <h3 style="color:#ff1e1e;margin:0 0 15px 0;font-size:16px;">ACCESS LOCKED ❌</h3>
            <p style="font-size:12px;color:#bbb;margin-bottom:20px;">Your device is not authorized. Send your Device ID to the bot.</p>
            <div style="background:#111;border:1px dashed #ff1e1e;padding:12px;border-radius:10px;margin-bottom:15px;font-weight:bold;color:#ff1e1e;letter-spacing:1px;font-size:15px;">${deviceId}</div>
            <button id="__mkh_copy_btn__" style="background:#ff1e1e;color:#fff;border:none;padding:12px 20px;border-radius:10px;font-weight:bold;cursor:pointer;width:100%;margin-bottom:12px;box-shadow:0 0 15px rgba(255,30,30,0.5);">📋 COPY DEVICE ID</button>
            <a href="https://t.me/mk_hacker_access_bot" target="_blank" style="display:block;background:transparent;border:1px solid #ff1e1e;color:#ff1e1e;padding:11px 20px;border-radius:10px;font-weight:bold;text-decoration:none;margin-bottom:12px;font-size:14px;">📩 OPEN BOT FOR ACCESS</a>
            <button id="__mkh_reload_btn__" style="background:#222;color:#fff;border:1px solid #444;padding:9px 15px;border-radius:8px;cursor:pointer;width:100%;font-size:13px;">🔄 CHECK STATUS AGAIN</button>
        </div>
    `;
    b.appendChild(pl);

    d.getElementById('__mkh_copy_btn__').onclick = () => {
        navigator.clipboard.writeText(deviceId);
        alert('Device ID Copied Successfully! ✅');
    };

    d.getElementById('__mkh_reload_btn__').onclick = () => {
        location.reload();
    };
})();
