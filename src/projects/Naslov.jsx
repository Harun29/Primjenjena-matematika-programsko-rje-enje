const Objasnjenje = ({ metoda }) => {


  return (
    <div className="objasnjenje">
      {metoda === "regula" ?
        <h1>
          metoda regula falsi
        </h1>
        :
        <h1>
          metoda polovljenja intervala
        </h1>}
      {metoda === "regula" ?
        <p>
          Slična metoda polovljenja, ali umjesto uzimanja sredine intervala, koristi se tačka gdje prava koja povezuje vrijednosti funkcije na krajevima intervala siječe x-osu. Ova tačka zatim postaje novi kraj intervala.
        </p>
        :
        <p>
          Ova metoda se koristi za numeričko rješavanje jednačina i zasnovana je na svojstvu neprekidnih funkcija da promijene znak na intervalu gdje funkcija ima korjen. Metoda dijeli interval na pola i zadržava polovinu koja sadrži korjen, sve dok ne dostigne zadatu tačnost.
        </p>}
    </div>
  );
}

export default Objasnjenje;