import './FaceRecognition.css'

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className="center ma relative">
            <canvas id="face-boxes" className="absolute" width="500px" height="auto"></canvas>
            <img id="image-face" src={imageUrl} alt=""  width="500px" height="auto" />
        </div>
    )
}

export default FaceRecognition