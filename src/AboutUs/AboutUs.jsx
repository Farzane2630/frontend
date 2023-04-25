import React from 'react'
import AboutUsBox from '../Components/AboutUsBox/AboutUsBox'
import SectionHeader from '../Components/SectionHeader/SectionHeader'
import './AboutUs.css'

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="container">
        <SectionHeader
          title="ما چه کمکی بهتون میکنیم؟"
          subTitle="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست"
        />

        <div className="container">
          <div className="row">
            <AboutUsBox
              icon="fas fa-crown about-us__icon"
              title="اهمیت به کاربر"
              desc="اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست"
            />
            <AboutUsBox
              icon="fas fa-crown about-us__icon"
              title="اهمیت به کاربر"
              desc="اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست"
            />
            <AboutUsBox
              icon="fas fa-crown about-us__icon"
              title="اهمیت به کاربر"
              desc="اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست"
            />
            <AboutUsBox
              icon="fas fa-crown about-us__icon"
              title="اهمیت به کاربر"
              desc="اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
