import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import { signup } from "/src/Services/users.js";
import { AuthContext } from "../../components/Context/AuthContext"

export const SignUpPage = () => {
  const {token, setToken} = useContext(AuthContext)
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
    if (id === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one digit.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    setPasswordError(errors.join(" "));
    return errors.length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordError) {
      setMessage("Please fix the password errors");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const data = await signup(formData);
      if (data === "User with email provided already exists") {
        setMessage(data);
      } else {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_id", data.user_id)
        localStorage.setItem("shelter_id", data.shelter_id)
        setToken(localStorage.getItem("token"))
        navigate("/create-advert", { state: [0, data.message] });
      }
    } catch (err) {
      console.error(err);
      setMessage("Error signing up. Please try again.");
    }
  };

  return (
    <>
      {message && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Alert severity="error" sx={{ width: "50vw", mt: 2 }}>
            {message}
          </Alert>
        </Box>
      )}

      <Card sx={{ width: "50vh", margin: "0 auto", padding: "0.1em", mb: 3, mt: 10, color: '#003554' }}>
        <CardHeader title="Sign Up" subheader="Please enter your details" style={{ textAlign: "left" }} />

        <CardContent component="form" id="signup-form" onSubmit={handleSubmit}>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {passwordError}
            </Alert>
          )}

          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="First Name"
            placeholder="e.g. Steve"
            fullWidth
            size="small"
            variant="outlined"
            id="first_name"
            type="text"
            value={formData.first_name}
            onChange={(e) => handleUpdateFormData("first_name", e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
          inputProps={{
            "data-testid": "none",
          }}
            label="Last Name"
            placeholder="e.g. Alex"
            fullWidth
            size="small"
            variant="outlined"
            id="last_name"
            type="text"
            value={formData.last_name}
            onChange={(e) => handleUpdateFormData("last_name", e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            InputLabelProps={{ shrink: true }}
            label="Email"
            placeholder="steve@example.com"
            fullWidth
            size="small"
            variant="outlined"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleUpdateFormData("email", e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="Password"
            placeholder="Choose a strong one"
            fullWidth
            size="small"
            variant="outlined"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleUpdateFormData("password", e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="Confirm Password"
            placeholder="Confirm Password"
            fullWidth
            size="small"
            variant="outlined"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleUpdateFormData("confirmPassword", e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="Shelter ID"
            placeholder="Your Shelter id"
            fullWidth
            size="small"
            variant="outlined"
            id="shelter_id"
            type="number"
            value={formData.shelter_id}
            onChange={(e) => handleUpdateFormData("shelter_id", e.target.value)}
            sx={{ mb: 3 }}
          /> */}

          <CardActions>
            <Button data-testid="submit-button" type="submit" form="signup-form" variant="contained"
            sx={{
              fontFamily: 'Arial, sans-serif',
              backgroundColor: '#003554',
              color: '#FFFACA',
              '&:hover': {
                backgroundColor: '#557B71',
              },
            }}>
              Submit
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default SignUpPage;