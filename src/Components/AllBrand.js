import React, { useState, useEffect } from "react";

const URL  = "https://proyecto-final-back-end-a466e2d08fab.herokuapp.com/allbrands";

function AllBrand() {
    const [brands, setBrands] = useState([]);
    const [generalError, setGeneralError] = useState('');
    const [noBrandsError, setNoBrandsError] = useState('');

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    setGeneralError('Ha ocurrido un error');
                    return;
                }

                const data = await response.json();
                if (data.length === 0) {
                    setNoBrandsError('No hay marcas disponibles');
                    setGeneralError('');
                    return;
                }
                setBrands(data);
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        };
        fetchBrands();
    }, []);

    return (
        <div className="AllBrand">
            <h1>Total: {brands.length}</h1>
            {brands.map((brand) => (
                <div key={brand.id}>
                    <div>Brand name: {brand.brand} </div>
                </div>
            ))}
            {noBrandsError && <p>{noBrandsError}</p>}
            {generalError && <p>{generalError}</p>}
        </div>
    );
}







export default AllBrand;
