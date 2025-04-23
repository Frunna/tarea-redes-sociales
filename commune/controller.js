export class Controller {
  getAllCommunes(req, res) {
    const allCommunes = [
      {
        id: "numero de comuna",
        name: "nombre comuna",
        province: "provincia comuna",
        address: "Dirección",
        mayor: "Alcalde comuna",
        surface: "Superficie comuna",
        population: "Población comunal",
      },
    ];

    return res.json(allCommunes);
  }
}
