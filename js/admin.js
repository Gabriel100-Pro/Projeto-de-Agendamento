(function(){
  const STORAGE_KEY = 'sistema_agendamento_bookings'
  function $(s){return document.querySelector(s)}
  function getBookings(){return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')}
  function saveBookings(arr){localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))}

  function renderTable(filterDate){
    const tbody = $('#bookings-table tbody')
    const bookings = getBookings().filter(b=>!filterDate||b.date===filterDate).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time))
    tbody.innerHTML = ''
    if(bookings.length===0){
      tbody.innerHTML = '<tr><td colspan="6">Nenhum agendamento</td></tr>'
      // still render stats
      if(window.renderStats) window.renderStats()
      return
    }
    const headers = ['Nome','Email','Telefone','Data','Horário','Ações']
    bookings.forEach(b=>{
      const tr = document.createElement('tr')
      const cells = [b.name,b.email,b.phone,b.date,b.time,`<button data-id="${b.id}" class="del">Excluir</button>`]
      cells.forEach((c,i)=>{
        const td = document.createElement('td')
        td.setAttribute('data-label', headers[i])
        td.innerHTML = c
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
    })
    if(window.renderStats) window.renderStats()
  }

  function deleteBooking(id){
    const arr = getBookings().filter(b=>b.id!==id)
    saveBookings(arr)
    renderTable($('#filter-date').value)
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderTable()
    $('#filter-date').addEventListener('change', e=>renderTable(e.target.value))
    $('#clear-filter').addEventListener('click', ()=>{ $('#filter-date').value=''; renderTable() })
    $('#clear-all').addEventListener('click', async ()=>{
      const ok = await showConfirm('Tem certeza?','Excluir todos os agendamentos?')
      if(!ok) return
      localStorage.removeItem(STORAGE_KEY)
      renderTable()
    })
    document.querySelector('#bookings-table tbody').addEventListener('click', async e=>{
      if(e.target.matches('button.del')){
        const id = e.target.getAttribute('data-id')
        const ok = await showConfirm('Tem certeza?','Excluir este agendamento?')
        if(ok) deleteBooking(id)
      }
    })
  })

})();
