import { useEffect, useState, useRef } from 'react'
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import './App.css'

function App() {

  const input = useRef('');
  const [imageUrl, setImageUrl] = useState('');
  const previousImageUrl = useRef('');
  const [boundingBoxCordinates, setboundingBoxCordinates] = useState([]);
  // const [faceBoxes, setFaceBoxes] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  const MODEL_ID = 'face-detection';

  const returnRequestOptions = () => {
    // Clarifai data
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = import.meta.env.VITE_CLARIFY_PAT_KEY;
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'nktakumi';
    const APP_ID = 'face-recognition-brain';

    //TODO: Logic for either URL or file upload
    console.log(`Image URL state: ${imageUrl}`);
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    console.log(`Imague URL: ${IMAGE_URL}`)

    return requestOptions;
  }

  const updateEntries = () => {
    fetch('http://localhost:3000/image', {
      method: 'PUT',
      body: JSON.stringify({ id: user.id }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(count => {
        setUser({ ...user, entries: count });
      })
      .catch(console.log);
  }

  useEffect(() => {
    // send image URL to Clarifai API
    if (imageUrl && imageUrl !== previousImageUrl.current) {
      (async () => {
        setboundingBoxCordinates(await fetchFaceBoxes());
        previousImageUrl.current = imageUrl; //Doesn't update the state becaiuse it seems it's undefined here
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [imageUrl]);

  const fetchFaceBoxes = async () => {
    if (!imageUrl) return true;

    return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnRequestOptions())
      .then((response) => {
        return response.json()
      }
      )
      .then(result => {

        // const BoundingBox = result.outputs[0].data.regions[0].region_info.bounding_box;
        // console.log(`Bounding box: ${BoundingBox}`);
        console.log(`Result boxes: ${result}`);
        const regions = result.outputs[0].data.regions;
        // console.log(`Regions: ${regions}`);
        const faceBoxes = regions.map(region => region.region_info.bounding_box);
        // console.log(`Face boxes: ${faceBoxes}`)
        return faceBoxes;
      })
      .catch(error => console.log('error', error))
  }

  const onInputChange = (event) => input.current = event.target.value;

  const onLinkSubmit = () => {
    setImageUrl(input.current);
    updateEntries();
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home' && typeof (user.id) === "number") {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    });
  }

  return (
    <>
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      {(route === "signin") && <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />}
      {(route === "register") && <Register onRouteChange={onRouteChange} />}
      {(route === "home") &&
        <>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onLinkSubmit} />
          <FaceRecognition imageUrl={imageUrl} boundingBoxCordinates={boundingBoxCordinates} />
        </>
      }

    </>
  )

}

export default App