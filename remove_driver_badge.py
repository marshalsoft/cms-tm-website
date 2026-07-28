from pathlib import Path
import json


path = Path("/Users/marshalsoft/Desktop/doc/bundler/template.json")
template = json.loads(path.read_text())

driver_badge = """            <a href="https://play.google.com/store/apps/details?id=com.tnm.driver" target="_blank" rel="noopener noreferrer" style="display:inline-flex;flex:0 0 248px;align-items:center;gap:12px;background:#050505;border:2px solid rgba(255,255,255,0.75);border-radius:16px;padding:10px 16px 10px 14px;text-decoration:none;box-shadow:0 18px 38px -24px rgba(0,0,0,0.75);min-width:248px;">
              <svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block;flex:none;">
                <path d="M2.8 2.35c-.49.52-.8 1.33-.8 2.39v28.52c0 1.03.29 1.82.75 2.34l.12.11L19.3 19.31v-.62L2.91 2.24l-.11.11Z" fill="#00D26A"></path>
                <path d="M24.76 24.79 19.3 19.31v-.62l5.52-5.52.12.07 6.47 3.7c1.85 1.05 1.85 2.77 0 3.84l-6.53 3.73-.12.28Z" fill="#FFD84D"></path>
                <path d="M24.88 24.51 19.3 18.93 2.8 35.43c.77.82 2.05.93 3.5.12l18.58-10.59Z" fill="#FF5252"></path>
                <path d="M24.88 13.49 6.3 2.9C4.84 2.08 3.56 2.2 2.8 3.02l16.5 16.51 5.58-5.58Z" fill="#3B82F6"></path>
              </svg>
              <span style="display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:2px;">
                <span style="font-family:Urbanist;font-weight:700;font-size:12px;line-height:1;letter-spacing:0.12em;color:#FFFFFF;text-transform:uppercase;">Get TMO Driver On</span>
                <span style="font-family:Urbanist;font-weight:800;font-size:28px;line-height:1;color:#FFFFFF;letter-spacing:-0.03em;">Google Play</span>
              </span>
            </a>
"""

if driver_badge not in template:
    raise SystemExit("Driver badge block not found")

template = template.replace(driver_badge, "", 1)
path.write_text(json.dumps(template))
print("Removed driver badge.")
