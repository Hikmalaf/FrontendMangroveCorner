import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";

const SPECIES_DATA = {
  "Aegiceras Corniculatum Leaves": {
    biomass: 10, // rata-rata biomassa per pohon dalam kg
    carbonFactor: 0.4682,
  },
  "Avecennia Marina Leaves": {
    biomass: 12,
    carbonFactor: 0.4682,
  },
  "Lumnitzera Racemosa Leaves": {
    biomass: 8,
    carbonFactor: 0.4682,
  },
  "Rhizophora Apiculata Leaves": {
    biomass: 15,
    carbonFactor: 0.4682,
  },
  "Rhizophora Mucronata Leaves": {
    biomass: 18,
    carbonFactor: 0.4682,
  },
  "Sonneratia Alba Leaves": {
    biomass: 20,
    carbonFactor: 0.4682,
  },
};

function AboutMangrovePage() {
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [biomassLost, setBiomassLost] = useState(null);
  const [carbonLost, setCarbonLost] = useState(null);

  const handleCalculateLoss = () => {
    if (!selectedSpecies) {
      alert("Please select a species.");
      return;
    }

    const speciesData = SPECIES_DATA[selectedSpecies];
    const biomass = speciesData.biomass;
    const carbon = biomass * speciesData.carbonFactor;

    setBiomassLost(biomass.toFixed(2));
    setCarbonLost(carbon.toFixed(2));
  };

  return (
    <>
      <section className="relative block h-[20vh] sm:h-[50vh] md:h-[60vh] lg:h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/background-3.jpg')] bg-cover bg-center scale-105 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 scale-105 z-0"></div>
        <div className="relative container mx-auto h-full flex items-center justify-center px-4 sm:px-8 md:px-16 text-center text-white z-2">
          <div>
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-4xl sm:text-5xl md:text-4xl font-semibold"
            >
              Pentingnya Menjaga Mangrove
            </Typography>
          </div>
        </div>
      </section>

      <div className="container mx-auto p-6">
        <Typography variant="h3" className="text-left font-bold mb-6">
          The Magical of Mangrove Forrest
        </Typography>
        <Typography className="text-blue-gray-500 font-normal leading-relaxed mb-8">
          Mangrove memainkan peran penting dalam mitigasi perubahan iklim, melindungi ekosistem
          pesisir, dan menyediakan habitat bagi banyak spesies. Penanaman kembali dan perlindungan
          mangrove membantu menjaga keseimbangan alam dan mendukung penghidupan masyarakat pesisir.
          <br />
          <br />
          Ekosistem mangrove menyimpan karbon biru yang signifikan, memberikan perlindungan alami
          terhadap badai, dan berperan sebagai penghalang alami dari abrasi. Oleh karena itu,
          melindungi hutan mangrove adalah tanggung jawab kita bersama untuk generasi masa depan.
        </Typography>

        <div className="my-8 p-6 bg-blue-gray-50 shadow rounded-lg">
          <Typography variant="h4" className="font-semibold mb-4">
            Simulasi Kehilangan Satu Pohon
          </Typography>
          <Typography className="text-blue-gray-700 mb-4">
            Pilih spesies mangrove untuk melihat berapa biomassa dan karbon yang hilang jika satu
            pohon mati.
          </Typography>
          <div className="mb-6">
            <label htmlFor="species" className="block text-sm font-medium text-blue-gray-700 mb-2">
              Pilih Spesies Mangrove
            </label>
            <select
              id="species"
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Spesies</option>
              {Object.keys(SPECIES_DATA).map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>
          </div>
          <Button
            onClick={handleCalculateLoss}
            className="bg-blue-500 text-white hover:bg-blue-700"
          >
            Hitung Kehilangan
          </Button>

          {biomassLost && carbonLost && (
            <div className="mt-6 p-4 bg-green-100 rounded-lg shadow">
              <Typography variant="h5" className="font-semibold">
                Hasil Simulasi:
              </Typography>
              <Typography className="text-blue-gray-700 mt-2">
                Kehilangan Biomassa: <strong>{biomassLost} kg</strong>
              </Typography>
              <Typography className="text-blue-gray-700 mt-2">
                Kehilangan Karbon: <strong>{carbonLost} kg</strong>
              </Typography>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AboutMangrovePage;
