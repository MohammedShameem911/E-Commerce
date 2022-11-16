const express = require("express");
const router = new express.Router();
const Products = require("../Models/productsSchema");
const USER = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


router.get("/getproducts", async (req, res) => {
    try {
        const producstdata = await Products.find();
       // console.log(producstdata);
        res.status(201).json(producstdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});


// get individual data
router.get("/getproductsone/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        //console.log(id);

        const individualdata = await Products.findOne({id:id});

       // console.log(individualdata + "individual Data");

       res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(individualdata);
        console.log("error" + error.message);
    }
});

// register data

router.post("/register",async(req,res)=>{
   // console.log(req.body);

   const {fname,email,mobile,password,cpassword} = req.body;

   if(!fname || !email || !mobile || !password || !cpassword){
    res.status(422).json({error:"fill the all data"})
    console.log("not data available");
   };
 
   try{
    const preuser = await USER.findOne({email:email});

    if(preuser){
        res.status(422).json({error:"This user is already present"})
    }else if(password !== cpassword){
        res.status(422).json({error:"password not matched"})
    }else{
        const finalUser = new USER({
            fname,email,mobile,password,cpassword
        });

        //


        const storedata = await finalUser.save();
        console.log(storedata);

        res.status(201).json(storedata);
    }
   

}catch(error){

}



});


//login user

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({error:"fill data"})
    };

    try {
        const userlogin = await USER.findOne({email:email});
        console.log(userlogin + "user");

        if(userlogin){
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);

            //token generate
            const token = await userlogin.generateAuthtoken();
            //console.log(token);

            res.cookie("BikeHub",token,{
                expires:new Date(Date.now() + 9000000),
                httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({error:"invalid details"});

            }
            else{
                res.status(201).json(userlogin);

            }
        }
        else{
            res.status(400).json({error:"invalid details"});
        }
    } catch (error) {
        res.status(400).json({error:"invalid"})
    }
})


// add to cart

router.post("/addcart/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id:id});
        console.log(cart + "cart value");

        const UserContact = await USER.findOne({_id:req.userID});
        console.log(UserContact);

        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
        }
        else{
            res.status(401).json({error:"invalid user"});
        }

    } catch (error) {
        res.status(401).json({error:"invalid user"});

    }
});


//get cart data

router.get("/cartdetails",authenticate,async(req,res)=>{
    try {
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error" + error);
    }
});

//get valid user
router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const validuserone = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error" + error);
    }
});


// remove item
router.delete("/remove/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
        return cruval.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item removed");
    } catch (error) {
        console.log("error" + error);
        res.status(400).json(req.rootUser);
        
    }
});

// logout

router.get("/logout",authenticate,(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((log)=>{
            return log.token !== req.token
        });

        res.clearCookie("BikeHub",{path:"/"});

        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("logout");
    } catch (error) {
        res.status(201).json(req.rootUser.tokens);
        console.log("error");
    }
})


module.exports = router;