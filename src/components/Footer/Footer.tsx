function Footer () {
    const currentYear = new Date().getFullYear()

    return(
        <footer className="footer">
            <p>©{currentYear} | Edraque Maglaque, Seth Boyer, Zalak Punjani</p>
        </footer>
    )
}

export default Footer