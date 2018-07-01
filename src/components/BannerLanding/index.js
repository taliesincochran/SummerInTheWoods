import React from 'react'

const BannerLanding = (props) => (
    <section id="banner" className={props.bannerClass}>
        <div className="inner">
            <header className="major">
                <h1>Summer In The Woods</h1>
            </header>
            <div className="content">
                <p>We are excited to offer a summer camp where free play is paramount, <br/>
                   where mud, dirt, water, and art are our curriculum, and most of all, <br />
                   where children can be children! We would love for your child to join us!
                </p>
            </div>
        </div>
    </section>
)

export default BannerLanding
