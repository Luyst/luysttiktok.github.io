function Header() {
    return ( 
    <header>
        <div className="inner">
            <div className="logo">
            <i class='bx bxl-tiktok'></i>
            <h3>TokTik</h3>
            </div>
            <div className="search">

                <form className="search-form" action="">
                    <input type="text" name="seach-input" id="seach-input" placeholder="Tìm kiếm"/>
                    <hc></hc>
                    <button type="submit">
                        <i class='bx bx-search'></i>
                    </button>
                </form>
            </div>
        </div>

    </header> 
    );
}

export default Header;