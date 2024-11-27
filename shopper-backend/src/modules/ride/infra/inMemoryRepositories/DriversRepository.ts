import fs from "fs";

interface IDriver {
  id: number;
  name: string;
  description: string;
  car: string;
  rating: string;
  comment: string;
  rate: number;
  km: number;
}

interface IRace {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  driver: drive;
  value: number;
}

interface drive {
  id: number;
  name: string;
}

class DriversRepository {
  public findAll(): IDriver[] {
    const data: string = fs.readFileSync('drivers.json', 'utf-8')

    const drivers: IDriver[] = JSON.parse(data);

    if(!drivers.length){
      throw new Error("Nenhum motorista encontrado");
    }

    return drivers;
  }

  public findRacesId(customers_id: string, driver_id?: number | null): IRace[] {
    const data: string = fs.readFileSync('races.json', 'utf-8')

    const races: IRace[] = JSON.parse(data);

    let filteredRaces = races.filter(race => race.customer_id === customers_id);

    if (driver_id) {
      filteredRaces = filteredRaces.filter(races => races.driver.id === driver_id);
    }

    if(!filteredRaces.length){
      throw new Error("Nenhuma corrida encontrada encontrado");
    }

    return filteredRaces;
  }



  public createRace(payload: IRace) {
    const filePath = "races.json";

    fs.readFile(filePath, "utf-8", (err, data) => {

      let races = [];
      if (!err && data) {
        races = JSON.parse(data);
      }
      races.push(payload);

      fs.writeFile(filePath, JSON.stringify(races, null, 2), (writeErr) => {
        if (writeErr) {
          throw new Error('Error writing');
        }
      });

    });
    return {response: true}
  }
}

export default DriversRepository;