import { useEffect, useState } from 'react'
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

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // const [faceBoxes, setFaceBoxes] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

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

  useEffect(() => {
    if (imageUrl) {
      (async () => {
        drawFaceBoxes();
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [imageUrl]);

  const fetchFaceBoxes = async () => {
    if (!imageUrl) return true;

    return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnRequestOptions())
      .then(response => response.json())
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

  function calculateBoxPositions(boundingBoxCordinates) {
    const imageOnPage = document.getElementById('image-face')
    const width = Number(imageOnPage.width)
    const height = Number(imageOnPage.height)
    console.log(`Width: ${width}, Height: ${height}`)
    const boxPositions = boundingBoxCordinates.map(faceBox => {
      return {
        x: faceBox.left_col * width,
        y: faceBox.top_row * height,
        width: (faceBox.right_col * width) - (faceBox.left_col * width),
        height: (faceBox.bottom_row * height) - (faceBox.top_row * height)
      }
    });
    return boxPositions;
  }

  const displayFaceBoxes = (boxPositions) => {
    const imageOnPage = document.getElementById('image-face')
    const canvas = document.getElementById('face-boxes')
    canvas.width = imageOnPage.width
    canvas.height = imageOnPage.height
    const ctx = canvas.getContext('2d')
    boxPositions.forEach(box => {
      ctx.beginPath();
      ctx.rect(box.x, box.y, box.width, box.height);
      ctx.strokeStyle = '#0000FF';
      ctx.strokeWidth = 3;
      ctx.stroke();
    })
  }

  const drawFaceBoxes = async () => {
    const boundingBoxCordinates = await fetchFaceBoxes();
    // const boundingBoxCordinates = preCalcBoxes;
    const boxPositions = calculateBoxPositions(boundingBoxCordinates)
    displayFaceBoxes(boxPositions);
  }

  const onInputChange = (event) => setInput(event.target.value);

  const onSubmit = () => {
    setImageUrl(input);
    console.log("hi");
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <>
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      {(route === "signin") ? <SignIn onRouteChange={onRouteChange} /> : null}
      {(route === "register") ? <Register onRouteChange={onRouteChange} /> : null}
      {(route === "home") ?
        <>
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onSubmit} />
          <FaceRecognition imageUrl={imageUrl} />
        </>
        : null}

    </>
  )

}

export default App
