import React from "react";
import { Link } from "react-router-dom"; // Import Link
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

export function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.jpg')] bg-cover bg-center bg-opacity-50" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center">
            <div className="ml-auto mr-auto w-full text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl"
              >
                Mangrove Bukan Hanya Sekedar Pohon, Tetapi Kehidupan.
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="opacity-80 text-lg sm:text-xl md:text-2xl mb-8"
              >
                Dibandingkan Dengan Jenis Hutan Lainnya, Mangrove Memiliki Tingkat Penangkapan Karbon Yang Sangat Tinggi, 
                Suatu Jasa Yang Bermanfaat Bagi Ekosistem Keseluruhan. Tanah Bakau Menyimpan Hampir 6,4 Miliar Ton Karbon Tersimpan Secara Global
              </Typography>

              {/* Donasi Button Section */}
              <Link to="/donasi">
                <Button
                  variant="filled"
                  className="px-6 py-3 text-lg font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500 transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Donasi Mangrove
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description, path }) => (
              <Link to={path} key={title}> {/* Wrap FeatureCard in a Link */}
                <FeatureCard
                  color={color}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                  description={description}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Mangrove Section */}
      <section className="mt-32 flex flex-wrap items-center px-4">
        <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
            <FingerPrintIcon className="h-8 w-8 text-white " />
          </div>
          <Typography variant="h3" className="mb-3 font-bold" color="blue-gray">
            Mengapa Mangrove?
          </Typography>
          <Typography className="mb-8 font-normal text-blue-gray-500">
            Mangrove memiliki peran penting dalam menjaga keseimbangan ekosistem global,
            terutama dalam menyerap karbon dan menyimpan biomassa karbon.
            Ekosistem mangrove dapat menyerap karbon hingga lima kali lebih banyak dibandingkan hutan tropis lainnya,
            menjadikannya salah satu penyimpan karbon biru terbesar di dunia.
            <br />
            Dengan melindungi mangrove,
            kita tidak hanya mendukung mitigasi perubahan iklim melalui penyerapan karbon,
            tetapi juga melindungi habitat bagi berbagai spesies dan memperkuat perlindungan pesisir dari bencana alam seperti abrasi dan badai.
          </Typography>

          {/* Read More Button */}
          <Link to="/mangrove">
            <Button variant="filled">Read More</Button>
          </Link>
        </div>

        {/* Team Card Section */}
        <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
          <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
            <CardHeader floated={false} className="relative h-56">
              <img alt="Card Image" src="/img/teamwork.jpg" className="h-full w-full object-cover" />
            </CardHeader>
            <CardBody>
              <Typography variant="small" color="blue-gray" className="font-normal">
                Universitas Pendidikan Indonesia
              </Typography>
              <Typography variant="h5" color="blue-gray" className="mb-3 mt-2 font-bold">
                Satu Pohon Untuk Ribuan Kehidupan
              </Typography>
              <Typography className="font-normal text-blue-gray-500">
                The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
            Tim kami adalah kelompok individu yang penuh semangat dan berdedikasi untuk mendorong perubahan.
            Kami bekerja sama untuk menghadapi tantangan global dan merancang solusi inovatif demi masa depan yang lebih berkelanjutan.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name, url }) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                        <IconButton color={color} variant="text">
                          <i className={`fa-brands text-xl fa-${name}`} />
                        </IconButton>
                      </a>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
    <section className="relative bg-white py-24 px-4">
      <div className="container mx-auto">
        <PageTitle section="Berita Media" heading="Beberapa Kegiatan Kami">
            Universitas Pendidikan Indonesia Sebagai Pilar Pendidikan Memfasilitasi Mahasiswanya Agar Dapat Berkembang Dengan Maksimal.
        </PageTitle>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
            <CardHeader floated={false} className="relative h-56">
              <img
                alt="Card Image"
                src="/img/berita-1.jpg"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="small" color="blue-gray" className="font-normal">
                Universitas Pendidikan Indonesia
              </Typography>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-3 mt-2 font-bold"
              >
                Satu Pohon Untuk Ribuan Kehidupan
              </Typography>
              <Typography className="font-normal text-blue-gray-500">
                Mangrove adalah salah satu ekosistem penting untuk melindungi pesisir dan
                menjaga keberlanjutan kehidupan di bumi.
              </Typography>
            </CardBody>
          </Card>
          <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
            <CardHeader floated={false} className="relative h-56">
              <img
                alt="Card Image"
                src="/img/berita-2.jpg"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="small" color="blue-gray" className="font-normal">
                Universitas Pendidikan Indonesia
              </Typography>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-3 mt-2 font-bold"
              >
                Menanam Harapan untuk Masa Depan
              </Typography>
              <Typography className="font-normal text-blue-gray-500">
                Tanam satu pohon untuk membantu menyelamatkan bumi dari kerusakan iklim
                dan bencana alam.
              </Typography>
            </CardBody>
          </Card>
          <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
            <CardHeader floated={false} className="relative h-56">
              <img
                alt="Card Image"
                src="/img/berita-3.jpg"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="small" color="blue-gray" className="font-normal">
                Universitas Pendidikan Indonesia
              </Typography>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-3 mt-2 font-bold"
              >
                Bersama Kita Lindungi Lingkungan
              </Typography>
              <Typography className="font-normal text-blue-gray-500">
                Dengan kerja sama, kita bisa mencapai kehidupan yang lebih sehat dan
                berkelanjutan bagi semua makhluk hidup.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
    </>
  );
}

export default Home;
