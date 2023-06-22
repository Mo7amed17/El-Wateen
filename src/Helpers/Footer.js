import "../Styles/Helpers.css"
function Footer(){
    return(
        <footer className="Footer">
                <h1>Contact With Us</h1>
                <div className="FlexFooter">
            <div className="ContactWithUs">
                <h4>Mohamed Atef</h4>
                <h5>Front-End Developer</h5>
                <div className="ContactWithUsIcons">
                <a target="blank" href="https://github.com/Mo7amed17"><i className="fa-brands fa-github fa-bounce"></i></a>
                <a target="blank" href="https://www.facebook.com/Mo7amed1717"><i className="fa-brands fa-facebook fa-bounce"></i></a>
                <a target="blank" href="https://www.linkedin.com/in/mo7amed-atef-13a903234/"><i className="fa-brands fa-linkedin fa-bounce"></i></a>
                <a target="blank" href="https://wa.me/01003693464"><i className="fa-brands fa-whatsapp fa-bounce"></i></a>
                </div>
                <a target="blank" href="https://mo7amed17.github.io/Portfolio/" className="OurProjects">Projects</a>
            </div>

            <div className="ContactWithUs">
                    <h4>Mohamed Etman</h4>
                    <h5>Grapgic Designer & Ui/Ux</h5>
                <div className="ContactWithUsIcons">
                <a target="blank" href="https://www.behance.net/mohamedetm"><i className="fa-brands fa-behance fa-bounce"></i></a>
                <a target="blank" href="https://www.facebook.com/profile.php?id=100008173418000"><i className="fa-brands fa-facebook fa-bounce"></i></a>
                <a target="blank" href="linkedin.com/in/mohamed-etman-871632213"><i className="fa-brands fa-linkedin fa-bounce"></i></a>
                <a target="blank" href="https://wa.me/01012153271"><i className="fa-brands fa-whatsapp fa-bounce"></i></a>
                </div>
                <a target="blank" href="https://www.behance.net/mohamedetm" className="OurProjects">Projects</a>
            </div>

            </div>
        </footer>
    )
}

export default Footer