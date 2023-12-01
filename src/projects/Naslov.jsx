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
          Slična metoda polovljenja, ali umesto uzimanja sredine intervala, koristi se tačka gde prava koja povezuje vrednosti funkcije na krajevima intervala seče x-osu. Ova tačka zatim postaje novi kraj intervala.
        </p>
        :
        <p>
          Ova metoda se koristi za numeričko rešavanje jednačina i zasnovana je na svojstvu neprekidnih funkcija da promene znak na intervalu gde funkcija ima koren. Metoda deli interval na pola i zadržava polovinu koja sadrži koren, sve dok ne dostigne zadatu tačnost.

        </p>}
    </div>
  );
}

export default Objasnjenje;