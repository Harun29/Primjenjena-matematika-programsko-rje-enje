import { useEffect, useState } from "react";

const Objasnjenje = ({ metoda }) => {
  const [naslov, setNaslov] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (metoda === "regula") {
      setNaslov("Metoda Regula Falsi");
      setDescription("Ova metoda kombinuje ideje metode polovljenja i secirajuće tačke. Umjesto uzimanja sredine intervala, koristi se tačka gdje prava koja povezuje vrijednosti funkcije na krajevima intervala siječe x-osu. Ta tačka postaje novi kraj intervala.");
    } else if (metoda === "polovljenje") {
      setNaslov("Metoda Polovljenja Intervala");
      setDescription("Ova metoda se koristi za numeričko rješavanje jednačina i zasniva se na svojstvu neprekidnih funkcija da mijenjaju znak na intervalu gdje funkcija ima korjen. Metoda dijeli interval na pola i zadržava polovinu koja sadrži korjen, sve dok ne dostigne zadatu tačnost.");
    } else if (metoda === "prosta-iteracija") {
      setNaslov("Metoda Proste Iteracije");
      setDescription("Metoda proste iteracije je numerički algoritam za rješavanje jednačina. Ideja je iterativno poboljšavati pretpostavljeno rešenje. Na osnovu početne tačke, koristi se iterativna formula da bi se dobile naredne vrijednosti, ažurirajući pretpostavljeno rešenje sve dok ne dostignemo dovoljnu preciznost.");
    } else if (metoda === "newton") {
      setNaslov("Newton-Raphsonova Metoda");
      setDescription("Newton-Raphsonova metoda je iterativni numerički algoritam za aproksimaciju korjena realne funkcije. Metoda zahteva početnu pretpostavku i iterativno konvergira ka tačnom rešenju, koristeći tangenti liniju funkcije.");
    } else if (metoda === "modifikovan-newton") {
      setNaslov("Modifikovana Newton-Raphsonova Metoda");
      setDescription("Modifikovana Newton-Raphsonova metoda bi u svakom koraku koristila samo prvi izvod funkcije u toj tački kako bi izračunala novu pretpostavku. Važno je napomenuti da ova metoda može zahtijevati pažljiviji odabir početne vrijednosti kako bi bila efikasna.");
    }
  }, [metoda]);

  return (
    <div className="objasnjenje">
      <h1>{naslov}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Objasnjenje;
