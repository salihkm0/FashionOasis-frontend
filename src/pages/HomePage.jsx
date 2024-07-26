import React from 'react'
import { Category } from '../components/category/Category'
import { HeroBanner } from '../components/heroBannner/heroBanner'
import { HeroSection } from '../components/heroSection/HeroSection'
import { HomePageProductCard } from '../components/homePageProductCard/HomePageProductCard'
import { Track } from '../components/track/Track'


export const HomePage = () => {
  return (
    <>
    <HeroSection/>
    {/* <HeroBanner/> */}
    {/* <Category/> */}
    <HomePageProductCard/>
    <Track/>
    </>
  )
}
