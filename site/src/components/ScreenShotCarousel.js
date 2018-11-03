import React from 'react'
import styled from 'styled-components'
import { Translate } from 'react-localize-redux'
import Slider from 'react-slick'

const settings = {
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

export default props =>
  <Wrap>
    <Slider {...settings}>
      <img src='/images/sh.jpg' alt='' />
      <img src='/images/sh.jpg' alt='' />
    </Slider>
    <Info>
      <h4><Translate id='pages.home.preview.title' /></h4>
      <p><Translate id='pages.home.preview.desc' /></p>
      <C2A onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}><Translate id='pages.home.preview.button' /></C2A>
    </Info>
  </Wrap>

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding 5rem 4rem;
  background: #20bf6b;

  background-color: #00b894;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");


  > .slick-slider {
    width: 18rem;
    border-radius: 13px;
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2), -2px -2px 12px rgba(0, 0, 0, 0.12);
  }
  .slick-list {
    border-radius: 13px;
    overflow: hidden;
  }
  img {
    display: block !important;
    height: 100%;
    overflow: hidden;
  }
  h4 {
    color: #fff;
    font-size: 3.8rem;
    font-weight: lighter;
    font-family: 'Knewave',cursive;
    text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    color: #fff;
    font-size: 3.5rem;
    font-weight: lighter;
    font-family: 'Knewave',cursive;
    text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
    margin: 0.2rem 0;
  }
  p {
    width: 60%;
    color: #fff;
    font-size: 1.3rem;
    text-align: center;
    font-family: 'oswald',cursive;
    margin-top: 0.2rem;
  }
`

const C2A = styled.button`
  color: #fff;
  font-size: 2.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  padding: 0.7rem 1.2rem;
  background: #f3a683;
  border: none;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Grand Hotel',cursive;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover{transform: translateY(-3px)}
`
