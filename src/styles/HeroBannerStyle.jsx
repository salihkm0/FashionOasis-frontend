import Styled from "styled-components";

export const BannerImage = Styled.img`
width: 100%;
height: 100%;
object-fit: cover;

`;
export const BannerContainer = Styled.div`
    width :  100%;
    height : auto;
    display : grid;
    gap : 20px;
    grid-template-columns : 1fr 1fr;
    grid-template-rows : 1fr;
    grid-template-areas : "banner banner";
    margin-top : 0px;
    @media (max-width : 768px){
        grid-template-columns : 1fr;
        grid-template-rows : 1fr;
        grid-template-areas : "banner";
        height : auto;
        }
`;
export const BannerSubContainer = Styled.div`
    display : grid;
    place-items : center;
    text-align :  center;
    width :  100%;
    max-width : 600px;
    height : 100%;
    /* background : #c30d0d; */
    flex-direction : row;
    min-width :300px;
    /* min-height : 300px; */
`;
export const RightSubContainer = Styled.div`
    display : grid;
    place-items : center;
    text-align :  center;
    width :  100%;
    max-width : 600px;
    height : 100%;
    /* background : #c30d0d; */
    flex-direction : row;
    min-width :300px;
    min-height : 300px;
    gap : 20px;
    grid-template-columns : 1fr 1fr;
    grid-template-rows : 1fr 1fr;
    grid-template-areas : "banner banner" "banner banner";
    /* @media (max-width : 768px){
        grid-template-columns : 1fr;
        grid-template-rows : 1fr;
        grid-template-areas : "banner";
        height : auto;
        } */
`;

export const SubBanner = Styled.div`
    display : grid;
    place-items : center;
    text-align :  center;
    height : 100%;
    width :  100%;
    background : #410dc3;
    @media (max-width : 768px){
        /* min-height : 300px; */

        }
`;
