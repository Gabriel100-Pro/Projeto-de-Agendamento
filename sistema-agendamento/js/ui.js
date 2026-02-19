(function(){
  // Banner / confirmation UI
  function createBanner(){
    const el = document.createElement('div')
    el.className = 'banner hidden'
    el.innerHTML = `<div class="banner-inner"><div class="banner-msg"></div><div class="banner-actions"></div></div>`
    document.body.appendChild(el)
    return el
  }

  const banner = createBanner()
  const msgEl = banner.querySelector('.banner-msg')
  const actionsEl = banner.querySelector('.banner-actions')

  function clearActions(){actionsEl.innerHTML=''}

  function showBanner(message, opts={primaryText:'OK', secondaryText:null, title:null}){
    return new Promise(resolve=>{
      msgEl.innerHTML = (opts.title? `<strong>${opts.title}</strong><div>`: '<div>') + escapeHtml(message) + '</div>'
      clearActions()
      const primary = document.createElement('button')
      primary.className = 'banner-btn primary'
      primary.textContent = opts.primaryText || 'OK'
      primary.addEventListener('click', ()=>{ hide(); resolve(true) })
      actionsEl.appendChild(primary)
      if(opts.secondaryText){
        const sec = document.createElement('button')
        sec.className = 'banner-btn secondary'
        sec.textContent = opts.secondaryText
        sec.addEventListener('click', ()=>{ hide(); resolve(false) })
        actionsEl.appendChild(sec)
      }
      banner.classList.remove('hidden')
      banner.classList.add('visible')
      // focus primary
      primary.focus()
    })
  }

  function showConfirm(title,message){
    return showBanner(message,{title:title,primaryText:'Tem certeza?',secondaryText:'Cancelar'})
  }

  function hide(){
    banner.classList.remove('visible')
    banner.classList.add('hidden')
  }

  function escapeHtml(s){return String(s).replace(/[&<>\"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))}

  // expose globally
  window.showBanner = showBanner
  window.showConfirm = showConfirm

})();
