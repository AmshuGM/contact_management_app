//adding async ahndler to avoid using try-catch in every block
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@Desc get all the contacts
//@api /
//@access public
const getContacts = asyncHandler( async (req,res)=>{
    const contacts = await Contact.find();
    if(!contacts)
    {
        res.status(400);
        throw new Error("Validation error");
    }
    
    res.status(200).json(contacts);
});

//@Desc post all the contacts
//@api /
//@access public
const postContacts = asyncHandler(async (req,res)=>{
    const {name,mobile,email} = req.body;
    if(!name || !mobile || !email)
    {
        res.status(400);
        throw new Error("all feilds are mandatory");
    }
    const contact = await Contact.create({name,email,mobile});
    if(!contact)
    {
        res.status(400);
        throw new Error("Validation error");
    }

    res.status(201).json(contact);
});

//@Desc get a single contact
//@api /:id
//@access public
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//@Desc update a contact
//@api /:id
//@access public
const putContacts = asyncHandler(async (req,res)=>{
    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//@Desc delete a contact
//@api /:id
//@access public
const deleteContacts = asyncHandler(async (req,res)=>{
    const contact = await Contact.deleteOne({"_id":req.params.id});
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

module.exports={getContact,getContacts,postContacts,putContacts,deleteContacts};

