<script lang="ts">

  // ein goto sorgt dafür, dass der normale page-update zyklus durchlaufen wird
  // stattdessen updaten wir lediglich die url (mit pushState) und setzen die query
  // da svelte die interne navigationslogik im history-state speichert, müssen wir
  // diesen state mitnehmen um die gatsby internen prozesse nicht zu stören
  // allerdings haben wir in der history jetzt zwei einträge mit den selben keys
  // in diesem simplen szenario konnte ich hier zwar keine probleme feststellen
  // aber in einem komplexerem szenario wo der kunde weiter navigiert und dann mehrmals den
  // history-back button klickt könnte es evt zu problemen kommen (muss getestet werden)
  function setUrlQuery(query:string) {
    const newUrl = location.pathname + query
    const state = history.state
    history.pushState({...state}, '', newUrl)

    // wenn man bei history-back auf die vorherige route kommen will, dann folgende zeile verwenden
    // dann benötigt man zeile 33 auch nicht mehr
    // history.replaceState({...state}, '', newUrl)
  }

  // lediglich eine variable um zu verifizieren, dass der history-back wieder den state der ersten seite lädt
  // (verhalten mus allerdings manuell implementiert werden. siehe zeile 33)
  let query = ''

  const onButtonClick = () => {
    query = '?foo=bar'
    setUrlQuery('?foo=bar')
  }

  // der history back bleibt technisch ja auf der selben seite. d.h die komponente weiß nicht, das sich die
  // url geupdated hat und triggert deswegen auch keinen re-render. da die anzeige ja von dem url-query abhängt
  // müssen wir manuell dafür sorgen, dass die relevanten states sich resetten
  if(typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
      if(query) query = ''
    })
  }
  
</script>

<button on:click={onButtonClick}>
  add query
</button>
<div>current-query: {query}</div>

<!-- andere code-teile sind vom update nicht betroffen -->
<div>{console.log('render')}</div>
