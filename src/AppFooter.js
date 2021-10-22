import React from 'react';

const AppFooter = () => {

    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <img id="footer-logo" src="assets/layout/images/birbLogoFondoTransparente.png" alt="diamond-layout" />
                <span className="app-name">Operaciones Inteligentes</span>
            </div>
            <span className="copyright">&#169; OITIC - 2021</span>
        </div>
    );
}

export default AppFooter;
