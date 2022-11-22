import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ParticlesBg from "particles-bg";
import './App.css';

/*
  initialState: Object that initializes/resets all user-based
  state data.
  This function is called by the App.js constructor function
  and whenever a user signs out of application.  
*/
function initialState() {
  return {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }
}

class App extends Component {

  /*
    Constructor containing state. 
    State contains the value that the user inputs into the image text field
    and the image url 
    box contains the dimensions of the box used to enclosed a detected fac
    route keeps track of where we are on the page, this is helpful for the signin functionality
  */
  constructor() {
    super();
    this.state = initialState();
  }
  
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  /* Lifecycle hook to test if I can connect to my backend*/ 
  /*
  componentDidMount() {
    fetch('http://localhost:3002/')
      .then(response => response.json())
      .then(console.log)
  }
  */

  /* 
  function to calculate the perimeters for the box for the detected face 
  returns an object containing the location of each side
  */
  calculateFaceLocation = (data) => {
    const boxBounds = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputtedImage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log('image width: ' + width, 'image height: ' + height);
    return {
        leftCol: boxBounds.left_col * width,
        topRow: boxBounds.top_row * height,
        rightCol: width - (boxBounds.right_col * width),
        bottomRow: height - (boxBounds.bottom_row * height)
    }
  }

  /*
    Sets the state for the face detection box perimeter values. 
  */
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  /*
    Executes when the user inputs an image url into the image text field. 
    Sets the value of input.
  */
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

    /*
      Executes when the user clicks the detect button.
      Calls the Clarifai API to detect faces
    */
  onButtonSubmit = () => {
    // Set the image url
    this.setState({imageUrl: this.state.input});
    
        fetch('http://localhost:3002/callclarifaiapi', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              imageUrl: this.state.input
            })
          })
        .then(response => response.json())
        .then(result => {
            this.displayFaceBox(this.calculateFaceLocation(result));
            // as long as we get a response from our api, we will update 
            // the number of entries for user
            fetch('http://localhost:3002/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              // use the Object.assign function to dynamically change the user's
              // number of entries onto the view. 
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(error => console.log('error', error));
            // catch any error if an error occurs. 
        })
        .catch(err => console.log(err));
}

  /*
  onRouteChange: method used for routing purposes.
  This method helps us change the application's view when a user
  signs in or out. 
  */
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState());
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

/* 
  Uses JS to check the sign in status of the user.
  If the user hasn't sign in, displays the sign in page,
  else it shows the app's home page to detect faces
*/
  render() {
      const {isSignedIn, imageUrl, route, box} = this.state;
      return (
        <div className="App">
          <ParticlesBg className='particles' type="cobweb" color="#FFFFFF" bg={true}/>
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          { route == 'home' 
              ? <div>
                  <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm 
                      onInputChange={this.onInputChange} 
                      onButtonSubmit={this.onButtonSubmit}
                  />
                  <FaceRecognition box={box} imageUrl={imageUrl}/>
                </div>
              : (
                    route === 'signin'
                    ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
          }
        </div>
      );
  }
}

export default App;
