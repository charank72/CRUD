const { request } = require("express");
const Contact = require("../model/contactModel");
//read all-get
const readAll = async (req, res) => {
  try {
    let contacts = await Contact.find({});

    res.status(200).json({ length: contacts.length, contacts });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//read single-get(id)
const readSingle = async (req, res) => {
  try {
    let id = req.params.id;
    let single = await Contact.findById({ _id: id });
    if (!single) return res.status(404).json({ msg: `requested id not found` });
    res.status(200).json({ contact: single });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//create=>post+data
const createContact = async (req, res) => {
  try {
    let { email, mobile, website } = req.body;

    let extData = await Contact.findOne({ email });
    if (extData)
      return res.status(400).json({ msg: `${email} already exsists` });

    let extMobile = await Contact.findOne({ mobile });
    if (extMobile)
      return res.status(400).json({ msg: `${mobile} number already exsists` });

    let extWeb = await Contact.findOne({ website });
    if (extWeb)
      return res.status(400).json({ msg: `${website} already exsists` });

    let newContact = await Contact.create(req.body);

    res
      .status(200)
      .json({ msg: `new contact added succesfuuly`, data: newContact });
    res.json({ data: req.body });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// /update=>patch(id)/put(id)+data
const updatecontact = async (req, res) => {
  try {
    let id = req.params.id;
    let {email,mobile,website}=req.body

    let single =await Contact.findById({_id:id})
      if(!single)
        return res.status(400).json({msg:`requested id not found`})

    await Contact.findByIdAndUpdate({ _id: id }, req.body);

    res.status(200).json({ msg: `contact info updated succesfully` });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// delete=>delete(id)

const deletecontact = async (req, res) => {
  try {
    let id = req.params.id;
    let single = await Contact.findById({ _id: id });

    if (!single) return res.status(404).json({ msg: "requested id not found" });

    await Contact.findOneAndDelete({ _id: id });
    res.status(200).json({ msg: `contact info deelted succesfully` });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  readAll,
  readSingle,
  createContact,
  updatecontact,
  deletecontact,
};
