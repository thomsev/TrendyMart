import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = () => {
    return (
        <Helmet>
    <title>Awesome E-Commerce Store</title>
    
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <meta name="title" content="Awesome E-Commerce Store - Best Products Online" />
    <meta name="description" content="Shop the best products online at Awesome E-Commerce Store. Discover great deals, quality items, and amazing customer service." />
    <meta name="keywords" content="online shopping, e-commerce, best products, deals, store, buy online" />
    
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Awesome E-Commerce Store - Best Products Online" />
    <meta property="og:description" content="Shop the best products online at Awesome E-Commerce Store. Discover great deals, quality items, and amazing customer service." />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Awesome E-Commerce Store - Best Products Online" />
    <meta property="twitter:description" content="Shop the best products online at Awesome E-Commerce Store. Discover great deals, quality items, and amazing customer service." />
</Helmet>
 );
}

export default MetaTags;
