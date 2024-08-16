import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Context from "../../components/Context/Context";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import { signup } from "/src/Services/users.js";



export const SignUpPage = () => {
  // const { authStatus, setAuthStatus } = useContext(Context);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    shelter_id: ""
  });

  const navigate = useNavigate();

  const handleUpdateFormData = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const data = await signup(formData);
      if (data === "User with email provided already exists") {
        setMessage(data);
      } else {
        // setAuthStatus(true);
        navigate("/create-advert", { state: [0, data.message] });
      }
    } catch (err) {
      console.error(err);
      setMessage("Error signing up. Please try again.");
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   // Ensure the shelter_id is correctly formatted
  //   // const shelter_id = formData.shelter_id ? parseInt(formData.shelter_id) : null;
  
  //   // if (!shelter_id) {
  //   //   setMessage("Please enter a valid Shelter ID.");
  //   //   return;
  //   // }
  
  //   if (formData.password !== formData.confirmPassword) {
  //     setMessage("Passwords don't match");
  //     return;
  //   }
  
  //   const updatedFormData = { ...formData };
  
  //   try {
  //     const data = await signup(updatedFormData);
  //     if (data === "User with email provided already exists") {
  //       setMessage(data);
  //     } else {
  //       navigate("/", { state: [0, data.message] });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setMessage("Error signing up. Please try again.");
  //   }
  // };

  const handlePaste = (event) => {
    // Handle paste logic
    console.log("Pasting image URL", event);
  };

  return (
    <>
        <>
          {message && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Alert
                data-testid="_message"
                severity="error"
                sx={{
                  width: "50vw",
                  mt: 2,
                }}
              >
                {message}
              </Alert>
            </Box>
          )}

          <Card
            sx={{
              width: "50vh",
              margin: "0 auto",
              padding: "0.1em",
              mb: 3,
              mt: 10,
            }}
          >
            <CardHeader
              title="Sign Up"
              subheader="Please enter your details"
              style={{ textAlign: "left" }}
            />

            <CardContent
              data-testid="user-card"
              component="form"
              id="signup-form"
              onSubmit={handleSubmit}
            >
              {formData.password !== formData.confirmPassword && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Passwords don't match
                </Alert>
              )}

              <TextField
                inputProps={{
                  "data-testid": "none",
                }}
                InputLabelProps={{ shrink: true }}
                label="First Name"
                placeholder="e.g. John"
                fullWidth
                size="small"
                variant="outlined"
                id="first_name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  handleUpdateFormData("first_name", e.target.value)
                }
                sx={{ mb: 3 }}
              />

              <TextField
                inputProps={{
                  "data-testid": "none",
                }}
                InputLabelProps={{ shrink: true }}
                label="Last Name"
                placeholder="e.g. Smith"
                fullWidth
                size="small"
                variant="outlined"
                id="last_name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  handleUpdateFormData("last_name", e.target.value)
                }
                sx={{ mb: 3 }}
              />

              <TextField
                inputProps={{
                  "data-testid": "none",
                }}
                InputLabelProps={{ shrink: true }}
                label="Email"
                placeholder="john@example.com"
                fullWidth
                size="small"
                variant="outlined"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleUpdateFormData("email", e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                inputProps={{
                  "data-testid": "none",
                }}
                InputLabelProps={{ shrink: true }}
                label="Password"
                placeholder="Choose a strong one"
                fullWidth
                size="small"
                variant="outlined"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  handleUpdateFormData("password", e.target.value)
                }
                sx={{ mb: 3 }}
              />

              <TextField
                inputProps={{
                  "data-testid": "none",
                }}
                InputLabelProps={{ shrink: true }}
                label="Confirm Password"
                placeholder="Confirm it"
                fullWidth
                size="small"
                variant="outlined"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleUpdateFormData("confirmPassword", e.target.value)
                }
                sx={{ mb: 3 }}
              />

              <TextField
                InputProps={{
                  "data-testid": "none",
                }}
                InputLabelProps={{ shrink: true }}
                label="Shelter"
                placeholder="Your Shelter id"
                fullWidth
                size="small"
                variant="outlined"
                id="shelter"
              //   type="text"
              //   name="Shelter"
              //   value={formData.shelter}
              //   onChange={(e) => handleUpdateFormData("shelter", e.target.value)}
              //   sx={{ mb: 3 }}
              // />
              type="number"  // Ensures numeric input
              name="shelter"
              value={formData.shelter_id}
              onChange={(e) => {
                const value = e.target.value;
                handleUpdateFormData("shelter_id", value ? parseInt(value) : "");
              }}
              sx={{ mb: 3 }}
            />

              <Typography variant="body1" color="text.secondary">
                {/* Additional information or tips could go here */}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                data-testid="_submit-button"
                type="submit"
                form="signup-form"
                variant="contained"
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </>
    </>
  );
};

export default SignUpPage;