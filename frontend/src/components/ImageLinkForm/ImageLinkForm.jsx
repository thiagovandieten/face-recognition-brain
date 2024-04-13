import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className='kode-mono-400'> 
            <p className="f3">This magic brain will detect faces in your pictures. Give it a try!</p>
            <div className="flex justify-around">
                <div className="form pa4 br3 shadow-5">
                    <input placeholder="Enter image URL here" className="mh1 f4 p2 w-70 center mv2" type="text" onChange={onInputChange}/>
                    <button className="mh1  w-40 grow f4 link ph3 pv2 dib white bg-light-purple mv2" onClick={onButtonSubmit}>Detect</button>
                    {/* TODO: Implement file upload 
                    <div className='ba b--black bw1'>
                        <h2><strong>Or</strong> upload a file down here:</h2>
                        <button className="mh1  w-40 grow f4 link ph3 pv2 dib white bg-light-purple mv2">Upload</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
};

export default ImageLinkForm;