import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../dataBase/firebase';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  p: {
      color: "red"
  }
}));



const SignUp = (props) => {

    const {email, setEmail,password,setPassword,
        emailError,setEmailError,
        passWordError,setPassWordError,hasAccount,setHasAccount} = props;

        const toggle = () => {

            setHasAccount(!hasAccount);
        }

        
        const clearErrors = () => {
            setEmailError('');
            setPassWordError('');
        }

        const handleSignIn = (e) => {
            e.preventDefault();
            clearErrors();
            firebase.auth()
            .signInWithEmailAndPassword(email,password)
            .catch(err => {
                switch(err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPassWordError(err.message);
                        break;
                    default:
                      console.log(err);
                    
                }
            })
        }
        
        const handleSignUp = (e) => {
            e.preventDefault();
            clearErrors();
            firebase.auth()
            .createUserWithEmailAndPassword(email,password)
            .catch(err => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPassWordError(err.message);
                        break;
                    default:
                      console.log(err);
                    
                }
            })
        }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
        <header >
        <h1>Boat Library</h1>
        </header>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        
        {hasAccount ? (
        <Typography component="h1" variant="h5">
                Sign In
        </Typography>
        ):(
        <Typography component="h1" variant="h5"> 
             Sign Up 
        </Typography>)
        }
       
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e=> setEmail(e.target.value)}
          />
          <p className={classes.p}>{emailError}</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e=> setPassword(e.target.value)}
          />
          <p className={classes.p}>{passWordError}</p>
         { hasAccount ? (<Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
          >
            Sign In
          </Button>):
          (
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          )
          }
          <Grid container>
            <Grid item>
              
                { hasAccount ? (
                    <Link variant="body2" onClick={toggle}>
                        don't have an account ? Sign Up    
                    </Link>
                ): (
                    <Link variant="body2" onClick={toggle}>
                        have an account? Sign In
                    </Link>
                )
            }
              
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;