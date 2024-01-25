# POC url-query push ohne api calls

Wir wollen erreichen, dass die load funktionen auf dem server und dem client nicht getriggert werden, wenn der url-query sich updated. Da die normale goto-Methode dies allerdings macht müssen wir tricksen: wir überschreiben mit der history.pushState api lediglich die url. Allerdings müssen wir auch dafür sorgen, dass bei history-back manuell die komponente neu gerendert wird, da svelte dies nicht mitbekommt

In diesem simplen Beispiel ist das lediglich über einen reactive-state simuliert. in komplexeren scenarien macht es aber sinn z.b mit einem svelte-key zu arbeiten um nicht alle states manuell zu resetten (#key)

