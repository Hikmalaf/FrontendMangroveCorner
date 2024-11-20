import React, { useState, useRef, useEffect } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import axios from "axios";
import Chart from "chart.js/auto";

const SPECIES_DATA = {
  "Aegiceras Corniculatum Leaves": {
    density: 0.670,
    equation: (dbh) => 0.251 * 0.670 * Math.pow(dbh, 2.46),
  },
  "Avecennia Marina Leaves": {
    density: 0.661,
    equation: (dbh) => 0.1848 * Math.pow(dbh, 2.3624),
  },
  "Lumnitzera Racemosa Leaves": {
    density: 0.565,
    equation: (dbh) => 0.251 * 0.565 * Math.pow(dbh, 2.46),
  },
  "Rhizophora Apiculata Leaves": {
    density: 1.05,
    equation: (dbh) => 0.043 * Math.pow(dbh, 2.63),
  },
  "Rhizophora Mucronata Leaves": {
    density: 0.867,
    equation: (dbh) => 0.1466 * Math.pow(dbh, 2.3136),
  },
  "Sonneratia Alba Leaves": {
    density: 0.780,
    equation: (dbh) => 0.3841 * Math.pow(dbh, 2.101) * 0.780,
  },
};

export function Calculator() {
  const [plots, setPlots] = useState([{ dbh: "", density: "", species: "" }]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [results, setResults] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictionData, setPredictionData] = useState(null);

  const biomassChartRef = useRef(null);
  const carbonChartRef = useRef(null);

  const handleAddPlot = () => {
    setPlots([...plots, { dbh: "", density: "", species: "" }]);
  };

  const handlePlotChange = (index, field, value) => {
    const updatedPlots = [...plots];
    updatedPlots[index][field] = value;
    setPlots(updatedPlots);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleIdentify = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", image);
  
    try {
      // Gantilah URL API dengan URL publik Railway
      const response = await axios.post("https://mangrovecarbonasik-production.up.railway.app/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.species_name) {
        setPredictionData({
          species_name: response.data.species_name,
          accuracy: response.data.confidence ? (response.data.confidence * 100).toFixed(2) : "N/A",
        });
  
        setSelectedSpecies(response.data.species_name);
      } else {
        alert("No species prediction found.");
      }
  
      if (response.data.image_base64) {
        const base64Image = response.data.image_base64;
        setImagePreview(`data:image/png;base64,${base64Image}`);
      }
    } catch (error) {
      console.error("Error identifying species:", error);
      alert("Failed to identify species. Please try again.");
    }
  };
  

  const handleCalculate = () => {
    let totalBiomass = 0;
    let totalCarbon = 0;
    let totalCarbonPerHectare = 0;
    const plotResults = [];
  
    plots.forEach(({ dbh, density, species }, index) => {
      if (!species) {
        alert(`Please select a species for Plot ${index + 1}`);
        return;
      }
  
      const speciesData = SPECIES_DATA[species];
      if (!speciesData) {
        alert(`Species data not found for Plot ${index + 1}`);
        return;
      }
  
      const parsedDbh = parseFloat(dbh);
      const parsedDensity = parseFloat(density) || 0;
  
      if (!parsedDbh || parsedDbh <= 0) {
        alert(`Invalid DBH value in Plot ${index + 1}`);
        return;
      }
  
      const biomass = speciesData.equation(parsedDbh);
      const carbonStock = biomass * 0.4682;
      const carbonStockPerHectare = parsedDensity > 0
        ? (carbonStock * parsedDensity) / 1000
        : 0;
  
      totalBiomass += biomass;
      totalCarbon += carbonStock;
      totalCarbonPerHectare += carbonStockPerHectare;
  
      plotResults.push({
        plot: index + 1,
        species: species,
        biomass: biomass.toFixed(2),
        carbonStock: carbonStock.toFixed(2),
        carbonStockPerHectare: carbonStockPerHectare.toFixed(2),
      });
    });
  
    // Set results after recalculation
    setResults({
      totalBiomass: totalBiomass.toFixed(2),
      totalCarbon: totalCarbon.toFixed(2),
      totalCarbonPerHectare: totalCarbonPerHectare.toFixed(2),
      plotResults,
    });
  };

  const displayCharts = (plotResults) => {
    const ctxBiomass = biomassChartRef.current.getContext("2d");
    const ctxCarbon = carbonChartRef.current.getContext("2d");

    const labels = plotResults.map((result) => `Plot ${result.plot}`);
    const biomasses = plotResults.map((result) => parseFloat(result.biomass)).filter(val => !isNaN(val));
    const carbonStocksPerHectare = plotResults.map((result) =>
      parseFloat(result.carbonStockPerHectare)
    ).filter(val => !isNaN(val));

    if (biomasses.length > 0) {
      new Chart(ctxBiomass, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Biomass (Kg)",
              data: biomasses,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    if (carbonStocksPerHectare.length > 0) {
      new Chart(ctxCarbon, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Carbon Stock per Hectare (ton C/Ha)",
              data: carbonStocksPerHectare,
              backgroundColor: "rgba(255, 159, 64, 0.6)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value.toFixed(2);
                },
              },
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (results && results.plotResults) {
      displayCharts(results.plotResults);
    }
  }, [results]);

  return (
    <>
      <section className="relative block h-[20vh] sm:h-[50vh] md:h-[60vh] lg:h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/background-3.jpg')] bg-cover bg-center scale-105 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 scale-105 z-0"></div>
        <div className="relative container mx-auto h-full flex items-center justify-center px-4 sm:px-8 md:px-16 text-center text-white z-2">
          <div>
            <Typography variant="h1" color="white" className="mb-4 text-4xl sm:text-5xl md:text-4xl font-semibold">
              Mangrove Biomass and Carbon Calculator
            </Typography>
            <Typography variant="h5" color="white" className="mb-6 text-lg sm:text-xl md:text-xl">
              Upload gambar untuk mengidentifikasi spesies dan kalkulator biomassa dan carbon.
            </Typography>
          </div>
        </div>
      </section>
      <div className="p-8 max-w-8xl mx-auto bg-white shadow-lg rounded-lg">
        <Typography variant="h4" className="text-center mb-6">Mangrove Biomass Calculator</Typography>
    
        {/* Image Upload */}
        <div className="mb-6">
          <Input type="file" onChange={handleImageChange} label="Upload Image for Identification" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-42 h-auto" />}
          <Button onClick={handleIdentify} color="green" className="mt-2">Identify Species</Button>
          {predictionData && (
            <div className="mt-4">
              <Typography variant="paragraph">Predicted Species: {predictionData.species_name}</Typography>
              <Typography variant="paragraph">Confidence: {predictionData.accuracy}%</Typography>
            </div>
          )}
        </div>
        {/* Plot Inputs */}
        <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-2">
        {plots.map((plot, index) => (
          <div key={index} className="flex gap-4">
            <Input
              type="number"
              value={plot.dbh}
              onChange={(e) => handlePlotChange(index, "dbh", e.target.value)}
              label={`Plot ${index + 1} - DBH (cm)`}
              className="flex-1"
            />
            <Input
              type="number"
              value={plot.density}
              onChange={(e) => handlePlotChange(index, "density", e.target.value)}
              label={`Plot ${index + 1} - Density`}
              className="flex-1"
            />
            <select
              value={plot.species}
              onChange={(e) => handlePlotChange(index, "species", e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Species</option>
              {Object.keys(SPECIES_DATA).map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

          <Button className="mt-4" onClick={handleAddPlot}>Tambah Plot</Button>

          <div className="mt-6 flex justify-center">
            <Button color="blue" onClick={handleCalculate}>Kalkulasi Biomass dan Carbon</Button>
          </div>
        {results && (
          <div className="mt-8">

            {/* Display Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div>
                <canvas ref={biomassChartRef} />
              </div>
              <div>
                <canvas ref={carbonChartRef} />
              </div>
            </div>
          </div>
        )}
                {results && (
          <div className="mt-4">
            <Typography variant="h6">Total Biomass: {results.totalBiomass} Kg</Typography>
            <Typography variant="h6">Total Carbon Stock: {results.totalCarbon} Kg/Tree</Typography>
            <Typography variant="h6">Total Carbon Stock per Hectare: {results.totalCarbonPerHectare} ton/Ha</Typography>
          </div>
        )}
{results && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <Typography variant="h5" className="mb-4">
            Insight Tambahan
          </Typography>
          <p className="text-gray-700 leading-relaxed">
            Provinsi Banten menghasilkan emisi karbon sebesar{" "}
            <strong>361.35 ton CO<sub>2</sub>/tahun</strong>, yang setara dengan
            kemampuan serapan karbon dari <strong>30.11 hektar mangrove</strong>{" "}
            dalam kondisi optimal.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Berdasarkan hasil perhitungan, total karbon yang tersimpan di
            mangrove ini adalah <strong>{results.totalCarbon} Kg</strong> dengan
            kapasitas per hektar sebesar{" "}
            <strong>{results.totalCarbonPerHectare} ton C/Ha</strong>. Artinya, masih
            diperlukan upaya peningkatan luasan mangrove untuk mencapai
            keseimbangan dengan emisi karbon kendaraan.
          </p>
        </div>

      )}
      </div>


    </>
  );
}
