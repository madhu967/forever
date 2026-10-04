
import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';


//function for add product
const addProduct =async (req,res)=>{

    try {
        
        const { name,description,price,category,subCategory,sizes,bestseller} =req.body

        const image1 = req.files && req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files && req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files && req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files && req.files.image4 ? req.files.image4[0] : null;

        const images = [image1, image2, image3, image4].filter((item) => item != null);

        if (images.length === 0) {
            return res.json({ success: false, message: 'Please upload at least one product image' });
        }

        let imagesUrl = [];
        try {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        } catch (uploadErr) {
            console.error('Cloudinary upload error:', uploadErr);
            return res.json({ success: false, message: 'Image upload failed: ' + uploadErr.message });
        }

        let parsedSizes = [];
        try {
            parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : (sizes || []);
        } catch (e) {
            parsedSizes = ['M'];
        }
        if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
            parsedSizes = ['M'];
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' || bestseller === true,
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product Added' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//function for list product

const listProducts =async (req,res)=>{

    try {
        
        const products =await productModel.find({});
        res.json({success:true,products});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for removing product

const removeProduct =async (req,res)=>{

    try {
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product Removed"});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for single product  inof

const singleProduct =async (req,res)=>{

    try {
        
        const {productId} =req.body;
        const product =await productModel.findById(productId);
        res.json({success:true,product});

    } catch (error) {
        
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addProduct,listProducts,removeProduct,singleProduct}