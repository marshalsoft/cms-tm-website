'use client';

export default function AppDownloadCTA() {
  function openPopup() {
    const id = 'tmo-app-popup';
    let wrap = document.getElementById(id) as HTMLDivElement | null;
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = id;
      wrap.setAttribute('role', 'dialog');
      wrap.setAttribute('aria-modal', 'true');
      wrap.style.cssText =
        'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(10,31,24,0.74);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);';
      wrap.innerHTML =
        '<div style="width:100%;max-width:420px;border-radius:18px;background:#0A1F18;border:1px solid rgba(255,255,255,0.12);box-shadow:0 40px 90px -40px rgba(0,0,0,0.8);padding:20px 18px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;">' +
        '<div style="font-family:Urbanist,system-ui,sans-serif;font-weight:800;font-size:16px;color:#fff;letter-spacing:-0.02em;">Choose your TMO app</div>' +
        '<button type="button" aria-label="Close" data-close="1" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);color:#fff;width:36px;height:36px;border-radius:12px;cursor:pointer;font-size:18px;line-height:34px;padding:0;">×</button>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' +
        '<a href="https://play.google.com/store/apps/details?id=com.tnm.driver" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:14px 16px;border-radius:14px;background:#FBC02D;color:#0A1F18;font-family:Urbanist,system-ui,sans-serif;font-weight:800;font-size:15px;text-decoration:none;">Get TMO Driver</a>' +
        '<a href="https://play.google.com/store/apps/details?id=com.tnm.rider" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:14px 16px;border-radius:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:#fff;font-family:Urbanist,system-ui,sans-serif;font-weight:800;font-size:15px;text-decoration:none;">Get TMO Rider</a>' +
        '</div>' +
        '</div>';
      wrap.addEventListener('click', (e) => {
        if (e.target === wrap) wrap?.remove();
      });
      wrap.querySelector('[data-close]')?.addEventListener('click', () => wrap?.remove());
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') document.getElementById(id)?.remove();
      });
      document.body.appendChild(wrap);
    }
    wrap.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    wrap.addEventListener(
      'click',
      () => {
        document.documentElement.style.overflow = '';
      },
      { once: true }
    );
  }

  return (
    <div className="flex flex-wrap items-stretch gap-3 mt-10">
      <button
        onClick={openPopup}
        className="inline-flex items-center gap-3 bg-[#050505] border-2 border-white/75 rounded-2xl px-4 py-2.5 text-white shadow-soft hover:brightness-110"
      >
        <svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2.8 2.35c-.49.52-.8 1.33-.8 2.39v28.52c0 1.03.29 1.82.75 2.34l.12.11L19.3 19.31v-.62L2.91 2.24l-.11.11Z" fill="#00D26A" />
          <path d="M24.76 24.79 19.3 19.31v-.62l5.52-5.52.12.07 6.47 3.7c1.85 1.05 1.85 2.77 0 3.84l-6.53 3.73-.12.28Z" fill="#FFD84D" />
          <path d="M24.88 24.51 19.3 18.93 2.8 35.43c.77.82 2.05.93 3.5.12l18.58-10.59Z" fill="#FF5252" />
          <path d="M24.88 13.49 6.3 2.9C4.84 2.08 3.56 2.2 2.8 3.02l16.5 16.51 5.58-5.58Z" fill="#3B82F6" />
        </svg>
        <div className="flex flex-col items-start justify-center gap-1">
          <span className="font-semibold text-[12px] leading-none text-white/90 tracking-[0.12em] uppercase">Get TMO On</span>
          <span className="font-extrabold text-[28px] leading-none text-white tracking-tight">Google Play</span>
        </div>
      </button>
    </div>
  );
}
