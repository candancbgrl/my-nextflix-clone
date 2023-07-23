import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import MainThumb from "@/components/MainThumb";
import AllMovies from "@/components/AllMovies";
import FavoritesList from "@/components/FavoritesList";
import InfoModal from "@/components/InfoModal";
import SeriesModal from "@/components/SeriesModal";

import useInfoModalStore from "@/hooks/useInfoModalStore";
import useSeriesModalStore from "@/hooks/useSeriesModalStore";

import Meta from "@/components/Meta";
import Layout from "@/layout/Layout";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/profiles",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Home() {
  const { isOpen: isInfoModalOpen, closeModal: closeInfoModal } =
    useInfoModalStore();
  const { isOpen: isSeriesModalOpen, closeModal: closeSeriesModal } =
    useSeriesModalStore();
  return (
    <div className="flex flex-col ">
      <Layout>
        <Meta title="Netflix Home" />
        <InfoModal visible={isInfoModalOpen} onClose={closeInfoModal} />
        <SeriesModal visible={isSeriesModalOpen} onClose={closeSeriesModal} />
        <MainThumb />
        <AllMovies />
        <FavoritesList />
      </Layout>
    </div>
  );
}
