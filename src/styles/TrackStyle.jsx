import Styled from "styled-components";

export const StyledSmallCard = Styled.div`
    width : 369px;
    height : 142px;
    background : #adadad33;
    backdrop-filter : blur(10px);
    padding : 10px;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`
export const SmallCardHeadding = Styled.h1`
    font-size : 1.2rem;
    font-weight : 800;
    color : #020202;
`
export const SmallCardDescription = Styled.p`
    font-size : .9rem;
    font-weight : 800;
    color : #434343;
`