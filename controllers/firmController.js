
    const Firm=require('../models/Firm');
    const Vendor=require('../models/Vendor'); 
    const multer=require('multer')

    //add storage

    const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,date.now()+path.extname(file.originalname));
        }
    });
    const upload=multer({storage:storage});
    //addfirm function
    const addFirm=async(req,res)=>{
    
        try {
            const{firmName,area,category,region,offer}=req.body
            const image=req.file? req.file.filename:undefined;
        
        
        
            const vendor=await Vendor.findById(req.vendorId)
            if(!vendor)
            {
                res.status(404).json({message:"vendor not found"})
            }
            const firm=new Firm({
                firmName,area,category,region,offer,image,vendor:vendor._id
            })
            const savedfirm=await firm.save()
            vendor.firm.push(savedfirm)
            await vendor.save()

            return res.status(200).json({message:"firm added successfully..."})
        } catch (error) {
            console.error(error)
            res.status(500).json("internal server error")
        }
    }


    //delete firm by id

    const deleteFirmById = async(req,res)=>{

        try {
            const firmId=req.params.firmId;
            const deleteFirm=await Firm.findByIdAndDelete(firmId)
            if(!deleteFirm)
            {
                return res.status(404).json({error:"no product found"})
            }
    
    
        } catch (error) {
             console.error(error)
            res.status(500).json("internal server error")
        }
    }

    module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}