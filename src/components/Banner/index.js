import React from 'react'
const Banner = (props) => (
    <section id="banner" className={props.bannerClass}>
        <div className="inner">
            <header className="major">
                <h1>Summer In The Woods</h1>
            </header>
            <div className="content">
                <p>Summer Camp In Carrboro, North Carolina</p>
                <ul className="actions">
                    <li><a href="#one" className="button next scrolly">Learn More</a></li>
                </ul>
            </div>
        </div>
    </section>
)

export default Banner
