const Request = require('../Models/beneficiariesModel');
// const ejs = require('ejs');
const users = require('../Models/userModel');
// const { ObjectId } = require('mongodb');





const newRequest = async (req, res) => {

    // const userID = req.user.id
  const formData = req.body;

  const newRequest = new Request({
    beneficiarie_user:"655234f3e08453b1b3ab2677",
    beneficiarie_description: formData.beneficiarie_description,
    card_number: formData.card_number,
    beneficiarie_amount: formData.beneficiarie_amount,
    beneficiarie_type:formData.beneficiarie_type,
      
  });
  try {
    const request = await newRequest.save();
    res.render('homepageView.ejs');
    // res.json(request);
    console.log(formData);
  } catch (error) {
    console.error('Error saving new request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// git all request for specific users
const getAllRequest = async (req, res) => {
    // const userID = req.user.id
    const userID = "6558a8294e7a01a9bd6e9d4e"
    
    try {
        const user = await users.findById('6558a8294e7a01a9bd6e9d4e');

        const all = await Request.find({ is_deleted: false, beneficiarie_accepted:false ,beneficiarie_user: userID});
        // res.json(all);
        res.render("userprofile.ejs", { all:all , user});
    } catch (error) {
        res.status(500).json(error);
    }
};


// get all request for all users and the user id appear
const getAllRequestAdmin = async (req, res) => {
    //const userID = req.user._id
    // const userID = "655234f3e08453b1b3ab2677"
    try {
        const all = await Request.find({ is_deleted: false});
        // res.json(all);
        res.render('dashboard.ejs', { requests:all });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching getAllReaquestAdmin' });
    }
};



const deleteRequest = async (req, res) => {
    const userID = req.user.id
    // userID = "655234f3e08453b1b3ab2677"  //UserID for Admin
    try {
        const requestId = req.params.id;
        const updatedRequestData = req.body;

        updatedRequestData.is_deleted = true;

        const deleted = await Request.findByIdAndUpdate(requestId, updatedRequestData, {
            new: true,beneficiarie_user:userID
        });

        const updatedRequest = await deleted.save();

        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Order' });
    }
};






const updateRequeststatus = async (req, res) => {
    const userID = req.user.id
    // userID = "655234f3e08453b1b3ab2677"
    try {
        const requestId = req.params.id;
        const updatedRequestData = req.body;

        updatedRequestData.status;

        const status = await Request.findByIdAndUpdate(requestId, updatedRequestData, {
            new: true,beneficiarie_user:userID
        });

        const updatedRequest = await status.save();
        // res.render('dashboard.ejs', {
        //     requestId: requestId,
        //     status: updatedRequest.status,
        //     // Add more data as needed
        // });

        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Order' });
    }
};





const updateRequestaccept = async (req, res) => {
    const userID = req.user.id
    // userID = "655234f3e08453b1b3ab2677"
    try {
        const requestId = req.params.id;
        const updatedRequestData = req.body;

        updatedRequestData.beneficiarie_accepted;

        const status = await Request.findByIdAndUpdate(requestId, updatedRequestData, {
            new: true,beneficiarie_user:userID
        });

        const updatedRequest = await beneficiarie_accepted.save();

        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Order' });
    }
};










module.exports = {
    newRequest,
    getAllRequest,
    deleteRequest,
    updateRequeststatus,
    updateRequestaccept,
    getAllRequestAdmin,
    
};