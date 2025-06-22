# GrapeFall

Pentru a realiza jocul am creeat un sprite pentru cos si un spritesheet pentru struguri ce contine pozitia initiala si o animatie de distrugere
Am adaugat in scena Game un obiect de tip Grape la x: intre 100, 700 si y: 0 pentru a incepe jocul
- daca strugurele se atinge de cos, va adauga +1 la scor si isi va reseta pozitia (disable body, +1 score, enablebody(reset: true, ..., x: (between 100, 700), y: 0, ...) ) dupa 1.5 secunde (folosind time.delayedCall)
- daca strugurele cade pe jos, va activa animatia de fall, iar in momentul in care animatia se opreste isi va reseta pozitia in acelasi mod
- dupa 60 de secunde (folosind time.add event, la fiecare secunda este apelata functia 'update timer' care scade timerul cu 1, in momentul in care timer = 0 jocul intra in scena GameOver)

Butoanele au fost setate prin setInteract(), iar apoi am definit fiecare stagiu al mouse ului (clicked, hover, idle)

Variabilele locale 'HighScore' si 'Score' au fost luate dintr-un script numit GlobalData.js care a fost importat in fiecare scena necesara si folosit cu init(data) 
