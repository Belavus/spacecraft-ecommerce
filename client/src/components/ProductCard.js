import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const ProductCard = ({ product, onView, onAddToCart }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: showFullDescription ? 'unset' : 3,
                        maxHeight: showFullDescription ? 'none' : '4.5em',
                        transition: 'max-height 0.3s ease'
                    }}
                >
                    {product.description}
                </Typography>
                <Button size="small" color="primary" onClick={toggleDescription}>
                    {showFullDescription ? 'Show Less' : 'Read More'}
                </Button>
                <Typography variant="h6" color="text.primary">
                    ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.orderCount} sold
                </Typography>
            </CardContent>
            <CardActions>
                {onView && (
                    <Button size="small" color="primary" onClick={() => onView(product._id)}>
                        View
                    </Button>
                )}
                {onAddToCart && (
                    <Button size="small" color="secondary" onClick={() => onAddToCart(product._id)}>
                        Add to Cart
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProductCard;


// import React, { useState } from 'react';
// import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
//
// const ProductCard = ({ product, onView, onAddToCart }) => {
//     const [showFullDescription, setShowFullDescription] = useState(false);
//
//     const toggleDescription = () => {
//         setShowFullDescription(!showFullDescription);
//     };
//
//     return (
//         <Card>
//             <CardMedia
//                 component="img"
//                 height="140"
//                 image={product.imageUrl}
//                 alt={product.name}
//             />
//             <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                     {product.name}
//                 </Typography>
//                 <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     style={{
//                         overflow: 'hidden',
//                         display: '-webkit-box',
//                         WebkitBoxOrient: 'vertical',
//                         WebkitLineClamp: showFullDescription ? 'none' : 2,
//                         transition: 'max-height 0.3s ease',
//                         // maxHeight: showFullDescription ? 'none' : '4.5em'
//                     }}
//                 >
//                     {product.description}
//                 </Typography>
//                 <Button size="small" color="primary" onClick={toggleDescription}>
//                     {showFullDescription ? 'Show Less' : 'Read More'}
//                 </Button>
//                 <Typography variant="h6" color="text.primary">
//                     ${product.price}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     Orders: {product.orderCount}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 {onView && (
//                     <Button size="small" color="primary" onClick={() => onView(product._id)}>
//                         View
//                     </Button>
//                 )}
//                 {onAddToCart && (
//                     <Button size="small" color="secondary" onClick={() => onAddToCart(product._id)}>
//                         Add to Cart
//                     </Button>
//                 )}
//             </CardActions>
//         </Card>
//     );
// };
//
// export default ProductCard;



// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
//
// const ProductCard = ({ product, onView, onAddToCart }) => {
//     return (
//         <Card>
//             <CardMedia
//                 component="img"
//                 height="140"
//                 image={product.imageUrl}
//                 alt={product.name}
//             />
//             <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                     {product.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" noWrap={true}>
//                     {product.description}
//                 </Typography>
//                 <Typography variant="h6" color="text.primary">
//                     ${product.price}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     {product.orderCount} sold
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 {onView && (
//                     <Button size="small" color="primary" onClick={() => onView(product._id)}>
//                         View
//                     </Button>
//                 )}
//                 {onAddToCart && (
//                     <Button size="small" color="secondary" onClick={() => onAddToCart(product._id)}>
//                         Add to Cart
//                     </Button>
//                 )}
//             </CardActions>
//         </Card>
//     );
// };
//
// export default ProductCard;
