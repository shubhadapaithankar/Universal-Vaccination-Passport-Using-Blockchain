const { type } = require("express/lib/response");
const User = require("../model/user");


class UserAuth {

        static registerUser = async (data) => {
            //console.log(data)
                try {
                        const query = {
                                email : data.email,
                                password : data.password,
                                username : data.username                                
                        }
                            let foundUser = await User.findOne({"email": query["email"] });
                              if (foundUser) {
                                return false
                              }
                              const newUser = new User({ "email":query["email"], "password":query["password"],"username":query["username"]})
                              await newUser.save()
                              let token = genToken(newUser)
                              return {newUser, "token":token}    
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while registering user")
                }
        }

        static loginUser = async (data) => {
            //console.log(data)
                try {
                        const query = {
                                email : data.email,
                                password : data.password,                             
                        }
                    let foundUser = await User.findOne({"email": query["email"] });
                    if(await foundUser.matchPassword(query["password"]))
                    {
                    let token = genToken(foundUser)
                    console.log(typeof foundUser)
                    console.log(foundUser)
                    return {foundUser, "token":token}
                    }
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while logging in")
                }
        }
        
        static logoutUser = async (data) => {
            console.log(data)
                try {
                    var temp = await User.findOneAndUpdate({"_id":data.sub}, {"lastSeen":new Date()})
                    return true
                    }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while logging out")
                }
        }

        static getAllUsersExceptAdmin = async () => {
            try {
              const users = await User.find({ email: { $ne: 'admin@gmail.com' } });
              return users;
            } catch (err) {
              console.log(err);
              throw new Error("Error fetching users");
            }
          };

          static toggleActiveStatus = async (userEmail) => {
            try {
              const user = await User.findOne({ email: userEmail });;
              if (!user) {
                return false;
              }
              user.isActive = !user.isActive; 
              await user.save();
              return true;
            } catch (err) {
              console.log(err);
              throw new Error("Error toggling active status");
            }
          };
          
          
}

module.exports.UserAuth = UserAuth;