import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import NoAuthLayout from "@/layout/NoAuthLayout";
import Navbar from "@/component/landingpage/LandingPageHeader";
import HomeBanner from "@/component/landingpage/home/HomeBanner";


export default function Home() {
  return (
    <NoAuthLayout title="Home">
      <Navbar />
      <HomeBanner />
    </NoAuthLayout>
  );
}
