import { useEffect } from 'react'
import './FaceRecognition.css'

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

const FaceRecognition = ({imageUrl, boundingBoxCordinates}) => {
    useEffect(() => {
        if (boundingBoxCordinates && boundingBoxCordinates.length > 0) {
            const boxPositions = calculateBoxPositions(boundingBoxCordinates);
            displayFaceBoxes(boxPositions);
        }

    }, [boundingBoxCordinates]);

    return (
        <div className="center ma relative">
            <canvas id="face-boxes" className="absolute" width="500px" height="auto"></canvas>
            <img id="image-face" src={imageUrl} alt=""  width="500px" height="auto" />
        </div>
    )
}

export default FaceRecognition