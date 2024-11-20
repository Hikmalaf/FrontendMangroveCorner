import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const Donasi = () => {
  const [emissions, setEmissions] = useState(0);
  const [mangroveCount, setMangroveCount] = useState(0);
  const [donationMangroves, setDonationMangroves] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showDonationDetails, setShowDonationDetails] = useState(false);

  const emissionFactors = {
    motorcycle: { emission: 0.85, mangroves: 4 },
    car_petrol: { emission: 2.44, mangroves: 13 },
    car_diesel: { emission: 2.6, mangroves: 14 },
    minibus: { emission: 3.35, mangroves: 18 },
  };

  const mangrovePrice = 3000;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const vehicleType = event.target.vehicleType.value;
    const distance = parseInt(event.target.distance.value, 10);

    const { emission, mangroves } = emissionFactors[vehicleType];
    const multiplier = distance / 10;

    const calculatedEmissions = emission * multiplier;
    const calculatedMangroveCount = mangroves * multiplier;

    setEmissions(calculatedEmissions.toFixed(2));
    setMangroveCount(Math.ceil(calculatedMangroveCount));
    setShowResult(true);
  };

  const handleCalculateDonation = () => {
    const total = donationMangroves * mangrovePrice;
    setTotalDonation(total);
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
              Donasi Mangrove
            </Typography>
          </div>
        </div>
      </section>

      <main className="p-8">
        <div className="max-w-full mx-auto bg-white p-10 shadow-xl rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Donasi Mangrove Berdasarkan Emisi Karbon Yang Anda Hasilkan</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="vehicleType" className="block text-gray-700">
                Jenis Kendaraan
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                className="w-full border-gray-300 rounded-md"
                required
              >
                <option value="motorcycle">Sepeda Motor</option>
                <option value="car_petrol">Mobil (Bensin)</option>
                <option value="car_diesel">Mobil (Diesel)</option>
                <option value="minibus">Minibus</option>
              </select>
            </div>

            <div>
              <label htmlFor="distance" className="block text-gray-700">
                Jarak Tempuh (km)
              </label>
              <select
                id="distance"
                name="distance"
                className="w-full border-gray-300 rounded-md"
                required
              >
                <option value="10">10 km</option>
                <option value="20">20 km</option>
                <option value="30">30 km</option>
                <option value="40">40 km</option>
                <option value="50">50 km</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-500"
            >
              Hitung Emisi Karbon
            </button>
          </form>

          {showResult && (
            <div id="result" className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Hasil Emisi Karbon</h3>
              <p className="text-gray-700 mt-2">
                Emisi karbon yang dihasilkan: <strong>{emissions} kg CO₂ per hari</strong>
              </p>
              <p className="text-gray-700">
                Maka Anda Perlu Menanam: <strong>{mangroveCount} bibit mangrove</strong>
              </p>

              {/* Gambar tanpa wadah */}
              <h4 className="font-semibold text-gray-800 mt-4">Spesifikasi Bibit Mangrove (Rhizophora sp.)</h4>
              <img
                src="/img/carbonconer.png"
                alt="Poster Spesifikasi Mangrove"
                className="max-w-[35%] mx-auto my-4"
              />

              <div>
                <label htmlFor="donationMangroves" className="block text-gray-700">
                  Jumlah Mangrove yang ingin didonasikan
                </label>
                <input
                  type="number"
                  id="donationMangroves"
                  min="1"
                  placeholder="Masukkan jumlah mangrove"
                  className="w-full border-gray-300 rounded-md mt-2"
                  required
                  value={donationMangroves}
                  onChange={(e) => setDonationMangroves(parseInt(e.target.value, 10) || 0)}
                />
                <p className="text-gray-700 mt-2">
                  Total Donasi: <strong>Rp {totalDonation.toLocaleString()}</strong>
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleCalculateDonation}
                  className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-500"
                >
                  Hitung Donasi
                </button>
                <button
                  onClick={() => setShowDonationDetails(true)}
                  className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-500"
                >
                  Donasi Bibit Mangrove
                </button>
              </div>
            </div>
          )}

          {showDonationDetails && (
            <div
              id="donationDetails"
              className="mt-6 bg-gray-50 p-4 border border-gray-300 rounded-md"
            >
              <h3 className="text-lg font-semibold text-gray-800">Informasi Pembayaran</h3>
              <p className="text-gray-700">Silakan lakukan pembayaran ke salah satu rekening berikut:</p>
              <ul className="text-gray-700 mt-2 space-y-1">
                <li>
                  <strong>Seabank:</strong> 901820051380 a.n Ramzan (Carbon Corner)
                </li>
                <li>
                  <strong>Dana:</strong> 085735042179 a.n Fawwaz (Carbon Corner)
                </li>
              </ul>

              {/* Gambar QR tanpa wadah */}
              <h4 className="font-semibold text-gray-800 mt-4">QR Code Pembayaran</h4>
              <img
                src="/img/QR.jpg"
                alt="QR Code Pembayaran"
                className="max-w-[65%] mx-auto my-4"
              />

              <p className="text-gray-700 mt-2">
                Setelah pembayaran, harap upload bukti pembayaran di link berikut:
              </p>
              <a
                href="https://forms.gle/3CFF7YrpwhPG8cSZA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 underline"
              >
                Formulir Upload Bukti Pembayaran
              </a>
              <p className="text-gray-700 mt-2">Terima kasih atas kontribusi Anda dalam melindungi lingkungan!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Donasi;
