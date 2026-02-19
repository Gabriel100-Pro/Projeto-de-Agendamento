(function(){
  const STORAGE_KEY = 'sistema_agendamento_bookings'
  function getBookings(){return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')}

  function lastNDates(n){
    const days = []
    const today = new Date()
    for(let i=n-1;i>=0;i--){
      const d = new Date(today)
      d.setDate(today.getDate()-i)
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth()+1).padStart(2,'0')
      const dd = String(d.getDate()).padStart(2,'0')
      days.push(`${yyyy}-${mm}-${dd}`)
    }
    return days
  }

  function aggregateByDate(n=7){
    const days = lastNDates(n)
    const counts = days.map(d=>0)
    const bookings = getBookings()
    bookings.forEach(b=>{
      const idx = days.indexOf(b.date)
      if(idx>=0) counts[idx]++
    })
    return {labels: days, values: counts}
  }

  function aggregateByTime(){
    const bookings = getBookings()
    const map = {}
    bookings.forEach(b=>{ map[b.time]=(map[b.time]||0)+1 })
    const items = Object.keys(map).map(t=>({time:t,count:map[t]}))
    items.sort((a,b)=>b.count-a.count)
    return items.slice(0,8)
  }

  function renderDailyChart(container){
    const {labels,values} = aggregateByDate(7)
    const w = 680, h = 200, pad = 28
    const max = Math.max(1, ...values)
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`)
    svg.style.width='100%'
    svg.innerHTML = ''
    const gw = (w - pad*2) / labels.length
    values.forEach((v,i)=>{
      const barH = (v / max) * (h - pad*2)
      const x = pad + i*gw + 8
      const y = h - pad - barH
      const rect = document.createElementNS(svg.namespaceURI,'rect')
      rect.setAttribute('x', x)
      rect.setAttribute('y', y)
      rect.setAttribute('width', Math.max(12, gw-16))
      rect.setAttribute('height', Math.max(0, barH))
      rect.setAttribute('fill','#7c3aed')
      rect.setAttribute('rx','6')
      svg.appendChild(rect)
      const t = document.createElementNS(svg.namespaceURI,'text')
      t.setAttribute('x', x + (gw-16)/2)
      t.setAttribute('y', h - pad + 16)
      t.setAttribute('text-anchor','middle')
      t.setAttribute('fill','#cfe9ff')
      t.setAttribute('font-size','11')
      t.textContent = labels[i].slice(5)
      svg.appendChild(t)
      const vtxt = document.createElementNS(svg.namespaceURI,'text')
      vtxt.setAttribute('x', x + (gw-16)/2)
      vtxt.setAttribute('y', y - 6)
      vtxt.setAttribute('text-anchor','middle')
      vtxt.setAttribute('fill','#cfe9ff')
      vtxt.setAttribute('font-size','11')
      vtxt.textContent = v>0?v:''
      svg.appendChild(vtxt)
    })
    container.innerHTML = ''
    const title = document.createElement('div')
    title.style.color='#e6eef8'
    title.style.fontWeight='600'
    title.style.marginBottom='8px'
    title.textContent = 'Agendamentos por dia (últimos 7 dias)'
    container.appendChild(title)
    container.appendChild(svg)
  }

  function renderTimesChart(container){
    const items = aggregateByTime()
    const w = 680, h = 200, pad = 24
    const max = Math.max(1, ...items.map(i=>i.count))
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`)
    svg.style.width='100%'
    svg.innerHTML = ''
    const rowH = (h - pad*2) / Math.max(1, items.length)
    items.forEach((it,idx)=>{
      const y = pad + idx*rowH
      const barW = (it.count / max) * (w - 220)
      const rect = document.createElementNS(svg.namespaceURI,'rect')
      rect.setAttribute('x', 160)
      rect.setAttribute('y', y + 6)
      rect.setAttribute('width', Math.max(6, barW))
      rect.setAttribute('height', Math.max(12,rowH-8))
      rect.setAttribute('fill', '#00e5ff')
      rect.setAttribute('rx','6')
      svg.appendChild(rect)
      const t1 = document.createElementNS(svg.namespaceURI,'text')
      t1.setAttribute('x', 8)
      t1.setAttribute('y', y + 18)
      t1.setAttribute('fill','#cfe9ff')
      t1.setAttribute('font-size','12')
      t1.textContent = it.time
      svg.appendChild(t1)
      const t2 = document.createElementNS(svg.namespaceURI,'text')
      t2.setAttribute('x', 160 + barW + 8)
      t2.setAttribute('y', y + 18)
      t2.setAttribute('fill','#cfe9ff')
      t2.setAttribute('font-size','12')
      t2.textContent = it.count
      svg.appendChild(t2)
    })
    container.innerHTML = ''
    const title = document.createElement('div')
    title.style.color='#e6eef8'
    title.style.fontWeight='600'
    title.style.marginBottom='8px'
    title.textContent = 'Horários mais populares'
    container.appendChild(title)
    container.appendChild(svg)
  }

  function renderAll(){
    const c1 = document.getElementById('chart-daily')
    const c2 = document.getElementById('chart-times')
    if(c1) renderDailyChart(c1)
    if(c2) renderTimesChart(c2)
  }

  // expose
  window.renderStats = renderAll
  // auto-render on load
  document.addEventListener('DOMContentLoaded', renderAll)
  // listen to storage changes (other tabs)
  window.addEventListener('storage', function(){ setTimeout(renderAll,100) })

})();
