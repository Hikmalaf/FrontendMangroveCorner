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

export function TentangCarbon() {
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
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/background-3.jpg')] bg-cover bg-center scale-105 z-60"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 scale-105 z-60"></div>
        <div className="relative container mx-auto h-full flex items-center justify-center px-4 sm:px-8 md:px-16 text-center text-white z-60">
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
          Tentang Karbon
        </Typography>
        <Typography className="text-blue-gray-500 font-normal leading-relaxed mb-8">
          Karbon memiliki peran yang sangat penting dalam menjaga keseimbangan ekosistem Bumi dan
          mitigasi perubahan iklim. Dalam konteks ekosistem pesisir, mangrove berfungsi sebagai
          salah satu penyerap karbon alami yang paling efisien. Melalui proses fotosintesis,
          mangrove menyerap karbon dioksida (CO₂) dari atmosfer dan menyimpannya dalam bentuk
          biomassa serta sedimen tanah, menjadikan ekosistem ini sebagai bagian penting dari blue
          carbon.
        </Typography>

        <Typography className="text-blue-gray-500 font-normal leading-relaxed mb-8">
          Blue carbon mengacu pada karbon yang disimpan di ekosistem pesisir dan laut, seperti
          mangrove, lamun, dan rawa-rawa. Hutan mangrove memiliki kemampuan luar biasa untuk
          menyimpan karbon hingga 20 kali lipat lebih banyak dibandingkan hutan daratan per hektar.
          Karbon ini disimpan dalam dua bentuk utama:
        </Typography>

        <div className="text-blue-gray-500 font-normal leading-relaxed mb-8">
          <ul className="list-disc ml-6 mt-2">
            <li>
              <strong>Karbon Biomassa:</strong> Karbon yang terkandung dalam jaringan pohon, seperti
              akar, batang, dan daun, dihasilkan dari proses fotosintesis yang menyerap karbon
              dioksida dari atmosfer.
            </li>
            <li>
              <strong>Karbon Tanah:</strong> Tanah mangrove kaya akan bahan organik yang mampu
              mengunci karbon selama ribuan tahun. Kondisi anaerob (minim oksigen) di tanah mangrove
              menjaga karbon ini tetap tersimpan dan mencegah pelepasan kembali ke atmosfer.
            </li>
          </ul>
        </div>

        <Typography className="text-blue-gray-500 font-normal leading-relaxed mb-8">
          Namun, ancaman kerusakan atau konversi lahan mangrove dapat menyebabkan pelepasan karbon
          yang tersimpan kembali ke atmosfer sebagai karbon dioksida, meningkatkan emisi gas rumah
          kaca, dan mempercepat perubahan iklim. Oleh karena itu, melindungi mangrove bukan hanya
          tentang menjaga ekosistem pesisir tetapi juga tentang mempertahankan salah satu solusi
          alami terbaik untuk mitigasi perubahan iklim.
        </Typography>

        <div className="my-8 p-6 bg-blue-gray-50 shadow rounded-lg">
          <Typography variant="h4" className="font-semibold mb-4">
            Simulasi Kehilangan Biomassa dan Karbon
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
