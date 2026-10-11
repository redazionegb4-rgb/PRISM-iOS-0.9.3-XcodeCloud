# PRISM 0.14.17 — nuovi raggi di ricerca

**Free: fino a 40 km. PRISM EXTRA: fino a 150 km.**

Aggiornati i limiti sul server, i filtri Android/iOS, le storie, il raggio dal centro città, le schede dei piani e il confronto/FAQ sul sito. La distanza già scelta resta invariata se valida. Se EXTRA scade o viene disattivato e la distanza supera 40 km, viene ridotta a 40 km. I preferiti restano disponibili anche fuori dal raggio scelto. Non cambia il prezzo dell’abbonamento.

## Ordine di aggiornamento

1. Installa **backend 0.3.34** sul VPS principale.
2. Installa **sito 1.3.7** sul VPS del sito.
3. Aggiorna Android con **APK 0.14.17 / codice versione 77**.
4. Carica il progetto iOS **0.14.17 / build 68** e avvia Xcode Cloud come di consueto. Lo ZIP è il progetto completo, non un IPA compilato.

Carica i due ZIP del server con WinSCP in `/home/ubuntu` (se l’utente SSH è diverso, usa la sua cartella).

Backend:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.34.zip prism-backend-034
cd prism-backend-034/PRISM-backend
sudo bash install.sh
```

Sito:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-sito-1.3.7-VPS.zip prism-sito-137
cd prism-sito-137/PRISM-site-1.3.7
sudo bash install-site.sh
```

Il popup di iscrizione al lancio resta immediato, senza conferma email, e non ricompare nello stesso browser dopo l’iscrizione. Le altre funzioni e la grafica delle versioni precedenti sono mantenute.

## Prova

- Con Free, apri la distanza di ricerca: il cursore deve arrivare a 40 km; verifica griglia e storie.
- Con EXTRA, il cursore deve arrivare a 150 km sia vicino a te sia nella scelta di un’altra città.
- Tornando a Free da un raggio di 150 km, il raggio deve diventare 40 km; una distanza già scelta di 12 km deve restare 12 km.
- Controlla la tabella dei piani sul sito e nelle app. Usa Ctrl+F5 sul sito dopo l’aggiornamento.

## Verifiche

149 test backend superati, inclusi i confini 40/150 km e il rifiuto dei raggi non consentiti. Test DOM Android/iOS su cursori, piani, ricerca città e cambio piano; sintassi JavaScript/Python e script verificati. APK allineato e firma verificata con la stessa chiave della versione precedente. Integrità ZIP e corrispondenza degli asset condivisi controllate.

Nessuna installazione remota effettuata. La compilazione iOS e il funzionamento sui telefoni reali vanno verificati tramite Xcode Cloud/TestFlight e dispositivi.
