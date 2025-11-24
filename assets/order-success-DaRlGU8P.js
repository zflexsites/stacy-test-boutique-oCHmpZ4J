import{f as $,s as E,_ as S}from"../js/app.js";function f(t=""){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function N(t){try{if(!t)return new Date;if(typeof t=="string"){const r=new Date(t);if(!isNaN(r.getTime()))return r;const o=Number(t);return isNaN(o)?new Date:new Date(o)}if(typeof t=="number")return t>1e12?new Date(t):t>1e9?new Date(t):new Date(t*1e3);if(t instanceof Date)return t;if(t&&typeof t.toDate=="function")try{return t.toDate()}catch{}const n=new Date(t);if(!isNaN(n.getTime()))return n}catch{}return new Date}function U(t){if(!t)return!1;try{return new URL(t,location.href).origin===location.origin}catch{return!1}}async function I(t,n=160){if(!t)return null;try{if(window.QRCode){const o=window.QRCode;if(typeof o.toDataURL=="function")return await new Promise((a,i)=>o.toDataURL(t,{width:n},(e,l)=>e?i(e):a(l)));if(typeof o.toCanvas=="function")return await new Promise((a,i)=>{try{const e=document.createElement("canvas");o.toCanvas(e,t,{width:n},l=>l?i(l):a(e.toDataURL("image/png")))}catch(e){i(e)}})}const r=await S(()=>import("./browser-BXdiCFWD.js").then(o=>o.b),[]).catch(()=>null);if(r){const o=r.toDataURL||r.default&&r.default.toDataURL;if(typeof o=="function")return await o(t,{width:n})}}catch(r){console.warn("[QR] génération échouée:",r)}return null}function L(t,n){var w,u,D;const o=(t.createdAt instanceof Date?t.createdAt:new Date).toLocaleString("fr-FR",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}),a=Array.isArray(t.items)&&t.items.length?t.items.map(g=>{const x=g.quantity||1,b=g.title||g.id||"Produit",v=typeof g.price=="object"?Number(g.price.amount||0):Number(g.price||0),C=typeof g.price=="object"?g.price.currency||t.currency||"":t.currency||"",R=(v*x).toFixed(2);return`<div style="display:flex;justify-content:space-between;margin:6px 0;font-size:14px;line-height:1.2">
                    <div style="max-width:65%;overflow-wrap:break-word">${f(`${x} × ${b}`)}</div>
                    <div style="white-space:nowrap">${f(R)} ${f(C)}</div>
                  </div>`}).join(""):'<div style="font-size:14px;color:var(--text-muted-color, #6b7280)">Aucun item disponible</div>',i=(typeof t.total=="object"?Number(t.total.amount||0):Number(t.total||0)).toFixed(2),e=(typeof t.total=="object"?t.total.currency:t.currency)||"",l=((w=t.store)==null?void 0:w.logoUrl)||null,d=l&&U(l),c=t.store&&t.store.name&&String(t.store.name).trim().charAt(0)||"B",p=`
    :root{
      --bg-color: #ffffff;
      --text-color: #111827;
      --primary-color: #000000;
      --secondary-color: #6B7280;
      --card-bg-color: #ffffff;
      --card-border-color: #E5E7EB;
      --text-muted-color: #6B7280;
      --font-family: Inter, Arial, Helvetica, sans-serif;
    }
    html,body{margin:0;padding:0;font-family:var(--font-family);background:var(--bg-color);color:var(--text-color)}
    .receipt{box-sizing:border-box;width:600px;padding:28px;background:var(--card-bg-color);color:var(--text-color);border:1px solid var(--card-border-color);border-radius:8px}
    .header{text-align:center;margin-bottom:8px}
    .meta{display:flex;justify-content:space-between;margin:18px 0;color:var(--text-muted-color)}
    .items{margin-bottom:18px}
    .footer{display:flex;justify-content:space-between;align-items:center}
    .qrbox{width:140px;height:140px;display:flex;align-items:center;justify-content:center;border:1px solid var(--card-border-color);border-radius:8px;background:var(--card-bg-color)}
    .logo-sq{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:8px;font-weight:700;color:var(--card-bg-color);background:var(--primary-color);font-size:22px;margin-bottom:4px}
    .logo-img{max-height:40px;object-fit:contain;margin-bottom:4px}
    .items .title{font-size:14px}
  `,s=`
    (function() {
      try {
        // list of vars we care about (extendable)
        const vars = [
          '--bg-color',
          '--text-color',
          '--primary-color',
          '--secondary-color',
          '--card-bg-color',
          '--card-border-color',
          '--text-muted-color',
          '--font-family'
        ];
        const parentStyle = window.parent && window.parent.getComputedStyle
          ? window.parent.getComputedStyle(window.parent.document.documentElement)
          : null;
        if (!parentStyle) return;
        vars.forEach(k => {
          const v = parentStyle.getPropertyValue(k);
          if (v) document.documentElement.style.setProperty(k, v.trim());
        });
      } catch (e) {
        // ignore cross-origin or other issues
      }
    })();
  `,m=d?`<img class="logo-img" src="${f(l)}" alt="${f(((u=t.store)==null?void 0:u.name)||"")}">`:`<div class="logo-sq" aria-hidden="true">${f(c)}</div>`,y=n?`<img src="${n}" alt="QR" style="width:120px;height:120px;object-fit:contain"/>`:'<div style="font-size:12px;color:var(--text-muted-color)">QR indisponible</div>',h=f(((D=t.store)==null?void 0:D.name)||"Boutique");return`<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <script>${s}<\/script>
  <style>${p}</style>
</head>
<body>
  <div class="receipt" id="receipt-root" role="document" aria-label="Récapitulatif de commande">
    <div class="header">
      ${m}
      <h2 style="margin:0 0 6px 0;font-size:20px">Récapitulatif de commande</h2>
      <div style="font-size:12px;color:var(--text-muted-color)">${h}</div>
    </div>

    <div class="meta">
      <div>
        <div style="font-size:12px;color:var(--text-muted-color)">Commande N°</div>
        <div style="font-weight:700">${f(t.id||"")}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:12px;color:var(--text-muted-color)">Date</div>
        <div>${f(o)}</div>
      </div>
    </div>

    <div class="items">${a}</div>

    <div class="footer">
      <div style="text-align:left">
        <div style="font-size:12px;color:var(--text-muted-color)">Total</div>
        <div style="font-weight:700;font-size:18px">${f(i)} ${f(e)}</div>
      </div>
      <div class="qrbox">${y}</div>
    </div>
  </div>
</body>
</html>`}async function q(t,n={}){const{timeoutMs:r=15e3,html2canvasCdn:o="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"}=n;return new Promise((a,i)=>{const e=document.createElement("iframe");e.style.position="fixed",e.style.left="-9999px",e.style.top="0",e.style.width="900px",e.style.height="900px",e.setAttribute("aria-hidden","true"),document.body.appendChild(e);let l=!1;const d=()=>{try{e&&e.parentNode&&e.parentNode.removeChild(e)}catch{}l=!0},c=setTimeout(()=>{l||(d(),i(new Error("Timeout: génération du récapitulatif trop longue.")))},r),p=t.replace("</body>",`<script src="${o}"><\/script></body>`);e.srcdoc=p,e.onload=async()=>{if(!l)try{const s=e.contentWindow,m=e.contentDocument,y=Date.now(),h=100;await new Promise((x,b)=>{const v=setInterval(()=>{if(l)return clearInterval(v),b(new Error("Aborted"));if(s.html2canvas)return clearInterval(v),x();if(Date.now()-y>Math.min(r,8e3))return clearInterval(v),b(new Error("html2canvas not loaded in iframe"))},h)});const u=m.getElementById("receipt-root")||m.body;if(!u)return d(),clearTimeout(c),i(new Error("No receipt node inside iframe"));const g=(await s.html2canvas(u,{backgroundColor:"#ffffff"})).toDataURL("image/png");d(),clearTimeout(c),a(g)}catch(s){d(),clearTimeout(c),i(s)}}})}function A(t,n){const r=document.getElementById("order-id");r&&(r.textContent=t.id||"");const o=document.getElementById("qrcode-container");o&&(o.innerHTML="",(async()=>{if(!t.id||!n){console.error("[QR] orderId ou storeId manquant pour la génération du QR code."),o.textContent="Erreur QR";return}const a=`zflex-order://${n}/${t.id}`,i=await I(a,160);if(i){const e=document.createElement("img");e.src=i,e.alt="QR Code de la commande",e.style.width="160px",e.style.height="160px",o.appendChild(e)}else{const e=document.createElement("span");e.textContent="QR indisponible",e.style.fontSize="12px",e.style.color="var(--text-muted-color, #6b7280)",o.appendChild(e)}})())}async function B(){const t=document.getElementById("loading-state"),n=document.getElementById("success-state"),r=document.getElementById("error-state"),o=document.getElementById("error-message");try{const i=new URLSearchParams(window.location.search).get("id");if(!i)throw new Error("ID de commande manquant dans l'URL.");const e=document.getElementById("zflex-data")||document.querySelector(".zflex-fragment-data");if(!e)throw new Error("Tunnel de data introuvable.");const d=JSON.parse(e.textContent||"{}").storeId;if(!d)throw new Error("ID du store introuvable dans les données de la page.");const c=await $(i,d);if(!(c!=null&&c.valid)||!(c!=null&&c.order))throw new Error((c==null?void 0:c.message)||"Commande invalide ou déjà traitée.");const p=c.order;p.createdAt=N(p.createdAt),A(p,d);const s=document.getElementById("download-receipt-btn");s&&s.addEventListener("click",async()=>{s.disabled=!0,s.textContent="Génération...";try{const m=`zflex-order://${d}/${p.id}`,y=await I(m,300),h=L(p,y),w=await q(h),u=document.createElement("a");u.href=w,u.download=`recap-commande-${p.id}.png`,document.body.appendChild(u),u.click(),u.remove()}catch(m){console.error("Erreur génération du récapitulatif:",m),E("Erreur",(m==null?void 0:m.message)||"Impossible de générer le récapitulatif.","error")}finally{s.disabled=!1,s.textContent="Télécharger le récapitulatif"}}),t&&(t.style.display="none"),n&&n.classList.remove("hidden")}catch(a){console.error("[OrderSuccess] Erreur:",a),o&&(o.textContent=(a==null?void 0:a.message)||"Impossible de récupérer la commande."),t&&(t.style.display="none"),r&&r.classList.remove("hidden"),E("Erreur de commande",(a==null?void 0:a.message)||"Impossible de récupérer les détails.","error")}}export{B as initOrderSuccess};
