

const Signout = (req,res) => { 

       res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
   });
   res.json({ message: "Logout sucessfully." })

}

export default Signout