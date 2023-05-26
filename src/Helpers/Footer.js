import "../Styles/Helpers.css"
function Footer(){
    return(
        <footer className="Footer">
            <div className="ContactWithUs">
                <h1>Contact With Us</h1>
                <div className="ContactWithUsIcons">
                <a target="blank" href="https://github.com/Mo7amed17"><i className="fa-brands fa-github fa-bounce"></i></a>
                <a target="blank" href="https://www.facebook.com/Mo7amed1717"><i className="fa-brands fa-facebook fa-bounce"></i></a>
                <a target="blank" href="https://www.linkedin.com/in/mo7amed-atef-13a903234/"><i className="fa-brands fa-linkedin fa-bounce"></i></a>
                <a target="blank" href="https://wa.me/01003693464"><i className="fa-brands fa-whatsapp fa-bounce"></i></a>
                </div>
                <a target="blank" href="https://mo7amed17.github.io/Portfolio/" className="OurProjects">Our Projects</a>
            </div>
        </footer>
    )
}

export default Footer