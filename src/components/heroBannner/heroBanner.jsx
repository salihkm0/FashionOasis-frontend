import {
  BannerContainer,
  BannerSubContainer,
  RightSubContainer,
  BannerImage ,
  SubBanner,
} from "../../styles/HeroBannerStyle.jsx";
import Banner_left_Image from "../../assets/images/left-banner-image.jpg";
import Banner_right_Image_1 from "../../assets/images/baner-right-image-01.jpg";
import Banner_right_Image_2 from "../../assets/images/baner-right-image-02.jpg";
import Banner_right_Image_3 from "../../assets/images/baner-right-image-03.jpg";
import Banner_right_Image_4 from "../../assets/images/baner-right-image-04.jpg";
import { Link } from "react-router-dom";
import { StyledContainer } from "../../styles/StyledContainer.jsx";

export const HeroBanner = () => {
  return (
    <StyledContainer>
      <BannerContainer>
        <Link>
          <BannerSubContainer className="w-full pr-1 flex-1 bg-red grid place-items-center">
            <BannerImage src={Banner_left_Image} />
            <div className="absolute">
              <h1 className="text-4xl font-bold text-white">
                Welcome to Our Shop
              </h1>
            </div>
          </BannerSubContainer>
        </Link>
        <RightSubContainer>
          <Link>
            <SubBanner>
              <BannerImage src={Banner_right_Image_1} />
              <div className="absolute">
                <h1 className="text-2xl font-bold text-white">Women Cloths</h1>
              </div>
            </SubBanner>
          </Link>
          <Link>
            <SubBanner>
              <BannerImage src={Banner_right_Image_2} />
              <div className="absolute">
                <h1 className="text-2xl font-bold text-white">Men Cloths</h1>
              </div>
            </SubBanner>
          </Link>
          <Link>
            <SubBanner>
              <BannerImage src={Banner_right_Image_3} />
              <div className="absolute">
                <h1 className="text-2xl font-bold text-white">Kids Cloths</h1>
              </div>
            </SubBanner>
          </Link>
          <Link>
            <SubBanner>
              <BannerImage src={Banner_right_Image_4} />
              <div className="absolute">
                <h1 className="text-2xl font-bold text-white">Accessories</h1>
              </div>
            </SubBanner>
          </Link>
        </RightSubContainer>
      </BannerContainer>
    </StyledContainer>
  );
};
