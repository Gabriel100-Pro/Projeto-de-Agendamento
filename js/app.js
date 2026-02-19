(() => {
  const STORAGE_KEY = 'sistema_agendamento_bookings'

  function $(sel){return document.querySelector(sel)}
  function getBookings(){return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')}
  function saveBookings(arr){localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))}

  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}

  function populateTimeOptions(){
    const select = $('#time')
    select.innerHTML = ''
    // 08:00 to 17:30, 30-min slots
    for(let h=8; h<=17; h++){
      ['00','30'].forEach(m=>{
        const hh = String(h).padStart(2,'0')
        const val = `${hh}:${m}`
        const opt = document.createElement('option')
        opt.value = val
        opt.textContent = val
        select.appendChild(opt)
      })
    }
  }

  function formatDateLocal(d){return d}

  function setMinDateToday(){
    const input = $('#date')
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth()+1).padStart(2,'0')
    const dd = String(today.getDate()).padStart(2,'0')
    input.min = `${yyyy}-${mm}-${dd}`
  }

  function showBookedForDate(date){
    const container = $('#booked-list')
    if(!date){container.textContent='Selecione uma data para ver horários agendados.';return}
    const bookings = getBookings().filter(b=>b.date===date).sort((a,b)=>a.time.localeCompare(b.time))
    if(bookings.length===0){container.textContent='Nenhum agendamento para esta data.';return}
    const ul = document.createElement('div')
    ul.innerHTML = bookings.map(b=>`<div><strong>${b.time}</strong> — ${b.name} (${b.email})</div>`).join('')
    container.innerHTML=''
    container.appendChild(ul)
  }

  function validateForm(formData){
    const name = formData.get('name')?.trim()
    const email = formData.get('email')?.trim()
    const phone = formData.get('phone')?.trim()
    const date = formData.get('date')
    const time = formData.get('time')
    if(!name || name.length<2) return 'Informe um nome válido.'
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Informe um email válido.'
    if(!phone || phone.length<6) return 'Informe um telefone válido.'
    if(!date) return 'Informe uma data.'
    if(!time) return 'Informe um horário.'
    const today = new Date(); const sel = new Date(date + 'T' + time)
    if(sel < new Date(today.toDateString())) return 'Não é possível agendar em data passada.'
    return null
  }

  function hasConflict(date,time){
    return getBookings().some(b=>b.date===date && b.time===time)
  }

  function onSubmit(e){
    e.preventDefault()
    const form = e.target
    const fd = new FormData(form)
    const err = validateForm(fd)
    if(err){
      showBanner(err,{primaryText:'Fechar'})
      return
    }
    const name = fd.get('name').trim()
    const email = fd.get('email').trim()
    const phone = fd.get('phone').trim()
    const date = fd.get('date')
    const time = fd.get('time')
    if(hasConflict(date,time)){
      showBanner('Horário já reservado. Escolha outro.',{primaryText:'Fechar'})
      return
    }
    const bookings = getBookings()
    bookings.push({id:uid(),name,email,phone,date,time,created:Date.now()})
    saveBookings(bookings)
    showBanner('Agendado com sucesso!',{primaryText:'Fechar'})
    form.reset()
    showBookedForDate(date)
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    populateTimeOptions()
    setMinDateToday()
    $('#booking-form').addEventListener('submit', onSubmit)
    $('#date').addEventListener('change', e=>showBookedForDate(e.target.value))
  })

})();
